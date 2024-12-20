import React from 'react';
import './confirmationModalStyles.css';

const ConfirmationModal = ({ isOpen, onConfirm, onCancel }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Are you sure you want to confirm the order?</h2>
        <div className="modal-buttons">
          <button className="btn btn-success" onClick={onConfirm}>
            Yes
          </button>
          <button className="btn btn-danger" onClick={onCancel}>
            No
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
