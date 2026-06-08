import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { ShopContext } from '../context/ShopContext';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const { backendURL, token, setToken } = useContext(ShopContext);

  const [currentState, setCurrentState] = useState('Login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [showOTPModal, setShowOTPModal] = useState(false);
  const [otp, setOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSendOTP = async () => {
    if (!phone || phone.length < 10) {
      toast.error('Please enter a valid phone number');
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.post(`${backendURL}/api/user/send-otp`, {
        phone,
      });

      if (response.data.success) {
        toast.success('OTP Sent Successfully');
        setShowOTPModal(true);
      } else {
        toast.error(response.data.message || 'Failed to send OTP');
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || 'Failed to send OTP');
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOTP = async () => {
    if (!otp || otp.length !== 6) {
      toast.error('Please enter a valid 6-digit OTP');
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.post(`${backendURL}/api/user/verify-otp`, {
        phone,
        otp,
      });

      if (response.data.success) {
        toast.success('Phone verified successfully');
        setShowOTPModal(false);
        setOtp('');
        // Proceed with registration with phoneVerified = true
        await onSubmitHandler(null, true);
      } else {
        toast.error(response.data.message || 'Invalid OTP');
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || 'OTP verification failed');
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmitHandler = async (event, verified = false) => {
    if (event) event.preventDefault();

    try {
      let response;

      if (currentState === 'Sign Up') {
        response = await axios.post(`${backendURL}/api/user/register`, {
          name,
          email,
          password,
          phone,
          phoneVerified: verified, // Send phoneVerified status
        });
      } else {
        response = await axios.post(`${backendURL}/api/user/login`, {
          email,
          password,
        });
      }

      if (response.data.success) {
        setToken(response.data.token);
        localStorage.setItem('token', response.data.token);

        toast.success(
          currentState === 'Sign Up'
            ? 'Registration Successful'
            : 'Login Successful'
        );

        // Optional
        setName('');
        setEmail('');
        setPassword('');
        setPhone('');
      } else {
        toast.error(response.data.message);
      }

      console.log(response.data);
    } catch (error) {
      console.log(error.response?.data || error.message);

      toast.error(error.response?.data?.message || 'Something went wrong');
    }
  };

  useEffect(() => {
    if (token) {
      navigate('/');
    }
  }, [token]);

  return (
    <>
      <form
        onSubmit={(e) => {
          if (currentState === 'Sign Up') {
            e.preventDefault();
            handleSendOTP();
          } else {
            onSubmitHandler(e);
          }
        }}
        className='flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800'
      >
        <div className='inline-flex items-center gap-2 mb-2 mt-10'>
          <p className='prata-regular text-3xl'>{currentState}</p>
          <hr className='border-none h-[1.5px] w-8 bg-gray-800' />
        </div>

        {currentState === 'Sign Up' && (
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type='text'
            placeholder='Name'
            className='w-full px-3 py-2 border border-gray-800'
            required
          />
        )}

        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type='email'
          placeholder='Email'
          className='w-full px-3 py-2 border border-gray-800'
          required
        />

        {currentState === 'Sign Up' && (
          <input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            type='tel'
            placeholder='Phone Number'
            className='w-full px-3 py-2 border border-gray-800'
            required
          />
        )}

        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type='password'
          placeholder='Password'
          className='w-full px-3 py-2 border border-gray-800'
          required
        />

        <div className='w-full flex justify-between text-sm mt-[-8px]'>
          <p className='cursor-pointer'>Forgot Password?</p>

          {currentState === 'Login' ? (
            <p
              onClick={() => setCurrentState('Sign Up')}
              className='cursor-pointer'
            >
              Create Account
            </p>
          ) : (
            <p
              onClick={() => setCurrentState('Login')}
              className='cursor-pointer'
            >
              Login Here
            </p>
          )}
        </div>

        <button
          type='submit'
          disabled={isLoading}
          className='bg-black text-white font-light px-8 py-2 mt-4 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed'
        >
          {isLoading
            ? 'Please wait...'
            : currentState === 'Login'
              ? 'Sign In'
              : 'Sign Up'}
        </button>
      </form>

      {/* OTP Modal */}
      {showOTPModal && (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
          <div className='bg-white rounded-xl p-6 w-[90%] max-w-md'>
            <div className='flex justify-between items-center mb-4'>
              <h2 className='text-xl font-semibold'>Verify Phone Number</h2>
              <button
                onClick={() => {
                  setShowOTPModal(false);
                  setOtp('');
                }}
                className='text-gray-500 hover:text-gray-700 text-2xl'
              >
                ×
              </button>
            </div>

            <p className='text-gray-600 mb-4'>
              We've sent a verification code to <strong>{phone}</strong>
            </p>

            <input
              type='text'
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder='Enter 6-digit OTP'
              maxLength={6}
              className='w-full px-3 py-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-500'
              autoFocus
            />

            <button
              onClick={handleVerifyOTP}
              disabled={isLoading}
              className='w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-50'
            >
              {isLoading ? 'Verifying...' : 'Verify & Continue'}
            </button>

            <p className='text-xs text-gray-400 text-center mt-3'>
              Didn't receive code?{' '}
              <button
                onClick={handleSendOTP}
                className='text-blue-500 hover:underline'
              >
                Resend
              </button>
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default Login;
