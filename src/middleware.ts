import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const currentUser = request.cookies.get(`${process.env.ACCESS_COOKIE}`)?.value;

  // If the user is logged in and they visit the login or signup page, redirect them to the home page
  if (currentUser && (request.nextUrl.pathname === '/login' || request.nextUrl.pathname === '/signup')) {
    return Response.redirect(new URL('/', request.url));
  }

  // If the user is not logged in and they visit any page other than the login or signup page, redirect them to the login page
  if (!currentUser && !['/login', '/signup'].includes(request.nextUrl.pathname)) {
    return Response.redirect(new URL('/login', request.url));
  }
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};
