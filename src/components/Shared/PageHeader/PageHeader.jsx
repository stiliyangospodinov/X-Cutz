import { Link } from "react-router-dom";

export default function PageHeader ({ name, endpoint }){
 return (
    <div className="page-header">
    <div className="container">
    <div className="row">
      <div className="col-12">
        <h2>{name}</h2>
      </div>
      <div className="col-12">
      <Link to="/">Home</Link>
      <Link to={`/${endpoint}`}>{name}</Link>
      </div>
    </div>
  </div>
  </div>
 )
}