import React, { useState } from "react";
import { Link } from "react-router-dom";
import ShopContext from "../Context/ShopContext";
import "./CSS/Orders.css";
import { FiX } from "react-icons/fi";
import { FiPackage } from "react-icons/fi";
import noOrdersImage from "../assets/no_orders.png";

const Orders = () => {
  const [cancelModalOpen, setCancelModalOpen] = useState(false);
  const [orderToCancel, setOrderToCancel] = useState(null);

  // Sample orders data - in a real app, this would come from your API/context
  const [orders, setOrders] = useState([
    {
      id: "ORD-12345",
      date: "Sun May 11 2025",
      status: "Delivered",
      total: 58.0,
      items: [
        {
          _id: "prod001",
          name: "Premium cotton T-shirt",
          size: "M",
          quantity: 2,
          price: 29.0,
          image: "https://via.placeholder.com/150",
        },
      ],
      paymentMethod: "Card",
    },
    {
      id: "ORD-12346",
      date: "Sun May 11 2025",
      status: "Ordered",
      total: 58.0,
      items: [
        {
          _id: "prod001",
          name: "Premium cotton T-shirt",
          size: "M",
          quantity: 2,
          price: 29.0,
          image: "https://via.placeholder.com/150",
        },
      ],
      paymentMethod: "COD",
    },
  ]);

  // Helper function to get status badge class
  const getStatusBadgeClass = (status) => {
    switch (status.toLowerCase()) {
      case "delivered":
        return "status-badge delivered";
      case "ordered":
        return "status-badge ordered";
      case "shipped":
        return "status-badge shipped";
      case "out for delivery":
        return "status-badge out-for-delivery";
      case "cancelled":
        return "status-badge cancelled";
      default:
        return "status-badge";
    }
  };

  // Open cancel order modal
  const openCancelModal = (order) => {
    setOrderToCancel(order);
    setCancelModalOpen(true);
  };

  // Cancel order functionality
  const handleCancelOrder = () => {
    // In a real app, you would call an API to cancel the order
    const updatedOrders = orders.map((order) => {
      if (order.id === orderToCancel.id) {
        return { ...order, status: "Cancelled" };
      }
      return order;
    });

    setOrders(updatedOrders);
    setCancelModalOpen(false);
  };

  // Check if an order can be cancelled (only ordered orders)
  const canCancelOrder = (status) => {
    return status.toLowerCase() === "ordered";
  };

  // Empty orders view
  if (orders.length === 0) {
    return (
      <div className="empty-orders-container">
        <div className="empty-orders-content">
          <img
            src={noOrdersImage}
            alt="No Orders Found"
            className="empty-orders-image"
          />
          <h2>You Haven't Placed Any Orders Yet</h2>
          <p>Once you place an order, you'll be able to track it here.</p>
          <Link to="/">
            <button className="start-shopping-button">START SHOPPING</button>
          </Link>
        </div>
      </div>
    );
  }

  // Orders with items view
  return (
    <div className="orders-page">
      <div className="orders-list">
        {orders.map((order) => (
          <div key={order.id} className="order-card">
            <div className="order-product-details">
              <div className="order-product-image">
                <img src={order.items[0].image} alt={order.items[0].name} />
              </div>
              <div className="order-product-info">
                <h3 className="order-product-name">{order.items[0].name}</h3>
                <div className="order-product-specs">
                  <span className="order-product-size">
                    Size: {order.items[0].size}
                  </span>
                  <span className="order-product-quantity">
                    Qty: {order.items[0].quantity}
                  </span>
                  <span className="order-product-price">
                    ${order.items[0].price.toFixed(2)}
                  </span>
                </div>
                <div className="order-meta-info">
                  <span className="payment-method">
                    Payment: {order.paymentMethod}
                  </span>
                  <span className="order-date">Date: {order.date}</span>
                </div>
              </div>
            </div>

            <div className="order-status-actions">
              <div className={getStatusBadgeClass(order.status)}>
                <FiPackage className="package-icon" />
                <span className="status-text">{order.status}</span>
              </div>

              <div className="order-actions">
                {order.status === "Delivered" && (
                  <>
                    <button className="order-action-button primary">
                      Rate & Review
                    </button>
                    <button className="order-action-button secondary">
                      Return / Replace
                    </button>
                  </>
                )}
                {order.status === "Ordered" && (
                  <>
                    <button className="order-action-button primary">
                      Track package
                    </button>
                    <button
                      className="order-action-button secondary cancel-button"
                      onClick={() => openCancelModal(order)}
                    >
                      Cancel order
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Cancel Order Modal */}
      {cancelModalOpen && orderToCancel && (
        <div className="modal-overlay">
          <div className="cancel-order-modal">
            <div className="modal-header">
              <FiX className="warning-icon" />
              <h3>Cancel Order #{orderToCancel.id}?</h3>
            </div>
            <p>
              Are you sure you want to cancel this order? This action cannot be
              undone.
            </p>
            <div className="modal-actions">
              <button
                className="modal-button modal-button-secondary"
                onClick={() => setCancelModalOpen(false)}
              >
                Keep Order
              </button>
              <button
                className="modal-button modal-button-primary"
                onClick={handleCancelOrder}
              >
                Yes, Cancel Order
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Orders;
