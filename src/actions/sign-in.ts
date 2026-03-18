'use server';

import z from 'zod';
import argon2 from 'argon2';

import { db } from '@/db';
import { createSession } from '@/lib/auth';
import { signInSchema } from '@/lib/schemas';

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

  await createSession(user.id);
}
