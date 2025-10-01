import { Header } from "@/components/layout/header";
import { Hero } from "@/components/landing/hero";
import { RoleSelection } from "@/components/landing/role-selection";
import { Footer } from "@/components/layout/footer";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow pt-20">
        <Hero />
        <RoleSelection />
      </main>
      <Footer />
    </div>
  );
}
