import { useContext } from "react";
import { Link } from "react-router-dom";
import ShopContext from "../Context/ShopContext";
import "./CSS/Bag.css";
import emptyBagImage from "../assets/emptybag.png";
import {
  FiHeart,
  FiTrash2,
  FiArrowRight,
  FiPlus,
  FiMinus,
} from "react-icons/fi";

const Bag = () => {
  const {
    bag,
    removeFromBag,
    updateBagQuantity,
    moveToWishlist,
    calculateTotal,
    calculateDiscount,
  } = useContext(ShopContext);

  // Helper function to get image URL
  const getImageUrl = (imageArray) => {
    if (!imageArray || imageArray.length === 0) return "";
    return imageArray[0].url || imageArray[0];
  };

  // Empty bag view
  if (bag.length === 0) {
    return (
      <div className="empty-bag-container">
        <div className="empty-bag-content">
          <img
            src={emptyBagImage}
            alt="Empty Shopping Bag"
            className="empty-bag-image"
          />
          <h2>Your Shopping Bag is Empty</h2>
          <p>Looks like you haven't added anything to your bag yet.</p>
          <Link to="/wishlist">
            <button className="bag-wishlist-button">
              ADD ITEMS FROM WISHLIST
            </button>
          </Link>
        </div>
      </div>
    );
  }

  // Bag with items view
  return (
    <div className="bag-page">
      <h1>
        Your Shopping Bag ({bag.length} {bag.length === 1 ? "Item" : "Items"})
      </h1>

      <div className="bag-container">
        <div className="bag-items-container">
          <div className="bag-items-list">
            {bag.map((item) => (
              <div key={`${item._id}-${item.size}`} className="bag-item">
                <div className="bag-item-image">
                  <Link to={`/product/${item._id}`}>
                    <img src={getImageUrl(item.image)} alt={item.name} />
                  </Link>
                </div>
                <div className="bag-item-details">
                  <div className="bag-item-info">
                    <h3>
                      <Link to={`/product/${item._id}`}>{item.name}</Link>
                    </h3>
                    <span className="item-size">Size: {item.size}</span>
                    <div className="item-price">
                      <span className="new-price">
                        ${item.newPrice.toFixed(2)}
                      </span>
                      {item.oldPrice > item.newPrice && (
                        <span className="old-price">
                          ${item.oldPrice.toFixed(2)}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="bag-item-actions">
                    <div className="quantity-controls">
                      <button
                        className="quantity-btn"
                        onClick={() =>
                          updateBagQuantity(
                            item._id,
                            item.size,
                            item.quantity - 1
                          )
                        }
                        disabled={item.quantity <= 1}
                        aria-label="Decrease quantity"
                      >
                        <FiMinus />
                      </button>
                      <span className="quantity-value">{item.quantity}</span>
                      <button
                        className="quantity-btn"
                        onClick={() =>
                          updateBagQuantity(
                            item._id,
                            item.size,
                            item.quantity + 1
                          )
                        }
                        aria-label="Increase quantity"
                      >
                        <FiPlus />
                      </button>
                    </div>
                    <div className="item-action-buttons">
                      <button
                        className="action-btn wishlist-btn"
                        onClick={() => moveToWishlist(item, item.size)}
                      >
                        <FiHeart /> Move to Wishlist
                      </button>
                      <button
                        className="action-btn remove-btn"
                        onClick={() => removeFromBag(item._id, item.size)}
                      >
                        <FiTrash2 /> Remove
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="order-summary">
          <h2>Order Summary</h2>
          <div className="summary-content">
            <div className="summary-row">
              <span>
                Subtotal ({bag.length} {bag.length === 1 ? "item" : "items"})
              </span>
              <span>${calculateTotal().toFixed(2)}</span>
            </div>
            <div className="summary-row">
              <span>Shipping</span>
              <span>Free</span>
            </div>
            <div className="summary-row">
              <span>Estimated Tax (5%)</span>
              <span>${(calculateTotal() * 0.05).toFixed(2)}</span>
            </div>
            <div className="summary-row">
              <span>Discount</span>
              <span>${calculateDiscount().toFixed(2)}</span>
            </div>
            <div className="summary-row total-row">
              <span>Total</span>
              <span>${(calculateTotal() * 1.05).toFixed(2)}</span>
            </div>
          </div>

          <div className="promo-code">
            <h3>Promo Code</h3>
            <div className="promo-input-group">
              <input
                type="text"
                className="promo-input"
                placeholder="Enter promo code"
              />
              <button className="apply-button">Apply</button>
            </div>
          </div>
          <Link to="/checkout" className="checkout-link">
            <button className="checkout-button">
              Proceed to Checkout <FiArrowRight />
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Bag;
