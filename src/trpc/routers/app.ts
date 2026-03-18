import z from 'zod';

import { createTRPCRouter, publicProcedure } from '../init';

export const appRouter = createTRPCRouter({
  getUser: publicProcedure.query(({ ctx }) => {
    return ctx.user;
  }),

  isAdmin: publicProcedure.query(({ ctx }) => {
    return ctx.user?.role.name === 'admin';
  }),
});

export type AppRouter = typeof appRouter;
