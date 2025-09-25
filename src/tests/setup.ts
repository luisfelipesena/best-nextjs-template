import '@testing-library/jest-dom';
import { vi } from 'vitest';

// Mock Next.js router
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    prefetch: vi.fn(),
  }),
  useSearchParams: () => ({
    get: vi.fn(),
  }),
  usePathname: () => '/',
}));

// Mock environment variables
process.env.NEXT_PUBLIC_APP_NAME = 'Test App';
process.env.DATABASE_URL = 'postgresql://test';
process.env.BETTER_AUTH_SECRET = 'test-secret';
process.env.BETTER_AUTH_BASE_URL = 'http://localhost:3000';