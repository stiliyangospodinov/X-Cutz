import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import * as barberService from "../../services/barberShopService";
import BarberCard from "../Cards/BarberCard/BarberCard";
import AuthContext from "../../contexts/authContext";
import PageHeader from "../Shared/PageHeader/PageHeader";
export default function Barber() {
  const {
    isAuthenticated,
    isAdmin
    
  } = useContext(AuthContext);

  const [barbers, setBarbers] = useState([]);
  useEffect(() => {
    barberService.getAllBarbers()
      .then(result => setBarbers(result));
    }, []);
    if (!barbers) {
      return<h2>No barbers</h2>;
    }
    console.log(barbers);
    return (
      <div>
  <PageHeader name="Barbers" endpoint="team" />
    <div className="team">
        <div className="container">
          <div className="section-header text-center">
            <p>Our Barber Team</p>
            <h2>Meet Our Hair Cut Expert Barber</h2>
          </div>
          <div className="row">
          {barbers.map(barber => (
            <BarberCard
            key={barber._id}
            name = {barber.name}
            title={barber.title}
            photo={barber.photo}
            id={barber._id}
            />
          ))}
            {isAuthenticated && isAdmin && (
              <div className="col-lg-3 col-md-6">
                <Link to="/create" className="team-item">
                  <div className="team-img">
                    <img src="https://cdn2.iconfinder.com/data/icons/small-buttons/64/Button_not_pressed_with_add_icon-512.png" alt="Team Image" />
                  </div>
                    <div className="team-text">
                      <h2>Add new barber</h2>
                    </div>
                  </Link> 
                </div>
            
          )}
          </div>
        </div>
      </div>
      </div>
    );
}