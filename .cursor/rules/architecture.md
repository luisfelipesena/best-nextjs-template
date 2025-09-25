# Arquitetura do Template Next.js Full Stack

## 🏗️ Visão Geral da Arquitetura

Este template segue uma arquitetura **file-based** e **feature-driven** para garantir escalabilidade e manutenibilidade a longo prazo.

## 📁 Estrutura de Pastas

### Frontend (`src/`)

```
src/
├── app/                    # Next.js App Router (rotas da aplicação)
│   ├── api/               # API Routes (TRPC + Better Auth)
│   ├── (auth)/            # Grupo de rotas de autenticação
│   ├── dashboard/         # Páginas do dashboard
│   └── layout.tsx         # Layout raiz
│
├── components/            # Componentes base reutilizáveis
│   ├── ui/               # Componentes do shadcn/ui
│   └── layout/           # Componentes de layout
│
├── features/             # Features organizadas por domínio
│   ├── auth/             # Feature de autenticação
│   │   ├── components/   # Componentes específicos da feature
│   │   ├── hooks/        # Hooks específicos da feature
│   │   ├── types/        # Tipos específicos da feature
│   │   └── index.ts      # Barrel export
│   └── dashboard/        # Feature de dashboard
│       ├── components/
│       ├── hooks/
│       ├── types/
│       └── index.ts
│
├── hooks/                # Hooks globais e TRPC hooks
├── lib/                  # Utilitários e configurações
├── providers/            # Context providers (Auth, TRPC, etc.)
├── tests/                # Testes organizados por tipo
│   ├── unit/
│   ├── integration/
│   ├── e2e/
│   ├── __mocks__/
│   └── fixtures/
│
└── server/               # Backend (TRPC + Drizzle)
    ├── auth/             # Configuração Better Auth
    ├── db/               # Drizzle ORM (schema, migrations)
    ├── routes/           # Rotas organizadas por domínio
    │   ├── auth/         # Rotas de autenticação
    │   │   ├── auth.dto.ts      # DTOs e validações
    │   │   ├── auth.service.ts  # Lógica de negócio
    │   │   └── auth.route.ts    # Definição das rotas TRPC
    │   └── dashboard/    # Rotas de dashboard
    └── trpc/             # Configuração TRPC
```

## 🎯 Princípios Arquiteturais

### 1. **Feature-Driven Development**
- Cada feature é um módulo independente
- Componentes, hooks e tipos ficam próximos ao seu domínio
- Facilita reutilização e manutenção

### 2. **File-Based Backend**
- Cada domínio tem sua própria pasta em `routes/`
- Separação clara: DTOs, Services e Routes
- Pattern: `domain.dto.ts`, `domain.service.ts`, `domain.route.ts`

### 3. **Componentização Agressiva**
- **NUNCA** criar arquivos com mais de 350 linhas
- Quebrar componentes grandes em menores
- Preferir composição sobre herança

### 4. **Type Safety First**
- Zod para validação de dados
- TypeScript strict mode
- Tipos compartilhados entre frontend e backend via TRPC

## 🔧 Stack Tecnológica

### Core
- **Next.js 15** - Framework React com App Router
- **TypeScript** - Linguagem principal
- **Tailwind CSS** - Styling utility-first

### Backend
- **TRPC** - Type-safe API
- **Drizzle ORM** - Type-safe database ORM
- **PostgreSQL** - Database principal
- **Better Auth** - Autenticação moderna

### Frontend
- **Tanstack Query** - State management e cache
- **Shadcn/UI** - Componentes base
- **Zod** - Validação de schemas

### Dev Tools
- **Biome** - Linting e formatting
- **Vitest** - Unit testing
- **Playwright** - E2E testing

## 📋 Padrões de Código

### 1. **Naming Conventions**
```typescript
// Arquivos: kebab-case
user-profile.tsx
auth-service.ts

// Componentes: PascalCase
export function UserProfile() {}

// Hooks: camelCase com use prefix
export function useAuthSession() {}

// Constantes: UPPER_SNAKE_CASE
const API_BASE_URL = 'https://api.example.com'
```

