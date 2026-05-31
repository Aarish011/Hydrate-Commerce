import React from 'react';
import { assets } from '../assets/assets';

const Hero = () => {
  return (
    <div className='flex flex-col sm:flex-row items-center justify-between px-10 py-20'>
      {/* Left Content */}
      <div className='flex flex-col gap-5'>
        <h1 className='text-4xl sm:text-6xl font-bold prata-regular'>
          Discover Best Products
        </h1>

        <p className='text-gray-600 max-w-md'>
          Build your dream shopping experience with our modern e-commerce
          platform.
        </p>

        <button className='bg-black text-white px-6 py-3 w-fit rounded-md'>
          Shop Now
        </button>
      </div>

      {/* Right Content */}
      <div className='mt-10 sm:mt-0'>
        <div className='w-72 h-72 sm:w-96 sm:h-96 bg-gray-200 rounded-xl flex items-center justify-center'>
          <img
            src={assets.hero_img}
            alt='hero'
            className='w-full h-full object-cover rounded-xl'
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;
