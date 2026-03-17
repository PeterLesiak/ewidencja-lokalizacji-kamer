'use client';

import { PropsWithChildren } from 'react';
import { QueryClientProvider as TanstackQueryProvider } from '@tanstack/react-query';

import { getQueryClient } from './query-client';

export function QueryClientProvider({ children }: PropsWithChildren) {
  const queryClient = getQueryClient();

  return <TanstackQueryProvider client={queryClient}>{children}</TanstackQueryProvider>;
}
