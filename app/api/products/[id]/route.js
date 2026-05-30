import { NextResponse } from 'next/server';
import { getProducts } from '@/lib/store';

export async function GET(request, { params }) {
  const { id } = await params;
  const products = getProducts();
  const product = products.find((p) => p.slug === id || p.id === id);

  if (!product) {
    return NextResponse.json({ error: 'Product not found' }, { status: 404 });
  }

  return NextResponse.json(product);
}
