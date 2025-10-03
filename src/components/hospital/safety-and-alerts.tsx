
"use client";

import { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, Shield, CheckCircle, Siren, Flame, Bot, Building, Search, Bell, Phone } from "lucide-react";
import Image from "next/image";
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { Input } from '../ui/input';

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

const AlertCard = ({ alert }) => {
    const severityConfig = {
        critical: { color: "text-destructive", bg: "bg-destructive/10", border: "border-destructive/50", icon: Siren, glow: "" },
        warning: { color: "text-yellow-400", bg: "bg-yellow-400/10", border: "border-yellow-400/50", icon: AlertTriangle, glow: "" },
        info: { color: "text-blue-400", bg: "bg-blue-400/10", border: "border-blue-400/50", icon: Shield, glow: "" }
    };
    const config = severityConfig[alert.severity] || severityConfig.info;
    const Icon = config.icon;

    return (
        <div className={`p-4 rounded-lg flex flex-col gap-3 ${config.bg} border ${config.border} ${config.glow}`}>
            <div className="flex items-start gap-3">
                <Icon className={`w-6 h-6 ${config.color} flex-shrink-0 mt-1`} />
                <div>
                    <p className={`font-bold ${config.color} capitalize`}>{alert.type} - {alert.severity}</p>
                    <p className="text-sm text-muted-foreground">{alert.message} at <span className="font-semibold text-white">{alert.location}</span></p>
                    <p className="text-xs text-muted-foreground/70 mt-1">{new Date(alert.timestamp).toLocaleString()}</p>
                </div>
            </div>
             <div className="flex gap-2 justify-end">
                <Button size="sm" variant="outline">Acknowledge</Button>
                <Button size="sm" variant="secondary" className="glowing-shadow-interactive"><Bell className="mr-2 h-4 w-4"/>Notify Team</Button>
            </div>
        </div>
    );
};

export function SafetyAndAlerts({ hospitalData }) {
    const { safety, alerts } = hospitalData;
    const [alertFilter, setAlertFilter] = useState('all');
    const [severityFilter, setSeverityFilter] = useState('all');
    
    const filteredAlerts = useMemo(() => {
        return alerts.filter(alert => {
            const typeMatch = alertFilter === 'all' || alert.type.toLowerCase() === alertFilter;
            const severityMatch = severityFilter === 'all' || alert.severity === severityFilter;
            return typeMatch && severityMatch;
        }).sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
    }, [alerts, alertFilter, severityFilter]);

    return (
        <div className="space-y-6">
            <Card className="glassmorphism glowing-shadow">
                <CardHeader>
                    <CardTitle className="text-gradient-glow text-2xl">Advanced Safety &amp; Incident Command</CardTitle>
                    <CardDescription>Real-time system monitoring, 3D visualization, and incident response center.</CardDescription>
                </CardHeader>
            </Card>

            <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 h-[75vh]">
                {/* Left Column: System Status */}
                <Card className="xl:col-span-3 glassmorphism flex flex-col">
                    <CardHeader>
                        <CardTitle className="text-white flex items-center gap-2"><Building /> System Health</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3 flex-grow">
                        <SystemStatusWidget title="Fire Alarms" status={safety.systems.fireAlarms} icon={Flame} />
                        <SystemStatusWidget title="Sprinklers" status={safety.systems.sprinklers} icon={Shield} />
                        <SystemStatusWidget title="Emergency Exits" status={safety.systems.exits} icon={CheckCircle} />
                        <SystemStatusWidget title="Oxygen Supply" status={safety.systems.oxygen} icon={Siren} />
                         <div className="pt-4 mt-4 border-t border-border/50">
                            <h3 className="font-semibold text-white mb-2">Predictive Analytics</h3>
                            <div className="text-sm text-muted-foreground space-y-2">
                                <p><Bot className="inline w-4 h-4 mr-1 text-primary"/> Generator fuel predicted to run out in 3h 25m.</p>
                                <p><Bot className="inline w-4 h-4 mr-1 text-primary"/> Smoke detector in Ward B triggered 3 times this week.</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Center Column: 3D Map */}
                <Card className="xl:col-span-6 glassmorphism flex flex-col">
                     <CardHeader>
                        <CardTitle className="text-white">3D Hospital Fire Exit Map</CardTitle>
                    </CardHeader>
                    <CardContent className="flex-grow bg-black/50 rounded-lg border border-primary/20 flex items-center justify-center relative">
                        <Image src="/3d-map.png" layout="fill" objectFit="contain" alt="3D Fire Exit Map" className="opacity-20" />
                        <p className="z-10 text-white font-bold text-2xl bg-black/50 p-4 rounded-md animate-pulse">
                            Interactive 3D Map Placeholder
                        </p>
                    </CardContent>
                </Card>

                {/* Right Column: Alerts */}
                 <Card className="xl:col-span-3 glassmorphism flex flex-col">
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
                            filteredAlerts.map(alert => <AlertCard key={alert.id} alert={alert} />)
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
                <CardContent className="flex gap-4">
                    <Button variant="destructive" className="flex-1 glowing-shadow-interactive"><Siren className="mr-2"/> Evacuate Ward B</Button>
                    <Button variant="secondary" className="flex-1"><Bell className="mr-2"/> Notify All Staff</Button>
                    <Button variant="secondary" className="flex-1"><Phone className="mr-2"/> Call Fire Dept.</Button>
                    <Button variant="outline" className="flex-1">Test Alarms</Button>
                </CardContent>
            </Card>
        </div>
    );

    