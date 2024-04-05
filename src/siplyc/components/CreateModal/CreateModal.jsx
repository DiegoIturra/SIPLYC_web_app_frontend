import { useState } from "react";
import './CreateModal.css';

export const CreateModal = ({ isOpen, onClose, onSave }) => {
  
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    phone: '',
    city: ''
  });

  
  const { name, address, phone, city } = formData;

  const onInputChange = ({ target }) => {
    const { name, value } = target;
    setFormData({
      ...formData,
      [ name ]: value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  return (
    isOpen && (
      <div className="modal-overlay">
        <div className="modal-content">

          <form onSubmit={handleSubmit}>
            
            <div className="form-group">
              <label htmlFor="name-input">Nombre</label>
              <input type="text" name="name" onChange={onInputChange} value={name} className="form-control" id="name-input" aria-describedby="nameHelp"/>
            </div>
            
            <div className="form-group">
              <label htmlFor="address-input">Dirección</label>
              <input type="text" name="address" onChange={onInputChange} value={address} className="form-control" id="address-input"/>
            </div>

            <div className="form-group">
              <label htmlFor="phone-input">Teléfono</label>
              <input type="text" name="phone" onChange={onInputChange} value={phone} className="form-control" id="phone-input"/>
            </div>

            <div className="form-group">
              <label htmlFor="city-input">Ciudad</label>
              <input type="text" name="city" onChange={onInputChange} value={city} className="form-control" id="city-input"/>
            </div>

            <div className="button-container">
              <button className="btn btn-danger" onClick={onClose}>Cerrar</button>
              <button className="btn btn-primary" type="submit">Crear</button>
            </div>

          </form>
        </div>
      </div>
    )
  );
}