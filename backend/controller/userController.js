import userModel from '../model/userModel.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import client from '../config/twilio.js';

// Register User
const registerUser = async (req, res) => {
  try {
    const { name, email, password, phone, phoneVerified } = req.body;

    // Check if user already exists
    const exists = await userModel.findOne({ email });

    if (exists) {
      return res.status(400).json({
        success: false,
        message: 'User already exists',
      });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user with phoneVerified set to true (since OTP was verified)
    const user = await userModel.create({
      name,
      email,
      password: hashedPassword,
      phone,
      phoneVerified: phoneVerified || false,
    });

    // Generate JWT
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '7d',
    });

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      token,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Login User
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check user exists
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: 'Invalid email or password',
      });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: 'Invalid email or password',
      });
    }

    // Generate token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '7d',
    });

    res.status(200).json({
      success: true,
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Logout User
const userLogout = async (req, res) => {
  try {
    res.status(200).json({
      success: true,
      message: 'Logout successful',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getUserProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await userModel.findById(userId).select('-password');

    if (!user) {
      return res.json({
        success: false,
        message: 'User not found',
      });
    }

    res.json({
      success: true,
      user,
    });
  } catch (error) {
    console.log(error);

    res.json({
      success: false,
      message: error.message,
    });
  }
};

// PUT /api/user/update
const updateProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const { name, email, phone, address } = req.body;

    const updatedUser = await userModel
      .findByIdAndUpdate(
        userId,
        {
          name,
          email,
          phone,
          address,
        },
        { new: true }
      )
      .select('-password');

    res.json({
      success: true,
      user: updatedUser,
      message: 'Profile updated successfully',
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

const sendOTP = async (req, res) => {
  try {
    const { phone } = req.body;

    // Add country code for E.164 format (India: +91)
    const formattedPhone = phone.startsWith('+') ? phone : `+91${phone}`;

    await client.verify.v2
      .services(process.env.TWILIO_VERIFY_SERVICE_SID)
      .verifications.create({
        to: formattedPhone,
        channel: 'sms',
      });

    res.json({
      success: true,
      message: 'OTP sent successfully',
    });
  } catch (error) {
    console.error('Send OTP Error:', error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

const verifyOTP = async (req, res) => {
  try {
    const { phone, otp } = req.body;

    // Add country code for E.164 format (India: +91)
    const formattedPhone = phone.startsWith('+') ? phone : `+91${phone}`;

    const verification = await client.verify.v2
      .services(process.env.TWILIO_VERIFY_SERVICE_SID)
      .verificationChecks.create({
        to: formattedPhone,
        code: otp, // Twilio expects 'code'
      });

    if (verification.status === 'approved') {
      // Update phone verification status using phone number
      // The user will be saved with phoneVerified: true during registration
      // This just marks the phone as verified before registration

      // Store verification status temporarily (optional)
      // You can use Redis or a temp store, but for now we just return success

      return res.json({
        success: true,
        message: 'Phone verified successfully',
        phoneVerified: true,
      });
    }

    res.json({
      success: false,
      message: 'Invalid OTP',
    });
  } catch (error) {
    console.error('Verify OTP Error:', error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

export {
  registerUser,
  loginUser,
  userLogout,
  getUserProfile,
  updateProfile,
  verifyOTP,
  sendOTP,
};
