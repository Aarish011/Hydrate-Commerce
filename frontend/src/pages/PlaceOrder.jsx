import React from 'react';
import Title from '../components/Title';
import CartTotal from '../components/CartTotal';
import { assets } from '../assets/assets';

const PlaceOrder = () => {
  return (
    <form className='flex flex-col sm:flex-row justify-between gap-10 pt-10 min-h-[80vh] border-t px-5 sm:px-10'>
      {/* Left Side */}
      <div className='flex flex-col gap-4 w-full sm:max-w-[480px]'>
        <div className='text-xl sm:text-2xl my-3'>
          <Title text1={'DELIVERY'} text2={'INFORMATION'} />
        </div>

        <div className='flex gap-3'>
          <input
            className='border border-gray-300 rounded py-2 px-3 w-full'
            type='text'
            placeholder='First Name'
          />

          <input
            className='border border-gray-300 rounded py-2 px-3 w-full'
            type='text'
            placeholder='Last Name'
          />
        </div>

        <input
          className='border border-gray-300 rounded py-2 px-3'
          type='email'
          placeholder='Email Address'
        />

        <input
          className='border border-gray-300 rounded py-2 px-3'
          type='text'
          placeholder='Street'
        />

        <div className='flex gap-3'>
          <input
            className='border border-gray-300 rounded py-2 px-3 w-full'
            type='text'
            placeholder='City'
          />

          <input
            className='border border-gray-300 rounded py-2 px-3 w-full'
            type='text'
            placeholder='State'
          />
        </div>

        <div className='flex gap-3'>
          <input
            className='border border-gray-300 rounded py-2 px-3 w-full'
            type='number'
            placeholder='Zip Code'
          />

          <input
            className='border border-gray-300 rounded py-2 px-3 w-full'
            type='text'
            placeholder='Country'
          />
        </div>

        <input
          className='border border-gray-300 rounded py-2 px-3'
          type='number'
          placeholder='Phone Number'
        />
      </div>

      {/* Right Side */}
      <div className='mt-8'>
        <div className='min-w-80'>
          <CartTotal />
        </div>

        {/* Payment Method */}
        <div className='mt-12'>
          <Title text1={'PAYMENT'} text2={'METHOD'} />

          <div className='flex flex-col gap-3 mt-4'>
            <div className='flex items-center gap-3 border p-3 cursor-pointer'>
              <input type='radio' name='payment' />
              <img src={assets.stripe_logo} alt='' className='h-5' />
            </div>

            <div className='flex items-center gap-3 border p-3 cursor-pointer'>
              <input type='radio' name='payment' />
              <img src={assets.razorpay_logo} alt='' className='h-5' />
            </div>

            <div className='flex items-center gap-3 border p-3 cursor-pointer'>
              <input type='radio' name='payment' />
              <p className='text-gray-600 font-medium'>CASH ON DELIVERY</p>
            </div>
          </div>

          <div className='w-full text-end mt-8'>
            <button
              type='submit'
              className='bg-black text-white px-12 py-3 text-sm cursor-pointer'
            >
              PLACE ORDER
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
