import { useEffect } from "react";

export const FlashNotification = ({ message, type, isVisible, onClose, duration = 3000 }) => {

  const alertType = `alert alert-${type}`;

  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return (
    isVisible ? 
    ( 
      <div className={alertType} role="alert" style={{ marginTop: 0}}>
        {message}
      </div>
    ) : null
  );
}