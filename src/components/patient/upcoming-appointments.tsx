"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Clock } from "lucide-react";
import { Patient } from "@/lib/dummy-data";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

type Appointments = Patient["appointments"];

export function UpcomingAppointments({ appointments }: { appointments: Appointments }) {
  const sortedAppointments = [...appointments].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  return (
    <Card className="glassmorphism glowing-shadow">
      <CardHeader>
        <CardTitle className="text-gradient-glow">Upcoming Appointments</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {sortedAppointments.map((appt, index) => (
            <div
              key={index}
              className={cn(
                "p-4 rounded-lg flex items-start gap-4 transition-all duration-300",
                appt.urgent ? "bg-destructive/10 border-l-4 border-destructive" : "bg-card/50"
              )}
            >
              <div className="p-2 bg-primary/10 rounded-md">
                <Calendar className="w-6 h-6 text-primary" />
              </div>
              <div className="flex-grow">
                <p className="font-semibold text-white">{appt.doctor}</p>
                <p className="text-sm text-muted-foreground">{appt.hospital}</p>
                <div className="flex items-center gap-2 text-sm text-primary mt-1">
                  <Clock className="w-4 h-4" />
                  <span>{new Date(appt.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                </div>
              </div>
              {appt.urgent && <Badge variant="destructive">Urgent</Badge>}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
