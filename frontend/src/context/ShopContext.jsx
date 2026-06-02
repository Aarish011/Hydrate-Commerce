import React, { createContext, useEffect, useState } from 'react';
import { products } from '../assets/assets';
import { toast } from 'react-toastify';
import CartToast from '../components/CartToast';
import { useNavigate } from 'react-router-dom';

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  const currency = '$';
  const delivery_fee = 10;
  const [search, setSearch] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [cartItems, setCartItems] = useState({});
  const navigate = useNavigate();

  const addToCart = (itemId, size) => {
    let cartData = structuredClone(cartItems);
    if (!size) {
      toast.error('Select Product Size');
    } else {
      toast(<CartToast />);
    }

    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1;
      } else {
        cartData[itemId][size] = 1;
      }
    } else {
      cartData[itemId] = {};
      cartData[itemId][size] = 1;
    }

    setCartItems(cartData);
  };

  const getCartCount = () => {
    let totalCount = 0;

    for (const itemId in cartItems) {
      for (const size in cartItems[itemId]) {
        totalCount += cartItems[itemId][size];
      }
    }

    return totalCount;
  };
  const removeFromCart = (itemId, size) => {
    let cartData = structuredClone(cartItems);

    if (cartData[itemId] && cartData[itemId][size]) {
      cartData[itemId][size] = 0;
    }

    setCartItems(cartData);
  };

  const updateQuantity = (itemId, size, quantity) => {
    let cartData = structuredClone(cartItems);

    cartData[itemId][size] = Number(quantity);

    setCartItems(cartData);
  };

  const value = {
    products,
    currency,
    delivery_fee,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    cartItems,
    removeFromCart,
    addToCart,
    getCartCount,
    updateQuantity,
    navigate,
  };

  return (
    <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>
  );
};

export default ShopContextProvider;
