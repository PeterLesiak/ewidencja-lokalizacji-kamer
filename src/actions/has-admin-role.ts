'use server';

import { hasAdminRole } from '@/lib/auth';

export default async function () {
  return await hasAdminRole();
}
