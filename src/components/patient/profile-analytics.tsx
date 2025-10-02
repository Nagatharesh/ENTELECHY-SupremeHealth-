
"use client"

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid,
  BarChart,
  Bar,
  RadialBar,
  RadialBarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  RadarChart
} from "recharts";
import { Patient, MedicalEncounter } from "@/lib/dummy-data";
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { FileText, Stethoscope } from "lucide-react";
import { useMemo } from "react";
import { format } from "date-fns";

const chartConfig = {
    "BP": { label: "BP (mmHg)", color: "hsl(var(--chart-1))" },
    "HR": { label: "HR (bpm)", color: "hsl(var(--chart-2))" },
    "SpO2": { label: "SpO₂ (%)", color: "hsl(var(--chart-3))" },
    "Visits": { label: "Visits", color: "hsl(var(--chart-4))" },
    "score": { label: "Score", color: "hsl(var(--chart-5))" },
    "adherence": { label: "Adherence", color: "hsl(var(--chart-1))" },
} satisfies ChartConfig;


const getRiskColor = (risk: string) => {
    switch(risk.toLowerCase()) {
        case 'low': return 'bg-lime-500/20 text-lime-400 border-lime-500/30';
        case 'moderate': return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
        case 'high': return 'bg-pink-600/20 text-pink-500 border-pink-600/30';
        default: return 'bg-card';
    }
}

export function ProfileAnalytics({ patient }: { patient: Patient }) {
    
    const visitTimelineData = useMemo(() => {
        const counts: {[key: string]: number} = {};
        patient.medicalEncounters.forEach(encounter => {
            const month = format(new Date(encounter.date), "MMM yy");
            counts[month] = (counts[month] || 0) + 1;
        });
        return Object.entries(counts).map(([month, count])=> ({month, "Visits": count})).reverse();
    }, [patient.medicalEncounters]);

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <VitalSignsChart data={patient.analytics.vitalSigns} spO2={patient.analytics.spO2} />
                <MedicalVisitsChart data={visitTimelineData} timeline={patient.medicalEncounters} />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                 <LifestyleScoreChart data={patient.analytics.lifestyleScore} />
                 <MedicationComplianceChart data={patient.analytics.medicationCompliance} />
                 <FutureRiskPrediction data={patient.analytics.futureRisk} />
            </div>
        </div>
    );
}

const VitalSignsChart = ({ data, spO2 }: { data: any[], spO2: number }) => (
    <Card className="glassmorphism glowing-shadow lg:col-span-2">
        <CardHeader>
            <CardTitle className="text-gradient-glow">Vital Signs Trend (Last 6 Months)</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 h-[250px]">
                 <ChartContainer config={chartConfig} className="w-full h-full">
                    <ResponsiveContainer>
                        <BarChart data={data} margin={{ top: 20 }}>
                             <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border) / 0.5)" />
                             <XAxis dataKey="month" tickLine={false} axisLine={false} stroke="hsl(var(--foreground))" fontSize={12} />
                             <YAxis yAxisId="left" orientation="left" tickLine={false} axisLine={false} stroke="hsl(var(--chart-1))" fontSize={12} domain={[60, 140]}/>
                             <YAxis yAxisId="right" orientation="right" tickLine={false} axisLine={false} stroke="hsl(var(--chart-2))" fontSize={12} domain={[60, 90]}/>
                             <Tooltip
                                content={<ChartTooltipContent indicator="dot" />}
                                cursor={{ fill: 'hsl(var(--primary)/0.1)' }}
                                wrapperStyle={{ backgroundColor: 'hsl(var(--background)/0.8)', backdropFilter: 'blur(5px)', border: '1px solid hsl(var(--border))', borderRadius: 'var(--radius)'}}
                            />
                            <Legend />
                            <Bar yAxisId="left" dataKey="BP" fill="url(#colorBP)" radius={[4, 4, 0, 0]} barSize={20} />
                            <Line yAxisId="right" dataKey="HR" type="monotone" stroke="hsl(var(--chart-2))" strokeWidth={2} dot={{r:4}} activeDot={{r:8}}/>
                             <defs>
                                <linearGradient id="colorBP" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="hsl(var(--chart-1))" stopOpacity={0.8}/>
                                    <stop offset="95%" stopColor="hsl(var(--chart-1))" stopOpacity={0.2}/>
                                </linearGradient>
                            </defs>
                        </BarChart>
                    </ResponsiveContainer>
                 </ChartContainer>
            </div>
            <div className="h-[250px] flex flex-col items-center justify-center">
                 <ChartContainer config={chartConfig} className="w-full h-full">
                     <ResponsiveContainer>
                         <RadialBarChart innerRadius="80%" outerRadius="100%" barSize={12} data={[{ name: "SpO2", value: spO2, fill: "url(#colorSpO2)" }] } startAngle={90} endAngle={-270}>
                             <defs>
                                <radialGradient id="colorSpO2">
                                    <stop offset="0%" stopColor="hsl(var(--chart-3))" />
                                    <stop offset="100%" stopColor="hsl(var(--accent))" />
                                </radialGradient>
                            </defs>
                             <PolarAngleAxis type="number" domain={[0, 100]} tick={false} />
                             <RadialBar background dataKey="value" cornerRadius={10}/>
                             <ChartTooltip
                                content={<ChartTooltipContent hideLabel nameKey="name" />}
                                cursor={false}
                            />
                            <text
                                x="50%"
                                y="50%"
                                textAnchor="middle"
                                dominantBaseline="middle"
                                className="fill-white text-3xl font-bold text-gradient-glow"
                                >
                                {spO2}%
                            </text>
                            <text
                                x="50%"
                                y="65%"
                                textAnchor="middle"
                                dominantBaseline="middle"
                                className="fill-muted-foreground text-sm"
                                >
                                SpO₂
                            </text>
                         </RadialBarChart>
                     </ResponsiveContainer>
                 </ChartContainer>
            </div>
        </CardContent>
    </Card>
);

