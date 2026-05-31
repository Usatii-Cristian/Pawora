import Link from 'next/link';
import Image from 'next/image';

const CATEGORY_META = {
  dogs:           { label: 'Câini',         overlay: 'from-amber-900/60 to-amber-700/30' },
  cats:           { label: 'Pisici',        overlay: 'from-violet-900/60 to-violet-700/30' },
  birds:          { label: 'Păsări',        overlay: 'from-sky-900/60 to-sky-700/30' },
  fish:           { label: 'Pești',         overlay: 'from-blue-900/60 to-blue-700/30' },
  'small-animals':{ label: 'Animale Mici',  overlay: 'from-pink-900/60 to-pink-700/30' },
};

export default function CategoryCard({ category }) {
  const meta = CATEGORY_META[category.slug] ?? {
    label: category.name,
    overlay: 'from-stone-900/60 to-stone-700/30',
  };

  return (
    <Link
      href={`/products?category=${category.slug}`}
      className="group relative block rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 aspect-square"
    >
      {/* Imagine 1:1 */}
      {category.image ? (
        <Image
          src={category.image}
          alt={meta.label}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
        />
      ) : (
        <div className="absolute inset-0 bg-stone-200" />
      )}

      {/* Overlay gradient de jos în sus pentru text */}
      <div className={`absolute inset-0 bg-gradient-to-t ${meta.overlay} group-hover:opacity-80 transition-opacity duration-300`} />

      {/* Nume categorie */}
      <div className="absolute bottom-0 left-0 right-0 p-4">
        <p className="text-white font-bold text-sm leading-tight drop-shadow-md">
          {meta.label}
        </p>
      </div>
    </Link>
  );
}
