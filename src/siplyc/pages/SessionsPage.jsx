import './styles.css'
import { useEffect, useState } from 'react'
import { Card } from '../../components/Card/Card'
import { List } from '../components/List'
import { useQuery } from 'react-query'


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

  //TODO: Fetch items from API or rescue from current session
  const teacherId = 19;

  //TODO: replace raw string with enviroment variable
  const fetchData = async () => {
    const response = await fetch(`http://localhost:3000/sessions/teacher/${teacherId}`);
    const data = await response.json();
    return data;
  }

  const { isLoading, error, data } = useQuery('sessions', fetchData);

  const handleDelete = async (id) => console.log('Deleting item with id: ', id);
  const handleOpenEditModal = (item) => console.log('Editing item: ', item);

  useEffect(() => { if(data) setItems(data) }, [data])

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>An error has occurred: {error.message}</div>

  return (
    <div style={{ backgroundColor: '#00ac96', minHeight: '100vh'}}>
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
    </div>
  )
}