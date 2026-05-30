import { cookies } from 'next/headers';
import { redirect, notFound } from 'next/navigation';
import { verifyToken } from '@/lib/jwt';
import { getProducts } from '@/lib/store';
import EditProductForm from './EditProductForm';

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const product = getProducts().find((p) => p.slug === slug || p.id === slug);
  return { title: product ? `Editează ${product.name} — Admin` : 'Editează produs' };
}

export default async function EditProductPage({ params }) {
  const cookieStore = await cookies();
  const token = cookieStore.get('admin-token')?.value;
  if (!token) redirect('/admin/login');
  const payload = await verifyToken(token);
  if (!payload) redirect('/admin/login');

  const { slug } = await params;
  const product = getProducts().find((p) => p.slug === slug || p.id === slug);
  if (!product) notFound();

  return <EditProductForm product={product} />;
}
