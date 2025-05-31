import React from "react";

const AddressSection = ({
  addresses,
  selectedAddress,
  setSelectedAddress,
  openAddressModal,
  isLoading,
}) => {
  // Helper function to get status badge class
  const getAddressCategory = (address) => {
    return address.isDefault ? "DEFAULT ADDRESS" : "OTHER ADDRESS";
  };

  if (isLoading) {
    return (
      <div className="address-section">
        <p>Loading addresses...</p>
      </div>
    );
  }

  return (
    <div className="address-section">
      <h2 className="section-title">Select Delivery Address</h2>

      <div className="address-options">
        {addresses.length > 0 ? (
          addresses.map((address) => (
            <div key={address._id} className="address-category">
              <h4 className="address-category-title">
                {getAddressCategory(address)}
              </h4>

              <div
                className={`address-card ${
                  selectedAddress === address._id ? "selected" : ""
                }`}
                onClick={() => setSelectedAddress(address._id)}
              >
                <div className="address-content">
                  <div className="address-select">
                    <input
                      type="radio"
                      id={`address-${address._id}`}
                      name="address"
                      checked={selectedAddress === address._id}
                      onChange={() => setSelectedAddress(address._id)}
                    />
                    <label htmlFor={`address-${address._id}`}>
                      <div className="address-name">
                        {address.name}
                        <span className="address-type">{address.type}</span>
                      </div>
                      <div className="address-details">{address.street}</div>
                      <div className="address-location">
                        {address.city}, {address.state} - {address.zipCode}
                      </div>
                      <div className="address-phone">
                        Phone: {address.phone}
                      </div>
                    </label>
                  </div>
                </div>
                <div className="address-actions">
                  <button className="btn-remove">REMOVE</button>
                  <button className="btn-edit">EDIT</button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="no-addresses">
            <p>No addresses found. Please add a new address.</p>
          </div>
        )}

        <button className="btn-add-address" onClick={openAddressModal}>
          + Add New Address
        </button>
      </div>
    </div>
  );
};

export default AddressSection;
