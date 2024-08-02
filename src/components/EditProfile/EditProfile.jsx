import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getProfile, updateProfile } from '../../services/profileService';

const EditProfile = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [profile, setProfile] = useState({ username: '', email: '' });
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const profileData = await getProfile();
                setProfile(profileData);
            } catch (error) {
                setErrorMessage('Failed to fetch profile data');
                console.error('Fetch profile error:', error);
            }
        };

        fetchProfile();
    }, []);

    useEffect(() => {
        if (successMessage) {
            // Допълнителна логика, ако е необходимо, когато профилът е успешно обновен
            // Например, можете да изчистите съобщението за успех след известно време
            const timer = setTimeout(() => {
                setSuccessMessage('');
            }, 3000); // Изчистване след 3 секунди
            return () => clearTimeout(timer);
        }
    }, [successMessage]); // Следи за промяна в successMessage

    const handleChange = (event) => {
        setProfile({
            ...profile,
            [event.target.name]: event.target.value
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await updateProfile(profile);
            setSuccessMessage('Profile updated successfully!');
            navigate(`/profile/${id}`);
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
