import { Inter } from 'next/font/google';
import './globals.css';
import { CartProvider } from '@/context/CartContext';
import ConditionalLayout from '@/components/layout/ConditionalLayout';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata = {
  title: 'Pawora — Magazin Online pentru Animale',
  description:
    'Magazinul tău de încredere pentru animale de companie. Hrană premium, jucării și accesorii pentru orice animal. Livrare rapidă în toată Moldova.',
  openGraph: {
    title: 'Pawora — Magazin Online pentru Animale',
    description: 'Hrană premium, jucării și accesorii pentru orice animal de companie.',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-stone-50 font-[family-name:var(--font-inter)]">
        <CartProvider>
          <ConditionalLayout navbar={<Navbar />} footer={<Footer />}>
            {children}
          </ConditionalLayout>
        </CartProvider>
      </body>
    </html>
  );
}
