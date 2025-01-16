import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../contexts/authContext";
import { useSelector } from "react-redux";
import SearchBar from "../SearchBar/SearchBar";

export default function Header() {
  const { isAuthenticated, username } = useContext(AuthContext);

  const totalItems = useSelector((state) => 
    state.cart.items.reduce((acc, item) => acc + item.quantity, 0)
  );

  const handleClickOutside = (event) => {
    const navbarCollapse = document.getElementById("navbarCollapse");
    if (navbarCollapse && !navbarCollapse.contains(event.target)) {
      navbarCollapse.classList.remove("show");
    }
  };
  
  const handleLinkClick = () => {
    const navbarCollapse = document.getElementById("navbarCollapse");
    if (navbarCollapse) {
      navbarCollapse.classList.remove("show");
    }
  };
  

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

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
                  <a href="http://twitter.com"><i className="fab fa-twitter" /></a>
                  <a href="http://facebook.com"><i className="fab fa-facebook-f" /></a>
                  <a href="http://linkedin.com"><i className="fab fa-linkedin-in" /></a>
                  <a href="http://instagram.com"><i className="fab fa-instagram" /></a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="navbar navbar-expand-lg bg-dark navbar-dark">
        <div className="container-fluid">
          <Link to="/" className="navbar-brand">
          <img src="/img/favicon.webp" alt="X CUTZ Logo" className="navbar-logo" />
             <span>CUTZ</span>
          </Link>
          <button
            type="button"
            className="navbar-toggler"
            data-toggle="collapse"
            data-target="#navbarCollapse"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="span4">
            <SearchBar/>
          </div>
          <div
            className="collapse navbar-collapse justify-content-between"
            id="navbarCollapse"
          >
            <div className="navbar-nav ml-auto">
              <Link to="/" className="nav-item nav-link active"onClick={handleLinkClick}>Home</Link>
              <Link to="/about" className="nav-item nav-link"onClick={handleLinkClick}>About</Link>
              <Link to="/services" className="nav-item nav-link"onClick={handleLinkClick}>Service</Link>
              <Link to="/prices" className="nav-item nav-link"onClick={handleLinkClick}>Prices</Link>
              <Link to="/products" className="nav-item nav-link"onClick={handleLinkClick}>Products</Link>
              <Link to="/barbers" className="nav-item nav-link"onClick={handleLinkClick}>Barbers</Link>
              <Link to="/gallery" className="nav-item nav-link"onClick={handleLinkClick}>Gallery</Link>

              {isAuthenticated && (
                <>
                  <Link to="/profile" className="nav-item nav-link"onClick={handleLinkClick}>
                    {username}'s Profile
                  </Link>
                  <Link to="/logout" className="nav-item nav-link"onClick={handleLinkClick}>Logout</Link>
                  <Link to="/cart" className="nav-item nav-link" onClick={handleLinkClick} style={{ position: 'relative' }}>
                    <i className="fas fa-shopping-cart"></i>
                    {totalItems > 0 && (
                      <span 
                        style={{
                          position: 'absolute',
                          top: '-5px',
                          right: '-10px',
                          backgroundColor: 'red',
                          color: 'white',
                          borderRadius: '50%',
                          padding: '2px 6px',
                          fontSize: '12px',
                          fontWeight: 'bold'
                        }}
                      >
                        {totalItems}
                      </span>
                    )}
                  </Link>
                </>
              )}

              {!isAuthenticated && (
                <>
                  <Link to="/login" className="nav-item nav-link"onClick={handleLinkClick}>Login</Link>
                  <Link to="/register" className="nav-item nav-link"onClick={handleLinkClick}>Register</Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
