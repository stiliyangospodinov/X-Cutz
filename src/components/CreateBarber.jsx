import React, { useState, useContext } from 'react';
import { createBarber } from '../services/barberShopService';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../contexts/authContext';

const CreateBarber = () => {
    const { isAuthenticated } = useContext(AuthContext);
    const [formData, setFormData] = useState({
        name: '',
        title: '',
        photo: '',
        description: ''
    });

    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const navigate = useNavigate();

    const handleChange = (event) => {
        const { id, value } = event.target;
        setFormData({ ...formData, [id]: value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            if (!isAuthenticated) {
                setErrorMessage('You need to be logged in to create a barber.');
                return;
            }

            console.log('Form data:', formData); // Логирай данните от формуляра

            const newBarber = await createBarber(formData);

            setSuccessMessage('Barber created successfully!');
            console.log('Created barber:', newBarber);

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
                            <form name="sentMessage" id="contactForm" onSubmit={handleSubmit}>
                                <div className="control-group">
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="name"
                                        placeholder="Name"
                                        required
                                        value={formData.name}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="control-group">
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="title"
                                        placeholder="Title"
                                        required
                                        value={formData.title}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="control-group">
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="photo"
                                        placeholder="Image URL"
                                        required
                                        value={formData.photo}
                                        onChange={handleChange}
                                    />
                                    {formData.photo && (
                                        <img src={formData.photo} alt="Barber" style={{ maxWidth: '100%', marginTop: '10px' }} onError={(e) => e.target.style.display = 'none'} />
                                    )}
                                </div>
                                <div className="control-group">
                                    <textarea
                                        className="form-control"
                                        id="description"
                                        placeholder="Description"
                                        required
                                        value={formData.description}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div>
                                    <button className="btn" type="submit" id="sendMessageButton">
                                        Create
                                    </button>
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
