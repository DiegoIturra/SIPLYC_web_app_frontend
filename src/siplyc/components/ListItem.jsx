import { BsPencilFill } from "react-icons/bs";
import { FaTrashAlt } from "react-icons/fa";

export const ListItem = ({ properties, item, onDelete, handleOpenModal }) => {
  return (
    <tr>                
      {
        properties.map((property, index) => (
          (index !== properties.length - 1) ? 
          
          (<td key={index} scope="row">{item[property.key]}</td>) :
          
          (
            <td key={index} scope="row">
              <div className="d-flex justify-content-evenly">
    
                <button onClick={() => handleOpenModal(item)} className="btn btn-warning me-2">
                  <BsPencilFill />
                </button>
                
                <button className="btn btn-danger ms-2" onClick={() => onDelete(item.id)}>
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