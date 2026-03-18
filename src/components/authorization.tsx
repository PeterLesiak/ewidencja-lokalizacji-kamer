import { PropsWithChildren } from 'react';

import { getUser } from '@/lib/auth';
import { SignInModal } from './sign-in-modal';

export async function Authorization({ children }: PropsWithChildren) {
  const user = await getUser();

  if (user) {
    return children;
  }

  return <SignInModal>{children}</SignInModal>;
}
