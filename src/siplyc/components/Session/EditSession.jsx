import { useState, useEffect } from "react";
import Modal from "../Modal/Modal";

export const EditSession = ({ onClose, onSave, item }) => {
  const [formData, setFormData] = useState({
    id: '',
    comments: '',
  });

  useEffect(() => {
    setFormData({
      id: item.id,
      comments: item.comments,
    });
  }, [item]);

  const { comments } = formData;

  const onInputChange = ({ target }) => {
    const { name, value } = target;
    setFormData({
      ...formData,
      [name]: value
    });
  };


  return (
    <Modal onClose={onClose} onSave={() => onSave(formData)} textButton="Actualizar">
      <div className="form-group">
        <label htmlFor="comments-input">Nombres</label>
        <input type="text" name="comments" onChange={onInputChange} value={comments} className="form-control" id="comments-input" aria-describedby="nameHelp"/>
      </div>
    </Modal>
  )
}