import { BsPencilFill } from "react-icons/bs";
import { FaTrashAlt } from "react-icons/fa";

export const ListItem = ({ properties, item, onDelete = () => {}, onClick = () => {}, handleOpenModal = () => {}}) => {
  
  const getNestedValue = (obj, path) => {
    return path.split('.').reduce((acc, part) => acc && acc[part], obj);
  };


  return (
    <tr>                
      {
        properties.map((property, index) => (
          (index !== properties.length - 1) ? 
          
          (<td onClick={() => onClick(item)} key={index} scope="row" style={{cursor: 'pointer'}}>{getNestedValue(item, property.key)}</td>) :
          
          (
            <td key={index} scope="row">
              <div className="d-flex justify-content-evenly">
    
                <button 
                  className="btn btn-warning me-2" 
                  style={{ marginRight: '5px' }}
                  onClick={() => handleOpenModal(item)} 
                >
                  <BsPencilFill />
                </button>
                
                <button 
                  className="btn btn-danger ms-2" 
                  onClick={() => onDelete(item.id)}
                >
                  <FaTrashAlt />
                </button>
              
              </div>
            </td>
          )
        ))
      }
    </tr>
  );
}