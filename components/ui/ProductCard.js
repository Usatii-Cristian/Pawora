'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ShoppingCart, Check, Heart } from 'lucide-react';
import { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { useToast } from '@/context/ToastContext';
import { useWishlist } from '@/context/WishlistContext';
import { getCategoryLabel } from '@/lib/categories';

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const { addToast } = useToast();
  const { toggle, isWishlisted } = useWishlist();
  const [added, setAdded] = useState(false);
  const wishlisted = isWishlisted(product.id);

  const handleAdd = () => {
    addToCart(product);
    const label = product.name.length > 32 ? `${product.name.slice(0, 32)}…` : product.name;
    addToast({ message: `${label} adăugat în coș!` });
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const handleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggle(product);
    addToast({
      message: wishlisted ? 'Scos din favorite' : 'Adăugat la favorite',
      type: wishlisted ? 'info' : 'success',
    });
  };

  return (
    <article className="group bg-white rounded-2xl overflow-hidden border border-stone-100 shadow-sm hover:shadow-xl hover:shadow-stone-900/8 transition-all duration-300 hover:-translate-y-1">
      <Link href={`/products/${product.slug || product.id}`} className="block">
        <div className="relative aspect-square overflow-hidden bg-stone-50">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />

          {/* Shimmer overlay on hover */}
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none" />

          {/* Wishlist button */}
          <button
            onClick={handleWishlist}
            className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 shadow-sm ${
              wishlisted
                ? 'bg-red-500 text-white opacity-100'
                : 'bg-white/90 text-stone-400 hover:text-red-500 opacity-0 group-hover:opacity-100 hover:scale-110'
            }`}
            aria-label={wishlisted ? 'Scoate din favorite' : 'Adaugă la favorite'}
          >
            <Heart className={`w-3.5 h-3.5 ${wishlisted ? 'fill-white' : ''}`} />
          </button>
        </div>

        <div className="p-4 pb-3">
          <span className="inline-block text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">
            {getCategoryLabel(product.category)}
          </span>
          <h3 className="font-semibold text-stone-900 text-sm leading-snug line-clamp-2 mt-2 group-hover:text-green-700 transition-colors duration-200">
            {product.name}
          </h3>
          <p className="font-bold text-stone-900 text-base mt-2">
            {product.price}{' '}
            <span className="text-xs font-medium text-stone-500">lei</span>
          </p>
        </div>
      </Link>

      <div className="px-4 pb-4">
        {product.stock > 0 ? (
          <button
            onClick={handleAdd}
            className={`w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
              added
                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                : 'bg-stone-900 text-white hover:bg-green-700 active:scale-95 hover:shadow-md hover:shadow-green-900/20'
            }`}
          >
            {added ? (
              <><Check className="w-4 h-4" />Adăugat!</>
            ) : (
              <><ShoppingCart className="w-4 h-4" />Adaugă în coș</>
            )}
          </button>
        ) : (
          <div className="w-full flex items-center justify-center py-2.5 rounded-xl text-sm font-medium bg-stone-100 text-stone-400 cursor-not-allowed">
            Stoc epuizat
          </div>
        )}
      </div>
    </article>
  );
}
