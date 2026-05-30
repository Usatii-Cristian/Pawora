'use client';

import { createContext, useContext, useReducer, useEffect } from 'react';

const WishlistContext = createContext(null);

function reducer(state, action) {
  switch (action.type) {
    case 'TOGGLE': {
      const exists = state.find((p) => p.id === action.payload.id);
      return exists
        ? state.filter((p) => p.id !== action.payload.id)
        : [...state, action.payload];
    }
    case 'LOAD':
      return action.payload;
    default:
      return state;
  }
}

export function WishlistProvider({ children }) {
  const [items, dispatch] = useReducer(reducer, []);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('aquapet-wishlist');
      if (saved) dispatch({ type: 'LOAD', payload: JSON.parse(saved) });
    } catch {}
  }, []);

  useEffect(() => {
    localStorage.setItem('aquapet-wishlist', JSON.stringify(items));
  }, [items]);

  const toggle = (product) => dispatch({ type: 'TOGGLE', payload: product });
  const isWishlisted = (id) => items.some((p) => p.id === id);

  return (
    <WishlistContext.Provider
      value={{ items, toggle, isWishlisted, count: items.length }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (!context) throw new Error('useWishlist must be used within WishlistProvider');
  return context;
}
