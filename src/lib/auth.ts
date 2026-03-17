import { cache } from 'react';

import { getUser, getUserId } from './dal';

export const isSignedIn = cache(async () => {
  const userId = await getUserId();

  return userId !== null;
});

export const hasAdminRole = cache(async () => {
  const user = await getUser();

  return user?.role.name === 'admin';
});
