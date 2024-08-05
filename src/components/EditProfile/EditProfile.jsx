import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getProfile, updateProfile } from '../../services/profileService';

const EditProfile = () => {
    const { id } = useParams(); // Получаване на id от URL
    const navigate = useNavigate();

    const [profile, setProfile] = useState({ username: '', email: '' });
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                // Получаване на профилните данни, включително ID-то
                const profileData = await getProfile(id);
                setProfile(profileData);
            } catch (error) {
                setErrorMessage('Failed to fetch profile data');
                console.error('Fetch profile error:', error);
            }
        };

        fetchProfile();
    }, [id]); // Добавете зависимост id, за да се изпълни отново при промяна на id

    useEffect(() => {
        if (successMessage) {
            const timer = setTimeout(() => {
                setSuccessMessage('');
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [successMessage]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setProfile((prevProfile) => ({
            ...prevProfile,
            [name]: value
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await updateProfile(profile, id); // Изпращане на профилните данни за актуализация
            setSuccessMessage('Profile updated successfully!');
            navigate(`/profile/${id}`); // Връщане към профила след успешен ъпдейт
        } catch (error) {
            setErrorMessage('Failed to update profile');
            console.error('Update profile error:', error);
        }
    };

    return (
        <div>
            <div className="page-header">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <h2>Edit Profile</h2>
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
                            <form id="editProfileForm" onSubmit={handleSubmit}>
                                <div className="control-group">
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="username"
                                        placeholder="Username"
                                        value={profile.username}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="control-group">
                                    <input
                                        type="email"
                                        className="form-control"
                                        name="email"
                                        placeholder="Email"
                                        value={profile.email}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div style={{ marginTop: '10px' }}>
                                    <button className="btn" type="submit" style={{ marginRight: '10px' }}>
                                        Update
                                    </button>
                                    <Link className="btn" to={`/profile/${id}`}>
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

export default EditProfile;

