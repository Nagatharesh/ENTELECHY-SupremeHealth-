
"use client";

import React, { useState, useMemo, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { dummyGeneticPatients, GeneticPatientProfile } from '@/lib/dummy-data';
import { DNA } from '@/components/icons/dna';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { BarChart, LineChart, PieChart, Info, FlaskConical, Stethoscope } from 'lucide-react';
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart";
import { Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend, Line as RechartsLine, Pie, Cell, Sector } from 'recharts';

const renderActiveShape = (props: any) => {
    const RADIAN = Math.PI / 180;
    const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent, value } = props;
    const sin = Math.sin(-RADIAN * midAngle);
    const cos = Math.cos(-RADIAN * midAngle);
    const sx = cx + (outerRadius + 10) * cos;
    const sy = cy + (outerRadius + 10) * sin;
    const mx = cx + (outerRadius + 30) * cos;
    const my = cy + (outerRadius + 30) * sin;
    const ex = mx + (cos >= 0 ? 1 : -1) * 22;
    const ey = my;
    const textAnchor = cos >= 0 ? 'start' : 'end';

    return (
        <g>
            <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill} className="text-lg font-bold">
                {payload.name}
            </text>
            <Sector
                cx={cx}
                cy={cy}
                innerRadius={innerRadius}
                outerRadius={outerRadius}
                startAngle={startAngle}
                endAngle={endAngle}
                fill={fill}
            />
            <Sector
                cx={cx}
                cy={cy}
                startAngle={startAngle}
                endAngle={endAngle}
                innerRadius={outerRadius + 6}
                outerRadius={outerRadius + 10}
                fill={fill}
            />
            <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
            <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
            <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#fff">{`${value} cases`}</text>
            <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="#999">
                {`(Rate ${(percent * 100).toFixed(2)}%)`}
            </text>
        </g>
    );
};


