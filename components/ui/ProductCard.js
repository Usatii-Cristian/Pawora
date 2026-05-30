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
    <article className="group bg-white rounded-2xl overflow-hidden border border-stone-100 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-0.5">
      <Link href={`/products/${product.slug || product.id}`} className="block">
        <div className="relative aspect-square overflow-hidden bg-stone-50">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />

          {/* Badge */}
          {product.bestseller && (
            <span className="absolute top-3 left-3 bg-orange-500 text-white text-xs font-semibold px-2.5 py-1 rounded-full">
              Bestseller
            </span>
          )}
          {product.newArrival && !product.bestseller && (
            <span className="absolute top-3 left-3 bg-green-700 text-white text-xs font-semibold px-2.5 py-1 rounded-full">
              Nou
            </span>
          )}

          {/* Wishlist button */}
          <button
            onClick={handleWishlist}
            className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-all shadow-sm ${
              wishlisted
                ? 'bg-red-500 text-white opacity-100'
                : 'bg-white text-stone-400 hover:text-red-500 opacity-0 group-hover:opacity-100'
            }`}
            aria-label={wishlisted ? 'Scoate din favorite' : 'Adaugă la favorite'}
          >
            <Heart className={`w-3.5 h-3.5 ${wishlisted ? 'fill-white' : ''}`} />
          </button>
        </div>

        <div className="p-4 pb-3">
          <span className="inline-block text-xs font-medium text-green-700 bg-green-50 px-2 py-0.5 rounded-full">
            {getCategoryLabel(product.category)}
          </span>
          <h3 className="font-semibold text-stone-900 text-sm leading-snug line-clamp-2 mt-2 group-hover:text-green-700 transition-colors">
            {product.name}
          </h3>
          <p className="font-bold text-stone-900 text-base mt-2">
            {product.price} lei
          </p>
        </div>
      </Link>

      <div className="px-4 pb-4">
        {product.stock > 0 ? (
          <button
            onClick={handleAdd}
            className={`w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
              added
                ? 'bg-green-50 text-green-700 border border-green-200'
                : 'bg-green-700 text-white hover:bg-green-800 active:scale-95'
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
