import { describe, it, expect, beforeEach, vi } from 'vitest';
import { AuthService } from '@/server/routes/auth/auth.service';
import type { Context } from '@/server/trpc/context';

// Mock context
const mockContext: Context = {
  auth: {
    session: {
      id: 'session-123',
      userId: 'user-123',
      expiresAt: new Date(),
      createdAt: new Date(),
      updatedAt: new Date(),
      token: 'token-123',
    },
  },
  db: {
    update: vi.fn().mockReturnThis(),
    set: vi.fn().mockReturnThis(),
    where: vi.fn().mockReturnThis(),
    returning: vi.fn().mockReturnThis(),
  },
} as unknown as Context;

describe('AuthService', () => {
  let authService: AuthService;

  beforeEach(() => {
    authService = new AuthService(mockContext);
    vi.clearAllMocks();
  });

  describe('getSession', () => {
    it('should return the current session', () => {
      const result = authService.getSession();
      expect(result).toEqual(mockContext.auth.session);
    });
  });

  describe('getProfile', () => {
    it('should return user profile when session exists', () => {
      const result = authService.getProfile();
      expect(result).toEqual({
        id: 'user-123',
        email: 'user@example.com',
        name: 'Test User',
      });
    });

    it('should throw error when no session exists', () => {
      const serviceWithoutSession = new AuthService({
        ...mockContext,
        auth: { session: null },
      } as unknown as Context);

      expect(() => serviceWithoutSession.getProfile()).toThrow('Unauthorized');
    });
  });

  describe('updateProfile', () => {
    it('should update user profile successfully', async () => {
      const mockUpdatedUser = {
        id: 'user-123',
        name: 'Updated Name',
      };

      (mockContext.db.returning as unknown as ReturnType<typeof vi.fn>).mockResolvedValue([mockUpdatedUser]);

      const result = await authService.updateProfile({ name: 'Updated Name' });

      expect(mockContext.db.update).toHaveBeenCalled();
      expect(mockContext.db.set).toHaveBeenCalledWith({ name: 'Updated Name' });
      expect(mockContext.db.where).toHaveBeenCalled();
      expect(result).toEqual(mockUpdatedUser);
    });

    it('should throw error when no session exists', async () => {
      const serviceWithoutSession = new AuthService({
        ...mockContext,
        auth: { session: null },
      } as unknown as Context);

      await expect(
        serviceWithoutSession.updateProfile({ name: 'Updated Name' })
      ).rejects.toThrow('Unauthorized');
    });
  });
});