import React from "react";
import razorpayIcon from "../../assets/razorpay_logo.png";
import stripeIcon from "../../assets/stripe_logo.png";
import { PAYMENT_METHODS } from "../../utils/checkoutHelpers";

const CheckoutActions = ({
  selectedPayment,
  setSelectedPayment,
  isProcessingOrder,
  handlePlaceOrder,
}) => {
  const onPlaceOrder = () => {
    handlePlaceOrder(selectedPayment);
  };

  return (
    <div className="checkout-actions">
      <div className="payment-methods">
        <h2 className="section-title">PAYMENT METHOD</h2>
        <div className="payment-options">
          <div
            className={`payment-option ${
              selectedPayment === PAYMENT_METHODS.STRIPE ? "selected" : ""
            }`}
            onClick={() => setSelectedPayment(PAYMENT_METHODS.STRIPE)}
          >
            <input
              type="radio"
              id="stripe"
              name="payment"
              checked={selectedPayment === PAYMENT_METHODS.STRIPE}
              onChange={() => setSelectedPayment(PAYMENT_METHODS.STRIPE)}
            />
            <label htmlFor="stripe">
              <img src={stripeIcon} width={60} height={20} alt="Stripe" />
            </label>
          </div>

          <div
            className={`payment-option ${
              selectedPayment === PAYMENT_METHODS.RAZORPAY ? "selected" : ""
            }`}
            onClick={() => setSelectedPayment(PAYMENT_METHODS.RAZORPAY)}
          >
            <input
              type="radio"
              id="razorpay"
              name="payment"
              checked={selectedPayment === PAYMENT_METHODS.RAZORPAY}
              onChange={() => setSelectedPayment(PAYMENT_METHODS.RAZORPAY)}
            />
            <label htmlFor="razorpay">
              <img src={razorpayIcon} width={90} alt="Razorpay" />
            </label>
          </div>

          <div
            className={`payment-option ${
              selectedPayment === PAYMENT_METHODS.COD ? "selected" : ""
            }`}
            onClick={() => setSelectedPayment(PAYMENT_METHODS.COD)}
          >
            <input
              type="radio"
              id="cod"
              name="payment"
              checked={selectedPayment === PAYMENT_METHODS.COD}
              onChange={() => setSelectedPayment(PAYMENT_METHODS.COD)}
            />
            <label htmlFor="cod">CASH ON DELIVERY</label>
          </div>
        </div>
      </div>

      <button
        className="btn-place-order"
        onClick={onPlaceOrder}
        disabled={isProcessingOrder}
      >
        {isProcessingOrder ? "PROCESSING..." : "PLACE ORDER"}
      </button>
    </div>
  );
};

export default CheckoutActions;
