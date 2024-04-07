import { List } from "../components/List"
import { useState, useEffect } from "react";
import { useQuery } from "react-query";

export const CitiesPage = () => {

  const fetchItems = async () => {
    // TODO: Replace raw string with enviroment variable
    const response = await fetch('http://127.0.0.1:3000/cities')
    const data = await response.json()
    return data
  }

  const { isLoading, error, data } = useQuery('repoData', fetchItems);

  const properties = [
    { label: 'Nombre', key: 'name' },
    { label: 'Acciones', key: 'actions' }
  ]
  
  const [items, setItems] = useState([]);

  const handleOpenCreateModal = () => {
    console.log('openging modal');
  }

  const handleDelete = () => {
    console.log('deleting item');
  }

  const handleOpenEditModal = () => {
    console.log('opening edit modal');
  }

  useEffect(() => {
    if (data) {
      setItems(data);
    }
  }, [data]);

  if (isLoading) return 'Loading...'

  if (error) return 'An error has occurred: ' + error.message

  return (
    <div style={{ backgroundColor: '#00ac96', minHeight: '100vh' }}>
      <h1 className="container pt-4 d-flex justify-content-center align-items-center">Ciudades</h1>

      <div className="ontainer pt-4 d-flex justify-content-center align-items-center">
        <button className="btn btn-primary" onClick={handleOpenCreateModal}>Nuevo +</button>
      </div>

      <div className="container mt-4 pb-4 d-flex justify-content-center align-items-center">
        <div className="col-7">
          <List properties={properties} items={items} onDelete={handleDelete} handleOpenModal={handleOpenEditModal}/>
        </div>
      </div>
    </div>
  )
}