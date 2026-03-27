import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith('/admin')) {
        const hasCookie = request.cookies.has('admin_session');
    if (!hasCookie) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }
  
  return NextResponse.next();
}
 export const config = {
  matcher: '/admin/:path*',
}