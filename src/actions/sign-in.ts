'use server';

import { cookies } from 'next/headers';
import { eq } from 'drizzle-orm';
import z from 'zod';
import { randomBytes } from 'node:crypto';

import { db } from '@/db';
import { sessions } from '@/db/schema';
import { signInSchema } from '@/lib/sign-in';

type FormState =
  | {
      login?: { errors: string[] } | undefined;
      password?: { errors: string[] } | undefined;
    }
  | undefined;

export async function signIn(formData: FormData): Promise<FormState> {
  const validatedFields = signInSchema.safeParse({
    login: formData.get('login'),
    password: formData.get('password'),
  });

  if (!validatedFields.success) {
    return z.treeifyError(validatedFields.error).properties;
  }

  const { login, password } = validatedFields.data;

  const user = await db.query.users.findFirst({ where: { login } });

  if (!user) {
    return { login: { errors: ['Invalid user login'] } };
  }

  if (password !== user.password) {
    return { password: { errors: ['Invalid user password'] } };
  }

  await db.delete(sessions).where(eq(sessions.userId, user.id));

  const token = randomBytes(32).toString('hex');
  const expires = createExpirationDate();

  await db.insert(sessions).values({ id: token, userId: user.id, expiresAt: expires });

  const cookieStore = await cookies();

  cookieStore.set('session', token, {
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    path: '/',
    expires,
  });
}

function createExpirationDate() {
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
