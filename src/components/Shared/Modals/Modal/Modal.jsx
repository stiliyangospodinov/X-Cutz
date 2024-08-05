import React from 'react';
import './modalStyles.css';

const Modal = ({ isOpen, onClose, service }) => {
    if (!isOpen || !service) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>{service.title}</h2>
                <p>{service.description}</p>
                <p>{service.more}</p>
                <button onClick={onClose}>Close</button>
            </div>
        </div>
    );
};

export default Modal;