import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { verifyToken } from '@/lib/jwt';
import { getProducts, CATEGORIES } from '@/lib/store';
import { Plus, ExternalLink, Pencil } from 'lucide-react';
import AdminDeleteButton from '@/components/admin/AdminDeleteButton';

export const metadata = { title: 'Products — AquaPet Admin' };

export default async function AdminProductsPage({ searchParams }) {
  const cookieStore = await cookies();
  const token = cookieStore.get('admin-token')?.value;
  if (!token) redirect('/admin/login');
  const payload = await verifyToken(token);
  if (!payload) redirect('/admin/login');

  const params = await searchParams;
  const selectedCategory = params?.category || '';

  const allProducts = getProducts();
  const filtered = selectedCategory
    ? allProducts.filter((p) => p.category === selectedCategory)
    : allProducts;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-stone-900">Products</h1>
          <p className="text-stone-500 text-sm mt-0.5">
            {filtered.length} produse afișate
          </p>
        </div>
        <Link
          href="/admin/products/new"
          className="flex items-center gap-2 bg-green-700 text-white font-semibold px-5 py-2.5 rounded-xl hover:bg-green-800 transition-colors text-sm"
        >
          <Plus className="w-4 h-4" />
          Adaugă produs
        </Link>
      </div>

      {/* Category filter */}
      <div className="flex flex-wrap gap-2 mb-6">
        <Link
          href="/admin/products"
          className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
            !selectedCategory
              ? 'bg-stone-900 text-white'
              : 'bg-white text-stone-600 border border-stone-200 hover:bg-stone-50'
          }`}
        >
          Toate
        </Link>
        {CATEGORIES.map((cat) => (
          <Link
            key={cat.slug}
            href={`/admin/products?category=${cat.slug}`}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
              selectedCategory === cat.slug
                ? 'bg-stone-900 text-white'
                : 'bg-white text-stone-600 border border-stone-200 hover:bg-stone-50'
            }`}
          >
            {cat.name}
          </Link>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-stone-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[700px]">
            <thead>
              <tr className="bg-stone-50 border-b border-stone-100">
                {['Produs', 'Categorie', 'Preț', 'Stoc', 'Status', 'Acțiuni'].map(
                  (h) => (
                    <th
                      key={h}
                      className="text-left text-xs font-semibold text-stone-500 uppercase tracking-wider px-5 py-3"
                    >
                      {h}
                    </th>
                  )
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-50">
              {filtered.map((product) => (
                <tr
                  key={product.id}
                  className="hover:bg-stone-50/50 transition-colors group"
                >
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl overflow-hidden bg-stone-100 shrink-0">
                        <Image
                          src={product.image}
                          alt={product.name}
                          width={40}
                          height={40}
                          className="object-cover w-full h-full"
                        />
                      </div>
                      <div>
                        <div className="font-medium text-stone-900 text-sm leading-snug">
                          {product.name}
                        </div>
                        <div className="text-[11px] font-mono text-stone-400 mt-0.5">
                          /{product.slug}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-3.5">
                    <span className="text-xs bg-stone-100 text-stone-600 px-2.5 py-1 rounded-full capitalize font-medium">
                      {product.category.replace(/-/g, ' ')}
                    </span>
                  </td>
                  <td className="px-5 py-3.5 text-sm font-bold text-stone-900">
                    {product.price} lei
                  </td>
                  <td className="px-5 py-3.5">
                    <span
                      className={`text-sm font-semibold ${
                        product.stock > 20
                          ? 'text-green-700'
                          : product.stock > 10
                          ? 'text-orange-600'
                          : 'text-red-600'
                      }`}
                    >
                      {product.stock}
                    </span>
                  </td>
                  <td className="px-5 py-3.5">
                    <div className="flex gap-1 flex-wrap">
                      {product.featured && (
                        <span className="text-[11px] bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full font-semibold">
                          Featured
                        </span>
                      )}
                      {product.bestseller && (
                        <span className="text-[11px] bg-orange-50 text-orange-700 px-2 py-0.5 rounded-full font-semibold">
                          Bestseller
                        </span>
                      )}
                      {product.newArrival && (
                        <span className="text-[11px] bg-green-50 text-green-700 px-2 py-0.5 rounded-full font-semibold">
                          New
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-1.5">
                      <Link
                        href={`/admin/products/${product.slug || product.id}/edit`}
                        className="p-1.5 text-stone-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="Editează"
                      >
                        <Pencil className="w-3.5 h-3.5" />
                      </Link>
                      <Link
                        href={`/products/${product.slug || product.id}`}
                        target="_blank"
                        className="p-1.5 text-stone-400 hover:text-stone-700 hover:bg-stone-100 rounded-lg transition-colors"
                        title="View on site"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </Link>
                      <AdminDeleteButton slug={product.slug || product.id} name={product.name} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
