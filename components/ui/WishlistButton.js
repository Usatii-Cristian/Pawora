'use client';

import { Heart } from 'lucide-react';
import { useWishlist } from '@/context/WishlistContext';
import { useToast } from '@/context/ToastContext';

export default function WishlistButton({ product }) {
  const { toggle, isWishlisted } = useWishlist();
  const { addToast } = useToast();
  const wishlisted = isWishlisted(product.id);

  const handleToggle = () => {
    toggle(product);
    addToast({
      message: wishlisted ? 'Scos din favorite' : 'Adăugat la favorite',
      type: wishlisted ? 'info' : 'success',
    });
  };

  return (
    <button
      onClick={handleToggle}
      className={`flex items-center gap-2 px-6 py-4 rounded-2xl font-semibold text-base transition-all border ${
        wishlisted
          ? 'bg-red-50 text-red-600 border-red-100 hover:bg-red-100'
          : 'bg-white text-stone-600 border-stone-200 hover:bg-stone-50'
      }`}
    >
      <Heart className={`w-5 h-5 ${wishlisted ? 'fill-red-500 text-red-500' : ''}`} />
      {wishlisted ? 'La favorite' : 'Salvează'}
    </button>
  );
}
