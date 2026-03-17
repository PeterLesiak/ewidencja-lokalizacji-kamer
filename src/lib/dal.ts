import 'server-only';
import { cache } from 'react';

import { db } from '@/db';
import { verifySession } from './session';

export const getUserId = cache(async () => {
  const sessionId = await verifySession();

  if (sessionId === null) {
    return null;
  }

  const session = await db.query.sessions.findFirst({ where: { id: sessionId } });

  if (!session || session.userId === null) {
    return null;
  }

  return session.userId;
});

export const getUser = cache(async () => {
  const userId = await getUserId();

  if (userId === null) {
    return null;
  }

  const user = await db.query.users.findFirst({
    columns: { firstName: true, lastName: true, login: true },
    with: { role: { columns: { name: true } } },
    where: { id: userId },
  });

  if (!user) {
    return null;
  }

  return user;
});
