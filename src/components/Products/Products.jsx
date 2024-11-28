import PriceCard from "../Cards/PriceCard";
import * as barberShopService from "../../services/barberShopService";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Products(){

    const [produts, setProducts] = useState([]);

    useEffect(() => {
      barberShopService.getAllProducts()
        .then(result => setProducts(result));
    }, []);
    
    return (
        <div>
        <div className="page-header">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <h2>Products</h2>
            </div>
            <div className="col-12">
              <Link to="/">Home</Link>
              <Link to="/products">Products</Link>
            </div>
          </div>
        </div>
      </div>
      <div className="price">
          <div className="container">
            <div className="section-header text-center">
              <p>Our Best Products</p>
              <h2>We Provide Best Products in the City</h2>
            </div>
            <div className="row">
            {produts.map(product => (
                <div className="col-lg-3 col-md-4 col-sm-6">
                <Link to={`/products/${product._id}`} key={product._id}>
              <PriceCard
              key={product._id}
              service = {product.name}
              price={product.price}
              image={product.image}
              />
              </Link>
              </div>
            ))}
            </div>
          </div>
        </div>
        </div>
        );
}