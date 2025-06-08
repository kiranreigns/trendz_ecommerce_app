import React, { useContext } from "react";
import { Link } from "react-router-dom";
import ShopContext from "../context/ShopContext";
import "./CSS/Wishlist.css";
import WishlistItem from "../components/WishlistItem/WishlistItem";
import wishListImg from "../assets/wishlist-img.png";

const Wishlist = () => {
  const { wishlist, removeFromWishlist } = useContext(ShopContext);

  const handleRemoveFromWishlist = (productId) => {
    removeFromWishlist(productId);
  };

  if (wishlist.length === 0) {
    return (
      <div className="wishlist-empty">
        <img
          src={wishListImg}
          alt="Empty Wishlist"
          className="empty-wishlist-image"
        />
        <h2>Your wishlist is empty</h2>
        <p>
          Add items you love to your wishlist. Review them anytime and easily
          move them to the bag.
        </p>
        <Link to="/">
          <button className="continue-shopping-button">
            CONTINUE SHOPPING
          </button>
        </Link>
      </div>
    );
  }

  return (
    <div className="wishlist">
      <h1>My Wishlist</h1>
      <div className="wishlist-items-grid">
        {wishlist.map((item) => (
          <div className="wishlist-item-wrapper" key={item._id}>
            <WishlistItem
              id={item._id}
              name={item.name}
              image={item.image[0]?.url}
              newPrice={item.newPrice}
              oldPrice={item.oldPrice}
              onRemove={() => handleRemoveFromWishlist(item._id)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Wishlist;
