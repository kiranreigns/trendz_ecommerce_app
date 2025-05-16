import React, { useState, useEffect, useContext } from "react";
import ShopContext from "../Context/ShopContext";
import { useParams } from "react-router-dom";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { LuHeart } from "react-icons/lu";
import { FaStar } from "react-icons/fa";
import "react-toastify/dist/ReactToastify.css";
import "./CSS/Product.css";

const Product = () => {
  const { products, isLoading, addToBag, addToWishlist } =
    useContext(ShopContext);
  const { productId } = useParams();

  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [isAddedToBag, setIsAddedToBag] = useState(false);
  const [isAddedToWishlist, setIsAddedToWishlist] = useState(false);
  const [showSizeError, setShowSizeError] = useState(false);
  const [shakeSizes, setShakeSizes] = useState(false);

  useEffect(() => {
    if (!isLoading && products.length > 0) {
      const foundProduct = products.find(
        (product) => product._id === productId
      );
      if (foundProduct) {
        setProduct(foundProduct);
        setSelectedImage(foundProduct.image?.[0]?.url || "");
      }
    }
  }, [productId, products, isLoading]);

  const handleAddToBag = () => {
    if (selectedSize && product) {
      addToBag(product, 1, selectedSize);
      setIsAddedToBag(true);
      setShowSizeError(false);
      setTimeout(() => setIsAddedToBag(false), 2000);
    } else {
      setShowSizeError(true);
      setShakeSizes(true);
      setTimeout(() => setShakeSizes(false), 400);
    }
  };

  const handleAddToWishlist = () => {
    if (product) {
      addToWishlist(product);
      setIsAddedToWishlist(true);
      setTimeout(() => setIsAddedToWishlist(false), 2000);
    }
  };

  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <span
        key={index}
        className={`star ${index < Math.floor(rating) ? "filled" : ""}`}
      >
        <FaStar />
      </span>
    ));
  };

  if (isLoading) return <div className="loading">Loading...</div>;
  if (!product) return <div className="loading">Product not found</div>;

  return (
    <>
      <div className="product-container">
        <div className="product-left">
          <div className="product-images">
            {product.image?.map((img, i) => (
              <img
                key={i}
                src={img.url}
                alt={`Product view ${i + 1}`}
                className={selectedImage === img.url ? "selected" : ""}
                onClick={() => setSelectedImage(img.url)}
              />
            ))}
          </div>
          <div className="product-main-img">
            <img src={selectedImage} alt="Main product view" />
          </div>
        </div>

        <div className="product-right">
          <h1 className="product-name">{product.name}</h1>

          <div className="product-rating">
            <div className="star-rating">{renderStars(product.rating)}</div>
            <span>({product.reviews} reviews)</span>
          </div>

          <div className="product-price">
            <span className="new-price">${product.newPrice.toFixed(2)}</span>
            <span className="old-price">${product.oldPrice.toFixed(2)}</span>
          </div>

          <p className="product-description">{product.description}</p>

          <div className="size-selection">
            <h3>Select Size</h3>
            <div className="size-buttons">
              {product.sizes?.map((size) => (
                <button
                  key={size}
                  className={`size-button ${
                    selectedSize === size ? "selected" : ""
                  } ${shakeSizes ? "shake" : ""}`}
                  onClick={() => {
                    setSelectedSize(size);
                    setShowSizeError(false);
                  }}
                >
                  {size}
                </button>
              ))}
            </div>
            {showSizeError && (
              <div className="size-error-message">Please select a size</div>
            )}
          </div>

          <div className="action-buttons">
            <button
              className={`add-to-bag ${isAddedToBag ? "added" : ""}`}
              onClick={handleAddToBag}
            >
              <HiOutlineShoppingBag size={24} />
              {isAddedToBag ? "Added to Bag!" : "Add to Bag"}
            </button>
            <button
              className={`wishlist-button ${isAddedToWishlist ? "added" : ""}`}
              onClick={handleAddToWishlist}
            >
              <LuHeart size={24} />
              {isAddedToWishlist ? "Added to Wishlist!" : "Add to Wishlist"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Product;
