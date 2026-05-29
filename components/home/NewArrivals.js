import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';
import { PRODUCTS } from '@/lib/mockData';
import ProductCard from '@/components/ui/ProductCard';

export default function NewArrivals() {
  const newProducts = PRODUCTS.filter((p) => p.newArrival).slice(0, 4);

  return (
    <section className="py-16 bg-stone-50/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-8">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Sparkles className="w-4 h-4 text-green-600" />
              <p className="text-sm font-medium text-green-700">Just arrived</p>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-stone-900">
              New Arrivals
            </h2>
          </div>
          <Link
            href="/products"
            className="hidden sm:flex items-center gap-1.5 text-sm font-medium text-stone-600 hover:text-green-700 transition-colors"
          >
            View all
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
          {newProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
