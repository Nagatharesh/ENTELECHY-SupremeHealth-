import {
  HeartPulse,
  Hospital,
  Stethoscope,
  Ambulance,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

const roles = [
  {
    name: "Patient",
    description: "Access your health records, book appointments, and connect with doctors.",
    icon: HeartPulse,
    link: "/login?role=patient",
    cta: "Patient Hub",
  },
  {
    name: "Doctor",
    description: "Manage your patient schedule, conduct tele-consultations, and issue prescriptions.",
    icon: Stethoscope,
    link: "/login?role=doctor",
    cta: "Doctor Hub",
  },
  {
    name: "Hospital",
    description: "Oversee hospital operations, manage staff, and monitor bed occupancy.",
    icon: Hospital,
    link: "/login?role=hospital",
    cta: "Hospital Hub",
  },
  {
    name: "Ambulance",
    description: "Respond to emergencies, manage dispatch, and track vehicle status in real-time.",
    icon: Ambulance,
    link: "/login?role=ambulance",
    cta: "Ambulance Hub",
  },
];

export function RoleSelection() {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Choose Your Hub</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mt-4">
            Enter the future of care. Each role is equipped with a dedicated dashboard tailored to your needs.
            </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {roles.map((role, index) => (
            <div
              key={role.name}
              className="animate-fade-in-up"
              style={{ animationDelay: `${index * 150}ms`, animationFillMode: 'backwards' }}
            >
              <Card className="h-full flex flex-col bg-card/50 backdrop-blur-sm border-white/10 hover:border-primary/50 transition-all duration-300 transform hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/20">
                <CardHeader className="items-center text-center">
                  <div className="p-4 rounded-full bg-primary/10 mb-4 border border-primary/20">
                    <role.icon className="w-10 h-10 text-primary" />
                  </div>
                  <CardTitle>{role.name}</CardTitle>
                  <CardDescription className="flex-grow">{role.description}</CardDescription>
                </CardHeader>
                <CardContent className="mt-auto">
                  <Button asChild className="w-full shadow-[0_0_15px_hsl(var(--primary)/0.3)] transition-all hover:shadow-[0_0_25px_hsl(var(--primary)/0.5)]">
                    <Link href={role.link}>{role.cta}</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
