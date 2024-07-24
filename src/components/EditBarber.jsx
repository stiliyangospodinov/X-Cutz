import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getBarberById, updateBarber } from '../services/barberShopService';
import AuthContext from '../contexts/authContext';

const EditBarber = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { token, isAuthenticated } = useContext(AuthContext);

    const [formData, setFormData] = useState({
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
                const barber = await getBarberById(id);
                setFormData({
                    name: barber.name || '',
                    title: barber.title || '',
                    photo: barber.photo || '',
                    description: barber.description || ''
                });
            } catch (error) {
                console.error('Error fetching barber:', error);
            }
        };

        fetchBarber();
    }, [id]);

    const handleChange = (event) => {
        const { id, value } = event.target;
        setFormData({ ...formData, [id]: value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            if (!isAuthenticated) {
                setErrorMessage('You need to be logged in to update a barber.');
                return;
            }
            const updatedBarber = await updateBarber(id, formData);
            setSuccessMessage('Barber updated successfully!');
            console.log('Updated barber:', updatedBarber);
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
                                        <img src={formData.photo.startsWith('http') ? formData.photo : `/${formData.photo}`} alt="Barber" style={{ maxWidth: '100%', marginTop: '10px' }} onError={(e) => e.target.style.display = 'none'} />
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
                                <div style={{ marginTop: '10px' }}>
                                    <button className="btn" type="submit" id="sendMessageButton" style={{ marginRight: '10px' }}>
                                        Update
                                    </button>
                                    <Link className="btn" to={`/barber/${id}`}>
                                        Cancel
                                    </Link>
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
