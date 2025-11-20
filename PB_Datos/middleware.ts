import { NextResponse, NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const authCookie = request.cookies.get('pb_auth');
  const adminAuthCookie = request.cookies.get('pb_admin_auth');

  // Permitir acceso a páginas de autenticación sin verificación
  if (pathname.startsWith('/auth/')) {
    return NextResponse.next();
  }

  // Si no hay sesión y estamos en home, redirigir a login
  if (pathname === '/' && !authCookie && !adminAuthCookie) {
    const url = request.nextUrl.clone();
    url.pathname = '/auth/login';
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/'],
};