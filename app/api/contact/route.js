import { NextResponse } from 'next/server';
import { getMessages, saveMessages } from '@/lib/store';

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, message } = body;

    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return NextResponse.json({ error: 'Toate câmpurile sunt obligatorii' }, { status: 400 });
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      return NextResponse.json({ error: 'Adresă de email invalidă' }, { status: 400 });
    }

    const messages = getMessages();
    messages.unshift({
      id: `msg-${Date.now()}`,
      name: name.trim(),
      email: email.trim(),
      message: message.trim(),
      read: false,
      createdAt: new Date().toISOString(),
    });
    saveMessages(messages);

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Trimiterea mesajului a eșuat' }, { status: 500 });
  }
}
