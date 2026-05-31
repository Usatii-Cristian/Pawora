import { Truck, RotateCcw, ShieldCheck, Headset } from 'lucide-react';

const ITEMS = [
  {
    icon: Truck,
    title: 'Livrare în toată Moldova',
    description: 'Gratuită pentru comenzile peste 500 lei.',
  },
  {
    icon: RotateCcw,
    title: 'Retur în 30 de zile',
    description: 'Returnezi simplu, fără bătăi de cap.',
  },
  {
    icon: ShieldCheck,
    title: 'Produse originale',
    description: 'Doar branduri verificate și sigure.',
  },
  {
    icon: Headset,
    title: 'Suport dedicat',
    description: 'Suntem aici Luni–Vineri, 9:00–18:00.',
  },
];

export default function TrustSection() {
  return (
    <section className="border-y border-stone-200 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-stone-200">
          {ITEMS.map(({ icon: Icon, title, description }) => (
            <div key={title} className="flex items-start gap-4 px-2 sm:px-6 py-8">
              <div className="w-11 h-11 rounded-full border border-stone-200 flex items-center justify-center shrink-0 text-green-700">
                <Icon className="w-5 h-5" strokeWidth={1.75} />
              </div>
              <div>
                <h3 className="font-semibold text-stone-900 text-sm">{title}</h3>
                <p className="text-sm text-stone-500 mt-1 leading-relaxed">{description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
