# Diretrizes de Componentes - Next.js Template

## 🎯 Princípios Fundamentais

### 1. **Limite de 350 Linhas**
- **NUNCA** criar componentes com mais de 350 linhas
- Se ultrapassar, quebrar em componentes menores
- Use composição para combinar componentes pequenos

### 2. **Single Responsibility**
- Cada componente deve ter uma única responsabilidade
- Se faz mais de uma coisa, quebrar em componentes menores
- Preferir componentes específicos a componentes genéricos demais

### 3. **Composição sobre Configuração**
- Usar children e render props
- Evitar props booleanas demais
- Permitir customização através de composição

## 📦 Tipos de Componentes

### 1. **UI Components** (`src/components/ui/`)
Componentes base reutilizáveis, principalmente do Shadcn/UI.

```typescript
// ✅ Bom: Componente UI simples e focado
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost'
  size?: 'default' | 'sm' | 'lg'
  isLoading?: boolean
}

export function Button({ 
  variant = 'default', 
  size = 'default', 
  isLoading, 
  children,
  disabled,
  ...props 
}: ButtonProps) {
  return (
    <button
      className={cn(buttonVariants({ variant, size }))}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? <Spinner /> : children}
    </button>
  )
}
```

### 2. **Layout Components** (`src/components/layout/`)
Componentes para estrutura e layout da aplicação.

```typescript
// ✅ Bom: Layout component com slots
interface AppShellProps {
  header?: React.ReactNode
  sidebar?: React.ReactNode
  children: React.ReactNode
  footer?: React.ReactNode
}

export function AppShell({ header, sidebar, children, footer }: AppShellProps) {
  return (
    <div className="min-h-screen bg-background">
      {header && <header className="border-b">{header}</header>}
      
      <div className="flex">
        {sidebar && (
          <aside className="w-64 border-r bg-muted/40">
            {sidebar}
          </aside>
        )}
        
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
      
      {footer && <footer className="border-t">{footer}</footer>}
    </div>
  )
}
```

### 3. **Feature Components** (`src/features/*/components/`)
Componentes específicos de uma feature/domínio.

```typescript
// ✅ Bom: Component específico de feature
interface UserProfileCardProps {
  user: User
  onEdit?: () => void
  showEditButton?: boolean
}

export function UserProfileCard({ user, onEdit, showEditButton = true }: UserProfileCardProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-4">
          <Avatar>
            <AvatarImage src={user.imageUrl} />
            <AvatarFallback>{user.name[0]}</AvatarFallback>
          </Avatar>
          <div>
            <CardTitle>{user.name}</CardTitle>
            <CardDescription>{user.email}</CardDescription>
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        <p className="text-sm text-muted-foreground">
          Member since {formatDate(user.createdAt)}
        </p>
      </CardContent>
      
      {showEditButton && (
        <CardFooter>
          <Button onClick={onEdit} variant="outline">
            Edit Profile
          </Button>
        </CardFooter>
      )}
    </Card>
  )
}
```

## 🏗️ Padrões de Composição

### 1. **Compound Components**
Para componentes complexos com múltiplas partes.

```typescript
// ✅ Bom: Compound component pattern
interface DataTableProps {
  children: React.ReactNode
}

interface DataTableHeaderProps {
  children: React.ReactNode
}

interface DataTableRowProps {
  children: React.ReactNode
}

interface DataTableCellProps {
  children: React.ReactNode
}

function DataTable({ children }: DataTableProps) {
  return (
    <div className="rounded-md border">
      <table className="w-full">{children}</table>
    </div>
  )
}

function DataTableHeader({ children }: DataTableHeaderProps) {
  return <thead className="bg-muted/50">{children}</thead>
}

function DataTableRow({ children }: DataTableRowProps) {
  return <tr className="border-b hover:bg-muted/50">{children}</tr>
}

function DataTableCell({ children }: DataTableCellProps) {
  return <td className="p-4">{children}</td>
}

// Exportar como compound component
DataTable.Header = DataTableHeader
DataTable.Row = DataTableRow
DataTable.Cell = DataTableCell

export { DataTable }

// Uso:
<DataTable>
  <DataTable.Header>
    <DataTable.Row>
      <DataTable.Cell>Name</DataTable.Cell>
      <DataTable.Cell>Email</DataTable.Cell>
    </DataTable.Row>
  </DataTable.Header>
</DataTable>
```

