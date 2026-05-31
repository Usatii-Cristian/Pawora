import Link from 'next/link';
import Image from 'next/image';
import { Mail, Phone, MapPin, AtSign, Globe, Heart } from 'lucide-react';

const CATEGORY_LINKS = [
  { href: '/products?category=dogs', label: 'Câini' },
  { href: '/products?category=cats', label: 'Pisici' },
  { href: '/products?category=birds', label: 'Păsări' },
  { href: '/products?category=fish', label: 'Pești' },
  { href: '/products?category=small-animals', label: 'Animale Mici' },
];

const QUICK_LINKS = [
  { href: '/products', label: 'Toate produsele' },
  { href: '/blog', label: 'Blog' },
  { href: '/contact', label: 'Contactează-ne' },
  { href: '/cart', label: 'Coș de cumpărături' },
  { href: '/wishlist', label: 'Lista de favorite' },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-[#0a180a]">
      {/* Top gradient separator */}
      <div className="h-px w-full"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(52,211,153,0.4), rgba(251,191,36,0.4), transparent)' }} />

      {/* Decorative glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(16,185,129,0.06) 0%, transparent 70%)' }} />
      <div className="absolute bottom-0 right-1/4 w-64 h-64 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(251,191,36,0.05) 0%, transparent 70%)' }} />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-14">

          {/* Brand column */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-flex items-center gap-2.5 mb-5 group">
              <Image
                src="/logo.png"
                alt="AquaPet"
                width={40}
                height={40}
                className="rounded-xl object-contain group-hover:scale-105 transition-transform"
              />
              <span className="font-extrabold text-xl tracking-tight text-white">
                Aqua
                <span className="text-transparent bg-clip-text"
                  style={{ backgroundImage: 'linear-gradient(135deg, #4ade80, #34d399)' }}>
                  Pet
                </span>
              </span>
            </Link>
            <p className="text-sm leading-relaxed text-stone-500 mb-6 max-w-xs">
              Magazinul tău online de încredere pentru animale de companie.
              Produse premium selectate cu grijă pentru fiecare animal.
            </p>

            {/* Social links */}
            <div className="flex items-center gap-2">
              <a
                href="#"
                className="group w-9 h-9 rounded-xl bg-white/6 hover:bg-emerald-500 flex items-center justify-center text-stone-500 hover:text-white transition-all duration-200 hover:scale-110"
                aria-label="Instagram"
              >
                <AtSign className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="group w-9 h-9 rounded-xl bg-white/6 hover:bg-blue-500 flex items-center justify-center text-stone-500 hover:text-white transition-all duration-200 hover:scale-110"
                aria-label="Facebook"
              >
                <Globe className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Categorii */}
          <div>
            <h4 className="font-bold text-white mb-5 text-xs uppercase tracking-widest">
              Categorii
            </h4>
            <ul className="space-y-3">
              {CATEGORY_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-stone-500 hover:text-emerald-400 transition-colors duration-200 flex items-center gap-1.5 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-stone-700 group-hover:bg-emerald-500 transition-colors shrink-0" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Linkuri rapide */}
          <div>
            <h4 className="font-bold text-white mb-5 text-xs uppercase tracking-widest">
              Linkuri rapide
            </h4>
            <ul className="space-y-3">
              {QUICK_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-stone-500 hover:text-emerald-400 transition-colors duration-200 flex items-center gap-1.5 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-stone-700 group-hover:bg-emerald-500 transition-colors shrink-0" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold text-white mb-5 text-xs uppercase tracking-widest">
              Contact
            </h4>
            <ul className="space-y-3.5">
              <li className="flex items-start gap-3 text-sm text-stone-500 group">
                <div className="w-7 h-7 rounded-lg bg-white/6 flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-emerald-500/20 transition-colors">
                  <MapPin className="w-3.5 h-3.5 text-stone-600 group-hover:text-emerald-400 transition-colors" />
                </div>
                Str. Ștefan cel Mare 123, Chișinău
              </li>
              <li className="flex items-center gap-3 text-sm text-stone-500 group">
                <div className="w-7 h-7 rounded-lg bg-white/6 flex items-center justify-center shrink-0 group-hover:bg-emerald-500/20 transition-colors">
                  <Phone className="w-3.5 h-3.5 text-stone-600 group-hover:text-emerald-400 transition-colors" />
                </div>
                +373 22 123 456
              </li>
              <li className="flex items-center gap-3 text-sm text-stone-500 group">
                <div className="w-7 h-7 rounded-lg bg-white/6 flex items-center justify-center shrink-0 group-hover:bg-emerald-500/20 transition-colors">
                  <Mail className="w-3.5 h-3.5 text-stone-600 group-hover:text-emerald-400 transition-colors" />
                </div>
                salut@aquapet.md
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/6 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex flex-col sm:flex-row items-center gap-x-5 gap-y-2 text-center sm:text-left">
            <p className="text-xs text-stone-600 flex items-center gap-1.5">
              &copy; {new Date().getFullYear()} AquaPet — Făcut cu
              <Heart className="w-3 h-3 text-red-500 fill-red-500" />
              în Moldova
            </p>
            <div className="flex items-center gap-4">
              <Link href="/termeni" className="text-xs text-stone-500 hover:text-emerald-400 transition-colors">
                Termeni de utilizare
              </Link>
              <Link href="/confidentialitate" className="text-xs text-stone-500 hover:text-emerald-400 transition-colors">
                Confidențialitate
              </Link>
            </div>
          </div>
          <p className="text-xs text-stone-700">
            Proiect de practică — nu se procesează tranzacții reale.
          </p>
        </div>
      </div>
    </footer>
  );
}
