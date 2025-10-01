"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { addDays, format } from "date-fns";
import { Patient } from "@/lib/dummy-data";
import { ChartTooltipContent } from "@/components/ui/chart";

type VitalsChartProps = {
  vitals: Patient["vitals"];
  predictions: Patient["predictions"]["vitalsNext7Days"];
};

export function VitalsChart({ vitals, predictions }: VitalsChartProps) {
  const last7Days = Array.from({ length: 7 }, (_, i) => addDays(new Date(), i - 6));
  
  const chartData = last7Days.map((date, i) => {
    const systolic = parseInt(vitals.bloodPressure[i]?.split('/')[0] || '0');
    const diastolic = parseInt(vitals.bloodPressure[i]?.split('/')[1] || '0');
    const predSystolic = parseInt(predictions.bloodPressure[i]?.split('/')[0] || '0');
    
    return {
      date: format(date, "MMM d"),
      "Heart Rate": vitals.heartRate[i],
      "Blood Sugar": vitals.bloodSugar[i],
      "Systolic BP": systolic,
      "Diastolic BP": diastolic,
      "Predicted Heart Rate": predictions.heartRate[i],
      "Predicted Systolic BP": predSystolic
    };
  });

  return (
    <div className="h-[350px] w-full">
        <h3 className="text-lg font-semibold text-gradient-glow mb-4">Vitals Trend (Last 7 Days)</h3>
        <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <YAxis yAxisId="left" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <YAxis yAxisId="right" orientation="right" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <Tooltip
                    content={<ChartTooltipContent indicator="dot" />}
                    cursor={{ stroke: "hsl(var(--primary))", strokeWidth: 1, strokeDasharray: "3 3" }}
                    wrapperStyle={{ backgroundColor: 'hsl(var(--background))', border: '1px solid hsl(var(--border))', borderRadius: 'var(--radius)'}}
                />
                <Legend />
                <Line
                    yAxisId="left"
                    type="monotone"
                    dataKey="Heart Rate"
                    stroke="hsl(var(--chart-1))"
                    strokeWidth={2}
                    dot={{ r: 4, fill: "hsl(var(--chart-1))" }}
                    activeDot={{ r: 6 }}
                />
                <Line
                    yAxisId="left"
                    type="monotone"
                    dataKey="Predicted Heart Rate"
                    stroke="hsl(var(--chart-1))"
                    strokeWidth={2}
                    strokeDasharray="5 5"
                    dot={false}
                />
                <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="Systolic BP"
                    stroke="hsl(var(--chart-2))"
                    strokeWidth={2}
                    dot={{ r: 4, fill: "hsl(var(--chart-2))" }}
                    activeDot={{ r: 6 }}
                />
                <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="Predicted Systolic BP"
                    stroke="hsl(var(--chart-2))"
                    strokeWidth={2}
                    strokeDasharray="5 5"
                    dot={false}
                />
                 <Line
                    yAxisId="left"
                    type="monotone"
                    dataKey="Blood Sugar"
                    stroke="hsl(var(--chart-3))"
                    strokeWidth={2}
                    dot={{ r: 4, fill: "hsl(var(--chart-3))" }}
                    activeDot={{ r: 6 }}
                />
            </LineChart>
        </ResponsiveContainer>
    </div>
  );
}
