'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { PawPrint, LayoutDashboard, Package, LogOut, ExternalLink } from 'lucide-react';

const NAV_ITEMS = [
  { href: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/products', label: 'Products', icon: Package },
];

export default function AdminNav() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' });
    router.push('/admin/login');
    router.refresh();
  };

  return (
    <header className="bg-stone-900 sticky top-0 z-50 border-b border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-4">
        {/* Logo + Nav */}
        <div className="flex items-center gap-5">
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <div className="w-7 h-7 bg-green-600 rounded-lg flex items-center justify-center">
              <PawPrint className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="font-bold text-sm text-white hidden sm:block">
              Pawora Admin
            </span>
          </Link>

          <div className="w-px h-5 bg-stone-700 hidden sm:block" />

          <nav className="flex items-center gap-0.5">
            {NAV_ITEMS.map(({ href, label, icon: Icon }) => (
              <Link
                key={href}
                href={href}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  pathname.startsWith(href)
                    ? 'bg-stone-700 text-white'
                    : 'text-stone-400 hover:text-white hover:bg-stone-800'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="hidden sm:block">{label}</span>
              </Link>
            ))}
          </nav>
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-3">
          <Link
            href="/"
            target="_blank"
            className="hidden sm:flex items-center gap-1.5 text-xs text-stone-500 hover:text-stone-300 transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            View Site
          </Link>
          <div className="w-px h-4 bg-stone-700 hidden sm:block" />
          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 text-sm text-stone-400 hover:text-red-400 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span className="hidden sm:block">Logout</span>
          </button>
        </div>
      </div>
    </header>
  );
}
