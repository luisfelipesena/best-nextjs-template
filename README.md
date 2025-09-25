# 🚀 Best Next.js Full Stack Template

A highly organized, scalable, and production-ready Next.js full stack template with modern technologies and best practices.

## 🌟 Features

- **Next.js 15+** with App Router and Server Components
- **TypeScript** for type safety
- **TRPC** for type-safe API communication
- **Tanstack Query** for client-side data fetching
- **Drizzle ORM** with PostgreSQL for database operations
- **Better Auth** for authentication
- **Shadcn/UI** components with Tailwind CSS
- **Biome** for code formatting and linting
- **Vitest** for testing
- **Comprehensive architecture** with proper separation of concerns

## 🏗️ Architecture

This template follows a highly organized architecture designed for maintainability and scalability:

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

## 🛠️ Tech Stack

### Frontend
- **Next.js 15+** - React framework with App Router
- **React 19+** - UI library
- **TypeScript** - Type safety
- **Tanstack Query** - Data fetching and caching
- **Shadcn/UI** - Component library
- **Tailwind CSS** - Utility-first CSS framework
- **Class Variance Authority** - Component variant management
- **Lucide React** - Icon library

### Backend
- **Next.js API Routes** - Server-side API endpoints
- **TRPC** - Type-safe API layer
- **Drizzle ORM** - Database toolkit
- **PostgreSQL** - Database
- **Better Auth** - Authentication system
- **Zod** - Schema validation

### Development Tools
- **Biome** - Fast formatter and linter
- **Vitest** - Testing framework
- **Playwright** - E2E testing
- **TypeScript** - Type checking

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- PostgreSQL database
- pnpm or npm

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd best-nextjs-template
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   pnpm install
   ```

3. **Environment Setup**
   Create a `.env.local` file in the root directory:
   ```env
   # Database
   DATABASE_URL=postgresql://username:password@localhost:5432/database_name

   # Better Auth
   BETTER_AUTH_SECRET=your-secret-key-here
   BETTER_AUTH_BASE_URL=http://localhost:3000

   # Optional
   NEXT_PUBLIC_APP_NAME=Your App Name
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   TRPC_API_URL=http://localhost:3000/api/trpc
   ```

4. **Database Setup**
   ```bash
   # Generate database schema
   npm run drizzle:generate

   # Run migrations
   npm run drizzle:migrate
   ```

5. **Start Development Server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

### Core Directories

#### `src/app/`
Next.js App Router pages and layouts.

#### `src/components/`
Reusable UI components organized by purpose:
- `ui/` - Base UI components (buttons, inputs, etc.)
- `base/` - Base components (wrappers, containers)
- `forms/` - Form-specific components
- `layout/` - Layout components (headers, sidebars)

#### `src/features/`
Feature-specific components and logic:
- Each feature has its own folder
- Components are co-located with their logic
- Clear separation between features

#### `src/hooks/`
Custom React hooks:
- Data fetching hooks
- Business logic hooks
- UI behavior hooks

#### `src/lib/`
Utility functions and configurations:
- `utils.ts` - General utilities
- `trpc.ts` - TRPC client setup

#### `src/providers/`
React Context providers:
- Authentication provider
- TRPC provider
- Query client provider

#### `src/server/`
Server-side code:
- `auth/` - Authentication configuration
- `db/` - Database schema and configuration
- `routes/` - API route handlers
- `trpc/` - TRPC setup and routers

### Backend Structure

#### `src/server/routes/`
Each feature follows the service pattern:
- `[feature].dto.ts` - Zod schemas and TypeScript types
- `[feature].service.ts` - Business logic implementation
- `[feature].route.ts` - TRPC router definitions

## 🔧 Development

### Available Scripts

```bash
# Development
npm run dev              # Start development server
npm run build            # Build for production
npm run start            # Start production server

# Code Quality
npm run lint             # Run linter
npm run format           # Format code
npm run typecheck        # TypeScript type checking

# Database
npm run drizzle:generate # Generate database schema
npm run drizzle:migrate  # Run database migrations
npm run drizzle:push     # Push schema to database

# Testing
npm run test             # Run unit tests
npm run test:watch       # Run tests in watch mode
npm run test:e2e         # Run E2E tests
npm run test:ci          # Run all tests for CI

