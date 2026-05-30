import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';
import { getProducts } from '@/lib/store';
import ProductCard from '@/components/ui/ProductCard';
import FadeIn from '@/components/ui/FadeIn';

export default function FeaturedProducts() {
  const featured = getProducts().filter((p) => p.featured).slice(0, 8);

  return (
    <section className="py-20 bg-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(167,243,208,0.3) 0%, transparent 70%)' }} />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-100 px-3 py-1 rounded-full mb-3 uppercase tracking-wider">
                <Sparkles className="w-3 h-3" />
                Selecționate pentru tine
              </p>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900">
                Produse{' '}
                <span className="text-gradient-dark">recomandate</span>
              </h2>
            </div>
            <Link
              href="/products"
              className="hidden sm:flex items-center gap-1.5 text-sm font-semibold text-stone-500 hover:text-green-700 transition-colors group"
            >
              Vezi toate
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
        </FadeIn>

        <FadeIn delay={80}>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {featured.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
