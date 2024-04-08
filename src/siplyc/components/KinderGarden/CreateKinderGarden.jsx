import { useState } from "react";
import Modal from "../Modal/Modal";

export const CreateKinderGarden = ({ isOpen, onClose, onSave }) => {
  
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

  return (
    <Modal isOpen={isOpen} onClose={onClose} onSave={() => onSave(formData)}>
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
    </Modal>
  );
}