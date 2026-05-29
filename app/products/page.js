import Link from 'next/link';
import { PRODUCTS, CATEGORIES } from '@/lib/mockData';
import ProductCard from '@/components/ui/ProductCard';

export const metadata = {
  title: 'Products — Pawora',
  description: 'Browse our full range of premium pet products.',
};

export default async function ProductsPage({ searchParams }) {
  const params = await searchParams;
  const selectedCategory = params?.category || '';

  const products = selectedCategory
    ? PRODUCTS.filter((p) => p.category === selectedCategory)
    : PRODUCTS;

  const currentCategoryName = selectedCategory
    ? CATEGORIES.find((c) => c.slug === selectedCategory)?.name || 'Products'
    : 'All Products';

  return (
    <div className="min-h-screen">
      {/* Page header */}
      <div className="bg-white border-b border-stone-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <nav className="flex items-center gap-2 text-sm text-stone-500 mb-3">
            <Link href="/" className="hover:text-stone-900 transition-colors">
              Home
            </Link>
            <span>/</span>
            <span className="text-stone-900 font-medium">{currentCategoryName}</span>
          </nav>
          <h1 className="text-3xl font-bold text-stone-900">
            {currentCategoryName}
          </h1>
          <p className="text-stone-500 mt-1 text-sm">
            {products.length} {products.length === 1 ? 'product' : 'products'} available
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filter pills */}
        <div className="flex flex-wrap gap-2 mb-8">
          <Link
            href="/products"
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              !selectedCategory
                ? 'bg-green-700 text-white shadow-sm'
                : 'bg-white text-stone-600 border border-stone-200 hover:bg-stone-50 hover:border-stone-300'
            }`}
          >
            All Products
          </Link>
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.slug}
              href={`/products?category=${cat.slug}`}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedCategory === cat.slug
                  ? 'bg-green-700 text-white shadow-sm'
                  : 'bg-white text-stone-600 border border-stone-200 hover:bg-stone-50 hover:border-stone-300'
              }`}
            >
              {cat.name}
            </Link>
          ))}
        </div>

        {/* Products grid */}
        {products.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-24">
            <p className="text-stone-400 text-lg font-medium">No products found</p>
            <Link
              href="/products"
              className="mt-4 inline-block text-green-700 text-sm font-medium hover:underline"
            >
              View all products
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