### 2. **Import Organization**
```typescript
// 1. React/Next imports
import { useState } from 'react'
import { useRouter } from 'next/navigation'

// 2. Third-party libraries
import { z } from 'zod'
import { trpc } from '@trpc/client'

// 3. Internal imports (absolute paths)
import { Button } from '@/components/ui/button'
import { useAuth } from '@/hooks'
import { LoginSchema } from '@/features/auth'

// 4. Relative imports
import { validateForm } from './utils'
```

### 3. **Component Structure**
```typescript
'use client' // Se necessário

import { /* imports */ } from 'libraries'
import { /* internal imports */ } from '@/...'

interface ComponentProps {
  // Props interface
}

export function Component({ prop }: ComponentProps) {
  // 1. Hooks
  const [state, setState] = useState()
  const { data } = useQuery()

  // 2. Event handlers
  const handleClick = () => {}

  // 3. Effects
  useEffect(() => {}, [])

  // 4. Early returns
  if (loading) return <Loading />

  // 5. Render
  return (
    <div>
      {/* JSX */}
    </div>
  )
}
```

### 4. **Backend Service Pattern**
```typescript
// DTO (Data Transfer Object)
export const createUserDto = z.object({
  name: z.string().min(2),
  email: z.string().email(),
})

// Service (Business Logic)
export class UserService {
  constructor(private readonly ctx: Context) {}

  async createUser(input: CreateUserDto) {
    // Validation, business logic, database operations
  }
}

// Route (TRPC Procedures)
export const userRouter = createTRPCRouter({
  create: protectedProcedure
    .input(createUserDto)
    .mutation(({ ctx, input }) => {
      const service = new UserService(ctx)
      return service.createUser(input)
    }),
})
```

## 🚀 Comandos de Desenvolvimento

```bash
# Desenvolvimento
npm run dev

# Build
npm run build

# Testes
npm run test
npm run test:watch
npm run test:e2e

# Linting e Formatting
npm run lint
npm run format

# Database
npm run drizzle:generate
npm run drizzle:migrate
npm run drizzle:push

# CI/CD
npm run test:ci
```

## ✅ Checklist de Desenvolvimento

### Antes de criar uma nova feature:
- [ ] Criar pasta em `src/features/[feature-name]/`
- [ ] Definir tipos em `types/index.ts`
- [ ] Criar componentes em `components/`
- [ ] Criar hooks em `hooks/`
- [ ] Criar barrel export em `index.ts`

### Antes de criar uma nova rota backend:
- [ ] Criar pasta em `src/server/routes/[domain]/`
- [ ] Definir DTOs em `[domain].dto.ts`
- [ ] Implementar service em `[domain].service.ts`
- [ ] Criar rotas em `[domain].route.ts`
- [ ] Registrar no router principal

### Antes de fazer commit:
- [ ] Executar `npm run lint`
- [ ] Executar `npm run typecheck`
- [ ] Executar `npm run test`
- [ ] Verificar se não há arquivos > 350 linhas
- [ ] Verificar se há testes para novas funcionalidades

## 🔐 Regras de Segurança

1. **Sempre validar inputs** com Zod
2. **Usar procedures protegidos** para rotas autenticadas
3. **Sanitizar dados** antes de salvar no banco
4. **Não expor informações sensíveis** no cliente
5. **Usar HTTPS** em produção
6. **Implementar rate limiting** em APIs públicas

## 📖 Documentação Adicional

- [Next.js Documentation](https://nextjs.org/docs)
- [TRPC Documentation](https://trpc.io/docs)
- [Drizzle ORM Documentation](https://orm.drizzle.team/docs/overview)
- [Better Auth Documentation](https://www.better-auth.com/docs)
- [Shadcn/UI Documentation](https://ui.shadcn.com/docs)