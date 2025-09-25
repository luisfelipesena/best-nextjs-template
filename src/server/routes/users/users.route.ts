import { createTRPCRouter, publicProcedure, protectedProcedure } from '@/server/trpc/core';
import { createUserDto, updateUserDto, getUserByIdDto } from './users.dto';
import { UsersService } from './users.service';

export const usersRouter = createTRPCRouter({
  create: publicProcedure.input(createUserDto).mutation(async ({ ctx, input }) => {
    const service = new UsersService(ctx);
    return service.createUser(input);
  }),

  getById: protectedProcedure.input(getUserByIdDto).query(async ({ ctx, input }) => {
    const service = new UsersService(ctx);
    return service.getUserById(input);
  }),

  update: protectedProcedure.input(updateUserDto).mutation(async ({ ctx, input }) => {
    const service = new UsersService(ctx);
    return service.updateUser(input);
  }),

  delete: protectedProcedure.input(getUserByIdDto).mutation(async ({ ctx, input }) => {
    const service = new UsersService(ctx);
    return service.deleteUser(input);
  }),

  list: protectedProcedure.query(async ({ ctx }) => {
    const service = new UsersService(ctx);
    return service.listUsers();
  }),
});