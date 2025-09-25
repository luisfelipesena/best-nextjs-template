import { Button } from '@/components/ui/button'

export function AuthStatus() {
  // TODO: Implement proper auth session hook
  const session = null
  const isPending = false

  if (isPending) {
    return (
      <span className="text-sm text-muted-foreground" data-testid="auth-status">
        Carregando sessão...
      </span>
    )
  }

  if (!session) {
    return (
      <div data-testid="auth-status">
        <Button variant="secondary">
          Entrar
        </Button>
      </div>
    )
  }

  return (
    <div className="flex items-center gap-3 text-sm" data-testid="auth-status">
      <div className="flex flex-col text-left">
        <span className="font-medium">Usuário Logado</span>
        <span className="text-xs text-muted-foreground">user@example.com</span>
      </div>
      <Button variant="ghost">
        Sair
      </Button>
    </div>
  )
}
