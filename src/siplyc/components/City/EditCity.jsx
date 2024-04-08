import { useState, useEffect } from "react";
import Modal from "../Modal/Modal";

export const EditCity = ({ isOpen, onClose, onSave, item }) => {
  const [formData, setFormData] = useState({
    id: '',
    name: '',
  });

  useEffect(() => {
    setFormData({
      id: item.id,
      name: item.name,
    });
  }, [item]);

  const { name } = formData;

  const onInputChange = ({ target }) => {
    const { name, value } = target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} onSave={() => onSave(formData)} textButton="Actualizar">
      <div className="form-group">
        <label htmlFor="name-input">Nombre</label>
        <input type="text" name="name" onChange={onInputChange} value={name} className="form-control" id="name-input" aria-describedby="nameHelp"/>
      </div>
    </Modal>
  );
}