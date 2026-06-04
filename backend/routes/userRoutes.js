import express from 'express';
import {
  registerUser,
  loginUser,
  userLogout,
} from '../controller/userController.js';

const userRouter = express.Router();

userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser);
userRouter.post('/logout', userLogout);

export default userRouter;
