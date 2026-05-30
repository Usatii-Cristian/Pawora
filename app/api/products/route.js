import { NextResponse } from 'next/server';
import { getProducts } from '@/lib/store';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category');
  const featured = searchParams.get('featured');
  const bestseller = searchParams.get('bestseller');
  const newArrival = searchParams.get('new');
  const limit = searchParams.get('limit');

  let products = getProducts();

  if (category) products = products.filter((p) => p.category === category);
  if (featured === 'true') products = products.filter((p) => p.featured);
  if (bestseller === 'true') products = products.filter((p) => p.bestseller);
  if (newArrival === 'true') products = products.filter((p) => p.newArrival);
  if (limit) products = products.slice(0, parseInt(limit, 10));

  return NextResponse.json(products);
}
