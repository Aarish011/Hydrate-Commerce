import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import { Link } from 'react-router-dom';

const ProductItem = ({ id, image, name, price }) => {
  const { currency } = useContext(ShopContext);

  return (
    <Link to={`/product/${id}`} className='text-gray-700 cursor-pointer block'>
      <div className='border rounded-lg overflow-hidden bg-white'>
        <div className='h-72 flex items-center justify-center p-3'>
          <img
            src={Array.isArray(image) ? image[0] : image}
            alt={name}
            className='w-full h-full object-cover hover:scale-105 transition duration-300'
          />
        </div>

        <div className='p-3'>
          <p className='text-sm'>{name}</p>

          <p className='text-sm font-medium mt-1'>
            {currency}
            {price}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default ProductItem;
