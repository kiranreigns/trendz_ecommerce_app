import React, { useState } from "react";
import "./CSS/Checkout.css";
import "../Components/AddressModal/AddressModal.css"; // Import the new styles
import AddressModal from "../Components/AddressModal/AddressModal";
import razorpayIcon from "../assets/razorpay_logo.png";
import stripeIcon from "../assets/stripe_logo.png";

const Checkout = () => {
  const [selectedAddress, setSelectedAddress] = useState("default");
  const [selectedPayment, setSelectedPayment] = useState("stripe");
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [addresses, setAddresses] = useState([
    {
      id: "default",
      name: "Kiran",
      addressLine:
        "28-1441/B, Mahatma nagar, Tenabanda road, Chittoor, Tenebanda",
      city: "Chittoor",
      state: "Andhra Pradesh",
      zipcode: "517004",
      phone: "9392269712",
      type: "HOME",
    },
    {
      id: "alternate",
      name: "Kiran",
      addressLine:
        "28-1441/B,Mahathma Nagar, Thenabanda road, Chittoor., Ctr Market",
      city: "Chittoor",
      state: "Andhra Pradesh",
      zipcode: "517001",
      phone: "9392269712",
      type: "HOME",
    },
  ]);

  // Open address modal
  const openAddressModal = () => {
    setIsAddressModalOpen(true);
  };

  // Close address modal
  const closeAddressModal = () => {
    setIsAddressModalOpen(false);
  };

  // Save new address
  const saveNewAddress = (newAddress) => {
    // Create a unique ID for the new address
    const id = `address_${Date.now()}`;

    // Create structured address from form data
    const formattedAddress = {
      id,
      name: newAddress.name,
      addressLine: newAddress.street,
      city: newAddress.city,
      state: newAddress.state,
      zipcode: newAddress.zipCode,
      phone: newAddress.phone,
      type: newAddress.type,
    };

    // Add to addresses array
    setAddresses([...addresses, formattedAddress]);

    // Select the new address
    setSelectedAddress(id);
  };

  // Helper function to get status badge class
  const getAddressCategory = (addressId) => {
    return addressId === "default" ? "DEFAULT ADDRESS" : "OTHER ADDRESS";
  };

  return (
    <div className="checkout-container">
      <div className="checkout-grid">
        <div className="left-column">
          <h2 className="section-title">Select Delivery Address</h2>

          <div className="address-section">
            <div className="address-options">
              {addresses.map((address) => (
                <div key={address.id} className="address-category">
                  <h4 className="address-category-title">
                    {getAddressCategory(address.id)}
                  </h4>

                  <div
                    className={`address-card ${
                      selectedAddress === address.id ? "selected" : ""
                    }`}
                    onClick={() => setSelectedAddress(address.id)}
                  >
                    <div className="address-content">
                      <div className="address-select">
                        <input
                          type="radio"
                          id={`address-${address.id}`}
                          name="address"
                          checked={selectedAddress === address.id}
                          onChange={() => setSelectedAddress(address.id)}
                        />
                        <label htmlFor={`address-${address.id}`}>
                          <div className="address-name">
                            {address.name}
                            <span className="address-type">{address.type}</span>
                          </div>
                          <div className="address-details">
                            {address.addressLine}
                          </div>
                          <div className="address-location">
                            {address.city}, {address.state} - {address.zipcode}
                          </div>
                          <div className="address-phone">
                            Phone: {address.phone}
                          </div>
                          {address.id === "default" && (
                            <div className="delivery-note">
                              • Cash on Delivery available
                            </div>
                          )}
                        </label>
                      </div>
                    </div>
                    <div className="address-actions">
                      <button className="btn-remove">REMOVE</button>
                      <button className="btn-edit">EDIT</button>
                    </div>
                  </div>
                </div>
              ))}

              <button className="btn-add-address" onClick={openAddressModal}>
                + Add New Address
              </button>
            </div>
          </div>
        </div>

        <div className="right-column">
          <div className="cart-summary">
            <h2 className="section-title">PAYMENT SUMMARY</h2>
            <div className="summary-row">
              <span>Subtotal</span>
              <span>$ 0.00</span>
            </div>
            <div className="summary-row">
              <span>Shipping Fee</span>
              <span>$ 0.00</span>
            </div>
            <div className="summary-row">
              <span>Estimated tax</span>
              <span>$ 0.00</span>
            </div>
            <div className="summary-row">
              <span>Discount</span>
              <span>$ -0.00</span>
            </div>
            <div className="summary-row total">
              <span>Total</span>
              <span>$ 0.00</span>
            </div>
          </div>

          <div className="payment-methods">
            <h2 className="section-title">PAYMENT METHOD</h2>
            <div className="payment-options">
              <div
                className={`payment-option ${
                  selectedPayment === "stripe" ? "selected" : ""
                }`}
                onClick={() => setSelectedPayment("stripe")}
              >
                <input
                  type="radio"
                  id="stripe"
                  name="payment"
                  checked={selectedPayment === "stripe"}
                  onChange={() => setSelectedPayment("stripe")}
                />
                <label htmlFor="stripe">
                  <img src={stripeIcon} width={60} height={20} alt="Stripe" />
                </label>
              </div>

              <div
                className={`payment-option ${
                  selectedPayment === "razorpay" ? "selected" : ""
                }`}
                onClick={() => setSelectedPayment("razorpay")}
              >
                <input
                  type="radio"
                  id="razorpay"
                  name="payment"
                  checked={selectedPayment === "razorpay"}
                  onChange={() => setSelectedPayment("razorpay")}
                />
                <label htmlFor="razorpay">
                  <img src={razorpayIcon} width={90} alt="Razorpay" />
                </label>
              </div>

              <div
                className={`payment-option ${
                  selectedPayment === "cod" ? "selected" : ""
                }`}
                onClick={() => setSelectedPayment("cod")}
              >
                <input
                  type="radio"
                  id="cod"
                  name="payment"
                  checked={selectedPayment === "cod"}
                  onChange={() => setSelectedPayment("cod")}
                />
                <label htmlFor="cod">CASH ON DELIVERY</label>
              </div>
            </div>
          </div>

          <button className="btn-place-order">PLACE ORDER</button>
        </div>
      </div>

      {/* Address Modal */}
      <AddressModal
        isOpen={isAddressModalOpen}
        onClose={closeAddressModal}
        onSave={saveNewAddress}
      />
    </div>
  );
};

export default Checkout;
