import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { verifyToken } from '@/lib/jwt';
import { getProducts, CATEGORIES } from '@/lib/store';
import { Package, Tag, TrendingUp, Sparkles, ExternalLink, CheckCircle } from 'lucide-react';

export const metadata = { title: 'Dashboard — AquaPet Admin' };

export default async function AdminDashboardPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get('admin-token')?.value;
  if (!token) redirect('/admin/login');
  const payload = await verifyToken(token);
  if (!payload) redirect('/admin/login');

  const products = getProducts();

  const stats = [
    {
      label: 'Total Produse',
      value: products.length,
      icon: Package,
      color: 'text-blue-700',
      bg: 'bg-blue-50',
      border: 'border-blue-100',
    },
    {
      label: 'Categorii',
      value: CATEGORIES.length,
      icon: Tag,
      color: 'text-green-700',
      bg: 'bg-green-50',
      border: 'border-green-100',
    },
    {
      label: 'Featured',
      value: products.filter((p) => p.featured).length,
      icon: TrendingUp,
      color: 'text-orange-700',
      bg: 'bg-orange-50',
      border: 'border-orange-100',
    },
    {
      label: 'Noutăți',
      value: products.filter((p) => p.newArrival).length,
      icon: Sparkles,
      color: 'text-violet-700',
      bg: 'bg-violet-50',
      border: 'border-violet-100',
    },
  ];

  const totalStock = products.reduce((sum, p) => sum + p.stock, 0);
  const lowStock = products.filter((p) => p.stock <= 10);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-stone-900">Dashboard</h1>
          <p className="text-stone-500 text-sm mt-0.5">
            Conectat ca{' '}
            <span className="font-medium text-stone-700">{payload.email}</span>
          </p>
        </div>
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-1.5 text-sm font-medium text-stone-600 bg-white border border-stone-200 px-4 py-2 rounded-xl hover:bg-stone-50 transition-colors"
        >
          <ExternalLink className="w-3.5 h-3.5" />
          View Site
        </Link>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {stats.map(({ label, value, icon: Icon, color, bg, border }) => (
          <div
            key={label}
            className={`bg-white rounded-2xl p-5 border ${border} shadow-sm`}
          >
            <div
              className={`w-10 h-10 rounded-xl ${bg} ${color} flex items-center justify-center mb-4`}
            >
              <Icon className="w-5 h-5" />
            </div>
            <div className="text-3xl font-extrabold text-stone-900 leading-none mb-1">
              {value}
            </div>
            <div className="text-sm text-stone-500">{label}</div>
          </div>
        ))}
      </div>

      {/* Low stock alert */}
      {lowStock.length > 0 && (
        <div className="bg-orange-50 border border-orange-200 rounded-2xl px-5 py-4 mb-6 flex items-start gap-3">
          <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center shrink-0 mt-0.5">
            <Package className="w-4 h-4 text-orange-700" />
          </div>
          <div>
            <p className="font-semibold text-orange-900 text-sm">
              {lowStock.length} produse cu stoc scăzut
            </p>
            <p className="text-xs text-orange-700 mt-0.5">
              {lowStock.map((p) => p.name).slice(0, 3).join(', ')}
              {lowStock.length > 3 ? ` și alte ${lowStock.length - 3}` : ''}
            </p>
          </div>
        </div>
      )}

      {/* Products table */}
      <div className="bg-white rounded-2xl border border-stone-100 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-stone-100 flex items-center justify-between">
          <h2 className="font-semibold text-stone-900">Toate produsele</h2>
          <div className="flex items-center gap-3 text-xs text-stone-500">
            <span className="bg-stone-50 px-2.5 py-1 rounded-full border border-stone-100">
              {products.length} produse
            </span>
            <span className="bg-stone-50 px-2.5 py-1 rounded-full border border-stone-100">
              {totalStock} unități în stoc
            </span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[700px]">
            <thead>
              <tr className="bg-stone-50 border-b border-stone-100">
                {['Produs', 'Categorie', 'Preț', 'Stoc', 'Status'].map((h) => (
                  <th
                    key={h}
                    className="text-left text-xs font-semibold text-stone-500 uppercase tracking-wider px-5 py-3"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-50">
              {products.map((product) => (
                <tr
                  key={product.id}
                  className="hover:bg-stone-50/60 transition-colors group"
                >
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-2.5">
                      <CheckCircle
                        className={`w-3.5 h-3.5 shrink-0 ${
                          product.stock > 0
                            ? 'text-green-500'
                            : 'text-stone-300'
                        }`}
                      />
                      <span className="font-medium text-stone-900 text-sm group-hover:text-green-700 transition-colors">
                        {product.name}
                      </span>
                      <Link
                        href={`/products/${product.slug || product.id}`}
                        target="_blank"
                        className="opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <ExternalLink className="w-3.5 h-3.5 text-stone-400 hover:text-stone-600" />
                      </Link>
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
                    <div className="flex gap-1.5 flex-wrap">
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
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