# Setup
npm run prepare          # Install Playwright browsers
```

### Code Quality

This project uses **Biome** for code formatting and linting. The configuration ensures:
- Consistent code style
- Type safety
- Performance optimizations
- Security best practices

### VSCode Configuration

The project includes VSCode settings that:
- Enable format on save
- Set Biome as the default formatter
- Configure TypeScript settings
- Enable auto-imports and better IntelliSense

## 🔐 Authentication

The template uses **Better Auth** for authentication with the following features:
- Email/password authentication
- Session management
- Protected routes
- Role-based access control

### Authentication Flow

1. User submits credentials via login form
2. Better Auth validates credentials
3. TRPC handles authenticated requests
4. Session is managed automatically
5. Protected routes check session validity

## 🗄️ Database

### Schema Management

The project uses **Drizzle ORM** with PostgreSQL:
- Type-safe database operations
- Migration management
- Schema validation
- Query building

### Example Schema

```typescript
// src/server/db/schema.ts
import { pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  email: text('email').notNull().unique(),
  name: text('name'),
  imageUrl: text('image_url'),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
});
```

## 🧪 Testing

The template includes comprehensive testing setup:

### Unit Tests
```bash
npm run test
```

### E2E Tests
```bash
npm run test:e2e
```

### Test Configuration

- **Vitest** for unit and integration tests
- **Playwright** for E2E tests
- **Testing Library** for React component testing
- Test coverage reporting

## 🚢 Deployment

### Environment Variables
Make sure to set these environment variables in your deployment platform:

```env
DATABASE_URL=your-production-database-url
BETTER_AUTH_SECRET=your-production-secret
BETTER_AUTH_BASE_URL=your-production-url
```

### Build Command
```bash
npm run build
```

### Production Deployment
The template is optimized for deployment on:
- Vercel
- Netlify
- Docker
- Railway
- Any Node.js hosting platform

## 📚 API Documentation

### TRPC API

All API endpoints are type-safe through TRPC. The main routers include:
- `auth` - Authentication endpoints
- `users` - User management
- `profile` - Profile management

### Example API Call

```typescript
// Client-side API call
const { data: user } = trpc.users.getById.useQuery({ id: '123' });

const updateUserMutation = trpc.users.update.useMutation();
await updateUserMutation.mutateAsync({ id: '123', name: 'John Doe' });
```

## 🎯 Best Practices

This template enforces several best practices:

### Code Organization
- **Component size limit**: 350 lines maximum per file
- **Single responsibility**: Each file has one clear purpose
- **Feature separation**: Features are isolated in their own folders
- **Consistent naming**: Follow established naming conventions

### Type Safety
- **Strict TypeScript**: No `any` types allowed
- **Runtime validation**: Zod schemas for all data
- **Type-safe APIs**: TRPC for end-to-end type safety

### Performance
- **Code splitting**: Automatic code splitting with Next.js
- **Image optimization**: Next.js Image component
- **Bundle analysis**: Built-in bundle analyzer
- **Caching**: Tanstack Query for smart caching

### Security
- **Input validation**: All inputs validated with Zod
- **SQL injection protection**: Parameterized queries with Drizzle
- **CSRF protection**: Built into Next.js
- **Session security**: Secure session management with Better Auth

### Developer Experience
- **Hot reloading**: Fast refresh in development
- **Error boundaries**: Proper error handling
- **Loading states**: Skeleton loaders and proper loading UX
- **Accessibility**: ARIA labels and keyboard navigation

## 🤝 Contributing

### Development Guidelines

1. **Follow the architecture**: Adhere to the established folder structure
2. **Write tests**: Add tests for new features
3. **Code quality**: Ensure code passes linting and type checking
4. **Documentation**: Update documentation for new features
5. **Component size**: Keep components under 350 lines

### Pull Request Process

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Ensure all tests pass
6. Update documentation
7. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Next.js** for the amazing framework
- **Vercel** for hosting and deployment
- **Shadcn** for the beautiful UI components
- **TRPC** for type-safe APIs
- **Drizzle** for the database toolkit
- **Better Auth** for authentication

---

Built with ❤️ using Next.js, TypeScript, and modern web technologies.