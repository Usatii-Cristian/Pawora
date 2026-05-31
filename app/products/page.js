import Link from 'next/link';
import { getProducts, CATEGORIES } from '@/lib/store';
import ProductGrid from '@/components/ui/ProductGrid';

export const metadata = {
  title: 'Produse — AquaPet',
  description: 'Navighează toată gama noastră de produse premium pentru animale.',
};

export default async function ProductsPage({ searchParams }) {
  const params = await searchParams;
  const selectedCategory = params?.category || '';

  const allProducts = getProducts();
  const products = selectedCategory
    ? allProducts.filter((p) => p.category === selectedCategory)
    : allProducts;

  const currentCategoryName = selectedCategory
    ? CATEGORIES.find((c) => c.slug === selectedCategory)?.name || 'Produse'
    : 'Toate produsele';

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="bg-white border-b border-stone-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <nav className="flex items-center gap-2 text-sm text-stone-500 mb-3">
            <Link href="/" className="hover:text-stone-900 transition-colors">
              Acasă
            </Link>
            <span>/</span>
            <span className="text-stone-900 font-medium">{currentCategoryName}</span>
          </nav>
          <h1 className="text-3xl font-bold text-stone-900">
            {currentCategoryName}
          </h1>
          <p className="text-stone-500 mt-1 text-sm">
            {products.length} {products.length === 1 ? 'produs disponibil' : 'produse disponibile'}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filtre */}
        <div className="flex flex-wrap gap-2 mb-8">
          <Link
            href="/products"
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              !selectedCategory
                ? 'bg-green-700 text-white shadow-sm'
                : 'bg-white text-stone-600 border border-stone-200 hover:bg-stone-50 hover:border-stone-300'
            }`}
          >
            Toate produsele
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

        {/* Grid produse cu paginare */}
        <ProductGrid key={selectedCategory} products={products} />
      </div>
    </div>
  );
}
