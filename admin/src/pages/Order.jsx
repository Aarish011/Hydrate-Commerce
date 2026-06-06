import React, { useEffect, useState } from 'react';

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // Later replace with API call
    setOrders([
      {
        _id: '1',
        customer: 'Aarish',
        items: ['T-Shirt', 'Jeans'],
        amount: 1499,
        payment: 'Paid',
        status: 'Processing',
        date: '06 June 2026',
      },
      {
        _id: '2',
        customer: 'Rahul',
        items: ['Hoodie'],
        amount: 999,
        payment: 'Pending',
        status: 'Shipped',
        date: '05 June 2026',
      },
    ]);
  }, []);

  const updateStatus = (id, newStatus) => {
    setOrders((prev) =>
      prev.map((order) =>
        order._id === id ? { ...order, status: newStatus } : order
      )
    );
  };

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
            <p className='font-medium'>#{order._id}</p>

            <p>{order.customer}</p>

            <div>
              {order.items.map((item, index) => (
                <p key={index}>{item}</p>
              ))}
            </div>

            <p>₹{order.amount}</p>

            <span
              className={`px-3 py-1 rounded-full text-sm w-fit ${
                order.payment === 'Paid'
                  ? 'bg-green-100 text-green-700'
                  : 'bg-yellow-100 text-yellow-700'
              }`}
            >
              {order.payment}
            </span>

            <select
              value={order.status}
              onChange={(e) => updateStatus(order._id, e.target.value)}
              className='border rounded-lg px-3 py-2'
            >
              <option>Order Placed</option>
              <option>Processing</option>
              <option>Shipped</option>
              <option>Out for Delivery</option>
              <option>Delivered</option>
            </select>

            <p>{order.date}</p>
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
