import orderModel from '../model/orderModel.js';
import userModel from '../model/userModel.js';
import razorpayInstance from '../config/razorpay.js';
import Razorpay from 'razorpay';

import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

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

    const { items, address, amount } = req.body;

    const orderData = {
      userId,
      items,
      address,
      amount,
      paymentMethod: 'Razorpay',
      payment: false,
      status: 'Pending Payment',
    };

    const newOrder = new orderModel(orderData);

    await newOrder.save();

    const options = {
      amount: amount * 100, // paise
      currency: 'INR',
      receipt: newOrder._id.toString(),
    };

    const razorpayOrder = await razorpayInstance.orders.create(options);

    res.json({
      success: true,
      order: razorpayOrder,
      orderId: newOrder._id,
      key: process.env.RAZORPAY_KEY_ID,
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

    const { items, address, amount } = req.body;

    const orderData = {
      userId,
      items,
      address,
      amount,
      paymentMethod: 'Stripe',
      payment: false,
      status: 'Pending Payment',
    };

    const newOrder = new orderModel(orderData);

    await newOrder.save();

    const line_items = items.map((item) => ({
      price_data: {
        currency: 'inr',

        product_data: {
          name: item.name,
        },

        unit_amount: item.price * 100,
      },

      quantity: item.quantity,
    }));

    const session = await stripe.checkout.sessions.create({
      line_items,
      mode: 'payment',
      success_url: `${process.env.FRONTEND_URL}/verify?success=true&orderId=${newOrder._id}`,

      cancel_url: `${process.env.FRONTEND_URL}/verify?success=false&orderId=${newOrder._id}`,
      mode: 'payment',
      line_items,
    });

    res.json({
      success: true,
      session_url: session.url,
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

const verifyStripe = async (req, res) => {
  try {
    const { orderId, success } = req.body;

    if (success === 'true') {
      await orderModel.findByIdAndUpdate(orderId, {
        payment: true,
      });

      res.json({
        success: true,
        message: 'Payment Verified',
      });
    } else {
      await orderModel.findByIdAndDelete(orderId);

      res.json({
        success: false,
        message: 'Payment Failed',
      });
    }
  } catch (error) {
    console.log(error);

    res.json({
      success: false,
      message: error.message,
    });
  }
};

const verifyRazorpay = async (req, res) => {
  try {
    const { orderId } = req.body;

    await orderModel.findByIdAndUpdate(orderId, {
      payment: true,
      status: 'Order Placed',
    });

    res.json({
      success: true,
      message: 'Payment Verified',
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
  verifyStripe,
  verifyRazorpay,
  placeOrderStrip,
  placeOrderrazorpay,
  placeOrderCOD,
  userOrders,
  allOrders,
  updateStatus,
  trackOrder,
};
