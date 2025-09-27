import { createTRPCRouter, publicProcedure, protectedProcedure } from '@/server/trpc/core'
import { updateProfileDto, changePasswordDto } from './auth.dto'
import { AuthService } from './auth.service'

export const authRouter = createTRPCRouter({
  // Public procedures
  session: publicProcedure.query(async ({ ctx }) => {
    const service = new AuthService(ctx)
    return service.getSession()
  }),

  // Protected procedures
  profile: protectedProcedure.query(async ({ ctx }) => {
    const service = new AuthService(ctx)
    return service.getProfile()
  }),

  updateProfile: protectedProcedure.input(updateProfileDto).mutation(async ({ ctx, input }) => {
    const service = new AuthService(ctx)
    return service.updateProfile(input)
  }),

  changePassword: protectedProcedure.input(changePasswordDto).mutation(async ({ ctx, input }) => {
    const service = new AuthService(ctx)
    return service.changePassword(input)
  }),

  userStats: protectedProcedure.query(async ({ ctx }) => {
    const service = new AuthService(ctx)
    return service.getUserStats()
  }),
})
