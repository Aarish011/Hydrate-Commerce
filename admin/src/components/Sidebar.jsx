import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { assets } from '../assets/assets';

const Sidebar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  // Close sidebar on route change (mobile)
  useEffect(() => {
    if (sidebarOpen) {
      setSidebarOpen(false);
    }
  }, [location.pathname]);

  // Handle escape key to close sidebar
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape' && sidebarOpen) {
        setSidebarOpen(false);
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [sidebarOpen]);

  const navItems = [
    {
      path: '/add-product',
      label: 'Add Product',
      icon: assets.add_icon,
      description: 'Add new products to inventory',
    },
    {
      path: '/products',
      label: 'Product List',
      icon: assets.parcel_icon,
      description: 'Manage your products',
    },
    {
      path: '/orders',
      label: 'Orders',
      icon: assets.order_icon,
      description: 'Track and manage orders',
    },
  ];

  return (
    <>
      {/* Mobile Menu Button - Enhanced */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className='md:hidden fixed top-4 left-4 z-50 bg-gradient-to-r from-gray-800 to-gray-700 text-white p-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 active:scale-95'
        aria-label='Toggle menu'
      >
        <div className='relative w-5 h-5'>
          <span
            className={`absolute h-0.5 w-5 bg-white transform transition-all duration-300 ${sidebarOpen ? 'rotate-45 top-2' : 'top-0'}`}
          />
          <span
            className={`absolute h-0.5 w-5 bg-white top-2 transition-all duration-300 ${sidebarOpen ? 'opacity-0' : 'opacity-100'}`}
          />
          <span
            className={`absolute h-0.5 w-5 bg-white transform transition-all duration-300 ${sidebarOpen ? '-rotate-45 top-2' : 'top-4'}`}
          />
        </div>
      </button>

      {/* Mobile Overlay - Enhanced Animation */}
      {sidebarOpen && (
        <div
          className='md:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-40 animate-fade-in'
          onClick={() => setSidebarOpen(false)}
          aria-hidden='true'
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed md:static
          top-0 left-0
          z-50
          h-screen
          w-72
          bg-gradient-to-b from-white to-gray-50
          shadow-2xl
          transition-all
          duration-300
          ease-in-out
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          md:translate-x-0
          md:shadow-lg
          overflow-y-auto
        `}
      >
        {/* Sidebar Header - Enhanced */}
        <div className='relative p-6 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white'>
          <div className='flex items-center justify-between'>
            <div>
              <h2 className='text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent'>
                Admin Panel
              </h2>
              <p className='text-xs text-gray-400 mt-1'>Manage your store</p>
            </div>
            <div className='w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center'>
              <div className='w-4 h-4 bg-white rounded-full opacity-50' />
            </div>
          </div>

          {/* Decorative line */}
          <div className='absolute bottom-0 left-6 right-6 h-0.5 bg-gradient-to-r from-transparent via-gray-300 to-transparent' />
        </div>

        {/* Navigation Items - Enhanced */}
        <div className='p-4 space-y-2 mt-4'>
          {navItems.map((item, index) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => `
                relative group
                flex items-center gap-4 
                px-4 py-3 
                rounded-xl 
                transition-all duration-300 
                transform hover:translate-x-1
                ${
                  isActive
                    ? 'bg-gradient-to-r from-gray-800 to-gray-700 text-white shadow-lg'
                    : 'text-gray-700 hover:bg-gray-100 hover:shadow-md'
                }
              `}
              style={{
                animationDelay: `${index * 0.05}s`,
              }}
            >
              {({ isActive }) => (
                <>
                  {/* Icon Container */}
                  <div
                    className={`
                    relative
                    w-10 h-10 
                    rounded-lg 
                    flex items-center justify-center
                    transition-all duration-300
                    ${
                      isActive
                        ? 'bg-white/10'
                        : 'bg-gray-100 group-hover:bg-gray-200'
                    }
                  `}
                  >
                    <img
                      src={item.icon}
                      alt={item.label}
                      className={`
                        w-5 h-5 
                        transition-all duration-300
                        ${
                          isActive
                            ? 'brightness-0 invert'
                            : 'opacity-70 group-hover:opacity-100'
                        }
                      `}
                    />

                    {/* Active Indicator Dot */}
                    {isActive && (
                      <span className='absolute -right-1 -top-1 w-2 h-2 bg-green-400 rounded-full animate-pulse' />
                    )}
                  </div>

                  {/* Text Container */}
                  <div className='flex-1'>
                    <span className='font-semibold text-sm block'>
                      {item.label}
                    </span>
                    {!isActive && (
                      <span className='text-xs text-gray-400 group-hover:text-gray-500 transition-colors duration-200'>
                        {item.description}
                      </span>
                    )}
                  </div>

                  {/* Hover Arrow Indicator */}
                  <div
                    className={`
                    opacity-0 group-hover:opacity-100 
                    transition-all duration-300 transform -translate-x-2 group-hover:translate-x-0
                    ${isActive ? 'text-white' : 'text-gray-400'}
                  `}
                  >
                    <svg
                      className='w-4 h-4'
                      fill='none'
                      stroke='currentColor'
                      viewBox='0 0 24 24'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M9 5l7 7-7 7'
                      />
                    </svg>
                  </div>
                </>
              )}
            </NavLink>
          ))}
        </div>

        {/* Sidebar Footer */}
        <div className='absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 bg-gray-50'>
          <div className='flex items-center gap-3 px-3 py-2 rounded-lg bg-white shadow-sm'>
            <div className='w-8 h-8 bg-gradient-to-r from-gray-700 to-gray-600 rounded-full flex items-center justify-center'>
              <span className='text-white text-xs font-bold'>A</span>
            </div>
            <div className='flex-1'>
              <p className='text-sm font-semibold text-gray-800'>Admin User</p>
              <p className='text-xs text-gray-400'>admin@store.com</p>
            </div>
            <div className='w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-200 transition-colors'>
              <svg
                className='w-3 h-3 text-gray-500'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M20 12H4M12 4v16'
                />
              </svg>
            </div>
          </div>
        </div>
      </aside>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }

        /* Custom scrollbar */
        aside::-webkit-scrollbar {
          width: 4px;
        }

        aside::-webkit-scrollbar-track {
          background: #f1f1f1;
        }

        aside::-webkit-scrollbar-thumb {
          background: #c1c1c1;
          border-radius: 4px;
        }

        aside::-webkit-scrollbar-thumb:hover {
          background: #a1a1a1;
        }
      `}</style>
    </>
  );
};

export default Sidebar;
