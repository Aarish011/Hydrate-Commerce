import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';

const SearchBar = () => {
  const { search, setSearch, showSearch, setShowSearch } =
    useContext(ShopContext);

  if (!showSearch) return null;

  return (
    <div className='w-full flex justify-center py-6 px-4 border-b'>
      <div className='w-full max-w-xl flex items-center gap-3 border border-gray-300 rounded-lg px-3 py-2'>
        <input
          type='text'
          placeholder='Search products...'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className='flex-1 outline-none text-sm'
        />

        {/* Close */}
        <img
          src={assets.cross_icon}
          alt='close'
          className='w-4 h-4 cursor-pointer'
          onClick={() => setShowSearch(false)}
        />
      </div>
    </div>
  );
};

export default SearchBar;
