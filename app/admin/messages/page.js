import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { verifyToken } from '@/lib/jwt';
import { getMessages } from '@/lib/store';
import MessagesClient from './MessagesClient';

export const metadata = { title: 'Mesaje — AquaPet Admin' };
export const dynamic = 'force-dynamic';

export default async function AdminMessagesPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get('admin-token')?.value;
  if (!token) redirect('/admin/login');
  const payload = await verifyToken(token);
  if (!payload) redirect('/admin/login');

  const messages = getMessages();

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-stone-900">Mesaje primite</h1>
        <p className="text-stone-500 text-sm mt-0.5">
          Mesajele trimise prin formularul de contact
        </p>
      </div>
      <MessagesClient initialMessages={messages} />
    </div>
  );
}
