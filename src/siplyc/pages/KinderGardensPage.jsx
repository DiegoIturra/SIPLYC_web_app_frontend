import { List } from "../components/List"
import { useQuery } from "react-query";
import { useState, useEffect } from "react";
import { EditKinderGarden } from "../components/KinderGarden/EditKinderGarden";
import { CreateKinderGarden } from "../components/KinderGarden/CreateKinderGarden";
import { FlashNotification } from "../components/FlashNotification";

export const KinderGardensPage = () => {

  const properties = [
    { label: 'Nombre', key: 'name' },
    { label: 'Dirección', key: 'address' },
    { label: 'Teléfono', key: 'phone' },
    { label: 'Ciudad', key: 'city_name' },
    { label: 'Acciones', key: 'actions' }
  ]

  const fetchItems = async () => {
    // TODO: Replace raw string with enviroment variable
    const response = await fetch('http://127.0.0.1:3000/kinder_gardens')
    const data = await response.json()
    return data
  }

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
    const response = await fetch(`http://127.0.0.1:3000/kinder_gardens/${id}`, options);

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
    const response = await fetch('http://127.0.0.1:3000/kinder_gardens', options);

    if(response.ok) {
      const data = await response.json();

      const newItem = {
        ...data,
        city_name: data.city.name
      }

      setItems([...items, newItem]);
      showFlashNotification('success', 'Registro creado correctamente')
      return data
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
    const response = await fetch(`http://127.0.0.1:3000/kinder_gardens/${id}`, options);

    if(response.ok) {
      setItems(prevItems => prevItems.filter(item => item.id !== id))
      showFlashNotification('success', 'Registro eliminado correctamente')
      return response;
    } else {
      showFlashNotification('danger', 'Error al eliminar el registro')
      throw new Error('Error al eliminar registro');
    } 

  }

  const { isLoading, error, data } = useQuery('repoData', fetchItems);

  const [items, setItems] = useState([]);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [item, setItem] = useState('');
  const [openFlash, setOpenFlash] = useState(false);
  const [notificationType, setNotificationType] = useState('success');
  const [flashMessage, setFlashMessage] = useState('');

  const handleOpenEditModal = (item) => {
    setEditModalOpen(true);
    setItem(item)
  };

  const handleOpenCreateModal = () => setCreateModalOpen(true);
  const handleCloseEditModal = () => setEditModalOpen(false);
  const handleCloseCreateModal = () => setCreateModalOpen(false);
  const handleCloseFlash = () => setOpenFlash(false);

  const showFlashNotification = (type = 'success', message = '') => {
    setOpenFlash(true);
    setNotificationType(type);
    setFlashMessage(message);
  }


  const handleUpdate = async (formData) => await updateItem(formData);
  const handleCreate = async (formData) => await createItem(formData);
  const handleDelete = async (id) => await deleteItem(id);

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

      <h1 className="container pt-4 d-flex justify-content-center align-items-center">Jardines</h1>

      <div className="ontainer pt-4 d-flex justify-content-center align-items-center">
        <button className="btn btn-primary" onClick={handleOpenCreateModal}>Nuevo +</button>
      </div>

      <div className="container mt-4 pb-4 d-flex justify-content-center align-items-center">
        <div className="col-7">
          <List properties={properties} items={items} onDelete={handleDelete} handleOpenModal={handleOpenEditModal}/>
        </div>
      </div>

      <EditKinderGarden isOpen={editModalOpen} onClose={handleCloseEditModal} onSave={handleUpdate} item={item}/>
      <CreateKinderGarden isOpen={createModalOpen} onClose={handleCloseCreateModal} onSave={handleCreate}/>
    </div>
  )
}