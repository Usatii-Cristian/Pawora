import Link from 'next/link';
import { PawPrint, Mail, Phone, MapPin, Globe, Share2, AtSign } from 'lucide-react';

const CATEGORY_LINKS = [
  { href: '/products?category=dogs', label: 'Dogs' },
  { href: '/products?category=cats', label: 'Cats' },
  { href: '/products?category=birds', label: 'Birds' },
  { href: '/products?category=fish', label: 'Fish' },
  { href: '/products?category=small-animals', label: 'Small Animals' },
];

const QUICK_LINKS = [
  { href: '/products', label: 'All Products' },
  { href: '/contact', label: 'Contact Us' },
  { href: '/cart', label: 'Shopping Cart' },
];

export default function Footer() {
  return (
    <footer className="bg-stone-900 text-stone-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-2 mb-4 w-fit">
              <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
                <PawPrint className="w-4 h-4 text-white" />
              </div>
              <span className="font-bold text-lg text-white">Pawora</span>
            </Link>
            <p className="text-sm leading-relaxed text-stone-500 mb-5">
              Your trusted online pet store. Premium products carefully selected
              for every animal companion.
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

          {/* Categories */}
          <div>
            <h4 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">
              Categories
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

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">
              Quick Links
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
                123 Pet Street, London EC1A 1BB
              </li>
              <li className="flex items-center gap-3 text-sm text-stone-500">
                <Phone className="w-4 h-4 shrink-0 text-stone-600" />
                +44 20 1234 5678
              </li>
              <li className="flex items-center gap-3 text-sm text-stone-500">
                <Mail className="w-4 h-4 shrink-0 text-stone-600" />
                hello@pawora.com
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-stone-800 pt-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-stone-600">
            &copy; {new Date().getFullYear()} Pawora. All rights reserved.
          </p>
          <p className="text-xs text-stone-600">
            Practice project — no real transactions are processed.
          </p>
        </div>
      </div>
    </footer>
  );
}
