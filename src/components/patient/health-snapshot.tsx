"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { HeartPulse, Droplets, Thermometer, Wind } from "lucide-react";
import { Patient } from "@/lib/dummy-data";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

type Vitals = Patient["vitals"];

const HealthMetricCard = ({
  icon: Icon,
  title,
  value,
  unit,
  trend,
  color,
}: {
  icon: React.ElementType;
  title: string;
  value: string;
  unit: string;
  trend: "up" | "down" | "stable";
  color: string;
}) => {
  const TrendIcon = trend === "up" ? TrendingUp : trend === "down" ? TrendingDown : Minus;

  return (
    <div className="glassmorphism p-4 rounded-lg flex items-center justify-between transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-primary/30">
        <div className="flex items-center gap-4">
            <div className="p-3 rounded-full bg-primary/10 border border-primary/20">
                <Icon className="w-6 h-6" style={{ color }} />
            </div>
            <div>
                <p className="text-sm text-muted-foreground">{title}</p>
                <p className="text-2xl font-bold text-gradient-glow">
                    {value} <span className="text-base font-normal text-muted-foreground">{unit}</span>
                </p>
            </div>
        </div>
        <div className="flex items-center gap-1" style={{ color }}>
            <TrendIcon className="w-5 h-5"/>
        </div>
    </div>
  );
};

export function HealthSnapshot({ vitals }: { vitals: Vitals }) {
    const getTrend = (data: number[]): "up" | "down" | "stable" => {
        if (data.length < 2) return "stable";
        const last = data[data.length - 1];
        const secondLast = data[data.length - 2];
        if (last > secondLast) return "up";
        if (last < secondLast) return "down";
        return "stable";
    }

    const latestSystolic = parseInt(vitals.bloodPressure[vitals.bloodPressure.length - 1].split('/')[0]);
    const secondlatestSystolic = parseInt(vitals.bloodPressure[vitals.bloodPressure.length - 2].split('/')[0]);

    const bpTrend = latestSystolic > secondlatestSystolic ? "up" : latestSystolic < secondlatestSystolic ? "down" : "stable";

  return (
    <Card className="glassmorphism p-4 md:p-6 glowing-shadow">
        <CardHeader>
            <CardTitle className="text-gradient-glow text-2xl">Health Snapshot</CardTitle>
        </CardHeader>
        <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
                <HealthMetricCard
                    icon={HeartPulse}
                    title="Heart Rate"
                    value={vitals.heartRate[vitals.heartRate.length - 1].toString()}
                    unit="bpm"
                    trend={getTrend(vitals.heartRate)}
                    color="hsl(var(--primary))"
                />
                <HealthMetricCard
                    icon={Droplets}
                    title="Blood Pressure"
                    value={vitals.bloodPressure[vitals.bloodPressure.length - 1]}
                    unit="mmHg"
                    trend={bpTrend}
                    color="hsl(var(--secondary))"
                />
                <HealthMetricCard
                    icon={Thermometer}
                    title="Blood Sugar"
                    value={vitals.bloodSugar[vitals.bloodSugar.length - 1].toString()}
                    unit="mg/dL"
                    trend={getTrend(vitals.bloodSugar)}
                    color="hsl(var(--tertiary))"
                />
                <HealthMetricCard
                    icon={Wind}
                    title="Oxygen Sat."
                    value={vitals.oxygenSaturation[vitals.oxygenSaturation.length - 1].toString()}
                    unit="%"
                    trend={getTrend(vitals.oxygenSaturation)}
                    color="hsl(var(--accent))"
                />
            </div>
        </CardContent>
    </Card>
  );
}
