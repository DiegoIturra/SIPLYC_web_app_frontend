import { List } from "../components/List"
import { useQuery } from "react-query";
import { useState, useEffect } from "react";
import { EditKinderGarden } from "../components/KinderGarden/EditKinderGarden";
import { CreateKinderGarden } from "../components/KinderGarden/CreateKinderGarden";

//TODO: Update page when a new item is created
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
      return data;
    } else {
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
      setItems(prevItems => prevItems.map(item => item.id === data.id ? data : item));
      return data;
    } else {
      throw new Error('Error al crear registro');
    }  
  }

  const { isLoading, error, data } = useQuery('repoData', fetchItems);

  const [items, setItems] = useState([]);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [item, setItem] = useState('');

  const handleOpenEditModal = (item) => {
    setEditModalOpen(true);
    setItem(item)
  };

  const handleOpenCreateModal = () => setCreateModalOpen(true);
  const handleCloseEditModal = () => setEditModalOpen(false);
  const handleCloseCreateModal = () => setCreateModalOpen(false);


  const handleUpdate = async (formData) => {
    const response = await updateItem(formData);
    console.log(response);
  };

  const handleCreate = async (formData) => {
    const response = await createItem(formData);
    console.log(response);
  }

  const handleDelete = (id) => setItems(prevItems => prevItems.filter(item => item.id !== id))

  useEffect(() => {
    if (data) {
      setItems(data);
    }
  }, [data]);

  if (isLoading) return 'Loading...'

  if (error) return 'An error has occurred: ' + error.message

  return (
    <div style={{ backgroundColor: '#00ac96', minHeight: '100vh' }}>
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