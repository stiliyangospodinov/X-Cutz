import { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../contexts/authContext";

export default function Header() {
  const {
    isAuthenticated,
    username,
  } = useContext(AuthContext);

  return (
    <>
      <div className="top-bar d-none d-md-block">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-6">
              <div className="top-bar-left">
                <div className="text">
                  <h2>8:00 - 20:00</h2>
                  <p>Opening Hour Mon - Fri</p>
                </div>
                <div className="text">
                  <h2>+359 897 625 888</h2>
                  <p>Call Us For Appointment</p>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="top-bar-right">
                <div className="social">
                  <a href="http://twitter.com">
                    <i className="fab fa-twitter" />
                  </a>
                  <a href="http://facebook.com">
                    <i className="fab fa-facebook-f" />
                  </a>
                  <a href="http://linkedin.com">
                    <i className="fab fa-linkedin-in" />
                  </a>
                  <a href="http://instagram.com">
                    <i className="fab fa-instagram" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="navbar navbar-expand-lg bg-dark navbar-dark">
        <div className="container-fluid">
          <Link to="/" className="navbar-brand">
            <span>X</span> CUTZ
          </Link>
          <button
            type="button"
            className="navbar-toggler"
            data-toggle="collapse"
            data-target="#navbarCollapse"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div
            className="collapse navbar-collapse justify-content-between"
            id="navbarCollapse"
          >
            <div className="navbar-nav ml-auto">
              <Link to="/" className="nav-item nav-link active">
                Home
              </Link>
              <Link to="/about" className="nav-item nav-link">
                About
              </Link>
              <Link to="/service" className="nav-item nav-link">
                Service
              </Link>
              <Link to="/prices" className="nav-item nav-link">
                Prices
              </Link>
              <Link to="/team" className="nav-item nav-link">
                Barbers
              </Link>
              <Link to="/gallery" className="nav-item nav-link">
                Gallery
              </Link>

              {isAuthenticated && (
                <>
                  <Link to="/profile" className="nav-item nav-link">{username}'s Profile</Link>
                  <Link to="/logout" className="nav-item nav-link">
                    Logout
                  </Link>
                </>
              )}

              {!isAuthenticated && (
                <>
                  <Link to="/login" className="nav-item nav-link">
                    Login
                  </Link>
                  <Link to="/register" className="nav-item nav-link">
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
