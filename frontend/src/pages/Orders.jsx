import React, { useContext, useEffect, useState } from 'react';
import Title from '../components/Title';
import axios from 'axios';
import { ShopContext } from '../context/ShopContext';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

const Orders = () => {
  const { backendURL, token, currency } = useContext(ShopContext);

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const location = useLocation();

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
  }, [token, location.pathname]);

  if (loading) {
    return <div className='text-center py-20'>Loading Orders...</div>;
  }

  return (
    <div className='border-t pt-16 px-5 sm:px-10 min-h-[80vh] bg-gray-50'>
      <div className='text-2xl mb-8'>
        <Title text1={'MY'} text2={'ORDERS'} />
      </div>

      {orders.length === 0 ? (
        <div className='text-center py-20 text-gray-500'>No Orders Found</div>
      ) : (
        <div className='space-y-6'>
          {orders.map((order) => (
            <div
              key={order._id}
              className='bg-white rounded-xl shadow-sm overflow-hidden'
            >
              {/* Order Header - Shown once per order */}
              <div className='bg-gray-50 px-6 py-3 border-b flex flex-wrap justify-between items-center gap-3'>
                <div className='flex gap-6 text-sm'>
                  <div>
                    <span className='text-gray-500'>Order ID:</span>
                    <span className='ml-2 font-mono text-gray-800'>
                      {order._id.slice(-8)}
                    </span>
                  </div>
                  <div>
                    <span className='text-gray-500'>Placed on:</span>
                    <span className='ml-2 text-gray-800'>
                      {new Date(order.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                <div className='flex gap-3 items-center'>
                  {/* Payment Method only - No status badges */}
                  <div className='text-sm text-gray-700'>
                    <span className='font-medium'>Payment Method:</span>{' '}
                    {order.paymentMethod || 'Not specified'}
                  </div>
                </div>
              </div>

              {/* Order Items */}
              <div className='divide-y divide-gray-100'>
                {order.items.map((item, index) => (
                  <div
                    key={index}
                    className='p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 hover:bg-gray-50 transition-colors'
                  >
                    {/* Left Side - Product Info */}
                    <div className='flex gap-4'>
                      <img
                        src={item.image}
                        alt={item.name}
                        className='w-20 h-20 object-cover rounded-lg border'
                      />
                      <div>
                        <p className='font-medium text-gray-800'>{item.name}</p>
                        <div className='flex flex-wrap gap-3 mt-1 text-sm text-gray-500'>
                          <span>
                            {currency}
                            {item.price}
                          </span>
                          <span>•</span>
                          <span>Qty: {item.quantity}</span>
                          <span>•</span>
                          <span>Size: {item.size}</span>
                        </div>
                      </div>
                    </div>

                    {/* Right Side - Action */}
                    <div>
                      <button
                        onClick={() => navigate(`/track-order/${order._id}`)}
                        className='px-5 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-800 hover:text-white hover:border-gray-800 transition-all duration-200'
                      >
                        Track Order
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
