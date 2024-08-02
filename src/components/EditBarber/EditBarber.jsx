import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getBarberById, updateBarber } from '../../services/barberShopService';

const EditBarber = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [barber, setBarber] = useState({
        name: '',
        title: '',
        photo: '',
        description: ''
    });
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    useEffect(() => {
        const fetchBarber = async () => {
            try {
                const data = await getBarberById(id);
                setBarber(data);
            } catch (error) {
                setErrorMessage('Error fetching barber details');
                console.error('Error fetching barber:', error);
            }
        };

        fetchBarber();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setBarber((prevBarber) => ({
            ...prevBarber,
            [name]: value,
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await updateBarber(id, barber);
            setSuccessMessage('Barber updated successfully!');
            navigate(`/barber/${id}`);
        } catch (error) {
            setErrorMessage('Error updating barber. Please try again.');
            console.error('Error updating barber:', error);
        }
    };

    return (
        <div>
            <div className="page-header">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <h2>Edit Barber</h2>
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
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="name"
                                        placeholder="Name"
                                        value={barber.name}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="control-group">
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="title"
                                        placeholder="Title"
                                        value={barber.title}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="control-group">
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="photo"
                                        placeholder="Image URL"
                                        value={barber.photo}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="control-group">
                                    <textarea
                                        className="form-control"
                                        name="description"
                                        placeholder="Description"
                                        value={barber.description}
                                        onChange={handleChange}
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
