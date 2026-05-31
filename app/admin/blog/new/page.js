import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { verifyToken } from '@/lib/jwt';
import ArticleForm from '../ArticleForm';

export const metadata = { title: 'Articol nou — AquaPet Admin' };

export default async function NewArticlePage() {
  const cookieStore = await cookies();
  const token = cookieStore.get('admin-token')?.value;
  if (!token) redirect('/admin/login');
  const payload = await verifyToken(token);
  if (!payload) redirect('/admin/login');

  return <ArticleForm />;
}
