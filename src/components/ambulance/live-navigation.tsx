
"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Map, Bot, Route, AlertCircle, CheckCircle } from "lucide-react";

export function LiveNavigation({ dispatch, onComplete }) {
    return (
        <Card className="glassmorphism glowing-shadow">
            <CardHeader>
                <CardTitle className="text-gradient-glow text-2xl">Live Navigation</CardTitle>
                <CardDescription>Navigating to: <span className="text-white font-bold">{dispatch.destination}</span></CardDescription>
            </CardHeader>
            <CardContent>
                <div className="relative h-96 w-full rounded-lg overflow-hidden border border-primary/20">
                     <Image src="/3d-map.png" layout="fill" objectFit="cover" alt="3D map" className="opacity-30" />
                     <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
                     {/* Add route line simulation here */}
                </div>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <InfoBox icon={Route} label="AI Suggested Route" value="Via Main Street (Saves 3 mins)" />
                    <InfoBox icon={AlertCircle} label="Live Alert" value="Heavy traffic near City Mall" status="warning"/>
                 </div>
            </CardContent>
            <CardFooter>
                <Button className="w-full glowing-shadow-interactive" onClick={onComplete}>
                    <CheckCircle className="mr-2" /> Mark Trip as Complete
                </Button>
            </CardFooter>
        </Card>
    )
}

const InfoBox = ({ icon: Icon, label, value, status = 'normal' }) => (
    <div className={`p-4 rounded-lg flex items-start gap-3 glassmorphism ${status === 'warning' ? 'border-yellow-400' : 'border-transparent'}`}>
        <Icon className={`w-6 h-6 flex-shrink-0 mt-1 ${status === 'warning' ? 'text-yellow-400' : 'text-primary'}`} />
        <div>
            <p className="text-sm text-muted-foreground">{label}</p>
            <p className="font-semibold text-white">{value}</p>
        </div>
    </div>
);
