import orderModel from '../model/orderModel.js';
import userModel from '../model/userModel.js';

// =======================
// PLACE ORDER
// =======================
const placeOrderCOD = async (req, res) => {
  try {
    const userId = req.user.id;

    const { items, address, amount, paymentMethod } = req.body;

    const orderData = {
      userId,
      items,
      address,
      amount,
      paymentMethod,
      payment: false,
      status: 'Order Placed',
    };

    const newOrder = new orderModel(orderData);

    await newOrder.save();

    // Clear cart AND update user address after successful order
    await userModel.findByIdAndUpdate(userId, {
      $set: {
        cartData: {},
      },
      // Save the shipping address to user profile
      address: {
        firstName: address.firstName,
        lastName: address.lastName,
        email: address.email,
        street: address.street,
        city: address.city,
        state: address.state,
        zipcode: address.zipcode,
        country: address.country,
        phone: address.phone,
      },
      phone: address.phone,
    });

    res.json({
      success: true,
      message: 'Order Placed Successfully',
      orderId: newOrder._id,
    });
  } catch (error) {
    console.log(error);

    res.json({
      success: false,
      message: error.message,
    });
  }
};

//place order by razorpay
const placeOrderrazorpay = async (req, res) => {
  try {
    const userId = req.user.id;

    const { items, address, amount, paymentMethod } = req.body;

    const orderData = {
      userId,
      items,
      address,
      amount,
      paymentMethod,
      payment: false,
      status: 'Order Placed',
    };

    const newOrder = new orderModel(orderData);

    await newOrder.save();

    // Clear cart AND update user address after successful order
    await userModel.findByIdAndUpdate(userId, {
      $set: {
        cartData: {},
      },
      // Save the shipping address to user profile
      address: {
        firstName: address.firstName,
        lastName: address.lastName,
        email: address.email,
        street: address.street,
        city: address.city,
        state: address.state,
        zipcode: address.zipcode,
        country: address.country,
        phone: address.phone,
      },
      phone: address.phone,
    });

    res.json({
      success: true,
      message: 'Order Placed Successfully',
      orderId: newOrder._id,
    });
  } catch (error) {
    console.log(error);

    res.json({
      success: false,
      message: error.message,
    });
  }
};

//placeorder by stripe
const placeOrderStrip = async (req, res) => {
  try {
    const userId = req.user.id;

    const { items, address, amount, paymentMethod } = req.body;

    const orderData = {
      userId,
      items,
      address,
      amount,
      paymentMethod,
      payment: false,
      status: 'Order Placed',
      Date: Date.now(),
    };

    const newOrder = new orderModel(orderData);

    await newOrder.save();

    // Clear cart AND update user address after successful order
    await userModel.findByIdAndUpdate(userId, {
      $set: {
        cartData: {},
      },
      // Save the shipping address to user profile
      address: {
        firstName: address.firstName,
        lastName: address.lastName,
        email: address.email,
        street: address.street,
        city: address.city,
        state: address.state,
        zipcode: address.zipcode,
        country: address.country,
        phone: address.phone,
      },
      phone: address.phone,
    });

    res.json({
      success: true,
      message: 'Order Placed Successfully',
      orderId: newOrder._id,
    });
  } catch (error) {
    console.log(error);

    res.json({
      success: false,
      message: error.message,
    });
  }
};

// =======================
// USER ORDERS
// =======================
const userOrders = async (req, res) => {
  try {
    const userId = req.user.id;

    const orders = await orderModel.find({ userId }).sort({ createdAt: -1 });

    res.json({
      success: true,
      orders,
    });
  } catch (error) {
    console.log(error);

    res.json({
      success: false,
      message: error.message,
    });
  }
};

// =======================
// ALL ORDERS (ADMIN)
// =======================
const allOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({});

    res.json({
      success: true,
      orders,
    });
  } catch (error) {
    console.log(error);

    res.json({
      success: false,
      message: error.message,
    });
  }
};

// =======================
// UPDATE ORDER STATUS
// =======================
const updateStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;

    await orderModel.findByIdAndUpdate(orderId, {
      status,
    });

    res.json({
      success: true,
      message: 'Order Status Updated',
    });
  } catch (error) {
    console.log(error);

    res.json({
      success: false,
      message: error.message,
    });
  }
};

// GET /api/order/:orderId
const trackOrder = async (req, res) => {
  try {
    const { orderId } = req.params;

    const order = await orderModel.findById(orderId);

    if (!order) {
      return res.json({
        success: false,
        message: 'Order not found',
      });
    }

    res.json({
      success: true,
      order,
    });
  } catch (error) {
    console.log(error);

    res.json({
      success: false,
      message: error.message,
    });
  }
};

export {
  placeOrderStrip,
  placeOrderrazorpay,
  placeOrderCOD,
  userOrders,
  allOrders,
  updateStatus,
  trackOrder,
};
