import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import ConnectDB from './config/DB.connect.js';
import ConnectCloudinary from './config/cloudinary.js';
import adminRouter from './routes/adminRoutes.js';
import userRouter from './routes/userRoutes.js';
import productRouter from './routes/productRoutes.js';
import cartRoutes from './routes/cartRoutes.js';
import orderRouter from './routes/orderRoutes.js';

// app config
ConnectDB();
ConnectCloudinary();

const app = express();

// middleware
app.use(express.json());
app.use(
  cors({
    origin: [
      'http://localhost:5173',
      'http://localhost:5174',
      'https://hydrate-commerce.vercel.app',
      'https://hydrate-commerce-e667.vercel.app',
    ],
    credentials: true,
  })
);
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(cookieParser());

// route
app.use('/api/user', userRouter);
app.use('/api/admin', adminRouter);
app.use('/api/product', productRouter);
app.use('/api/cart', cartRoutes);
app.use('/api/order', orderRouter);

export default app;
