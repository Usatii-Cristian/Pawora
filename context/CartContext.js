'use client';

import { createContext, useContext, useReducer, useEffect, useMemo } from 'react';

const CartContext = createContext(null);

function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existing = state.find((item) => item.id === action.payload.id);
      if (existing) {
        return state.map((item) =>
          item.id === action.payload.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...state, { ...action.payload, quantity: 1 }];
    }
    case 'REMOVE_ITEM':
      return state.filter((item) => item.id !== action.payload);
    case 'UPDATE_QUANTITY':
      if (action.payload.quantity <= 0) {
        return state.filter((item) => item.id !== action.payload.id);
      }
      return state.map((item) =>
        item.id === action.payload.id
          ? { ...item, quantity: action.payload.quantity }
          : item
      );
    case 'CLEAR_CART':
      return [];
    case 'LOAD_CART':
      return action.payload;
    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const [items, dispatch] = useReducer(cartReducer, []);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('pawora-cart');
      if (saved) dispatch({ type: 'LOAD_CART', payload: JSON.parse(saved) });
    } catch {
      // Ignore parse errors
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('pawora-cart', JSON.stringify(items));
  }, [items]);

  const addToCart = (product) =>
    dispatch({ type: 'ADD_ITEM', payload: product });
  const removeFromCart = (id) =>
    dispatch({ type: 'REMOVE_ITEM', payload: id });
  const updateQuantity = (id, quantity) =>
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
  const clearCart = () => dispatch({ type: 'CLEAR_CART' });

  const itemCount = useMemo(
    () => items.reduce((sum, item) => sum + item.quantity, 0),
    [items]
  );
  const total = useMemo(
    () => items.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [items]
  );

  return (
    <CartContext.Provider
      value={{ items, itemCount, total, addToCart, removeFromCart, updateQuantity, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within CartProvider');
  return context;
}
