import React, { useState, useEffect, useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from './Title';
import ProductItem from './ProductItem';

const BestSeller = () => {
  const [bestSeller, setBestSeller] = useState([]);
  const { products } = useContext(ShopContext);

  useEffect(() => {
    const bestProducts = products.filter((item) => item.bestseller === true);

    setBestSeller(bestProducts.slice(0, 5));
  }, [products]);

  return (
    <>
      <Title text1='Best' text2='Seller' />
      <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600 mt-2 text-center'>
        Explore our Best Seller featuring trendy styles, premium quality, and
        the trending fashion collections.
      </p>
      {/* rendering best sellers product */}

      <div className='px-4 sm:px-8 md:px-12'>
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
          {bestSeller.map((item, index) => (
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
    </>
  );
};

export default BestSeller;
