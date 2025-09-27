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
  user: NonNullable<Context['auth']['user']>
}

export const protectedProcedure = t.procedure.use(async ({ ctx, next }) => {
  if (!ctx.auth?.session || !ctx.auth?.user) {
    throw new TRPCError({
      code: 'UNAUTHORIZED',
      message: 'Você precisa estar logado para acessar este recurso',
    })
  }

  return next({
    ctx: {
      ...ctx,
      session: ctx.auth.session,
      user: ctx.auth.user,
    } satisfies AuthenticatedContext,
  })
})

export const adminProcedure = protectedProcedure.use(async ({ ctx, next }) => {
  // Check if user has admin role from database
  const user = await ctx.db.query.user.findFirst({
    where: (userTable, { eq }) => eq(userTable.id, ctx.user.id),
    columns: { role: true },
  })

  const isAdmin = user?.role === 'admin'

  if (!isAdmin) {
    throw new TRPCError({
      code: 'FORBIDDEN',
      message: 'Você precisa ser administrador para acessar este recurso',
    })
  }

  return next({ ctx })
})
