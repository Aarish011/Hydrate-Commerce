import React, { useContext, useState } from 'react';
import Title from '../components/Title';
import CartTotal from '../components/CartTotal';
import { assets } from '../assets/assets';
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const PlaceOrder = () => {
  const { cartItems, products, token, backendURL, delivery_fee, navigate } =
    useContext(ShopContext);

  const [method, setMethod] = useState('COD');

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zipcode: '',
    country: '',
    phone: '',
  });

  const onChangeHandler = (event) => {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      let orderItems = [];

      for (const itemId in cartItems) {
        const itemInfo = products.find((product) => product._id === itemId);

        if (!itemInfo) continue;

        for (const size in cartItems[itemId]) {
          if (cartItems[itemId][size] > 0) {
            const itemData = {
              productId: itemInfo._id,
              name: itemInfo.name,
              price: itemInfo.price,
              image: itemInfo.image[0], // first image only
              size,
              quantity: cartItems[itemId][size],
            };

            itemData.size = size;
            itemData.quantity = cartItems[itemId][size];

            orderItems.push(itemData);
          }
        }
      }

      let amount = orderItems.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );

      amount += delivery_fee;

      const orderData = {
        address: formData,
        items: orderItems,
        amount,
        paymentMethod: method,
      };

      if (method === 'COD') {
        const response = await axios.post(
          `${backendURL}/api/order/place`,
          orderData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.data.success) {
          toast.success(response.data.message);
          navigate('/orders');
        } else {
          toast.error(response.data.message);
        }
      } else if (method === 'Stripe') {
        const response = await axios.post(
          `${backendURL}/api/order/stripe`,
          orderData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.data.success) {
          window.location.replace(response.data.session_url);
          toast.success(response.data.message);
        } else {
          toast.error(response.data.message);
        }
      } else if (method === 'Razorpay') {
        console.log(`${backendURL}/api/order/razorpay`);
        const response = await axios.post(
          `${backendURL}/api/order/razorpay`,
          orderData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.data.success) {
          const { order, key, orderId } = response.data;

          const options = {
            key,
            amount: order.amount,
            currency: order.currency,
            name: 'Your Store',
            description: 'Order Payment',
            order_id: order.id,

            handler: async function (paymentResponse) {
              const verifyResponse = await axios.post(
                `${backendURL}/api/order/verify-razorpay`,
                {
                  orderId,
                  razorpay_order_id: paymentResponse.razorpay_order_id,
                  razorpay_payment_id: paymentResponse.razorpay_payment_id,
                },
                {
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                }
              );

              if (verifyResponse.data.success) {
                toast.success('Payment Successful');
                navigate('/orders');
              } else {
                toast.error('Payment Verification Failed');
              }
            },

            theme: {
              color: '#3399cc',
            },
          };

          const razorpay = new window.Razorpay(options);
          razorpay.open();
        } else {
          toast.error(response.data.message);
        }
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className='flex flex-col lg:flex-row justify-between gap-12 pt-10 pb-16 min-h-[80vh] border-t px-6 sm:px-12 bg-gradient-to-br from-gray-50 to-white'
    >
      {/* Left Side - Delivery Information */}
      <div className='flex flex-col gap-5 w-full lg:max-w-[520px]'>
        <div className='mb-2'>
          <h2 className='text-2xl font-bold text-gray-800'>
            Delivery Information
          </h2>
          <p className='text-sm text-gray-500 mt-1'>
            Please fill in your shipping details
          </p>
        </div>

        <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
          <input
            name='firstName'
            value={formData.firstName}
            onChange={onChangeHandler}
            className='border border-gray-200 rounded-lg py-3 px-4 focus:outline-none focus:border-gray-400 focus:ring-2 focus:ring-gray-200 transition-all duration-200'
            type='text'
            placeholder='First Name'
          />

          <input
            name='lastName'
            value={formData.lastName}
            onChange={onChangeHandler}
            className='border border-gray-200 rounded-lg py-3 px-4 focus:outline-none focus:border-gray-400 focus:ring-2 focus:ring-gray-200 transition-all duration-200'
            type='text'
            placeholder='Last Name'
          />
        </div>

        <input
          name='email'
          value={formData.email}
          onChange={onChangeHandler}
          className='border border-gray-200 rounded-lg py-3 px-4 focus:outline-none focus:border-gray-400 focus:ring-2 focus:ring-gray-200 transition-all duration-200'
          type='email'
          placeholder='Email Address'
        />

        <input
          name='street'
          value={formData.street}
          onChange={onChangeHandler}
          className='border border-gray-200 rounded-lg py-3 px-4 focus:outline-none focus:border-gray-400 focus:ring-2 focus:ring-gray-200 transition-all duration-200'
          type='text'
          placeholder='Street Address'
        />

        <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
          <input
            name='city'
            value={formData.city}
            onChange={onChangeHandler}
            className='border border-gray-200 rounded-lg py-3 px-4 focus:outline-none focus:border-gray-400 focus:ring-2 focus:ring-gray-200 transition-all duration-200'
            type='text'
            placeholder='City'
          />

          <input
            name='state'
            value={formData.state}
            onChange={onChangeHandler}
            className='border border-gray-200 rounded-lg py-3 px-4 focus:outline-none focus:border-gray-400 focus:ring-2 focus:ring-gray-200 transition-all duration-200'
            type='text'
            placeholder='State'
          />
        </div>

        <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
          <input
            name='zipcode'
            value={formData.zipcode}
            onChange={onChangeHandler}
            className='border border-gray-200 rounded-lg py-3 px-4 focus:outline-none focus:border-gray-400 focus:ring-2 focus:ring-gray-200 transition-all duration-200'
            type='text'
            placeholder='Zip Code'
          />

          <input
            name='country'
            value={formData.country}
            onChange={onChangeHandler}
            className='border border-gray-200 rounded-lg py-3 px-4 focus:outline-none focus:border-gray-400 focus:ring-2 focus:ring-gray-200 transition-all duration-200'
            type='text'
            placeholder='Country'
          />
        </div>

        <input
          name='phone'
          value={formData.phone}
          onChange={onChangeHandler}
          className='border border-gray-200 rounded-lg py-3 px-4 focus:outline-none focus:border-gray-400 focus:ring-2 focus:ring-gray-200 transition-all duration-200'
          type='text'
          placeholder='Phone Number'
        />
      </div>

      {/* Right Side - Order Summary & Payment */}
      <div className='w-full lg:w-[380px]'>
        <div className='bg-white rounded-2xl shadow-lg p-6'>
          <CartTotal />
        </div>

        <div className='mt-10'>
          <div className='mb-6'>
            <Title text1={'PAYMENT'} text2={'METHOD'} />
          </div>

          <div className='flex flex-col gap-4 mt-6'>
            <div
              onClick={() => setMethod('Stripe')}
              className={`flex items-center justify-between gap-3 border-2 rounded-xl p-4 cursor-pointer transition-all duration-200 hover:shadow-md ${
                method === 'Stripe'
                  ? 'border-gray-800 bg-gray-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className='flex items-center gap-3'>
                <div
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                    method === 'Stripe' ? 'border-gray-800' : 'border-gray-300'
                  }`}
                >
                  {method === 'Stripe' && (
                    <div className='w-3 h-3 rounded-full bg-gray-800'></div>
                  )}
                </div>
                <img src={assets.stripe_logo} alt='Stripe' className='h-6' />
              </div>
              <span className='text-sm text-gray-500'>Recommended</span>
            </div>

            <div
              onClick={() => setMethod('Razorpay')}
              className={`flex items-center gap-3 border-2 rounded-xl p-4 cursor-pointer transition-all duration-200 hover:shadow-md ${
                method === 'Razorpay'
                  ? 'border-gray-800 bg-gray-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                  method === 'Razorpay' ? 'border-gray-800' : 'border-gray-300'
                }`}
              >
                {method === 'Razorpay' && (
                  <div className='w-3 h-3 rounded-full bg-gray-800'></div>
                )}
              </div>
              <img src={assets.razorpay_logo} alt='Razorpay' className='h-6' />
            </div>

            <div
              onClick={() => setMethod('COD')}
              className={`flex items-center gap-3 border-2 rounded-xl p-4 cursor-pointer transition-all duration-200 hover:shadow-md ${
                method === 'COD'
                  ? 'border-gray-800 bg-gray-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                  method === 'COD' ? 'border-gray-800' : 'border-gray-300'
                }`}
              >
                {method === 'COD' && (
                  <div className='w-3 h-3 rounded-full bg-gray-800'></div>
                )}
              </div>
              <p className='text-gray-700 font-medium'>CASH ON DELIVERY</p>
            </div>
          </div>

          <button
            type='submit'
            className='w-full bg-gradient-to-r from-gray-800 to-gray-700 text-white py-4 rounded-xl font-semibold text-sm mt-10 hover:from-gray-700 hover:to-gray-600 transition-all duration-200 transform hover:scale-[1.02] shadow-md'
          >
            PLACE ORDER
          </button>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
