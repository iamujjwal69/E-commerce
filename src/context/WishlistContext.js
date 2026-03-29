"use client"
import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';

const WishlistContext = createContext();
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://e-commerce-backend-production-ebd6.up.railway.app/api/v1';

export const WishlistProvider = ({ children }) => {
  const { token, openAuthModal } = useAuth();
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    if (token) {
      loadWishlist();
    } else {
      setWishlist([]);
    }
  }, [token]);

  const loadWishlist = async () => {
    try {
      const res = await axios.get(`${API_URL}/wishlist`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setWishlist(res.data.wishlist);
    } catch (error) {
      console.error("Failed to load wishlist", error);
    }
  };

  const toggleWishlist = async (productId) => {
    if (!token) {
      openAuthModal();
      return;
    }

    const isWished = isWishlisted(productId);
    try {
      if (isWished) {
        await axios.delete(`${API_URL}/wishlist/items/${productId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
      } else {
        await axios.post(`${API_URL}/wishlist/items`, { product_id: productId }, {
          headers: { Authorization: `Bearer ${token}` }
        });
      }
      await loadWishlist();
    } catch (error) {
      console.error("Failed to toggle wishlist", error);
    }
  };

  const isWishlisted = (productId) => {
    return wishlist.some(item => item.id === productId);
  };

  return (
    <WishlistContext.Provider value={{ wishlist, toggleWishlist, isWishlisted, loadWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => useContext(WishlistContext);
