import type { Context } from '@/server/trpc/context';
import type { CreateUserDto, UpdateUserDto, GetUserByIdDto } from './users.dto';
import { schema } from '@/server/db';
import { eq } from 'drizzle-orm';

export class UsersService {
  constructor(private readonly ctx: Context) {}

  async createUser(input: CreateUserDto) {
    const user = await this.ctx.db
      .insert(schema.users)
      .values({
        name: input.name,
        email: input.email,
        // password seria hasheada aqui
      })
      .returning({ 
        id: schema.users.id, 
        name: schema.users.name, 
        email: schema.users.email, 
        createdAt: schema.users.createdAt 
      });

    return user[0];
  }

  async getUserById(input: GetUserByIdDto) {
    const user = await this.ctx.db
      .select({
        id: schema.users.id,
        name: schema.users.name,
        email: schema.users.email,
        createdAt: schema.users.createdAt,
      })
      .from(schema.users)
      .where(eq(schema.users.id, input.id))
      .limit(1);

    if (!user[0]) {
      throw new Error('User not found');
    }

    return user[0];
  }

  async updateUser(input: UpdateUserDto) {
    const user = await this.ctx.db
      .update(schema.users)
      .set({
        ...(input.name && { name: input.name }),
        ...(input.email && { email: input.email }),
      })
      .where(eq(schema.users.id, input.id))
      .returning({ 
        id: schema.users.id, 
        name: schema.users.name, 
        email: schema.users.email, 
        updatedAt: schema.users.updatedAt 
      });

    if (!user[0]) {
      throw new Error('User not found');
    }

    return user[0];
  }

  async deleteUser(input: GetUserByIdDto) {
    const deleted = await this.ctx.db
      .delete(schema.users)
      .where(eq(schema.users.id, input.id))
      .returning({ id: schema.users.id });

    if (!deleted[0]) {
      throw new Error('User not found');
    }

    return { success: true };
  }

  async listUsers() {
    const users = await this.ctx.db
      .select({
        id: schema.users.id,
        name: schema.users.name,
        email: schema.users.email,
        createdAt: schema.users.createdAt,
      })
      .from(schema.users)
      .orderBy(schema.users.createdAt);

    return users;
  }
}