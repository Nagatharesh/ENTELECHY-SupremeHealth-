import { Header } from "@/components/layout/header";
import { Hero } from "@/components/landing/hero";
import { RoleSelection } from "@/components/landing/role-selection";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow pt-20">
        <Hero />
        <RoleSelection />
      </main>
      <footer className="container mx-auto py-8 text-center text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} SupremeHealth. All rights reserved.</p>
      </footer>
    </div>
  );
}