### 2. **Render Props**
Para lógica reutilizável com UI flexível.

```typescript
// ✅ Bom: Render prop pattern
interface DataFetcherProps<T> {
  url: string
  children: (data: {
    data: T | null
    loading: boolean
    error: string | null
    refetch: () => void
  }) => React.ReactNode
}

export function DataFetcher<T>({ url, children }: DataFetcherProps<T>) {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchData = useCallback(async () => {
    try {
      setLoading(true)
      const response = await fetch(url)
      const result = await response.json()
      setData(result)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error')
    } finally {
      setLoading(false)
    }
  }, [url])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  return <>{children({ data, loading, error, refetch: fetchData })}</>
}

// Uso:
<DataFetcher<User[]> url="/api/users">
  {({ data, loading, error }) => {
    if (loading) return <Spinner />
    if (error) return <ErrorMessage message={error} />
    return <UserList users={data || []} />
  }}
</DataFetcher>
```

### 3. **Higher-Order Components (HOCs)**
Para funcionalidades transversais.

```typescript
// ✅ Bom: HOC para autenticação
export function withAuth<P extends object>(Component: React.ComponentType<P>) {
  return function AuthenticatedComponent(props: P) {
    const { user, isLoading } = useAuth()

    if (isLoading) {
      return <div>Loading...</div>
    }

    if (!user) {
      return <div>Please login to access this page</div>
    }

    return <Component {...props} />
  }
}

// Uso:
const ProtectedDashboard = withAuth(Dashboard)
```

## 🎨 Styling Guidelines

### 1. **Tailwind Classes**
```typescript
// ✅ Bom: Classes organizadas e legíveis
<div className={cn(
  // Layout
  "flex items-center justify-between",
  // Spacing
  "p-4 gap-4",
  // Styling
  "bg-white dark:bg-gray-800",
  "border border-gray-200 dark:border-gray-700",
  "rounded-lg shadow-sm",
  // Interactive
  "hover:shadow-md transition-shadow",
  // Conditional
  isActive && "ring-2 ring-blue-500",
  className
)}>
```

### 2. **CSS Variables para Temas**
```typescript
// ✅ Bom: Usando CSS variables do shadcn
<div className="bg-background text-foreground border-border">
  <h1 className="text-primary">Title</h1>
  <p className="text-muted-foreground">Description</p>
</div>
```

### 3. **Responsive Design**
```typescript
// ✅ Bom: Mobile-first responsive
<div className={cn(
  // Mobile (default)
  "flex flex-col gap-2 p-4",
  // Tablet
  "sm:flex-row sm:gap-4 sm:p-6",
  // Desktop
  "lg:gap-6 lg:p-8"
)}>
```

## 🔄 State Management

### 1. **Local State**
```typescript
// ✅ Bom: Local state para UI simples
function ToggleButton() {
  const [isOn, setIsOn] = useState(false)

  return (
    <button
      onClick={() => setIsOn(!isOn)}
      className={cn(
        "px-4 py-2 rounded",
        isOn ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-800"
      )}
    >
      {isOn ? 'On' : 'Off'}
    </button>
  )
}
```

### 2. **Server State (TRPC)**
```typescript
// ✅ Bom: Server state com TRPC
function UserList() {
  const { data: users, isLoading, error } = trpc.users.getAll.useQuery()

  if (isLoading) return <Spinner />
  if (error) return <ErrorMessage message={error.message} />

  return (
    <div className="space-y-4">
      {users?.map(user => (
        <UserCard key={user.id} user={user} />
      ))}
    </div>
  )
}
```

### 3. **Form State**
```typescript
// ✅ Bom: Form state com hook personalizado
function useForm<T>(initialValues: T, validationSchema: z.ZodSchema<T>) {
  const [values, setValues] = useState(initialValues)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const setValue = (field: keyof T, value: any) => {
    setValues(prev => ({ ...prev, [field]: value }))
    if (errors[field as string]) {
      setErrors(prev => ({ ...prev, [field]: undefined }))
    }
  }

  const validate = () => {
    try {
      validationSchema.parse(values)
      setErrors({})
      return true
    } catch (err) {
      if (err instanceof z.ZodError) {
        const fieldErrors: Record<string, string> = {}
        err.errors.forEach(error => {
          if (error.path[0]) {
            fieldErrors[error.path[0] as string] = error.message
          }
        })
        setErrors(fieldErrors)
      }
      return false
    }
  }

  return { values, errors, setValue, validate }
}
```

