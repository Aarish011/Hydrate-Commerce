import React from 'react';

const Title = ({ text1, text2 }) => {
  return (
    <div className='text-center py-8 text-3xl'>
      <h1 className='font-semibold'>
        {text1} <span className='text-gray-600'>{text2}</span>
      </h1>
    </div>
  );
};

export default Title;
