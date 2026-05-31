'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Trash2 } from 'lucide-react';

export default function ArticleDeleteButton({ slug, title }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    if (!confirm(`Ștergi articolul „${title}"?`)) return;
    setLoading(true);
    await fetch(`/api/admin/articles/${slug}`, { method: 'DELETE' });
    router.refresh();
  };

  return (
    <button
      onClick={handleDelete}
      disabled={loading}
      className="p-1.5 text-stone-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
      title="Șterge"
    >
      <Trash2 className="w-3.5 h-3.5" />
    </button>
  );
}
