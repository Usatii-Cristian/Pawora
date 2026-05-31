'use client';

import { useState } from 'react';
import { Package, Trash2, ChevronDown, ChevronUp, Inbox, Phone, MapPin } from 'lucide-react';

const STATUSES = [
  { value: 'nou', label: 'Nou', color: 'bg-blue-50 text-blue-700 border-blue-200' },
  { value: 'procesat', label: 'Procesat', color: 'bg-amber-50 text-amber-700 border-amber-200' },
  { value: 'livrat', label: 'Livrat', color: 'bg-green-50 text-green-700 border-green-200' },
  { value: 'anulat', label: 'Anulat', color: 'bg-red-50 text-red-700 border-red-200' },
];

export default function OrdersClient({ initialOrders }) {
  const [orders, setOrders] = useState(initialOrders);
  const [expanded, setExpanded] = useState(null);

  const fmtDate = (iso) =>
    new Date(iso).toLocaleString('ro-RO', {
      day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit',
    });

  const setStatus = async (id, status) => {
    setOrders((list) => list.map((o) => (o.id === id ? { ...o, status } : o)));
    await fetch('/api/admin/orders', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, status }),
    });
  };

  const remove = async (id) => {
    if (!confirm('Ștergi această comandă definitiv?')) return;
    setOrders((list) => list.filter((o) => o.id !== id));
    await fetch('/api/admin/orders', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });
  };

  const statusMeta = (s) => STATUSES.find((x) => x.value === s) ?? STATUSES[0];

  if (orders.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-stone-100 shadow-sm py-20 text-center">
        <div className="w-16 h-16 bg-stone-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <Inbox className="w-7 h-7 text-stone-400" />
        </div>
        <p className="text-stone-500 font-medium">Nicio comandă încă</p>
        <p className="text-stone-400 text-sm mt-1">Comenzile plasate prin checkout vor apărea aici.</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {orders.map((o) => {
        const meta = statusMeta(o.status);
        const open = expanded === o.id;
        return (
          <div key={o.id} className="bg-white rounded-2xl border border-stone-100 shadow-sm overflow-hidden">
            <div className="flex items-center gap-4 p-4 flex-wrap">
              <div className="w-10 h-10 rounded-xl bg-stone-100 flex items-center justify-center shrink-0">
                <Package className="w-5 h-5 text-stone-500" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-semibold text-stone-900 text-sm">{o.customer?.name}</p>
                <p className="text-xs text-stone-400 font-mono">#{o.id} · {fmtDate(o.createdAt)}</p>
              </div>

              <div className="text-right shrink-0">
                <p className="font-bold text-stone-900">{o.orderTotal} lei</p>
                <p className="text-xs text-stone-400">{o.items?.length} produse</p>
              </div>

              <select
                value={o.status}
                onChange={(e) => setStatus(o.id, e.target.value)}
                className={`text-xs font-semibold px-3 py-1.5 rounded-full border outline-none cursor-pointer ${meta.color}`}
              >
                {STATUSES.map((s) => (
                  <option key={s.value} value={s.value}>{s.label}</option>
                ))}
              </select>

              <button
                onClick={() => setExpanded(open ? null : o.id)}
                className="p-2 text-stone-400 hover:text-stone-700 hover:bg-stone-100 rounded-lg transition-colors"
              >
                {open ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>
              <button
                onClick={() => remove(o.id)}
                className="p-2 text-stone-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            {open && (
              <div className="border-t border-stone-100 p-4 bg-stone-50/50 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <h4 className="text-xs font-semibold text-stone-500 uppercase tracking-wider mb-2">Livrare</h4>
                  <p className="text-sm text-stone-700 flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-stone-400" />{o.customer?.phone}
                  </p>
                  <p className="text-sm text-stone-700 flex items-start gap-1.5 mt-1">
                    <MapPin className="w-3.5 h-3.5 text-stone-400 mt-0.5" />
                    {o.customer?.address}, {o.customer?.city}
                  </p>
                  {o.customer?.notes && (
                    <p className="text-xs text-stone-500 mt-2 italic">„{o.customer.notes}"</p>
                  )}
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-stone-500 uppercase tracking-wider mb-2">Produse</h4>
                  <ul className="space-y-1">
                    {o.items?.map((it) => (
                      <li key={it.id} className="text-sm text-stone-700 flex justify-between gap-2">
                        <span className="truncate">{it.name} <span className="text-stone-400">×{it.quantity}</span></span>
                        <span className="font-medium shrink-0">{it.price * it.quantity} lei</span>
                      </li>
                    ))}
                  </ul>
                  <div className="border-t border-stone-200 mt-2 pt-2 flex justify-between text-sm">
                    <span className="text-stone-500">Livrare</span>
                    <span>{o.shipping === 0 ? 'Gratuită' : `${o.shipping} lei`}</span>
                  </div>
                  <div className="flex justify-between font-bold text-stone-900 text-sm mt-1">
                    <span>Total</span>
                    <span>{o.orderTotal} lei</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
