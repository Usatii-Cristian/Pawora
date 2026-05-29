'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { PawPrint, Eye, EyeOff, AlertCircle, Lock } from 'lucide-react';

export default function AdminLoginPage() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const setField = (field) => (e) =>
    setForm((f) => ({ ...f, [field]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        router.push('/admin/dashboard');
        router.refresh();
      } else {
        setError('Email sau parolă incorectă.');
      }
    } catch {
      setError('A apărut o eroare. Încearcă din nou.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-stone-100 flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-green-700 rounded-2xl shadow-lg shadow-green-900/20 mb-4">
            <PawPrint className="w-7 h-7 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-stone-900">Admin Panel</h1>
          <p className="text-stone-500 text-sm mt-1">Pawora Management System</p>
        </div>

        <div className="bg-white rounded-2xl border border-stone-200 shadow-sm p-7">
          {error && (
            <div className="flex items-center gap-2 bg-red-50 text-red-700 text-sm px-4 py-3 rounded-xl mb-5 border border-red-100">
              <AlertCircle className="w-4 h-4 shrink-0" />
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1.5">
                Email
              </label>
              <input
                type="email"
                value={form.email}
                onChange={setField('email')}
                placeholder="admin@example.com"
                required
                autoComplete="email"
                className="w-full px-4 py-3 rounded-xl border border-stone-200 text-sm text-stone-900 outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100 transition-all placeholder:text-stone-400"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1.5">
                Parolă
              </label>
              <div className="relative">
                <input
                  type={showPass ? 'text' : 'password'}
                  value={form.password}
                  onChange={setField('password')}
                  placeholder="••••••••"
                  required
                  autoComplete="current-password"
                  className="w-full px-4 py-3 pr-11 rounded-xl border border-stone-200 text-sm text-stone-900 outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100 transition-all placeholder:text-stone-400"
                />
                <button
                  type="button"
                  onClick={() => setShowPass((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-stone-400 hover:text-stone-600 transition-colors"
                  aria-label={showPass ? 'Ascunde parola' : 'Arată parola'}
                >
                  {showPass ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 bg-green-700 text-white font-semibold py-3.5 rounded-xl hover:bg-green-800 transition-colors disabled:opacity-60 disabled:cursor-not-allowed mt-2"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Se conectează...
                </>
              ) : (
                <>
                  <Lock className="w-4 h-4" />
                  Conectează-te
                </>
              )}
            </button>
          </form>
        </div>

        <p className="text-center text-xs text-stone-400 mt-5">
          Acces restricționat — doar utilizatori autorizați
        </p>
      </div>
    </div>
  );
}
