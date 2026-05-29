'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ShoppingCart, Check } from 'lucide-react';
import { useState } from 'react';
import { useCart } from '@/context/CartContext';

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const categoryDisplay = product.category
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase());

  return (
    <article className="group bg-white rounded-2xl overflow-hidden border border-stone-100 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-0.5">
      <Link href={`/products/${product.id}`} className="block">
        <div className="relative aspect-square overflow-hidden bg-stone-50">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />
          {product.bestseller && (
            <span className="absolute top-3 left-3 bg-orange-500 text-white text-xs font-semibold px-2.5 py-1 rounded-full">
              Bestseller
            </span>
          )}
          {product.newArrival && !product.bestseller && (
            <span className="absolute top-3 left-3 bg-green-700 text-white text-xs font-semibold px-2.5 py-1 rounded-full">
              New
            </span>
          )}
        </div>

        <div className="p-4 pb-3">
          <span className="inline-block text-xs font-medium text-green-700 bg-green-50 px-2 py-0.5 rounded-full">
            {categoryDisplay}
          </span>
          <h3 className="font-semibold text-stone-900 text-sm leading-snug line-clamp-2 mt-2 group-hover:text-green-700 transition-colors">
            {product.name}
          </h3>
          <p className="font-bold text-stone-900 text-base mt-2">
            ${product.price.toFixed(2)}
          </p>
        </div>
      </Link>

      <div className="px-4 pb-4">
        <button
          onClick={handleAdd}
          className={`w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
            added
              ? 'bg-green-50 text-green-700 border border-green-200'
              : 'bg-green-700 text-white hover:bg-green-800 active:scale-95'
          }`}
        >
          {added ? (
            <>
              <Check className="w-4 h-4" />
              Added to Cart
            </>
          ) : (
            <>
              <ShoppingCart className="w-4 h-4" />
              Add to Cart
            </>
          )}
        </button>
      </div>
    </article>
  );
}
