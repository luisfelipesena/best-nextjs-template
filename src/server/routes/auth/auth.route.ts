import { createTRPCRouter, publicProcedure, protectedProcedure } from '@/server/trpc/core';
import { updateProfileDto } from './auth.dto';
import { AuthService } from './auth.service';

export const authRoutes = createTRPCRouter({
  session: publicProcedure.query(async ({ ctx }) => {
    const service = new AuthService(ctx);
    return service.getSession();
  }),
  profile: protectedProcedure.query(async ({ ctx }) => {
    const service = new AuthService(ctx);
    return service.getProfile();
  }),
  updateProfile: protectedProcedure.input(updateProfileDto).mutation(async ({ ctx, input }) => {
    const service = new AuthService(ctx);
    return service.updateProfile(input);
  }),
});

