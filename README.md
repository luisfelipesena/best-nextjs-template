# Best Next.js Full Stack Template

Um template Next.js full stack organizado e escalável seguindo princípios de clean architecture e componentização.

## 🚀 Tech Stack

- **Frontend/Backend**: Next.js 15 com App Router
- **Linguagem**: TypeScript
- **Validação**: Zod
- **Estado/Queries**: Tanstack Query + TRPC
- **UI**: Shadcn Components + Tailwind CSS
- **Linting/Formatting**: Biome
- **Database**: Drizzle ORM + PostgreSQL
- **Autenticação**: Better-auth
- **Testes**: Vitest + Playwright + Testing Library

## 📁 Estrutura do Projeto

```
src/
├── app/                    # Next.js App Router
│   ├── api/               # API Routes
│   │   ├── auth/          # Better-auth endpoints
│   │   └── trpc/          # TRPC endpoints
│   ├── globals.css        # Estilos globais
│   ├── layout.tsx         # Layout principal
│   └── page.tsx           # Página inicial
├── components/            # Componentes reutilizáveis
│   ├── ui/                # Componentes base (Shadcn)
│   ├── layout/            # Componentes de layout
│   └── auth/              # Componentes de autenticação
├── features/              # Componentes de features/fluxos
│   ├── auth/              # Fluxos de autenticação
│   └── dashboard/         # Fluxos do dashboard
├── hooks/                 # Custom hooks
│   ├── use-auth-session.ts
│   └── use-users.ts
├── providers/             # Context providers
│   ├── auth-provider.tsx
│   ├── trpc-provider.tsx
│   └── index.tsx
├── server/                # Backend (file-based)
│   ├── auth/              # Configuração Better-auth
│   ├── db/                # Database (Drizzle)
│   ├── routes/            # Rotas organizadas por domínio
│   │   ├── auth/          # Rotas de autenticação
│   │   │   ├── auth.service.ts
│   │   │   ├── auth.route.ts
│   │   │   └── auth.dto.ts
│   │   └── users/         # Rotas de usuários
│   └── trpc/              # Configuração TRPC
├── config/                # Configurações
│   └── env.ts             # Validação de variáveis de ambiente
├── lib/                   # Utilitários
│   └── utils.ts
└── tests/                 # Testes
    ├── setup.ts
    ├── components/
    └── hooks/
```

## 🛠️ Configuração Inicial

### 1. Instalar Dependências

```bash
npm install
```

### 2. Configurar Variáveis de Ambiente

Copie o arquivo `.env.example` para `.env.local` e configure as variáveis:

```bash
cp .env.example .env.local
```

Configure as seguintes variáveis:

```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/nextjs_template"

# Better Auth
BETTER_AUTH_SECRET="your-secret-key-here-must-be-at-least-32-characters-long"
BETTER_AUTH_BASE_URL="http://localhost:3000"

# App
NEXT_PUBLIC_APP_NAME="Best Next.js Template"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

### 3. Configurar PostgreSQL

Certifique-se de ter o PostgreSQL rodando e crie o banco de dados:

```sql
CREATE DATABASE nextjs_template;
```

### 4. Executar Migrations

```bash
npm run drizzle:generate
npm run drizzle:migrate
```

### 5. Iniciar o Projeto

```bash
npm run dev
```

## 📋 Comandos Disponíveis

### Desenvolvimento
```bash
npm run dev          # Inicia o servidor de desenvolvimento
npm run build        # Build para produção
npm run start        # Inicia o servidor de produção
```

### Linting e Formatação
```bash
npm run lint         # Executa o Biome linter
npm run format       # Formata o código com Biome
npm run typecheck    # Verifica tipos TypeScript
```

### Testes
```bash
npm run test         # Executa testes unitários
npm run test:watch   # Executa testes em modo watch
npm run test:e2e     # Executa testes E2E
npm run test:ci      # Executa todos os testes (CI)
```

### Database
```bash
npm run drizzle:generate  # Gera migrations
npm run drizzle:migrate   # Executa migrations
npm run drizzle:push      # Push schema para o banco
```

## 🏗️ Arquitetura

### Backend (File-based por rotas)

Cada domínio tem sua própria pasta com:
- `*.service.ts`: Lógica de negócio pura
- `*.route.ts`: Definição das rotas TRPC
- `*.dto.ts`: Schemas Zod para validação

**Exemplo:**
```typescript
// users.service.ts
export class UsersService {
  async createUser(input: CreateUserDto) {
    // lógica de negócio
  }
}

// users.route.ts
export const usersRouter = createTRPCRouter({
  create: publicProcedure
    .input(createUserDto)
    .mutation(async ({ ctx, input }) => {
      const service = new UsersService(ctx);
      return service.createUser(input);
    }),
});

// users.dto.ts
export const createUserDto = z.object({
  name: z.string().min(2).max(50),
  email: z.string().email(),
});
```

### Frontend

#### Componentização
- **Máximo 350 linhas por arquivo**
- Componentes organizados por responsabilidade
- Features agrupadas por domínio

#### Custom Hooks
```typescript
// use-users.ts
export function useUsers() {
  const { data: users, isLoading, error } = trpc.users.list.useQuery();
  return { users: users || [], isLoading, error };
}
```

#### Providers
```typescript
// providers/index.tsx
export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryClient>
      <TRPCProvider>
        <AuthProvider>
          {children}
        </AuthProvider>
      </TRPCProvider>
    </QueryClient>
  );
}
```

## 🧪 Testes

### Testes Unitários (Vitest)
```typescript
// auth.service.test.ts
describe('AuthService', () => {
  it('should return user profile', () => {
    const service = new AuthService(mockContext);
    const result = service.getProfile();
    expect(result).toEqual(mockUser);
  });
});
```

### Testes de Componentes
```typescript
// button.test.tsx
describe('Button Component', () => {
  it('should render button with text', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });
});
```

### Testes E2E (Playwright)
```typescript
// auth.spec.ts
test('user can login', async ({ page }) => {
  await page.goto('/login');
  await page.fill('[data-testid="email"]', 'test@example.com');
  await page.fill('[data-testid="password"]', 'password');
  await page.click('[data-testid="login-button"]');
  await expect(page).toHaveURL('/dashboard');
});
```

## 🔧 Configurações

### Biome (Linting/Formatting)
- Configurado em `biome.json`
- Formatação automática no save
- Regras customizadas para TypeScript/React

### VS Code
- Configurado em `.vscode/settings.json`
- Biome como formatter padrão
- Auto-imports e organização

### TypeScript
- Strict mode habilitado
- Path mapping configurado
- Tipos inferidos automaticamente

## 🚀 Deploy

### Vercel (Recomendado)
1. Conecte seu repositório ao Vercel
2. Configure as variáveis de ambiente
3. Deploy automático a cada push

### Docker
```bash
docker-compose up -d
```

## 📚 Documentação Adicional

- [Next.js Documentation](https://nextjs.org/docs)
- [TRPC Documentation](https://trpc.io/docs)
- [Drizzle Documentation](https://orm.drizzle.team/)
- [Better-auth Documentation](https://www.better-auth.com/)
- [Shadcn/ui Documentation](https://ui.shadcn.com/)

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 🆘 Suporte

Se você encontrar algum problema ou tiver dúvidas:

1. Verifique a [documentação](./.cursor/rules)
2. Procure por issues similares
3. Crie uma nova issue com detalhes do problema

---

**Desenvolvido com ❤️ para criar aplicações Next.js escaláveis e organizadas.**