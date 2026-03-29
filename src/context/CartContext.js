"use client"
import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';

const CartContext = createContext();
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://e-commerce-backend-production-ebd6.up.railway.app/api/v1';

export const CartProvider = ({ children }) => {
  const { token: auth_token, isReady } = useAuth();
  const [cart, setCart] = useState({ items: [], total: 0 });
  const [activeToken, setActiveToken] = useState(null);

  const registerGuest = async () => {
    const email = `guest_${Math.random().toString(36).substr(2, 9)}@ecommerce.local`;
    const res = await axios.post(`${API_URL}/users/register`, {
      email, password: 'guestpassword', first_name: 'Guest', last_name: 'User'
    });
    localStorage.setItem('guest_token', res.data.token);
    return res.data.token;
  };

  useEffect(() => {
    if (!isReady) return;

    const initCartToken = async () => {
      // If logged in, prefer real auth token
      if (auth_token) {
        setActiveToken(auth_token);
        return;
      }
      
      // Otherwise, use/create guest token
      let gToken = localStorage.getItem('guest_token');
      if (!gToken) {
        gToken = await registerGuest();
      } else {
        // Verify it works
        try {
          await axios.get(`${API_URL}/cart`, { headers: { Authorization: `Bearer ${gToken}` } });
        } catch (err) {
          localStorage.removeItem('guest_token');
          gToken = await registerGuest();
        }
      }
      setActiveToken(gToken);
    };
    initCartToken();
  }, [auth_token, isReady]);

  useEffect(() => {
    if (activeToken) loadCart();
  }, [activeToken]);

  const loadCart = async () => {
    if (!activeToken) return;
    try {
      const res = await axios.get(`${API_URL}/cart`, {
        headers: { Authorization: `Bearer ${activeToken}` }
      });
      setCart(res.data.cart);
    } catch (error) {
      console.error("Failed to load cart", error);
    }
  };

  const addItem = async (productId, quantity = 1) => {
    if (!activeToken) return;
    try {
      await axios.post(`${API_URL}/cart/items`, { product_id: productId, quantity }, {
        headers: { Authorization: `Bearer ${activeToken}` }
      });
      await loadCart();
    } catch (error) {
      console.error("Failed to add item", error);
    }
  };

  const updateItem = async (itemId, quantity) => {
    if (!activeToken) return;
    try {
      await axios.put(`${API_URL}/cart/items/${itemId}`, { quantity }, {
        headers: { Authorization: `Bearer ${activeToken}` }
      });
      await loadCart();
    } catch (error) {
      console.error("Failed to update item", error);
    }
  };

  const removeItem = async (itemId) => {
    if (!activeToken) return;
    try {
      await axios.delete(`${API_URL}/cart/items/${itemId}`, {
        headers: { Authorization: `Bearer ${activeToken}` }
      });
      await loadCart();
    } catch (error) {
      console.error("Failed to remove item", error);
    }
  };

  return (
    <CartContext.Provider value={{ cart, addItem, updateItem, removeItem, token: activeToken, loadCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