## 🧪 Testing Components

### 1. **Unit Tests**
```typescript
// ✅ Bom: Teste focado em comportamento
import { render, screen, fireEvent } from '@testing-library/react'
import { vi } from 'vitest'
import { Button } from './button'

describe('Button', () => {
  it('should render children correctly', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByRole('button')).toHaveTextContent('Click me')
  })

  it('should call onClick when clicked', () => {
    const handleClick = vi.fn()
    render(<Button onClick={handleClick}>Click me</Button>)
    
    fireEvent.click(screen.getByRole('button'))
    expect(handleClick).toHaveBeenCalledOnce()
  })

  it('should be disabled when loading', () => {
    render(<Button isLoading>Click me</Button>)
    expect(screen.getByRole('button')).toBeDisabled()
  })

  it('should apply variant classes correctly', () => {
    render(<Button variant="destructive">Delete</Button>)
    expect(screen.getByRole('button')).toHaveClass('bg-destructive')
  })
})
```

### 2. **Integration Tests**
```typescript
// ✅ Bom: Teste de integração com providers
import { render, screen, waitFor } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { UserProfile } from './user-profile'

function renderWithProviders(component: React.ReactElement) {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } }
  })
  
  return render(
    <QueryClientProvider client={queryClient}>
      {component}
    </QueryClientProvider>
  )
}

describe('UserProfile Integration', () => {
  it('should load and display user data', async () => {
    renderWithProviders(<UserProfile userId="1" />)
    
    expect(screen.getByText('Loading...')).toBeInTheDocument()
    
    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeInTheDocument()
    })
  })
})
```

## 🚫 Anti-Padrões (O que NÃO fazer)

### 1. **Componentes Gigantes**
```typescript
// ❌ Ruim: Componente muito grande (> 350 linhas)
function MegaComponent() {
  // 400+ linhas de código
  // Múltiplas responsabilidades
  // Difícil de testar e manter
}

// ✅ Bom: Quebrar em componentes menores
function UserDashboard() {
  return (
    <div>
      <UserHeader />
      <UserStats />
      <UserActivity />
      <UserSettings />
    </div>
  )
}
```

### 2. **Props Drilling Excessivo**
```typescript
// ❌ Ruim: Passing props através de muitos níveis
function App() {
  const user = useUser()
  return <Layout user={user} />
}

function Layout({ user }) {
  return <Sidebar user={user} />
}

function Sidebar({ user }) {
  return <UserMenu user={user} />
}

// ✅ Bom: Usar Context ou hooks
function App() {
  return (
    <UserProvider>
      <Layout />
    </UserProvider>
  )
}

function UserMenu() {
  const { user } = useUser() // Pega direto do context
  return <div>{user.name}</div>
}
```

### 3. **Lógica de Negócio em Componentes**
```typescript
// ❌ Ruim: Business logic no componente
function UserList() {
  const [users, setUsers] = useState([])
  
  useEffect(() => {
    // Lógica complexa de fetch, transformação, cache...
    // 50+ linhas de lógica de negócio
  }, [])
  
  return <div>{/* render */}</div>
}

// ✅ Bom: Extrair para hooks customizados
function UserList() {
  const { users, isLoading, error } = useUsers()
  
  if (isLoading) return <Loading />
  if (error) return <Error message={error} />
  
  return (
    <div>
      {users.map(user => <UserCard key={user.id} user={user} />)}
    </div>
  )
}
```

### 4. **Inline Styles**
```typescript
// ❌ Ruim: Inline styles
<div style={{ 
  backgroundColor: 'blue', 
  padding: '16px',
  borderRadius: '8px' 
}}>

// ✅ Bom: Tailwind classes
<div className="bg-blue-500 p-4 rounded-lg">
```

## 📋 Checklist de Review

Antes de fazer commit de um componente, verificar:

- [ ] Componente tem menos de 350 linhas?
- [ ] Tem uma única responsabilidade?
- [ ] Props são tipadas corretamente?
- [ ] Usa Tailwind ao invés de CSS inline?
- [ ] Tem testes unitários?
- [ ] É acessível (a11y)?
- [ ] Funciona em mobile?
- [ ] Segue os padrões de nomenclatura?
- [ ] Está na pasta correta?
- [ ] Tem documentação/comentários se necessário?