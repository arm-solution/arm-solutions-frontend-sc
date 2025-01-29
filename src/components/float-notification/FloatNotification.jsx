import React, { useEffect } from 'react';
import './FloatNotification.css';

const FloatNotification = ({ message, type, onClose = () => {} }) => {
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        onClose();
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [message, onClose]);

  if (!message) return null;

  const alertType = type === 'error' ? 'alert-error' : 'alert-success';

  return (
    <div className={`float-notification ${alertType}`}>
      <span>{message}</span>
      <span className="close-icon">
        <i className="lni lni-close" onClick={onClose}></i>
      </span>
    </div>
  );
};

export default FloatNotification;
