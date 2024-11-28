import { Link } from "react-router-dom"
import "./AboutCard.css"
import LogRegSection from "../../Shared/LogRegSection/LogRegSection"
import AuthContext from "../../../contexts/authContext";
import { useContext } from "react";

export default function AboutCard({
  id,
  image,
  name,
  title,
  description,
  price,
  text

}) {
  const { isAuthenticated, isAdmin, username } = useContext(AuthContext);

    return (
        <>

  <section id="about" className="about">
    <div className="section-heading text-center">
      <h2>{name}</h2>
    </div>
    <div className="container">
      <div className="about-content">
        <div className="row">
          <div className="col-sm-6">
            <div className="single-about-txt">
              <h3>{title}</h3>
              <p>{description}</p>
              <div className="row">
                <div className="col-sm-4">
                  <div className="single-about-add-info">
                    <h3>Price</h3>
                    <p>{price}</p>
                  </div>
                </div>
                <div className="col-sm-4">
                  <div className="single-about-add-info">
                  {isAuthenticated && (
                                        <a className="btn">
                                            Add to Cart
                                        </a>
                                    )}
                  </div>
                  </div>
              </div>
              {!isAuthenticated && (
                                <LogRegSection
                                    text={text}
                                />
                            )}
            </div>
          </div>
          <div className="col-sm-offset-1 col-sm-5">
            <div className="single-about-img">
            <img src={`/${image}`} alt="profile_image" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

</>

    )
}