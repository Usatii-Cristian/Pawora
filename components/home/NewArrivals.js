import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { getProducts } from '@/lib/store';
import ProductCard from '@/components/ui/ProductCard';
import FadeIn from '@/components/ui/FadeIn';

export default function NewArrivals() {
  const newProducts = getProducts().filter((p) => p.newArrival).slice(0, 8);

  return (
    <section className="py-20 bg-white relative overflow-hidden">
      <div className="absolute bottom-0 right-0 w-[500px] h-[300px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(196,181,253,0.2) 0%, transparent 70%)' }} />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="flex items-end justify-between mb-10">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900">
              Noutăți în magazin
            </h2>
            <Link
              href="/products"
              className="hidden sm:flex items-center gap-1.5 text-sm font-semibold text-stone-500 hover:text-violet-700 transition-colors group"
            >
              Vezi toate
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
        </FadeIn>

        <FadeIn delay={80}>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {newProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
