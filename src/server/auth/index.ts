import { betterAuth } from 'better-auth';

// Using memory adapter for now to fix build issues
export const auth = betterAuth({
  baseURL: 'http://localhost:3000',
  secret: 'fallback-secret-key-change-in-production',
});

