
"use client";

import React, { useState, useMemo, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from '@/components/ui/badge';
import { dummyStrokePatients, StrokePatient } from '@/lib/dummy-data';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Zap, Activity, Heart, Brain, Shield, Info, X, Search, Bot, FileText, User, BarChart, GitBranch, Pill, Hospital, BrainCircuit, Siren, Droplet, Wind, Thermometer, ExternalLink } from 'lucide-react';
import { LineChart, ResponsiveContainer, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { Alert, AlertTitle } from '@/components/ui/alert';
import Link from 'next/link';

const ChartTooltipContent = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="p-2 glassmorphism text-sm">
          <p className="label text-white">{`Time: +${label} hrs`}</p>
          <p className="text-primary">{`Risk: ${payload[0].value}%`}</p>
        </div>
      );
    }
    return null;
};

const getRiskColor = (risk: number) => {
    if (risk > 75) return 'hsl(var(--destructive))';
    if (risk > 40) return 'hsl(var(--primary))';
    return 'hsl(var(--secondary))';
};

const riskBadgeClass = (risk: number) => {
    if (risk > 75) return 'bg-destructive text-destructive-foreground animate-pulse';
    if (risk > 40) return 'bg-yellow-500/80 text-yellow-900';
    return 'bg-green-500/80 text-green-900';
}

