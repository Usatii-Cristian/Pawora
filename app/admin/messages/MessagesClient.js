'use client';

import { useState } from 'react';
import { Mail, MailOpen, Trash2, Inbox } from 'lucide-react';

export default function MessagesClient({ initialMessages }) {
  const [messages, setMessages] = useState(initialMessages);

  const unreadCount = messages.filter((m) => !m.read).length;

  const toggleRead = async (msg) => {
    const newRead = !msg.read;
    setMessages((list) => list.map((m) => (m.id === msg.id ? { ...m, read: newRead } : m)));
    await fetch('/api/admin/messages', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: msg.id, read: newRead }),
    });
  };

  const remove = async (id) => {
    if (!confirm('Ștergi acest mesaj definitiv?')) return;
    setMessages((list) => list.filter((m) => m.id !== id));
    await fetch('/api/admin/messages', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });
  };

  const fmtDate = (iso) =>
    new Date(iso).toLocaleString('ro-RO', {
      day: 'numeric', month: 'short', year: 'numeric',
      hour: '2-digit', minute: '2-digit',
    });

  if (messages.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-stone-100 shadow-sm py-20 text-center">
        <div className="w-16 h-16 bg-stone-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <Inbox className="w-7 h-7 text-stone-400" />
        </div>
        <p className="text-stone-500 font-medium">Niciun mesaj încă</p>
        <p className="text-stone-400 text-sm mt-1">
          Mesajele din formularul de contact vor apărea aici.
        </p>
      </div>
    );
  }

  return (
    <>
      {unreadCount > 0 && (
        <div className="mb-4 inline-flex items-center gap-2 text-sm bg-green-50 text-green-700 border border-green-100 px-3 py-1.5 rounded-full font-medium">
          <Mail className="w-3.5 h-3.5" />
          {unreadCount} {unreadCount === 1 ? 'mesaj necitit' : 'mesaje necitite'}
        </div>
      )}

      <div className="space-y-3">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`bg-white rounded-2xl border shadow-sm p-5 transition-colors ${
              msg.read ? 'border-stone-100' : 'border-green-200 bg-green-50/30'
            }`}
          >
            <div className="flex items-start justify-between gap-4 flex-wrap">
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-semibold text-stone-900">{msg.name}</span>
                  {!msg.read && (
                    <span className="text-[10px] font-bold uppercase bg-green-600 text-white px-2 py-0.5 rounded-full">
                      Nou
                    </span>
                  )}
                </div>
                <a
                  href={`mailto:${msg.email}`}
                  className="text-sm text-green-700 hover:underline"
                >
                  {msg.email}
                </a>
                <p className="text-xs text-stone-400 mt-0.5">{fmtDate(msg.createdAt)}</p>
              </div>

              <div className="flex items-center gap-1.5 shrink-0">
                <button
                  onClick={() => toggleRead(msg)}
                  className="p-2 text-stone-400 hover:text-green-700 hover:bg-green-50 rounded-lg transition-colors"
                  title={msg.read ? 'Marchează necitit' : 'Marchează citit'}
                >
                  {msg.read ? <MailOpen className="w-4 h-4" /> : <Mail className="w-4 h-4" />}
                </button>
                <button
                  onClick={() => remove(msg.id)}
                  className="p-2 text-stone-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                  title="Șterge"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            <p className="text-sm text-stone-600 leading-relaxed mt-3 whitespace-pre-wrap">
              {msg.message}
            </p>
          </div>
        ))}
      </div>
    </>
  );
}
