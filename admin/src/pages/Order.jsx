import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const Orders = () => {
  const [orders, setOrders] = useState([]);

  const backendURL = import.meta.env.VITE_BACKEND_URL;
  const token = localStorage.getItem('token');

  // ================= FETCH ORDERS =================
  const fetchOrders = async () => {
    if (!token) return;
    try {
      const response = await axios.get(`${backendURL}/api/order/list`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log(response.data);

      if (response.data.success) {
        setOrders(response.data.orders);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  // ================= UPDATE STATUS =================
  const updateStatus = async (orderId, status) => {
    try {
      const response = await axios.post(
        `${backendURL}/api/order/status`,
        {
          orderId,
          status,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        toast.success('Status Updated');
        fetchOrders();
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || error.message);
    }
  };

  useEffect(() => {
    if (token) {
      fetchOrders();
    }
  }, [token]);
  return (
    <div className='w-full'>
      <div className='flex justify-between items-center mb-6'>
        <h1 className='text-2xl font-bold'>Orders Management</h1>

        <span className='bg-gray-200 px-4 py-2 rounded-lg'>
          {orders.length} Orders
        </span>
      </div>

      <div className='bg-white rounded-xl shadow overflow-hidden'>
        {/* Header */}
        <div className='hidden md:grid grid-cols-[120px_1fr_2fr_120px_120px_180px_140px] gap-4 p-4 bg-gray-100 font-semibold border-b'>
          <p>Order ID</p>
          <p>Customer</p>
          <p>Items</p>
          <p>Amount</p>
          <p>Payment</p>
          <p>Status</p>
          <p>Date</p>
        </div>

        {/* Orders */}
        {orders.map((order) => (
          <div
            key={order._id}
            className='grid md:grid-cols-[120px_1fr_2fr_120px_120px_180px_140px] gap-4 p-4 border-b items-center hover:bg-gray-50'
          >
            <p className='font-medium'>#{order._id.slice(-6)}</p>

            <p>
              {order.address?.firstName} {order.address?.lastName}
            </p>

            <div>
              {order.items?.map((item, index) => (
                <p key={index}>
                  {item.name} × {item.quantity}
                </p>
              ))}
            </div>

            <p>₹{order.amount}</p>

            <span
              className={`px-3 py-1 rounded-full text-sm w-fit ${
                order.payment
                  ? 'bg-green-100 text-green-700'
                  : 'bg-yellow-100 text-yellow-700'
              }`}
            >
              {order.payment ? 'Paid' : 'Pending'}
            </span>

            <select
              value={order.status}
              onChange={(e) => updateStatus(order._id, e.target.value)}
              className='border rounded-lg px-3 py-2'
            >
              <option>Order Placed</option>
              <option>Packing</option>
              <option>Shipped</option>
              <option>Out For Delivery</option>
              <option>Delivered</option>
            </select>

            <p>{new Date(order.createdAt).toLocaleDateString()}</p>
          </div>
        ))}

        {orders.length === 0 && (
          <div className='text-center py-10 text-gray-500'>No Orders Found</div>
        )}
      </div>
    </div>
  );
};

export default Orders;
