import React, { createContext, useState, useContext, useCallback } from 'react';

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [notification, setNotification] = useState(null); // For simple alerts
  const [confirmation, setConfirmation] = useState(null); // For confirm/cancel dialogs

  const showNotification = useCallback((message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification(null);
    }, 3000);
  }, []);

  const showConfirmation = useCallback((message, onConfirm) => {
    setConfirmation({ message, onConfirm });
  }, []);

  const hideNotification = () => setNotification(null);
  const hideConfirmation = () => setConfirmation(null);

  const handleConfirm = () => {
    if (confirmation && confirmation.onConfirm) {
      confirmation.onConfirm();
    }
    hideConfirmation();
  };

  const value = { showNotification, showConfirmation };

  return (
    <NotificationContext.Provider value={value}>
      {children}
      {notification && <AlertBox message={notification.message} onClose={hideNotification} />}
      {confirmation && <ConfirmationBox message={confirmation.message} onConfirm={handleConfirm} onCancel={hideConfirmation} />}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => useContext(NotificationContext);

const AlertBox = ({ message, onClose }) => (
  <div className="notification-overlay">
    <div className="notification-box">
      <p>{message}</p>
      <button onClick={onClose} className="notification-close-btn">OK</button>
    </div>
  </div>
);

const ConfirmationBox = ({ message, onConfirm, onCancel }) => (
  <div className="notification-overlay">
    <div className="notification-box confirmation-box">
      <p>{message}</p>
      <div className="confirmation-actions">
        <button onClick={onCancel} className="confirmation-btn cancel-btn">Cancel</button>
        <button onClick={onConfirm} className="confirmation-btn confirm-btn">Delete</button>
      </div>
    </div>
  </div>
);