import React, { useState } from 'react';
import axios from 'axios';
import { backendURL } from '../App';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Login = ({ setToken }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${backendURL}/api/admin/login`, {
        email,
        password,
      });
      if (response.data.success) {
        localStorage.setItem('token', response.data.token);
        setToken(response.data.token);
        navigate('/orders');
      } else {
        toast.error('data is not correct');
      }
    } catch (error) {
      console.log(error.response?.data || error.message);
    }
  };

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-100 px-4'>
      <div className='w-full max-w-md bg-white rounded-2xl shadow-lg p-8'>
        <h1 className='text-3xl font-bold text-center mb-2'>Admin Login</h1>

        <p className='text-gray-500 text-center mb-8'>
          Login to access the dashboard
        </p>

        <form onSubmit={handleSubmit} className='space-y-5'>
          <div>
            <label className='block mb-2 text-sm font-medium'>Email</label>

            <input
              type='email'
              placeholder='admin@gmail.com'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className='w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500'
              required
            />
          </div>

          <div>
            <label className='block mb-2 text-sm font-medium'>Password</label>

            <input
              type='password'
              placeholder='••••••••'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className='w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500'
              required
            />
          </div>

          <button
            type='submit'
            className='w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg font-medium transition'
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
