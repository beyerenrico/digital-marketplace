import { initTRPC } from '@trpc/server';
import { ExpressContext } from '@/server';

export const {
  router,
  procedure: publicProcedure
} = initTRPC.context<ExpressContext>().create();
