import { useState } from "react";
import './Modal.css';

export const Modal = ({ isOpen, onClose, onSave, selectedItemId }) => {
  
  const [formData, setFormData] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes realizar acciones con los datos del formulario antes de cerrar el modal
    onSave(formData);
    onClose();
  };

  return (
    isOpen && (
      <div className="modal-overlay">
        <div className="modal-content">
          <button className="close-button" onClick={onClose}>Cerrar</button>
          <form onSubmit={handleSubmit}>
            {/* Renderiza tus campos de formulario aquí */}
            <label>
              Campo 1:
              <input type="text" name="campo1" value={formData.campo1} onChange={handleInputChange} />
            </label>
            <label>ID: {selectedItemId} </label>
            {/* Agrega más campos según tus necesidades */}
            <button type="submit">Guardar</button>
          </form>
        </div>
      </div>
    )
  );
}