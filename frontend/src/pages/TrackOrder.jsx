import { useParams } from 'react-router-dom';
import { useState, useEffect, useContext, useRef } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { ShopContext } from '../context/ShopContext';
import { Link } from 'react-router-dom';

const TrackOrder = () => {
  const { orderId } = useParams();
  const { backendURL, token } = useContext(ShopContext);
  const [currentStatus, setCurrentStatus] = useState(0);
  const [orderDetails, setOrderDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const intervalRef = useRef(null);

  const statusMap = {
    'Order Placed': 0,
    Packing: 1,
    Shipped: 2,
    'Out For Delivery': 3,
    Delivered: 4,
  };

  const statusSteps = [
    { label: 'Order Placed', icon: '📦', description: 'Order confirmed' },
    { label: 'Packing', icon: '📋', description: 'Items being packed' },
    { label: 'Shipped', icon: '🚚', description: 'On the way' },
    { label: 'Out For Delivery', icon: '🏠', description: 'Out for delivery' },
    { label: 'Delivered', icon: '🎉', description: 'Order delivered' },
  ];

  // Fetch order from backend
  const fetchOrderStatus = async (showToast = false) => {
    if (!token) {
      if (!loading) {
        toast.error('Please login to track your order');
      }
      setLoading(false);
      return;
    }

    try {
      const response = await axios.get(`${backendURL}/api/order/${orderId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.success) {
        const order = response.data.order;
        const newStatus = statusMap[order.status] || 0;

        // Check if status changed
        const statusChanged =
          currentStatus !== newStatus && currentStatus !== 0;

        setOrderDetails(order);
        setCurrentStatus(newStatus);

        // Show toast when status changes
        if (statusChanged && showToast === false) {
          toast.info(`Order status updated: ${order.status}`);
        }
      } else {
        if (showToast) {
          toast.error(response.data.message || 'Order not found');
        }
      }
    } catch (error) {
      console.error(error);
      if (showToast) {
        toast.error(
          error.response?.data?.message || 'Failed to fetch order details'
        );
      }
    } finally {
      setLoading(false);
      setIsRefreshing(false);
    }
  };

  // Initial fetch and auto-refresh every 10 seconds
  useEffect(() => {
    if (orderId) {
      fetchOrderStatus(true);
    }

    // Set up auto-refresh interval
    intervalRef.current = setInterval(() => {
      if (orderId && token && orderDetails?.status !== 'Delivered') {
        setIsRefreshing(true);
        fetchOrderStatus(false);
      }
    }, 10000); // Refresh every 10 seconds

    // Cleanup interval on unmount
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [orderId, backendURL, token]);

  // Calculate estimated delivery date (5 days from order creation)
  const getEstimatedDelivery = () => {
    if (!orderDetails?.createdAt) return 'N/A';
    const estimatedDate = new Date(
      new Date(orderDetails.createdAt).getTime() + 5 * 24 * 60 * 60 * 1000
    );
    return estimatedDate.toLocaleDateString();
  };

  const getStatusColor = (index) => {
    if (index < currentStatus) return 'bg-green-500';
    if (index === currentStatus) return 'bg-blue-500';
    return 'bg-gray-300';
  };

  const getTextColor = (index) => {
    if (index < currentStatus) return 'text-green-600';
    if (index === currentStatus) return 'text-blue-600';
    return 'text-gray-400';
  };

  // Manual refresh handler
  const handleManualRefresh = () => {
    setIsRefreshing(true);
    fetchOrderStatus(true);
  };

  if (loading) {
    return (
      <div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100'>
        <div className='text-center'>
          <div className='inline-block animate-spin rounded-full h-12 w-12 border-4 border-gray-300 border-t-gray-800 mb-4'></div>
          <p className='text-gray-500'>Loading order details...</p>
        </div>
      </div>
    );
  }

  if (!orderDetails) {
    return (
      <div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100'>
        <div className='text-center'>
          <div className='text-6xl mb-4'>📦</div>
          <h2 className='text-2xl font-semibold text-gray-800 mb-2'>
            Order Not Found
          </h2>
          <p className='text-gray-500'>
            We couldn't find the order you're looking for.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-6xl mx-auto'>
        {/* Header */}
        <div className='text-center mb-10'>
          <h1 className='text-3xl sm:text-4xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-3'>
            Track Your Order
          </h1>
          <p className='text-gray-500'>Stay updated on your delivery status</p>
        </div>

        {/* Main Card */}
        <div className='bg-white rounded-2xl shadow-xl overflow-hidden'>
          {/* Order Info Header */}
          <div className='bg-gradient-to-r from-gray-800 to-gray-700 px-6 py-5 sm:px-8'>
            <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3'>
              <div>
                <p className='text-gray-300 text-sm'>ORDER ID</p>
                <p className='text-white font-mono text-lg font-semibold'>
                  {orderDetails?._id}
                </p>
              </div>
              <div>
                <p className='text-gray-300 text-sm'>ORDER DATE</p>
                <p className='text-white font-semibold'>
                  {orderDetails?.createdAt
                    ? new Date(orderDetails.createdAt).toLocaleDateString()
                    : 'N/A'}
                </p>
              </div>
              <div>
                <p className='text-gray-300 text-sm'>ESTIMATED DELIVERY</p>
                <p className='text-white font-semibold'>
                  {getEstimatedDelivery()}
                </p>
              </div>
            </div>
          </div>

          {/* Status Timeline - Desktop Horizontal, Mobile Vertical */}
          <div className='px-6 py-8 sm:px-8 border-b border-gray-100'>
            <div className='flex justify-between items-center mb-8'>
              <h3 className='text-lg font-semibold text-gray-800'>
                Order Status
              </h3>

              <div className='flex items-center gap-3'>
                {/* Auto-refresh indicator */}
                {isRefreshing && (
                  <div className='flex items-center gap-1'>
                    <div className='inline-block animate-spin rounded-full h-3 w-3 border-2 border-gray-400 border-t-gray-800'></div>
                    <span className='text-xs text-gray-400'>Updating...</span>
                  </div>
                )}

                {/* Payment Status Badge */}
                <div className='flex items-center gap-2'>
                  <span className='text-sm text-gray-500'>Payment:</span>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      orderDetails?.payment
                        ? 'bg-green-100 text-green-700'
                        : 'bg-orange-100 text-orange-700'
                    }`}
                  >
                    {orderDetails?.payment ? 'Paid' : 'Pending'}
                  </span>
                </div>
              </div>
            </div>

            {/* Desktop Horizontal Timeline */}
            <div className='hidden sm:block relative'>
              <div className='absolute top-5 left-0 right-0 h-0.5 bg-gray-200'></div>
              <div
                className='absolute top-5 left-0 h-0.5 bg-gradient-to-r from-green-500 via-blue-500 to-gray-300 transition-all duration-500'
                style={{
                  width: `${(currentStatus / (statusSteps.length - 1)) * 100}%`,
                }}
              ></div>

              <div className='relative flex justify-between'>
                {statusSteps.map((step, index) => (
                  <div
                    key={index}
                    className='flex flex-col items-center flex-1'
                  >
                    <div
                      className={`
                      relative z-10 w-10 h-10 rounded-full flex items-center justify-center text-lg
                      transition-all duration-300 shadow-md mb-3
                      ${getStatusColor(index)}
                    `}
                    >
                      {step.icon}
                      {index < currentStatus && (
                        <div className='absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full flex items-center justify-center text-white text-[10px]'>
                          ✓
                        </div>
                      )}
                    </div>
                    <p className={`text-sm font-medium ${getTextColor(index)}`}>
                      {step.label}
                    </p>
                    <p className='text-xs text-gray-400 mt-1 text-center'>
                      {step.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Mobile Vertical Timeline */}
            <div className='sm:hidden relative'>
              <div className='absolute left-5 top-0 bottom-0 w-0.5 bg-gray-200'></div>
              <div
                className='absolute left-5 top-0 w-0.5 bg-gradient-to-b from-green-500 via-blue-500 to-gray-300 transition-all duration-500'
                style={{
                  height: `${(currentStatus / (statusSteps.length - 1)) * 100}%`,
                }}
              ></div>

              <div className='space-y-8'>
                {statusSteps.map((step, index) => (
                  <div key={index} className='relative flex gap-4'>
                    <div className='relative z-10'>
                      <div
                        className={`
                        w-10 h-10 rounded-full flex items-center justify-center text-lg
                        transition-all duration-300 shadow-md
                        ${getStatusColor(index)}
                      `}
                      >
                        {step.icon}
                        {index < currentStatus && (
                          <div className='absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full flex items-center justify-center text-white text-[10px]'>
                            ✓
                          </div>
                        )}
                      </div>
                    </div>
                    <div className='flex-1 pt-1'>
                      <p
                        className={`text-sm font-medium ${getTextColor(index)}`}
                      >
                        {step.label}
                      </p>
                      <p className='text-xs text-gray-400 mt-1'>
                        {step.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Last updated timestamp */}
            {orderDetails?.updatedAt && currentStatus < 4 && (
              <div className='text-center mt-6'>
                <p className='text-xs text-gray-400'>
                  Last updated:{' '}
                  {new Date(orderDetails.updatedAt).toLocaleString()}
                </p>
                <button
                  onClick={handleManualRefresh}
                  disabled={isRefreshing}
                  className='text-xs text-blue-500 hover:text-blue-600 mt-1 disabled:opacity-50'
                >
                  {isRefreshing ? 'Updating...' : 'Click to refresh status'}
                </button>
              </div>
            )}
          </div>

          {/* Order Summary */}
          <div className='px-6 py-6 sm:px-8 bg-gray-50'>
            <h3 className='text-lg font-semibold text-gray-800 mb-4'>
              Order Summary
            </h3>

            <div className='space-y-3'>
              {orderDetails?.items?.map((item, idx) => (
                <div
                  key={idx}
                  className='flex justify-between items-center py-2 border-b border-gray-200 last:border-0'
                >
                  <div>
                    <p className='text-gray-800 font-medium'>{item.name}</p>
                    <p className='text-sm text-gray-500'>
                      Size: {item.size} | Quantity: {item.quantity}
                    </p>
                  </div>
                  <p className='text-gray-800 font-semibold'>
                    ₹{item.price * item.quantity}
                  </p>
                </div>
              ))}

              <div className='flex justify-between items-center pt-3 mt-2 border-t-2 border-gray-200'>
                <p className='text-gray-800 font-bold'>Total Amount</p>
                <p className='text-gray-800 font-bold text-lg'>
                  ₹{orderDetails?.amount}
                </p>
              </div>

              {/* Delivery Fee */}
              <div className='flex justify-between items-center text-sm text-gray-500'>
                <p>Delivery Fee</p>
                <p>₹{orderDetails?.deliveryFee || 50}</p>
              </div>
            </div>
          </div>

          {/* Shipping Address */}
          {orderDetails?.address && (
            <div className='px-6 py-5 sm:px-8 bg-white border-t border-gray-100'>
              <h3 className='text-lg font-semibold text-gray-800 mb-3'>
                Shipping Address
              </h3>
              <div className='text-gray-600'>
                <p>
                  {orderDetails.address.firstName}{' '}
                  {orderDetails.address.lastName}
                </p>
                <p>{orderDetails.address.street}</p>
                <p>
                  {orderDetails.address.city}, {orderDetails.address.state} -{' '}
                  {orderDetails.address.zipcode}
                </p>
                <p>{orderDetails.address.country}</p>
                <p className='mt-2'>Phone: {orderDetails.address.phone}</p>
                <p>Email: {orderDetails.address.email}</p>
              </div>
            </div>
          )}

          {/* Need Help Section */}
          <div className='px-6 py-5 sm:px-8 bg-gray-50 border-t border-gray-100'>
            <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4'>
              <div>
                <p className='text-gray-800 font-medium'>
                  Need help with your order?
                </p>
                <p className='text-sm text-gray-500 mt-1'>
                  Contact our support team for assistance
                </p>
              </div>
              <Link to={'contact-support'}>
                <button className='px-6 py-2 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 hover:border-gray-400 transition-all duration-200 font-medium'>
                  Contact Support
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* Delivery Tips */}
        <div className='mt-8 bg-blue-50 border border-blue-200 rounded-xl p-4'>
          <div className='flex items-start gap-3'>
            <span className='text-2xl'>💡</span>
            <div>
              <p className='text-blue-800 font-medium text-sm'>Delivery Tip</p>
              <p className='text-blue-700 text-sm mt-1'>
                Keep your phone handy for delivery updates and OTP verification
                (if required).
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrackOrder;
