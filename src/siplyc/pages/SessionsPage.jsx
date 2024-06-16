import './styles.css'
import { useEffect, useMemo, useState } from 'react'
import { Card } from '../../components/Card/Card'
import { List } from '../components/List'
import { useQuery } from 'react-query'
import { EditSession } from '../components/Session/EditSession'
import { FlashNotification } from '../components/FlashNotification'
import { Paginate } from '../components/Paginate'
import { useLocation, useNavigate } from "react-router-dom";

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

  // Paginated Records
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasNext, setHasNext] = useState(false);
  const [hasPrev, setHasPrev] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = useMemo(() => new URLSearchParams(location.search), [location.search]);
  const page = parseInt(searchParams.get('page')) || 1;

  // Redirect to first page if no page query param is present
  useEffect(() => {
    if (!searchParams.has('page')) {
      searchParams.set('page', '1');
      navigate(`${location.pathname}?${searchParams.toString()}`, { replace: true });
    }
  }, [location, navigate, searchParams]);

  //TODO: Fetch items from API or rescue from current session
  const teacherId = 19;

  // TODO: Replace raw string with enviroment variable
  const fetchItems = async ({ queryKey }) => {
    // eslint-disable-next-line no-unused-vars
    const [_key, { page }] = queryKey;
    const response = await fetch(`http://localhost:3000/sessions/teacher/${teacherId}/paginated?page=${page}&per_page=10`);
    const data = await response.json();
    setTotalPages(data.total_pages);
    setCurrentPage(data.current_page);
    setHasNext(data.has_next);
    setHasPrev(data.has_prev);
    return data.sessions;
  };

  const { isLoading, error, data } = useQuery(['fetch_sessions', { page }], fetchItems);

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

      <div className="container d-flex justify-content-center align-items-center">
        <Paginate 
          currentPage={currentPage} 
          totalPages={totalPages} 
          hasNext={hasNext} 
          hasPrev={hasPrev} 
        />
      </div>

      { editModalOpen && <EditSession onClose={handleCloseEditModal} onSave={handleUpdate} item={item}/>}
    </div>
  )
}