import React from 'react';
import Title from '../components/Title';
import { assets } from '../assets/assets';

const About = () => {
  return (
    <div>
      {/* Heading */}
      <div className='text-2xl text-center pt-8 border-t'>
        <Title text1={'ABOUT'} text2={'US'} />
      </div>

      {/* About Content */}
      <div className='my-10 flex flex-col md:flex-row gap-16 px-5 sm:px-10'>
        <img
          src={assets.about_img}
          alt='About Us'
          className='w-full md:max-w-[450px]'
        />

        <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600'>
          <p>
            Welcome to Forever, your trusted destination for quality fashion and
            lifestyle products. We are dedicated to bringing you the latest
            trends with exceptional quality and affordable prices.
          </p>

          <p>
            Our mission is to provide a seamless online shopping experience,
            offering a carefully curated collection of products that combine
            style, comfort, and value. Customer satisfaction remains at the
            heart of everything we do.
          </p>

          <b className='text-gray-800'>Our Mission</b>

          <p>
            To make premium fashion accessible to everyone by delivering
            high-quality products, excellent customer service, and a smooth
            shopping experience.
          </p>
        </div>
      </div>

      {/* Why Choose Us */}
      <div className='text-xl py-4 px-5 sm:px-10'>
        <Title text1={'WHY'} text2={'CHOOSE US'} />
      </div>

      <div className='flex flex-col md:flex-row text-sm mb-20 px-5 sm:px-10'>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Quality Assurance</b>
          <p className='text-gray-600'>
            Every product is carefully selected and inspected to ensure the
            highest standards of quality.
          </p>
        </div>

        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Convenience</b>
          <p className='text-gray-600'>
            Enjoy a smooth shopping experience with easy navigation, secure
            payments, and fast delivery.
          </p>
        </div>

        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Exceptional Customer Service</b>
          <p className='text-gray-600'>
            Our support team is always ready to help you with any questions or
            concerns throughout your shopping journey.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
