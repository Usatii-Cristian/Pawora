'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { Plus, ArrowDownUp } from 'lucide-react';
import ProductCard from '@/components/ui/ProductCard';

const PER_PAGE = 12;

const SUBCATEGORIES = [
  { value: '', label: 'Toate tipurile' },
  { value: 'food', label: 'Hrană' },
  { value: 'toys', label: 'Jucării' },
  { value: 'accessories', label: 'Accesorii' },
];

const SORTS = [
  { value: 'default', label: 'Recomandate' },
  { value: 'price-asc', label: 'Preț crescător' },
  { value: 'price-desc', label: 'Preț descrescător' },
  { value: 'name', label: 'Nume (A–Z)' },
];

export default function ProductGrid({ products }) {
  const [visible, setVisible] = useState(PER_PAGE);
  const [sub, setSub] = useState('');
  const [sort, setSort] = useState('default');

  const filtered = useMemo(() => {
    let list = sub ? products.filter((p) => p.subcategory === sub) : [...products];
    if (sort === 'price-asc') list.sort((a, b) => a.price - b.price);
    else if (sort === 'price-desc') list.sort((a, b) => b.price - a.price);
    else if (sort === 'name') list.sort((a, b) => a.name.localeCompare(b.name, 'ro'));
    return list;
  }, [products, sub, sort]);

  // resetează paginarea când se schimbă filtrul/sortarea
  const shown = filtered.slice(0, visible);
  const hasMore = visible < filtered.length;

  const onSub = (v) => { setSub(v); setVisible(PER_PAGE); };
  const onSort = (v) => { setSort(v); setVisible(PER_PAGE); };

  return (
    <>
      {/* Bara de control */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        {/* Filtru subcategorie — pills */}
        <div className="flex flex-wrap gap-2">
          {SUBCATEGORIES.map((s) => (
            <button
              key={s.value}
              onClick={() => onSub(s.value)}
              className={`px-3.5 py-1.5 rounded-full text-sm font-medium transition-colors ${
                sub === s.value
                  ? 'bg-stone-900 text-white'
                  : 'bg-white text-stone-600 border border-stone-200 hover:bg-stone-50'
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>

        {/* Sortare */}
        <div className="relative">
          <ArrowDownUp className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <select
            value={sort}
            onChange={(e) => onSort(e.target.value)}
            className="appearance-none bg-white border border-stone-200 rounded-full pl-9 pr-8 py-2 text-sm font-medium text-stone-700 outline-none focus:border-green-500 cursor-pointer hover:bg-stone-50 transition-colors"
          >
            {SORTS.map((s) => (
              <option key={s.value} value={s.value}>{s.label}</option>
            ))}
          </select>
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-24">
          <p className="text-stone-400 text-lg font-medium">Niciun produs pentru acest filtru</p>
          <button
            onClick={() => onSub('')}
            className="mt-4 inline-block text-green-700 text-sm font-medium hover:underline"
          >
            Vezi toate produsele
          </button>
        </div>
      ) : (
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
              <p className="text-xs text-stone-400">{shown.length} din {filtered.length} produse</p>
            </div>
          )}
        </>
      )}
    </>
  );
}
