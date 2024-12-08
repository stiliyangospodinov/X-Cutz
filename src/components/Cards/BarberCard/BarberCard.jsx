import { Link } from "react-router-dom"
export default function BarberCard({
    id,
    name,
    title,
    photo

}){

    return (
        <Link to={`/barber/${id}`} className="col-lg-3 col-md-6">
        <div className="team-item">
          <div className="team-img">
            <img src={photo} alt="Team Image" />
          </div>
          <div className="team-text">
            <h2>{name}</h2>
            <p>{title}</p>
          </div>
        </div>
      </Link>
    )

}