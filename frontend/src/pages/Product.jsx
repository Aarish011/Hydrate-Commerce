import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import RelatedProducts from '../components/RelatedProducts';

const Product = () => {
  const { productId } = useParams();
  const { products, currency, addToCart } = useContext(ShopContext);

  const [size, setSize] = useState('');
  const [productData, setProductData] = useState(null);
  const [image, setImage] = useState('');

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, [productId]);

  useEffect(() => {
    const product = products.find((item) => item._id === productId);

    if (product) {
      setProductData(product);
      setImage(product.image[0]);
    }
  }, [productId, products]);

  if (!productData) {
    return <div className='p-5'>Loading...</div>;
  }

  return (
    <div className='border-t-2 pt-10 px-5 sm:px-10'>
      <div className='flex flex-col sm:flex-row gap-10'>
        {/* Left Side Thumbnails */}
        <div className='flex sm:flex-col gap-3'>
          {productData.image.map((item, index) => (
            <img
              key={index}
              src={item}
              alt=''
              onMouseEnter={() => setImage(item)}
              className='w-20 h-20 object-cover border cursor-pointer'
            />
          ))}
        </div>

        {/* Main Image */}
        <div className='flex-1'>
          <img
            src={image}
            alt={productData.name}
            className='w-full max-w-[500px]'
          />
        </div>

        {/* Product Details */}
        <div className='flex-1'>
          <h1 className='text-3xl font-medium'>{productData.name}</h1>
          <div className='flex items-center gap-1 mt-2'>
            <img src={assets.star_icon} alt='' className='w-4' />
            <img src={assets.star_icon} alt='' className='w-4' />
            <img src={assets.star_icon} alt='' className='w-4' />
            <img src={assets.star_icon} alt='' className='w-4' />
            <img src={assets.star_icon} alt='' className='w-4' />
            <p className='pl-2'>(122)</p>
          </div>

          <p className='mt-4 text-2xl font-semibold'>
            {currency}
            {productData.price}
          </p>

          {productData.description && (
            <p className='mt-5 text-gray-600'>{productData.description}</p>
          )}

          {/* select size  */}
          <div className='flex flex-col gap-4 my-8'>
            <p>Select Size</p>

            <div className='flex gap-2'>
              {productData.sizes.map((item, index) => (
                <button
                  key={index}
                  onClick={() => setSize(item)}
                  className={`border py-2 px-4 bg-gray-100 ${
                    item === size ? 'border-orange-500' : ''
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <div className='mt-6'>
            <button
              onClick={() => addToCart(productData._id, size)}
              className='bg-black text-white px-8 py-3 cursor-pointer'
            >
              ADD TO CART
            </button>
          </div>
          <hr className='mt-8 sm:w-4/5 border-gray-300' />
          <div className='mt-10  text-gray-600 pt-3'>
            <p>100% origional product.</p>
            <p>Cash on delivery is available.</p>
            <p>Easy return and Exchange policy within 7 days.</p>
          </div>
        </div>
      </div>
      {/* Description & Reviews Section */}
      <div className='mt-20'>
        <div className='flex'>
          <b className='border px-5 py-3 text-sm'>Description</b>
          <p className='border px-5 py-3 text-sm'>Reviews (122)</p>
        </div>

        <div className='flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500'>
          <p>{productData.description}</p>
        </div>
      </div>
      <RelatedProducts
        category={productData.category}
        subCategory={productData.subCategory}
      />
    </div>
  );
};

export default Product;
