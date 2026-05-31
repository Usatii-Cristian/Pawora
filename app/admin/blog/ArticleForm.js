'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Save } from 'lucide-react';

const inputClass =
  'w-full px-4 py-3 rounded-xl border border-stone-200 text-sm text-stone-900 outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100 transition-all placeholder:text-stone-400 bg-white';
const labelClass = 'block text-sm font-medium text-stone-700 mb-1.5';

export default function ArticleForm({ article }) {
  const isEdit = Boolean(article);
  const router = useRouter();
  const [form, setForm] = useState({
    title: article?.title || '',
    excerpt: article?.excerpt || '',
    content: article?.content || '',
    cover: article?.cover || '',
    author: article?.author || 'Echipa AquaPet',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const setField = (f) => (e) => setForm((p) => ({ ...p, [f]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const url = isEdit ? `/api/admin/articles/${article.slug}` : '/api/admin/articles';
      const res = await fetch(url, {
        method: isEdit ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error || 'Eroare la salvare'); return; }
      setSuccess(true);
      setTimeout(() => { router.push('/admin/blog'); router.refresh(); }, 1000);
    } catch {
      setError('Eroare de rețea. Încearcă din nou.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/admin/blog" className="p-2 text-stone-500 hover:text-stone-900 hover:bg-white rounded-xl transition-colors border border-stone-200">
          <ArrowLeft className="w-4 h-4" />
        </Link>
        <h1 className="text-2xl font-bold text-stone-900">
          {isEdit ? 'Editează articol' : 'Articol nou'}
        </h1>
      </div>

      {success && (
        <div className="bg-green-50 text-green-700 text-sm px-4 py-3 rounded-xl border border-green-100 mb-6">
          Salvat cu succes! Redirecționare...
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {error && (
          <div className="bg-red-50 text-red-700 text-sm px-4 py-3 rounded-xl border border-red-100">
            {error}
          </div>
        )}

        <div className="bg-white rounded-2xl border border-stone-100 shadow-sm p-6 space-y-5">
          <div>
            <label className={labelClass}>Titlu *</label>
            <input type="text" value={form.title} onChange={setField('title')} required
              placeholder="ex: Cum alegi hrana potrivită" className={inputClass} />
          </div>

          <div>
            <label className={labelClass}>Rezumat scurt</label>
            <textarea rows={2} value={form.excerpt} onChange={setField('excerpt')}
              placeholder="O propoziție care apare în lista de articole..." className={`${inputClass} resize-none`} />
          </div>

          <div>
            <label className={labelClass}>URL imagine copertă</label>
            <input type="url" value={form.cover} onChange={setField('cover')}
              placeholder="https://..." className={inputClass} />
          </div>

          <div>
            <label className={labelClass}>Autor</label>
            <input type="text" value={form.author} onChange={setField('author')} className={inputClass} />
          </div>

          <div>
            <label className={labelClass}>Conținut *</label>
            <textarea rows={14} value={form.content} onChange={setField('content')} required
              placeholder={'Scrie articolul aici...\n\nFolosește ## pentru subtitluri.'}
              className={`${inputClass} resize-y font-mono text-[13px] leading-relaxed`} />
            <p className="text-xs text-stone-400 mt-1.5">
              Tip: începe o linie cu <code className="bg-stone-100 px-1 rounded">## </code> pentru un subtitlu.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 pb-8">
          <button type="submit" disabled={loading || success}
            className="flex items-center gap-2 bg-green-700 text-white font-semibold px-7 py-3.5 rounded-xl hover:bg-green-800 transition-colors disabled:opacity-60">
            {loading ? (
              <><div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />Se salvează...</>
            ) : (
              <><Save className="w-4 h-4" />{isEdit ? 'Salvează modificările' : 'Publică articolul'}</>
            )}
          </button>
          <Link href="/admin/blog" className="px-7 py-3.5 rounded-xl text-stone-600 border border-stone-200 font-medium hover:bg-stone-50 transition-colors text-sm">
            Anulează
          </Link>
        </div>
      </form>
    </div>
  );
}
