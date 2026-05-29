import Link from 'next/link';
import { Dog, Cat, Bird, Fish, Rabbit, PawPrint } from 'lucide-react';

const CATEGORY_META = {
  dogs: {
    icon: Dog,
    bg: 'bg-amber-50',
    text: 'text-amber-700',
    border: 'border-amber-100',
    hoverBg: 'group-hover:bg-amber-100',
  },
  cats: {
    icon: Cat,
    bg: 'bg-violet-50',
    text: 'text-violet-700',
    border: 'border-violet-100',
    hoverBg: 'group-hover:bg-violet-100',
  },
  birds: {
    icon: Bird,
    bg: 'bg-sky-50',
    text: 'text-sky-700',
    border: 'border-sky-100',
    hoverBg: 'group-hover:bg-sky-100',
  },
  fish: {
    icon: Fish,
    bg: 'bg-blue-50',
    text: 'text-blue-700',
    border: 'border-blue-100',
    hoverBg: 'group-hover:bg-blue-100',
  },
  'small-animals': {
    icon: Rabbit,
    bg: 'bg-pink-50',
    text: 'text-pink-700',
    border: 'border-pink-100',
    hoverBg: 'group-hover:bg-pink-100',
  },
};

export default function CategoryCard({ category }) {
  const meta = CATEGORY_META[category.slug] ?? {
    icon: PawPrint,
    bg: 'bg-green-50',
    text: 'text-green-700',
    border: 'border-green-100',
    hoverBg: 'group-hover:bg-green-100',
  };
  const Icon = meta.icon;

  return (
    <Link
      href={`/products?category=${category.slug}`}
      className="group flex flex-col items-center gap-3 p-5 bg-white rounded-2xl border border-stone-100 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-0.5 text-center"
    >
      <div
        className={`w-14 h-14 rounded-2xl ${meta.bg} ${meta.border} border flex items-center justify-center ${meta.hoverBg} transition-colors duration-300`}
      >
        <Icon className={`w-6 h-6 ${meta.text} group-hover:scale-110 transition-transform duration-300`} />
      </div>
      <div>
        <p className="font-semibold text-stone-900 text-sm">{category.name}</p>
        <p className="text-xs text-stone-500 mt-0.5">
          {category.productCount} products
        </p>
      </div>
    </Link>
  );
}
