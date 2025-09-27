import type { User } from '@/server/db/schema'

export const mockUser: User = {
  id: 'user-1',
  name: 'John Doe',
  email: 'john@example.com',
  passwordHash: null,
  image: 'https://example.com/avatar.jpg',
  role: 'user',
  emailVerified: true,
  isActive: true,
  lastLoginAt: new Date('2024-01-15T10:00:00Z'),
  createdAt: new Date('2024-01-01T00:00:00Z'),
  updatedAt: new Date('2024-01-15T10:00:00Z'),
}

export const mockAdminUser: User = {
  ...mockUser,
  id: 'admin-1',
  name: 'Admin User',
  email: 'admin@example.com',
  role: 'admin',
}

export const mockUsers: User[] = [
  mockUser,
  {
    id: 'user-2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    passwordHash: null,
    image: null,
    role: 'user',
    emailVerified: false,
    isActive: true,
    lastLoginAt: null,
    createdAt: new Date('2024-01-02T00:00:00Z'),
    updatedAt: new Date('2024-01-02T00:00:00Z'),
  },
  mockAdminUser,
]
