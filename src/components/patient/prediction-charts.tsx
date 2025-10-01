"use client";

import {
  BarChart,
  Bar,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { addDays, format } from "date-fns";
import { Patient } from "@/lib/dummy-data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartTooltipContent } from "@/components/ui/chart";

type Predictions = Patient["predictions"];

export function PredictionCharts({ predictions }: { predictions: Predictions }) {
  const next7Days = Array.from({ length: 7 }, (_, i) => addDays(new Date(), i));
  
  const adherenceData = next7Days.map((date, i) => ({
    date: format(date, "MMM d"),
    "Adherence": predictions.medicationAdherence[i] * 100,
  }));

  const appointmentData = next7Days.map((date, i) => ({
    date: format(date, "MMM d"),
    "Probability": predictions.appointmentProbability[i] * 100,
  }));

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="glassmorphism p-4 md:p-6 glowing-shadow">
            <CardHeader>
                <CardTitle className="text-gradient-glow text-lg">Medication Adherence (Next 7 Days)</CardTitle>
            </CardHeader>
            <CardContent className="h-[250px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={adherenceData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                        <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                        <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} unit="%" />
                        <Tooltip
                            content={<ChartTooltipContent indicator="dot" />}
                            cursor={{ fill: 'hsl(var(--primary)/0.1)' }}
                            wrapperStyle={{ backgroundColor: 'hsl(var(--background))', border: '1px solid hsl(var(--border))', borderRadius: 'var(--radius)'}}
                        />
                        <Bar dataKey="Adherence" fill="hsl(var(--chart-4))" radius={[4, 4, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
        <Card className="glassmorphism p-4 md:p-6 glowing-shadow">
            <CardHeader>
                <CardTitle className="text-gradient-glow text-lg">Appointment Forecast (Next 7 Days)</CardTitle>
            </CardHeader>
            <CardContent className="h-[250px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={appointmentData}>
                        <defs>
                            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="hsl(var(--chart-5))" stopOpacity={0.8}/>
                                <stop offset="95%" stopColor="hsl(var(--chart-5))" stopOpacity={0}/>
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                        <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                        <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} unit="%" />
                        <Tooltip
                            content={<ChartTooltipContent indicator="dot" />}
                            cursor={{ stroke: "hsl(var(--primary))", strokeWidth: 1, strokeDasharray: "3 3" }}
                            wrapperStyle={{ backgroundColor: 'hsl(var(--background))', border: '1px solid hsl(var(--border))', borderRadius: 'var(--radius)'}}
                        />
                        <Area type="monotone" dataKey="Probability" stroke="hsl(var(--chart-5))" fill="url(#colorUv)" />
                    </AreaChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    </div>
  );
}
