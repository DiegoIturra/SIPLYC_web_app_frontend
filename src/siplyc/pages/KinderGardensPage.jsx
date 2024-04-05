import { List } from "../components/List"
import { useQuery } from "react-query";
import { useState, useEffect } from "react";
import { EditModal } from "../components/EditModal/EditModal";

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

  const { isLoading, error, data } = useQuery('repoData', fetchItems);

  const [items, setItems] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [item, setItem] = useState('');

  const handleOpenEditModal = (item) => {
    setModalOpen(true);
    setItem(item)
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleUpdate = async (formData) => {
    const response = await updateItem(formData);
    console.log(response);
  };


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
        <button className="btn btn-primary">Nuevo +</button>
      </div>

      <div className="container mt-4 pb-4 d-flex justify-content-center align-items-center">
        <div className="col-7">
          <List properties={properties} items={items} onDelete={handleDelete} handleOpenModal={handleOpenEditModal}/>
        </div>
      </div>

      <EditModal isOpen={modalOpen} onClose={handleCloseModal} onSave={handleUpdate} item={item}/>
    </div>
  )
}