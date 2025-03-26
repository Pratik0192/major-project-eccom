import userModel from "../models/userModel.js";

export const addWishlist = async(req, res) => {
  try {
    const { userId } = req.body;
    const { itemId } = req.body;

    if (!userId || !itemId) {
      return res.json({ success: false, message: "Missing userId or itemId" });
    }

    const userData = await userModel.findById(userId);
    if (!userData) {
      return res.json({ success: false, message: "User not found" });
    }

    let wishlistData = userData.wishlistData || {}; // Ensure wishlistData exists

    if (!wishlistData[itemId]) {
      wishlistData[itemId] = true;
      await userModel.findByIdAndUpdate(userId, { wishlistData });
    }

    res.json({ success: true, message: "Item added to wishlist", wishlistData });

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
}

export const removeWishlist = async(req, res) => {
  try {
    const { userId, itemId } = req.body;

    if (!userId || !itemId) {
      return res.json({ success: false, message: "Missing userId or itemId" });
    }

    const userData = await userModel.findById(userId);
    if(!userData) {
      return res.json({ success: false, message: "User not found" });
    }

    if (userData.wishlistData && userData.wishlistData[itemId]) {
      delete userData.wishlistData[itemId];
      await userData.save();
    }

    res.json({ success: true, message: "Item removed from wishlist", wishlistData: userData.wishlistData });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
}

export const getWishlist = async(req, res) => {
  try {

    const { userId } = req.body
    if (!userId) {
      return res.json({ success: false, message: "Missing userId" });
    }

    const userData = await userModel.findById(userId);
    if (!userData) {
      return res.json({ success: false, message: "User not found" });
    }

    res.json({ success: true, wishlistData: userData.wishlistData || {} });

  } catch (error) {
    console.log(error);
    res.json({ success: true, message: error.message })
  }
}