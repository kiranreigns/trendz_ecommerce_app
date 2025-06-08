import { useState, useEffect, useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./CSS/Checkout.css";
import "../components/AddressModal/AddressModal.css";
import AddressModal from "../components/AddressModal/AddressModal";
import ShopContext from "../context/ShopContext";
import Loader from "../components/Loader/Loader";
import { useAuth } from "../hooks/useAuth";
import { useBagCalculations } from "../hooks/useBagCalculations";

// Import components
import AddressSection from "../components/Checkout/AddressSection";
import PaymentSummary from "../components/Checkout/PaymentSummary";
import CheckoutActions from "../components/Checkout/CheckoutActions";

// Import hooks and services
import usePaymentHandlers from "../hooks/usePaymentHandlers";
import useRazorpaySDK from "../hooks/useRazorpaySDK";
import { userService, paymentService } from "../services/api";
import { toast } from "react-toastify";
import { getDefaultAddressId, PAYMENT_METHODS } from "../utils/checkoutHelpers";

const Checkout = () => {
  const { user } = useAuth();
  const { bag } = useContext(ShopContext);
  const { subtotal, shipping, tax, discount, total } = useBagCalculations();
  const navigate = useNavigate();

  // State
  const [selectedAddress, setSelectedAddress] = useState("");
  const [selectedPayment, setSelectedPayment] = useState(
    PAYMENT_METHODS.STRIPE
  );
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [addresses, setAddresses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const stripeHandledRef = useRef(false);

  // Custom hooks
  // const { isLoaded: isRazorpayLoaded } = useRazorpaySDK();
  useRazorpaySDK();
  const { isProcessingOrder, handlePlaceOrder } = usePaymentHandlers({
    bag,
    total,
    shipping,
    tax,
    selectedAddress,
    addresses,
    user,
  });

  // Fetch addresses on mount
  useEffect(() => {
    const fetchAddresses = async () => {
      setIsLoading(true);
      try {
        const response = await userService.getAddresses();
        if (response.success && response.addresses) {
          setAddresses(response.addresses);

          // Set default address
          const defaultAddressId = getDefaultAddressId(response.addresses);
          if (defaultAddressId) {
            setSelectedAddress(defaultAddressId);
          }
        }
      } catch (error) {
        console.error("Error fetching addresses:", error);
        toast.error("Failed to load addresses. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchAddresses();
  }, []);

  // Redirect to bag if it's empty
  useEffect(() => {
    if (!bag || bag.length === 0) {
      navigate("/bag");
      return;
    }
  }, [bag, navigate]);

  // Handle Stripe payment success or cancel from URL params
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const success = urlParams.get("success") === "true";
    const canceled = urlParams.get("canceled") === "true";
    const sessionId = urlParams.get("session_id");

    if (success && sessionId && !stripeHandledRef.current) {
      stripeHandledRef.current = true;

      const completeOrder = async () => {
        try {
          await paymentService.completeStripeOrder(sessionId);
          toast.success("Order has been placed.");
          navigate("/orders");
        } catch (error) {
          console.error("Error completing Stripe order:", error);
          toast.error(
            "Payment was successful but there was an issue creating your order. Please contact support."
          );
        }
      };
      completeOrder();
    }

    if (canceled) {
      toast.info("Payment was canceled.");
    }
  }, [navigate]);

  // Address modal handlers
  const openAddressModal = () => setIsAddressModalOpen(true);
  const closeAddressModal = () => setIsAddressModalOpen(false);

  // Save new address
  const saveNewAddress = async (newAddress) => {
    try {
      const response = await userService.addAddress(newAddress);
      if (response.success && response.addresses) {
        setAddresses(response.addresses);

        // Select the newly added address
        const newlyAddedAddress =
          response.addresses[response.addresses.length - 1];
        if (newlyAddedAddress) {
          setSelectedAddress(newlyAddedAddress._id);
        }

        toast.success("Address added successfully");
      }
    } catch (error) {
      console.error("Error adding address:", error);
      toast.error("Failed to add address. Please try again.");
    }
  };

  // Show loader while fetching data
  if (isLoading) {
    return (
      <div className="loading-container">
        <Loader />
      </div>
    );
  }

  return (
    <div className="checkout-container">
      <div className="checkout-grid">
        <div className="left-column">
          <AddressSection
            addresses={addresses}
            selectedAddress={selectedAddress}
            setSelectedAddress={setSelectedAddress}
            openAddressModal={openAddressModal}
            isLoading={isLoading}
          />
        </div>

        <div className="right-column">
          <PaymentSummary
            subtotal={subtotal}
            shipping={shipping}
            tax={tax}
            discount={discount}
            total={total}
          />

          <CheckoutActions
            selectedPayment={selectedPayment}
            setSelectedPayment={setSelectedPayment}
            isProcessingOrder={isProcessingOrder}
            handlePlaceOrder={handlePlaceOrder}
          />
        </div>
      </div>

      <AddressModal
        isOpen={isAddressModalOpen}
        onClose={closeAddressModal}
        onSave={saveNewAddress}
      />
    </div>
  );
};

export default Checkout;
