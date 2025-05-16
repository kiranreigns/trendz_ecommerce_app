import React, { useState } from "react";
import { FiX } from "react-icons/fi";

const AddressModal = ({ isOpen, onClose, onSave }) => {
  const [address, setAddress] = useState({
    name: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    phone: "",
    type: "HOME",
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!address.name) newErrors.name = "Name is required";
    if (!address.street) newErrors.street = "Street address is required";
    if (!address.city) newErrors.city = "City is required";
    if (!address.state) newErrors.state = "State is required";
    if (!address.zipCode) newErrors.zipCode = "ZIP code is required";
    if (!address.country) newErrors.country = "Country is required";
    if (!address.phone) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\d{10}$/.test(address.phone.replace(/[^\d]/g, ""))) {
      newErrors.phone = "Please enter a valid phone number";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddress((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when field is edited
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: null,
      }));
    }
  };

  const handleAddressTypeChange = (type) => {
    setAddress((prev) => ({
      ...prev,
      type,
    }));
  };

  const handleSubmit = () => {
    if (validateForm()) {
      onSave(address);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="address-modal">
        <div className="modal-header">
          <h3>Add New Address</h3>
          <button className="close-modal-btn" onClick={onClose}>
            <FiX size={24} />
          </button>
        </div>

        <div className="address-modal-content">
          <div className="form-row">
            <div className="form-input-container full-width">
              <label htmlFor="name">Full Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={address.name}
                onChange={handleChange}
                className={`form-input ${errors.name ? "input-error" : ""}`}
                placeholder="Full name"
              />
              {errors.name && (
                <div className="error-message">{errors.name}</div>
              )}
            </div>
          </div>

          <div className="form-row">
            <div className="form-input-container full-width">
              <label htmlFor="street">Street Address</label>
              <input
                type="text"
                id="street"
                name="street"
                value={address.street}
                onChange={handleChange}
                className={`form-input ${errors.street ? "input-error" : ""}`}
                placeholder="Street address, apartment, suite, etc."
              />
              {errors.street && (
                <div className="error-message">{errors.street}</div>
              )}
            </div>
          </div>

          <div className="form-row">
            <div className="form-input-container">
              <label htmlFor="city">City</label>
              <input
                type="text"
                id="city"
                name="city"
                value={address.city}
                onChange={handleChange}
                className={`form-input ${errors.city ? "input-error" : ""}`}
                placeholder="City"
              />
              {errors.city && (
                <div className="error-message">{errors.city}</div>
              )}
            </div>

            <div className="form-input-container">
              <label htmlFor="state">State</label>
              <input
                type="text"
                id="state"
                name="state"
                value={address.state}
                onChange={handleChange}
                className={`form-input ${errors.state ? "input-error" : ""}`}
                placeholder="State/Province"
              />
              {errors.state && (
                <div className="error-message">{errors.state}</div>
              )}
            </div>
          </div>

          <div className="form-row">
            <div className="form-input-container">
              <label htmlFor="zipCode">ZIP Code</label>
              <input
                type="text"
                id="zipCode"
                name="zipCode"
                value={address.zipCode}
                onChange={handleChange}
                className={`form-input ${errors.zipCode ? "input-error" : ""}`}
                placeholder="ZIP/Postal code"
              />
              {errors.zipCode && (
                <div className="error-message">{errors.zipCode}</div>
              )}
            </div>

            <div className="form-input-container">
              <label htmlFor="country">Country</label>
              <input
                type="text"
                id="country"
                name="country"
                value={address.country}
                onChange={handleChange}
                className={`form-input ${errors.country ? "input-error" : ""}`}
                placeholder="Country"
              />
              {errors.country && (
                <div className="error-message">{errors.country}</div>
              )}
            </div>
          </div>

          <div className="form-row">
            <div className="form-input-container full-width">
              <label htmlFor="phone">Phone Number</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={address.phone}
                onChange={handleChange}
                className={`form-input ${errors.phone ? "input-error" : ""}`}
                placeholder="Phone number"
              />
              {errors.phone && (
                <div className="error-message">{errors.phone}</div>
              )}
            </div>
          </div>

          <div className="address-type-selector">
            <label>Address Type</label>
            <div className="address-type-options">
              <div
                className={`address-type-option ${
                  address.type === "HOME" ? "selected" : ""
                }`}
                onClick={() => handleAddressTypeChange("HOME")}
              >
                HOME
              </div>
              <div
                className={`address-type-option ${
                  address.type === "WORK" ? "selected" : ""
                }`}
                onClick={() => handleAddressTypeChange("WORK")}
              >
                WORK
              </div>
              <div
                className={`address-type-option ${
                  address.type === "OTHER" ? "selected" : ""
                }`}
                onClick={() => handleAddressTypeChange("OTHER")}
              >
                OTHER
              </div>
            </div>
          </div>
        </div>

        <div className="modal-actions">
          <button className="btn-cancel" onClick={onClose}>
            CANCEL
          </button>
          <button className="btn-save" onClick={handleSubmit}>
            SAVE ADDRESS
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddressModal;
