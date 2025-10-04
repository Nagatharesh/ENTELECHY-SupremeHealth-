
      "use client";

import { useState, useMemo, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, Shield, CheckCircle, Siren, Flame, Bot, Building, Search, Bell, Phone, Droplet, Wind, Gauge, Wrench, ShieldCheck } from "lucide-react";
import Image from "next/image";
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { Input } from '../ui/input';
import { useToast } from "@/hooks/use-toast";
import { Progress } from '../ui/progress';

const SystemStatusWidget = ({ title, status, icon: Icon }) => {
    const statusConfig = {
        OK: { color: "text-green-400", bg: "bg-green-500/10", label: "OK" },
        Maintenance: { color: "text-yellow-400", bg: "bg-yellow-400/10", label: "Maint." },
        Alert: { color: "text-destructive", bg: "bg-destructive/10", label: "ALERT" },
    };
    const config = statusConfig[status] || { color: "text-gray-400", bg: "bg-gray-500/10", label: "Unknown" };

    return (
        <div className={`p-3 rounded-lg flex items-center justify-between border ${config.bg}`}>
            <div className="flex items-center gap-3">
                <Icon className={`w-6 h-6 ${config.color}`} />
                <span className="font-semibold text-white">{title}</span>
            </div>
            <Badge className={cn('text-white', config.bg, `border-${config.color.replace('text-', '')}`)}>{config.label}</Badge>
        </div>
    );
};

const AlertCard = ({ alert, onAcknowledge, isAcknowledged }) => {
    const { toast } = useToast();
    const severityConfig = {
        critical: { color: "text-destructive", bg: "bg-destructive/10", border: "border-destructive/50", icon: Siren, glow: "" },
        warning: { color: "text-yellow-400", bg: "bg-yellow-400/10", border: "border-yellow-400/50", icon: AlertTriangle, glow: "" },
        info: { color: "text-blue-400", bg: "bg-blue-400/10", border: "border-blue-400/50", icon: Shield, glow: "" }
    };
    const config = severityConfig[alert.severity] || severityConfig.info;
    const Icon = alert.type === 'Fire' ? Flame : config.icon;
    
    const handleNotify = () => {
        toast({
            title: "Team Notified",
            description: `The relevant team has been notified about the alert in ${alert.location}.`,
        });
    };

    return (
        <div className={cn(
            `p-4 rounded-lg flex flex-col gap-3 transition-all`,
            isAcknowledged ? 'bg-background/30 border-muted-foreground/30 opacity-60' : `${config.bg} border ${config.border} ${config.glow}`
        )}>
            <div className="flex items-start gap-3">
                <Icon className={`w-6 h-6 ${config.color} flex-shrink-0 mt-1`} />
                <div>
                    <p className={`font-bold ${config.color} capitalize`}>{alert.type} - {alert.severity}</p>
                    <p className="text-sm text-muted-foreground">{alert.message} at <span className="font-semibold text-white">{alert.location}</span></p>
                    <p className="text-xs text-muted-foreground/70 mt-1">{new Date(alert.timestamp).toLocaleString()}</p>
                </div>
            </div>
             <div className="flex gap-2 justify-end">
                <Button size="sm" variant="outline" onClick={() => onAcknowledge(alert.id)} disabled={isAcknowledged}>
                    {isAcknowledged ? 'Acknowledged' : 'Acknowledge'}
                </Button>
                <Button size="sm" variant="secondary" className="glowing-shadow-interactive" onClick={handleNotify}><Bell className="mr-2 h-4 w-4"/>Notify Team</Button>
            </div>
        </div>
    );
};

