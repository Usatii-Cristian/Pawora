import { NextResponse } from 'next/server';
import { verifyToken } from '@/lib/jwt';

export async function proxy(request) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get('admin-token')?.value;

  // Protejare rute /admin/* (exceptând /admin/login)
  if (
    (pathname === '/admin' || pathname.startsWith('/admin/')) &&
    pathname !== '/admin/login'
  ) {
    if (!token || !(await verifyToken(token))) {
      const res = NextResponse.redirect(new URL('/admin/login', request.url));
      res.cookies.delete('admin-token');
      return res;
    }
    return NextResponse.next();
  }

  // Protejare API /api/admin/* (exceptând login/logout)
  if (
    pathname.startsWith('/api/admin') &&
    !pathname.startsWith('/api/admin/login') &&
    !pathname.startsWith('/api/admin/logout')
  ) {
    if (!token || !(await verifyToken(token))) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin', '/admin/:path*', '/api/admin/:path*'],
};
