import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import "./CSS/Orders.css";
import { FiX } from "react-icons/fi";
import { FiPackage } from "react-icons/fi";
import noOrdersImage from "../assets/no_orders.png";
import { userService } from "../services/api";
import { toast } from "react-toastify";
import Loader from "../components/Loader/Loader";

const Orders = () => {
  const { isAuthenticated } = useAuth();
  const [cancelModalOpen, setCancelModalOpen] = useState(false);
  const [orderToCancel, setOrderToCancel] = useState(null);
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch orders from API
  useEffect(() => {
    const fetchOrders = async () => {
      if (!isAuthenticated) {
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        const response = await userService.getUserOrders();
        if (response.success) {
          // Transform the data to match the component's expected format
          const formattedOrders = response.orders.map((order) => ({
            id: order._id,
            date: new Date(order.orderedAt).toDateString(),
            status: order.status,
            total: order.total,
            items: order.items.map((item) => ({
              _id: item.productId._id,
              itemId: item._id, // Include the order item ID
              name: item.productId.name,
              size: item.size,
              quantity: item.quantity,
              price: item.price,
              image: item.productId.image,
              status: item.status || order.status, // Use item status if available, otherwise fall back to order status
            })),
            paymentMethod: order.payment.paymentMethod,
            paymentGateway: order.payment.paymentGateway,
            paymentStatus: order.payment.paymentStatus,
          }));

          setOrders(formattedOrders);
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
        toast.error("Failed to load orders. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrders();
  }, [isAuthenticated]);

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
      case "returned":
        return "status-badge returned";
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
  const handleCancelOrder = async () => {
    try {
      const response = await userService.cancelOrder(
        orderToCancel.id,
        orderToCancel.itemId
      );

      if (response.success) {
        // Update the local state
        const updatedOrders = orders.map((order) => {
          if (order.id === orderToCancel.id) {
            if (orderToCancel.itemId) {
              // Update specific item status
              return {
                ...order,
                items: order.items.map((item) =>
                  item.itemId === orderToCancel.itemId
                    ? { ...item, status: "Cancelled" }
                    : item
                ),
              };
            } else {
              // Update entire order status
              return {
                ...order,
                status: "Cancelled",
                items: order.items.map((item) => ({
                  ...item,
                  status: "Cancelled",
                })),
              };
            }
          }
          return order;
        });

        setOrders(updatedOrders);
        toast.success(
          orderToCancel.itemId
            ? "Item cancelled successfully"
            : "Order cancelled successfully"
        );
      } else {
        toast.error("Failed to cancel order");
      }
    } catch (error) {
      console.error("Error cancelling order:", error);
      toast.error("Failed to cancel order. Please try again.");
    } finally {
      setCancelModalOpen(false);
    }
  };

  // Check if an order can be cancelled (only ordered orders)
  const canCancelOrder = (status) => {
    return (
      status.toLowerCase() !== "delivered" &&
      status.toLowerCase() !== "cancelled" &&
      status.toLowerCase() !== "returned"
    );
  };

  if (isLoading) {
    return (
      <div className="loading-container">
        <Loader />
      </div>
    );
  }

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

  // Flatten the orders to display each product individually
  const flattenedOrderProducts = orders.flatMap((order) =>
    order.items.map((item) => ({
      orderId: order.id,
      orderDate: order.date,
      orderStatus: order.status,
      itemStatus: item.status, // Use the item-specific status
      paymentMethod: order.paymentMethod,
      paymentGateway: order.paymentGateway,
      product: item,
    }))
  );

  // Orders with items view
  return (
    <div className="orders-page">
      <div className="orders-list">
        {flattenedOrderProducts.map((orderProduct, index) => (
          <div
            key={`${orderProduct.orderId}-${orderProduct.product._id}-${index}`}
            className="order-card"
          >
            <div className="order-product-details mb-4">
              <Link
                to={`/product/${orderProduct.product._id}`}
                className="order-product-link"
              >
                <div className="order-product-image">
                  {orderProduct.product.image && (
                    <img
                      src={orderProduct.product.image[0]?.url}
                      alt={orderProduct.product.name}
                    />
                  )}
                </div>
              </Link>

              <div className="order-product-info">
                <h3 className="order-product-name">
                  {orderProduct.product.name}
                </h3>
                <div className="order-product-specs">
                  <span className="order-product-size">
                    Size: {orderProduct.product.size}
                  </span>
                  <span className="order-product-quantity">
                    Qty: {orderProduct.product.quantity}
                  </span>
                  <span className="order-product-price">
                    ${orderProduct.product.price.toFixed(2)}
                  </span>
                </div>
                <div className="order-meta-info">
                  <span className="payment-method">
                    Payment: {orderProduct.paymentMethod}
                    {orderProduct.paymentGateway &&
                      ` (${orderProduct.paymentGateway})`}
                  </span>
                  <span className="order-date">
                    Date: {orderProduct.orderDate}
                  </span>
                </div>
              </div>
            </div>
            <div className="order-status-actions">
              <div
                className={getStatusBadgeClass(
                  orderProduct.itemStatus || orderProduct.orderStatus
                )}
              >
                <FiPackage className="package-icon" />
                <span className="status-text">
                  {orderProduct.itemStatus || orderProduct.orderStatus}
                </span>
              </div>
              <div className="order-actions">
                {(orderProduct.itemStatus || orderProduct.orderStatus) ===
                  "Delivered" && (
                  <>
                    <button className="order-action-button primary">
                      Rate & Review
                    </button>
                    <button
                      className="order-action-button secondary"
                      onClick={async () => {
                        try {
                          const response =
                            await userService.updateOrderItemStatus(
                              orderProduct.orderId,
                              orderProduct.product.itemId,
                              "Returned"
                            );
                          if (response.success) {
                            // Update local state
                            const updatedOrders = orders.map((order) => {
                              if (order.id === orderProduct.orderId) {
                                return {
                                  ...order,
                                  items: order.items.map((item) =>
                                    item.itemId === orderProduct.product.itemId
                                      ? { ...item, status: "Returned" }
                                      : item
                                  ),
                                };
                              }
                              return order;
                            });
                            setOrders(updatedOrders);
                            toast.success("Item marked as returned");
                          }
                        } catch (error) {
                          console.error("Error returning item:", error);
                          toast.error(
                            "Failed to return item. Please try again."
                          );
                        }
                      }}
                    >
                      Return Item
                    </button>
                  </>
                )}
                {canCancelOrder(
                  orderProduct.itemStatus || orderProduct.orderStatus
                ) && (
                  <>
                    <button className="order-action-button primary">
                      Track package
                    </button>
                    <button
                      className="order-action-button secondary cancel-button"
                      onClick={() =>
                        openCancelModal({
                          id: orderProduct.orderId,
                          itemId: orderProduct.product.itemId,
                          status:
                            orderProduct.itemStatus || orderProduct.orderStatus,
                        })
                      }
                    >
                      Cancel item
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
              <h3>
                <h3>Cancel Order #{orderToCancel.id}?</h3>
              </h3>
            </div>
            <p>
              Are you sure you want to cancel this{" "}
              {orderToCancel.itemId ? "item" : "order"} ? This action cannot be
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
                Yes, Cancel {orderToCancel.itemId ? "Item" : "Order"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Orders;
