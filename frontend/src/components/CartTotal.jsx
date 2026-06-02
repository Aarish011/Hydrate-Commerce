import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from './Title';

const CartTotal = () => {
  const { products, cartItems, currency, delivery_fee } =
    useContext(ShopContext);

  let subtotal = 0;

  for (const itemId in cartItems) {
    const product = products.find((item) => item._id === itemId);

    if (!product) continue;

    for (const size in cartItems[itemId]) {
      subtotal += product.price * cartItems[itemId][size];
    }
  }

  const total = subtotal + delivery_fee;

  return (
    <div className='w-full'>
      <div className='text-2xl'>
        <Title text1={'CART'} text2={'TOTALS'} />
      </div>

      <div className='flex flex-col gap-2 mt-4 text-sm'>
        <div className='flex justify-between'>
          <p>Subtotal</p>
          <p>
            {currency}
            {subtotal}
          </p>
        </div>

        <hr />

        <div className='flex justify-between'>
          <p>Shipping Fee</p>
          <p>
            {currency}
            {delivery_fee}
          </p>
        </div>

        <hr />

        <div className='flex justify-between font-medium text-base'>
          <p>Total</p>
          <p>
            {currency}
            {total}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CartTotal;
