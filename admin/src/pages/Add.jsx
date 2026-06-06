import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { backendURL } from '../App';
import { toast } from 'react-toastify';

const Add = () => {
  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);
  const [image3, setImage3] = useState(null);
  const [image4, setImage4] = useState(null);

  // Store preview URLs separately
  const [preview1, setPreview1] = useState(null);
  const [preview2, setPreview2] = useState(null);
  const [preview3, setPreview3] = useState(null);
  const [preview4, setPreview4] = useState(null);

  const [data, setData] = useState({
    name: '',
    description: '',
    price: '',
    category: 'men',
    subCategory: 'topwear',
    bestseller: false,
  });

  const [sizes, setSizes] = useState([]);

  // Clean up object URLs when component unmounts or images change
  useEffect(() => {
    return () => {
      if (preview1) URL.revokeObjectURL(preview1);
      if (preview2) URL.revokeObjectURL(preview2);
      if (preview3) URL.revokeObjectURL(preview3);
      if (preview4) URL.revokeObjectURL(preview4);
    };
  }, [preview1, preview2, preview3, preview4]);

  const handleImageChange = (e, setImage, setPreview, currentPreview) => {
    const file = e.target.files[0];
    if (file) {
      // Clean up old preview URL
      if (currentPreview) {
        URL.revokeObjectURL(currentPreview);
      }
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const toggleSize = (size) => {
    setSizes((prev) =>
      prev.includes(size)
        ? prev.filter((item) => item !== size)
        : [...prev, size]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log({
      ...data,
      sizes,
      image1,
      image2,
      image3,
      image4,
    });

    // API call will come here
    const formData = new FormData();

    const { name, description, price, category, subCategory, bestseller } =
      data;

    formData.append('name', name);
    formData.append('description', description);
    formData.append('price', price);
    formData.append('category', category);
    formData.append('subCategory', subCategory);
    formData.append('bestseller', bestseller);
    formData.append('sizes', JSON.stringify(sizes));
    image1 && formData.append('image1', image1);
    image2 && formData.append('image2', image2);
    image3 && formData.append('image3', image3);
    image4 && formData.append('image4', image4);

    try {
      const token = localStorage.getItem('token');

      const response = await axios.post(
        `${backendURL}/api/product/add`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data.success) {
        toast.success('Product Added');
        clearForm();
      }
    } catch (error) {
      console.log(error.response?.data || error.message);
    }
  };

  const clearForm = () => {
    setData({
      name: '',
      description: '',
      price: '',
      category: 'men',
      subCategory: 'topwear',
      bestseller: false,
    });
    setSizes([]);

    // Clean up all preview URLs
    if (preview1) URL.revokeObjectURL(preview1);
    if (preview2) URL.revokeObjectURL(preview2);
    if (preview3) URL.revokeObjectURL(preview3);
    if (preview4) URL.revokeObjectURL(preview4);

    setImage1(null);
    setImage2(null);
    setImage3(null);
    setImage4(null);
    setPreview1(null);
    setPreview2(null);
    setPreview3(null);
    setPreview4(null);
  };

  return (
    <div className='min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4'>
      <div className='w-full max-w-6xl mx-auto'>
        {/* Header with animation */}
        <div className='text-center mb-8 animate-fade-in'>
          <h1 className='text-4xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-2'>
            Add New Product
          </h1>
          <p className='text-gray-500'>
            Fill in the details to add a new product to your store
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className='bg-white rounded-2xl shadow-xl overflow-hidden transition-all duration-300 hover:shadow-2xl'
        >
          {/* Form Header */}
          <div className='bg-gradient-to-r from-gray-800 to-gray-700 px-6 py-4'>
            <h2 className='text-white text-xl font-semibold'>
              Product Information
            </h2>
            <p className='text-gray-300 text-sm'>
              Complete all required fields
            </p>
          </div>

          <div className='p-6 space-y-8'>
            {/* Images Section */}
            <div className='group'>
              <label className='block text-gray-700 font-semibold mb-3 text-lg'>
                Product Images
                <span className='text-gray-400 text-sm ml-2 font-normal'>
                  (Up to 4 images)
                </span>
              </label>

              <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
                {/* Image 1 */}
                <div className='relative group/image'>
                  <input
                    type='file'
                    id='image-1'
                    onChange={(e) =>
                      handleImageChange(e, setImage1, setPreview1, preview1)
                    }
                    accept='image/*'
                    className='hidden'
                  />
                  <label
                    htmlFor='image-1'
                    className={`
                      block w-full aspect-square rounded-xl border-2 border-dashed 
                      transition-all duration-200 cursor-pointer overflow-hidden
                      ${
                        preview1
                          ? 'border-green-400 bg-green-50'
                          : 'border-gray-300 hover:border-gray-400 bg-gray-50 hover:bg-gray-100'
                      }
                    `}
                  >
                    {preview1 ? (
                      <div className='relative w-full h-full'>
                        <img
                          src={preview1}
                          alt='Preview 1'
                          className='w-full h-full object-cover'
                        />
                        <div className='absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-200 flex items-center justify-center'>
                          <span className='text-white opacity-0 group-hover:opacity-100 transition-opacity text-sm font-medium'>
                            Change
                          </span>
                        </div>
                      </div>
                    ) : (
                      <div className='flex flex-col items-center justify-center h-full'>
                        <svg
                          className='w-8 h-8 text-gray-400 mb-2'
                          fill='none'
                          stroke='currentColor'
                          viewBox='0 0 24 24'
                        >
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth={2}
                            d='M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z'
                          />
                        </svg>
                        <span className='text-xs text-gray-500'>Image 1</span>
                      </div>
                    )}
                  </label>
                </div>

                {/* Image 2 */}
                <div className='relative group/image'>
                  <input
                    type='file'
                    id='image-2'
                    onChange={(e) =>
                      handleImageChange(e, setImage2, setPreview2, preview2)
                    }
                    accept='image/*'
                    className='hidden'
                  />
                  <label
                    htmlFor='image-2'
                    className={`
                      block w-full aspect-square rounded-xl border-2 border-dashed 
                      transition-all duration-200 cursor-pointer overflow-hidden
                      ${
                        preview2
                          ? 'border-green-400 bg-green-50'
                          : 'border-gray-300 hover:border-gray-400 bg-gray-50 hover:bg-gray-100'
                      }
                    `}
                  >
                    {preview2 ? (
                      <div className='relative w-full h-full'>
                        <img
                          src={preview2}
                          alt='Preview 2'
                          className='w-full h-full object-cover'
                        />
                        <div className='absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-200 flex items-center justify-center'>
                          <span className='text-white opacity-0 group-hover:opacity-100 transition-opacity text-sm font-medium'>
                            Change
                          </span>
                        </div>
                      </div>
                    ) : (
                      <div className='flex flex-col items-center justify-center h-full'>
                        <svg
                          className='w-8 h-8 text-gray-400 mb-2'
                          fill='none'
                          stroke='currentColor'
                          viewBox='0 0 24 24'
                        >
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth={2}
                            d='M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z'
                          />
                        </svg>
                        <span className='text-xs text-gray-500'>Image 2</span>
                      </div>
                    )}
                  </label>
                </div>

                {/* Image 3 */}
                <div className='relative group/image'>
                  <input
                    type='file'
                    id='image-3'
                    onChange={(e) =>
                      handleImageChange(e, setImage3, setPreview3, preview3)
                    }
                    accept='image/*'
                    className='hidden'
                  />
                  <label
                    htmlFor='image-3'
                    className={`
                      block w-full aspect-square rounded-xl border-2 border-dashed 
                      transition-all duration-200 cursor-pointer overflow-hidden
                      ${
                        preview3
                          ? 'border-green-400 bg-green-50'
                          : 'border-gray-300 hover:border-gray-400 bg-gray-50 hover:bg-gray-100'
                      }
                    `}
                  >
                    {preview3 ? (
                      <div className='relative w-full h-full'>
                        <img
                          src={preview3}
                          alt='Preview 3'
                          className='w-full h-full object-cover'
                        />
                        <div className='absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-200 flex items-center justify-center'>
                          <span className='text-white opacity-0 group-hover:opacity-100 transition-opacity text-sm font-medium'>
                            Change
                          </span>
                        </div>
                      </div>
                    ) : (
                      <div className='flex flex-col items-center justify-center h-full'>
                        <svg
                          className='w-8 h-8 text-gray-400 mb-2'
                          fill='none'
                          stroke='currentColor'
                          viewBox='0 0 24 24'
                        >
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth={2}
                            d='M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z'
                          />
                        </svg>
                        <span className='text-xs text-gray-500'>Image 3</span>
                      </div>
                    )}
                  </label>
                </div>

                {/* Image 4 */}
                <div className='relative group/image'>
                  <input
                    type='file'
                    id='image-4'
                    onChange={(e) =>
                      handleImageChange(e, setImage4, setPreview4, preview4)
                    }
                    accept='image/*'
                    className='hidden'
                  />
                  <label
                    htmlFor='image-4'
                    className={`
                      block w-full aspect-square rounded-xl border-2 border-dashed 
                      transition-all duration-200 cursor-pointer overflow-hidden
                      ${
                        preview4
                          ? 'border-green-400 bg-green-50'
                          : 'border-gray-300 hover:border-gray-400 bg-gray-50 hover:bg-gray-100'
                      }
                    `}
                  >
                    {preview4 ? (
                      <div className='relative w-full h-full'>
                        <img
                          src={preview4}
                          alt='Preview 4'
                          className='w-full h-full object-cover'
                        />
                        <div className='absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-200 flex items-center justify-center'>
                          <span className='text-white opacity-0 group-hover:opacity-100 transition-opacity text-sm font-medium'>
                            Change
                          </span>
                        </div>
                      </div>
                    ) : (
                      <div className='flex flex-col items-center justify-center h-full'>
                        <svg
                          className='w-8 h-8 text-gray-400 mb-2'
                          fill='none'
                          stroke='currentColor'
                          viewBox='0 0 24 24'
                        >
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth={2}
                            d='M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z'
                          />
                        </svg>
                        <span className='text-xs text-gray-500'>Image 4</span>
                      </div>
                    )}
                  </label>
                </div>
              </div>
              <p className='text-xs text-gray-400 mt-2'>
                Click to upload images (JPG, PNG, WebP)
              </p>
            </div>

            {/* Product Name */}
            <div>
              <label className='block text-gray-700 font-semibold mb-2'>
                Product Name <span className='text-red-500'>*</span>
              </label>
              <input
                type='text'
                name='name'
                value={data.name}
                onChange={handleChange}
                placeholder='e.g., Classic Cotton T-Shirt'
                className='w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-gray-400 focus:outline-none transition-colors duration-200'
                required
              />
            </div>

            {/* Description */}
            <div>
              <label className='block text-gray-700 font-semibold mb-2'>
                Description <span className='text-red-500'>*</span>
              </label>
              <textarea
                rows='4'
                name='description'
                value={data.description}
                onChange={handleChange}
                placeholder='Describe your product in detail...'
                className='w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-gray-400 focus:outline-none transition-colors duration-200 resize-none'
                required
              />
              <p className='text-xs text-gray-400 mt-1'>
                {data.description.length} characters
              </p>
            </div>

            {/* Category, Subcategory, Price */}
            <div className='grid md:grid-cols-3 gap-6'>
              <div>
                <label className='block text-gray-700 font-semibold mb-2'>
                  Category <span className='text-red-500'>*</span>
                </label>
                <select
                  name='category'
                  value={data.category}
                  onChange={handleChange}
                  className='w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-gray-400 focus:outline-none transition-colors duration-200 cursor-pointer bg-white'
                >
                  <option value='men'>👨 Men</option>
                  <option value='women'>👩 Women</option>
                  <option value='kids'>🧒 Kids</option>
                </select>
              </div>

              <div>
                <label className='block text-gray-700 font-semibold mb-2'>
                  Sub Category <span className='text-red-500'>*</span>
                </label>
                <select
                  name='subCategory'
                  value={data.subCategory}
                  onChange={handleChange}
                  className='w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-gray-400 focus:outline-none transition-colors duration-200 cursor-pointer bg-white'
                >
                  <option value='topwear'>👕 Topwear</option>
                  <option value='bottomwear'>👖 Bottomwear</option>
                  <option value='winterwear'>🧥 Winterwear</option>
                </select>
              </div>

              <div>
                <label className='block text-gray-700 font-semibold mb-2'>
                  Price ($) <span className='text-red-500'>*</span>
                </label>
                <input
                  type='number'
                  name='price'
                  value={data.price}
                  onChange={handleChange}
                  placeholder='0.00'
                  step='0.01'
                  min='0'
                  className='w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-gray-400 focus:outline-none transition-colors duration-200'
                  required
                />
              </div>
            </div>

            {/* Sizes */}
            <div>
              <label className='block text-gray-700 font-semibold mb-3'>
                Available Sizes
              </label>
              <div className='flex flex-wrap gap-3'>
                {['S', 'M', 'L', 'XL', 'XXL'].map((size) => (
                  <button
                    type='button'
                    key={size}
                    onClick={() => toggleSize(size)}
                    className={`
                      relative w-14 h-14 rounded-xl font-semibold text-lg
                      transition-all duration-200 transform hover:scale-105
                      ${
                        sizes.includes(size)
                          ? 'bg-gray-800 text-white shadow-lg'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border-2 border-gray-200'
                      }
                    `}
                  >
                    {size}
                    {sizes.includes(size) && (
                      <span className='absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full text-white text-xs flex items-center justify-center'>
                        ✓
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Bestseller Toggle */}
            <div className='flex items-center justify-between p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl'>
              <div>
                <label className='font-semibold text-gray-700 cursor-pointer'>
                  Add to Bestseller
                </label>
                <p className='text-sm text-gray-500'>
                  Feature this product as a bestseller
                </p>
              </div>
              <label className='relative inline-flex items-center cursor-pointer'>
                <input
                  type='checkbox'
                  name='bestseller'
                  checked={data.bestseller}
                  onChange={handleChange}
                  className='sr-only peer'
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gray-800"></div>
              </label>
            </div>

            {/* Submit Button */}
            <div className='flex gap-4 pt-4'>
              <button
                type='submit'
                className='flex-1 bg-gradient-to-r from-gray-800 to-gray-700 text-white px-6 py-3 rounded-xl font-semibold hover:from-gray-700 hover:to-gray-600 transition-all duration-200 transform hover:scale-[1.02] shadow-lg'
              >
                Add Product
              </button>
              <button
                type='button'
                onClick={clearForm}
                className='px-6 py-3 rounded-xl border-2 border-gray-300 text-gray-600 font-semibold hover:bg-gray-50 transition-all duration-200'
              >
                Clear Form
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* Add custom CSS for animations */}
      <style>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }
      `}</style>
    </div>
  );
};

export default Add;
