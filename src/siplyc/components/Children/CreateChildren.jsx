import { useState } from "react";
import DatePicker from "react-date-picker";
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';
import Calendar from "react-calendar";
import Modal from "../Modal/Modal";

export const CreateChildren = ({ isOpen, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    rut: '',
    names: '',
    father_lastname: '',
    mother_lastname: '',
    birthday: '',
    gender: '',
    group: '',
    email: '',
    state: ''
  });

  const onInputChange = ({ target }) => {
    const { name, value } = target;
    setFormData({
      ...formData,
      [name]: value
    });

    console.log(value);
  };

  const { 
    rut, 
    names, 
    father_lastname, 
    mother_lastname, 
    birthday,
    gender,
    group,
    email,
    state
   } = formData;

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
        <label htmlFor="birthday-input">Nacimiento</label>
        <Calendar onChange={onInputChange} value={birthday} />
        {/* <DatePicker onChange={onInputChange} value={birthday} /> */}
        {/* <label htmlFor="birthday-input">Nacimiento</label>
        <input type="text" name="birthday" onChange={onInputChange} value={birthday} className="form-control" id="birthday-input" aria-describedby="nameHelp"/> */}
      </div>

      <div className="form-group">
        <label htmlFor="gender-input">Sexo</label>
        <input type="text" name="gender" onChange={onInputChange} value={gender} className="form-control" id="gender-input" aria-describedby="nameHelp"/>
      </div>

      <div className="form-group">
        <label htmlFor="group-input">Grupo</label>
        <input type="text" name="group" onChange={onInputChange} value={group} className="form-control" id="group-input" aria-describedby="nameHelp"/>
      </div>

      <div className="form-group">
        <label htmlFor="email-input">Email</label>
        <input type="text" name="email" onChange={onInputChange} value={email} className="form-control" id="email-input" aria-describedby="nameHelp"/>
      </div>

      <div className="form-group">
        <label htmlFor="state-input">Estado</label>
        <input type="text" name="state" onChange={onInputChange} value={state} className="form-control" id="state-input" aria-describedby="nameHelp"/>
      </div>
    </Modal>
  );
}