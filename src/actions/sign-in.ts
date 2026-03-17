'use server';

import { eq } from 'drizzle-orm';
import z from 'zod';
import argon2 from 'argon2';

import { db } from '@/db';
import { sessions } from '@/db/schema';
import { createSession } from '@/lib/session';
import { signInSchema } from '@/lib/sign-in';

type FormState =
  | {
      login?: { errors: string[] } | undefined;
      password?: { errors: string[] } | undefined;
    }
  | undefined;

export default async function (formData: FormData): Promise<FormState> {
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
    return {
      login: { errors: ['Invalid user credentials'] },
      password: { errors: ['Invalid user credentials'] },
    };
  }

  const validPassword = await argon2.verify(user.password, password);

  if (!validPassword) {
    return {
      login: { errors: ['Invalid user credentials'] },
      password: { errors: ['Invalid user credentials'] },
    };
  }

  const { token, expiresAt } = await createSession();

  await db.delete(sessions).where(eq(sessions.userId, user.id));
  await db.insert(sessions).values({ id: token, userId: user.id, expiresAt });
}
