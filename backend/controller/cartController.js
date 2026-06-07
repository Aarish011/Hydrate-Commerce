import userModel from '../model/userModel.js';

//add to cart
const addToCart = async (req, res) => {
  try {
    const userId = req.user.id;
    if (!userId) {
      return res.json({
        success: false,
        message: 'User ID missing from token',
      });
    }
    const { itemId, size } = req.body;

    const userData = await userModel.findById(userId);

    // 🔥 FIX: ensure cartData always exists
    let cartData = userData.cartData || {};

    if (!cartData[itemId]) {
      cartData[itemId] = {};
    }

    if (cartData[itemId][size]) {
      cartData[itemId][size] += 1;
    } else {
      cartData[itemId][size] = 1;
    }

    await userModel.findByIdAndUpdate(userId, { cartData });

    res.json({
      success: true,
      message: 'Added To Cart',
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const updateCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const { itemId, size, quantity } = req.body;

    const userData = await userModel.findById(userId);

    // 🔥 FIX
    let cartData = userData.cartData || {};

    if (!cartData[itemId]) {
      cartData[itemId] = {};
    }

    cartData[itemId][size] = quantity;

    await userModel.findByIdAndUpdate(userId, { cartData });

    res.json({
      success: true,
      message: 'Cart Updated',
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// get user cart
const getUserCart = async (req, res) => {
  try {
    const userId = req.user.id;

    const userData = await userModel.findById(userId);

    let cartData = userData.cartData || {};

    res.json({
      success: true,
      cartData,
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};
const removeFromCart = async (req, res) => {
  try {
    const userId = req.user.id;

    const { itemId, size } = req.body;

    const userData = await userModel.findById(userId);

    let cartData = userData.cartData || {};

    if (cartData[itemId] && cartData[itemId][size]) {
      delete cartData[itemId][size];

      // remove product completely if no sizes remain
      if (Object.keys(cartData[itemId]).length === 0) {
        delete cartData[itemId];
      }
    }

    await userModel.findByIdAndUpdate(userId, { $set: { cartData } });

    res.json({
      success: true,
      message: 'Item Removed',
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

export { addToCart, getUserCart, updateCart, removeFromCart };
