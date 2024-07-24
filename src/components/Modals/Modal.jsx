import React from 'react';
import Modal from 'react-modal';
import './modalStyles.css'
Modal.setAppElement('#root');
const CustomModal = ({ isOpen, onRequestClose, children }) => (
  <Modal
    isOpen={isOpen}
    onRequestClose={onRequestClose}
    className="custom-modal"
    overlayClassName="custom-overlay"
  >
    {children}
  </Modal>
);

export default CustomModal