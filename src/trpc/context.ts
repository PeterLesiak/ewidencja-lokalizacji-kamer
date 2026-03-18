import { getUser } from '../lib/auth';

export async function createTRPCContext(options: { headers: Headers }) {
  const user = await getUser();

  return { user };
}

export type TRPCContext = Awaited<ReturnType<typeof createTRPCContext>>;
