import React, { useState, useEffect } from "react";
import ShopContext from "../context/ShopContext.jsx";
import { useAuth } from "../hooks/useAuth.js";
import { productService, userService } from "../services/api.js";

const ShopContextProvider = ({ children }) => {
  const { isAuthenticated, user } = useAuth();
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [wishlist, setWishlist] = useState(() => {
    const savedWishlist = localStorage.getItem("wishlist");
    return savedWishlist ? JSON.parse(savedWishlist) : [];
  });
  const [bag, setBag] = useState(() => {
    const savedBag = localStorage.getItem("bag");
    return savedBag ? JSON.parse(savedBag) : [];
  });

  // Fetch user data when authenticated
  useEffect(() => {
    const fetchUserData = async () => {
      if (isAuthenticated && user) {
        try {
          // Get the user's data from the database
          const userData = await userService.getUserData();

          if (userData.success) {
            // Update local state with data from the server
            setWishlist(userData.wishlist || []);

            // Transform bag data to match frontend structure
            const transformedBag = userData.bag.map((item) => ({
              _id: item.productId._id,
              name: item.productId.name,
              image: item.productId.image,
              newPrice: item.productId.newPrice,
              oldPrice: item.productId.oldPrice,
              quantity: item.quantity,
              size: item.size,
            }));

            setBag(transformedBag);
          }
        } catch (err) {
          console.error("Error fetching user data:", err);
          // Use local data as fallback
          const localWishlist = localStorage.getItem("wishlist");
          const localBag = localStorage.getItem("bag");

          if (localWishlist) setWishlist(JSON.parse(localWishlist));
          if (localBag) setBag(JSON.parse(localBag));
        }
      }
    };

    fetchUserData();

    // Clear local state when user logs out
    if (!isAuthenticated) {
      setWishlist([]);
      setBag([]);
    }
  }, [isAuthenticated, user]);

  // Fetch products from API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        const data = await productService.getAll();
        if (Array.isArray(data)) {
          setProducts(data);
        } else {
          console.warn("Products data is not an array:", data);
          setProducts([]);
        }
      } catch (err) {
        console.error("Error fetching products:", err);
        setError(err.message || "Failed to fetch products");
        setProducts([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Save wishlist and bag to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem("bag", JSON.stringify(bag));
  }, [bag]);

  const addToWishlist = async (product) => {
    if (!product || !product._id) {
      console.error("Invalid product data:", product);
      return;
    }

    if (!wishlist.find((item) => item._id === product._id)) {
      // Update local state immediately for better UX
      setWishlist((prev) => [...prev, product]);

      if (isAuthenticated) {
        try {
          const response = await userService.updateWishlist(product._id, "add");
          if (!response.success) {
            console.warn(
              "Server couldn't update wishlist, but local state was updated"
            );
          }
        } catch (error) {
          console.error("Error updating wishlist:", error);
          // Continue with local update even if server update fails
        }
      }
    }
  };

  const addToBag = async (product, quantity = 1, size) => {
    if (!product || !product._id) {
      console.error("Invalid product data:", product);
      return;
    }

    // First check if the item already exists in the bag
    const existingItem = bag.find(
      (item) => item._id === product._id && item.size === size
    );

    // Prepare the new bag state
    const newBag = existingItem
      ? bag.map((item) =>
          item._id === product._id && item.size === size
            ? { ...item, quantity: (item.quantity || 1) + quantity }
            : item
        )
      : [...bag, { ...product, quantity, size }];

    // Update local state
    setBag(newBag);

    // Update server in the background if authenticated
    if (isAuthenticated) {
      try {
        await userService.updateBag(
          product._id,
          existingItem ? existingItem.quantity + quantity : quantity,
          size,
          "add"
        );
      } catch (error) {
        console.error("Error updating bag:", error);
      }
    }
  };

  const removeFromBag = async (productId, size) => {
    setBag((prevBag) =>
      prevBag.filter((item) => !(item._id === productId && item.size === size))
    );

    if (isAuthenticated) {
      try {
        await userService.updateBag(productId, 0, size, "remove");
      } catch (error) {
        console.error("Error removing from bag:", error);
      }
    }
  };

  const removeFromWishlist = async (productId) => {
    setWishlist((prevWishlist) =>
      prevWishlist.filter((item) => item._id !== productId)
    );

    if (isAuthenticated) {
      try {
        await userService.updateWishlist(productId, "remove");
      } catch (error) {
        console.error("Error removing from wishlist:", error);
      }
    }
  };

  const updateBagQuantity = async (productId, size, newQuantity) => {
    if (newQuantity <= 0) {
      return removeFromBag(productId, size);
    }

    setBag((prevBag) =>
      prevBag.map((item) =>
        item._id === productId && item.size === size
          ? { ...item, quantity: newQuantity }
          : item
      )
    );

    if (isAuthenticated) {
      try {
        await userService.updateBag(productId, newQuantity, size, "add");
      } catch (error) {
        console.error("Error updating bag quantity:", error);
      }
    }
  };

  const moveToWishlist = async (product, size) => {
    if (!wishlist.find((item) => item._id === product._id)) {
      await addToWishlist(product);
    }

    await removeFromBag(product._id, size);
  };

  const value = {
    products,
    isLoading,
    error,
    bag,
    wishlist,
    addToWishlist,
    addToBag,
    removeFromBag,
    removeFromWishlist,
    updateBagQuantity,
    moveToWishlist,
  };

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
};

export default ShopContextProvider;
