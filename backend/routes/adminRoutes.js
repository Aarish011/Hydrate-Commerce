import express from 'express';
import {
  adminLogin,
  adminLogout,
  dashboardStats,
} from '../controller/adminController.js';

const adminRouter = express.Router();

adminRouter.post('/login', adminLogin);
adminRouter.post('/logout', adminLogout);
adminRouter.get('/dashboard', dashboardStats);

export default adminRouter;
