'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Plus } from 'lucide-react';
import ProductCard from '@/components/ui/ProductCard';

const PER_PAGE = 12;

export default function ProductGrid({ products }) {
  const [visible, setVisible] = useState(PER_PAGE);

  if (products.length === 0) {
    return (
      <div className="text-center py-24">
        <p className="text-stone-400 text-lg font-medium">Nu s-au găsit produse</p>
        <Link
          href="/products"
          className="mt-4 inline-block text-green-700 text-sm font-medium hover:underline"
        >
          Vezi toate produsele
        </Link>
      </div>
    );
  }

  const shown = products.slice(0, visible);
  const hasMore = visible < products.length;

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
        {shown.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {hasMore && (
        <div className="flex flex-col items-center gap-3 mt-10">
          <button
            onClick={() => setVisible((v) => v + PER_PAGE)}
            className="group inline-flex items-center gap-2 bg-stone-900 text-white font-semibold px-8 py-3.5 rounded-xl hover:bg-green-700 transition-all duration-200 active:scale-95 hover:shadow-lg hover:shadow-green-900/20"
          >
            <Plus className="w-4 h-4 transition-transform group-hover:rotate-90" />
            Afișează mai multe
          </button>
          <p className="text-xs text-stone-400">
            {shown.length} din {products.length} produse
          </p>
        </div>
      )}
    </>
  );
}
