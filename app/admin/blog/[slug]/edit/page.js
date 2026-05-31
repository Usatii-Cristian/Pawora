import { cookies } from 'next/headers';
import { redirect, notFound } from 'next/navigation';
import { verifyToken } from '@/lib/jwt';
import { getArticles } from '@/lib/store';
import ArticleForm from '../../ArticleForm';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const article = getArticles().find((a) => a.slug === slug);
  return { title: article ? `Editează ${article.title} — Admin` : 'Editează articol' };
}

export default async function EditArticlePage({ params }) {
  const cookieStore = await cookies();
  const token = cookieStore.get('admin-token')?.value;
  if (!token) redirect('/admin/login');
  const payload = await verifyToken(token);
  if (!payload) redirect('/admin/login');

  const { slug } = await params;
  const article = getArticles().find((a) => a.slug === slug);
  if (!article) notFound();

  return <ArticleForm article={article} />;
}
