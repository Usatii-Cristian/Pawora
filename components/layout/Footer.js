import Link from 'next/link';
import { Mail, Phone, MapPin, Globe, Share2, AtSign } from 'lucide-react';

const CATEGORY_LINKS = [
  { href: '/products?category=dogs', label: 'Câini' },
  { href: '/products?category=cats', label: 'Pisici' },
  { href: '/products?category=birds', label: 'Păsări' },
  { href: '/products?category=fish', label: 'Pești' },
  { href: '/products?category=small-animals', label: 'Animale Mici' },
];

const QUICK_LINKS = [
  { href: '/products', label: 'Toate produsele' },
  { href: '/contact', label: 'Contactează-ne' },
  { href: '/cart', label: 'Coș de cumpărături' },
];

export default function Footer() {
  return (
    <footer className="bg-stone-900 text-stone-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div>
            <Link href="/" className="inline-block mb-4">
              <span className="font-extrabold text-xl tracking-tight text-white">
                Paw<span className="text-green-500">ora</span>
              </span>
            </Link>
            <p className="text-sm leading-relaxed text-stone-500 mb-5">
              Magazinul tău online de încredere pentru animale de companie.
              Produse premium selectate cu grijă pentru fiecare animal.
            </p>
            <div className="flex items-center gap-2">
              <a
                href="#"
                className="p-2 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-400 hover:text-white transition-colors"
                aria-label="Instagram"
              >
                <AtSign className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="p-2 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-400 hover:text-white transition-colors"
                aria-label="Facebook"
              >
                <Globe className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="p-2 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-400 hover:text-white transition-colors"
                aria-label="Share"
              >
                <Share2 className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Categorii */}
          <div>
            <h4 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">
              Categorii
            </h4>
            <ul className="space-y-2.5">
              {CATEGORY_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-stone-500 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Linkuri rapide */}
          <div>
            <h4 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">
              Linkuri rapide
            </h4>
            <ul className="space-y-2.5">
              {QUICK_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-stone-500 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">
              Contact
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-sm text-stone-500">
                <MapPin className="w-4 h-4 mt-0.5 shrink-0 text-stone-600" />
                Str. Ștefan cel Mare 123, Chișinău
              </li>
              <li className="flex items-center gap-3 text-sm text-stone-500">
                <Phone className="w-4 h-4 shrink-0 text-stone-600" />
                +373 22 123 456
              </li>
              <li className="flex items-center gap-3 text-sm text-stone-500">
                <Mail className="w-4 h-4 shrink-0 text-stone-600" />
                salut@pawora.md
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-stone-800 pt-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-stone-600">
            &copy; {new Date().getFullYear()} Pawora. Toate drepturile rezervate.
          </p>
          <p className="text-xs text-stone-600">
            Proiect de practică — nu se procesează tranzacții reale.
          </p>
        </div>
      </div>
    </footer>
  );
}
