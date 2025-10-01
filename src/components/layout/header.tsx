import Link from "next/link";
import { Logo } from "@/components/icons/logo";
import { Button } from "@/components/ui/button";

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 glassmorphism">
      <div className="container mx-auto flex h-20 items-center justify-between px-4">
        <Link href="/home">
          <Logo />
        </Link>
        <nav className="flex items-center gap-2">
          <Button asChild variant="ghost">
            <Link href="/login">Login</Link>
          </Button>
          <Button asChild className="glowing-shadow-interactive">
            <Link href="/login?role=patient">Get Started</Link>
          </Button>
        </nav>
      </div>
    </header>
  );
}
