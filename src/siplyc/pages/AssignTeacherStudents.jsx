import { List } from "../components/List";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";

export const AssignTeacherStudents = () => {

  const properties = [
    { label: 'Nombre Tutor', key: "teacher.names" },
    { label: 'Nombre Alumno', key: 'student.names' },
    { label: 'Apellido Paterno', key: 'student.father_lastname' },
    { label: 'Apellido Materno', key: 'student.mother_lastname' },
    { label: 'Acciones', key: 'actions' },
  ]

  const [items, setItems] = useState([]);

  const fetchItems = async () => {
    // TODO: Replace raw string with enviroment variable
    const response = await fetch('http://localhost:3000/teacher_students')
    const data = await response.json()
    return data
  }

  const { isLoading, error, data } = useQuery('fetch_assignments', fetchItems);

  useEffect(() => {
    if (data) {
      setItems(data);
    }
  }, [data]);

  if (isLoading) return 'Loading...'
  if (error) return 'An error has occurred: ' + error.message

  return (
    <div style={{ backgroundColor: '#00ac96', minHeight: '100vh' }}>
      {/* <FlashNotification message={flashMessage} isVisible={openFlash} type={notificationType} onClose={handleCloseFlash}/> */}
      <h1 className="container pt-4 d-flex justify-content-center align-items-center">Asignaciones Tutor - Niño</h1>

      <div className="container pt-4 d-flex justify-content-center align-items-center">
        {/* <button className="btn btn-primary" onClick={handleOpenCreateModal}>Nuevo +</button> */}
      </div>

      <div className="container mt-4 pb-4 d-flex justify-content-center align-items-center">
        <div className="col-7">
          <List 
            properties={properties} 
            items={items} 
            // onDelete={handleDelete} 
            // onClick={handleClickItem}
            // handleOpenModal={handleOpenEditModal}
          />
        </div>
      </div>

      {/* { createModalOpen && <CreateChildren onClose={handleCloseCreateModal} onSave={handleCreate}/>}
      { editModalOpen && <EditChildren onClose={handleCloseEditModal} onSave={handleUpdate} item={item}/>} */}
      
    </div>
  )
}