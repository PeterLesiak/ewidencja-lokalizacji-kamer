import { NextRequest, NextResponse } from 'next/server';

import { hasAdminRole } from '@/lib/auth';

const adminRoutes = ['/users', '/logs'];

export async function proxy(request: NextRequest) {
  const path = request.nextUrl.pathname;

  const isAdminRoute = adminRoutes.includes(path);
  const isAdmin = await hasAdminRole();

  if (isAdminRoute && !isAdmin) {
    return NextResponse.redirect(new URL('/', request.nextUrl));
  }

  return NextResponse.next();
}
