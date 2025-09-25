# Architecture Rules for Next.js Full Stack Template

## Overview
This project follows a highly organized, scalable architecture designed for maintainability and developer experience. All code must adhere to these rules to ensure consistency and quality.

## Tech Stack
- **Frontend**: Next.js 15+, React 19+, TypeScript, Tanstack Query, Shadcn UI, Tailwind CSS
- **Backend**: Next.js API Routes, TRPC, Drizzle ORM, PostgreSQL
- **Authentication**: Better Auth
- **Code Quality**: Biome (formatter & linter), Vitest (testing)
- **Styling**: Tailwind CSS with class-variance-authority

## Project Structure

### Backend Structure (File-based Routes)
```
src/server/routes/
├── [feature]/
│   ├── [feature].dto.ts     # Zod schemas and types
│   ├── [feature].route.ts   # TRPC router definitions
│   └── [feature].service.ts  # Business logic layer
```

### Frontend Structure
```
src/
├── app/                     # Next.js app router pages
├── components/
│   ├── ui/                  # Base reusable UI components
│   ├── base/                # Base components (wrappers, etc.)
│   ├── forms/               # Form-specific components
│   └── layout/              # Layout components
├── features/                # Feature-specific components
│   └── [feature]/           # Feature folder (e.g., auth, dashboard)
├── hooks/                   # Custom React hooks
├── lib/                     # Utility functions
├── providers/               # Context providers
└── server/                  # Server-side code
```

## Component Guidelines

### File Size Limits
- **Maximum file size**: 350 lines per file
- **Split large files**: Extract components, hooks, or utilities when approaching this limit
- **Single responsibility**: Each file should have a single, clear purpose

### Component Naming
```
✅ Correct:
- ProfileForm.tsx
- UserCard.tsx
- SettingsModal.tsx

❌ Incorrect:
- profile-form.tsx (kebab-case)
- userCard.tsx (camelCase without splitting)
- settings_modal.tsx (snake_case)
```

### Import Organization
```typescript
// 1. React and Next.js imports
import { useState } from 'react';
import type { NextPage } from 'next';

// 2. Third-party libraries
import { useQuery } from '@tanstack/react-query';
import { z } from 'zod';

// 3. Internal utilities
import { cn } from '@/lib/utils';
import { trpc } from '@/lib/trpc';

// 4. Components
import { Button } from '@/components/ui/button';

// 5. Types
import type { User } from '@/types/user';
```

## Backend Rules

### Service Layer Pattern
Each feature must follow this pattern:
1. **DTO**: Define Zod schemas for validation
2. **Service**: Implement business logic
3. **Router**: Expose TRPC endpoints

### Error Handling
- Use proper error types with Zod schemas
- Always validate input/output data
- Handle errors gracefully in services

### Database Operations
- Use Drizzle ORM for all database operations
- Always use transactions for multi-table operations
- Validate data before database operations

## Authentication Rules

### Session Management
- Always check session validity
- Use TRPC's protected procedures for authenticated routes
- Handle session expiration gracefully

### User Permissions
- Implement role-based access control
- Validate permissions at the service layer
- Use middleware for route protection

## Code Quality Rules

### TypeScript Usage
- **Strict mode**: Always enabled
- **No any**: Avoid using `any` type
- **Proper typing**: Use proper TypeScript types for all variables
- **Generic constraints**: Use generics appropriately

### Biome Configuration
- **Formatting**: Follow Biome's formatting rules
- **Linting**: Adhere to all enabled linting rules
- **Import organization**: Keep imports organized

### Testing Requirements
- **Unit tests**: Required for all business logic
- **Integration tests**: Required for API endpoints
- **E2E tests**: Required for critical user flows
- **Test coverage**: Maintain >80% coverage

## Performance Guidelines

### React Performance
- Use React.memo for expensive components
- Implement proper loading states
- Use Suspense for code splitting
- Optimize re-renders with proper dependency arrays

### Database Performance
- Use proper indexing
- Implement pagination for large datasets
- Use connection pooling
- Optimize queries with proper joins

## Security Rules

### Input Validation
- Always validate user input with Zod
- Sanitize data before database operations
- Use parameterized queries
- Implement rate limiting

### Authentication Security
- Use secure session management
- Implement CSRF protection
- Use HTTPS in production
- Hash sensitive data

## Deployment Rules

### Environment Variables
- Never commit secrets to version control
- Use environment-specific configurations
- Validate all required environment variables

### Build Process
- Run tests before deployment
- Check linting and type checking
- Optimize build for production

## Commit Guidelines

### Conventional Commits
```
feat: add new user authentication feature
fix: resolve memory leak in profile component
docs: update API documentation
style: improve button component styling
refactor: extract user service logic
test: add unit tests for auth service
```

### Pull Request Requirements
- Description of changes
- Screenshots for UI changes
- Test results
- Code review approval required

## File Organization Rules

### Feature Boundaries
- Keep features in separate folders
- Avoid cross-feature dependencies
- Use shared utilities sparingly
- Maintain clear separation of concerns

### Asset Organization
- Keep components co-located with their styles
- Use CSS modules or styled-jsx for component-specific styles
- Optimize images and static assets
- Use proper naming conventions

## Monitoring and Logging

### Error Tracking
- Implement proper error logging
- Use monitoring tools in production
- Track performance metrics
- Monitor database performance

### Logging Guidelines
- Use structured logging
- Log errors with context
- Avoid logging sensitive information
- Implement log levels appropriately

---

*These rules ensure maintainability, scalability, and code quality. Always follow them to contribute effectively to the project.*