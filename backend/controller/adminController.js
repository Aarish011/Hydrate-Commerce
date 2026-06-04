import express from 'express';
import jwt from 'jsonwebtoken';

// Admin Login
const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {
      const token = jwt.sign(
        { email: process.env.ADMIN_EMAIL },
        process.env.JWT_SECRET,
        { expiresIn: '7d' }
      );

      return res.json({
        success: true,
        token,
        message: 'Admin Login Successful',
      });
    }

    res.json({
      success: false,
      message: 'Invalid Credentials',
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

// Admin Logout
const adminLogout = async (req, res) => {
  try {
    res.json({
      success: true,
      message: 'Admin Logout Successful',
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

// Dashboard Stats
const dashboardStats = async (req, res) => {
  try {
    const stats = {
      totalProducts: 120,
      totalOrders: 56,
      totalUsers: 240,
      totalRevenue: 15000,
    };

    res.json({
      success: true,
      stats,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

export { adminLogin, adminLogout, dashboardStats };
