import { NextResponse } from 'next/server';
import { getOrders, saveOrders } from '@/lib/store';

export async function POST(request) {
  try {
    const body = await request.json();
    const { customer, items, total, shipping } = body;

    if (!customer?.name || !customer?.phone || !customer?.address || !customer?.city) {
      return NextResponse.json({ error: 'Completați toate câmpurile obligatorii' }, { status: 400 });
    }
    if (!items?.length) {
      return NextResponse.json({ error: 'Coșul este gol' }, { status: 400 });
    }

    const orders = getOrders();
    const order = {
      id: `ord-${Date.now()}`,
      createdAt: new Date().toISOString(),
      status: 'nou',
      customer,
      items,
      total,
      shipping,
      orderTotal: total + shipping,
    };

    orders.push(order);
    saveOrders(orders);

    return NextResponse.json({ success: true, orderId: order.id }, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Eroare server' }, { status: 500 });
  }
}
