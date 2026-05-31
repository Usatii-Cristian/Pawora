import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { ChevronRight, Calendar, User, ArrowLeft } from 'lucide-react';
import { getArticles } from '@/lib/store';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const article = getArticles().find((a) => a.slug === slug);
  if (!article) return {};
  return {
    title: `${article.title} — AquaPet Blog`,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      images: article.cover ? [{ url: article.cover }] : [],
    },
  };
}

function fmtDate(iso) {
  return new Date(iso).toLocaleDateString('ro-RO', {
    day: 'numeric', month: 'long', year: 'numeric',
  });
}

// Randare simplă a conținutului: ## titluri + paragrafe
function renderContent(content) {
  return content.split('\n').filter((l) => l.trim()).map((line, i) => {
    if (line.startsWith('## ')) {
      return (
        <h2 key={i} className="text-xl font-bold text-stone-900 mt-8 mb-3">
          {line.replace('## ', '')}
        </h2>
      );
    }
    return (
      <p key={i} className="text-stone-600 leading-relaxed mb-4">
        {line}
      </p>
    );
  });
}

export default async function ArticlePage({ params }) {
  const { slug } = await params;
  const articles = getArticles();
  const article = articles.find((a) => a.slug === slug);
  if (!article) notFound();

  const related = articles.filter((a) => a.slug !== slug).slice(0, 2);

  return (
    <div className="min-h-screen bg-white">
      <div className="border-b border-stone-100">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <nav className="flex items-center gap-1.5 text-sm text-stone-500">
            <Link href="/" className="hover:text-stone-900 transition-colors">Acasă</Link>
            <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
            <Link href="/blog" className="hover:text-stone-900 transition-colors">Blog</Link>
            <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
            <span className="text-stone-900 font-medium line-clamp-1">{article.title}</span>
          </nav>
        </div>
      </div>

      <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex items-center gap-4 text-sm text-stone-400 mb-4">
          <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" />{fmtDate(article.publishedAt)}</span>
          <span className="flex items-center gap-1.5"><User className="w-4 h-4" />{article.author}</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-stone-900 leading-tight mb-6">
          {article.title}
        </h1>

        {article.cover && (
          <div className="relative aspect-[16/9] rounded-2xl overflow-hidden bg-stone-100 mb-8">
            <Image src={article.cover} alt={article.title} fill className="object-cover" sizes="768px" priority />
          </div>
        )}

        <div className="prose-content">
          {renderContent(article.content)}
        </div>

        <div className="mt-10 pt-8 border-t border-stone-100">
          <Link href="/blog" className="inline-flex items-center gap-2 text-sm font-semibold text-green-700 hover:text-green-800 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Înapoi la blog
          </Link>
        </div>

        {related.length > 0 && (
          <div className="mt-12">
            <h3 className="text-lg font-bold text-stone-900 mb-4">Citește și</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {related.map((a) => (
                <Link key={a.id} href={`/blog/${a.slug}`} className="group flex gap-3 items-center bg-stone-50 rounded-xl p-3 hover:bg-stone-100 transition-colors">
                  <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-stone-200 shrink-0">
                    <Image src={a.cover} alt={a.title} fill className="object-cover" sizes="64px" />
                  </div>
                  <span className="text-sm font-semibold text-stone-800 group-hover:text-green-700 transition-colors line-clamp-2">
                    {a.title}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </article>
    </div>
  );
}
