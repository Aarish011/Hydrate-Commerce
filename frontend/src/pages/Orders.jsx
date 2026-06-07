import React, { useContext, useEffect, useState } from 'react';
import Title from '../components/Title';
import axios from 'axios';
import { ShopContext } from '../context/ShopContext';
import { useNavigate } from 'react-router-dom';

const Orders = () => {
  const { backendURL, token, currency } = useContext(ShopContext);

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const loadOrders = async () => {
    try {
      const response = await axios.get(`${backendURL}/api/order/userorders`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.success) {
        setOrders(response.data.orders);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      loadOrders();
    }
  }, [token]);

  if (loading) {
    return <div className='text-center py-20'>Loading Orders...</div>;
  }

  return (
    <div className='border-t pt-16 px-5 sm:px-10 min-h-[80vh]'>
      <div className='text-2xl mb-8'>
        <Title text1={'MY'} text2={'ORDERS'} />
      </div>

      {orders.length === 0 ? (
        <div className='text-center py-20 text-gray-500'>No Orders Found</div>
      ) : (
        <div>
          {orders.map((order) =>
            order.items.map((item, index) => (
              <div
                key={`${order._id}-${index}`}
                className='py-4 border-t border-b text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4'
              >
                {/* Left Side */}
                <div className='flex items-start gap-6'>
                  <img
                    src={item.image}
                    alt={item.name}
                    className='w-16 sm:w-20'
                  />

                  <div>
                    <p className='font-medium'>{item.name}</p>

                    <div className='flex flex-wrap items-center gap-4 mt-2 text-sm'>
                      <p>
                        {currency}
                        {item.price}
                      </p>

                      <p>Quantity: {item.quantity}</p>

                      <p>Size: {item.size}</p>
                    </div>

                    <p className='mt-2 text-sm text-gray-500'>
                      Date: {new Date(order.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                {/* Right Side */}
                <div className='flex items-center justify-between md:justify-end gap-6'>
                  <div className='flex items-center gap-2'>
                    <span className='min-w-2 h-2 rounded-full bg-green-500'></span>

                    <p className='text-sm'>{order.status}</p>
                  </div>

                  <button
                    onClick={() => navigate(`/track-order/${order._id}`)}
                    className='border px-4 py-2 text-sm cursor-pointer hover:bg-gray-100'
                  >
                    Track Order
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default Orders;
