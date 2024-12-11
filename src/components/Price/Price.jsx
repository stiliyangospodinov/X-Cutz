import { useEffect, useState } from "react";
import * as barberShopService from "../../services/barberShopService";
import PriceCard from "../Cards/PriceCard/PriceCard";
import { Link } from "react-router-dom";
import PageHeader from "../Shared/PageHeader/PageHeader";
export default function Price (){

  const [prices, setPrices] = useState([]);

  useEffect(() => {
    barberShopService.getAllPrices()
      .then(result => setPrices(result));
  }, []);

    return (
      <div>
  <PageHeader name="Cart" endpoint="cart" />
    <div className="price">
        <div className="container">
          <div className="section-header text-center">
            <p>Our Best Pricing</p>
            <h2>We Provide Best Price in the City</h2>
          </div>
          <div className="row">
          {prices.map(price => (
            <div className="col-lg-3 col-md-4 col-sm-6">
            <PriceCard
            key={price._id}
            service = {price.service}
            price={price.price}
            image={price.image}
            />
            </div>
          ))}
          </div>
        </div>
      </div>
      </div>
      );
}