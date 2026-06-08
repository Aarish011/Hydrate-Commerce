import express from 'express';
import {
  registerUser,
  loginUser,
  userLogout,
  getUserProfile,
  updateProfile,
  sendOTP,
  verifyOTP,
} from '../controller/userController.js';
import userAuth from '../middlewares/userAuth.js';

const userRouter = express.Router();

userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser);
userRouter.post('/logout', userAuth, userLogout);
userRouter.get('/profile', userAuth, getUserProfile);
userRouter.put('/update', userAuth, updateProfile);
userRouter.post('/send-otp', sendOTP);
userRouter.post('/verify-otp', verifyOTP);

export default userRouter;
