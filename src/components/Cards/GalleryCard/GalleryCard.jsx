export default function GalleryCard({photo}){
    return (
    <div className="col-lg-4 col-md-6 col-sm-12 portfolio-item first">
        <div className="portfolio-wrap">
          <a href={photo} data-lightbox="portfolio">
            <img src={photo} alt="Portfolio Image" />
          </a>
        </div>
      </div>
      );
}