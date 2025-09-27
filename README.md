# 🚀 Best Next.js Template

Um template **Next.js Full Stack** moderno, escalável e organizado para desenvolvimento de aplicações enterprise-grade. Construído com as melhores práticas e tecnologias mais atuais do ecossistema React/Next.js.

## ✨ Características

### 🏗️ Arquitetura
- **Feature-driven development** - Organização por domínios de negócio
- **File-based routing** - Backend organizado por rotas com padrão Service/DTO/Route
- **Componentização agressiva** - Máximo 350 linhas por arquivo
- **Type-safe end-to-end** - TypeScript + Zod + TRPC

### 🛠️ Stack Tecnológica

#### Core
- **[Next.js 15](https://nextjs.org/)** - Framework React com App Router
- **[TypeScript](https://www.typescriptlang.org/)** - Linguagem tipada
- **[Tailwind CSS](https://tailwindcss.com/)** - Styling utility-first

#### Backend
- **[TRPC](https://trpc.io/)** - Type-safe APIs
- **[Drizzle ORM](https://orm.drizzle.team/)** - Type-safe database ORM  
- **[PostgreSQL](https://www.postgresql.org/)** - Database relacional
- **[Better Auth](https://www.better-auth.com/)** - Autenticação moderna

#### Frontend
- **[Tanstack Query](https://tanstack.com/query)** - Server state management
- **[Shadcn/UI](https://ui.shadcn.com/)** - Componentes base
- **[Zod](https://zod.dev/)** - Schema validation

#### Dev Tools
- **[Biome](https://biomejs.dev/)** - Linting e formatting ultra-rápido
- **[Vitest](https://vitest.dev/)** - Unit testing
- **[Playwright](https://playwright.dev/)** - E2E testing

## 🚀 Quick Start

### Pré-requisitos
- Node.js 18+ 
- PostgreSQL 14+
- npm/yarn/pnpm

### 1. Clone e instale dependências
```bash
git clone <repository-url>
cd best-nextjs-template
npm install
```

### 2. Setup automatizado (recomendado)
```bash
# Execute o script de setup que configura tudo automaticamente
./scripts/setup-dev.sh
```

> ⚠️ **Nota**: Se o script falhar com "tsx: not found", use o fallback JavaScript:
> ```bash
> npm run seed:test-user:js
> ```

### 3. Configure o ambiente (manual)
```bash
# Copie o arquivo de exemplo
cp .env.example .env

# Configure as variáveis de ambiente
# DATABASE_URL, BETTER_AUTH_SECRET, etc.
```

### 3. Configure o banco de dados
```bash
# Gerar migrations
npm run drizzle:generate

# Aplicar migrations
npm run drizzle:migrate

# Ou push direto (desenvolvimento)
npm run drizzle:push
```

### 4. Execute em desenvolvimento
```bash
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000)

## 📁 Estrutura do Projeto

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

## 🎯 Padrões Arquiteturais

### Backend: Service-Route-DTO Pattern
```typescript
// DTO: Validação e tipos
export const createUserDto = z.object({
  name: z.string().min(2),
  email: z.string().email(),
})

// Service: Lógica de negócio
export class UserService {
  async createUser(input: CreateUserDto) {
    // Business logic here
  }
}

// Route: Endpoints TRPC
export const userRouter = createTRPCRouter({
  create: protectedProcedure
    .input(createUserDto)
    .mutation(({ ctx, input }) => {
      const service = new UserService(ctx)
      return service.createUser(input)
    }),
})
```

### Frontend: Feature-Driven Components
```typescript
// Feature structure
src/features/auth/
├── components/
│   ├── login-form.tsx
│   ├── register-form.tsx
│   └── index.ts
├── hooks/
│   ├── use-auth.ts
│   └── index.ts
├── types/
│   └── index.ts
└── index.ts (barrel export)
```

## 🧪 Testes

### Unit Tests
```bash
npm run test           # Executar testes
npm run test:watch     # Watch mode
```

### E2E Tests
```bash
npm run test:e2e       # Executar E2E
npm run test:e2e:headed # Com interface gráfica
```

### CI Pipeline
```bash
npm run test:ci        # Pipeline completa
```

## 🔧 Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev            # Servidor de desenvolvimento
npm run build          # Build para produção
npm run start          # Servidor de produção

# Code Quality
npm run lint           # Lint com Biome
npm run format         # Format com Biome
npm run typecheck      # Verificação de tipos

# Database
npm run drizzle:generate   # Gerar migrations
npm run drizzle:migrate    # Aplicar migrations
npm run drizzle:push       # Push schema (dev)
npm run seed:test-user     # Criar usuário de teste (TypeScript)
npm run seed:test-user:js  # Criar usuário de teste (JavaScript)

# Testes
npm run test               # Unit tests
npm run test:watch         # Unit tests watch
npm run test:e2e           # E2E tests
npm run test:ci            # CI pipeline completa

# Scripts utilitários
./scripts/setup-dev.sh       # Setup completo do ambiente
```

### 🧪 Executando Testes E2E

```bash
# 1. Configure o banco e crie usuários de teste
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/test_db"
npm run drizzle:migrate
npm run seed:test-user

# 2. Inicie a aplicação
npm run build
npm run start

# 3. Execute os testes E2E (em outro terminal)
npm run test:e2e
```

### 👤 Usuários de Teste

**Usuário de Desenvolvimento:**
- **Email**: `test@example.com`
- **Senha**: `password123`
- **Role**: `user`

**Usuário de Testes E2E:**
- **Email**: `e2e-test@example.com`
- **Senha**: `password123`
- **Role**: `user`

> Ambos criados automaticamente com `npm run seed:test-user`

## 🌟 Features Implementadas

### ✅ Autenticação
- [x] Better Auth configurado
- [x] Login/Register forms
- [x] Session management
- [x] Protected routes
- [x] User profile management

### ✅ Dashboard
- [x] Stats cards
- [x] Recent activity
- [x] Analytics (mock data)
- [x] Responsive design

### ✅ Database
- [x] Drizzle ORM setup
- [x] PostgreSQL schema
- [x] Migrations system
- [x] Type-safe queries

### ✅ API Layer
- [x] TRPC setup
- [x] Type-safe endpoints
- [x] Error handling
- [x] Validation with Zod

### ✅ UI/UX
- [x] Shadcn/UI components
- [x] Dark/light theme
- [x] Responsive design
- [x] Loading states
- [x] Error boundaries

### ✅ Developer Experience
- [x] TypeScript strict mode
- [x] Biome linting/formatting
- [x] VSCode configuration
- [x] Cursor AI rules
- [x] Hot reload
- [x] Type safety end-to-end

## 🔐 Configuração de Ambiente

### Variáveis Obrigatórias
```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/dbname"

# Authentication
BETTER_AUTH_SECRET="your-32-character-secret-key"
BETTER_AUTH_BASE_URL="http://localhost:3000"
```

### Variáveis Opcionais
```env
# Testing
DATABASE_URL_TEST="postgresql://user:password@localhost:5432/dbname_test"

# App Config
NEXT_PUBLIC_APP_NAME="My App"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

## 📚 Documentação

### Cursor Rules
Consulte os arquivos em `.cursor/rules/` para entender a arquitetura:
- `architecture.md` - Visão geral da arquitetura
- `coding-standards.md` - Padrões de código
- `component-guidelines.md` - Diretrizes de componentes

### Tecnologias
- [Next.js Documentation](https://nextjs.org/docs)
- [TRPC Documentation](https://trpc.io/docs)
- [Drizzle ORM](https://orm.drizzle.team/docs)
- [Better Auth](https://www.better-auth.com/docs)
- [Shadcn/UI](https://ui.shadcn.com/docs)

## 🚀 Deploy

### Vercel (Recomendado)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Configure environment variables no dashboard
```

### Docker
```bash
# Build image
docker build -t nextjs-app .

# Run container
docker run -p 3000:3000 nextjs-app
```

### Outras plataformas
- Railway
- Netlify
- AWS Amplify
- DigitalOcean App Platform

## 🤝 Contribuição

### Antes de contribuir:
1. Leia os Cursor Rules em `.cursor/rules/`
2. Execute `npm run test:ci` 
3. Verifique se não há arquivos > 350 linhas
4. Siga os padrões de commit conventional

### Workflow:
```bash
# 1. Fork e clone
git clone <your-fork>

# 2. Crie branch
git checkout -b feature/nova-funcionalidade

# 3. Desenvolva seguindo os padrões
# 4. Teste
npm run test:ci

# 5. Commit
git commit -m "feat: adicionar nova funcionalidade"

# 6. Push e PR
git push origin feature/nova-funcionalidade
```

## 📄 Licença

MIT License - veja [LICENSE](LICENSE) para detalhes.

## 🔧 Correções Aplicadas ✅

### Better Auth + Drizzle Integration
- ✅ **RESOLVIDO**: Erro "The model 'user' was not found in the schema"
- ✅ **IMPLEMENTADO**: Tabelas renomeadas para convenções Better Auth (`user`, `session`, `account`, `verification`)
- ✅ **LIMPO**: Removidos aliases legados para código mais profissional
- ✅ **CONFIGURADO**: Adaptador Drizzle com schema explícito e correto

### Testes E2E
- ✅ **CORRIGIDO**: Timeouts apropriados para validações React Hook Form
- ✅ **MELHORADO**: Seletores de elementos mais robustos
- ✅ **CONFIGURADO**: Modo de validação `onSubmit` com `reValidateMode: 'onChange'`
- ✅ **AJUSTADO**: Textos esperados nos testes corrigidos
- ✅ **RESOLVIDO**: Erro "trusted origin is invalid" no Better Auth
- ✅ **OTIMIZADO**: Configuração robusta de variáveis de ambiente com fallbacks
- ✅ **IMPLEMENTADO**: Usuário E2E dedicado (`e2e-test@example.com`)
- ✅ **SIMPLIFICADO**: Testes limpos sem complexidade desnecessária

### TypeScript & Build
- ✅ **RESOLVIDO**: Erro de build com arquivos de teste incluídos
- ✅ **CONFIGURADO**: `tsconfig.json` otimizado para excluir testes do build
- ✅ **CRIADO**: `tsconfig.test.json` separado para configurações de teste
- ✅ **CORRIGIDO**: Referências `imageUrl` → `image` em todo o código
- ✅ **VALIDADO**: Linting, typecheck e build passando 100%

### CI/CD & Produção
- ✅ **GARANTIDO**: Pipeline CI/CD completo funcionando
- ✅ **OTIMIZADO**: Build production-ready sem warnings críticos
- ✅ **TESTADO**: Todos os comandos (`lint`, `typecheck`, `test`, `build`) passando
- ✅ **DOCUMENTADO**: Scripts de setup automático e manual

### Scripts & Utilitários
- ✅ **RESOLVIDO**: Erro "tsx: not found" no seed script
- ✅ **CRIADO**: Script JavaScript alternativo (`seed:test-user:js`)
- ✅ **MELHORADO**: Mensagens de erro informativas e claras
- ✅ **DOCUMENTADO**: README completo para scripts em `/scripts/README.md`
- ✅ **ROBUSTO**: Tratamento de erros para conexão DB e tabelas inexistentes

## 🙏 Agradecimentos

Este template foi construído com base nas melhores práticas da comunidade e inspirado por:
- [T3 Stack](https://create.t3.gg/)
- [Next.js Examples](https://github.com/vercel/next.js/tree/canary/examples)
- [Shadcn/UI](https://ui.shadcn.com/)
- [TRPC Examples](https://github.com/trpc/examples-next-app-dir)

---

**Desenvolvido com ❤️ para a comunidade dev brasileira**

Para suporte ou dúvidas, abra uma [issue](https://github.com/your-repo/issues) ou entre em contato.