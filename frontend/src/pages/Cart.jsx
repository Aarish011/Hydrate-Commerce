import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from '../components/Title';
import { assets } from '../assets/assets';
import CartTotal from '../components/CartTotal';
import { toast } from 'react-toastify';

const Cart = () => {
  const {
    products,
    cartItems,
    currency,
    removeFromCart,
    updateQuantity,
    navigate,
  } = useContext(ShopContext);
  if (products.length === 0) {
    return <div className='text-center py-20'>Loading cart...</div>;
  }

  const validateToProceed = () => {
    if (cartData.length === 0) {
      toast.error('Your cart is empty');
      navigate('/collection');
      return;
    }

    navigate('/place-order');
  };

  const cartData = [];

  for (const itemId in cartItems) {
    for (const size in cartItems[itemId]) {
      if (cartItems[itemId][size] > 0) {
        cartData.push({
          _id: itemId,
          size,
          quantity: cartItems[itemId][size],
        });
      }
    }
  }

  return (
    <div className='border-t pt-14 px-5 sm:px-10'>
      <div className='text-2xl mb-8'>
        <Title text1={'YOUR'} text2={'CART'} />
      </div>

      <div>
        {cartData.map((item, index) => {
          const productData = products.find(
            (product) => product._id === item._id
          );

          if (!productData) return null;

          return (
            <div
              key={index}
              className='py-4 border-t border-b text-gray-700 grid grid-cols-[4fr_1fr_1fr] items-center gap-4'
            >
              {/* Product */}
              <div className='flex items-start gap-6'>
                <img
                  src={productData.image[0]}
                  alt=''
                  className='w-16 sm:w-20'
                />

                <div>
                  <p className='text-sm sm:text-lg font-medium'>
                    {productData.name}
                  </p>

                  <div className='flex items-center gap-5 mt-2'>
                    <p>
                      {currency}
                      {productData.price}
                    </p>

                    <p className='px-2 sm:px-3 sm:py-1 border bg-slate-50'>
                      {item.size}
                    </p>
                  </div>
                </div>
              </div>

              {/* Quantity */}
              <input
                type='number'
                min={1}
                defaultValue={item.quantity}
                onChange={(e) =>
                  updateQuantity(item._id, item.size, e.target.value)
                }
                className='border max-w-16 px-1 py-1'
              />

              {/* Delete */}
              <button
                className='text-red-500 text-xl cursor-pointer'
                onClick={() => removeFromCart(item._id, item.size)}
              >
                <img src={assets.bin_icon} alt='' className='w-6' />
              </button>
            </div>
          );
        })}
      </div>
      <div className='flex justify-end my-20'>
        <div className='w-full sm:w-[450px]'>
          <CartTotal />
          <div className='w-full text-end'>
            <button
              disabled={cartData.length === 0}
              className={`px-8 py-3 text-sm ${
                cartData.length === 0
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-black text-white cursor-pointer'
              }`}
              onClick={validateToProceed}
            >
              PROCEED TO CHECKOUT
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