const OxygenPipelineWidget = () => {
    const [pressure, setPressure] = useState(98);
    const [flowRate, setFlowRate] = useState(4.2);
    const [pipeCondition, setPipeCondition] = useState(92);
    const [nextMaintenance, setNextMaintenance] = useState(18);

    useEffect(() => {
        const interval = setInterval(() => {
            setPressure(p => Math.max(90, Math.min(100, p + (Math.random() - 0.5) * 0.5)));
            setFlowRate(f => Math.max(4.0, Math.min(4.5, f + (Math.random() - 0.5) * 0.1)));
        }, 2000);
        return () => clearInterval(interval);
    }, []);
    
    const pressureStatus = pressure < 95 ? 'warning' : 'normal';
    
    return (
        <Card className="glassmorphism p-4">
            <CardTitle className="text-white flex items-center gap-2 mb-4"><Droplet/>Oxygen Infrastructure Health</CardTitle>
            <div className="space-y-4">
                <div className="relative h-20 w-full bg-background/50 rounded-lg p-2 border border-border/50 overflow-hidden">
                    <div className="absolute inset-0 bg-grid-primary/[0.1]"/>
                    <div className="absolute h-10 w-10 bg-primary/20 rounded-full top-1/2 -translate-y-1/2 -left-5 animate-pulse"/>
                    <div className="absolute h-full w-4 bg-gradient-to-r from-primary/30 to-transparent left-0 top-0"/>
                    <div className="absolute h-full w-4 bg-gradient-to-l from-primary/30 to-transparent right-0 top-0"/>

                    <div className="absolute top-2 right-4 text-right">
                        <p className="text-xs text-muted-foreground">Flow</p>
                        <p className="text-sm font-bold text-white">{flowRate.toFixed(1)} L/min</p>
                    </div>

                    <div className="absolute h-8 top-1/2 -translate-y-1/2 left-10 right-10 border-2 border-primary/30 rounded-full flex items-center p-1">
                        <div className="h-full w-full bg-primary/20 rounded-full relative overflow-hidden">
                             <div 
                                className="absolute top-0 left-0 h-full w-1/4 bg-white/50 rounded-full animate-flow"
                                style={{
                                    animation: 'flow 3s linear infinite',
                                    filter: 'blur(4px)'
                                }}
                            />
                        </div>
                    </div>

                </div>
                 <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                    <InfoBox icon={Gauge} label="Pressure" value={`${pressure.toFixed(1)} psi`} status={pressureStatus} />
                    <InfoBox icon={Shield} label="Leak Detection" value="None" status="normal" />
                    <InfoBox icon={ShieldCheck} label="Pipe Condition" value={`${pipeCondition}%`} status={pipeCondition < 90 ? 'warning' : 'normal'} />
                    <InfoBox icon={Wrench} label="Next Maint." value={`${nextMaintenance} days`} status={nextMaintenance < 10 ? 'warning' : 'normal'} />
                </div>
                 <div className="text-sm text-muted-foreground flex items-center gap-2 p-2 bg-background/30 rounded-md">
                    <Bot className="w-5 h-5 text-primary"/>
                    <span>AI predicts pipe integrity is stable. No anomalies detected in pressure-flow correlation.</span>
                </div>
            </div>
             <style jsx>{`
                @keyframes flow {
                    0% { transform: translateX(-100%); }
                    100% { transform: translateX(400%); }
                }
            `}</style>
        </Card>
    );
};

const InfoBox = ({ icon: Icon, label, value, status }) => {
    const colorClass = status === 'warning' ? 'text-yellow-400' : 'text-primary';
    return (
        <div className="glassmorphism p-3 rounded-lg">
            <Icon className={`w-6 h-6 mx-auto mb-1 ${colorClass}`} />
            <p className="text-xs text-muted-foreground">{label}</p>
            <p className="font-bold text-white">{value}</p>
        </div>
    );
};

