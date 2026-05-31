import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative w-full overflow-hidden" style={{ minHeight: '100vh', height: '100dvh' }}>

      {/* Imaginea de fundal */}
      <Image
        src="/hero-bg.png"
        alt="AquaPet — animale fericite"
        fill
        priority
        className="object-cover object-center"
        sizes="100vw"
      />

      {/* Gradient overlay stânga → transparent */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(90deg, rgba(15,40,15,0.92) 0%, rgba(15,40,15,0.80) 35%, rgba(15,40,15,0.25) 60%, transparent 80%)',
        }}
      />

      {/* Text stânga */}
      <div className="relative z-10 h-full min-h-screen max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
        <div className="w-full max-w-xl py-20 lg:py-28">

          {/* Titlu — culori fixe, fără gradient */}
          <h1
            className="font-extrabold leading-[1.04] tracking-tight mb-6 animate-fade-in-up"
            style={{ fontSize: 'clamp(2.6rem, 5.5vw, 4.5rem)', animationDelay: '80ms' }}
          >
            <span className="block text-white">Tot ce</span>
            <span className="block" style={{ color: '#4ade80' }}>merită</span>
            <span className="block text-white">
              animalul <span style={{ color: '#fbbf24' }}>tău.</span>
            </span>
          </h1>

          {/* Subtitlu */}
          <p
            className="text-lg leading-relaxed mb-9 max-w-md animate-fade-in-up"
            style={{ color: '#d1fae5', animationDelay: '160ms' }}
          >
            Hrană premium, jucării și accesorii selectate de experți.
            Livrare rapidă în toată Moldova — cu grijă și cu dragoste.
          </p>

          {/* CTA-uri */}
          <div
            className="flex flex-wrap gap-3 animate-fade-in-up"
            style={{ animationDelay: '240ms' }}
          >
            <Link
              href="/products"
              className="group inline-flex items-center gap-2.5 font-bold px-8 py-4 rounded-2xl transition-all duration-200 active:scale-[0.97] hover:brightness-110"
              style={{
                background: '#16a34a',
                color: '#fff',
                boxShadow: '0 4px 24px rgba(22,163,74,0.4)',
              }}
            >
              Cumpără acum
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link
              href="/products"
              className="inline-flex items-center gap-2 font-semibold px-8 py-4 rounded-2xl backdrop-blur-sm transition-all duration-200 hover:bg-white/10"
              style={{
                color: '#d1fae5',
                border: '1.5px solid rgba(74,222,128,0.35)',
                background: 'rgba(74,222,128,0.08)',
              }}
            >
              Explorează
            </Link>
          </div>

        </div>
      </div>

    </section>
  );
}
