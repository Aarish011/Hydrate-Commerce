import React, { useState, useContext, useEffect } from 'react';
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

const MyProfile = () => {
  const { backendURL, token, setToken } = useContext(ShopContext);
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    phone: '',
    address: {
      street: '',
      city: '',
      state: '',
      zipcode: '',
      country: '',
    },
  });
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  // Fetch user profile
  const fetchUserProfile = async () => {
    if (!token) {
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      const response = await axios.get(`${backendURL}/api/user/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log('Profile response:', response.data);

      if (response.data.success) {
        setUserData(response.data.user);
      } else {
        toast.error(response.data.message || 'Failed to load profile');
      }
    } catch (error) {
      console.error('Profile fetch error:', error);
      toast.error(error.response?.data?.message || 'Failed to load profile');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchUserProfile();
    } else {
      setLoading(false);
    }
  }, [backendURL, token]);

  // Handle input changes
  const handleChange = (e, field, subField = null) => {
    const { value } = e.target;

    if (subField) {
      setUserData((prev) => ({
        ...prev,
        [field]: {
          ...prev[field],
          [subField]: value,
        },
      }));
    } else {
      setUserData((prev) => ({
        ...prev,
        [field]: value,
      }));
    }
  };

  // Update profile - CHANGE THIS ENDPOINT TO MATCH YOUR BACKEND
  const handleUpdateProfile = async () => {
    setUpdating(true);
    try {
      // Change this URL to match your backend route
      // Options: '/update', '/update-profile', '/profile/update'
      const response = await axios.put(
        `${backendURL}/api/user/update`,
        userData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log('Update response:', response.data);

      if (response.data.success) {
        toast.success('Profile updated successfully');
        setIsEditing(false);
        // Refresh profile data
        await fetchUserProfile();
      } else {
        toast.error(response.data.message || 'Update failed');
      }
    } catch (error) {
      console.error('Update error:', error);
      toast.error(error.response?.data?.message || 'Failed to update profile');
    } finally {
      setUpdating(false);
    }
  };

  // Logout
  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken('');
    toast.success('Logged out successfully');
    window.location.href = '/login';
  };

  if (loading) {
    return (
      <div className='min-h-screen flex items-center justify-center bg-gray-50'>
        <div className='text-center'>
          <div className='inline-block animate-spin rounded-full h-12 w-12 border-4 border-gray-300 border-t-gray-800 mb-4'></div>
          <p className='text-gray-500'>Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-4xl mx-auto'>
        {/* Header */}
        <div className='mb-8'>
          <h1 className='text-3xl font-bold text-gray-900'>My Profile</h1>
          <p className='text-gray-500 mt-1'>Manage your account information</p>
        </div>

        {/* Profile Card */}
        <div className='bg-white rounded-xl shadow-sm overflow-hidden'>
          {/* Profile Header */}
          <div className='bg-gray-50 px-6 py-4 border-b border-gray-200 flex justify-between items-center'>
            <div className='flex items-center gap-3'>
              <div className='w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center'>
                <span className='text-white text-xl font-semibold'>
                  {userData.name?.charAt(0) || 'U'}
                </span>
              </div>
              <div>
                <h2 className='text-xl font-semibold text-gray-900'>
                  {userData.name || 'User'}
                </h2>
                <p className='text-sm text-gray-500'>
                  Member since {new Date().getFullYear()}
                </p>
              </div>
            </div>

            {!isEditing ? (
              <button
                onClick={() => setIsEditing(true)}
                className='px-4 py-2 text-sm bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors'
              >
                Edit Profile
              </button>
            ) : (
              <div className='flex gap-2'>
                <button
                  onClick={() => setIsEditing(false)}
                  className='px-4 py-2 text-sm border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors'
                >
                  Cancel
                </button>
                <button
                  onClick={handleUpdateProfile}
                  disabled={updating}
                  className='px-4 py-2 text-sm bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors disabled:opacity-50'
                >
                  {updating ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            )}
          </div>

          {/* Profile Content */}
          <div className='p-6 space-y-8'>
            {/* Personal Information */}
            <div>
              <h3 className='text-lg font-semibold text-gray-800 mb-4'>
                Personal Information
              </h3>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-1'>
                    Full Name
                  </label>
                  {isEditing ? (
                    <input
                      type='text'
                      value={userData.name || ''}
                      onChange={(e) => handleChange(e, 'name')}
                      className='w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-gray-500'
                    />
                  ) : (
                    <p className='text-gray-900 py-2'>
                      {userData.name || 'Not provided'}
                    </p>
                  )}
                </div>

                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-1'>
                    Email Address
                  </label>
                  {isEditing ? (
                    <input
                      type='email'
                      value={userData.email || ''}
                      onChange={(e) => handleChange(e, 'email')}
                      className='w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-gray-500'
                    />
                  ) : (
                    <p className='text-gray-900 py-2'>
                      {userData.email || 'Not provided'}
                    </p>
                  )}
                </div>

                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-1'>
                    Phone Number
                  </label>
                  {isEditing ? (
                    <input
                      type='tel'
                      value={userData.phone || ''}
                      onChange={(e) => handleChange(e, 'phone')}
                      className='w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-gray-500'
                      placeholder='+1 234 567 8900'
                    />
                  ) : (
                    <p className='text-gray-900 py-2'>
                      {userData.phone || 'Not provided'}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Address Information */}
            <div>
              <h3 className='text-lg font-semibold text-gray-800 mb-4'>
                Shipping Address
              </h3>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                <div className='md:col-span-2'>
                  <label className='block text-sm font-medium text-gray-700 mb-1'>
                    Street Address
                  </label>
                  {isEditing ? (
                    <input
                      type='text'
                      value={userData.address?.street || ''}
                      onChange={(e) => handleChange(e, 'address', 'street')}
                      className='w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-gray-500'
                      placeholder='Street address'
                    />
                  ) : (
                    <p className='text-gray-900 py-2'>
                      {userData.address?.street || 'Not provided'}
                    </p>
                  )}
                </div>

                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-1'>
                    City
                  </label>
                  {isEditing ? (
                    <input
                      type='text'
                      value={userData.address?.city || ''}
                      onChange={(e) => handleChange(e, 'address', 'city')}
                      className='w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-gray-500'
                      placeholder='City'
                    />
                  ) : (
                    <p className='text-gray-900 py-2'>
                      {userData.address?.city || 'Not provided'}
                    </p>
                  )}
                </div>

                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-1'>
                    State
                  </label>
                  {isEditing ? (
                    <input
                      type='text'
                      value={userData.address?.state || ''}
                      onChange={(e) => handleChange(e, 'address', 'state')}
                      className='w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-gray-500'
                      placeholder='State'
                    />
                  ) : (
                    <p className='text-gray-900 py-2'>
                      {userData.address?.state || 'Not provided'}
                    </p>
                  )}
                </div>

                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-1'>
                    Zip Code
                  </label>
                  {isEditing ? (
                    <input
                      type='text'
                      value={userData.address?.zipcode || ''}
                      onChange={(e) => handleChange(e, 'address', 'zipcode')}
                      className='w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-gray-500'
                      placeholder='Zip code'
                    />
                  ) : (
                    <p className='text-gray-900 py-2'>
                      {userData.address?.zipcode || 'Not provided'}
                    </p>
                  )}
                </div>

                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-1'>
                    Country
                  </label>
                  {isEditing ? (
                    <input
                      type='text'
                      value={userData.address?.country || ''}
                      onChange={(e) => handleChange(e, 'address', 'country')}
                      className='w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-gray-500'
                      placeholder='Country'
                    />
                  ) : (
                    <p className='text-gray-900 py-2'>
                      {userData.address?.country || 'Not provided'}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Account Actions */}
            <div className='pt-6 border-t border-gray-200'>
              <button
                onClick={handleLogout}
                className='text-red-600 hover:text-red-700 font-medium transition-colors'
              >
                Logout
              </button>
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div className='mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4'>
          <Link
            to='/orders'
            className='bg-white rounded-lg shadow-sm p-4 text-center hover:shadow-md transition-shadow block'
          >
            <div className='text-2xl mb-2'>📦</div>
            <h4 className='font-medium text-gray-800'>My Orders</h4>
            <p className='text-sm text-gray-500 mt-1'>Track your orders</p>
          </Link>

          <div className='bg-white rounded-lg shadow-sm p-4 text-center hover:shadow-md transition-shadow'>
            <div className='text-2xl mb-2'>❤️</div>
            <h4 className='font-medium text-gray-800'>Wishlist</h4>
            <p className='text-sm text-gray-500 mt-1'>Saved items</p>
          </div>

          <div className='bg-white rounded-lg shadow-sm p-4 text-center hover:shadow-md transition-shadow'>
            <div className='text-2xl mb-2'>⭐</div>
            <h4 className='font-medium text-gray-800'>Reviews</h4>
            <p className='text-sm text-gray-500 mt-1'>Your feedback</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
