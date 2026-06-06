import React from 'react';
import { assets } from '../assets/assets';

const AdminNavbar = ({ setToken }) => {
  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken('');
  };

  return (
    <nav className=' flex items-center justify-between px-6 py-4 bg-white border-b shadow-sm'>
      {/* Logo */}
      <div className='flex items-center gap-3'>
        <img
          src={assets.logo}
          alt='logo'
          className='w-28 md:w-32 object-contain'
        />
      </div>

      {/* Right Side */}
      <div className='flex items-center gap-4'>
        <span className='hidden sm:block text-gray-600 font-medium'>Admin</span>

        <button
          onClick={handleLogout}
          className='px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-all duration-200 shadow-sm'
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default AdminNavbar;
