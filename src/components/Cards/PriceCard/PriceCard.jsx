export default function PriceCard ({
    service,
    price,
    image
}) {
    return (
    <div className="price-item">
        <div className="price-img">
          <img src={image} alt="Image" />
        </div>
        <div className="price-text">
          <h2>{service}</h2>
          <h3>{price}</h3>
        </div>
      </div>
      );
}