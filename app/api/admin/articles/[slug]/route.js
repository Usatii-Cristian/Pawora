import { NextResponse } from 'next/server';
import { getArticles, saveArticles } from '@/lib/store';

export async function PUT(request, { params }) {
  const { slug } = await params;
  const articles = getArticles();
  const idx = articles.findIndex((a) => a.slug === slug || a.id === slug);
  if (idx === -1) return NextResponse.json({ error: 'Articol negăsit' }, { status: 404 });

  try {
    const body = await request.json();
    const updated = {
      ...articles[idx],
      ...body,
      slug: articles[idx].slug, // slug-ul rămâne fix
      id: articles[idx].id,
    };
    articles[idx] = updated;
    saveArticles(articles);
    return NextResponse.json(updated);
  } catch {
    return NextResponse.json({ error: 'Eroare server' }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  const { slug } = await params;
  const articles = getArticles().filter((a) => a.slug !== slug && a.id !== slug);
  saveArticles(articles);
  return NextResponse.json({ success: true });
}