const MedicalVisitsChart = ({ data, timeline }: { data: any[], timeline: MedicalEncounter[] }) => (
    <Card className="glassmorphism glowing-shadow">
        <CardHeader>
            <CardTitle className="text-gradient-glow">Medical Visits (Last 2 Years)</CardTitle>
        </CardHeader>
        <CardContent className="h-[250px] flex flex-col">
            <div className="h-[150px] w-full">
                 <ChartContainer config={chartConfig} className="w-full h-full">
                     <ResponsiveContainer>
                         <BarChart data={data}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border) / 0.5)" />
                            <XAxis dataKey="month" tickLine={false} axisLine={false} stroke="hsl(var(--foreground))" fontSize={12} />
                            <YAxis tickLine={false} axisLine={false} stroke="hsl(var(--foreground))" fontSize={12} width={20} />
                             <Tooltip
                                content={<ChartTooltipContent indicator="dot" />}
                                cursor={{ fill: 'hsl(var(--primary)/0.1)' }}
                                wrapperStyle={{ backgroundColor: 'hsl(var(--background)/0.8)', backdropFilter: 'blur(5px)', border: '1px solid hsl(var(--border))', borderRadius: 'var(--radius)'}}
                            />
                            <Bar dataKey="Visits" fill="hsl(var(--chart-4))" radius={4}/>
                         </BarChart>
                     </ResponsiveContainer>
                 </ChartContainer>
            </div>
            <div className="flex-grow grid grid-cols-2 gap-4 pt-4">
                <InfoBox label="General Checkups" value={timeline.filter(e=>e.department === 'General Medicine').length} icon={Stethoscope} />
                <InfoBox label="Diagnostics" value={timeline.reduce((acc, e) => acc + (e.investigations?.split(',').length || 0) ,0)} icon={FileText}/>
            </div>
        </CardContent>
    </Card>
);

const MedicationComplianceChart = ({ data }: { data: {name: string, adherence: number}[]}) => (
     <Card className="glassmorphism glowing-shadow">
        <CardHeader>
            <CardTitle className="text-gradient-glow">Medication Compliance</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
            {data.map(med => (
                <div key={med.name}>
                    <div className="flex justify-between items-baseline mb-1">
                        <p className="text-sm font-medium text-white">{med.name}</p>
                        <p className="text-lg font-bold text-primary">{med.adherence}%</p>
                    </div>
                    <Progress value={med.adherence} className="h-2"/>
                </div>
            ))}
        </CardContent>
    </Card>
);

const LifestyleScoreChart = ({ data }: { data: any[] }) => (
    <Card className="glassmorphism glowing-shadow">
        <CardHeader>
            <CardTitle className="text-gradient-glow">AI-Predicted Lifestyle Score</CardTitle>
        </CardHeader>
        <CardContent className="h-[250px]">
            <ChartContainer config={chartConfig} className="w-full h-full">
                <ResponsiveContainer>
                    <RadarChart data={data}>
                        <CartesianGrid stroke="hsl(var(--border) / 0.5)"/>
                        <PolarGrid stroke="hsl(var(--border) / 0.5)"/>
                        <PolarAngleAxis dataKey="metric" stroke="hsl(var(--foreground))" fontSize={12}/>
                        <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false}/>
                        <Tooltip
                            content={<ChartTooltipContent indicator="dot" />}
                            cursor={{ stroke: 'hsl(var(--primary))', strokeDasharray: '3 3' }}
                            wrapperStyle={{ backgroundColor: 'hsl(var(--background)/0.8)', backdropFilter: 'blur(5px)', border: '1px solid hsl(var(--border))', borderRadius: 'var(--radius)'}}
                        />
                        <Radar name="Lifestyle" dataKey="score" stroke="hsl(var(--chart-5))" fill="hsl(var(--chart-5))" fillOpacity={0.6} />
                    </RadarChart>
                </ResponsiveContainer>
            </ChartContainer>
        </CardContent>
    </Card>
);

const FutureRiskPrediction = ({ data }: { data: any }) => (
     <Card className="glassmorphism glowing-shadow">
        <CardHeader>
            <CardTitle className="text-gradient-glow">Future Risk Prediction (AI)</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
             {Object.entries(data).map(([key, value]: [string, any]) => (
                <div key={key} className={`p-3 rounded-lg border ${getRiskColor(value.risk)}`}>
                    <div className="flex justify-between items-center">
                        <p className="font-semibold capitalize text-white">{key.replace(/([A-Z])/g, ' $1')}</p>
                        <Badge variant="outline" className={`border-current ${getRiskColor(value.risk)}`}>{value.risk}</Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">{value.details}</p>
                </div>
             ))}
        </CardContent>
    </Card>
);

const InfoBox = ({ label, value, icon: Icon }: { label: string, value: string | number, icon: React.ElementType }) => (
  <div className="flex items-center gap-3 p-3 rounded-md bg-card/50">
    <Icon className="w-6 h-6 text-secondary" />
    <div>
      <p className="text-sm text-muted-foreground">{label}</p>
      <p className="text-xl font-bold text-white">{value}</p>
    </div>
  </div>
);
