import React from 'react';
import Title from '../components/Title';
import { assets } from '../assets/assets';

const Contact = () => {
  return (
    <div>
      {/* Heading */}
      <div className='text-center text-2xl pt-10 border-t'>
        <Title text1={'CONTACT'} text2={'US'} />
      </div>

      {/* Contact Content */}
      <div className='my-10 flex flex-col md:flex-row gap-10 mb-28 px-5 sm:px-10'>
        {/* Image */}
        <img
          src={assets.contact_img}
          alt='Contact Us'
          className='w-full md:max-w-[480px]'
        />

        {/* Details */}
        <div className='flex flex-col justify-center items-start gap-6 text-gray-600'>
          <p className='font-semibold text-xl text-gray-800'>Our Store</p>

          <p>
            54709 Willms Station
            <br />
            Suite 350, Washington, USA
          </p>

          <p>
            Tel: +1 (555) 123-4567
            <br />
            Email: admin@forever.com
          </p>

          <p className='font-semibold text-xl text-gray-800'>
            Careers at Forever
          </p>

          <p>Learn more about our teams and current job openings.</p>

          <button className='border border-black px-8 py-3 text-sm hover:bg-black hover:text-white transition-all duration-500 cursor-pointer'>
            Explore Jobs
          </button>
        </div>
      </div>

      {/* Contact Form */}
      <div className='px-5 sm:px-10 mb-20'>
        <div className='text-center text-xl mb-8'>
          <Title text1={'GET IN'} text2={'TOUCH'} />
        </div>

        <form className='max-w-3xl mx-auto flex flex-col gap-4'>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <input
              type='text'
              placeholder='Your Name'
              className='border border-gray-300 px-4 py-3 outline-none'
            />

            <input
              type='email'
              placeholder='Your Email'
              className='border border-gray-300 px-4 py-3 outline-none'
            />
          </div>

          <input
            type='text'
            placeholder='Subject'
            className='border border-gray-300 px-4 py-3 outline-none'
          />

          <textarea
            rows='6'
            placeholder='Your Message'
            className='border border-gray-300 px-4 py-3 outline-none resize-none'
          ></textarea>

          <button
            type='submit'
            className='bg-black text-white py-3 px-8 w-fit cursor-pointer'
          >
            SEND MESSAGE
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
