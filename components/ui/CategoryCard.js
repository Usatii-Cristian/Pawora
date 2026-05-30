import Link from 'next/link';
import { Dog, Cat, Bird, Fish, Rabbit, PawPrint, ArrowRight } from 'lucide-react';

const CATEGORY_META = {
  dogs: {
    icon: Dog,
    gradient: 'from-amber-400 to-orange-500',
    lightBg: 'bg-amber-50',
    ring: 'ring-amber-200',
    text: 'text-amber-700',
    pill: 'bg-amber-100 text-amber-800',
  },
  cats: {
    icon: Cat,
    gradient: 'from-violet-400 to-purple-600',
    lightBg: 'bg-violet-50',
    ring: 'ring-violet-200',
    text: 'text-violet-700',
    pill: 'bg-violet-100 text-violet-800',
  },
  birds: {
    icon: Bird,
    gradient: 'from-sky-400 to-cyan-500',
    lightBg: 'bg-sky-50',
    ring: 'ring-sky-200',
    text: 'text-sky-700',
    pill: 'bg-sky-100 text-sky-800',
  },
  fish: {
    icon: Fish,
    gradient: 'from-blue-400 to-indigo-500',
    lightBg: 'bg-blue-50',
    ring: 'ring-blue-200',
    text: 'text-blue-700',
    pill: 'bg-blue-100 text-blue-800',
  },
  'small-animals': {
    icon: Rabbit,
    gradient: 'from-pink-400 to-rose-500',
    lightBg: 'bg-pink-50',
    ring: 'ring-pink-200',
    text: 'text-pink-700',
    pill: 'bg-pink-100 text-pink-800',
  },
};

export default function CategoryCard({ category }) {
  const meta = CATEGORY_META[category.slug] ?? {
    icon: PawPrint,
    gradient: 'from-emerald-400 to-green-600',
    lightBg: 'bg-green-50',
    ring: 'ring-green-200',
    text: 'text-green-700',
    pill: 'bg-green-100 text-green-800',
  };
  const Icon = meta.icon;

  return (
    <Link
      href={`/products?category=${category.slug}`}
      className={`group relative flex flex-col items-center gap-4 p-6 rounded-3xl bg-white border border-stone-100 shadow-sm overflow-hidden transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-stone-900/10 hover:border-transparent`}
    >
      {/* Gradient background blob — reveals on hover */}
      <div className={`absolute inset-0 bg-gradient-to-br ${meta.gradient} opacity-0 group-hover:opacity-8 transition-opacity duration-300`} />

      {/* Icon container with gradient */}
      <div className={`relative w-16 h-16 rounded-2xl bg-gradient-to-br ${meta.gradient} flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
        <Icon className="w-7 h-7 text-white drop-shadow-sm" />
      </div>

      {/* Text */}
      <div className="relative text-center">
        <p className="font-bold text-stone-900 text-sm group-hover:text-stone-800 transition-colors">
          {category.name}
        </p>
        <span className={`inline-block mt-1.5 text-[11px] font-semibold px-2.5 py-0.5 rounded-full ${meta.pill}`}>
          {category.productCount} produse
        </span>
      </div>

      {/* Arrow indicator */}
      <ArrowRight className={`absolute bottom-4 right-4 w-4 h-4 ${meta.text} opacity-0 group-hover:opacity-100 translate-x-1 group-hover:translate-x-0 transition-all duration-300`} />
    </Link>
  );
}
