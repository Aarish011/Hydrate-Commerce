import express from 'express';
import upload from '../middlewares/multer.js';
import {
  addProduct,
  listProducts,
  singleProduct,
  removeProduct,
  updateProduct,
} from '../controller/productController.js';
import cloudinary from '../config/cloudinary.js';
import multer from 'multer';
import adminAuth from '../middlewares/adminAuth.js';

const productRouter = express.Router();

/* ---------------- PRODUCT ROUTES ---------------- */

// ADD PRODUCT (with images)
productRouter.post(
  '/add',
  adminAuth,
  upload.fields([
    { name: 'image1', maxCount: 1 },
    { name: 'image2', maxCount: 1 },
    { name: 'image3', maxCount: 1 },
    { name: 'image4', maxCount: 1 },
  ]),
  addProduct
);

// GET ALL PRODUCTS
productRouter.get('/list', listProducts);

// GET SINGLE PRODUCT
productRouter.get('/:id', singleProduct);

// DELETE PRODUCT
productRouter.delete('/delete/:id', adminAuth, removeProduct);

// UPDATE PRODUCT
productRouter.put('/update/:id', adminAuth, updateProduct);

export default productRouter;
