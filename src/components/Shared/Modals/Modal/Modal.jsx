import React, { useState } from 'react';
import './modalStyles.css';

const Modal = ({ isOpen, onClose, service }) => {
    const [closing, setClosing] = useState(false);

    const handleClose = () => {
        setClosing(true);
        setTimeout(() => {
            onClose();
            setClosing(false); 
        }, 300);
    };

    if (!isOpen && !closing) return null;

    return (
        <div className={`modal-overlay ${closing ? 'closing' : ''}`}>
            <div className="modal-content">
                <h2>{service?.title}</h2>
                <p>{service?.description}</p>
                <p>{service?.more}</p>
                <button onClick={handleClose}>Close</button>
            </div>
        </div>
    );
};

export default Modal;
