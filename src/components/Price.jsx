import { useEffect, useState } from "react";
import * as barberShopService from "../services/barberShopService";
import PriceCard from "./Cards/PriceCard";
export default function Price (){

  const [prices, setPrices] = useState([]);

  useEffect(() => {
    barberShopService.getAllPrices()
      .then(result => setPrices(result));
  }, []);
    return (
      <div>
      <div className="page-header">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h2>Prices</h2>
          </div>
          <div className="col-12">
            <a href="">Home</a>
            <a href="">Price</a>
          </div>
        </div>
      </div>
    </div>
    <div className="price">
        <div className="container">
          <div className="section-header text-center">
            <p>Our Best Pricing</p>
            <h2>We Provide Best Price in the City</h2>
          </div>
          <div className="row">
          {prices.map(price => (
            <PriceCard
            key={price._id}
            service = {price.service}
            price={price.price}
            image={price.image}
            />
          ))}
          </div>
        </div>
      </div>
      </div>
      );
}