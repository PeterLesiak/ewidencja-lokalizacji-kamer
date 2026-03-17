import { redirect } from 'next/navigation';

import { getUser } from '@/lib/dal';

export default async function Page() {
  const user = await getUser();

  if (!user || user.role.name !== 'admin') {
    redirect('/');
  }

  return <h1>Logs</h1>;
}
