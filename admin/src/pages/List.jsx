import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { backendURL } from '../App';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${backendURL}/api/product/list`);

      if (response.data.success) {
        setProducts(response.data.products);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  //navigating for editing
  const navigate = useNavigate();

  const editProduct = (id) => {
    navigate(`/products/edit/${id}`);
  };

  //deleteing dunctionality
  const removeProduct = async (id) => {
    const confirmDelete = window.confirm(
      'Are you sure you want to delete this product?'
    );

    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem('token');

      const response = await axios.delete(
        `${backendURL}/api/product/delete/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        fetchProducts();
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  if (loading) {
    return <div className='text-center py-10'>Loading Products...</div>;
  }

  return (
    <div className='w-full'>
      <div className='flex justify-between items-center mb-6'>
        <h1 className='text-2xl font-bold'>Product Management</h1>

        <span className='bg-gray-200 px-4 py-2 rounded-lg'>
          {products.length} Products
        </span>
      </div>

      <div className='bg-white rounded-xl shadow overflow-hidden'>
        {/* Header */}
        <div className='hidden md:grid grid-cols-[80px_2fr_1fr_1fr_120px_180px] gap-4 p-4 bg-gray-100 font-semibold border-b'>
          <p>Image</p>
          <p>Name</p>
          <p>Category</p>
          <p>Price</p>
          <p>Status</p>
          <p>Actions</p>
        </div>

        {/* Products */}
        {products.map((product) => (
          <div
            key={product._id}
            className='grid md:grid-cols-[80px_2fr_1fr_1fr_120px_180px] gap-4 items-center p-4 border-b hover:bg-gray-50'
          >
            <img
              src={product.image?.[0]}
              alt={product.name}
              className='w-16 h-16 object-cover rounded-lg border'
            />

            <div>
              <p className='font-semibold'>{product.name}</p>

              <p className='text-sm text-gray-500'>{product.subCategory}</p>
            </div>

            <p>{product.category}</p>

            <p>₹{product.price}</p>

            <div>
              {product.bestseller ? (
                <span className='bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm'>
                  Bestseller
                </span>
              ) : (
                <span className='bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm'>
                  Normal
                </span>
              )}
            </div>

            <div className='flex gap-2'>
              <button
                className='px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600'
                onClick={() => editProduct(product._id)}
              >
                Edit
              </button>

              <button
                onClick={() => removeProduct(product._id)}
                className='px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600'
              >
                Delete
              </button>
            </div>
          </div>
        ))}

        {products.length === 0 && (
          <div className='text-center py-10 text-gray-500'>
            No products found
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductList;
