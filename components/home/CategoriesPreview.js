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
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="flex items-end justify-between mb-8">
            <div>
              <p className="text-sm font-medium text-green-700 mb-1">
                Caută după animal
              </p>
              <h2 className="text-2xl sm:text-3xl font-bold text-stone-900">
                Cumpără după categorie
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
        </FadeIn>

        <FadeIn delay={60}>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
            {categories.map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        </FadeIn>

        <div className="mt-6 sm:hidden">
          <Link
            href="/products"
            className="flex items-center justify-center gap-1.5 text-sm font-medium text-green-700 hover:text-green-800 transition-colors"
          >
            Vezi toate produsele
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
