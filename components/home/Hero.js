import Link from 'next/link';
import {
  ArrowRight,
  Shield,
  Truck,
  Star,
  PawPrint,
  Dog,
  Cat,
  Bird,
  Fish,
} from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-stone-50 via-white to-green-50">
      {/* Decorative blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-32 -right-32 w-[500px] h-[500px] bg-green-100 rounded-full opacity-40 blur-3xl" />
        <div className="absolute bottom-0 -left-16 w-80 h-80 bg-orange-100 rounded-full opacity-30 blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left — Copy */}
          <div>
            <div className="inline-flex items-center gap-2 bg-green-50 text-green-700 text-sm font-medium px-3 py-1.5 rounded-full mb-6 border border-green-100">
              <Star className="w-3.5 h-3.5 fill-green-500 text-green-500" />
              Trusted by 10,000+ pet owners
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-bold text-stone-900 leading-[1.1] mb-5">
              Everything Your
              <br />
              <span className="text-green-700">Pet Deserves</span>
            </h1>

            <p className="text-lg text-stone-600 leading-relaxed mb-8 max-w-md">
              Premium food, toys, and accessories for every animal companion.
              Curated with care, delivered fast.
            </p>

            <div className="flex flex-wrap gap-3 mb-12">
              <Link
                href="/products"
                className="inline-flex items-center gap-2 bg-green-700 text-white font-semibold px-6 py-3.5 rounded-xl hover:bg-green-800 transition-colors shadow-sm shadow-green-900/10"
              >
                Shop Now
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/products"
                className="inline-flex items-center gap-2 bg-white text-stone-700 font-semibold px-6 py-3.5 rounded-xl border border-stone-200 hover:bg-stone-50 hover:border-stone-300 transition-all"
              >
                Browse Categories
              </Link>
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap gap-5">
              <div className="flex items-center gap-2 text-sm text-stone-600">
                <div className="w-7 h-7 bg-green-50 rounded-lg flex items-center justify-center">
                  <Truck className="w-3.5 h-3.5 text-green-700" />
                </div>
                Free shipping over $50
              </div>
              <div className="flex items-center gap-2 text-sm text-stone-600">
                <div className="w-7 h-7 bg-green-50 rounded-lg flex items-center justify-center">
                  <Shield className="w-3.5 h-3.5 text-green-700" />
                </div>
                Secure checkout
              </div>
            </div>
          </div>

          {/* Right — Visual showcase */}
          <div className="relative hidden lg:flex items-center justify-center">
            <div className="relative w-72">
              {/* Main card */}
              <div className="bg-gradient-to-br from-green-600 to-green-800 rounded-3xl px-8 py-10 text-white text-center shadow-2xl shadow-green-900/25">
                <div className="w-20 h-20 bg-white/15 rounded-2xl flex items-center justify-center mx-auto mb-5">
                  <PawPrint className="w-10 h-10 text-white" />
                </div>
                <div className="text-5xl font-bold mb-1">500+</div>
                <div className="text-green-200 text-sm mb-7">
                  Premium Pet Products
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { icon: Dog, label: 'Dogs', count: '120+' },
                    { icon: Cat, label: 'Cats', count: '95+' },
                    { icon: Bird, label: 'Birds', count: '60+' },
                    { icon: Fish, label: 'Fish', count: '80+' },
                  ].map(({ icon: Icon, label, count }) => (
                    <div
                      key={label}
                      className="bg-white/10 rounded-xl py-2.5 px-3"
                    >
                      <Icon className="w-4 h-4 mx-auto mb-1 text-green-200" />
                      <div className="text-xs font-medium">{count}</div>
                      <div className="text-[11px] text-green-300">{label}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Floating badge — top left */}
              <div className="absolute -top-5 -left-10 bg-white rounded-2xl shadow-lg border border-stone-100 px-4 py-3 flex items-center gap-3">
                <div className="w-9 h-9 bg-orange-100 rounded-xl flex items-center justify-center shrink-0">
                  <Star className="w-4 h-4 text-orange-500 fill-orange-400" />
                </div>
                <div>
                  <div className="font-bold text-stone-900 text-sm leading-none mb-0.5">
                    4.9 / 5.0
                  </div>
                  <div className="text-xs text-stone-500">Customer Rating</div>
                </div>
              </div>

              {/* Floating badge — bottom right */}
              <div className="absolute -bottom-5 -right-10 bg-white rounded-2xl shadow-lg border border-stone-100 px-4 py-3 flex items-center gap-3">
                <div className="w-9 h-9 bg-green-100 rounded-xl flex items-center justify-center shrink-0">
                  <Truck className="w-4 h-4 text-green-700" />
                </div>
                <div>
                  <div className="font-bold text-stone-900 text-sm leading-none mb-0.5">
                    Fast Delivery
                  </div>
                  <div className="text-xs text-stone-500">1–3 business days</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
