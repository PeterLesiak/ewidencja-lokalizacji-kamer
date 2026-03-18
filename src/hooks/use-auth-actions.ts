import { useQueryClient } from '@tanstack/react-query';
import z from 'zod';

import { logout } from '@/actions/logout';
import { signIn } from '@/actions/sign-in';
import { signInSchema } from '@/lib/schemas';

export function useAuthActions() {
  const queryClient = useQueryClient();

  return {
    async signIn(data: z.infer<typeof signInSchema>) {
      queryClient.clear();

      const formData = new FormData();

      for (const [key, value] of Object.entries(data)) {
        formData.set(key, value);
      }

      return await signIn(formData);
    },

    async logout() {
      queryClient.clear();

      await logout();
    },
  };
}
