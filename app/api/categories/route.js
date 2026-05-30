import { NextResponse } from 'next/server';
import { CATEGORIES, getProducts } from '@/lib/store';

export async function GET() {
  const products = getProducts();
  const categories = CATEGORIES.map((cat) => ({
    ...cat,
    productCount: products.filter((p) => p.category === cat.slug).length,
  }));
  return NextResponse.json(categories);
}
