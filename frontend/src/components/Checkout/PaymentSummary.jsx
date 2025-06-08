const PaymentSummary = ({ subtotal, shipping, tax, discount, total }) => {
  return (
    <div className="cart-summary">
      <h2 className="section-title">PAYMENT SUMMARY</h2>
      <div className="summary-row">
        <span>Subtotal</span>
        <span>${subtotal}</span>
      </div>
      <div className="summary-row">
        <span>Shipping Fee</span>
        <span>{shipping == 0 ? "Free" : `$${shipping}`}</span>
      </div>
      <div className="summary-row">
        <span>Tax (5%)</span>
        <span>${tax}</span>
      </div>
      <div className="summary-row">
        <span>Discount</span>
        <span>-${discount}</span>
      </div>
      <div className="summary-row total">
        <span>Total</span>
        <span>${total}</span>
      </div>
    </div>
  );
};

export default PaymentSummary;
