import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Star, Truck, CheckCircle, ShieldCheck } from 'lucide-react';
import { getProducts } from '@/lib/store';
import { getCategoryLabel } from '@/lib/categories';

export default function Hero() {
  const products = getProducts();
  const featuredProduct =
    products.find((p) => p.featured && p.bestseller) || products[0];

  return (
    <section className="relative overflow-hidden bg-white">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-0 w-[45%] h-full bg-stone-50" />
        <div className="absolute -top-40 right-48 w-[500px] h-[500px] bg-green-100/40 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-orange-100/30 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-center min-h-[88vh] py-16 lg:py-20">

          {/* LEFT */}
          <div className="order-2 lg:order-1">
            <h1 className="text-5xl sm:text-6xl lg:text-[4rem] xl:text-[4.5rem] font-extrabold text-stone-900 leading-[1.05] tracking-tight mb-6">
              Tot ce merită<br />
              animalul<br />
              <span className="text-green-700">tău.</span>
            </h1>

            <p className="text-lg sm:text-xl text-stone-500 leading-relaxed mb-10 max-w-lg">
              Hrană premium, jucării și accesorii selectate de experți în îngrijirea animalelor.
              Livrare rapidă, cu grijă.
            </p>

            <div className="flex flex-wrap gap-3 mb-12">
              <Link
                href="/products"
                className="inline-flex items-center gap-2 bg-green-700 text-white font-bold px-8 py-4 rounded-2xl hover:bg-green-800 transition-all hover:shadow-xl hover:shadow-green-900/15 active:scale-[0.98]"
              >
                Cumpără acum
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/products"
                className="inline-flex items-center gap-2 text-stone-700 font-semibold px-8 py-4 rounded-2xl border-2 border-stone-200 hover:border-stone-300 hover:bg-stone-50 transition-all"
              >
                Toate categoriile
              </Link>
            </div>

            <div className="flex flex-wrap items-center gap-6 pt-7 border-t border-stone-100">
              <div>
                <div className="text-2xl font-extrabold text-stone-900">10.000+</div>
                <div className="text-xs text-stone-500 mt-0.5">Clienți mulțumiți</div>
              </div>
              <div className="w-px h-10 bg-stone-200" />
              <div>
                <div className="flex items-center gap-0.5 mb-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-orange-400 fill-orange-400" />
                  ))}
                </div>
                <div className="text-xs text-stone-500">Rating mediu 4.9</div>
              </div>
              <div className="w-px h-10 bg-stone-200 hidden sm:block" />
              <div className="hidden sm:flex items-center gap-2 text-sm text-stone-500">
                <Truck className="w-4 h-4 text-green-600 shrink-0" />
                Livrare gratuită peste 500 lei
              </div>
            </div>
          </div>

          {/* RIGHT — Featured Product Spotlight */}
          <div className="order-1 lg:order-2 relative hidden sm:block">
            <div className="relative max-w-sm mx-auto lg:mx-0 lg:ml-auto">
              <div className="bg-white rounded-3xl border border-stone-200 shadow-2xl shadow-stone-900/10 overflow-hidden">
                <div className="flex items-center justify-between px-5 py-3 bg-green-700">
                  <div className="flex items-center gap-1.5">
                    <Star className="w-3.5 h-3.5 text-white fill-white" />
                    <span className="text-white text-xs font-bold uppercase tracking-wide">
                      Cel mai vândut
                    </span>
                  </div>
                  <span className="text-green-200 text-[11px]">Alegerea săptămânii</span>
                </div>

                <div className="relative aspect-[4/3] overflow-hidden bg-stone-50">
                  <Image
                    src={featuredProduct.image}
                    alt={featuredProduct.name}
                    fill
                    className="object-cover"
                    priority
                    sizes="(max-width: 1024px) 100vw, 480px"
                  />
                </div>

                <div className="p-5">
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div>
                      <span className="text-xs font-medium text-green-700 bg-green-50 px-2 py-0.5 rounded-full">
                        {getCategoryLabel(featuredProduct.category)}
                      </span>
                      <h3 className="font-bold text-stone-900 text-base mt-1.5 leading-snug">
                        {featuredProduct.name}
                      </h3>
                    </div>
                    <div className="shrink-0 text-right">
                      <div className="text-2xl font-extrabold text-stone-900">
                        {featuredProduct.price} lei
                      </div>
                      <div className="text-xs text-green-600 mt-0.5">În stoc</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 text-orange-400 fill-orange-400" />
                    ))}
                    <span className="text-xs text-stone-400 ml-1.5">256 recenzii</span>
                  </div>

                  <Link
                    href={`/products/${featuredProduct.slug || featuredProduct.id}`}
                    className="flex items-center justify-center gap-2 w-full bg-green-700 text-white font-semibold py-3 rounded-xl hover:bg-green-800 transition-colors text-sm"
                  >
                    Vezi produsul
                    <ArrowRight className="w-4 h-4" />
                  </Link>

                  <div className="mt-4 pt-4 border-t border-stone-100 flex items-center gap-5 text-xs text-stone-500">
                    <div className="flex items-center gap-1.5">
                      <CheckCircle className="w-3.5 h-3.5 text-green-600" />
                      Livrare gratuită
                    </div>
                    <div className="flex items-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-green-600" />
                      Returnare 30 zile
                    </div>
                  </div>
                </div>
              </div>

              <div className="absolute -top-4 -right-5 bg-white rounded-2xl shadow-xl border border-stone-100 px-3.5 py-2.5 flex items-center gap-2.5">
                <div className="w-9 h-9 bg-orange-100 rounded-xl flex items-center justify-center shrink-0">
                  <Star className="w-4 h-4 text-orange-500 fill-orange-400" />
                </div>
                <div>
                  <div className="font-bold text-stone-900 text-sm leading-none">4.9 / 5.0</div>
                  <div className="text-[11px] text-stone-500 mt-0.5">Rating clienți</div>
                </div>
              </div>

              <div className="absolute -bottom-4 -left-5 bg-white rounded-2xl shadow-xl border border-stone-100 px-3.5 py-2.5 flex items-center gap-2.5">
                <div className="w-9 h-9 bg-green-100 rounded-xl flex items-center justify-center shrink-0">
                  <Truck className="w-4 h-4 text-green-700" />
                </div>
                <div>
                  <div className="font-bold text-stone-900 text-sm leading-none">Livrare rapidă</div>
                  <div className="text-[11px] text-stone-500 mt-0.5">1–3 zile lucrătoare</div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
