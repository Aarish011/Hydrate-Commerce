import express from 'express';
import {
  addToCart,
  getUserCart,
  updateCart,
} from '../controller/cartController.js';
import userAuth from '../middlewares/userAuth.js';

const cartRouter = express.Router();

cartRouter.post('/getdata', userAuth, getUserCart);
cartRouter.post('/add', userAuth, addToCart);
cartRouter.post('/update', userAuth, updateCart);

export default cartRouter;
