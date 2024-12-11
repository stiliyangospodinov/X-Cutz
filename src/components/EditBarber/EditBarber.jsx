import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getBarberById, updateBarber } from '../../services/barberShopService';
import useForm from '../../hooks/useForm';
import PageHeader from '../Shared/PageHeader/PageHeader';

const EditBarber = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const initialValues = { name: '', title: '', photo: '', description: '' };

    const handleSubmit = async (formData) => {
        try {
            await updateBarber(id, formData);
            setSuccessMessage('Barber updated successfully!');
            navigate(`/barber/${id}`);
        } catch (error) {
            setErrorMessage('Error updating barber. Please try again.');
            console.error('Error updating barber:', error);
        }
    };

    const { values, onChange, onSubmit, setValues } = useForm(handleSubmit, initialValues);

    useEffect(() => {
        const fetchBarber = async () => {
            try {
                const data = await getBarberById(id);
                setValues(data); 
            } catch (error) {
                setErrorMessage('Error fetching barber details');
                console.error('Error fetching barber:', error);
            }
        };

        fetchBarber();
    }, [id, setValues]);

    return (
        <div>
  <PageHeader name="Barbers" endpoint="team" />
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
                                    <button className="btn" type="submit">Update</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditBarber;
