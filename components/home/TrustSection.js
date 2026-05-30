import { Truck, RotateCcw, ShieldCheck, Leaf } from 'lucide-react';
import FadeIn from '@/components/ui/FadeIn';

const TRUST_ITEMS = [
  {
    icon: Truck,
    title: 'Livrare gratuită',
    description: 'La toate comenzile peste 500 lei. Livrare rapidă și sigură în toată Moldova.',
    gradient: 'from-emerald-400 to-teal-500',
    glow: 'shadow-emerald-500/40',
  },
  {
    icon: RotateCcw,
    title: 'Returnare 30 zile',
    description: 'Nu ești mulțumit? Returnează orice produs în 30 de zile, fără explicații.',
    gradient: 'from-sky-400 to-blue-500',
    glow: 'shadow-sky-500/40',
  },
  {
    icon: ShieldCheck,
    title: 'Sigur și verificat',
    description: 'Toate produsele sunt aprobate de veterinari și sigure pentru animalele tale.',
    gradient: 'from-violet-400 to-purple-600',
    glow: 'shadow-violet-500/40',
  },
  {
    icon: Leaf,
    title: 'Ingrediente naturale',
    description: 'Prioritizăm ingrediente naturale și de calitate premium în fiecare produs.',
    gradient: 'from-lime-400 to-green-500',
    glow: 'shadow-lime-500/40',
  },
];

export default function TrustSection() {
  return (
    <section className="py-20 relative overflow-hidden bg-[#0f1f0f]">
      {/* Decorative glows */}
      <div className="absolute -top-24 left-1/4 w-80 h-80 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(52,211,153,0.15) 0%, transparent 70%)' }} />
      <div className="absolute -bottom-24 right-1/4 w-80 h-80 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(251,191,36,0.1) 0%, transparent 70%)' }} />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="text-center mb-12">
            <p className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-400 bg-emerald-400/10 border border-emerald-400/20 px-3 py-1 rounded-full mb-4 uppercase tracking-wider">
              De ce AquaPet?
            </p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
              Tot ce contează pentru{' '}
              <span className="text-transparent bg-clip-text"
                style={{ backgroundImage: 'linear-gradient(135deg, #4ade80, #fbbf24)' }}>
                animalul tău
              </span>
            </h2>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {TRUST_ITEMS.map((item, i) => {
            const Icon = item.icon;
            return (
              <FadeIn key={item.title} delay={i * 80}>
                <div className="group relative flex flex-col gap-4 p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/8 hover:border-white/20 transition-all duration-300 hover:-translate-y-1 overflow-hidden">
                  {/* Subtle gradient overlay on hover */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />

                  {/* Glowing icon */}
                  <div className={`relative w-12 h-12 rounded-xl bg-gradient-to-br ${item.gradient} flex items-center justify-center shadow-lg ${item.glow} group-hover:scale-110 group-hover:shadow-xl transition-all duration-300`}>
                    <Icon className="w-5 h-5 text-white drop-shadow" />
                  </div>

                  {/* Text */}
                  <div>
                    <h4 className="font-bold text-white text-sm mb-1.5">
                      {item.title}
                    </h4>
                    <p className="text-sm text-stone-400 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}
