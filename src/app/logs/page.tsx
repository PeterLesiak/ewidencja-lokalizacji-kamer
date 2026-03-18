import { redirect } from 'next/navigation';

import { caller } from '@/trpc/server';

export default async function Page() {
  const isAdmin = await caller.isAdmin();

  if (!isAdmin) {
    redirect('/');
  }

  return <h1>Logs</h1>;
}