export function GeneticAnalysis() {
    const [selectedPatient, setSelectedPatient] = useState<GeneticPatientProfile | null>(dummyGeneticPatients[0]);
    const [activeIndex, setActiveIndex] = useState(0);

    const onPieEnter = (_: any, index: number) => {
        setActiveIndex(index);
    };

    const pieChartColors = ["hsl(var(--chart-1))", "hsl(var(--chart-2))", "hsl(var(--chart-3))", "hsl(var(--chart-4))", "hsl(var(--chart-5))"];

    return (
        <div className="space-y-6">
            <Card className="glassmorphism glowing-shadow">
                <CardHeader>
                    <CardTitle className="text-gradient-glow text-2xl">DNA Hub - Patient Overview</CardTitle>
                    <CardDescription>Select a patient to view their detailed genetic analysis.</CardDescription>
                </CardHeader>
                <CardContent className="flex gap-4">
                    {dummyGeneticPatients.map(p => (
                        <div key={p.id} onClick={() => setSelectedPatient(p)} className={cn("p-3 rounded-lg glassmorphism cursor-pointer flex items-center gap-3 transition-all", selectedPatient?.id === p.id && "border-primary shadow-primary/30 shadow-lg")}>
                            <Image src={`https://i.pravatar.cc/150?u=${p.id}`} alt={p.name} width={40} height={40} className="rounded-full" />
                            <div>
                                <p className="font-bold text-white">{p.name}</p>
                                <p className="text-xs text-muted-foreground">ID: {p.id}</p>
                            </div>
                        </div>
                    ))}
                </CardContent>
            </Card>

            {selectedPatient && (
                <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 animate-fade-in-up">
                    <div className="xl:col-span-1 h-[600px]">
                        <Card className="glassmorphism glowing-shadow w-full h-full">
                           <CardHeader>
                               <CardTitle className="text-gradient-glow text-xl">3D DNA Visualization</CardTitle>
                           </CardHeader>
                           <CardContent>
                                <Canvas camera={{ position: [0, 2.5, 10], fov: 50 }}>
                                    <ambientLight intensity={1.5} />
                                    <pointLight position={[10, 10, 10]} intensity={2} color="hsl(var(--primary))" />
                                     <pointLight position={[-10, -10, -10]} intensity={1} color="hsl(var(--secondary))" />
                                    <Suspense fallback={null}>
                                        <DNA interactive={true} />
                                    </Suspense>
                                </Canvas>
                           </CardContent>
                        </Card>
                    </div>
                    <div className="xl:col-span-2 space-y-6">
                        <Card className="glassmorphism glowing-shadow">
                            <CardHeader>
                                <CardTitle className="text-gradient-glow flex items-center gap-2"><Info /> Patient Details</CardTitle>
                            </CardHeader>
                            <CardContent className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                <div><p className="text-sm text-muted-foreground">Name</p><p className="font-bold text-white">{selectedPatient.name}</p></div>
                                <div><p className="text-sm text-muted-foreground">Age</p><p className="font-bold text-white">{selectedPatient.age}</p></div>
                                <div><p className="text-sm text-muted-foreground">Genetic Risk</p><p className="font-bold text-destructive">{selectedPatient.geneticRiskScore}%</p></div>
                                <div><p className="text-sm text-muted-foreground">Disorder</p><p className="font-bold text-white">{selectedPatient.geneticDisorder}</p></div>
                                <div className="col-span-full"><p className="text-sm text-muted-foreground">Medical History</p><p className="text-white text-sm">{selectedPatient.medicalHistory}</p></div>
                            </CardContent>
                        </Card>

                        <Card className="glassmorphism glowing-shadow">
                             <CardHeader>
                                <CardTitle className="text-gradient-glow flex items-center gap-2"><FlaskConical /> AI-Suggested Treatment</CardTitle>
                            </CardHeader>
                             <CardContent>
                                <p className="text-muted-foreground">{selectedPatient.aiTreatmentSuggestion}</p>
                            </CardContent>
                        </Card>

                        <Card className="glassmorphism glowing-shadow">
                             <CardHeader>
                                <CardTitle className="text-gradient-glow flex items-center gap-2"><Stethoscope /> Next Steps</CardTitle>
                            </CardHeader>
                             <CardContent className="flex gap-4">
                                <Button className="glowing-shadow-interactive">Order Full Genetic Panel</Button>
                                <Button variant="outline">Schedule Genetic Counseling</Button>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            )}
            {selectedPatient && (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <ChartCard title="Gene Mutation Levels" icon={BarChart}>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={selectedPatient.charts.mutationLevels}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border) / 0.5)" />
                                <XAxis dataKey="gene" tickLine={false} axisLine={false} stroke="hsl(var(--foreground))" fontSize={12} />
                                <YAxis tickLine={false} axisLine={false} stroke="hsl(var(--foreground))" fontSize={12} />
                                <Tooltip content={<ChartTooltipContent indicator="dot" />} cursor={{ fill: 'hsl(var(--primary)/0.1)' }} wrapperStyle={{ backgroundColor: 'hsl(var(--background)/0.8)', backdropFilter: 'blur(5px)', border: '1px solid hsl(var(--border))', borderRadius: 'var(--radius)' }} />
                                <Bar dataKey="level" fill="url(#mutationBar)" radius={[4, 4, 0, 0]} />
                                <defs>
                                    <linearGradient id="mutationBar" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.8} />
                                        <stop offset="95%" stopColor="hsl(var(--accent))" stopOpacity={0.4} />
                                    </linearGradient>
                                </defs>
                            </BarChart>
                        </ResponsiveContainer>
                    </ChartCard>
                    <ChartCard title="Risk Progression Over Time" icon={LineChart}>
                        <ResponsiveContainer width="100%" height={300}>
                            <RechartsLine data={selectedPatient.charts.riskProgression}>
                                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                                <XAxis dataKey="year" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} domain={[0, 'dataMax + 10']} />
                                <Tooltip content={<ChartTooltipContent indicator="dot" />} cursor={{ stroke: "hsl(var(--primary))", strokeWidth: 1.5, strokeDasharray: "3 3" }} wrapperStyle={{ backgroundColor: 'hsl(var(--background)/0.8)', backdropFilter: 'blur(5px)', border: '1px solid hsl(var(--border))', borderRadius: 'var(--radius)' }} />
                                <RechartsLine type="monotone" dataKey="risk" stroke="hsl(var(--secondary))" strokeWidth={2.5} dot={{ r: 4 }} activeDot={{ r: 8, className: 'glowing-shadow' }} />
                            </RechartsLine>
                        </ResponsiveContainer>
                    </ChartCard>
                    <ChartCard title="Disease Distribution" icon={PieChart}>
                        <ResponsiveContainer width="100%" height={300}>
                             <Pie data={selectedPatient.charts.diseaseDistribution} cx="50%" cy="50%" labelLine={false} activeIndex={activeIndex} activeShape={renderActiveShape} onMouseEnter={onPieEnter} innerRadius={60} outerRadius={80} dataKey="value">
                                {selectedPatient.charts.diseaseDistribution.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={pieChartColors[index % pieChartColors.length]} />
                                ))}
                            </Pie>
                        </ResponsiveContainer>
                    </ChartCard>
                </div>
            )}
        </div>
    );
};

const ChartCard = ({ title, icon: Icon, children }: { title: string, icon: React.ElementType, children: React.ReactNode }) => (
    <Card className="glassmorphism glowing-shadow">
        <CardHeader>
            <CardTitle className="text-gradient-glow flex items-center gap-2"><Icon />{title}</CardTitle>
        </CardHeader>
        <CardContent>
            {children}
        </CardContent>
    </Card>
);
