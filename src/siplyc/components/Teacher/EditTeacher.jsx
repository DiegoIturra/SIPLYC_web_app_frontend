import { useState, useEffect } from "react";
import Modal from "../Modal/Modal";

export const EditTeacher = ({ isOpen, onClose, onSave, item }) => {
  const [formData, setFormData] = useState({
    id: '',
    rut: '',
    names: '',
    father_lastname: '',
    mother_lastname: '',
    email: '',
  });

  useEffect(() => {
    setFormData({
      id: item.id,
      rut: item.rut,
      names: item.names,
      father_lastname: item.father_lastname,
      mother_lastname: item.mother_lastname,
      email: item.email,
    });
  }, [item]);

  const { rut, names, father_lastname, mother_lastname, email } = formData;

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
        <label htmlFor="rut-input">Rut</label>
        <input type="text" name="rut" onChange={onInputChange} value={rut} className="form-control" id="rut-input" aria-describedby="nameHelp"/>
      </div>
      
      <div className="form-group">
        <label htmlFor="names-input">Nombres</label>
        <input type="text" name="names" onChange={onInputChange} value={names} className="form-control" id="names-input" aria-describedby="nameHelp"/>
      </div>

      <div className="form-group">
        <label htmlFor="father-lastname-input">Apellido Paterno</label>
        <input type="text" name="father_lastname" onChange={onInputChange} value={father_lastname} className="form-control" id="father-lastname-input" aria-describedby="nameHelp"/>
      </div>

      <div className="form-group">
        <label htmlFor="mother-lastname-input">Apellido Materno</label>
        <input type="text" name="mother_lastname" onChange={onInputChange} value={mother_lastname} className="form-control" id="mother-lastname-input" aria-describedby="nameHelp"/>
      </div>

      <div className="form-group">
        <label htmlFor="email-input">Email</label>
        <input type="text" name="email" onChange={onInputChange} value={email} className="form-control" id="email-input" aria-describedby="nameHelp"/>
      </div>
    </Modal>
  );
}