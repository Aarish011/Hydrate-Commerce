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
  const navigate = useNavigate();

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      let response;

      if (currentState === 'Sign Up') {
        response = await axios.post(`${backendURL}/api/user/register`, {
          name,
          email,
          password,
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
    <form
      onSubmit={onSubmitHandler}
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
        className='bg-black text-white font-light px-8 py-2 mt-4 cursor-pointer'
      >
        {currentState === 'Login' ? 'Sign In' : 'Sign Up'}
      </button>
    </form>
  );
};

export default Login;
