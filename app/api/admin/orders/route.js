import { NextResponse } from 'next/server';
import { getOrders, saveOrders } from '@/lib/store';

export async function GET() {
  return NextResponse.json(getOrders());
}

// Schimbă statusul comenzii
export async function PATCH(request) {
  try {
    const { id, status } = await request.json();
    const orders = getOrders();
    const idx = orders.findIndex((o) => o.id === id);
    if (idx === -1) return NextResponse.json({ error: 'Comandă negăsită' }, { status: 404 });
    orders[idx].status = status;
    saveOrders(orders);
    return NextResponse.json(orders[idx]);
  } catch {
    return NextResponse.json({ error: 'Eroare server' }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    const { id } = await request.json();
    saveOrders(getOrders().filter((o) => o.id !== id));
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Eroare server' }, { status: 500 });
  }
}
