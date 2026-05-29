'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Save, Wand2 } from 'lucide-react';

const CATEGORIES = [
  { slug: 'dogs', name: 'Dogs' },
  { slug: 'cats', name: 'Cats' },
  { slug: 'birds', name: 'Birds' },
  { slug: 'fish', name: 'Fish' },
  { slug: 'small-animals', name: 'Small Animals' },
];

const SUBCATEGORIES = ['food', 'toys', 'accessories'];

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

const EMPTY = {
  name: '',
  description: '',
  price: '',
  image: '',
  category: 'dogs',
  subcategory: 'food',
  featured: false,
  bestseller: false,
  newArrival: false,
  stock: '10',
};

export default function NewProductPage() {
  const [form, setForm] = useState(EMPTY);
  const [previewSlug, setPreviewSlug] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const setField = (field) => (e) => {
    const value =
      e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setForm((f) => ({ ...f, [field]: value }));

    if (field === 'name') {
      setPreviewSlug(slugify(e.target.value));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/admin/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          price: parseFloat(form.price),
          stock: parseInt(form.stock, 10),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'A apărut o eroare');
        return;
      }

      router.push('/admin/products');
      router.refresh();
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
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <Link
          href="/admin/products"
          className="p-2 text-stone-500 hover:text-stone-900 hover:bg-white rounded-xl transition-colors border border-stone-200"
        >
          <ArrowLeft className="w-4 h-4" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-stone-900">Produs nou</h1>
          <p className="text-stone-500 text-sm mt-0.5">
            Completează detaliile produsului
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {error && (
          <div className="bg-red-50 text-red-700 text-sm px-4 py-3 rounded-xl border border-red-100">
            {error}
          </div>
        )}

        {/* Main info */}
        <div className="bg-white rounded-2xl border border-stone-100 shadow-sm p-6 space-y-5">
          <h2 className="font-semibold text-stone-900">Informații principale</h2>

          <div>
            <label className={labelClass}>Nume produs *</label>
            <input
              type="text"
              value={form.name}
              onChange={setField('name')}
              placeholder="ex: Royal Canin Adult 4kg"
              required
              className={inputClass}
            />
            {previewSlug && (
              <div className="mt-2 flex items-center gap-2 text-xs text-stone-500">
                <Wand2 className="w-3.5 h-3.5 text-green-600" />
                Slug generat automat:{' '}
                <code className="bg-stone-100 px-1.5 py-0.5 rounded font-mono text-stone-700">
                  {previewSlug}
                </code>
              </div>
            )}
          </div>

          <div>
            <label className={labelClass}>Descriere *</label>
            <textarea
              rows={4}
              value={form.description}
              onChange={setField('description')}
              placeholder="Descrie produsul în detaliu..."
              required
              className={`${inputClass} resize-none`}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Preț (USD) *</label>
              <input
                type="number"
                step="0.01"
                min="0"
                value={form.price}
                onChange={setField('price')}
                placeholder="24.99"
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
                placeholder="10"
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
              placeholder="https://... (lăsă gol pentru placeholder automat)"
              className={inputClass}
            />
            {!form.image && previewSlug && (
              <p className="mt-1.5 text-xs text-stone-400">
                Va folosi:{' '}
                <code className="font-mono">
                  picsum.photos/seed/{previewSlug}/600/600
                </code>
              </p>
            )}
          </div>
        </div>

        {/* Category */}
        <div className="bg-white rounded-2xl border border-stone-100 shadow-sm p-6 space-y-5">
          <h2 className="font-semibold text-stone-900">Categorie</h2>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Categorie principală *</label>
              <select
                value={form.category}
                onChange={setField('category')}
                required
                className={inputClass}
              >
                {CATEGORIES.map((c) => (
                  <option key={c.slug} value={c.slug}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className={labelClass}>Subcategorie</label>
              <select
                value={form.subcategory}
                onChange={setField('subcategory')}
                className={inputClass}
              >
                <option value="">— Niciuna —</option>
                {SUBCATEGORIES.map((s) => (
                  <option key={s} value={s} className="capitalize">
                    {s}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Tags */}
        <div className="bg-white rounded-2xl border border-stone-100 shadow-sm p-6">
          <h2 className="font-semibold text-stone-900 mb-4">Etichete</h2>
          <div className="space-y-3">
            {[
              { field: 'featured', label: 'Produse recomandate (Featured)', desc: 'Apare în secțiunea Featured de pe homepage' },
              { field: 'bestseller', label: 'Bestseller', desc: 'Afișează badge Bestseller și apare în secțiunea Best Sellers' },
              { field: 'newArrival', label: 'Noutăți (New Arrival)', desc: 'Afișează badge New și apare în secțiunea New Arrivals' },
            ].map(({ field, label, desc }) => (
              <label
                key={field}
                className="flex items-start gap-3 cursor-pointer group"
              >
                <input
                  type="checkbox"
                  checked={form[field]}
                  onChange={setField(field)}
                  className="mt-0.5 w-4 h-4 rounded accent-green-700"
                />
                <div>
                  <span className="text-sm font-medium text-stone-900">
                    {label}
                  </span>
                  <p className="text-xs text-stone-500 mt-0.5">{desc}</p>
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3 pb-8">
          <button
            type="submit"
            disabled={loading}
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
                Salvează produsul
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
