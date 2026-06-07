import express from 'express';
import userAuth from '../middlewares/userAuth.js';
import adminAauth from '../middlewares/adminAuth.js';

import {
  placeOrderCOD,
  placeOrderrazorpay,
  placeOrderStrip,
  userOrders,
  allOrders,
  updateStatus,
  trackOrder,
} from '../controller/orderController.js';
import { Admin } from 'mongodb';

const orderRouter = express.Router();

orderRouter.get('/userorders', userAuth, userOrders);
orderRouter.get('/list', adminAauth, allOrders);

orderRouter.post('/status', adminAauth, updateStatus);

orderRouter.get('/:orderId', userAuth, trackOrder);

orderRouter.post('/stripe', userAuth, placeOrderStrip);
orderRouter.post('/place', userAuth, placeOrderCOD);
orderRouter.post('/razropay', userAuth, placeOrderrazorpay);

export default orderRouter;
