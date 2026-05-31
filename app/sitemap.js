import { getProducts, getArticles, CATEGORIES } from '@/lib/store';

export default function sitemap() {
  const base = 'https://zoomagazin.vercel.app';
  const now = new Date();
  const products = getProducts();
  const articles = getArticles();

  return [
    { url: base, lastModified: now, changeFrequency: 'daily', priority: 1 },
    { url: `${base}/products`, lastModified: now, changeFrequency: 'daily', priority: 0.9 },
    { url: `${base}/blog`, lastModified: now, changeFrequency: 'weekly', priority: 0.7 },
    { url: `${base}/contact`, lastModified: now, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${base}/termeni`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${base}/confidentialitate`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${base}/wishlist`, lastModified: now, changeFrequency: 'never', priority: 0.3 },
    ...CATEGORIES.map((c) => ({
      url: `${base}/products?category=${c.slug}`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8,
    })),
    ...products.map((p) => ({
      url: `${base}/products/${p.slug}`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.7,
    })),
    ...articles.map((a) => ({
      url: `${base}/blog/${a.slug}`,
      lastModified: a.publishedAt ? new Date(a.publishedAt) : now,
      changeFrequency: 'monthly',
      priority: 0.6,
    })),
  ];
}
