import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import AuthContext from '../contexts/authContext';
import { getProfileById, updateProfile } from '../services/profileService';

const EditProfile = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { isAuthenticated } = useContext(AuthContext);

    const [profile, setProfile] = useState({
        username: '',
        email: ''
    });
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const data = await getProfileById(id);
                setProfile({
                    username: data.username || '',
                    email: data.email || ''
                });
            } catch (error) {
                setErrorMessage('Error fetching profile details');
                console.error('Error fetching profile:', error);
            }
        };

        fetchProfile();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfile((prevProfile) => ({
            ...prevProfile,
            [name]: value,
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await updateProfile(id, profile);
            setSuccessMessage('Profile updated successfully!');
            navigate(`/profile/`);
        } catch (error) {
            setErrorMessage('Error updating profile. Please try again.');
            console.error('Error updating profile:', error);
        }
    };

    if (!isAuthenticated) {
        return <p>You need to be logged in to edit your profile.</p>;
    }

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
                                        value={profile.username || ''} // Коментар премахнат
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
                                        value={profile.email || ''} // Коментар премахнат
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
