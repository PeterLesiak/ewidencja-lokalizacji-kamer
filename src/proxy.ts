import { NextRequest, NextResponse } from 'next/server';

import { getUser } from '@/lib/auth';

const adminRoutes = ['/users', '/logs'];

export async function proxy(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const user = await getUser();

  const isAdminRoute = adminRoutes.includes(path);
  const isAdmin = user?.role.name === 'admin';

  if (isAdminRoute && !isAdmin) {
    return NextResponse.redirect(new URL('/', request.nextUrl));
  }

  return NextResponse.next();
}
