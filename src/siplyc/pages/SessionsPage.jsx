import './styles.css'
import { useEffect, useState } from 'react'
import { Card } from '../../components/Card/Card'
import { List } from '../components/List'
import { useQuery } from 'react-query'
import { EditSession } from '../components/Session/EditSession'
import { FlashNotification } from '../components/FlashNotification'

const getTotalSessions = (sessions) => sessions.length;
const getCompletedSessions = (sessions) => sessions.filter(session => session.state === 'complete').length;
const getIncompleteSessions = (sessions) => sessions.filter(session => session.state === 'incomplete').length;

export const SessionsPage = () => {

  const properties = [
    { label: 'Niño(a)', key: 'student.names' },
    { label: 'Apellido Paterno', key: 'student.father_lastname' },
    { label: 'Apellido Materno', key: 'student.mother_lastname' },
    { label: 'Fecha', key: 'date_session' },
    { label: 'Duracion', key: 'duration' },
    { label: 'Estado', key: 'state' },
    { label: 'Comentarios Sesión', key: 'comments' },
    { label: 'Acciones', key: 'actions' }
  ]

  const [items, setItems] = useState([{}])
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [item, setItem] = useState('');
  const [openFlash, setOpenFlash] = useState(false);
  const [notificationType, setNotificationType] = useState('success');
  const [flashMessage, setFlashMessage] = useState('');

  //TODO: Fetch items from API or rescue from current session
  const teacherId = 19;

  //TODO: replace raw string with enviroment variable
  const fetchData = async () => {
    const response = await fetch(`http://localhost:3000/sessions/teacher/${teacherId}`);
    const data = await response.json();
    return data;
  }

  const { isLoading, error, data } = useQuery('sessions', fetchData);

  const updateItem = async (item) => {
    const id = item.id;

    const options = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(item)
    }

    // TODO: Replace raw string with enviroment variable
    const response = await fetch(`http://127.0.0.1:3000/sessions/${id}`, options);

    if(response.ok) {
      const data = await response.json();
      setItems(prevItems => prevItems.map(item => item.id === data.id ? data : item));
      showFlashNotification('success', 'Registro actualizado correctamente')
      return data;
    } else {
      showFlashNotification('danger', 'Error al actualizar el registro')
      throw new Error('Error al actualizar el registro');
    }
  }
  
  const handleDelete = async (id) => console.log('Deleting item with id: ', id);
  const handleUpdate = async (item) => await updateItem(item);
  const handleCloseEditModal = () => setEditModalOpen(false);
  const handleCloseFlash = () => setOpenFlash(false);
  
  const handleOpenEditModal = (item) => {
    setEditModalOpen(true);
    setItem(item);
  }

  const showFlashNotification = (type = 'success', message = '') => {
    setOpenFlash(true);
    setNotificationType(type);
    setFlashMessage(message);
  }

  useEffect(() => { if(data) setItems(data) }, [data])

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>An error has occurred: {error.message}</div>

  return (
    <div style={{ backgroundColor: '#00ac96', minHeight: '100vh'}}>
      <FlashNotification message={flashMessage} isVisible={openFlash} type={notificationType} onClose={handleCloseFlash}/>
      <h1 className='session-title'>Sesiones</h1>
      <hr style={{ border: '0.5px solid #000' }}/>

      <div style={{ backgroundColor: "#fff", height: "auto"}} className='card-container'>
        <Card text={`Sesiones totales: ${getTotalSessions(items)}`} type={"bg-primary"}/>
        <Card text={`Sesiones completas: ${getCompletedSessions(items)}`} type={"bg-success"}/>
        <Card text={`Sesiones incompletas: ${getIncompleteSessions(items)}`} type={"bg-danger"}/>
      </div>

      <div className="container mt-4 pb-4 d-flex justify-content-center align-items-center">
        <div className="col-7">
          <List properties={properties} items={items} onDelete={handleDelete} handleOpenModal={handleOpenEditModal}/>
        </div>
      </div>

      { editModalOpen && <EditSession onClose={handleCloseEditModal} onSave={handleUpdate} item={item}/>}
    </div>
  )
}