import { useState } from "react";
import { FileUploader } from "../../components/FileUploader/FileUploader"
import { FlashNotification } from "../components/FlashNotification";

export const FilesPage = () => {

  const [flashMessage, setFlashMessage] = useState('');
  const [openFlash, setOpenFlash] = useState(false);
  const [notificationType, setNotificationType] = useState('success');

  const showSuccessNotification = () => {
    setOpenFlash(true);
    setNotificationType('success');
    setFlashMessage('Datos subidos correctamente');
  }

  const showErrorNotification = () => {
    setOpenFlash(true);
    setNotificationType('danger');
    setFlashMessage('Error al subir datos');
  }


  const handleCloseFlash = () => setOpenFlash(false);

  return (
    <div style={{ backgroundColor: '#00ac96', minHeight: '100vh' }}>
      <FlashNotification message={flashMessage} isVisible={openFlash} type={notificationType} onClose={handleCloseFlash}/>
      <FileUploader onSuccess={showSuccessNotification} onError={showErrorNotification}/>
    </div>
  )
}