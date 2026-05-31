import Link from 'next/link';
import Image from 'next/image';
import { ChevronRight, ArrowRight, Calendar } from 'lucide-react';
import { getArticles } from '@/lib/store';

export const metadata = {
  title: 'Blog — AquaPet',
  description: 'Sfaturi, ghiduri și articole despre îngrijirea animalelor de companie.',
};
export const dynamic = 'force-dynamic';

function fmtDate(iso) {
  return new Date(iso).toLocaleDateString('ro-RO', {
    day: 'numeric', month: 'long', year: 'numeric',
  });
}

export default function BlogPage() {
  const articles = getArticles();

  return (
    <div className="min-h-screen bg-stone-50">
      <div className="bg-white border-b border-stone-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <nav className="flex items-center gap-1.5 text-sm text-stone-500 mb-3">
            <Link href="/" className="hover:text-stone-900 transition-colors">Acasă</Link>
            <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
            <span className="text-stone-900 font-medium">Blog</span>
          </nav>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-stone-900">Blog AquaPet</h1>
          <p className="text-stone-500 mt-2">
            Sfaturi, ghiduri și noutăți despre îngrijirea animalelor tale.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {articles.length === 0 ? (
          <p className="text-center text-stone-400 py-20">Niciun articol publicat încă.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {articles.map((a) => (
              <Link
                key={a.id}
                href={`/blog/${a.slug}`}
                className="group bg-white rounded-2xl overflow-hidden border border-stone-100 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col"
              >
                <div className="relative aspect-[16/9] bg-stone-100 overflow-hidden">
                  <Image
                    src={a.cover}
                    alt={a.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 640px) 100vw, 50vw"
                  />
                </div>
                <div className="p-5 flex flex-col flex-1">
                  <div className="flex items-center gap-1.5 text-xs text-stone-400 mb-2">
                    <Calendar className="w-3.5 h-3.5" />
                    {fmtDate(a.publishedAt)}
                  </div>
                  <h2 className="font-bold text-stone-900 text-lg leading-snug group-hover:text-green-700 transition-colors line-clamp-2">
                    {a.title}
                  </h2>
                  <p className="text-sm text-stone-500 mt-2 leading-relaxed line-clamp-3 flex-1">
                    {a.excerpt}
                  </p>
                  <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-green-700 mt-4">
                    Citește articolul
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