export function StrokePredictionHub() {
    const [selectedPatientId, setSelectedPatientId] = useState(dummyStrokePatients[0].id);
    
    const selectedPatient = useMemo(() => {
        return dummyStrokePatients.find(p => p.id === selectedPatientId) as StrokePatient;
    }, [selectedPatientId]);
    
    const [currentTime, setCurrentTime] = useState(new Date());
     useEffect(() => {
        const timer = setInterval(() => setCurrentTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    if (!selectedPatient) {
        return <p>Loading patient data...</p>;
    }

    return (
        <div className="space-y-6">
            <Card className="glassmorphism glowing-shadow">
                <CardHeader>
                    <div className="flex justify-between items-center">
                         <div>
                            <CardTitle className="text-gradient-glow text-2xl flex items-center gap-2"><BrainCircuit/>ASI Stroke Prediction Hub</CardTitle>
                            <CardDescription>Real-time stroke prediction up to 6 hours in advance.</CardDescription>
                        </div>
                        <div className="flex items-center gap-4">
                            <Button asChild>
                               <Link href="https://stick-luxury-44942713.figma.site" target="_blank" rel="noopener noreferrer">
                                    <ExternalLink className="mr-2 h-4 w-4" />
                                    Stroke View
                                </Link>
                            </Button>
                            <div className="w-64">
                                 <Select value={selectedPatientId} onValueChange={setSelectedPatientId}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select Patient..." />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {dummyStrokePatients.map(p => (
                                            <SelectItem key={p.id} value={p.id}>
                                                {p.name} ({p.id}) - {p.surgery}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </div>
                </CardHeader>
            </Card>

            <AnimatePresence mode="wait">
                <motion.div
                    key={selectedPatientId}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <div className="lg:col-span-2 space-y-6">
                            <LiveMonitoringPanel patient={selectedPatient} currentTime={currentTime} />
                            <PredictionDashboard patient={selectedPatient} />
                        </div>
                        <div className="space-y-6">
                            <AiInsightsPanel patient={selectedPatient} />
                        </div>
                    </div>
                </motion.div>
            </AnimatePresence>
        </div>
    );
}


const LiveMonitoringPanel = ({ patient, currentTime }: { patient: StrokePatient, currentTime: Date }) => {
    const riskColor = getRiskColor(patient.prediction.chance);

    return (
        <Card className="glassmorphism glowing-shadow">
            <CardHeader>
                <div className="flex justify-between items-center">
                    <CardTitle className="text-white">Live Vitals: {patient.name}</CardTitle>
                     <Badge className={riskBadgeClass(patient.prediction.chance)}>
                        {patient.prediction.chance > 75 ? 'Critical' : patient.prediction.chance > 40 ? 'Warning' : 'Safe'}
                    </Badge>
                </div>
                <CardDescription>{currentTime.toLocaleTimeString()}</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center mb-6">
                    <VitalStat icon={Heart} label="Heart Rate" value={patient.vitals.heartRate} unit="bpm" />
                    <VitalStat icon={Droplet} label="Blood Pressure" value={patient.vitals.bp} unit="mmHg" />
                    <VitalStat icon={Wind} label="SpO2" value={patient.vitals.oxygen} unit="%" />
                    <VitalStat icon={Brain} label="Brain Activity" value="Normal" />
                </div>
                 <div className="text-center p-4 rounded-lg" style={{ border: `2px solid ${riskColor}`, boxShadow: `0 0 20px ${riskColor}`}}>
                    <p className="text-sm text-muted-foreground">AI Stroke Prediction (Next 6 Hours)</p>
                    <p className="text-6xl font-bold" style={{ color: riskColor }}>{patient.prediction.chance}%</p>
                </div>
                {patient.prediction.chance > 75 && (
                    <Alert variant="destructive" className="mt-4 animate-pulse">
                        <Siren className="h-4 w-4" />
                        <AlertTitle>Critical Alert!</AlertTitle>
                        <p>Immediate intervention required. Surgery team has been notified.</p>
                    </Alert>
                )}
            </CardContent>
        </Card>
    );
};

const VitalStat = ({ icon: Icon, label, value, unit='' }) => (
    <div className="glassmorphism p-3 rounded-lg">
        <Icon className="w-6 h-6 text-primary mx-auto mb-1"/>
        <p className="text-sm text-muted-foreground">{label}</p>
        <p className="text-lg font-bold text-white">{value} <span className="text-xs">{unit}</span></p>
    </div>
)

const PredictionDashboard = ({ patient }: { patient: StrokePatient }) => (
    <Card className="glassmorphism glowing-shadow">
        <CardHeader>
            <CardTitle className="text-white">6-Hour Stroke Risk Timeline</CardTitle>
        </CardHeader>
        <CardContent className="h-64">
            <ResponsiveContainer width="100%" height="100%">
                 <LineChart data={patient.graphs.riskCurve}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border) / 0.5)" />
                    <XAxis dataKey="hour" type="number" domain={[0,6]} ticks={[0,1,2,3,4,5,6]} unit="hr" stroke="hsl(var(--muted-foreground))" />
                    <YAxis domain={[0, 100]} unit="%" stroke="hsl(var(--muted-foreground))" />
                    <Tooltip content={<ChartTooltipContent />} wrapperStyle={{ backgroundColor: 'hsl(var(--background)/0.8)', backdropFilter: 'blur(5px)', border: '1px solid hsl(var(--border))', borderRadius: 'var(--radius)'}}/>
                    <defs>
                        <linearGradient id="riskGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor={getRiskColor(patient.prediction.chance)} stopOpacity={0.8}/>
                            <stop offset="95%" stopColor={getRiskColor(patient.prediction.chance)} stopOpacity={0}/>
                        </linearGradient>
                    </defs>
                    <Line type="monotone" dataKey="risk" stroke={getRiskColor(patient.prediction.chance)} strokeWidth={3} dot={false} activeDot={{ r: 8 }}/>
                </LineChart>
            </ResponsiveContainer>
        </CardContent>
    </Card>
);

const AiInsightsPanel = ({ patient }: { patient: StrokePatient }) => (
    <Card className="glassmorphism glowing-shadow h-full">
        <CardHeader>
            <CardTitle className="text-gradient-glow flex items-center gap-2"><Bot/>ASI Insights &amp; Actions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
            <InsightSection title="Risk Explanation" content={patient.prediction.explanation} icon={FileText} />
            <InsightSection title="Recommended Action" content={patient.prediction.suggestion} icon={Zap} />

             {patient.prediction.chance > 75 && (
                <div className="p-4 rounded-lg bg-destructive/20 border border-destructive/50">
                    <h4 className="font-semibold text-destructive flex items-center gap-2"><Siren/>Emergency Protocol</h4>
                    <ul className="list-disc list-inside text-sm text-destructive-foreground space-y-1">
                        <li>Administer IV anticoagulants immediately.</li>
                        <li>Prepare patient for emergency CT scan.</li>
                        <li>Notify on-call neurologist and surgery team.</li>
                        <li>Transfer to ICU for continuous monitoring.</li>
                    </ul>
                </div>
            )}

            <div className="pt-4 border-t border-border/50">
                <Button className="w-full glowing-shadow-interactive">
                    <Search className="mr-2"/> Research Similar Cases
                </Button>
            </div>
        </CardContent>
    </Card>
);

const InsightSection = ({ title, content, icon: Icon }: { title: string, content: string, icon: React.ElementType }) => (
    <div>
        <h4 className="font-semibold text-white flex items-center gap-2 mb-1"><Icon className="w-4 h-4 text-primary"/>{title}</h4>
        <p className="text-sm text-muted-foreground pl-6">{content}</p>
    </div>
);
