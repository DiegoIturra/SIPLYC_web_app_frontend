import { List } from "../components/List"
import { useQuery } from "react-query";
import { useState, useEffect } from "react";
import { Modal } from "../components/Modal/Modal";

export const KinderGardensPage = () => {

  const fetchItems = async () => {
    // TODO: Replace raw string with enviroment variable
    const response = await fetch('http://127.0.0.1:3000/kinder_gardens')
    const data = await response.json()
    return data
  }

  const properties = [
    { label: 'Nombre', key: 'name' },
    { label: 'Dirección', key: 'address' },
    { label: 'Teléfono', key: 'phone' },
    { label: 'Ciudad', key: 'city_name' },
    { label: 'Acciones', key: 'actions' }
  ]

  const { isLoading, error, data } = useQuery('repoData', fetchItems);

  const [items, setItems] = useState([]);

  // Modal options
  const [modalOpen, setModalOpen] = useState(false);
  const [item, setItem] = useState('');

  const handleOpenModal = (item) => {
    setModalOpen(true);
    setItem(item)
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleSaveModal = (formData) => {
    // Realiza acciones con los datos del formulario aquí
    console.log('Datos guardados:', formData);
  };

  useEffect(() => {
    if (data) {
      setItems(data);
    }
  }, [data]);

  const handleDelete = (id) => setItems(prevItems => prevItems.filter(item => item.id !== id))

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
          <List properties={properties} items={items} onDelete={handleDelete} handleOpenModal={handleOpenModal}/>
        </div>
      </div>

      <Modal isOpen={modalOpen} onClose={handleCloseModal} onSave={handleSaveModal} item={item}/>
    </div>
  )
}