import React, { useEffect, useContext } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ShopContext } from '../context/ShopContext';

const Verify = () => {
  const [searchParams] = useSearchParams();

  const success = searchParams.get('success');
  const orderId = searchParams.get('orderId');

  const { backendURL, token } = useContext(ShopContext);

  const navigate = useNavigate();

  const verifyPayment = async () => {
    try {
      console.log('OrderId:', orderId);
      console.log('Success:', success);
      const response = await axios.post(
        `${backendURL}/api/order/verifystripe`,
        {
          success,
          orderId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        navigate('/orders');
      } else {
        navigate('/cart');
      }
    } catch (error) {
      console.log(error);
      navigate('/cart');
    }
  };

  useEffect(() => {
    verifyPayment();
  }, []);

  return <div>Verifying Payment...</div>;
};

export default Verify;
