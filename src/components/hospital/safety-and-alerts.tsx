"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, Shield, CheckCircle, Siren, Flame } from "lucide-react";
import Image from "next/image";

const AlertCard = ({ icon: Icon, title, description, level, timestamp }) => {
    const levelConfig = {
        high: { color: "text-destructive", bg: "bg-destructive/10", border: "border-destructive/50" },
        medium: { color: "text-yellow-400", bg: "bg-yellow-400/10", border: "border-yellow-400/50" },
        low: { color: "text-blue-400", bg: "bg-blue-400/10", border: "border-blue-400/50" }
    };
    return (
        <div className={`p-4 rounded-lg flex items-start gap-4 ${levelConfig[level].bg} border ${levelConfig[level].border}`}>
            <Icon className={`w-8 h-8 ${levelConfig[level].color} flex-shrink-0 mt-1`} />
            <div>
                <p className={`font-bold ${levelConfig[level].color}`}>{title}</p>
                <p className="text-sm text-muted-foreground">{description}</p>
                <p className="text-xs text-muted-foreground/70 mt-1">{new Date(timestamp).toLocaleString()}</p>
            </div>
        </div>
    );
};

const SafetyCheckItem = ({ name, status }) => (
    <div className="flex items-center justify-between p-3 bg-background/50 rounded-lg">
        <p className="font-semibold text-white">{name}</p>
        <Badge variant={status === 'OK' ? 'default' : 'destructive'}>
            {status === 'OK' ? <CheckCircle className="w-4 h-4 mr-1" /> : <AlertTriangle className="w-4 h-4 mr-1" />}
            {status}
        </Badge>
    </div>
)

export function SafetyAndAlerts({ hospitalData }) {
    const { safety, alerts } = hospitalData;

    return (
        <div className="space-y-6">
            <Card className="glassmorphism glowing-shadow">
                <CardHeader>
                    <CardTitle className="text-gradient-glow text-2xl">Safety & Alerts Center</CardTitle>
                    <CardDescription>Monitor real-time safety status and critical hospital alerts.</CardDescription>
                </CardHeader>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="glassmorphism">
                    <CardHeader>
                        <CardTitle className="text-white flex items-center gap-2"><Shield /> Safety Systems Check</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        {safety.checks.map(check => <SafetyCheckItem key={check.name} {...check} />)}
                         <div className="pt-4">
                            <h3 className="text-lg font-semibold text-white mb-2">Fire Exit Map</h3>
                            <div className="aspect-video bg-black/50 rounded-lg border border-primary/20 flex items-center justify-center relative">
                                <Image src="/3d-map.png" layout="fill" objectFit="contain" alt="3D Fire Exit Map" className="opacity-40" />
                                 <p className="absolute text-white font-bold bg-black/50 p-2 rounded-md">3D Fire Exit Map Placeholder</p>
                                 {/* In a real app, fire exit markers would be overlaid here */}
                                <div className="absolute top-1/4 left-1/4 w-4 h-4 bg-green-500 rounded-full animate-pulse" title="Exit A"></div>
                                <div className="absolute bottom-1/4 right-1/4 w-4 h-4 bg-green-500 rounded-full animate-pulse" title="Exit B"></div>
                            </div>
                         </div>
                    </CardContent>
                </Card>
                 <Card className="glassmorphism">
                    <CardHeader>
                        <CardTitle className="text-white flex items-center gap-2"><Siren /> Live Alerts</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3 max-h-[60vh] overflow-y-auto">
                        <AlertCard icon={Flame} {...alerts.fire} />
                        <AlertCard icon={Shield} {...alerts.security} />
                        <AlertCard icon={AlertTriangle} {...alerts.facility} />
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
