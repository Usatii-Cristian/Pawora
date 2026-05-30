import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { CATEGORIES, getProducts } from '@/lib/store';
import CategoryCard from '@/components/ui/CategoryCard';
import FadeIn from '@/components/ui/FadeIn';

export default function CategoriesPreview() {
  const products = getProducts();
  const categories = CATEGORIES.map((cat) => ({
    ...cat,
    productCount: products.filter((p) => p.category === cat.slug).length,
  }));

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Subtle background */}
      <div className="absolute inset-0 bg-gradient-to-b from-stone-50 to-white" />
      {/* Decorative blobs */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] bg-green-100/40 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-100 px-3 py-1 rounded-full mb-3 uppercase tracking-wider">
                Categorii
              </p>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900">
                Cumpără după{' '}
                <span className="text-gradient-dark">categorie</span>
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
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {categories.map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        </FadeIn>

        <div className="mt-6 sm:hidden text-center">
          <Link
            href="/products"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-green-700 hover:text-green-800 transition-colors"
          >
            Vezi toate produsele
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
