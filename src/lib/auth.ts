import { cookies } from 'next/headers';
import { eq } from 'drizzle-orm';

import { db } from '@/db';
import { sessions } from '@/db/schema';

const cookieKey = 'session';

function generateExpirationDate() {
  const seconds = 0;
  const minutes = 0;
  const hours = 0;
  const days = 1;

  return (
    Date.now() +
    seconds * 1000 +
    minutes * 1000 * 60 +
    hours * 1000 * 60 * 60 +
    days * 1000 * 60 * 60 * 24
  );
}

export async function createSession(userId: number) {
  const sessionId = crypto.randomUUID();
  const expiresAt = generateExpirationDate();

  await db.insert(sessions).values({ id: sessionId, userId, expiresAt });

  const cookieStore = await cookies();

  cookieStore.set(cookieKey, sessionId, {
    httpOnly: true,
    secure: true,
    expires: expiresAt,
    sameSite: 'lax',
    path: '/',
  });
}

export async function getSession() {
  const cookieStore = await cookies();
  const sessionId = cookieStore.get(cookieKey)?.value;

  if (!sessionId) {
    return null;
  }

  const session = await db.query.sessions.findFirst({
    where: { id: sessionId },
  });

  if (!session) {
    return null;
  }

  return session;
}

export async function getUser() {
  const session = await getSession();

  if (!session || typeof session.userId !== 'number') {
    return null;
  }

  const user = await db.query.users.findFirst({
    columns: { id: true, firstName: true, lastName: true, login: true },
    with: { role: { columns: { name: true } } },
    where: { id: session.userId },
  });

  if (!user) {
    return null;
  }

  return user;
}

export async function deleteSession() {
  const cookieStore = await cookies();

  const sessionId = cookieStore.get(cookieKey)?.value;
  cookieStore.delete(cookieKey);

  if (!sessionId) {
    return null;
  }

  await db.delete(sessions).where(eq(sessions.id, sessionId));
}
