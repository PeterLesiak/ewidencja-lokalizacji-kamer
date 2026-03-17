import { cookies } from 'next/headers';
import { randomBytes } from 'node:crypto';

export async function createSession(): Promise<{ token: string; expiresAt: number }> {
  const cookieStore = await cookies();

  const token = randomBytes(32).toString('hex');
  const expiresAt = generateExpirationDate();

  cookieStore.set('session', token, {
    httpOnly: true,
    secure: true,
    expires: expiresAt,
    sameSite: 'lax',
    path: '/',
  });

  return { token, expiresAt };
}

export async function verifySession(): Promise<string | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get('session');

  if (!token) {
    return null;
  }

  return token.value;
}

export async function deleteSession(): Promise<string | null> {
  const cookieStore = await cookies();

  const sessionId = cookieStore.get('session');
  cookieStore.delete('session');

  return sessionId?.value ?? null;
}

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
