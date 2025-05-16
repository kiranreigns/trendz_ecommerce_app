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
    });
  } catch (error) {
    next(error);
  }
};
