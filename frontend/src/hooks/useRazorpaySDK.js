import { useState, useEffect, useCallback } from "react";
import { loadExternalScript } from "../utils/checkoutHelpers";

const RAZORPAY_SDK_URL = "https://checkout.razorpay.com/v1/checkout.js";

const useRazorpaySDK = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Check if SDK is already loaded
  const checkIfLoaded = useCallback(() => {
    return typeof window !== "undefined" && !!window.Razorpay;
  }, []);

  // Load SDK function
  const loadSDK = useCallback(async () => {
    if (checkIfLoaded()) {
      setIsLoaded(true);
      return true;
    }

    if (isLoading) return false;

    setIsLoading(true);
    setError(null);

    try {
      await loadExternalScript(RAZORPAY_SDK_URL);

      if (checkIfLoaded()) {
        setIsLoaded(true);
        return true;
      } else {
        throw new Error("Razorpay SDK failed to initialize");
      }
    } catch (err) {
      setError(err.message);
      setIsLoaded(false);
      return false;
    } finally {
      setIsLoading(false);
    }
  }, [checkIfLoaded, isLoading]);

  // Auto-load SDK on mount
  useEffect(() => {
    if (!isLoaded && !isLoading) {
      loadSDK();
    }
  }, [loadSDK, isLoaded, isLoading]);

  // Initial check for already loaded SDK
  useEffect(() => {
    if (checkIfLoaded()) {
      setIsLoaded(true);
    }
  }, [checkIfLoaded]);

  return {
    isLoaded,
    isLoading,
    error,
    loadSDK,
    reload: loadSDK, // Alias for manual reload
  };
};

export default useRazorpaySDK;
