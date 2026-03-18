import 'server-only';
import { headers } from 'next/headers';
import { cache, PropsWithChildren } from 'react';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import {
  createTRPCOptionsProxy,
  TRPCQueryOptions,
} from '@trpc/tanstack-react-query';

import { createQueryClient } from './query-client';
import { createTRPCContext } from './context';
import { appRouter } from './routers/app';

export const getQueryClient = cache(createQueryClient);

export const caller = appRouter.createCaller(async () =>
  createTRPCContext({ headers: await headers() }),
);

export const trpc = createTRPCOptionsProxy({
  ctx: async () => createTRPCContext({ headers: await headers() }),
  router: appRouter,
  queryClient: getQueryClient,
});

export function HydrateClient({ children }: PropsWithChildren) {
  const queryClient = getQueryClient();

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      {children}
    </HydrationBoundary>
  );
}

export function prefetch<T extends ReturnType<TRPCQueryOptions<any>>>(
  queryOptions: T,
) {
  const queryClient = getQueryClient();

  if (queryOptions.queryKey[1]?.type === 'infinite') {
    queryClient.prefetchInfiniteQuery(queryOptions as any);
  } else {
    queryClient.prefetchQuery(queryOptions);
  }
}
