import express from 'express';
import {
  registerUser,
  loginUser,
  userLogout,
  getUserProfile,
  updateProfile,
} from '../controller/userController.js';
import userAuth from '../middlewares/userAuth.js';

const userRouter = express.Router();

userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser);
userRouter.post('/logout', userAuth, userLogout);
userRouter.get('/profile', userAuth, getUserProfile);
userRouter.put('/update', userAuth, updateProfile);

export default userRouter;
