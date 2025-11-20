import { NextResponse, NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const authCookie = request.cookies.get('pb_auth');

  // Si no hay sesión y estamos en home, redirigir a registro
  if (pathname === '/' && !authCookie) {
    const url = request.nextUrl.clone();
    url.pathname = '/auth/register';
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/'],
};
