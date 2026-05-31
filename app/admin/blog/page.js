import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { verifyToken } from '@/lib/jwt';
import { getArticles } from '@/lib/store';
import { Plus, ExternalLink, Pencil } from 'lucide-react';
import ArticleDeleteButton from '@/components/admin/ArticleDeleteButton';

export const metadata = { title: 'Blog — AquaPet Admin' };
export const dynamic = 'force-dynamic';

function fmtDate(iso) {
  return new Date(iso).toLocaleDateString('ro-RO', { day: 'numeric', month: 'short', year: 'numeric' });
}

export default async function AdminBlogPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get('admin-token')?.value;
  if (!token) redirect('/admin/login');
  const payload = await verifyToken(token);
  if (!payload) redirect('/admin/login');

  const articles = getArticles();

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-stone-900">Blog</h1>
          <p className="text-stone-500 text-sm mt-0.5">{articles.length} articole</p>
        </div>
        <Link href="/admin/blog/new" className="flex items-center gap-2 bg-green-700 text-white font-semibold px-5 py-2.5 rounded-xl hover:bg-green-800 transition-colors text-sm">
          <Plus className="w-4 h-4" />
          Articol nou
        </Link>
      </div>

      {articles.length === 0 ? (
        <div className="bg-white rounded-2xl border border-stone-100 shadow-sm py-20 text-center text-stone-400">
          Niciun articol. Apasă „Articol nou" pentru a începe.
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-stone-100 shadow-sm divide-y divide-stone-50">
          {articles.map((a) => (
            <div key={a.id} className="flex items-center gap-4 p-4 hover:bg-stone-50/50 transition-colors group">
              <div className="relative w-16 h-12 rounded-lg overflow-hidden bg-stone-100 shrink-0">
                <Image src={a.cover} alt={a.title} fill className="object-cover" sizes="64px" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-stone-900 text-sm leading-snug line-clamp-1">{a.title}</p>
                <p className="text-xs text-stone-400 mt-0.5">{fmtDate(a.publishedAt)} · {a.author}</p>
              </div>
              <div className="flex items-center gap-1.5 shrink-0">
                <Link href={`/admin/blog/${a.slug}/edit`} className="p-1.5 text-stone-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="Editează">
                  <Pencil className="w-3.5 h-3.5" />
                </Link>
                <Link href={`/blog/${a.slug}`} target="_blank" className="p-1.5 text-stone-400 hover:text-stone-700 hover:bg-stone-100 rounded-lg transition-colors" title="Vezi pe site">
                  <ExternalLink className="w-3.5 h-3.5" />
                </Link>
                <ArticleDeleteButton slug={a.slug} title={a.title} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
