import { toast } from "react-toastify";

/**
 * Validates selected address and returns address object
 * @param {string} selectedAddress - Selected address ID
 * @param {Array} addresses - Array of addresses
 * @param {Function} setIsProcessingOrder - Function to set processing state
 * @returns {Object|null} - Address object or null if invalid
 */
export const validateSelectedAddress = (
  selectedAddress,
  addresses,
  setIsProcessingOrder
) => {
  if (!selectedAddress) {
    toast.error("Please select a delivery address");
    return null;
  }

  const addressObj = addresses.find((addr) => addr._id === selectedAddress);
  if (!addressObj) {
    toast.error("Selected address not found");
    if (setIsProcessingOrder) setIsProcessingOrder(false);
    return null;
  }

  return addressObj;
};

/**
 * Maps bag items to order format
 * @param {Array} bag - Shopping bag items
 * @returns {Array} - Formatted order items
 */
export const mapBagToOrderItems = (bag) => {
  return bag.map((item) => ({
    productId:
      item._id || (item.productId && item.productId._id) || item.productId,
    quantity: item.quantity || 1,
    size: item.size || "",
    price:
      Number(item.newPrice) ||
      (item.productId && Number(item.productId.newPrice)) ||
      0,
    name: item.name || (item.productId && item.productId.name),
  }));
};

/**
 * Creates shipping address object from address data
 * @param {Object} addressObj - Address object
 * @returns {Object} - Formatted shipping address
 */
export const createShippingAddress = (addressObj) => ({
  name: addressObj.name,
  street: addressObj.street,
  city: addressObj.city,
  state: addressObj.state,
  zipCode: addressObj.zipCode,
  country: addressObj.country,
  phone: addressObj.phone,
});

/**
 * Higher-order function to wrap payment handlers with error handling
 * @param {Function} paymentHandler - Payment handler function
 * @param {Function} setIsProcessingOrder - Function to set processing state
 * @returns {Function} - Wrapped payment handler
 */
export const withPaymentErrorHandling = (
  paymentHandler,
  setIsProcessingOrder
) => {
  return async (...args) => {
    try {
      setIsProcessingOrder(true);
      await paymentHandler(...args);
    } catch (error) {
      console.error("Payment error:", error);
      toast.error(`Payment failed: ${error.message}`);
      setIsProcessingOrder(false);
    }
  };
};

/**
 * Loads external script dynamically
 * @param {string} src - Script source URL
 * @param {number} timeout - Timeout in milliseconds
 * @returns {Promise<boolean>} - Promise resolving to load success
 */
export const loadExternalScript = (src, timeout = 5000) => {
  return new Promise((resolve, reject) => {
    // Check if script is already loaded
    const existingScript = document.querySelector(`script[src="${src}"]`);
    if (existingScript) {
      resolve(true);
      return;
    }

    const script = document.createElement("script");
    script.src = src;
    script.async = true;

    script.onload = () => resolve(true);
    script.onerror = () => reject(new Error(`Failed to load script: ${src}`));

    document.body.appendChild(script);

    // Set timeout
    setTimeout(() => {
      reject(new Error(`Script load timeout: ${src}`));
    }, timeout);
  });
};

/**
 * Creates order data object
 * @param {Array} bag - Shopping bag items
 * @param {number} total - Order total
 * @param {Object} shippingAddress - Shipping address
 * @param {string} paymentMethod - Payment method
 * @param {string} paymentGateway - Payment gateway
 * @param {string} transactionId - Transaction ID
 * @returns {Object} - Order data object
 */
export const createOrderData = (
  bag,
  total,
  shippingAddress,
  paymentMethod,
  paymentGateway,
  transactionId
) => ({
  items: mapBagToOrderItems(bag),
  total,
  shippingAddress,
  paymentMethod,
  paymentGateway,
  transactionId,
});

/**
 * Gets default address from addresses array
 * @param {Array} addresses - Array of addresses
 * @returns {string|null} - Default address ID or null
 */
export const getDefaultAddressId = (addresses) => {
  const defaultAddress = addresses.find((address) => address.isDefault);
  if (defaultAddress) {
    return defaultAddress._id;
  }

  // If no default, return first address
  return addresses.length > 0 ? addresses[0]._id : null;
};

/**
 * Payment method configuration
 */
export const PAYMENT_METHODS = {
  STRIPE: "stripe",
  RAZORPAY: "razorpay",
  COD: "cod",
};

/**
 * Razorpay configuration helper
 * @param {Object} orderData - Razorpay order data
 * @param {Object} user - User object
 * @param {Function} onSuccess - Success handler
 * @param {Function} onDismiss - Dismiss handler
 * @returns {Object} - Razorpay options
 */
export const createRazorpayOptions = (
  orderData,
  user,
  onSuccess,
  onDismiss
) => ({
  key: import.meta.env.VITE_RAZORPAY_KEY_ID,
  amount: orderData.amount,
  currency: orderData.currency,
  name: "TrendZ",
  description: "Purchase from TrendZ",
  order_id: orderData.id,
  handler: onSuccess,
  prefill: {
    name: user?.name || "",
    email: user?.email || "",
  },
  theme: {
    color: "#3399cc",
  },
  modal: {
    ondismiss: onDismiss,
  },
});
