'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Trash2 } from 'lucide-react';

export default function AdminDeleteButton({ slug, name }) {
  const [confirming, setConfirming] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/products/${slug}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        router.refresh();
      }
    } finally {
      setLoading(false);
      setConfirming(false);
    }
  };

  if (confirming) {
    return (
      <div className="flex items-center gap-1.5">
        <button
          onClick={handleDelete}
          disabled={loading}
          className="text-[11px] font-semibold bg-red-600 text-white px-2.5 py-1 rounded-lg hover:bg-red-700 transition-colors disabled:opacity-60"
        >
          {loading ? '...' : 'Șterge'}
        </button>
        <button
          onClick={() => setConfirming(false)}
          className="text-[11px] font-medium text-stone-500 hover:text-stone-700 px-2 py-1"
        >
          Nu
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={() => setConfirming(true)}
      className="p-1.5 text-stone-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
      title={`Delete "${name}"`}
    >
      <Trash2 className="w-3.5 h-3.5" />
    </button>
  );
}
