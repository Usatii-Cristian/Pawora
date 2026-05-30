'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ChevronRight, Package, CheckCircle, Truck } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { FREE_SHIPPING_THRESHOLD, SHIPPING_FEE } from '@/lib/currency';

const inputClass =
  'w-full px-4 py-3 rounded-xl border border-stone-200 text-sm text-stone-900 outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100 transition-all placeholder:text-stone-400 bg-white';
const labelClass = 'block text-sm font-medium text-stone-700 mb-1.5';

export default function CheckoutPage() {
  const { items, total, clearCart } = useCart();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [orderId, setOrderId] = useState('');

  const shipping = total >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FEE;
  const orderTotal = total + shipping;

  const [form, setForm] = useState({
    name: '',
    phone: '',
    address: '',
    city: '',
    notes: '',
  });

  const setField = (field) => (e) =>
    setForm((f) => ({ ...f, [field]: e.target.value }));

  if (items.length === 0 && !success) {
    router.replace('/cart');
    return null;
  }

  if (success) {
    return (
      <div className="min-h-screen bg-stone-50 flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="w-20 h-20 bg-green-100 rounded-3xl flex items-center justify-center mx-auto mb-5">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>
          <h1 className="text-2xl font-bold text-stone-900 mb-2">Comandă plasată!</h1>
          <p className="text-stone-500 mb-2">
            Comanda ta <span className="font-mono font-semibold text-stone-700">#{orderId}</span> a fost înregistrată cu succes.
          </p>
          <p className="text-stone-500 mb-8 text-sm">
            Te vom contacta în curând pe numărul de telefon furnizat pentru a confirma comanda și livrarea.
          </p>
          <Link
            href="/products"
            className="inline-flex items-center gap-2 bg-green-700 text-white font-semibold px-6 py-3.5 rounded-xl hover:bg-green-800 transition-colors"
          >
            Continuă cumpărăturile
          </Link>
        </div>
      </div>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customer: form,
          items: items.map((i) => ({
            id: i.id,
            name: i.name,
            price: i.price,
            quantity: i.quantity,
          })),
          total,
          shipping,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'A apărut o eroare.');
        return;
      }

      clearCart();
      setOrderId(data.orderId);
      setSuccess(true);
    } catch {
      setError('Eroare de rețea. Încearcă din nou.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Header */}
      <div className="bg-white border-b border-stone-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <nav className="flex items-center gap-1.5 text-sm text-stone-500 mb-2">
            <Link href="/" className="hover:text-stone-900 transition-colors">Acasă</Link>
            <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
            <Link href="/cart" className="hover:text-stone-900 transition-colors">Coș</Link>
            <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
            <span className="text-stone-900 font-medium">Finalizare comandă</span>
          </nav>
          <h1 className="text-2xl font-bold text-stone-900">Finalizare comandă</h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-5">
              {error && (
                <div className="bg-red-50 text-red-700 text-sm px-4 py-3 rounded-xl border border-red-100">
                  {error}
                </div>
              )}

              <div className="bg-white rounded-2xl border border-stone-100 shadow-sm p-6 space-y-4">
                <h2 className="font-semibold text-stone-900">Date de contact</h2>

                <div>
                  <label className={labelClass}>Nume complet *</label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={setField('name')}
                    placeholder="Ion Popescu"
                    required
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className={labelClass}>Număr de telefon *</label>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={setField('phone')}
                    placeholder="+373 60 000 000"
                    required
                    className={inputClass}
                  />
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-stone-100 shadow-sm p-6 space-y-4">
                <h2 className="font-semibold text-stone-900">Adresa de livrare</h2>

                <div>
                  <label className={labelClass}>Stradă și număr *</label>
                  <input
                    type="text"
                    value={form.address}
                    onChange={setField('address')}
                    placeholder="Str. Ștefan cel Mare, nr. 1"
                    required
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className={labelClass}>Oraș / Localitate *</label>
                  <input
                    type="text"
                    value={form.city}
                    onChange={setField('city')}
                    placeholder="Chișinău"
                    required
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className={labelClass}>Note pentru curier</label>
                  <textarea
                    rows={3}
                    value={form.notes}
                    onChange={setField('notes')}
                    placeholder="ex: Etajul 3, apartament 12, interfon 12..."
                    className={`${inputClass} resize-none`}
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 bg-green-700 text-white font-semibold py-4 rounded-xl hover:bg-green-800 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Se procesează...
                  </>
                ) : (
                  <>
                    <Package className="w-4 h-4" />
                    Plasează comanda — {orderTotal} lei
                  </>
                )}
              </button>

              <p className="text-xs text-stone-400 text-center">
                Vei fi contactat telefonic pentru confirmarea comenzii și stabilirea orei de livrare.
              </p>
            </form>
          </div>

          {/* Sumar */}
          <div>
            <div className="bg-white rounded-2xl border border-stone-100 shadow-sm p-6 sticky top-24">
              <h2 className="font-semibold text-stone-900 mb-4">
                Sumar comandă ({items.length} {items.length === 1 ? 'produs' : 'produse'})
              </h2>

              <div className="space-y-3 mb-4 max-h-60 overflow-y-auto">
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span className="text-stone-600 leading-snug line-clamp-2 flex-1 mr-2">
                      {item.name}{' '}
                      <span className="text-stone-400">×{item.quantity}</span>
                    </span>
                    <span className="font-medium text-stone-900 shrink-0">
                      {item.price * item.quantity} lei
                    </span>
                  </div>
                ))}
              </div>

              <div className="border-t border-stone-100 pt-3 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-stone-600">Subtotal</span>
                  <span className="font-medium">{total} lei</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-stone-600">Livrare</span>
                  <span className={`font-medium ${shipping === 0 ? 'text-green-600' : ''}`}>
                    {shipping === 0 ? 'Gratuită' : `${shipping} lei`}
                  </span>
                </div>
                <div className="flex justify-between font-bold text-stone-900 pt-2 border-t border-stone-100">
                  <span>Total</span>
                  <span className="text-lg">{orderTotal} lei</span>
                </div>
              </div>

              <div className="mt-4 flex items-center gap-2 text-xs text-stone-500">
                <Truck className="w-3.5 h-3.5 text-green-600 shrink-0" />
                {shipping === 0
                  ? 'Livrare gratuită inclusă'
                  : `Livrare gratuită de la ${FREE_SHIPPING_THRESHOLD} lei`}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
