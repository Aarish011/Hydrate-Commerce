import 'dotenv/config';
import path from 'path';
import { fileURLToPath } from 'url';

import ConnectDB from '../config/DB.connect.js';
import ConnectCloudinary, { cloudinary } from '../config/cloudinary.js';
import productModel from '../model/productModel.js';
import { products } from '../data/products.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

await ConnectDB();
ConnectCloudinary();

const seedProducts = async () => {
  try {
    console.log('🚀 Starting Product Import...');

    // Remove existing products
    await productModel.deleteMany({});
    console.log('🗑️ Existing products removed');

    let count = 1;

    for (const product of products) {
      console.log(
        `📦 [${count}/${products.length}] Uploading: ${product.name}`
      );

      const imageUrls = [];

      // Upload all product images to Cloudinary
      for (const imageName of product.image) {
        const imagePath = path.join(
          __dirname,
          '../../frontend/src/assets',
          imageName
        );

        const result = await cloudinary.uploader.upload(imagePath, {
          folder: 'products',
        });

        imageUrls.push(result.secure_url);
      }

      // Remove fake _id from assets data
      const { _id, ...productData } = product;

      // Save product in MongoDB
      await productModel.create({
        ...productData,
        image: imageUrls,
      });

      console.log(`✅ Added: ${product.name}`);

      count++;
    }

    console.log('🎉 All Products Imported Successfully');
    process.exit(0);
  } catch (error) {
    console.error('❌ Import Failed');
    console.error(error);
    process.exit(1);
  }
};

seedProducts();
