import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { backendURL } from '../App';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
const token = localStorage.getItem('token');

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [data, setData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    subCategory: '',
    bestseller: false,
  });

  const fetchProduct = async () => {
    try {
      const response = await axios.get(`${backendURL}/api/product/${id}`);

      if (response.data.success) {
        const product = response.data.product;

        setData({
          name: product.name,
          description: product.description,
          price: product.price,
          category: product.category,
          subCategory: product.subCategory,
          bestseller: product.bestseller,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(
        `${backendURL}/api/product/update/${id}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        toast.success('Product Updated');
        navigate('/products');
      }
    } catch (error) {
      console.log(error);
      toast.error('Update Failed');
    }
  };

  return (
    <div className='max-w-3xl mx-auto bg-white p-6 rounded-xl shadow'>
      <h1 className='text-2xl font-bold mb-6'>Edit Product</h1>

      <form onSubmit={handleSubmit} className='space-y-4'>
        <input
          type='text'
          name='name'
          value={data.name}
          onChange={handleChange}
          placeholder='Product Name'
          className='w-full border p-3 rounded-lg'
        />

        <textarea
          name='description'
          value={data.description}
          onChange={handleChange}
          placeholder='Description'
          rows='4'
          className='w-full border p-3 rounded-lg'
        />

        <input
          type='number'
          name='price'
          value={data.price}
          onChange={handleChange}
          placeholder='Price'
          className='w-full border p-3 rounded-lg'
        />

        <select
          name='category'
          value={data.category}
          onChange={handleChange}
          className='w-full border p-3 rounded-lg'
        >
          <option value='men'>Men</option>
          <option value='women'>Women</option>
          <option value='kids'>Kids</option>
        </select>

        <select
          name='subCategory'
          value={data.subCategory}
          onChange={handleChange}
          className='w-full border p-3 rounded-lg'
        >
          <option value='topwear'>Topwear</option>
          <option value='bottomwear'>Bottomwear</option>
          <option value='winterwear'>Winterwear</option>
        </select>

        <label className='flex items-center gap-2'>
          <input
            type='checkbox'
            name='bestseller'
            checked={data.bestseller}
            onChange={handleChange}
          />
          Bestseller
        </label>

        <button
          type='submit'
          className='bg-black text-white px-6 py-3 rounded-lg'
        >
          Update Product
        </button>
      </form>
    </div>
  );
};

export default EditProduct;
