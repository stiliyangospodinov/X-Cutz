import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../contexts/authContext";
import { getProfile } from "../../services/profileService"; // Предполага се, че `getProfile` е в този файл


export default function Profile() {
  const { isAuthenticated, username, id } = useContext(AuthContext);
  const [profileData, setProfileData] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const data = await getProfile();
        setProfileData(data);
      } catch (error) {
        setError('Failed to fetch profile data');
      }
    };

    if (isAuthenticated) {
      fetchProfileData();
    }
  }, [isAuthenticated]);

  return (
    <>
      <div className="page-header">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <h2>Profile</h2>
            </div>
            <div className="col-12">
              <Link to="/">Home</Link>
              <Link to="/team">Team</Link>
            </div>
          </div>
        </div>
      </div>
      <div className="contact">
        <div className="contact-form" style={{ backgroundColor: 'white' }}>
          <div className="team">
            <div className="container">
              <div className="row">
                <div className="details" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', paddingLeft: '50px', minHeight: '100vh' }}>
                  <div className="col-md-6">
                    <div className="team-item">
                      <div className="team-img">
                        <img src="https://static.vecteezy.com/system/resources/previews/005/544/718/non_2x/profile-icon-design-free-vector.jpg" alt="Profile" />
                      </div>
                      <div className="team-text">
                        <h2>{profileData?.username || username}</h2>
                        <p>{profileData?.email || 'No email available'}</p>
                      </div>
                    </div>
                    <p>Profile</p>
                    {isAuthenticated && (
                      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <Link className="btn" to='/'>
                          Home
                        </Link>
                        <Link className="btn" to="/logout" style={{ marginLeft: '10px' }}>
                          Logout
                        </Link>
                      </div>
                    )}
                    {error && <p className="text-danger">{error}</p>}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="like-btn"></div>
        </div>
      </div>
    </>
  );
}
