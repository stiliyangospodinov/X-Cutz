import React, { useState } from 'react';
import { createBarber } from '../../services/barberShopService';
import { Link, useNavigate } from 'react-router-dom';
import useForm from '../../hooks/useForm';

const CreateBarber = () => {
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate();

    const { values, onChange, onSubmit } = useForm(async (formData) => {
        try {
            await createBarber(formData);
            setSuccessMessage('Barber created successfully!');
            navigate('/team');
        } catch (error) {
            setErrorMessage('Error creating barber. Please try again.');
            console.error('Error creating barber:', error);
        }
    }, { name: '', title: '', photo: '', description: '' });

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
                            <form id="contactForm" onSubmit={onSubmit}>
                                <div className="control-group">
                                    <input 
                                        type="text" 
                                        className="form-control" 
                                        name="name" 
                                        placeholder="Name" 
                                        value={values.name} 
                                        onChange={onChange} 
                                        required 
                                    />
                                </div>
                                <div className="control-group">
                                    <input 
                                        type="text" 
                                        className="form-control" 
                                        name="title" 
                                        placeholder="Title" 
                                        value={values.title} 
                                        onChange={onChange} 
                                        required 
                                    />
                                </div>
                                <div className="control-group">
                                    <input 
                                        type="text" 
                                        className="form-control" 
                                        name="photo" 
                                        placeholder="Image URL" 
                                        value={values.photo} 
                                        onChange={onChange} 
                                        required 
                                    />
                                </div>
                                <div className="control-group">
                                    <textarea 
                                        className="form-control" 
                                        name="description" 
                                        placeholder="Description" 
                                        value={values.description} 
                                        onChange={onChange} 
                                        required 
                                    />
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
