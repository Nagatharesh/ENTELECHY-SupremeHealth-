"use client";

import { Doctor, doctorDashboardData } from "@/lib/dummy-data";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Award, Briefcase, Star, TrendingUp, UserCheck, BarChart, Users, CheckCircle, User as UserIcon } from "lucide-react";
import Image from "next/image";
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart";
import { BarChart as RechartsBarChart, Bar as RechartsBar, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid, PieChart, Pie, Cell, Legend } from 'recharts';

export function DoctorProfile({ doctor }: { doctor: Doctor }) {

    const { overview, dailyActivity, feedback, mentalState } = doctorDashboardData;

    const pieData = [
        { name: 'Online', value: overview.onlineBookings, fill: 'hsl(var(--chart-1))' },
        { name: 'Offline', value: overview.offlineBookings, fill: 'hsl(var(--chart-2))' },
    ];
    
    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
                <InfoCard icon={Users} label="Total Patients" value={overview.totalPatients} />
                <InfoCard icon={CheckCircle} label="Resolved" value={overview.resolved} />
                <InfoCard icon={UserIcon} label="Waiting" value={overview.waiting} />
                <InfoCard icon={Briefcase} label="Online Bookings" value={overview.onlineBookings} />
                <InfoCard icon={Briefcase} label="Offline Bookings" value={overview.offlineBookings} />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card className="lg:col-span-2 glassmorphism glowing-shadow">
                     <CardHeader>
                        <CardTitle className="text-gradient-glow flex items-center gap-2"><BarChart/>Activity Overview (Today)</CardTitle>
                    </CardHeader>
                    <CardContent className="h-[300px]">
                         <ChartContainer config={{}} className="w-full h-full">
                            <ResponsiveContainer>
                                <RechartsBarChart data={dailyActivity} margin={{ left: -20 }}>
                                    <XAxis dataKey="hour" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false}/>
                                    <YAxis hide/>
                                    <Tooltip
                                        content={<ChartTooltipContent indicator="dot" />}
                                        cursor={{ fill: 'hsl(var(--primary)/0.1)' }}
                                        wrapperStyle={{ backgroundColor: 'hsl(var(--background)/0.8)', backdropFilter: 'blur(5px)', border: '1px solid hsl(var(--border))', borderRadius: 'var(--radius)'}}
                                    />
                                    <RechartsBar dataKey="patientsSeen" fill="hsl(var(--chart-1))" radius={[4, 4, 0, 0]} name="Patients Seen" />
                                    <RechartsBar dataKey="resolved" fill="hsl(var(--chart-2))" radius={[4, 4, 0, 0]} name="Resolved" />
                                </RechartsBarChart>
                            </ResponsiveContainer>
                        </ChartContainer>
                    </CardContent>
                </Card>
                <Card className="glassmorphism glowing-shadow">
                     <CardHeader>
                        <CardTitle className="text-gradient-glow flex items-center gap-2"><Users/>Patient Feedback</CardTitle>
                    </CardHeader>
                     <CardContent className="h-[300px]">
                         <ChartContainer config={{}} className="w-full h-full">
                            <ResponsiveContainer>
                                <RechartsBarChart data={feedback} layout="vertical">
                                     <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="hsl(var(--border) / 0.5)"/>
                                    <YAxis type="category" dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false}/>
                                    <XAxis type="number" hide/>
                                    <Tooltip
                                        content={<ChartTooltipContent indicator="dot" />}
                                        cursor={{ fill: 'hsl(var(--primary)/0.1)' }}
                                        wrapperStyle={{ backgroundColor: 'hsl(var(--background)/0.8)', backdropFilter: 'blur(5px)', border: '1px solid hsl(var(--border))', borderRadius: 'var(--radius)'}}
                                    />
                                    <RechartsBar dataKey="value" fill="url(#feedbackBar)" radius={[0, 4, 4, 0]} />
                                     <defs>
                                        <linearGradient id="feedbackBar" x1="0" y1="0" x2="1" y2="0">
                                            <stop offset="5%" stopColor="hsl(var(--chart-4))" stopOpacity={0.8}/>
                                            <stop offset="95%" stopColor="hsl(var(--accent))" stopOpacity={0.4}/>
                                        </linearGradient>
                                    </defs>
                                </RechartsBarChart>
                            </ResponsiveContainer>
                        </ChartContainer>
                    </CardContent>
                </Card>
            </div>
             <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                 <Card className="glassmorphism glowing-shadow">
                    <CardHeader>
                        <CardTitle className="text-gradient-glow flex items-center gap-2"><BarChart/>Booking Mode</CardTitle>
                    </CardHeader>
                    <CardContent className="h-[250px]">
                        <ChartContainer config={{}} className="w-full h-full">
                             <ResponsiveContainer>
                                <PieChart>
                                    <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                                        {pieData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.fill} />
                                        ))}
                                    </Pie>
                                    <Tooltip content={<ChartTooltipContent />} />
                                    <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle" className="text-2xl font-bold fill-white">
                                        {overview.totalPatients}
                                    </text>
                                    <text x="50%" y="60%" textAnchor="middle" dominantBaseline="middle" className="text-sm fill-muted-foreground">
                                        Total
                                    </text>
                                </PieChart>
                            </ResponsiveContainer>
                        </ChartContainer>
                    </CardContent>
                </Card>
                 <Card className="lg:col-span-2 glassmorphism glowing-shadow">
                    <CardHeader>
                        <CardTitle className="text-gradient-glow flex items-center gap-2"><TrendingUp/>Doctor's Workload &amp; Mental State</CardTitle>
                    </CardHeader>
                    <CardContent className="h-[250px]">
                        <ChartContainer config={{}} className="w-full h-full">
                            <ResponsiveContainer>
                                <RechartsBarChart data={mentalState}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border) / 0.5)"/>
                                    <XAxis dataKey="day" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false}/>
                                    <YAxis yAxisId="left" orientation="left" dataKey="patientsSeen" stroke="hsl(var(--chart-1))" hide/>
                                    <YAxis yAxisId="right" orientation="right" dataKey="stressLevel" stroke="hsl(var(--chart-5))" hide/>
                                    <Tooltip
                                        content={<ChartTooltipContent indicator="dot" />}
                                        cursor={{ fill: 'hsl(var(--primary)/0.1)' }}
                                        wrapperStyle={{ backgroundColor: 'hsl(var(--background)/0.8)', backdropFilter: 'blur(5px)', border: '1px solid hsl(var(--border))', borderRadius: 'var(--radius)'}}
                                    />
                                    <Legend />
                                    <RechartsBar yAxisId="left" dataKey="patientsSeen" name="Patients" fill="hsl(var(--chart-1))" radius={4}/>
                                    <RechartsBar yAxisId="left" dataKey="resolved" name="Resolved" fill="hsl(var(--chart-2))" radius={4}/>
                                    <RechartsBar yAxisId="right" dataKey="stressLevel" name="Stress Level" fill="hsl(var(--chart-5))" radius={4}/>
                                </RechartsBarChart>
                            </ResponsiveContainer>
                        </ChartContainer>
                    </CardContent>
                 </Card>
            </div>
        </div>
    );
}

const InfoCard = ({ icon: Icon, label, value }: { icon: React.ElementType, label: string, value: string | number }) => (
    <div className="flex items-center gap-4 p-4 rounded-lg glassmorphism transition-transform hover:scale-105 hover:shadow-primary/30">
        <div className="p-3 bg-primary/10 rounded-full border border-primary/20">
            <Icon className="w-8 h-8 text-primary" />
        </div>
        <div>
            <p className="text-sm text-muted-foreground">{label}</p>
            <p className="text-2xl font-bold text-white">{value}</p>
        </div>
    </div>
);
