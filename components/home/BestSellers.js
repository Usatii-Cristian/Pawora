import Link from 'next/link';
import { ArrowRight, TrendingUp } from 'lucide-react';
import { PRODUCTS } from '@/lib/mockData';
import ProductCard from '@/components/ui/ProductCard';

export default function BestSellers() {
  const bestsellers = PRODUCTS.filter((p) => p.bestseller).slice(0, 4);

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-8">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <TrendingUp className="w-4 h-4 text-orange-500" />
              <p className="text-sm font-medium text-orange-600">Cele mai populare</p>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-stone-900">
              Cele mai vândute
            </h2>
          </div>
          <Link
            href="/products"
            className="hidden sm:flex items-center gap-1.5 text-sm font-medium text-stone-600 hover:text-green-700 transition-colors"
          >
            Vezi toate
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
          {bestsellers.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
