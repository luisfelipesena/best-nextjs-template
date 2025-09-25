import { Button } from '@/components/ui/button';
import { useAuthSession } from '@/hooks/use-auth-session';

export function AuthStatus() {
  const { data: session, isPending } = useAuthSession();

  if (isPending) {
    return <span className="text-sm text-muted-foreground">Carregando sessão...</span>;
  }

  if (!session) {
    return (
      <Button asChild variant="secondary">
        <a href="/api/auth/signin">Entrar</a>
      </Button>
    );
  }

  return (
    <div className="flex items-center gap-3 text-sm">
      <div className="flex flex-col text-left">
        <span className="font-medium">{session.user?.name ?? session.user?.email ?? 'Usuário'}</span>
        <span className="text-xs text-muted-foreground">{session.user?.email}</span>
      </div>
      <Button asChild variant="ghost">
        <a href="/api/auth/signout">Sair</a>
      </Button>
    </div>
  );
}
