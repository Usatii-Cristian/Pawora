import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Star, Truck, ShieldCheck, Sparkles, Package } from 'lucide-react';

const TRUST_PILLS = [
  { icon: Truck,       text: 'Livrare gratuită 500+ lei' },
  { icon: ShieldCheck, text: 'Produse verificate' },
  { icon: Package,     text: 'Retur 30 zile' },
];

export default function Hero() {
  return (
    <section className="relative w-full overflow-hidden" style={{ minHeight: '92vh' }}>

      {/* ── Imaginea de fundal ── */}
      <Image
        src="/hero-bg.png"
        alt="AquaPet — animale fericite"
        fill
        priority
        className="object-cover object-center"
        sizes="100vw"
      />

      {/* ── Gradient overlay stânga → transparent, pentru lizibilitate text ── */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(90deg, rgba(15,40,15,0.92) 0%, rgba(15,40,15,0.80) 35%, rgba(15,40,15,0.30) 60%, transparent 80%)',
        }}
      />

      {/* ── Conținut text — stânga ── */}
      <div className="relative z-10 h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
        <div className="w-full max-w-xl py-20 lg:py-28">

          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 border border-[#4ade80]/30 bg-[#4ade80]/10 text-[#4ade80] text-xs font-semibold px-4 py-1.5 rounded-full mb-7 backdrop-blur-sm tracking-wider uppercase animate-fade-in">
            <Sparkles className="w-3.5 h-3.5" />
            Magazin premium pentru animale
          </div>

          {/* Titlu principal — text care "crește" din imagine */}
          <h1
            className="font-extrabold leading-[1.04] tracking-tight mb-6 animate-fade-in-up"
            style={{
              fontSize: 'clamp(2.6rem, 5.5vw, 4.5rem)',
              animationDelay: '80ms',
            }}
          >
            {/* "Tot ce" — alb pur */}
            <span className="block text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.5)]">
              Tot ce
            </span>

            {/* "merită" — gradient verde care imită luminozitatea fundalului */}
            <span
              className="block text-transparent bg-clip-text"
              style={{
                backgroundImage:
                  'linear-gradient(135deg, #6ee7b7 0%, #4ade80 40%, #86efac 70%, #d1fae5 100%)',
                filter: 'drop-shadow(0 0 24px rgba(74,222,128,0.45))',
              }}
            >
              merită
            </span>

            {/* "animalul tău." — alb + accent */}
            <span className="block text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.5)]">
              animalul{' '}
              <span
                className="text-transparent bg-clip-text"
                style={{
                  backgroundImage:
                    'linear-gradient(135deg, #fde68a 0%, #fbbf24 50%, #f59e0b 100%)',
                }}
              >
                tău.
              </span>
            </span>
          </h1>

          {/* Subtitlu */}
          <p
            className="text-[#d1fae5]/80 text-lg leading-relaxed mb-9 max-w-md animate-fade-in-up"
            style={{ animationDelay: '160ms' }}
          >
            Hrană premium, jucării și accesorii selectate de experți.
            Livrare rapidă în toată Moldova — cu grijă și cu dragoste.
          </p>

          {/* CTA-uri */}
          <div
            className="flex flex-wrap gap-3 mb-10 animate-fade-in-up"
            style={{ animationDelay: '240ms' }}
          >
            <Link
              href="/products"
              className="group inline-flex items-center gap-2.5 font-bold px-8 py-4 rounded-2xl transition-all duration-200 active:scale-[0.97] hover:shadow-2xl"
              style={{
                background: 'linear-gradient(135deg, #16a34a, #15803d)',
                color: '#fff',
                boxShadow: '0 4px 24px rgba(22,163,74,0.4)',
              }}
            >
              Cumpără acum
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link
              href="/products"
              className="inline-flex items-center gap-2 font-semibold px-8 py-4 rounded-2xl backdrop-blur-sm transition-all duration-200"
              style={{
                color: '#d1fae5',
                border: '1.5px solid rgba(74,222,128,0.35)',
                background: 'rgba(74,222,128,0.08)',
              }}
            >
              Explorează
            </Link>
          </div>

          {/* Trust pills */}
          <div
            className="flex flex-wrap gap-2 mb-10 animate-fade-in-up"
            style={{ animationDelay: '320ms' }}
          >
            {TRUST_PILLS.map(({ icon: Icon, text }) => (
              <div
                key={text}
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full text-xs font-medium backdrop-blur-sm"
                style={{
                  color: '#bbf7d0',
                  border: '1px solid rgba(74,222,128,0.2)',
                  background: 'rgba(15,40,15,0.5)',
                }}
              >
                <Icon className="w-3.5 h-3.5 shrink-0" style={{ color: '#4ade80' }} />
                {text}
              </div>
            ))}
          </div>

          {/* Stats */}
          <div
            className="flex items-center gap-6 pt-7 animate-fade-in-up"
            style={{
              borderTop: '1px solid rgba(74,222,128,0.2)',
              animationDelay: '400ms',
            }}
          >
            <div>
              <div className="text-2xl font-extrabold text-white">10.000+</div>
              <div className="text-xs mt-0.5" style={{ color: '#86efac' }}>Clienți mulțumiți</div>
            </div>
            <div className="w-px h-9" style={{ background: 'rgba(74,222,128,0.2)' }} />
            <div>
              <div className="flex items-center gap-0.5 mb-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <div className="text-xs" style={{ color: '#86efac' }}>Rating 4.9 / 5</div>
            </div>
            <div className="w-px h-9" style={{ background: 'rgba(74,222,128,0.2)' }} />
            <div>
              <div className="text-2xl font-extrabold text-white">50+</div>
              <div className="text-xs mt-0.5" style={{ color: '#86efac' }}>Produse disponibile</div>
            </div>
          </div>

        </div>
      </div>

      {/* Scroll hint */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1.5 opacity-60 animate-float">
        <div className="w-5 h-8 rounded-full border-2 border-white/40 flex items-start justify-center pt-1.5">
          <div className="w-1 h-2 rounded-full bg-white/70 animate-bounce" />
        </div>
      </div>

    </section>
  );
}
