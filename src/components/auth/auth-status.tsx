import { Button } from '@/components/ui/button';
import { useAuthSession } from '@/hooks/use-auth-session';
import Link from 'next/link';

export function AuthStatus() {
  const { data: session, isPending } = useAuthSession();

  if (isPending) {
    return <span className="text-sm text-muted-foreground">Carregando sessão...</span>;
  }

  if (!session) {
    return (
      <Button asChild variant="secondary">
        <Link href="/api/auth/signin">Entrar</Link>
      </Button>
    );
  }

  return (
    <div className="flex items-center gap-3 text-sm">
      <div className="flex flex-col text-left">
        <span className="font-medium">Usuário</span>
        <span className="text-xs text-muted-foreground">user@example.com</span>
      </div>
      <Button asChild variant="ghost">
        <Link href="/api/auth/signout">Sair</Link>
      </Button>
    </div>
  );
}
