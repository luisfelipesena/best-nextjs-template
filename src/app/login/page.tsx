import { LoginForm } from "@/features/auth"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center space-y-4">
          <div className="space-y-2">
            <h2 className="text-lg font-semibold">Teste de Variantes dos Botões</h2>
            <div className="flex flex-wrap gap-2 justify-center">
              <Button variant="default">Default</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="destructive">Destructive</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="link">Link</Button>
            </div>
          </div>
          <Link href="/" className="text-2xl font-bold text-primary block">
            Best Next.js Template
          </Link>
        </div>
        <LoginForm />
      </div>
    </div>
  )
}
