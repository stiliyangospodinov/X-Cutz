import React, { useState } from 'react';
import { createBarber } from '../../services/barberShopService';
import { useNavigate } from 'react-router-dom';
import useForm from '../../hooks/useForm';
import PageHeader from '../Shared/PageHeader/PageHeader';

const initialValues = { name: '', title: '', photo: '', description: '' };

const CreateBarber = () => {
    const [message, setMessage] = useState({ type: '', text: '' });
    const navigate = useNavigate();

    const submitHandler = async (formData) => {
        try {
            await createBarber(formData);
            setMessage({ type: 'success', text: 'Barber created successfully!' });
            navigate('/team');
        } catch (error) {
            setMessage({ type: 'error', text: 'Error creating barber. Please try again.' });
            console.error('Error creating barber:', error);
        }
    };

    const { values, onChange, onSubmit } = useForm(submitHandler, initialValues);

    return (
        <div>
  <PageHeader name="Barbers" endpoint="team" />
            <div className="contact">
                <div className="container">
                    <div className="align-items-center">
                        <div className="col-md-4" />
                        <div className="contact-form">
                            {message.text && (
                                <p className={message.type === 'error' ? 'text-danger' : 'text-success'}>
                                    {message.text}
                                </p>
                            )}
                            <form id="createBarberForm" onSubmit={onSubmit}>
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
