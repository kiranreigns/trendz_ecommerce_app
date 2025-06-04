import React, { useContext, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "./Item.css";
import SizeChartModal from "../SizeChartModal/SizeChartModal";
import ShopContext from "../../context/ShopContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Item = ({ id, name, image, oldPrice, newPrice, onAdd }) => {
  const { products, addToWishlist } = useContext(ShopContext);
  const itemRef = useRef(null);

  const discount = Math.round(((oldPrice - newPrice) / oldPrice) * 100);

  const handleAddToWishlist = () => {
    if (onAdd) {
      onAdd();
      toast.success("Product added to wishlist!", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      const productToAdd = products.find((p) => p._id === id);
      if (productToAdd) {
        addToWishlist(productToAdd);
        toast.success("Product added to wishlist!", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    }
  };
  // Handle the case where image might be an object with url property or a direct URL string
  const imageUrl = typeof image === "object" && image.url ? image.url : image;

  useEffect(() => {
    let scrollTimeout;
    const itemElement = itemRef.current;

    const handleScroll = () => {
      if (itemElement) {
        itemElement.classList.add("is-scrolling");

        // Clear the previous timeout
        clearTimeout(scrollTimeout);

        // Set a new timeout
        scrollTimeout = setTimeout(() => {
          itemElement.classList.remove("is-scrolling");
        }, 150);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, []);

  return (
    <div className="item" ref={itemRef}>
      <div className="item-image">
        <Link to={`/product/${id}`}>
          <img src={imageUrl} alt={name} />
        </Link>
        <div className="item-actions">
          <button
            className="action-button"
            onClick={handleAddToWishlist}
            aria-label="Add to wishlist"
          >
            <svg
              xmlns="https://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78z"></path>
            </svg>
          </button>

          <SizeChartModal
            productId={id}
            trigger={
              <button className="action-button" aria-label="Add to bag">
                <svg
                  xmlns="https://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  width="22"
                  height="22"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                  />
                </svg>
              </button>
            }
          />
        </div>
      </div>
      <div className="item-info">
        <h3 className="item-name">{name}</h3>
        <div className="item-prices">
          <span className="item-price-new">${newPrice}</span>
          <span className="item-price-old">${oldPrice}</span>
          {discount >= 10 && (
            <span className="discount-percent">-{discount}%</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default Item;
