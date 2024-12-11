import PriceCard from "../Cards/PriceCard/PriceCard";
import * as barberShopService from "../../services/barberShopService";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PageHeader from "../Shared/PageHeader/PageHeader";

export default function Products(){

    const [produts, setProducts] = useState([]);

    useEffect(() => {
      barberShopService.getAllProducts()
        .then(result => setProducts(result));
    }, []);
    
    return (
        <div>
  <PageHeader name="Products" endpoint="products" />
      <div className="price">
          <div className="container">
            <div className="section-header text-center">
              <p>Our Best Products</p>
              <h2>We Provide Best Products in the City</h2>
            </div>
            <div className="row">
            {produts.map(product => (
                <div className="col-lg-3 col-md-4 col-sm-6" key={product._id}>
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