import { NextResponse } from 'next/server';
import { signToken } from '@/lib/jwt';

// In production replace with hashed password (bcrypt) stored in env vars
const ADMIN_EMAIL = 'cristiusa98@gmail.com';
const ADMIN_PASSWORD = 'cristinel';

export async function POST(request) {
  try {
    const { email, password } = await request.json();

    if (email !== ADMIN_EMAIL || password !== ADMIN_PASSWORD) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    const token = await signToken({ email, role: 'admin' });

    const response = NextResponse.json({ success: true });
    response.cookies.set('admin-token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24,
      path: '/',
    });

    return response;
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
