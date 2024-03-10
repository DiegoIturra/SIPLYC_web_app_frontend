import { List } from "../components/List"
import { useQuery } from "react-query";
import { useState, useEffect } from "react";

export const KinderGardensPage = () => {

  const fetchItems = async () => {
    const response = await fetch('http://127.0.0.1:3000/kinder_gardens')
    const data = await response.json()
    return data
  }

  const { isLoading, error, data } = useQuery('repoData', fetchItems);

  const [items, setItems] = useState([]);

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
          <List items={items} onDelete={handleDelete}/>
        </div>
      </div>
    </div>
  )
}