import { useEffect, useState } from "react";
import * as barberService from "../../services/barberShopService";
import GalleryCard from "../Cards/GalleryCard/GalleryCard";
import PageHeader from "../Shared/PageHeader/PageHeader";
export default function () {
  const [pictures, setPictures] = useState([]);

  useEffect(() => {
    barberService.getAllPictures()
      .then(result => setPictures(result));
  }, []);
    return (
        <div>
  <PageHeader name="Gallery" endpoint="gallery" />
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