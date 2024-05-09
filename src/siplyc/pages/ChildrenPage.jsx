import { List } from "../components/List";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { CreateChildren } from "../components/Children/CreateChildren";
import { EditChildren } from "../components/Children/EditChildren";
import { FlashNotification } from "../components/FlashNotification";

export const ChildrenPage = () => {

  const [items, setItems] = useState([]);
  const [item, setItem] = useState('');
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [openFlash, setOpenFlash] = useState(false);
  const [notificationType, setNotificationType] = useState('success');
  const [flashMessage, setFlashMessage] = useState('');

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
    const response = await fetch(`http://127.0.0.1:3000/students/${id}`, options);

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

  const createItem = async (item) => {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(item)
    }

    // TODO: Replace raw string with enviroment variable
    const response = await fetch('http://127.0.0.1:3000/students', options);

    if(response.ok) {
      const data = await response.json();
      setItems([...items, data]);
      showFlashNotification('success', 'Registro creado correctamente')
      return data;
    } else {
      showFlashNotification('danger', 'Error al crear el registro')
      throw new Error('Error al crear registro');
    }  
  }

  const deleteItem = async (id) => {
    const options = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    }

    // TODO: Replace raw string with enviroment variable
    const response = await fetch(`http://127.0.0.1:3000/students/${id}`, options);

    if(response.ok) {
      setItems(prevItems => prevItems.filter(item => item.id !== id))
      showFlashNotification('success', 'Registro eliminado correctamente')
      return response;
    } else {
      showFlashNotification('danger', 'Error al eliminar el registro')
      throw new Error('Error al eliminar registro');
    } 
    
  }

  const properties = [
    { label: 'Rut', key: 'rut' },
    { label: 'Nombres', key: 'names' },
    { label: 'Apellido Paterno', key: 'father_lastname' },
    { label: 'Apellido Materno', key: 'mother_lastname' },
    { label: 'Nacimiento', key: 'birthday' },
    { label: 'Sexo', key: 'gender' },
    { label: 'Grupo', key: 'group' },
    { label: 'Email', key: 'email' },
    { label: 'Estado', key: 'state' },
    { label: 'Acciones', key: 'actions' },
  ]

  const handleOpenEditModal = (item) => {
    setEditModalOpen(true);
    setItem(item)
  };

  const handleOpenCreateModal = () => setCreateModalOpen(true);
  const handleCloseEditModal = () => setEditModalOpen(false);
  const handleCloseCreateModal = () => setCreateModalOpen(false);
  const handleCloseFlash = () => setOpenFlash(false);

  const handleClickItem = (item) => console.log('Click', item);
  const handleCreate = async (item) => await createItem(item);
  const handleUpdate = async (item) => await updateItem(item);
  const handleDelete = async (id) => await deleteItem(id);

  const showFlashNotification = (type = 'success', message = '') => {
    setOpenFlash(true);
    setNotificationType(type);
    setFlashMessage(message);
  }

  const fetchItems = async () => {
    // TODO: Replace raw string with enviroment variable
    const response = await fetch('http://127.0.0.1:3000/students')
    const data = await response.json()
    return data
  }

  const { isLoading, error, data } = useQuery('fetchTeachers', fetchItems);

  useEffect(() => {
    if (data) {
      setItems(data);
    }
  }, [data]);

  if (isLoading) return 'Loading...'
  if (error) return 'An error has occurred: ' + error.message

  return (
    <div style={{ backgroundColor: '#00ac96', minHeight: '100vh' }}>
      <FlashNotification message={flashMessage} isVisible={openFlash} type={notificationType} onClose={handleCloseFlash}/>
      <h1 className="container pt-4 d-flex justify-content-center align-items-center">Ciudades</h1>

      <div className="ontainer pt-4 d-flex justify-content-center align-items-center">
        <button className="btn btn-primary" onClick={handleOpenCreateModal}>Nuevo +</button>
      </div>

      <div className="container mt-4 pb-4 d-flex justify-content-center align-items-center">
        <div className="col-7">
          <List 
            properties={properties} 
            items={items} 
            onDelete={handleDelete} 
            onClick={handleClickItem}
            handleOpenModal={handleOpenEditModal}
          />
        </div>
      </div>

      { createModalOpen && <CreateChildren isOpen={createModalOpen} onClose={handleCloseCreateModal} onSave={handleCreate}/>}
      { editModalOpen && <EditChildren isOpen={editModalOpen} onClose={handleCloseEditModal} onSave={handleUpdate} item={item}/>}
      
    </div>
  )
}