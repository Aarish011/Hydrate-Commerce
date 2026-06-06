import React, { useEffect, useState } from 'react';
import AdminNavbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import { ToastContainer } from 'react-toastify';
import Add from './pages/Add';
import List from './pages/List';
import Order from './pages/Order';
import EditProduct from './pages/EditProduct';

export const backendURL = import.meta.env.VITE_BACKEND_URL;

const App = () => {
  const [token, setToken] = useState(
    localStorage.getItem('token') ? localStorage.getItem('token') : ' '
  );

  useEffect(() => {
    localStorage.setItem('token', token);
  }, [token]);

  return (
    <>
      <ToastContainer />
      {token === '' ? (
        <Login setToken={setToken} />
      ) : (
        <>
          <AdminNavbar setToken={setToken} />

          <div className='flex'>
            <Sidebar />

            <main className='flex-1 p-4 md:p-6 bg-gray-50 min-h-screen'>
              <Routes>
                <Route path='/add-product' element={<Add token={token} />} />
                <Route path='/products' element={<List token={token} />} />
                <Route path='/orders' element={<Order token={token} />} />
                <Route
                  path='/products/edit/:id'
                  element={<EditProduct token={token} />}
                />
              </Routes>
            </main>
          </div>
        </>
      )}
    </>
  );
};

export default App;
