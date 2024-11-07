import { useState } from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const validateEmail = (email) => {
    // Regular expression for basic email validation
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email.trim() === "") {
      setError("Email field cannot be empty");
    } else if (!validateEmail(email)) {
      setError("Please enter a valid email address");
    } else {
      setIsSubmitted(true);
      setError("");
    }
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  return (
    <div className="footer">
      <div className="container">
        <div className="row">
          <div className="col-lg-7">
            <div className="row">
              <div className="col-md-6">
                <div className="footer-contact">
                  <h2>Salon Address</h2>
                  <p>
                    <i className="fa fa-map-marker-alt" />
                    Bregalnitsa 62, Varna, Bulgaria
                  </p>
                  <p>
                    <i className="fa fa-phone-alt" />
                    +359 897 625 888
                  </p>
                  <p>
                    <i className="fa fa-envelope" />
                    stelko095@gmail.com
                  </p>
                  <div className="footer-social">
                    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                      <i className="fab fa-twitter" />
                    </a>
                    <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                      <i className="fab fa-facebook-f" />
                    </a>
                    <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
                      <i className="fab fa-youtube" />
                    </a>
                    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                      <i className="fab fa-instagram" />
                    </a>
                    <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                      <i className="fab fa-linkedin-in" />
                    </a>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="footer-link">
                  <h2>Quick Links</h2>
                  <Link to="/team">Our Team</Link>
                  <Link to="/gallery">Gallery</Link>
                  <Link to="/service">Services</Link>
                  <Link to="/prices">Prices</Link>
                  <Link to="/about">About</Link>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-5">
            <div className="footer-newsletter">
              <h2>Newsletter</h2>
              <p>
                Stay updated with our latest news and offers. Subscribe to our newsletter by entering your email below.
              </p>
              {isSubmitted ? (
                <p>Thank you for subscribing!</p>
              ) : (
                <div className="form">
                  <form onSubmit={handleSubmit}>
                    <input 
                      className="form-control" 
                      placeholder="Email goes here" 
                      value={email}
                      onChange={handleEmailChange}
                    />
                    <button className="btn" type="submit">Submit</button>
                  </form>
                  {error && <p className="text-danger">{error}</p>}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="container copyright">
        <div className="row">
          <div className="col-md-6">
            <p>
              © <Link to="/">X Cutz</Link>, All Rights Reserved.
            </p>
          </div>
          <div className="col-md-6">
            <p>
              Designed By <a href="https://facebook.com">Stiliyan Gospodinov</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
