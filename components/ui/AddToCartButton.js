'use client';

import { useState } from 'react';
import { ShoppingCart, Check } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useToast } from '@/context/ToastContext';

export default function AddToCartButton({ product }) {
  const { addToCart } = useCart();
  const { addToast } = useToast();
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    addToCart(product);
    addToast({ message: 'Produs adăugat în coș!' });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <button
      onClick={handleAdd}
      className={`flex items-center gap-3 px-8 py-4 rounded-2xl font-semibold text-base transition-all duration-200 active:scale-95 ${
        added
          ? 'bg-stone-100 text-stone-600 cursor-default'
          : 'bg-green-700 text-white hover:bg-green-800'
      }`}
    >
      {added ? (
        <>
          <Check className="w-5 h-5" />
          Adăugat în coș
        </>
      ) : (
        <>
          <ShoppingCart className="w-5 h-5" />
          Adaugă în coș
        </>
      )}
    </button>
  );
}
