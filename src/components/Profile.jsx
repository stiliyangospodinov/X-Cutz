import AuthContext from "../contexts/authContext";
import { useContext } from "react";
import { Link } from "react-router-dom";
export default function Profile(){
    const {
        isAuthenticated,
        username,
        email,
        id
      

      } = useContext(AuthContext);
    
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
                      <img src="https://static.vecteezy.com/system/resources/previews/005/544/718/non_2x/profile-icon-design-free-vector.jpg" alt="Team Image" />
                    </div>
                    <div className="team-text">
                      <h2>{username}</h2>
                      <p>{email}</p>
                    </div>
                  </div>
                  <p>Profile</p>
                  {isAuthenticated && (
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                  <Link className="btn" to={`/profile/${id}`}>
                    Edit
                  </Link>
                  <Link className="btn" to="/" style={{ marginLeft: '10px' }}>
                    Home
                  </Link>
                  </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="like-btn">
  
        </div>
        </div>
        </div>
      </>
    );

}