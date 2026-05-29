import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verifyToken } from '@/lib/jwt';
import { PRODUCTS } from '@/lib/mockData';

async function verifyAdmin() {
  const cookieStore = await cookies();
  const token = cookieStore.get('admin-token')?.value;
  if (!token) return false;
  const payload = await verifyToken(token);
  return !!payload;
}

export async function PUT(request, { params }) {
  if (!(await verifyAdmin())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { slug } = await params;
  const idx = PRODUCTS.findIndex((p) => p.slug === slug || p.id === slug);

  if (idx === -1) {
    return NextResponse.json({ error: 'Product not found' }, { status: 404 });
  }

  try {
    const body = await request.json();
    const updated = { ...PRODUCTS[idx], ...body };
    PRODUCTS[idx] = updated;
    return NextResponse.json(updated);
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  if (!(await verifyAdmin())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { slug } = await params;
  const idx = PRODUCTS.findIndex((p) => p.slug === slug || p.id === slug);

  if (idx === -1) {
    return NextResponse.json({ error: 'Product not found' }, { status: 404 });
  }

  PRODUCTS.splice(idx, 1);
  return NextResponse.json({ success: true });
}
