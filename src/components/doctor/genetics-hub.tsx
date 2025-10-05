
"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Dna, TestTube, BarChart, Bot } from "lucide-react";

const StatCard = ({ title, value, icon: Icon }: { title: string, value: string, icon: React.ElementType }) => (
    <Card className="glassmorphism">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
            <Icon className="w-5 h-5 text-primary" />
        </CardHeader>
        <CardContent>
            <p className="text-3xl font-bold text-gradient-glow">{value}</p>
        </CardContent>
    </Card>
);

export function GeneticsHub() {
    return (
        <div className="space-y-6">
            <Card className="glassmorphism glowing-shadow">
                <CardHeader>
                    <CardTitle className="text-gradient-glow text-2xl">Genetics Analysis Hub</CardTitle>
                    <CardDescription>AI-driven insights into patient genetic data.</CardDescription>
                </CardHeader>
            </Card>

             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard title="Samples Analyzed" value="1,204" icon={TestTube} />
                <StatCard title="High-Risk Variants" value="87" icon={Dna} />
                <StatCard title="Predictive Models" value="12" icon={Bot} />
                <StatCard title="Research Papers" value="350+" icon={BarChart} />
            </div>

            <Card className="glassmorphism">
                <CardHeader>
                    <CardTitle>Feature Coming Soon</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">The full genetics analysis and reporting module is under development. This section will soon allow for deep dives into genomic data, risk prediction, and personalized medicine recommendations.</p>
                </CardContent>
            </Card>
        </div>
    );
}
