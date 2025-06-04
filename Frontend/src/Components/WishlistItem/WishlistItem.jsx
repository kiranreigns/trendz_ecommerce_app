import { Link } from "react-router-dom";
import "./WishlistItem.css";
import SizeChartModal from "../SizeChartModal/SizeChartModal";

const WishlistItem = ({ id, image, name, oldPrice, newPrice, onRemove }) => {
  const discount = Math.round(((oldPrice - newPrice) / oldPrice) * 100);

  const handleRemove = (e) => {
    e.preventDefault(); // Prevent event bubbling
    if (onRemove) {
      onRemove();
    }
  };

  // Handle the case where image might be an object with url property or a direct URL string
  const imageUrl = typeof image === "object" && image.url ? image.url : image;

  return (
    <div className="wishlist-item-card">
      <div className="wishlist-item-image">
        <Link to={`/product/${id}`}>
          <img src={imageUrl} alt={name} />
        </Link>
        <button
          className="close-button"
          onClick={handleRemove}
          aria-label="Remove from wishlist"
        >
          <svg
            xmlns="https://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>
      <div className="wishlist-item-info">
        <h3 className="wishlist-item-name">{name}</h3>
        <div className="wishlist-item-prices">
          <span className="wishlist-price-new">$ {newPrice}</span>
          <span className="wishlist-price-old">$ {oldPrice}</span>
          {discount >= 10 && (
            <span className="wishlist-discount-percent">({discount}% OFF)</span>
          )}
        </div>
      </div>

      <SizeChartModal
        productId={id}
        trigger={<button className="move-to-bag-button">MOVE TO BAG</button>}
      />
    </div>
  );
};

export default WishlistItem;
