# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Best Next.js Template - A production-ready, full-stack Next.js 15 application with comprehensive testing and CI/CD infrastructure.

- **Sempre busque seguir o DRY, KISS e YAGNI. Fora que, faça o uso de early returns sempre que possível ao invés de usar if/else.**
- **Você é um desenvolvedor senior experiente e sabe o que está fazendo.**
- **Sempre que preciso, leia .cursor/rules que lá possui as regras de arquitetura, padrões de código, etc.**

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + Shadcn/UI
- **Backend**: TRPC + Drizzle ORM + PostgreSQL
- **Auth**: Better Auth
- **Testing**: Vitest (unit) + Playwright (E2E)
- **Code Quality**: Biome (linting/formatting)

## Key Commands

```bash
# Development
npm run dev              # Start development server (port 3000)

# Code Quality
npm run lint             # Run Biome linter
npm run lint:fix         # Fix linting issues
npm run format           # Format code with Biome
npm run typecheck        # Run TypeScript type checking

# Testing
npm run test:unit        # Run unit tests with Vitest
npm run test:e2e         # Run E2E tests with Playwright
npm run test:e2e:ui      # Run E2E tests with UI mode
npm run test             # Run all tests

# Database
npm run db:generate      # Generate Drizzle migrations
npm run db:migrate       # Apply Drizzle migrations
npm run db:studio        # Open Drizzle Studio

# Build & Production
npm run build            # Build production application
npm run start            # Start production server
```

## Architecture Principles

### 1. Feature-Driven Development
- Organize code by features in `src/features/`
- Each feature is self-contained with its own components, hooks, services
- Features should not import from other features directly

### 2. Service-Route-DTO Backend Pattern
```typescript
// Service Layer: src/features/[feature]/services/[entity].service.ts
export class EntityService {
  async create(dto: CreateEntityDTO): Promise<Entity> {
    // Business logic here
  }
}

// Route Layer: src/features/[feature]/routes/[entity].route.ts
export const entityRouter = router({
  create: protectedProcedure
    .input(createEntitySchema)
    .mutation(({ input }) => entityService.create(input))
});

// DTO Layer: src/features/[feature]/dto/[entity].dto.ts
export const createEntitySchema = z.object({
  name: z.string().min(1)
});
```

### 3. Component Guidelines
- Maximum 350 lines per component
- Extract sub-components when exceeding limit
- Use composition over complex conditionals
- Prefer small, focused components

### 4. Type Safety
- Use Zod schemas for all API validation
- Define explicit TypeScript types
- Avoid `any` type
- Use proper error boundaries

## Directory Structure

```
├── .cursor/rules/          # Cursor AI rules para arquitetura
├── .vscode/               # Configurações VSCode
├── public/                # Assets estáticos
├── src/
│   ├── app/              # Next.js App Router
│   │   ├── api/          # API routes (TRPC + Auth)
│   │   ├── (auth)/       # Grupo de rotas de auth
│   │   └── dashboard/    # Páginas do dashboard
│   │
│   ├── components/       # Componentes base reutilizáveis
│   │   ├── ui/          # Shadcn/UI components
│   │   └── layout/      # Layout components
│   │
│   ├── features/         # Features por domínio
│   │   ├── auth/        # Feature de autenticação
│   │   │   ├── components/
│   │   │   ├── hooks/
│   │   │   ├── types/
│   │   │   └── index.ts
│   │   └── dashboard/   # Feature de dashboard
│   │
│   ├── hooks/           # Hooks globais
│   ├── lib/             # Utilitários
│   ├── providers/       # Context providers
│   ├── tests/           # Testes organizados
│   │   ├── unit/
│   │   ├── integration/
│   │   ├── e2e/
│   │   └── __mocks__/
│   │
│   └── server/          # Backend
│       ├── auth/        # Better Auth config
│       ├── db/          # Drizzle ORM
│       ├── routes/      # Rotas por domínio
│       │   ├── auth/    # Rotas de auth
│       │   │   ├── auth.dto.ts
│       │   │   ├── auth.service.ts
│       │   │   └── auth.route.ts
│       │   └── dashboard/
│       └── trpc/        # TRPC config
│
├── biome.json           # Biome configuration
├── drizzle.config.ts    # Drizzle configuration
├── tailwind.config.ts   # Tailwind configuration
└── tsconfig.json        # TypeScript configuration
```

## Testing Strategy

### Unit Tests (Vitest)
- Test business logic in services
- Test utility functions
- Mock external dependencies
- Location: `src/tests/unit/`

### E2E Tests (Playwright)
- Test critical user flows
- Test authentication workflows
- Test form submissions
- Location: `src/tests/e2e/`

## Environment Variables

Required in `.env.local`:
```
DATABASE_URL=              # PostgreSQL connection
BETTER_AUTH_SECRET=        # Auth secret key
BETTER_AUTH_URL=           # Auth base URL
```

## Code Quality Checklist

Before committing:
1. Run `npm run typecheck` - Ensure no TypeScript errors
2. Run `npm run lint` - Fix any linting issues
3. Run `npm run test:unit` - Ensure unit tests pass
4. Run `npm run build` - Verify build succeeds

## CI/CD Pipeline

GitHub Actions workflow runs on every push:
1. Type checking
2. Linting
3. Unit tests
4. E2E tests (with test database)
5. Build verification

## Development Patterns

### Creating New Features
1. Create feature folder in `src/features/`
2. Implement service layer with business logic
3. Create TRPC routes with proper validation
4. Build UI components following 350-line limit
5. Add unit tests for services
6. Add E2E tests for critical flows

### Adding New Components
1. Check if component should be feature-specific or global
2. Use Shadcn/UI components as base when possible
3. Follow composition patterns
4. Ensure proper TypeScript typing

### Database Changes
1. Modify schema in `src/server/db/schema/`
2. Run `npm run db:generate` to create migration
3. Run `npm run db:migrate` to apply changes
4. Update related DTOs and services

## Security Practices

- Never commit sensitive data
- Use environment variables for secrets
- Validate all user inputs with Zod
- Use TRPC's built-in authentication
- Implement proper error handling

## Performance Guidelines

- Use React Server Components by default
- Add 'use client' only when needed
- Implement proper loading states
- Use React Suspense for data fetching
- Optimize images with Next.js Image

## Key Dependencies

- `@trpc/server` & `@trpc/client`: Type-safe API
- `drizzle-orm`: Database ORM
- `better-auth`: Authentication
- `zod`: Schema validation
- `@tanstack/react-query`: Data fetching
- `shadcn/ui`: UI components

## Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [TRPC Documentation](https://trpc.io/docs)
- [Drizzle Documentation](https://orm.drizzle.team)
- [Better Auth Documentation](https://www.better-auth.com)
- [Shadcn/UI Components](https://ui.shadcn.com)