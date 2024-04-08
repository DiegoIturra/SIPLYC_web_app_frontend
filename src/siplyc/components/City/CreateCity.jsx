import { useState } from "react";
import Modal from "../Modal/Modal";

export const CreateCity = ({ isOpen, onClose, onSave }) => {
  
  const [formData, setFormData] = useState({ name: '' });
  const { name } = formData;

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
    </Modal>
  );
}