import React, { useState, useContext } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { assets } from '../assets/assets';
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const Navbar = () => {
  const [showProfile, setShowProfile] = useState(false);
  const [open, setOpen] = useState(false);
  const { setShowSearch, getCartCount, backendURL, token, setToken } =
    useContext(ShopContext);
  const navigate = useNavigate();

  const logout = async () => {
    try {
      const response = await axios.post(
        `${backendURL}/api/user/logout`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        localStorage.removeItem('token');
        setToken('');
        navigate('/login');
        toast.success('Logged Out');
      }
    } catch (error) {
      console.log(error);
      toast.error('Logout Failed');
    }
  };

  return (
    <div className='flex justify-between items-center font-medium py-5 pr-12'>
      {/* Logo */}
      <Link to='/'>
        <img src={assets.logo} alt='logo' className='w-36 ml-5' />
      </Link>

      {/* Desktop Menu */}
      <ul className='hidden sm:flex gap-5 text-sm text-gray-700'>
        <NavLink
          to='/'
          className={({ isActive }) =>
            `flex flex-col items-center gap-1 ${isActive ? 'active' : ''}`
          }
        >
          <p>HOME</p>
          <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
        </NavLink>

        <NavLink
          to='/collection'
          className={({ isActive }) =>
            `flex flex-col items-center gap-1 ${isActive ? 'active' : ''}`
          }
        >
          <p>COLLECTION</p>
          <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
        </NavLink>

        <NavLink
          to='/about'
          className={({ isActive }) =>
            `flex flex-col items-center gap-1 ${isActive ? 'active' : ''}`
          }
        >
          <p>ABOUT</p>
          <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
        </NavLink>

        <NavLink
          to='/contact'
          className={({ isActive }) =>
            `flex flex-col items-center gap-1 ${isActive ? 'active' : ''}`
          }
        >
          <p>CONTACT</p>
          <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
        </NavLink>
      </ul>

      {/* Right Icons */}
      <div className='flex items-center gap-6'>
        <img
          src={assets.search_icon}
          className='w-5 cursor-pointer'
          alt='search'
          onClick={() => setShowSearch(true)}
        />

        {/* Profile */}
        <div className='group relative'>
          {token ? (
            <img
              src={assets.profile_icon}
              className='w-5 cursor-pointer'
              alt='profile'
              onClick={() => setShowProfile(!showProfile)}
            />
          ) : (
            <Link to='/login'>
              <img
                src={assets.profile_icon}
                className='w-5 cursor-pointer'
                alt='profile'
              />
            </Link>
          )}

          {token && (
            <div className='hidden group-hover:block absolute right-0 pt-4 z-20'>
              <div className='flex flex-col w-40 bg-white rounded-lg shadow-lg border overflow-hidden text-sm text-gray-700'>
                <Link to={'/my-profile'}>
                  <p className='px-4 py-3 cursor-pointer hover:bg-gray-100'>
                    My Profile
                  </p>
                </Link>

                <Link to='/orders' className='px-4 py-3 hover:bg-gray-100'>
                  Orders
                </Link>

                <p
                  className='px-4 py-3 cursor-pointer hover:bg-red-50 hover:text-red-600'
                  onClick={logout}
                >
                  Logout
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Mobile Dropdown */}
        {showProfile && (
          <div className='absolute right-0 top-8 bg-slate-100 py-3 px-5 w-36 shadow-md rounded sm:hidden z-50'>
            <div className='flex flex-col gap-2 text-gray-700'>
              <p className='cursor-pointer'>My Profile</p>
              <p className='cursor-pointer'>Orders</p>
              <p className='cursor-pointer'>Logout</p>
            </div>
          </div>
        )}

        {/* Cart */}
        <NavLink to='/cart' className='relative'>
          <img
            src={assets.cart_icon}
            alt='cart'
            className='w-5 cursor-pointer'
          />
          <p className='absolute -right-1 -bottom-1 bg-black text-white text-[8px] w-4 h-4 rounded-full flex items-center justify-center'>
            {getCartCount()}
          </p>
        </NavLink>

        {/* Mobile Menu Button */}
        <img
          src={assets.menu_icon}
          className='w-5 cursor-pointer sm:hidden'
          alt='menu'
          onClick={() => setOpen((prev) => !prev)}
        />
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className='fixed inset-0 bg-white flex flex-col items-center justify-center gap-6 sm:hidden z-50'>
          {/* Close Button */}
          <p
            className='absolute top-5 right-6 text-3xl cursor-pointer'
            onClick={() => setOpen(false)}
          >
            ✕
          </p>

          <NavLink onClick={() => setOpen(false)} to='/' className='text-lg'>
            HOME
            <hr className='w-10 border-black mt-1' />
          </NavLink>

          <NavLink
            onClick={() => setOpen(false)}
            to='/collection'
            className='text-lg'
          >
            COLLECTION
            <hr className='w-10 border-black mt-1' />
          </NavLink>

          <NavLink
            onClick={() => setOpen(false)}
            to='/about'
            className='text-lg'
          >
            ABOUT
            <hr className='w-10 border-black mt-1' />
          </NavLink>

          <NavLink
            onClick={() => setOpen(false)}
            to='/contact'
            className='text-lg'
          >
            CONTACT
            <hr className='w-10 border-black mt-1' />
          </NavLink>
        </div>
      )}
    </div>
  );
};

export default Navbar;
