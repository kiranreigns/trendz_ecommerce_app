import React, { useState, useContext } from "react";
import ReactDOM from "react-dom";
import ShopContext from "../../context/ShopContext";
import "./SizeChartModal.css";
import { MdClose } from "react-icons/md";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SizeChartModal = ({ productId, trigger }) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const { products, addToBag, isLoading } = useContext(ShopContext);
  const [selectedSize, setSelectedSize] = useState(null);
  const [shakeSizes, setShakeSizes] = useState(false);
  const [showSizeError, setShowSizeError] = useState(false);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedSize(null); // Reset selected size when closing
  };

  // Find the product from products using productId
  const product = products.find((item) => item._id === productId);

  if (!product || isLoading) {
    return trigger
      ? React.cloneElement(trigger, { onClick: handleOpenModal })
      : null;
  }

  const { image, name, oldPrice, newPrice, sizes } = product;
  const discount = (oldPrice - newPrice).toFixed(2);

  const handleSizeSelect = (size) => {
    setSelectedSize(size);
  };

  const handleAddToBag = () => {
    if (!selectedSize) {
      setShowSizeError(true);
      setShakeSizes(true);
      setTimeout(() => setShakeSizes(false), 400);
    } else {
      addToBag(product, 1, selectedSize);
      toast.success("Product added to bag!", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      handleCloseModal();
    }
  };

  // The trigger element remains in the original component
  const triggerElement =
    trigger && React.cloneElement(trigger, { onClick: handleOpenModal });

  // Get the image URL from the image object
  const imageUrl = image && image[0] ? image[0].url : "";

  // The modal is rendered using a portal to the document body
  return (
    <>
      {triggerElement}

      {isModalOpen &&
        ReactDOM.createPortal(
          <div className="size-chart-modal-overlay" onClick={handleCloseModal}>
            <div
              className="size-chart-modal"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="close-btn"
                onClick={handleCloseModal}
                aria-label="Close modal"
              >
                <MdClose size={22} />
              </button>

              <div className="product-info">
                <div className="product-image">
                  <img src={imageUrl} alt={name} />
                </div>
                <div className="product-details">
                  <h3>{name}</h3>
                  <div className="product-price">
                    <span className="new-price">$ {newPrice}</span>
                    <span className="old-price">$ {oldPrice}</span>
                    <span className="discount">($ {discount} OFF)</span>
                  </div>
                </div>
              </div>

              <div className="modal-size-selection">
                <h4>Select Size</h4>
                <div className="size-options">
                  {sizes.map((size) => (
                    <button
                      key={size}
                      className={`size-option ${
                        selectedSize === size ? "selected" : ""
                      } ${shakeSizes ? "shake" : ""}`}
                      onClick={() => handleSizeSelect(size)}
                    >
                      {size}
                    </button>
                  ))}
                </div>
                {showSizeError && (
                  <p className="size-error-msg">Please select a size</p>
                )}
              </div>
              <div className="button-container">
                <button className="add-to-bag-button" onClick={handleAddToBag}>
                  Done
                </button>
              </div>
            </div>
          </div>,
          document.body
        )}
    </>
  );
};

export default SizeChartModal;
