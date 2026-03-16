import z from 'zod';

export const signInSchema = z.object({
  login: z.string().min(3).max(50),
  password: z.string().min(3).max(50),
});
