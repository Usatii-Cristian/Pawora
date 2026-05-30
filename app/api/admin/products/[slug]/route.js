import { NextResponse } from 'next/server';
import { getProducts, saveProducts } from '@/lib/store';

export async function PUT(request, { params }) {
  const { slug } = await params;
  const products = getProducts();
  const idx = products.findIndex((p) => p.slug === slug || p.id === slug);

  if (idx === -1) {
    return NextResponse.json({ error: 'Produs negăsit' }, { status: 404 });
  }

  try {
    const body = await request.json();
    const updated = { ...products[idx], ...body };
    products[idx] = updated;
    saveProducts(products);
    return NextResponse.json(updated);
  } catch {
    return NextResponse.json({ error: 'Eroare server' }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  const { slug } = await params;
  const products = getProducts();
  const idx = products.findIndex((p) => p.slug === slug || p.id === slug);

  if (idx === -1) {
    return NextResponse.json({ error: 'Produs negăsit' }, { status: 404 });
  }

  products.splice(idx, 1);
  saveProducts(products);
  return NextResponse.json({ success: true });
}
