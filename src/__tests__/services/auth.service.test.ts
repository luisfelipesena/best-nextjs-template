import { describe, it, expect, beforeEach, vi } from 'vitest';
import { AuthService } from '@/server/routes/auth/auth.service';
import { users } from '@/server/db/schema';

describe('AuthService', () => {
  let service: AuthService;
  let mockCtx: any;

  beforeEach(() => {
    mockCtx = {
      auth: {
        session: {
          user: {
            id: 'user-123',
            email: 'test@example.com',
            name: 'Test User',
          },
        },
      },
      db: {
        update: vi.fn().mockReturnThis(),
        set: vi.fn().mockReturnThis(),
        where: vi.fn().mockReturnThis(),
        returning: vi.fn().mockReturnThis(),
        execute: vi.fn(),
      },
    };

    service = new AuthService(mockCtx);
  });

  describe('getSession', () => {
    it('should return the current session', async () => {
      const result = await service.getSession();

      expect(result).toEqual(mockCtx.auth.session);
    });
  });

  describe('getProfile', () => {
    it('should return user profile when session exists', async () => {
      const result = await service.getProfile();

      expect(result).toEqual(mockCtx.auth.session.user);
    });

    it('should throw error when no session exists', async () => {
      mockCtx.auth.session = null;

      await expect(service.getProfile()).rejects.toThrow('Unauthorized');
    });
  });

  describe('updateProfile', () => {
    it('should update user profile successfully', async () => {
      const input = { name: 'Updated Name' };
      const mockUpdatedUser = {
        id: 'user-123',
        name: 'Updated Name',
      };

      mockCtx.db.execute.mockResolvedValue([mockUpdatedUser]);

      const result = await service.updateProfile(input);

      expect(result).toEqual(mockUpdatedUser);
      expect(mockCtx.db.update).toHaveBeenCalledWith(users);
      expect(mockCtx.db.set).toHaveBeenCalledWith({
        name: input.name,
        updatedAt: expect.any(Date),
      });
    });

    it('should throw error when no session exists', async () => {
      mockCtx.auth.session = null;

      await expect(service.updateProfile({ name: 'Test' })).rejects.toThrow('Unauthorized');
    });
  });
});