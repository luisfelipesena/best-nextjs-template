import type { Context } from '@/server/trpc/context';
import type { UpdateProfileDto } from './auth.dto';

export class AuthService {
  constructor(private readonly ctx: Context) {}

  async getSession() {
    return this.ctx.auth.session;
  }

  async getProfile() {
    const session = this.ctx.auth.session;
    if (!session) {
      throw new Error('Unauthorized');
    }

    return session.user;
  }

  async updateProfile(input: UpdateProfileDto) {
    const session = this.ctx.auth.session;
    if (!session) {
      throw new Error('Unauthorized');
    }

    const updated = await this.ctx.db
      .updateTable('users')
      .set({ name: input.name })
      .where('users.id', '=', session.user.id)
      .returning(['id', 'name'])
      .executeTakeFirst();

    return updated;
  }
}

