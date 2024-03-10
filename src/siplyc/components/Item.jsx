import { BsPencilFill } from "react-icons/bs";
import { FaTrashAlt } from "react-icons/fa";

export const Item = ({ item, onDelete }) => {
  return (
    <li className="list-group-item d-flex justify-content-between">
      <span className="align-self-center">{item.name}</span>

      <div className="d-flex justify-content-evenly">
      
        <button className="btn btn-warning me-2">
          <BsPencilFill />
        </button>
        
        <button className="btn btn-danger ms-2" onClick={() => onDelete(item.id)}>
          <FaTrashAlt />
        </button>
      
      </div>
    </li>
  );
}