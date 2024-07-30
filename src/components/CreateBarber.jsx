import React, { useState } from 'react';
import { createBarber } from '../services/barberShopService';
import { Link, useNavigate } from 'react-router-dom';

const CreateBarber = () => {
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = Object.fromEntries(new FormData(event.currentTarget));

        try {
            await createBarber(formData);
            setSuccessMessage('Barber created successfully!');
            navigate('/team');
        } catch (error) {
            setErrorMessage('Error creating barber. Please try again.');
            console.error('Error creating barber:', error);
        }
    };

    return (
        <div>
            <div className="page-header">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <h2>Add new barber</h2>
                        </div>
                        <div className="col-12">
                            <Link to="/">Home</Link>
                            <Link to="/team">Team</Link>
                        </div>
                    </div>
                </div>
            </div>
            <div className="contact">
                <div className="container">
                    <div className="align-items-center">
                        <div className="col-md-4" />
                        <div className="contact-form">
                            {errorMessage && <p className="text-danger">{errorMessage}</p>}
                            {successMessage && <p className="text-success">{successMessage}</p>}
                            <form id="contactForm" onSubmit={handleSubmit}>
                                <div className="control-group">
                                    <input type="text" className="form-control" name="name" placeholder="Name" required />
                                </div>
                                <div className="control-group">
                                    <input type="text" className="form-control" name="title" placeholder="Title" required />
                                </div>
                                <div className="control-group">
                                    <input type="text" className="form-control" name="photo" placeholder="Image URL" required />
                                </div>
                                <div className="control-group">
                                    <textarea className="form-control" name="description" placeholder="Description" required />
                                </div>
                                <div>
                                    <button className="btn" type="submit">Create</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateBarber;
