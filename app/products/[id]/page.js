import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { ChevronRight, Package, Star } from 'lucide-react';
import { getProducts, CATEGORIES } from '@/lib/store';
import ProductCard from '@/components/ui/ProductCard';
import AddToCartButton from '@/components/ui/AddToCartButton';
import WishlistButton from '@/components/ui/WishlistButton';

export async function generateStaticParams() {
  return getProducts().map((p) => ({ id: p.slug || p.id }));
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const product = getProducts().find((p) => p.slug === id || p.id === id);
  if (!product) return {};
  return {
    title: `${product.name} — Pawora`,
    description: product.description.slice(0, 155),
    openGraph: {
      title: product.name,
      description: product.description.slice(0, 155),
      images: [{ url: product.image }],
    },
  };
}

export default async function ProductDetailPage({ params }) {
  const { id } = await params;
  const products = getProducts();
  const product = products.find((p) => p.slug === id || p.id === id);

  if (!product) notFound();

  const category = CATEGORIES.find((c) => c.slug === product.category);
  const related = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const categoryDisplay =
    category?.name ||
    product.category.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());

  const subcategoryRo = {
    food: 'Hrană',
    toys: 'Jucării',
    accessories: 'Accesorii',
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="border-b border-stone-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center gap-1.5 text-sm text-stone-500 flex-wrap">
            <Link href="/" className="hover:text-stone-900 transition-colors">
              Acasă
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
            <Link href="/products" className="hover:text-stone-900 transition-colors">
              Produse
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
            <Link
              href={`/products?category=${product.category}`}
              className="hover:text-stone-900 transition-colors"
            >
              {categoryDisplay}
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
            <span className="text-stone-900 font-medium line-clamp-1">
              {product.name}
            </span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 mb-20">
          {/* Imagine */}
          <div className="relative aspect-square rounded-3xl overflow-hidden bg-stone-50 border border-stone-100">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
            />
            {product.bestseller && (
              <span className="absolute top-5 left-5 bg-orange-500 text-white text-sm font-semibold px-3 py-1.5 rounded-full">
                Bestseller
              </span>
            )}
            {product.newArrival && !product.bestseller && (
              <span className="absolute top-5 left-5 bg-green-700 text-white text-sm font-semibold px-3 py-1.5 rounded-full">
                Noutate
              </span>
            )}
          </div>

          {/* Detalii */}
          <div className="flex flex-col justify-center">
            <Link
              href={`/products?category=${product.category}`}
              className="inline-flex items-center text-sm font-medium text-green-700 bg-green-50 px-3 py-1.5 rounded-full w-fit mb-4 hover:bg-green-100 transition-colors"
            >
              {categoryDisplay}
            </Link>

            <h1 className="text-3xl sm:text-4xl font-bold text-stone-900 leading-tight mb-4">
              {product.name}
            </h1>

            <div className="flex items-center gap-2 mb-5">
              <div className="flex items-center gap-0.5">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} className="w-4 h-4 text-orange-400 fill-orange-400" />
                ))}
              </div>
              <span className="text-sm text-stone-500">4.9 (128 recenzii)</span>
            </div>

            <p className="text-stone-600 leading-relaxed mb-7 text-base">
              {product.description}
            </p>

            {/* Preț și stoc */}
            <div className="flex items-center gap-4 mb-7">
              <span className="text-4xl font-bold text-stone-900">
                {product.price} lei
              </span>
              {product.stock > 0 ? (
                <span className="flex items-center gap-1.5 text-sm font-medium text-green-700 bg-green-50 px-3 py-1.5 rounded-full border border-green-100">
                  <Package className="w-3.5 h-3.5" />
                  În stoc ({product.stock} unități)
                </span>
              ) : (
                <span className="text-sm font-medium text-red-600 bg-red-50 px-3 py-1.5 rounded-full border border-red-100">
                  Stoc epuizat
                </span>
              )}
            </div>

            {product.stock > 0 && (
              <div className="flex flex-col sm:flex-row gap-3 items-start flex-wrap">
                <AddToCartButton product={product} />
                <WishlistButton product={product} />
                <Link
                  href="/cart"
                  className="flex items-center gap-2 px-8 py-4 rounded-2xl font-semibold text-base text-stone-700 border border-stone-200 hover:bg-stone-50 transition-colors"
                >
                  Vezi coșul
                </Link>
              </div>
            )}

            <div className="mt-8 pt-8 border-t border-stone-100 grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-stone-500 mb-0.5">Categorie</p>
                <p className="text-sm font-medium text-stone-900">{categoryDisplay}</p>
              </div>
              {product.subcategory && (
                <div>
                  <p className="text-xs text-stone-500 mb-0.5">Tip</p>
                  <p className="text-sm font-medium text-stone-900">
                    {subcategoryRo[product.subcategory] || product.subcategory}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Produse similare */}
        {related.length > 0 && (
          <div>
            <div className="flex items-end justify-between mb-6">
              <h2 className="text-2xl font-bold text-stone-900">
                Mai mult din {categoryDisplay}
              </h2>
              <Link
                href={`/products?category=${product.category}`}
                className="text-sm font-medium text-stone-500 hover:text-green-700 transition-colors"
              >
                Vezi toate
              </Link>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
