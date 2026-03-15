import { db } from '@/db';

export default async function Page() {
  const users = await db.query.users.findMany({ with: { role: true } });

  return (
    <>
      {users.map((user, index) => (
        <div key={index}>{JSON.stringify(user, null, 2)}</div>
      ))}
    </>
  );
}
