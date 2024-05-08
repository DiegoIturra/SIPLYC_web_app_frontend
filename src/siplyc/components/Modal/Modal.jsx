import './Modal.css';

const Modal = ({ isOpen, onClose, onSave, children, textButton = 'Guardar'}) => {

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave();
    onClose();
  };

  return (
    isOpen && (
      <div className="modal-overlay">
        <div className="modal-content">
          <form onSubmit={handleSubmit}>
            {children}
            <div className="button-container">
              <button className="btn btn-danger" onClick={onClose}>Cerrar</button>
              <button className="btn btn-primary" type="submit">{textButton}</button>
            </div>
          </form>
        </div>
      </div>
    )
  );
}

export default Modal;
