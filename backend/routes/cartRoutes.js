import express from 'express';
import {
  addToCart,
  getUserCart,
  updateCart,
  removeFromCart,
} from '../controller/cartController.js';
import userAuth from '../middlewares/userAuth.js';

const cartRouter = express.Router();

cartRouter.get('/get', userAuth, getUserCart);
cartRouter.post('/add', userAuth, addToCart);
cartRouter.post('/update', userAuth, updateCart);
cartRouter.post('/remove', userAuth, removeFromCart);

export default cartRouter;
