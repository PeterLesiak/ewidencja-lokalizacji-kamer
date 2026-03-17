'use server';

import { getUser } from '@/lib/dal';

export default async function () {
  return await getUser();
}
