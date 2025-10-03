"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BarChart, Users, AlertTriangle, FlaskConical, Bot } from "lucide-react";
import { LineChart as RechartsLineChart, BarChart as RechartsBarChart, ResponsiveContainer, Line, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart";

const StatCard = ({ icon: Icon, title, value, description }) => (
    <Card className="glassmorphism transform transition-transform hover:-translate-y-2">
        <CardHeader className="flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
            <Icon className="w-5 h-5 text-primary" />
        </CardHeader>
        <CardContent>
            <p className="text-3xl font-bold text-gradient-glow">{value}</p>
            <p className="text-xs text-muted-foreground">{description}</p>
        </CardContent>
    </Card>
);

export function HospitalOverview({ hospitalData }) {
    const { hospitalInfo, analytics, aiInsights } = hospitalData;

    const patientLoadData = analytics.patientLoadHistory.map(d => ({ name: d.month, patients: d.count }));
    const revenueData = analytics.revenue.map(d => ({ name: d.month, revenue: d.amount / 100000 })); // in Lakhs

    return (
        <div className="space-y-6">
            <Card className="glassmorphism glowing-shadow">
                <CardHeader>
                    <CardTitle className="text-gradient-glow text-2xl">Welcome to {hospitalInfo.name} Dashboard</CardTitle>
                    <CardDescription>A real-time administrative overview of hospital operations and AI-driven insights.</CardDescription>
                </CardHeader>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard icon={Users} title="Live Patient Load" value={analytics.livePatientCount} description="Across all departments" />
                <StatCard icon={BarChart} title="Bed Occupancy" value={`${analytics.bedOccupancyRate}%`} description={`${hospitalInfo.facilities.beds.general.occupied + hospitalInfo.facilities.beds.icu.occupied} / ${hospitalInfo.facilities.beds.general.total + hospitalInfo.facilities.beds.icu.total} beds`} />
                <StatCard icon={AlertTriangle} title="Active Alerts" value={analytics.activeAlerts} description="Safety & facility alerts" />
                <StatCard icon={FlaskConical} title="Labs Processing" value={analytics.labReportsPending} description="Reports pending review" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                <Card className="lg:col-span-3 glassmorphism glowing-shadow">
                    <CardHeader>
                        <CardTitle className="text-white">Patient Load (Last 6 Months)</CardTitle>
                    </CardHeader>
                    <CardContent className="h-64">
                         <ResponsiveContainer width="100%" height="100%">
                            <RechartsBarChart data={patientLoadData}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border) / 0.5)" />
                                <XAxis dataKey="name" tickLine={false} axisLine={false} stroke="hsl(var(--foreground))" fontSize={12} />
                                <YAxis tickLine={false} axisLine={false} stroke="hsl(var(--foreground))" fontSize={12} />
                                <Tooltip content={<ChartTooltipContent />} cursor={{ fill: 'hsl(var(--primary)/0.1)' }} />
                                <Bar dataKey="patients" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                            </RechartsBarChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
                <Card className="lg:col-span-2 glassmorphism glowing-shadow">
                    <CardHeader>
                        <CardTitle className="text-white">AI Insights</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                         <InsightPill icon={Bot} text={aiInsights.predictivePatientLoad} />
                         <InsightPill icon={Bot} text={aiInsights.facilityHealthCheck} />
                         <InsightPill icon={Bot} text={aiInsights.doctorStressPrediction} />
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

const InsightPill = ({ icon: Icon, text }) => (
    <div className="flex items-start gap-3 p-3 rounded-lg bg-background/50 border border-primary/20">
        <Icon className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
        <p className="text-sm text-muted-foreground">{text}</p>
    </div>
);
