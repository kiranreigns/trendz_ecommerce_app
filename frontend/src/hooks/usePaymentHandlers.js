import { useState, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { loadStripe } from "@stripe/stripe-js";
import { paymentService, userService } from "../services/api";
import {
  validateSelectedAddress,
  mapBagToOrderItems,
  createShippingAddress,
  createOrderData,
  loadExternalScript,
  createRazorpayOptions,
  PAYMENT_METHODS,
} from "../utils/checkoutHelpers";

// Initialize Stripe
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

const usePaymentHandlers = ({
  bag,
  total,
  shipping,
  tax,
  selectedAddress,
  addresses,
  user,
}) => {
  const [isProcessingOrder, setIsProcessingOrder] = useState(false);
  const navigate = useNavigate();

  // Create order in database
  const createOrderInDatabase = useCallback(
    async (paymentMethod, paymentGateway, transactionId) => {
      try {
        const selectedAddressObj = validateSelectedAddress(
          selectedAddress,
          addresses,
          setIsProcessingOrder
        );
        if (!selectedAddressObj) return;

        const shippingAddress = createShippingAddress(selectedAddressObj);
        const orderData = createOrderData(
          bag,
          total,
          shippingAddress,
          paymentMethod,
          paymentGateway,
          transactionId
        );

        const response = await userService.createOrder(orderData);

        if (response.success) {
          toast.success("Order placed successfully!");
          navigate("/orders");
        } else {
          throw new Error("Failed to create order");
        }
      } catch (error) {
        console.error("Order creation error:", error);
        toast.error("Failed to place order. Please try again.");
      } finally {
        setIsProcessingOrder(false);
      }
    },
    [bag, total, selectedAddress, addresses, navigate]
  );

  // Handle Stripe payment
  const handleStripePayment = useCallback(async () => {
    const selectedAddressObj = validateSelectedAddress(
      selectedAddress,
      addresses,
      setIsProcessingOrder
    );
    if (!selectedAddressObj) return;

    setIsProcessingOrder(true);

    try {
      const response = await paymentService.createStripeSession({
        amount: total,
        items: mapBagToOrderItems(bag),
        shipping,
        tax,
        shippingAddress: createShippingAddress(selectedAddressObj),
      });

      if (!response.success || !response.sessionId) {
        throw new Error("Failed to create Stripe session");
      }

      const stripe = await stripePromise;
      const { error } = await stripe.redirectToCheckout({
        sessionId: response.sessionId,
      });

      if (error) {
        throw new Error(error.message);
      }
    } catch (error) {
      console.error("Stripe payment error:", error);
      toast.error("Payment initialization failed. Please try again.");
      setIsProcessingOrder(false);
    }
  }, [selectedAddress, addresses, total, bag, shipping, tax]);

  // Handle Razorpay payment
  const handleRazorpayPayment = useCallback(async () => {
    const selectedAddressObj = validateSelectedAddress(
      selectedAddress,
      addresses,
      setIsProcessingOrder
    );
    if (!selectedAddressObj) return;

    setIsProcessingOrder(true);

    try {
      // Load Razorpay SDK if not already loaded
      if (!window.Razorpay) {
        await loadExternalScript(
          "https://checkout.razorpay.com/v1/checkout.js"
        );

        if (!window.Razorpay) {
          throw new Error("Razorpay SDK failed to load");
        }
      }

      // Create Razorpay order
      const orderResponse = await paymentService.createRazorpayOrder(total);
      if (!orderResponse.success) {
        throw new Error("Failed to create order");
      }

      const razorpayOrderData = orderResponse.order;

      const handleRazorpaySuccess = async (response) => {
        try {
          const verifyResponse = await paymentService.verifyRazorpayPayment({
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
          });

          if (verifyResponse.success) {
            await createOrderInDatabase(
              "Card",
              "Razorpay",
              response.razorpay_payment_id
            );
          } else {
            toast.error("Payment verification failed. Please contact support.");
            setIsProcessingOrder(false);
          }
        } catch (error) {
          console.error("Payment verification error:", error);
          toast.error("Payment verification failed. Please contact support.");
          setIsProcessingOrder(false);
        }
      };

      const handleRazorpayDismiss = () => {
        setIsProcessingOrder(false);
        toast.info("Payment cancelled");
      };

      const options = createRazorpayOptions(
        razorpayOrderData,
        user,
        handleRazorpaySuccess,
        handleRazorpayDismiss
      );

      const razorpayInstance = new window.Razorpay(options);
      razorpayInstance.open();
    } catch (error) {
      console.error("Razorpay error:", error);
      toast.error(`Payment initialization failed: ${error.message}`);
      setIsProcessingOrder(false);
    }
  }, [selectedAddress, addresses, total, user, createOrderInDatabase]);

  // Handle COD order
  const handleCODOrder = useCallback(async () => {
    const selectedAddressObj = validateSelectedAddress(
      selectedAddress,
      addresses,
      setIsProcessingOrder
    );
    if (!selectedAddressObj) return;

    await createOrderInDatabase("COD", "", "");
  }, [selectedAddress, addresses, createOrderInDatabase]);

  // Payment strategy mapping
  const paymentStrategies = useMemo(
    () => ({
      [PAYMENT_METHODS.STRIPE]: handleStripePayment,
      [PAYMENT_METHODS.RAZORPAY]: handleRazorpayPayment,
      [PAYMENT_METHODS.COD]: handleCODOrder,
    }),
    [handleStripePayment, handleRazorpayPayment, handleCODOrder]
  );

  // Handle place order button click
  const handlePlaceOrder = useCallback(
    async (selectedPayment) => {
      const selectedAddressObj = validateSelectedAddress(
        selectedAddress,
        addresses
      );
      if (!selectedAddressObj) return;

      const paymentHandler = paymentStrategies[selectedPayment];
      if (!paymentHandler) {
        toast.error("Please select a valid payment method");
        return;
      }

      await paymentHandler();
    },
    [selectedAddress, addresses, paymentStrategies]
  );

  return {
    isProcessingOrder,
    handlePlaceOrder,
    handleStripePayment,
    handleRazorpayPayment,
    handleCODOrder,
    createOrderInDatabase,
  };
};

export default usePaymentHandlers;
