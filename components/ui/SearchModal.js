'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Search, X, ArrowRight } from 'lucide-react';
import { PRODUCTS } from '@/lib/mockData';
import { getCategoryLabel } from '@/lib/categories';

export default function SearchModal({ onClose }) {
  const [query, setQuery] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
    document.body.style.overflow = 'hidden';
    const handleEsc = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handleEsc);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleEsc);
    };
  }, [onClose]);

  const results =
    query.trim().length >= 2
      ? PRODUCTS.filter(
          (p) =>
            p.name.toLowerCase().includes(query.toLowerCase()) ||
            p.description.toLowerCase().includes(query.toLowerCase()) ||
            getCategoryLabel(p.category).toLowerCase().includes(query.toLowerCase())
        ).slice(0, 7)
      : [];

  return (
    <div
      className="fixed inset-0 z-[200] bg-black/40 backdrop-blur-sm flex items-start justify-center pt-20 px-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-xl bg-white rounded-2xl shadow-2xl overflow-hidden animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Input */}
        <div className="flex items-center gap-3 px-5 py-4 border-b border-stone-100">
          <Search className="w-5 h-5 text-stone-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Caută produse..."
            className="flex-1 text-base outline-none text-stone-900 placeholder:text-stone-400 bg-transparent"
          />
          <button
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-stone-700 hover:bg-stone-100 rounded-lg transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results */}
        {results.length > 0 && (
          <div className="max-h-[420px] overflow-y-auto divide-y divide-stone-50">
            {results.map((product) => (
              <Link
                key={product.id}
                href={`/products/${product.slug || product.id}`}
                onClick={onClose}
                className="flex items-center gap-4 px-5 py-3.5 hover:bg-stone-50 transition-colors group"
              >
                <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-stone-100 shrink-0">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover"
                    sizes="48px"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-stone-900 text-sm truncate group-hover:text-green-700 transition-colors">
                    {product.name}
                  </p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-xs text-stone-500">
                      {getCategoryLabel(product.category)}
                    </span>
                    <span className="text-xs text-stone-300">·</span>
                    <span className="text-xs font-semibold text-green-700">
                      {product.price} lei
                    </span>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-stone-300 group-hover:text-green-600 transition-colors shrink-0" />
              </Link>
            ))}
          </div>
        )}

        {query.trim().length >= 2 && results.length === 0 && (
          <div className="px-5 py-10 text-center text-stone-400 text-sm">
            Nu am găsit produse pentru &ldquo;{query}&rdquo;
          </div>
        )}

        {query.trim().length < 2 && (
          <div className="px-5 py-8 text-center text-stone-400 text-sm">
            Scrie cel puțin 2 caractere pentru a căuta
          </div>
        )}
      </div>
    </div>
  );
}
