import { NextResponse } from 'next/server';
import { getArticles, saveArticles } from '@/lib/store';
import { slugify } from '@/lib/slugify';

export async function GET() {
  return NextResponse.json(getArticles());
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { title, excerpt, content, cover, author } = body;

    if (!title?.trim() || !content?.trim()) {
      return NextResponse.json({ error: 'Titlul și conținutul sunt obligatorii' }, { status: 400 });
    }

    const articles = getArticles();
    const slug = slugify(title);
    if (articles.find((a) => a.slug === slug)) {
      return NextResponse.json({ error: 'Un articol cu acest titlu există deja' }, { status: 409 });
    }

    const article = {
      id: `art-${Date.now()}`,
      slug,
      title: title.trim(),
      excerpt: excerpt?.trim() || content.trim().slice(0, 150),
      content: content.trim(),
      cover: cover?.trim() || 'https://images.unsplash.com/photo-1450778869180-41d0601e046e?w=1200&h=630&fit=crop&q=80',
      author: author?.trim() || 'Echipa AquaPet',
      publishedAt: new Date().toISOString(),
    };

    articles.unshift(article);
    saveArticles(articles);

    return NextResponse.json(article, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Eroare server' }, { status: 500 });
  }
}
