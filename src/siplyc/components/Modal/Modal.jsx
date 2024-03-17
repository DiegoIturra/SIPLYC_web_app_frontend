import { useState, useEffect } from "react";
import './Modal.css';

export const Modal = ({ isOpen, onClose, onSave, item }) => {
  
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    address: '',
    phone: '',
    city: ''
  });

  useEffect(() => {
    
    setFormData(prevFormData => ({
      ...prevFormData,
      id: item.id,
      name: item.name,
      address: item.address,
      phone: item.phone,
      city: item.city_name
    }));

  }, [item]);
  
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
              <input type="text" name="name" onChange={onInputChange} defaultValue={name} className="form-control" id="name-input" aria-describedby="nameHelp"/>
            </div>
            
            <div className="form-group">
              <label htmlFor="address-input">Dirección</label>
              <input type="text" name="address" onChange={onInputChange} defaultValue={address} className="form-control" id="address-input"/>
            </div>

            <div className="form-group">
              <label htmlFor="phone-input">Teléfono</label>
              <input type="text" name="phone" onChange={onInputChange} defaultValue={phone} className="form-control" id="phone-input"/>
            </div>

            <div className="form-group">
              <label htmlFor="city-input">Ciudad</label>
              <input type="text" name="city" onChange={onInputChange} defaultValue={city} className="form-control" id="city-input"/>
            </div>

            <div className="button-container">
              <button className="btn btn-danger" onClick={onClose}>Cerrar</button>
              <button className="btn btn-primary" type="submit">Actualizar</button>
            </div>

          </form>
        </div>
      </div>
    )
  );
}