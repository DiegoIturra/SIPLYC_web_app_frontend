import { useState } from "react";
import { List } from "../components/List"

export const KinderGardensPage = () => {

  //TODO: Replace with items from database
  const initialItems = [
    { id: 1, name: 'Jardin de niños "Niños Heroes"' },
    { id: 2, name: 'Jardin de niños "Josefa Ortiz de Dominguez"' },
    { id: 3, name: 'Jardin de niños "Miguel Hidalgo"' },
    { id: 4, name: 'Jardin de niños "Benito Juarez"' },
    { id: 5, name: 'Jardin de niños "Francisco I. Madero"' },
    { id: 6, name: 'Jardin de niños "Lazaro Cardenas"' },
    { id: 7, name: 'Jardin de niños "Venustiano Carranza"' },
    { id: 8, name: 'Jardin de niños "Adolfo Lopez Mateos"' },
    { id: 9, name: 'Jardin de niños "Plutarco Elias Calles"' },
    { id: 10, name: 'Jardin de niños "Emiliano Zapata"' },
  ];

  const [items, setItems] = useState(initialItems);

  const handleDelete = (id) => {
    const newItems = items.filter(item => item.id !== id);
    setItems(newItems);
  }

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