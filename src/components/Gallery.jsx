import { useEffect, useState } from "react";
import * as barberService from "../services/barberShopService";
import GalleryCard from "./Cards/GalleryCard";
export default function () {
  const [pictures, setPictures] = useState([]);

  useEffect(() => {
    barberService.getAllPictures()
      .then(result => setPictures(result));
  }, []);
    return (
        <div>
        <div className="page-header">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <h2>Gallery</h2>
            </div>
            <div className="col-12">
              <a href="">Home</a>
              <a href="">Gallery</a>
            </div>
          </div>
        </div>
      </div>
        <div className="portfolio">
  <div className="container">
    <div className="section-header text-center">
      <p>Barber Image Gallery</p>
      <h2>Some Images From Our Barber Gallery</h2>
    </div>
    <div className="row portfolio-container">
    {pictures.map(picture => (
            <GalleryCard

            photo={picture.photo}

            />
          ))}
    </div>
  </div>
</div>
</div>

    );

}