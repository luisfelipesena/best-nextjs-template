import { LoginForm } from "@/features/auth"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <Button variant="outline">Best Next.js Template 1</Button>
          <Button variant="default">Best Next.js Template 2</Button>
          <Button variant="destructive">Best Next.js Template 3</Button>
          <Button variant="ghost">Best Next.js Template 4</Button>
          <Button variant="secondary">Best Next.js Template 5</Button>
          <Button variant="outline">Best Next.js Template 6</Button>
          <Button variant="link">Best Next.js Template 7</Button>
          <Button variant="link">Best Next.js Template 8</Button>
          <Link href="/" className="text-2xl font-bold text-primary">
            Best Next.js Template
          </Link>
        </div>
        <LoginForm />
      </div>
    </div>
  )
}
