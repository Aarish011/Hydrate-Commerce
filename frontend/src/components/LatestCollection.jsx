import React, { useContext } from 'react';
import Title from './Title';
import { ShopContext } from '../context/ShopContext';
import ProductItem from './ProductItem';

const LatestCollection = () => {
  const { products } = useContext(ShopContext);

  const latestProduct = products.slice(0, 5);

  return (
    <div className='my-10'>
      <Title text1='LATEST' text2='COLLECTIONS' />

      <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600 mt-2 text-center'>
        Explore our newest arrivals featuring trendy styles, premium quality,
        and the latest fashion collections.
      </p>

      {/* Products */}
      <div className='px-4 sm:px-8 md:px-12'>
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
          {latestProduct.map((item, index) => (
            <ProductItem
              key={index}
              id={item._id}
              image={item.image}
              name={item.name}
              price={item.price}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default LatestCollection;
