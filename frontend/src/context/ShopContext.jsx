import React, { createContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import CartToast from '../components/CartToast';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  const currency = '$';
  const delivery_fee = 10;
  const backendURL = import.meta.env.VITE_BACKEND_URL;

  const [search, setSearch] = useState('');
  const [showSearch, setShowSearch] = useState(false);

  const [cartItems, setCartItems] = useState({});
  const [products, setProducts] = useState([]);

  const [token, setToken] = useState(localStorage.getItem('token') || '');

  const navigate = useNavigate();

  // ================= ADD TO CART =================
  // ================= ADD TO CART =================
  const addToCart = async (itemId, size) => {
    if (!size) {
      toast.error('Select Product Size');
      return;
    }

    toast(<CartToast />);

    const updatedCart = structuredClone(cartItems);

    if (!updatedCart[itemId]) {
      updatedCart[itemId] = {};
    }

    updatedCart[itemId][size] = (updatedCart[itemId][size] || 0) + 1;

    setCartItems(updatedCart);

    // 🔥 SYNC WITH BACKEND
    if (token) {
      try {
        const res = await axios.post(
          `${backendURL}/api/cart/add`,
          { itemId, size },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        // ✅ IMPORTANT: verify backend success
        if (!res.data.success) {
          toast.error(res.data.message || 'Failed to update cart');

          // rollback UI if backend fails
          setCartItems(cartItems);
        }
      } catch (error) {
        console.log(error);
        toast.error(error.message);

        // rollback UI if request fails
        setCartItems(cartItems);
      }
    }
  };

  // ================= UPDATE QUANTITY =================
  const updateQuantity = async (itemId, size, quantity) => {
    let cartData = structuredClone(cartItems);

    cartData[itemId][size] = Number(quantity);
    setCartItems(cartData);

    if (token) {
      try {
        await axios.post(
          `${backendURL}/api/cart/update`,
          { itemId, size, quantity },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      } catch (error) {
        console.log(error);
        toast.error(error.message);
      }
    }
  };

  // ================= GET CART FROM DB =================
  const getUserCart = async () => {
    if (!token) return;

    try {
      const response = await axios.get(`${backendURL}/api/cart/get`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.success) {
        setCartItems(response.data.cartData);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // ================= GET PRODUCTS =================
  const getProductData = async () => {
    try {
      const response = await axios.get(`${backendURL}/api/product/list`);

      if (response.data.success) {
        setProducts(response.data.products);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong');
    }
  };

  // ================= CART COUNT =================
  const getCartCount = () => {
    let total = 0;

    for (const itemId in cartItems) {
      for (const size in cartItems[itemId]) {
        total += cartItems[itemId][size];
      }
    }

    return total;
  };
  //remove product from databse
  const removeFromCart = async (itemId, size) => {
    const cartData = structuredClone(cartItems);

    delete cartData[itemId][size];

    if (Object.keys(cartData[itemId]).length === 0) {
      delete cartData[itemId];
    }

    setCartItems(cartData);

    if (token) {
      try {
        const response = await axios.post(
          `${backendURL}/api/cart/remove`,
          { itemId, size },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.data.success) {
          toast.error(response.data.message);
        }
      } catch (error) {
        console.log(error);
        toast.error(error.message);
      }
    }
  };

  // ================= INIT =================
  useEffect(() => {
    const initializeData = async () => {
      await getProductData();

      if (token) {
        await getUserCart();
      }
    };

    initializeData();
  }, [token]);

  const value = {
    products,
    currency,
    delivery_fee,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    cartItems,
    addToCart,
    updateQuantity,
    getCartCount,
    navigate,
    backendURL,
    token,
    setToken,
    removeFromCart,
  };

  return (
    <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>
  );
};

export default ShopContextProvider;
