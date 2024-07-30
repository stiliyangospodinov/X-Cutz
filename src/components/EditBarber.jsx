import { useContext, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import AuthContext from "../contexts/authContext";
import CommentsSection from "./Comments";

export default function BarberDetails() {
  const { 
    isAuthenticated, 
    isAdmin,
    username,
  } = useContext(AuthContext);
  const { id } = useParams();

  const [barber, setBarber] = useState({});

  useEffect(() => {
    fetch(`http://localhost:3030/data/barbers/${id}/`)
      .then((res) => res.json())
      .then((data) => {
        console.log('Barber details fetched:', data);
        setBarber(data);
      })
      .catch((error) => console.error('Error fetching barber details:', error));
  }, [id]);

  return (
    <>
      <div className="page-header">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <h2>Barber Details</h2>
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
                <div className="details" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', paddingLeft: '100px', minHeight: '100vh' }}>
                  <div className="col-md-6">
                    <div className="team-item">
                      <div className="team-img">
                        <img src={barber.photo} alt="Team Image" />
                      </div>
                      <div className="team-text">
                        <h2>{barber.name}</h2>
                        <p>{barber.title}</p>
                      </div>
                    </div>
                    <p>{barber.description}</p>
                    {isAuthenticated && isAdmin && (
                      <>
                        <Link className="btn" to={`/edit/${id}`}>
                          Edit
                        </Link>
                        <Link className="btn" to={`/delete/${id}`} style={{ marginLeft: '10px' }}>
                          Delete
                        </Link>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <CommentsSection 
            barberId={id}
            isAuthenticated={isAuthenticated}
            username={username}
          />
          <div className="like-btn"></div>
        </div>
      </div>
    </>
  );
}
