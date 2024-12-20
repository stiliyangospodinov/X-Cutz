import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import useForm from '../../hooks/useForm';
import AuthContext from '../../contexts/authContext';
import { clearCart } from '../../slices/cartSlice';
import { useDispatch } from 'react-redux';
import Modal from "../Shared/Modals/Modal/Modal";
import PageHeader from '../Shared/PageHeader/PageHeader';
import ConfirmationModal from '../Shared/Modals/ConfirmationModal/ConfirmationModal';

const initialValues = { fullName: '', address: '', city: '', postalCode: '' };

const Payment = () => {
    const [isModalOpen, setIsModalOpen] = useState(false); // Успешен модал
    const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false); // Потвърдителен модал
    const [modalService, setModalService] = useState({ title: '' });
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { username } = useContext(AuthContext); 
    const cartTotal = JSON.parse(localStorage.getItem('cartTotal')) || 0; 

    const submitHandler = async () => {
        setIsConfirmationModalOpen(false);
        try {
            setModalService({ title: 'Your payment has been successfully processed!' });
            setIsModalOpen(true);
            dispatch(clearCart());
            setTimeout(() => {
                setIsModalOpen(false);
                navigate('/');
            }, 2000);
        } catch (error) {
            console.error('Error processing payment:', error);
        }
    };

    const { values, onChange } = useForm(() => setIsConfirmationModalOpen(true), initialValues);

    return (
        <div>
            <PageHeader name="Cart" endpoint="cart" /> 
            <div className="contact">
                <div className="container">
                    <div className="align-items-center">
                        <div className="contact-form">
                            <form id="paymentForm" onSubmit={(e) => { e.preventDefault(); setIsConfirmationModalOpen(true); }}>
                                <div className="control-group">
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="fullName"
                                        placeholder="Full Name"
                                        value={values.fullName}
                                        onChange={onChange}
                                        required
                                    />
                                </div>
                                <div className="control-group">
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="address"
                                        placeholder="Delivery Address"
                                        value={values.address}
                                        onChange={onChange}
                                        required
                                    />
                                </div>
                                <div className="control-group">
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="city"
                                        placeholder="City"
                                        value={values.city}
                                        onChange={onChange}
                                        required
                                    />
                                </div>
                                <div className="control-group">
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="postalCode"
                                        placeholder="Postal Code"
                                        value={values.postalCode}
                                        onChange={onChange}
                                        required
                                    />
                                </div>
                                <div className="text-center mt-3">
                                    <p>Total to Pay: <strong>{cartTotal.toFixed(2)} lv</strong></p>
                                    <button className="btn btn-warning" type="submit">Confirm Payment</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            {/* Потвърдителен модал */}
            <ConfirmationModal
                isOpen={isConfirmationModalOpen}
                onConfirm={submitHandler}
                onCancel={() => setIsConfirmationModalOpen(false)}
            />

            {/* Успешен модал */}
            <Modal 
                isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)} 
                service={modalService} 
            />
        </div>
    );
};

export default Payment;
