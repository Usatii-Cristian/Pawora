import Link from 'next/link';
import { ArrowRight, TrendingUp } from 'lucide-react';
import { getProducts } from '@/lib/store';
import ProductCard from '@/components/ui/ProductCard';
import FadeIn from '@/components/ui/FadeIn';

export default function BestSellers() {
  const bestsellers = getProducts().filter((p) => p.bestseller).slice(0, 4);

  return (
    <section className="py-20 relative overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #f0fdf4 0%, #fff7ed 100%)' }}>

      <div className="absolute -bottom-16 -left-16 w-64 h-64 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(253,186,116,0.3) 0%, transparent 70%)' }} />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="inline-flex items-center gap-1.5 text-xs font-semibold text-orange-700 bg-orange-50 border border-orange-100 px-3 py-1 rounded-full mb-3 uppercase tracking-wider">
                <TrendingUp className="w-3 h-3" />
                Cele mai populare
              </p>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900">
                Cele mai{' '}
                <span className="text-transparent bg-clip-text"
                  style={{ backgroundImage: 'linear-gradient(135deg, #ea580c, #f59e0b)' }}>
                  vândute
                </span>
              </h2>
            </div>
            <Link
              href="/products"
              className="hidden sm:flex items-center gap-1.5 text-sm font-semibold text-stone-500 hover:text-orange-600 transition-colors group"
            >
              Vezi toate
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
        </FadeIn>

        <FadeIn delay={80}>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {bestsellers.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
