import { Truck, RotateCcw, ShieldCheck, Leaf } from 'lucide-react';

const TRUST_ITEMS = [
  {
    icon: Truck,
    title: 'Livrare gratuită',
    description: 'La toate comenzile peste 500 lei. Livrare rapidă și sigură în toată Moldova.',
    color: 'text-green-700',
    bg: 'bg-green-50',
  },
  {
    icon: RotateCcw,
    title: 'Returnare 30 zile',
    description: 'Nu ești mulțumit? Returnează orice produs în 30 de zile, fără explicații.',
    color: 'text-blue-700',
    bg: 'bg-blue-50',
  },
  {
    icon: ShieldCheck,
    title: 'Sigur și verificat',
    description: 'Toate produsele sunt aprobate de veterinari și sigure pentru animalele tale.',
    color: 'text-violet-700',
    bg: 'bg-violet-50',
  },
  {
    icon: Leaf,
    title: 'Ingrediente naturale',
    description: 'Prioritizăm ingrediente naturale și de calitate premium în fiecare produs.',
    color: 'text-emerald-700',
    bg: 'bg-emerald-50',
  },
];

export default function TrustSection() {
  return (
    <section className="py-14 border-y border-stone-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {TRUST_ITEMS.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.title} className="flex gap-4 items-start">
                <div
                  className={`w-11 h-11 rounded-xl ${item.bg} flex items-center justify-center shrink-0`}
                >
                  <Icon className={`w-5 h-5 ${item.color}`} />
                </div>
                <div>
                  <h4 className="font-semibold text-stone-900 text-sm mb-1">
                    {item.title}
                  </h4>
                  <p className="text-sm text-stone-500 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
