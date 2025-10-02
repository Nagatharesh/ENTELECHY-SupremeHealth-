
"use client";

import { useState, useMemo } from 'react';
import { dummyBloodBank, dummyHospitals } from '@/lib/dummy-data';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Droplets, Hospital, TrendingUp, AlertTriangle } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from '../ui/badge';
import { ChartContainer, ChartTooltipContent } from '@/components/ui/chart';
import { BarChart, Bar, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid, Legend, Cell } from 'recharts';

const bloodTypes = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

const getUrgencyColor = (units: number) => {
    if (units < 10) return 'bg-destructive/20 text-destructive border-destructive/30';
    if (units < 25) return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
    return 'bg-green-500/20 text-green-400 border-green-500/30';
};

export function BloodBank() {
    const [selectedHospital, setSelectedHospital] = useState('all');

    const filteredData = useMemo(() => {
        if (selectedHospital === 'all') {
            return bloodTypes.map(type => ({
                bloodType: type,
                units: dummyBloodBank.filter(b => b.bloodType === type).reduce((sum, b) => sum + b.units, 0),
                hospital: 'All Hospitals'
            }));
        }
        return dummyBloodBank.filter(b => b.hospitalId === selectedHospital);
    }, [selectedHospital]);
    
    const chartData = useMemo(() => {
        const data = filteredData.map(item => ({ name: item.bloodType, units: item.units }));
        return bloodTypes.map(type => {
            const found = data.find(d => d.name === type);
            return found || { name: type, units: 0 };
        });
    }, [filteredData]);

    const barColors = {
        low: 'hsl(var(--destructive))',
        medium: 'hsl(var(--primary))',
        high: 'hsl(var(--secondary))',
    };

    return (
        <div className="space-y-6">
            <Card className="glassmorphism glowing-shadow">
                <CardHeader>
                    <CardTitle className="text-gradient-glow text-2xl">Blood Bank Dashboard</CardTitle>
                    <CardDescription>View and manage blood stock levels across hospitals.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="mb-6">
                        <Select value={selectedHospital} onValueChange={setSelectedHospital}>
                            <SelectTrigger className="w-full md:w-1/3">
                                <SelectValue placeholder="Select a hospital..." />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Hospitals</SelectItem>
                                {dummyHospitals.map(h => <SelectItem key={h.hospitalId} value={h.hospitalId}>{h.name}</SelectItem>)}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4 mb-8">
                        {filteredData.map(blood => (
                            <div key={blood.bloodType} className={`p-4 rounded-lg text-center glassmorphism transform hover:-translate-y-2 transition-transform ${getUrgencyColor(blood.units)}`}>
                                <p className="font-bold text-2xl">{blood.bloodType}</p>
                                <p className="text-4xl font-extrabold text-white">{blood.units}</p>
                                <p className="text-xs text-muted-foreground">Units</p>
                            </div>
                        ))}
                    </div>
                    
                    <Card className="glassmorphism p-4 h-[400px]">
                        <h3 className="font-semibold text-white mb-4 flex items-center gap-2"><TrendingUp className="text-primary" />Stock Levels Overview</h3>
                        <ChartContainer config={{}} className="w-full h-full">
                             <ResponsiveContainer>
                                <BarChart data={chartData}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border) / 0.5)"/>
                                    <XAxis dataKey="name" tickLine={false} axisLine={false} stroke="hsl(var(--foreground))" fontSize={12} />
                                    <YAxis tickLine={false} axisLine={false} stroke="hsl(var(--foreground))" fontSize={12} />
                                    <Tooltip
                                        content={<ChartTooltipContent indicator="dot" />}
                                        cursor={{ fill: 'hsl(var(--primary)/0.1)' }}
                                        wrapperStyle={{ backgroundColor: 'hsl(var(--background)/0.8)', backdropFilter: 'blur(5px)', border: '1px solid hsl(var(--border))', borderRadius: 'var(--radius)'}}
                                    />
                                    <Bar dataKey="units" radius={[4, 4, 0, 0]}>
                                        {chartData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.units < 10 ? barColors.low : entry.units < 25 ? barColors.medium : barColors.high} />
                                        ))}
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        </ChartContainer>
                    </Card>
                </CardContent>
            </Card>
        </div>
    );
}
