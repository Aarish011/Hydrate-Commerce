import React from 'react';
import Title from '../components/Title';
import { assets } from '../assets/assets';

const Orders = () => {
  const orders = [
    {
      id: 1,
      name: 'Men Round Neck Pure Cotton T-shirt',
      image: assets.p_img1,
      price: 110,
      quantity: 2,
      size: 'M',
      status: 'Ready to Ship',
      date: '02 Jun 2026',
    },
    {
      id: 2,
      name: 'Women Casual Top',
      image: assets.p_img2,
      price: 95,
      quantity: 1,
      size: 'S',
      status: 'Delivered',
      date: '30 May 2026',
    },
  ];

  return (
    <div className='border-t pt-16 px-5 sm:px-10 min-h-[80vh]'>
      <div className='text-2xl'>
        <Title text1={'MY'} text2={'ORDERS'} />
      </div>

      <div>
        {orders.map((item) => (
          <div
            key={item.id}
            className='py-4 border-t border-b text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4'
          >
            {/* Left */}
            <div className='flex items-start gap-6'>
              <img src={item.image} alt='' className='w-16 sm:w-20' />

              <div>
                <p className='font-medium'>{item.name}</p>

                <div className='flex flex-wrap items-center gap-4 mt-2 text-sm'>
                  <p>${item.price}</p>

                  <p>Qty: {item.quantity}</p>

                  <p>Size: {item.size}</p>
                </div>

                <p className='mt-2 text-sm text-gray-500'>Date: {item.date}</p>
              </div>
            </div>

            {/* Right */}
            <div className='flex items-center justify-between md:justify-end gap-6'>
              <div className='flex items-center gap-2'>
                <span className='w-2 h-2 rounded-full bg-green-500'></span>
                <p className='text-sm'>{item.status}</p>
              </div>

              <button className='border px-4 py-2 text-sm cursor-pointer hover:bg-gray-100'>
                Track Order
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
