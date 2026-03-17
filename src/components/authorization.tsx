import { PropsWithChildren } from 'react';

import { isSignedIn } from '@/lib/auth';
import { SignInModal } from './sign-in-modal';

export async function Authorization({ children }: PropsWithChildren) {
  const signedIn = await isSignedIn();

  if (signedIn) {
    return children;
  }

  return <SignInModal>{children}</SignInModal>;
}
