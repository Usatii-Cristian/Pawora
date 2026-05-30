import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Star, Truck, ShieldCheck, Sparkles, Package } from 'lucide-react';
import { getProducts } from '@/lib/store';
import { getCategoryLabel } from '@/lib/categories';

const TRUST_PILLS = [
  { icon: Truck, text: 'Livrare gratuită peste 500 lei' },
  { icon: ShieldCheck, text: 'Returnare 30 zile' },
  { icon: Package, text: 'Produse originale garantate' },
];

export default function Hero() {
  const products = getProducts();
  const showcase = products
    .filter((p) => p.featured || p.bestseller)
    .slice(0, 3);

  return (
    <section className="relative overflow-hidden bg-[#0f1f0f] min-h-[92vh] flex items-center">

      {/* ── Background decorations ── */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        {/* Large radial glow — top right */}
        <div className="absolute -top-32 -right-32 w-[700px] h-[700px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(34,197,94,0.18) 0%, transparent 70%)' }} />
        {/* Smaller glow — bottom left */}
        <div className="absolute -bottom-24 -left-24 w-[500px] h-[500px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(249,115,22,0.12) 0%, transparent 70%)' }} />
        {/* Subtle grid texture */}
        <div className="absolute inset-0 opacity-[0.04]"
          style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.5) 1px, transparent 1px)', backgroundSize: '48px 48px' }} />
      </div>

      <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">

          {/* ── LEFT — Copy ── */}
          <div className="order-2 lg:order-1 flex flex-col">

            {/* Eyebrow badge */}
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/15 text-emerald-300 text-xs font-semibold px-4 py-2 rounded-full w-fit mb-7 tracking-wide">
              <Sparkles className="w-3.5 h-3.5" />
              Magazin Premium pentru Animale
            </div>

            {/* Headline */}
            <h1 className="text-5xl sm:text-6xl lg:text-[3.75rem] xl:text-[4.25rem] font-extrabold leading-[1.04] tracking-tight text-white mb-6">
              Tot ce merită{' '}
              <span className="relative inline-block">
                <span className="relative z-10 text-transparent bg-clip-text"
                  style={{ backgroundImage: 'linear-gradient(135deg, #4ade80 0%, #86efac 50%, #fbbf24 100%)' }}>
                  animalul
                </span>
                {/* Underline accent */}
                <span className="absolute -bottom-1 left-0 w-full h-[3px] rounded-full bg-gradient-to-r from-emerald-400 to-amber-400 opacity-60" />
              </span>
              <br />tău.
            </h1>

            {/* Subtitle */}
            <p className="text-stone-400 text-lg leading-relaxed mb-10 max-w-[480px]">
              Hrană premium, jucării și accesorii selectate de experți. Livrare rapidă în toată Moldova — cu grijă și cu dragoste.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3 mb-10">
              <Link
                href="/products"
                className="group inline-flex items-center gap-2.5 bg-emerald-500 hover:bg-emerald-400 text-white font-bold px-8 py-4 rounded-2xl transition-all duration-200 hover:shadow-2xl hover:shadow-emerald-500/30 active:scale-[0.97]"
              >
                Cumpără acum
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
              <Link
                href="/products"
                className="inline-flex items-center gap-2 text-white/80 hover:text-white font-semibold px-8 py-4 rounded-2xl border border-white/20 hover:border-white/40 hover:bg-white/5 transition-all duration-200"
              >
                Explorează
              </Link>
            </div>

            {/* Trust pills */}
            <div className="flex flex-wrap gap-2 mb-10">
              {TRUST_PILLS.map(({ icon: Icon, text }) => (
                <div
                  key={text}
                  className="inline-flex items-center gap-2 bg-white/8 border border-white/10 text-stone-300 text-xs px-3.5 py-2 rounded-full"
                >
                  <Icon className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  {text}
                </div>
              ))}
            </div>

            {/* Stats row */}
            <div className="flex items-center gap-6 pt-7 border-t border-white/10">
              <div>
                <div className="text-2xl font-extrabold text-white">10.000+</div>
                <div className="text-xs text-stone-500 mt-0.5">Clienți mulțumiți</div>
              </div>
              <div className="w-px h-9 bg-white/10" />
              <div>
                <div className="flex items-center gap-0.5 mb-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                  ))}
                </div>
                <div className="text-xs text-stone-500">Rating mediu 4.9 / 5</div>
              </div>
              <div className="w-px h-9 bg-white/10" />
              <div>
                <div className="text-2xl font-extrabold text-white">50+</div>
                <div className="text-xs text-stone-500 mt-0.5">Produse disponibile</div>
              </div>
            </div>
          </div>

          {/* ── RIGHT — Product showcase ── */}
          <div className="order-1 lg:order-2 hidden sm:flex justify-center lg:justify-end">
            <div className="relative w-full max-w-[420px]">

              {/* Main card — center */}
              {showcase[0] && (
                <Link
                  href={`/products/${showcase[0].slug || showcase[0].id}`}
                  className="group block relative z-20 bg-white rounded-3xl overflow-hidden shadow-2xl shadow-black/40 hover:-translate-y-1 transition-transform duration-300"
                >
                  <div className="relative aspect-square bg-stone-100">
                    <Image
                      src={showcase[0].image}
                      alt={showcase[0].name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="420px"
                      priority
                    />
                    <span className="absolute top-3 left-3 bg-emerald-500 text-white text-[11px] font-bold px-2.5 py-1 rounded-full tracking-wide uppercase">
                      {showcase[0].bestseller ? 'Bestseller' : 'Featured'}
                    </span>
                  </div>
                  <div className="p-4">
                    <span className="text-xs font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                      {getCategoryLabel(showcase[0].category)}
                    </span>
                    <h3 className="font-bold text-stone-900 text-sm mt-2 leading-snug line-clamp-1">
                      {showcase[0].name}
                    </h3>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-lg font-extrabold text-stone-900">
                        {showcase[0].price} lei
                      </span>
                      <div className="flex items-center gap-0.5">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-3 h-3 text-amber-400 fill-amber-400" />
                        ))}
                      </div>
                    </div>
                  </div>
                </Link>
              )}

              {/* Secondary card — top right */}
              {showcase[1] && (
                <Link
                  href={`/products/${showcase[1].slug || showcase[1].id}`}
                  className="group absolute -top-6 -right-6 z-30 w-44 bg-white rounded-2xl overflow-hidden shadow-xl shadow-black/30 hover:-translate-y-1 hover:shadow-2xl transition-all duration-300"
                >
                  <div className="relative aspect-square bg-stone-100">
                    <Image
                      src={showcase[1].image}
                      alt={showcase[1].name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="176px"
                    />
                  </div>
                  <div className="p-2.5">
                    <p className="text-[11px] font-semibold text-stone-800 line-clamp-1">{showcase[1].name}</p>
                    <p className="text-xs font-bold text-emerald-700 mt-0.5">{showcase[1].price} lei</p>
                  </div>
                </Link>
              )}

              {/* Tertiary card — bottom left */}
              {showcase[2] && (
                <Link
                  href={`/products/${showcase[2].slug || showcase[2].id}`}
                  className="group absolute -bottom-6 -left-6 z-30 w-40 bg-white rounded-2xl overflow-hidden shadow-xl shadow-black/30 hover:-translate-y-1 hover:shadow-2xl transition-all duration-300"
                >
                  <div className="relative aspect-square bg-stone-100">
                    <Image
                      src={showcase[2].image}
                      alt={showcase[2].name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="160px"
                    />
                  </div>
                  <div className="p-2.5">
                    <p className="text-[11px] font-semibold text-stone-800 line-clamp-1">{showcase[2].name}</p>
                    <p className="text-xs font-bold text-emerald-700 mt-0.5">{showcase[2].price} lei</p>
                  </div>
                </Link>
              )}

              {/* Floating badge — rating */}
              <div className="absolute top-1/2 -left-10 -translate-y-1/2 z-40 bg-white rounded-2xl shadow-xl border border-stone-100 px-3.5 py-3 flex items-center gap-2.5">
                <div className="w-9 h-9 bg-amber-100 rounded-xl flex items-center justify-center shrink-0">
                  <Star className="w-4 h-4 text-amber-500 fill-amber-400" />
                </div>
                <div>
                  <div className="font-extrabold text-stone-900 text-sm leading-none">4.9 / 5</div>
                  <div className="text-[10px] text-stone-400 mt-0.5">Rating clienți</div>
                </div>
              </div>

              {/* Floating badge — delivery */}
              <div className="absolute -bottom-10 right-6 z-40 bg-emerald-500 rounded-2xl shadow-xl px-3.5 py-2.5 flex items-center gap-2">
                <Truck className="w-4 h-4 text-white shrink-0" />
                <div>
                  <div className="font-bold text-white text-xs leading-none">Livrare rapidă</div>
                  <div className="text-[10px] text-emerald-100 mt-0.5">1–3 zile lucrătoare</div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
