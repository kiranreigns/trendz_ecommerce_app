import { useState, useEffect, useContext, useRef } from "react";
import ShopContext from "../context/ShopContext";
import { useParams } from "react-router-dom";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { LuHeart } from "react-icons/lu";
import { FaStar } from "react-icons/fa";
import "react-toastify/dist/ReactToastify.css";
import "./CSS/Product.css";
import "./CSS/ModernMobileProduct.css";
import Loader from "../components/Loader/Loader";
import returnImg from "../assets/return.png";
import cod from "../assets/cash-on-delivery.png";
import delivery from "../assets/delivery.png";
import dayjs from "dayjs";

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
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  // Mobile carousel states
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const carouselRef = useRef(null);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

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

  // Touch handlers for mobile carousel
  const handleTouchStart = (e) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current || !product?.image) return;

    const distance = touchStartX.current - touchEndX.current;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe && currentImageIndex < product.image.length - 1) {
      setCurrentImageIndex(currentImageIndex + 1);
    }
    if (isRightSwipe && currentImageIndex > 0) {
      setCurrentImageIndex(currentImageIndex - 1);
    }
  };

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

  const renderMobileStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <FaStar
        key={index}
        className={`modern-star ${index < Math.floor(rating) ? "filled" : ""}`}
      />
    ));
  };

  if (isLoading) return <Loader />;
  if (!product) return <div className="loading">Product not found</div>;

  const discountPercentage = Math.round(
    ((product.oldPrice - product.newPrice) / product.oldPrice) * 100
  );

  return (
    <>
      {isMobile ? (
        <div className="modern-product-container">
          {/* Mobile Image Carousel */}
          <div className="modern-carousel">
            <div
              className="modern-carousel-container"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              ref={carouselRef}
            >
              <div
                className="modern-carousel-track"
                style={{
                  transform: `translateX(-${currentImageIndex * 100}%)`,
                }}
              >
                {product.image?.map((img, index) => (
                  <div key={index} className="modern-carousel-slide">
                    <img
                      src={img.url}
                      alt={`${product.name} view ${index + 1}`}
                      className="modern-carousel-image"
                    />
                  </div>
                ))}
              </div>
            </div>

            <button className="modern-view-similar">VIEW SIMILAR</button>

            <div className="modern-rating-badge">
              <span className="modern-rating-number">{product.rating}</span>
              <FaStar className="modern-rating-star" />
              <span className="modern-rating-count">{product.reviews}</span>
            </div>

            <div className="modern-indicators">
              {product.image?.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`modern-indicator ${
                    index === currentImageIndex ? "active" : ""
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Mobile Product Details */}
          <div className="modern-product-details">
            <h1 className="modern-product-name">{product.name}</h1>

            <div className="modern-price-section">
              <span className="modern-current-price">${product.newPrice}</span>
              <span className="modern-original-price">
                MRP ${product.oldPrice}
              </span>
              <span className="modern-discount">
                ({discountPercentage}% OFF)
              </span>
            </div>

            <div className="modern-rating-section">
              <div className="modern-stars">
                {renderMobileStars(product.rating)}
              </div>
              <span className="modern-review-count">
                ({product.reviews} reviews)
              </span>
            </div>

            <p className="modern-description">{product.description}</p>

            <div className="modern-services">
              <h3 className="modern-services-title">
                CHECK DELIVERY & SERVICES
              </h3>
              <div className="modern-services-list">
                <div className="modern-service-item">
                  <span className="modern-service-label">Get it by</span>
                  <span className="modern-service-value">
                    {dayjs().add(2, "day").format("ddd, MMM D")}
                  </span>
                </div>
                <div className="modern-service-item">
                  <span className="modern-service-label">Free delivery</span>
                  <span className="modern-service-value">
                    on orders above $50
                  </span>
                </div>
                <div className="modern-service-item">
                  <span className="modern-service-label">Cash on delivery</span>
                  <span className="modern-service-value available">
                    Available
                  </span>
                </div>
                <div className="modern-service-item">
                  <span className="modern-service-label">Easy returns</span>
                  <span className="modern-service-value">14 days</span>
                </div>
              </div>
            </div>

            <div className="modern-size-section">
              <h3 className="modern-size-title">SELECT SIZE</h3>
              <div className="modern-size-options">
                {product.sizes?.map((size) => (
                  <button
                    key={size}
                    onClick={() => {
                      setSelectedSize(size);
                      setShowSizeError(false);
                    }}
                    className={`modern-size-button ${
                      selectedSize === size ? "selected" : ""
                    } ${shakeSizes ? "shake" : ""}`}
                  >
                    {size}
                  </button>
                ))}
              </div>
              {showSizeError && (
                <p className="modern-size-error">Please select a size</p>
              )}
            </div>
          </div>

          {/* Mobile Bottom Actions */}
          <div className="modern-bottom-actions">
            <div className="modern-action-buttons">
              <button
                onClick={handleAddToWishlist}
                className={`modern-action-button modern-wishlist-button ${
                  isAddedToWishlist ? "active" : ""
                }`}
              >
                <LuHeart className="modern-action-icon" />
                {isAddedToWishlist ? "WISHLISTED" : "WISHLIST"}
              </button>

              <button
                onClick={handleAddToBag}
                className={`modern-action-button modern-add-to-bag ${
                  isAddedToBag ? "added" : ""
                }`}
              >
                <HiOutlineShoppingBag className="modern-action-icon" />
                {isAddedToBag ? "ADDED TO BAG" : "ADD TO BAG"}
              </button>
            </div>
          </div>

          <div className="modern-bottom-spacer"></div>
        </div>
      ) : (
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
                className={`wishlist-button ${
                  isAddedToWishlist ? "added" : ""
                }`}
                onClick={handleAddToWishlist}
              >
                <LuHeart size={24} />
                {isAddedToWishlist ? "Added to Wishlist!" : "Add to Wishlist"}
              </button>
            </div>
            <div className="service-info">
              <div className="service-item">
                <img src={delivery} width={34} alt="Fast delivery" />
                <div className="service-item-text">
                  <strong>
                    Get it by {dayjs().add(2, "day").format("ddd, MMM D")}
                  </strong>
                  <p>Free delivery on orders above $50</p>
                </div>
              </div>
              <div className="service-item">
                <img src={cod} width={32} alt="" />
                <div className="service-item-text">
                  <strong>Pay on delivery available</strong>
                  <p>Cash on delivery option available</p>
                </div>
              </div>
              <div className="service-item">
                <img src={returnImg} width={34} alt="" />
                <div className="service-item-text">
                  <strong>Easy 14 days return & exchange available</strong>
                  <p>Hassle-free returns within 14 days</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Product;
