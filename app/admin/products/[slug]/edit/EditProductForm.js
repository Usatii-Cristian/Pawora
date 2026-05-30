'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Save } from 'lucide-react';

const CATEGORIES_LIST = [
  { slug: 'dogs', name: 'Câini' },
  { slug: 'cats', name: 'Pisici' },
  { slug: 'birds', name: 'Păsări' },
  { slug: 'fish', name: 'Pești' },
  { slug: 'small-animals', name: 'Animale Mici' },
];

const SUBCATEGORIES = ['food', 'toys', 'accessories'];

export default function EditProductForm({ product }) {
  const [form, setForm] = useState({
    name: product.name,
    description: product.description,
    price: String(product.price),
    image: product.image || '',
    category: product.category,
    subcategory: product.subcategory || '',
    featured: product.featured,
    bestseller: product.bestseller,
    newArrival: product.newArrival,
    stock: String(product.stock),
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const setField = (field) => (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setForm((f) => ({ ...f, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch(`/api/admin/products/${product.slug || product.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          price: parseFloat(form.price),
          stock: parseInt(form.stock, 10),
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Eroare la salvare');
        return;
      }

      setSuccess(true);
      setTimeout(() => router.push('/admin/products'), 1500);
    } catch {
      setError('Eroare de rețea. Încearcă din nou.');
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    'w-full px-4 py-3 rounded-xl border border-stone-200 text-sm text-stone-900 outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100 transition-all placeholder:text-stone-400 bg-white';

  const labelClass = 'block text-sm font-medium text-stone-700 mb-1.5';

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center gap-4 mb-8">
        <Link
          href="/admin/products"
          className="p-2 text-stone-500 hover:text-stone-900 hover:bg-white rounded-xl transition-colors border border-stone-200"
        >
          <ArrowLeft className="w-4 h-4" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-stone-900">Editează produs</h1>
          <p className="text-stone-500 text-sm mt-0.5 font-mono">{product.slug}</p>
        </div>
      </div>

      {success && (
        <div className="bg-green-50 text-green-700 text-sm px-4 py-3 rounded-xl border border-green-100 mb-6">
          Produs actualizat cu succes! Redirecționare...
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {error && (
          <div className="bg-red-50 text-red-700 text-sm px-4 py-3 rounded-xl border border-red-100">
            {error}
          </div>
        )}

        <div className="bg-white rounded-2xl border border-stone-100 shadow-sm p-6 space-y-5">
          <h2 className="font-semibold text-stone-900">Informații principale</h2>

          <div>
            <label className={labelClass}>Nume produs *</label>
            <input type="text" value={form.name} onChange={setField('name')} required className={inputClass} />
          </div>

          <div>
            <label className={labelClass}>Descriere *</label>
            <textarea
              rows={4}
              value={form.description}
              onChange={setField('description')}
              required
              className={`${inputClass} resize-none`}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Preț (lei) *</label>
              <input
                type="number"
                step="1"
                min="0"
                value={form.price}
                onChange={setField('price')}
                required
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Stoc</label>
              <input
                type="number"
                min="0"
                value={form.stock}
                onChange={setField('stock')}
                className={inputClass}
              />
            </div>
          </div>

          <div>
            <label className={labelClass}>URL imagine</label>
            <input
              type="url"
              value={form.image}
              onChange={setField('image')}
              className={inputClass}
            />
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-stone-100 shadow-sm p-6 space-y-4">
          <h2 className="font-semibold text-stone-900">Categorie</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Categorie principală *</label>
              <select value={form.category} onChange={setField('category')} required className={inputClass}>
                {CATEGORIES_LIST.map((c) => (
                  <option key={c.slug} value={c.slug}>{c.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className={labelClass}>Subcategorie</label>
              <select value={form.subcategory} onChange={setField('subcategory')} className={inputClass}>
                <option value="">— Niciuna —</option>
                {SUBCATEGORIES.map((s) => (
                  <option key={s} value={s} className="capitalize">{s}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-stone-100 shadow-sm p-6">
          <h2 className="font-semibold text-stone-900 mb-4">Etichete</h2>
          <div className="space-y-3">
            {[
              { field: 'featured', label: 'Featured (Produs recomandat)' },
              { field: 'bestseller', label: 'Bestseller' },
              { field: 'newArrival', label: 'Noutate (New Arrival)' },
            ].map(({ field, label }) => (
              <label key={field} className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form[field]}
                  onChange={setField(field)}
                  className="w-4 h-4 rounded accent-green-700"
                />
                <span className="text-sm font-medium text-stone-900">{label}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-3 pb-8">
          <button
            type="submit"
            disabled={loading || success}
            className="flex items-center gap-2 bg-green-700 text-white font-semibold px-7 py-3.5 rounded-xl hover:bg-green-800 transition-colors disabled:opacity-60"
          >
            {loading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Se salvează...
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                Salvează modificările
              </>
            )}
          </button>
          <Link
            href="/admin/products"
            className="px-7 py-3.5 rounded-xl text-stone-600 border border-stone-200 font-medium hover:bg-stone-50 transition-colors text-sm"
          >
            Anulează
          </Link>
        </div>
      </form>
    </div>
  );
}
