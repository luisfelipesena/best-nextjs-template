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
        zodError: error.cause instanceof ZodError ? error.cause.flatten() : null,
      },
    }
  },
})

export const createTRPCRouter = t.router

export const publicProcedure = t.procedure

interface AuthenticatedContext extends Context {
  session: NonNullable<Context['auth']['session']>
  user: {
    id: string
    email: string
    name?: string
  }
}

export const protectedProcedure = t.procedure.use(async ({ ctx, next }) => {
  if (!ctx.auth?.session) {
    throw new TRPCError({
      code: 'UNAUTHORIZED',
      message: 'Você precisa estar logado para acessar este recurso',
    })
  }

  // Mock user data - in real app, this would come from the session
  const user = {
    id: 'mock-user-id',
    email: 'user@example.com',
    name: 'Mock User',
  }

  return next({
    ctx: {
      ...ctx,
      session: ctx.auth.session,
      user,
    } satisfies AuthenticatedContext,
  })
})

export const adminProcedure = protectedProcedure.use(async ({ ctx, next }) => {
  // In real app, check if user has admin role from database
  const isAdmin = ctx.user.email === 'admin@example.com' // Mock admin check

  if (!isAdmin) {
    throw new TRPCError({
      code: 'FORBIDDEN',
      message: 'Você precisa ser administrador para acessar este recurso',
    })
  }

  return next({ ctx })
})
