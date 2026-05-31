import { NextResponse } from 'next/server';
import { getMessages, saveMessages } from '@/lib/store';

export async function GET() {
  return NextResponse.json(getMessages());
}

// Marchează citit/necitit
export async function PATCH(request) {
  try {
    const { id, read } = await request.json();
    const messages = getMessages();
    const idx = messages.findIndex((m) => m.id === id);
    if (idx === -1) return NextResponse.json({ error: 'Mesaj negăsit' }, { status: 404 });
    messages[idx].read = Boolean(read);
    saveMessages(messages);
    return NextResponse.json(messages[idx]);
  } catch {
    return NextResponse.json({ error: 'Eroare server' }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    const { id } = await request.json();
    const messages = getMessages().filter((m) => m.id !== id);
    saveMessages(messages);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Eroare server' }, { status: 500 });
  }
}
