import React from 'react';

const NewsLetterBox = () => {
  const onSubmitHandler = (event) => {
    event.preventDefault();
  };

  return (
    <div className='text-center py-16'>
      <p className='text-2xl font-medium text-gray-800'>
        Subscribe Now & Get 20% Off
      </p>

      <p className='text-gray-500 mt-3'>
        Join our newsletter and stay updated with the latest collections,
        offers, and fashion trends.
      </p>

      <form
        onSubmit={onSubmitHandler}
        className='w-full sm:w-1/2 flex items-center gap-3 mx-auto my-6 border pl-3'
      >
        <input
          className='w-full sm:flex-1 outline-none py-3'
          type='email'
          placeholder='Enter your email'
          required
        />

        <button type='submit' className='bg-black text-white text-xs px-8 py-4'>
          SUBSCRIBE
        </button>
      </form>
    </div>
  );
};

export default NewsLetterBox;
