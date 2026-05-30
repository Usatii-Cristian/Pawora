'use client';

import Link from 'next/link';
import { Heart, ArrowRight, ShoppingCart } from 'lucide-react';
import { useWishlist } from '@/context/WishlistContext';
import { useCart } from '@/context/CartContext';
import { useToast } from '@/context/ToastContext';
import ProductCard from '@/components/ui/ProductCard';

export default function WishlistPage() {
  const { items, count } = useWishlist();
  const { addToCart } = useCart();
  const { addToast } = useToast();

  const addAllToCart = () => {
    items.forEach((p) => addToCart(p));
    addToast({ message: `${count} produse adăugate în coș!` });
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-stone-50 flex items-center justify-center px-4">
        <div className="text-center max-w-sm">
          <div className="w-20 h-20 bg-red-50 rounded-3xl flex items-center justify-center mx-auto mb-5">
            <Heart className="w-9 h-9 text-red-300" />
          </div>
          <h2 className="text-2xl font-bold text-stone-900 mb-2">
            Lista ta de favorite e goală
          </h2>
          <p className="text-stone-500 mb-8">
            Apasă iconița inimii pe orice produs pentru a-l salva la favorite.
          </p>
          <Link
            href="/products"
            className="inline-flex items-center gap-2 bg-green-700 text-white font-semibold px-6 py-3.5 rounded-xl hover:bg-green-800 transition-colors"
          >
            Navighează produse
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-50">
      <div className="bg-white border-b border-stone-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex items-center justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-3xl font-bold text-stone-900">Favorite</h1>
            <p className="text-stone-500 mt-1 text-sm">
              {count} {count === 1 ? 'produs salvat' : 'produse salvate'}
            </p>
          </div>
          {count > 1 && (
            <button
              onClick={addAllToCart}
              className="flex items-center gap-2 bg-green-700 text-white font-semibold px-5 py-2.5 rounded-xl hover:bg-green-800 transition-colors text-sm"
            >
              <ShoppingCart className="w-4 h-4" />
              Adaugă toate în coș
            </button>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
          {items.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}
