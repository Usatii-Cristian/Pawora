'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Mail, Phone, MapPin, Send, CheckCircle, ChevronRight, Clock } from 'lucide-react';

const CONTACT_INFO = [
  {
    icon: MapPin,
    title: 'Visit Us',
    lines: ['123 Pet Street', 'London EC1A 1BB'],
  },
  {
    icon: Phone,
    title: 'Call Us',
    lines: ['+44 20 1234 5678', 'Mon–Fri, 9am–6pm'],
  },
  {
    icon: Mail,
    title: 'Email Us',
    lines: ['hello@pawora.com'],
  },
  {
    icon: Clock,
    title: 'Business Hours',
    lines: ['Mon–Fri: 9am–6pm', 'Sat: 10am–4pm'],
  },
];

function InputField({ label, error, children }) {
  return (
    <div>
      <label className="block text-sm font-medium text-stone-700 mb-1.5">
        {label}
      </label>
      {children}
      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
    </div>
  );
}

const inputClass = (hasError) =>
  `w-full px-4 py-3 rounded-xl border text-sm text-stone-900 outline-none transition-all placeholder:text-stone-400 ${
    hasError
      ? 'border-red-300 bg-red-50 focus:border-red-400 focus:ring-2 focus:ring-red-100'
      : 'border-stone-200 bg-white focus:border-green-500 focus:ring-2 focus:ring-green-100'
  }`;

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | loading | success | error

  const setField = (field) => (e) => {
    setForm((f) => ({ ...f, [field]: e.target.value }));
    setErrors((er) => ({ ...er, [field]: '' }));
  };

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Name is required';
    if (!form.email.trim()) e.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Enter a valid email';
    if (!form.message.trim()) e.message = 'Message is required';
    else if (form.message.trim().length < 10)
      e.message = 'Message must be at least 10 characters';
    return e;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setStatus('loading');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error('Request failed');
      setStatus('success');
      setForm({ name: '', email: '', message: '' });
    } catch {
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className="min-h-screen bg-stone-50 flex items-center justify-center px-4">
        <div className="text-center max-w-sm">
          <div className="w-20 h-20 bg-green-50 rounded-3xl flex items-center justify-center mx-auto mb-5">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-stone-900 mb-2">
            Message Sent!
          </h2>
          <p className="text-stone-500 mb-8">
            Thank you for reaching out. We&apos;ll get back to you within 24
            hours.
          </p>
          <button
            onClick={() => setStatus('idle')}
            className="text-sm font-medium text-green-700 hover:text-green-800 hover:underline"
          >
            Send another message
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Header */}
      <div className="bg-white border-b border-stone-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <nav className="flex items-center gap-1.5 text-sm text-stone-500 mb-3">
            <Link href="/" className="hover:text-stone-900 transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
            <span className="text-stone-900 font-medium">Contact</span>
          </nav>
          <h1 className="text-3xl font-bold text-stone-900">Get in Touch</h1>
          <p className="text-stone-500 mt-1">
            Have a question? We&apos;re happy to help.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Contact info */}
          <div className="space-y-3">
            {CONTACT_INFO.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="bg-white rounded-2xl p-5 border border-stone-100 shadow-sm flex gap-4 items-start"
                >
                  <div className="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5 text-green-700" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-stone-900 text-sm mb-1">
                      {item.title}
                    </h4>
                    {item.lines.map((line, i) => (
                      <p key={i} className="text-sm text-stone-500">
                        {line}
                      </p>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Form */}
          <div className="lg:col-span-2">
            <form
              onSubmit={handleSubmit}
              className="bg-white rounded-2xl p-7 border border-stone-100 shadow-sm"
            >
              <h2 className="text-lg font-bold text-stone-900 mb-6">
                Send us a message
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
                <InputField label="Full Name" error={errors.name}>
                  <input
                    type="text"
                    value={form.name}
                    onChange={setField('name')}
                    placeholder="John Smith"
                    className={inputClass(!!errors.name)}
                  />
                </InputField>

                <InputField label="Email Address" error={errors.email}>
                  <input
                    type="email"
                    value={form.email}
                    onChange={setField('email')}
                    placeholder="john@example.com"
                    className={inputClass(!!errors.email)}
                  />
                </InputField>
              </div>

              <div className="mb-6">
                <InputField label="Message" error={errors.message}>
                  <textarea
                    rows={6}
                    value={form.message}
                    onChange={setField('message')}
                    placeholder="Tell us how we can help you..."
                    className={`${inputClass(!!errors.message)} resize-none`}
                  />
                </InputField>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="flex items-center gap-2 bg-green-700 text-white font-semibold px-8 py-4 rounded-xl hover:bg-green-800 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {status === 'loading' ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Send Message
                    </>
                  )}
                </button>

                {status === 'error' && (
                  <p className="text-sm text-red-500">
                    Something went wrong. Please try again.
                  </p>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
