import AdminNav from '@/components/admin/AdminNav';

export default function AdminLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-stone-100">
      <AdminNav />
      <div className="flex-1">{children}</div>
    </div>
  );
}
