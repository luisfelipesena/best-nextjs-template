import type { Context } from '@/server/trpc/context';
import type { UpdateProfileDto } from './auth.dto';
import { eq } from 'drizzle-orm';
import { users } from '@/server/db/schema';

export class AuthService {
  constructor(private readonly ctx: Context) {}

  async getSession() {
    return this.ctx.auth?.session ?? null;
  }

  async getProfile() {
    const authContext = this.ctx.auth;
    if (!authContext?.user) {
      throw new Error('Unauthorized');
    }

    return authContext.user;
  }

  async updateProfile(input: UpdateProfileDto) {
    const authContext = this.ctx.auth;
    if (!authContext?.user) {
      throw new Error('Unauthorized');
    }

    const updated = await this.ctx.db
      .update(users)
      .set({ name: input.name, updatedAt: new Date() })
      .where(eq(users.id, authContext.user.id))
      .returning({ id: users.id, name: users.name })
      .execute();

    return updated[0];
  }
}

