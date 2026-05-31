'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { ShoppingCart, Menu, X, Search, Heart } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import SearchModal from '@/components/ui/SearchModal';

const NAV_LINKS = [
  { href: '/', label: 'Acasă' },
  { href: '/products', label: 'Produse' },
  { href: '/blog', label: 'Blog' },
  { href: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const { itemCount } = useCart();
  const { count: wishlistCount } = useWishlist();

  const isHome = pathname === '/';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const isActive = (href) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href);

  // Navbar transparent peste hero doar pe homepage, în top, cu meniul mobil închis
  const transparent = isHome && !scrolled && !mobileOpen;

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          transparent
            ? 'bg-transparent border-b border-transparent'
            : 'bg-white/90 backdrop-blur-md shadow-sm shadow-stone-900/5 border-b border-stone-200/60'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">

            {/* Logo */}
            <Link href="/" className="group flex items-center gap-2">
              <Image
                src="/logo.png"
                alt="AquaPet"
                width={48}
                height={48}
                className="rounded-xl object-contain transition-transform duration-200 group-hover:scale-105"
              />
              <span
                className={`font-extrabold text-lg tracking-tight transition-colors hidden sm:block ${
                  transparent ? 'text-white drop-shadow-md' : 'text-stone-900 group-hover:text-green-700'
                }`}
              >
                Aqua
                <span
                  className={transparent ? 'text-green-300' : 'text-transparent bg-clip-text'}
                  style={transparent ? undefined : { backgroundImage: 'linear-gradient(135deg, #16a34a, #10b981)' }}
                >
                  Pet
                </span>
              </span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-1">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                    transparent
                      ? isActive(link.href)
                        ? 'text-white'
                        : 'text-white/80 hover:text-white hover:bg-white/10'
                      : isActive(link.href)
                        ? 'text-green-700'
                        : 'text-stone-600 hover:text-stone-900 hover:bg-stone-50'
                  }`}
                >
                  {link.label}
                  {isActive(link.href) && (
                    <span className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-0.5 rounded-full animate-fade-in ${
                      transparent ? 'bg-green-300' : 'bg-green-600'
                    }`} />
                  )}
                </Link>
              ))}
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-0.5">
              {/* Search */}
              <button
                onClick={() => setSearchOpen(true)}
                className={`p-2 rounded-xl transition-all duration-200 hover:scale-105 active:scale-95 ${
                  transparent
                    ? 'text-white/90 hover:text-white hover:bg-white/10'
                    : 'text-stone-500 hover:text-stone-900 hover:bg-stone-100'
                }`}
                aria-label="Caută"
              >
                <Search className="w-5 h-5" />
              </button>

              {/* Wishlist */}
              <Link
                href="/wishlist"
                className={`relative p-2 rounded-xl transition-all duration-200 hover:scale-105 active:scale-95 ${
                  transparent
                    ? 'text-white/90 hover:text-white hover:bg-white/10'
                    : 'text-stone-500 hover:text-red-500 hover:bg-red-50'
                }`}
                aria-label="Favorite"
              >
                <Heart className="w-5 h-5" />
                {wishlistCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center leading-none animate-bounce-in">
                    {wishlistCount > 9 ? '9+' : wishlistCount}
                  </span>
                )}
              </Link>

              {/* Cart */}
              <Link
                href="/cart"
                className={`relative p-2 rounded-xl transition-all duration-200 hover:scale-105 active:scale-95 ${
                  transparent
                    ? 'text-white/90 hover:text-white hover:bg-white/10'
                    : 'text-stone-500 hover:text-green-700 hover:bg-green-50'
                }`}
                aria-label="Coș"
              >
                <ShoppingCart className="w-5 h-5" />
                {itemCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-green-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center leading-none animate-bounce-in">
                    {itemCount > 9 ? '9+' : itemCount}
                  </span>
                )}
              </Link>

              {/* Mobile toggle */}
              <button
                className={`md:hidden p-2 rounded-xl transition-all duration-200 ml-1 ${
                  transparent
                    ? 'text-white/90 hover:text-white hover:bg-white/10'
                    : 'text-stone-500 hover:text-stone-900 hover:bg-stone-100'
                }`}
                onClick={() => setMobileOpen(!mobileOpen)}
                aria-label="Meniu"
              >
                {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ${
            mobileOpen ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <nav className="bg-white border-t border-stone-100 px-4 py-3 space-y-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  isActive(link.href)
                    ? 'bg-green-50 text-green-700'
                    : 'text-stone-700 hover:bg-stone-50'
                }`}
                onClick={() => setMobileOpen(false)}
              >
                {isActive(link.href) && (
                  <span className="w-1.5 h-1.5 rounded-full bg-green-600 shrink-0" />
                )}
                {link.label}
              </Link>
            ))}
            <Link
              href="/wishlist"
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium text-stone-700 hover:bg-stone-50 transition-colors"
              onClick={() => setMobileOpen(false)}
            >
              <Heart className="w-4 h-4 text-red-400" />
              Favorite {wishlistCount > 0 && `(${wishlistCount})`}
            </Link>
          </nav>
        </div>
      </header>

      {/* Spacer — împinge conținutul sub navbar pe paginile fără hero */}
      {!isHome && <div className="h-16" />}

      {searchOpen && <SearchModal onClose={() => setSearchOpen(false)} />}
    </>
  );
}
