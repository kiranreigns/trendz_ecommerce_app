import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { orderService } from "../services/api.js";
// import packageIcon from "../assets/package_icon.svg";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedOrder, setExpandedOrder] = useState(null);
  const [updatingOrderId, setUpdatingOrderId] = useState(null);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const orders = await orderService.getAll();
      setOrders(orders);
    } catch (error) {
      console.error("Error fetching orders:", error);
      toast.error("Failed to load orders. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleStatusChange = async (orderId, newStatus, itemId = null) => {
    try {
      setUpdatingOrderId(orderId);
      await orderService.updateOrderStatus(orderId, newStatus, itemId);

      // Update local state
      setOrders(
        orders.map((order) => {
          if (order._id === orderId) {
            if (itemId) {
              // Update specific item status
              return {
                ...order,
                items: order.items.map((item) =>
                  item._id === itemId ? { ...item, status: newStatus } : item
                ),
              };
            } else {
              // Update overall order status
              return {
                ...order,
                status: newStatus,
              };
            }
          }
          return order;
        })
      );

      toast.success(
        itemId
          ? `Item status updated to ${newStatus}`
          : `Order status updated to ${newStatus}`
      );
    } catch (error) {
      console.error("Error updating order status:", error);
      toast.error("Failed to update order status. Please try again.");
    } finally {
      setUpdatingOrderId(null);
    }
  };

  const toggleOrderExpand = (orderId) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getStatusClass = (status) => {
    switch (status.toLowerCase()) {
      case "delivered":
        return "status-delivered";
      case "shipped":
        return "status-shipped";
      case "out for delivery":
        return "status-out-for-delivery";
      case "ordered":
        return "status-ordered";
      case "cancelled":
        return "status-cancelled";
      default:
        return "";
    }
  };

  return (
    <div className="orders-container">
      <ToastContainer position="top-right" autoClose={3000} />

      <div className="orders-header">
        <h2>Orders Management</h2>
        <button
          className="refresh-button"
          onClick={fetchOrders}
          disabled={loading}
        >
          {loading ? "Loading..." : "Refresh Orders"}
        </button>
      </div>

      {loading ? (
        <div className="loading-container">Loading orders...</div>
      ) : (
        <div className="orders-table-container">
          <table className="orders-table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Date</th>
                <th>Total</th>
                <th>Payment</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.length === 0 ? (
                <tr>
                  <td colSpan="7" className="no-orders">
                    No orders found
                  </td>
                </tr>
              ) : (
                orders.map((order) => (
                  <React.Fragment key={order._id}>
                    <tr
                      className={expandedOrder === order._id ? "expanded" : ""}
                    >
                      <td>{order._id.substring(0, 8)}...</td>
                      <td>{order.userId.name}</td>
                      <td>{formatDate(order.orderedAt)}</td>
                      <td>${order.total.toFixed(2)}</td>
                      <td>
                        {order.payment.paymentMethod}
                        {order.payment.paymentGateway &&
                          ` (${order.payment.paymentGateway})`}
                      </td>
                      <td>
                        <span
                          className={`status-badge ${getStatusClass(
                            order.status
                          )}`}
                        >
                          {order.status}
                        </span>
                      </td>
                      <td>
                        <div className="order-actions">
                          <button
                            className="view-details-btn"
                            onClick={() => toggleOrderExpand(order._id)}
                          >
                            {expandedOrder === order._id
                              ? "Hide Details"
                              : "View Details"}
                          </button>
                          <select
                            className="status-dropdown"
                            value={order.status}
                            onChange={(e) =>
                              handleStatusChange(order._id, e.target.value)
                            }
                            disabled={updatingOrderId === order._id}
                          >
                            <option value="Ordered">Ordered</option>
                            <option value="Shipped">Shipped</option>
                            <option value="Out for delivery">
                              Out for delivery
                            </option>
                            <option value="Delivered">Delivered</option>
                            <option value="Cancelled">Cancelled</option>
                          </select>
                        </div>
                      </td>
                    </tr>
                    {expandedOrder === order._id && (
                      <tr className="order-details-row">
                        <td colSpan="7">
                          <div className="order-details">
                            <div className="order-items">
                              <h4>Order Items</h4>
                              <table className="items-table">
                                <thead>
                                  <tr>
                                    <th>Product</th>
                                    <th>Size</th>
                                    <th>Quantity</th>
                                    <th>Price</th>
                                    <th>Item Status</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {order.items.map((item, index) => (
                                    <tr key={index}>
                                      <td>{item.productId.name}</td>
                                      <td>{item.size}</td>
                                      <td>{item.quantity}</td>
                                      <td>${item.price.toFixed(2)}</td>
                                      <td>
                                        <select
                                          className="item-status-dropdown"
                                          value={item.status || order.status}
                                          onChange={(e) =>
                                            handleStatusChange(
                                              order._id,
                                              e.target.value,
                                              item._id
                                            )
                                          }
                                          disabled={
                                            updatingOrderId === order._id
                                          }
                                        >
                                          <option value="Ordered">
                                            Ordered
                                          </option>
                                          <option value="Shipped">
                                            Shipped
                                          </option>
                                          <option value="Out for delivery">
                                            Out for delivery
                                          </option>
                                          <option value="Delivered">
                                            Delivered
                                          </option>
                                          <option value="Cancelled">
                                            Cancelled
                                          </option>
                                          <option value="Returned">
                                            Returned
                                          </option>
                                        </select>
                                      </td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                            <div className="shipping-address">
                              <h4>Shipping Address</h4>
                              <p>
                                <strong>Name:</strong>{" "}
                                {order.shippingAddress.name}
                              </p>
                              <p>
                                <strong>Address:</strong>{" "}
                                {order.shippingAddress.street}
                              </p>
                              <p>
                                <strong>City:</strong>{" "}
                                {order.shippingAddress.city}
                              </p>
                              <p>
                                <strong>State:</strong>{" "}
                                {order.shippingAddress.state}
                              </p>
                              <p>
                                <strong>Zip Code:</strong>{" "}
                                {order.shippingAddress.zipCode}
                              </p>
                              <p>
                                <strong>Country:</strong>{" "}
                                {order.shippingAddress.country}
                              </p>
                              <p>
                                <strong>Phone:</strong>{" "}
                                {order.shippingAddress.phone}
                              </p>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Orders;
