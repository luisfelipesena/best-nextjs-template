import { initTRPC, TRPCError } from '@trpc/server'
import superjson from 'superjson'
import { ZodError } from 'zod'
import type { Context } from './context'

const t = initTRPC.context<Context>().create({
  transformer: superjson,
  isServer: true,
  errorFormatter({ shape, error }) {
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError:
          error.cause instanceof ZodError ? error.cause.flatten() : null,
      },
    }
  },
})

export const createTRPCRouter = t.router

export const publicProcedure = t.procedure

export const protectedProcedure = t.procedure.use(async ({ ctx, next }) => {
  if (!ctx.auth?.session) {
    throw new TRPCError({
      code: 'UNAUTHORIZED',
      message: 'Você precisa estar logado para acessar este recurso',
    })
  }

  return next({
    ctx: {
      ...ctx,
      session: ctx.auth.session,
      user: ctx.auth.session as any, // TODO: Fix typing
    },
  })
})

export const adminProcedure = protectedProcedure.use(async ({ ctx, next }) => {
  // TODO: Check if user is admin based on role in database
  // For now, just check if user exists
  if (!ctx.user) {
    throw new TRPCError({
      code: 'FORBIDDEN',
      message: 'Você precisa ser administrador para acessar este recurso',
    })
  }

  return next({ ctx })
})
