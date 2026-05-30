'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import {
  ChevronRight, Package, CheckCircle, Truck,
  CreditCard, Lock, User, MapPin, Phone, StickyNote,
  ChevronDown, ShieldCheck,
} from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { FREE_SHIPPING_THRESHOLD, SHIPPING_FEE } from '@/lib/currency';

const inputClass =
  'w-full px-4 py-3 rounded-xl border border-stone-200 text-sm text-stone-900 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 transition-all placeholder:text-stone-400 bg-white';
const labelClass = 'block text-sm font-semibold text-stone-700 mb-1.5';

function StepHeader({ step, current, label }) {
  const done = current > step;
  const active = current === step;
  return (
    <div className={`flex items-center gap-3 py-4 px-5 border-b border-stone-100 ${active ? 'bg-white' : 'bg-stone-50/60'}`}>
      <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 transition-colors ${
        done ? 'bg-emerald-500 text-white' : active ? 'bg-stone-900 text-white' : 'bg-stone-200 text-stone-500'
      }`}>
        {done ? <CheckCircle className="w-4 h-4" /> : step}
      </div>
      <span className={`text-sm font-semibold ${active ? 'text-stone-900' : done ? 'text-emerald-700' : 'text-stone-400'}`}>
        {label}
      </span>
      {done && <span className="ml-auto text-[11px] text-emerald-600 font-medium">Completat ✓</span>}
    </div>
  );
}

export default function CheckoutPage() {
  const { items, total, clearCart } = useCart();
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [orderId, setOrderId] = useState('');

  const shipping = total >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FEE;
  const orderTotal = total + shipping;

  const [contact, setContact] = useState({ name: '', phone: '', address: '', city: '', notes: '' });
  const [card, setCard] = useState({ number: '', holder: '', expiry: '', cvv: '' });

  const setContactField = (f) => (e) => setContact((p) => ({ ...p, [f]: e.target.value }));
  const setCardField = (f) => (e) => {
    let v = e.target.value.replace(/\D/g, '');
    if (f === 'number') v = v.slice(0, 16).replace(/(\d{4})/g, '$1 ').trim();
    if (f === 'expiry') {
      v = e.target.value.replace(/\D/g, '').slice(0, 4);
      if (v.length >= 3) v = v.slice(0, 2) + '/' + v.slice(2);
    }
    if (f === 'cvv') v = v.slice(0, 3);
    if (f === 'holder') v = e.target.value.toUpperCase().slice(0, 26);
    setCard((p) => ({ ...p, [f]: v }));
  };

  const cardBrand = () => {
    const n = card.number.replace(/\s/g, '');
    if (n.startsWith('4')) return 'VISA';
    if (/^5[1-5]/.test(n) || /^2[2-7]/.test(n)) return 'MC';
    return null;
  };

  if (items.length === 0 && !success) {
    router.replace('/cart');
    return null;
  }

  if (success) {
    return (
      <div className="min-h-screen bg-stone-50 flex items-center justify-center px-4">
        <div className="text-center max-w-md animate-bounce-in">
          <div className="w-24 h-24 bg-emerald-100 rounded-3xl flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-12 h-12 text-emerald-500" />
          </div>
          <h1 className="text-2xl font-bold text-stone-900 mb-2">Comandă plasată!</h1>
          <p className="text-stone-500 mb-2">
            Comanda <span className="font-mono font-semibold text-stone-700">#{orderId}</span> a fost înregistrată.
          </p>
          <p className="text-stone-500 mb-8 text-sm">
            Vei fi contactat în curând pentru confirmare și detalii de livrare.
          </p>
          <div className="flex gap-3 justify-center">
            <Link href="/products" className="inline-flex items-center gap-2 bg-emerald-500 text-white font-semibold px-6 py-3.5 rounded-xl hover:bg-emerald-600 transition-colors">
              Continuă cumpărăturile
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const handleContact = (e) => {
    e.preventDefault();
    if (!contact.name || !contact.phone || !contact.address || !contact.city) return;
    setStep(2);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOrder = async (e) => {
    e.preventDefault();
    if (!card.number || !card.holder || !card.expiry || !card.cvv) {
      setError('Completați toate câmpurile cardului.');
      return;
    }
    setError('');
    setLoading(true);
    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customer: contact,
          items: items.map((i) => ({ id: i.id, name: i.name, price: i.price, quantity: i.quantity })),
          total,
          shipping,
        }),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error || 'Eroare.'); return; }
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <nav className="flex items-center gap-1.5 text-sm text-stone-500 mb-1">
            <Link href="/" className="hover:text-stone-900 transition-colors">Acasă</Link>
            <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
            <Link href="/cart" className="hover:text-stone-900 transition-colors">Coș</Link>
            <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
            <span className="text-stone-900 font-medium">Finalizare comandă</span>
          </nav>
          <h1 className="text-xl font-bold text-stone-900">Finalizare comandă</h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* ── FORM ── */}
          <div className="lg:col-span-2 space-y-4">

            {/* STEP 1 — Date livrare */}
            <div className="bg-white rounded-2xl border border-stone-100 shadow-sm overflow-hidden">
              <StepHeader step={1} current={step} label="Date de livrare" />
              {step === 1 && (
                <form onSubmit={handleContact} className="p-6 space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className={labelClass}>
                        <User className="w-3.5 h-3.5 inline mr-1.5 text-stone-400" />Nume complet *
                      </label>
                      <input type="text" value={contact.name} onChange={setContactField('name')}
                        placeholder="Ion Popescu" required className={inputClass} />
                    </div>
                    <div>
                      <label className={labelClass}>
                        <Phone className="w-3.5 h-3.5 inline mr-1.5 text-stone-400" />Telefon *
                      </label>
                      <input type="tel" value={contact.phone} onChange={setContactField('phone')}
                        placeholder="+373 60 000 000" required className={inputClass} />
                    </div>
                  </div>
                  <div>
                    <label className={labelClass}>
                      <MapPin className="w-3.5 h-3.5 inline mr-1.5 text-stone-400" />Stradă și număr *
                    </label>
                    <input type="text" value={contact.address} onChange={setContactField('address')}
                      placeholder="Str. Ștefan cel Mare, nr. 1" required className={inputClass} />
                  </div>
                  <div>
                    <label className={labelClass}>Oraș / Localitate *</label>
                    <input type="text" value={contact.city} onChange={setContactField('city')}
                      placeholder="Chișinău" required className={inputClass} />
                  </div>
                  <div>
                    <label className={labelClass}>
                      <StickyNote className="w-3.5 h-3.5 inline mr-1.5 text-stone-400" />Note pentru curier
                    </label>
                    <textarea rows={2} value={contact.notes} onChange={setContactField('notes')}
                      placeholder="ex: Etaj 3, ap. 12, interfon 12..." className={`${inputClass} resize-none`} />
                  </div>
                  <button type="submit"
                    className="w-full bg-stone-900 text-white font-semibold py-3.5 rounded-xl hover:bg-emerald-700 transition-colors flex items-center justify-center gap-2 mt-2">
                    Continuă la plată
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </form>
              )}
              {step > 1 && (
                <div className="px-6 py-4 flex items-center justify-between">
                  <div className="text-sm text-stone-600">
                    <p className="font-medium text-stone-900">{contact.name} · {contact.phone}</p>
                    <p>{contact.address}, {contact.city}</p>
                  </div>
                  <button onClick={() => setStep(1)} className="text-xs text-emerald-700 font-medium hover:underline shrink-0">
                    Modifică
                  </button>
                </div>
              )}
            </div>

            {/* STEP 2 — Plată card */}
            <div className="bg-white rounded-2xl border border-stone-100 shadow-sm overflow-hidden">
              <StepHeader step={2} current={step} label="Plată cu cardul" />
              {step === 2 && (
                <form onSubmit={handleOrder} className="p-6 space-y-5">

                  {error && (
                    <div className="bg-red-50 text-red-700 text-sm px-4 py-3 rounded-xl border border-red-100">
                      {error}
                    </div>
                  )}

                  {/* Card preview */}
                  <div className="relative h-44 rounded-2xl overflow-hidden text-white p-5 flex flex-col justify-between select-none"
                    style={{ background: 'linear-gradient(135deg, #1e3a5f 0%, #1a6b5a 100%)' }}>
                    <div className="absolute inset-0 pointer-events-none overflow-hidden">
                      <div className="absolute -right-8 -top-8 w-40 h-40 rounded-full bg-white/5" />
                      <div className="absolute -left-4 -bottom-8 w-32 h-32 rounded-full bg-white/5" />
                    </div>
                    <div className="flex justify-between items-start">
                      <div className="w-10 h-7 bg-amber-300/90 rounded-md" />
                      {cardBrand() === 'VISA' && (
                        <span className="text-white font-black text-lg italic tracking-tighter">VISA</span>
                      )}
                      {cardBrand() === 'MC' && (
                        <div className="flex">
                          <div className="w-6 h-6 rounded-full bg-red-500/90" />
                          <div className="w-6 h-6 rounded-full bg-amber-400/90 -ml-2" />
                        </div>
                      )}
                    </div>
                    <div>
                      <p className="text-lg font-mono tracking-widest mb-2 text-white/90">
                        {card.number || '•••• •••• •••• ••••'}
                      </p>
                      <div className="flex justify-between text-xs text-white/70">
                        <div>
                          <p className="text-[10px] mb-0.5 uppercase tracking-wider">Titular</p>
                          <p className="font-semibold text-white/90 tracking-wider text-sm">
                            {card.holder || 'NUMELE TĂU'}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-[10px] mb-0.5 uppercase tracking-wider">Expiră</p>
                          <p className="font-semibold text-white/90 text-sm">{card.expiry || 'MM/YY'}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Card fields */}
                  <div>
                    <label className={labelClass}>
                      <CreditCard className="w-3.5 h-3.5 inline mr-1.5 text-stone-400" />Număr card *
                    </label>
                    <input type="text" value={card.number} onChange={setCardField('number')}
                      placeholder="0000 0000 0000 0000" maxLength={19} required
                      className={`${inputClass} font-mono tracking-widest`} />
                  </div>
                  <div>
                    <label className={labelClass}>Titular card *</label>
                    <input type="text" value={card.holder} onChange={setCardField('holder')}
                      placeholder="ION POPESCU" required className={`${inputClass} uppercase`} />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className={labelClass}>Data expirare *</label>
                      <input type="text" value={card.expiry} onChange={setCardField('expiry')}
                        placeholder="MM/YY" maxLength={5} required className={`${inputClass} font-mono`} />
                    </div>
                    <div>
                      <label className={labelClass}>CVV *</label>
                      <input type="password" value={card.cvv} onChange={setCardField('cvv')}
                        placeholder="•••" maxLength={3} required className={`${inputClass} font-mono`} />
                    </div>
                  </div>

                  {/* Security note */}
                  <div className="flex items-start gap-2.5 bg-emerald-50 border border-emerald-100 rounded-xl px-4 py-3">
                    <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <p className="text-xs text-emerald-700 leading-snug">
                      Plata este procesată securizat. Datele cardului sunt criptate SSL și nu sunt stocate
                      pe serverele noastre.
                    </p>
                  </div>

                  <button type="submit" disabled={loading}
                    className="w-full flex items-center justify-center gap-2 bg-emerald-600 text-white font-bold py-4 rounded-xl hover:bg-emerald-700 transition-all disabled:opacity-60 disabled:cursor-not-allowed hover:shadow-lg hover:shadow-emerald-600/25 text-base">
                    {loading ? (
                      <><div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />Se procesează...</>
                    ) : (
                      <><Lock className="w-4 h-4" />Plătește {orderTotal} lei</>
                    )}
                  </button>

                  <p className="text-xs text-stone-400 text-center">
                    Prin plasarea comenzii, confirmi că ai citit și ești de acord cu{' '}
                    <Link href="/termeni" className="text-emerald-700 hover:underline">Termenii de utilizare</Link>
                    {' '}și{' '}
                    <Link href="/confidentialitate" className="text-emerald-700 hover:underline">Politica de confidențialitate</Link>.
                  </p>
                </form>
              )}
            </div>
          </div>

          {/* ── ORDER SUMMARY ── */}
          <div>
            <div className="bg-white rounded-2xl border border-stone-100 shadow-sm p-6 sticky top-24">
              <h2 className="font-bold text-stone-900 mb-4 flex items-center gap-2">
                <Package className="w-4 h-4 text-stone-400" />
                Sumar ({items.length} {items.length === 1 ? 'produs' : 'produse'})
              </h2>

              <div className="space-y-3 mb-4 max-h-64 overflow-y-auto pr-1">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-3 items-center">
                    <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-stone-50 shrink-0">
                      <Image src={item.image} alt={item.name} fill className="object-cover" sizes="48px" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-stone-800 line-clamp-2 leading-snug">{item.name}</p>
                      <p className="text-xs text-stone-400 mt-0.5">×{item.quantity}</p>
                    </div>
                    <span className="text-xs font-bold text-stone-900 shrink-0">{item.price * item.quantity} lei</span>
                  </div>
                ))}
              </div>

              <div className="border-t border-stone-100 pt-3 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-stone-500">Subtotal</span>
                  <span className="font-medium">{total} lei</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-500">Livrare</span>
                  <span className={`font-medium ${shipping === 0 ? 'text-emerald-600' : ''}`}>
                    {shipping === 0 ? 'Gratuită' : `${shipping} lei`}
                  </span>
                </div>
                <div className="flex justify-between font-bold text-stone-900 pt-2 border-t border-stone-100 text-base">
                  <span>Total</span>
                  <span>{orderTotal} lei</span>
                </div>
              </div>

              {shipping === 0 ? (
                <div className="mt-3 flex items-center gap-1.5 text-xs text-emerald-700 bg-emerald-50 rounded-lg px-3 py-2">
                  <Truck className="w-3.5 h-3.5 shrink-0" />
                  Livrare gratuită inclusă!
                </div>
              ) : (
                <div className="mt-3 flex items-center gap-1.5 text-xs text-stone-500 bg-stone-50 rounded-lg px-3 py-2">
                  <Truck className="w-3.5 h-3.5 shrink-0" />
                  Gratuită de la {FREE_SHIPPING_THRESHOLD} lei
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
