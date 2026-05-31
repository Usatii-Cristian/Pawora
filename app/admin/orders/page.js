import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { verifyToken } from '@/lib/jwt';
import { getOrders } from '@/lib/store';
import OrdersClient from './OrdersClient';

export const metadata = { title: 'Comenzi — AquaPet Admin' };
export const dynamic = 'force-dynamic';

export default async function AdminOrdersPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get('admin-token')?.value;
  if (!token) redirect('/admin/login');
  const payload = await verifyToken(token);
  if (!payload) redirect('/admin/login');

  const orders = getOrders();

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-stone-900">Comenzi</h1>
        <p className="text-stone-500 text-sm mt-0.5">Comenzile plasate de clienți</p>
      </div>
      <OrdersClient initialOrders={orders} />
    </div>
  );
}
