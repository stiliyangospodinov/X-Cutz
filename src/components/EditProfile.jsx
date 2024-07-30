import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getProfileById, updateProfile } from '../services/authService';
import AuthContext from '../contexts/authContext';

const EditProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { token, isAuthenticated } = useContext(AuthContext);

  const [profile, setProfile] = useState({
    username: '',
    email: ''
  });

  useEffect(() => {
    getProfileById(id)
      .then(result => {
        setProfile({
          username: result.username || '',
          email: result.email || ''
        });
      })
      .catch(error => {
        console.error('Error fetching profile:', error);
      });
  }, [id]);

  const editProfileSubmitHandler = async (e) => {
    e.preventDefault();

    const values = Object.fromEntries(new FormData(e.currentTarget));

    try {
      await updateProfile(id, values);
      navigate(`/profile/${id}`);
    } catch (err) {
      console.log('Error updating profile:', err);
    }
  };

  const onChange = (e) => {
    setProfile(state => ({
      ...state,
      [e.target.name]: e.target.value
    }));
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
              <form id="editProfileForm" onSubmit={editProfileSubmitHandler}>
                <div className="control-group">
                  <input
                    type="text"
                    className="form-control"
                    id="username"
                    name="username"
                    placeholder="Username"
                    required
                    value={profile.username}
                    onChange={onChange}
                  />
                </div>
                <div className="control-group">
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    placeholder="Email"
                    required
                    value={profile.email}
                    onChange={onChange}
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
