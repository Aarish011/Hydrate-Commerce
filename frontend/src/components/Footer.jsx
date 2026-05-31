import React from 'react';
import { assets } from '../assets/assets';

const Footer = () => {
  return (
    <div className='mt-40 pl-3'>
      <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 text-sm'>
        {/* Logo & Description */}
        <div>
          <img src={assets.logo} className='mb-5 w-32' alt='logo' />

          <p className='w-full md:w-2/3 text-gray-600'>
            Discover premium fashion and lifestyle products designed to elevate
            your everyday style. Shop the latest collections with confidence and
            convenience.
          </p>
        </div>

        {/* Company Links */}
        <div>
          <p className='text-xl font-medium mb-5'>COMPANY</p>

          <ul className='flex flex-col gap-1 text-gray-600'>
            <li>Home</li>
            <li>About Us</li>
            <li>Collection</li>
            <li>Contact Us</li>
            <li>Privacy Policy</li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>

          <ul className='flex flex-col gap-1 text-gray-600'>
            <li>+91 98765 43210</li>
            <li>support@hydratecommerce.com</li>
          </ul>
        </div>
      </div>

      <div>
        <hr className='mt-10' />

        <p className='py-5 text-sm text-center'>
          Copyright 2026 © Hydrate Commerce - All Rights Reserved.
        </p>
      </div>
    </div>
  );
};

export default Footer;