export function SafetyAndAlerts({ hospitalData }) {
    const [alerts, setAlerts] = useState(hospitalData.alerts);
    const [systemStatus, setSystemStatus] = useState(hospitalData.safety.systems);
    const [alertFilter, setAlertFilter] = useState('all');
    const [severityFilter, setSeverityFilter] = useState('all');
    const [acknowledgedAlerts, setAcknowledgedAlerts] = useState<string[]>([]);
    const { toast } = useToast();
    
    const handleAcknowledge = (alertId: string) => {
        setAcknowledgedAlerts(prev => [...prev, alertId]);
    };

    const handleEmergencyAction = (action: string) => {
        toast({
            title: "Action Triggered",
            description: `${action} protocol has been initiated.`,
        });
    };
    
    const handleSimulateFire = () => {
        const newAlert = {
            id: `a${Date.now()}`,
            type: "Fire",
            severity: "critical",
            message: "AI detected smoke pattern in Canteen kitchen camera feed.",
            location: "Canteen Kitchen",
            timestamp: new Date().toISOString()
        };
        setAlerts(prev => [newAlert, ...prev]);
        setSystemStatus(prev => ({ ...prev, fireAlarms: 'Alert', sprinklers: 'Alert' }));
        toast({
            variant: "destructive",
            title: "🔥 Fire Alert Simulated!",
            description: "Automated response systems activated. Notifying security.",
        });
        
        // Reset after 15 seconds
        setTimeout(() => {
            setSystemStatus(hospitalData.safety.systems);
            toast({ title: 'Simulation Ended', description: 'Fire alert cleared. Systems returning to normal.'})
        }, 15000);
    };

    const filteredAlerts = useMemo(() => {
        return alerts.filter(alert => {
            const typeMatch = alertFilter === 'all' || alert.type.toLowerCase() === alertFilter.toLowerCase();
            const severityMatch = severityFilter === 'all' || alert.severity === severityFilter;
            return typeMatch && severityMatch;
        }).sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
    }, [alerts, alertFilter, severityFilter]);

    return (
        <div className="space-y-6">
            <Card className="glassmorphism glowing-shadow">
                <CardHeader>
                    <CardTitle className="text-gradient-glow text-2xl">Advanced Safety &amp; Incident Command</CardTitle>
                    <CardDescription>Real-time system monitoring and incident response center.</CardDescription>
                </CardHeader>
            </Card>

            <OxygenPipelineWidget />

            <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 h-[75vh]">
                {/* Left Column: System Status */}
                <Card className="xl:col-span-3 glassmorphism flex flex-col">
                    <CardHeader>
                        <CardTitle className="text-white flex items-center gap-2"><Building /> System Health</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3 flex-grow">
                        <SystemStatusWidget title="Fire Alarms" status={systemStatus.fireAlarms} icon={Flame} />
                        <SystemStatusWidget title="Sprinklers" status={systemStatus.sprinklers} icon={Shield} />
                        <SystemStatusWidget title="Emergency Exits" status={systemStatus.exits} icon={CheckCircle} />
                    </CardContent>
                </Card>

                {/* Right Column: Alerts - Spanning the rest of the grid */}
                 <Card className="xl:col-span-9 glassmorphism flex flex-col">
                    <CardHeader>
                        <CardTitle className="text-white flex items-center gap-2"><Siren /> Live Alerts</CardTitle>
                        <div className="flex gap-2 pt-2">
                             <Select value={alertFilter} onValueChange={setAlertFilter}>
                                <SelectTrigger className="flex-grow"><SelectValue /></SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Types</SelectItem>
                                    <SelectItem value="Fire">Fire</SelectItem>
                                    <SelectItem value="Security">Security</SelectItem>
                                    <SelectItem value="Facility">Facility</SelectItem>
                                </SelectContent>
                            </Select>
                             <Select value={severityFilter} onValueChange={setSeverityFilter}>
                                <SelectTrigger className="flex-grow"><SelectValue /></SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Severities</SelectItem>
                                    <SelectItem value="critical">Critical</SelectItem>
                                    <SelectItem value="warning">Warning</SelectItem>
                                    <SelectItem value="info">Info</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </CardHeader>
                    <CardContent className="flex-grow space-y-3 overflow-y-auto pr-2 -mr-2">
                        {filteredAlerts.length > 0 ? (
                            filteredAlerts.map(alert => <AlertCard key={alert.id} alert={alert} onAcknowledge={handleAcknowledge} isAcknowledged={acknowledgedAlerts.includes(alert.id)}/>)
                        ) : (
                            <div className="h-full flex items-center justify-center text-muted-foreground">
                                <p>No alerts match filters.</p>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
             <Card className="glassmorphism glowing-shadow">
                <CardHeader>
                    <CardTitle className="text-white">Emergency Actions</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-wrap gap-4">
                    <Button variant="destructive" className="flex-1 glowing-shadow-interactive" onClick={() => handleEmergencyAction('Evacuation for Ward B')}><Siren className="mr-2"/> Evacuate Ward B</Button>
                    <Button variant="secondary" className="flex-1" onClick={() => handleEmergencyAction('All Staff Notification')}><Bell className="mr-2"/> Notify All Staff</Button>
                    <Button variant="secondary" className="flex-1" onClick={() => handleEmergencyAction('Fire Department Call')}><Phone className="mr-2"/> Call Fire Dept.</Button>
                    <Button variant="outline" className="flex-1" onClick={() => handleEmergencyAction('Alarm Test')}>Test Alarms</Button>
                    <Button variant="destructive" className="flex-1 glowing-shadow-interactive" onClick={handleSimulateFire}><Flame className="mr-2"/>Simulate Fire</Button>
                </CardContent>
            </Card>
        </div>
    );
}

    