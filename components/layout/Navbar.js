'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ShoppingCart, Menu, X, Search, Heart } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import SearchModal from '@/components/ui/SearchModal';

const NAV_LINKS = [
  { href: '/', label: 'Acasă' },
  { href: '/products', label: 'Produse' },
  { href: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const pathname = usePathname();
  const { itemCount } = useCart();
  const { count: wishlistCount } = useWishlist();

  const isActive = (href) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href);

  return (
    <>
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center">
              <span className="font-extrabold text-xl tracking-tight text-stone-900">
                Paw<span className="text-green-700">ora</span>
              </span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-1">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive(link.href)
                      ? 'bg-green-50 text-green-700'
                      : 'text-stone-600 hover:text-stone-900 hover:bg-stone-50'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-0.5">
              {/* Search */}
              <button
                onClick={() => setSearchOpen(true)}
                className="p-2 text-stone-500 hover:text-stone-900 hover:bg-stone-50 rounded-lg transition-colors"
                aria-label="Caută"
              >
                <Search className="w-5 h-5" />
              </button>

              {/* Wishlist */}
              <Link
                href="/wishlist"
                className="relative p-2 text-stone-500 hover:text-stone-900 hover:bg-stone-50 rounded-lg transition-colors"
                aria-label="Favorite"
              >
                <Heart className="w-5 h-5" />
                {wishlistCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center leading-none">
                    {wishlistCount > 9 ? '9+' : wishlistCount}
                  </span>
                )}
              </Link>

              {/* Cart */}
              <Link
                href="/cart"
                className="relative p-2 text-stone-500 hover:text-stone-900 hover:bg-stone-50 rounded-lg transition-colors"
                aria-label="Coș"
              >
                <ShoppingCart className="w-5 h-5" />
                {itemCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-orange-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center leading-none">
                    {itemCount > 9 ? '9+' : itemCount}
                  </span>
                )}
              </Link>

              {/* Mobile toggle */}
              <button
                className="md:hidden p-2 text-stone-500 hover:text-stone-900 hover:bg-stone-50 rounded-lg transition-colors"
                onClick={() => setMobileOpen(!mobileOpen)}
                aria-label="Meniu"
              >
                {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="md:hidden bg-white border-t border-stone-100">
            <nav className="px-4 py-3 space-y-1">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`block px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                    isActive(link.href)
                      ? 'bg-green-50 text-green-700'
                      : 'text-stone-700 hover:bg-stone-50'
                  }`}
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/wishlist"
                className="block px-4 py-2.5 rounded-xl text-sm font-medium text-stone-700 hover:bg-stone-50 transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                Favorite {wishlistCount > 0 && `(${wishlistCount})`}
              </Link>
            </nav>
          </div>
        )}
      </header>

      {/* Search modal */}
      {searchOpen && <SearchModal onClose={() => setSearchOpen(false)} />}
    </>
  );
}
