import User from "../models/user.model.js";

export const updateWishlist = async (req, res, next) => {
  try {
    const { productId, action } = req.body;
    const userId = req.user._id;

    const user = await User.findById(userId);

    if (action === "add") {
      if (!user.wishlist.includes(productId)) {
        user.wishlist.push(productId);
      }
    } else if (action === "remove") {
      user.wishlist = user.wishlist.filter((id) => id.toString() !== productId);
    }

    await user.save();

    // Populate wishlist with product details
    const populatedUser = await User.findById(userId).populate("wishlist");

    res.json({
      success: true,
      wishlist: populatedUser.wishlist,
    });
  } catch (error) {
    next(error);
  }
};

export const updateBag = async (req, res, next) => {
  try {
    const { productId, quantity, size, action } = req.body;
    const userId = req.user._id;

    const user = await User.findById(userId);

    if (action === "add") {
      const existingItem = user.bag.find(
        (item) => item.productId.toString() === productId && item.size === size
      );

      if (existingItem) {
        existingItem.quantity = quantity;
      } else {
        user.bag.push({ productId, quantity, size });
      }
    } else if (action === "remove") {
      user.bag = user.bag.filter(
        (item) =>
          !(item.productId.toString() === productId && item.size === size)
      );
    }

    await user.save();

    // Populate bag with product details
    const populatedUser = await User.findById(userId).populate("bag.productId");

    res.json({
      success: true,
      bag: populatedUser.bag,
    });
  } catch (error) {
    next(error);
  }
};

export const getUserData = async (req, res, next) => {
  try {
    const userId = req.user._id;

    const populatedUser = await User.findById(userId)
      .populate("wishlist")
      .populate("bag.productId");

    res.json({
      success: true,
      wishlist: populatedUser.wishlist,
      bag: populatedUser.bag,
      addresses: populatedUser.addresses || [],
    });
  } catch (error) {
    next(error);
  }
};

// Address management
export const addAddress = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const addressData = req.body;

    const user = await User.findById(userId);
    
    // If this is the first address or isDefault is true, set it as default
    if (user.addresses.length === 0 || addressData.isDefault) {
      // Set all existing addresses to non-default
      user.addresses.forEach(address => {
        address.isDefault = false;
      });
      addressData.isDefault = true;
    }
    
    user.addresses.push(addressData);
    await user.save();

    res.status(201).json({
      success: true,
      addresses: user.addresses,
    });
  } catch (error) {
    next(error);
  }
};

export const updateAddress = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const { addressId } = req.params;
    const updatedData = req.body;
    
    const user = await User.findById(userId);
    
    const addressIndex = user.addresses.findIndex(
      addr => addr._id.toString() === addressId
    );
    
    if (addressIndex === -1) {
      return res.status(404).json({
        success: false,
        message: "Address not found",
      });
    }
    
    // If setting this address as default
    if (updatedData.isDefault) {
      // Set all addresses to non-default first
      user.addresses.forEach(address => {
        address.isDefault = false;
      });
    }
    
    // Update the address with new data
    Object.assign(user.addresses[addressIndex], updatedData);
    
    await user.save();
    
    res.json({
      success: true,
      addresses: user.addresses,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteAddress = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const { addressId } = req.params;
    
    const user = await User.findById(userId);
    
    const addressIndex = user.addresses.findIndex(
      addr => addr._id.toString() === addressId
    );
    
    if (addressIndex === -1) {
      return res.status(404).json({
        success: false,
        message: "Address not found",
      });
    }
    
    const wasDefault = user.addresses[addressIndex].isDefault;
    
    // Remove the address
    user.addresses.splice(addressIndex, 1);
    
    // If the removed address was the default and there are other addresses,
    // set the first one as default
    if (wasDefault && user.addresses.length > 0) {
      user.addresses[0].isDefault = true;
    }
    
    await user.save();
    
    res.json({
      success: true,
      addresses: user.addresses,
    });
  } catch (error) {
    next(error);
  }
};

export const getAddresses = async (req, res, next) => {
  try {
    const userId = req.user._id;
    
    const user = await User.findById(userId);
    
    res.json({
      success: true,
      addresses: user.addresses || [],
    });
  } catch (error) {
    next(error);
  }
};