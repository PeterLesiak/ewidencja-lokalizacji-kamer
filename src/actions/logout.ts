'use server';

import { eq } from 'drizzle-orm';

import { db } from '@/db';
import { sessions } from '@/db/schema';
import { deleteSession } from '@/lib/session';
import { redirect } from 'next/navigation';

export default async function () {
  const sessionId = await deleteSession();

  if (!sessionId) return;

  await db.delete(sessions).where(eq(sessions.id, sessionId));

  redirect('/');
}
