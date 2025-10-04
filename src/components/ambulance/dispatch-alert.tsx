
"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { User, MapPin, Clock, Siren, Check, X } from "lucide-react";

export function DispatchAlert({ dispatch, onAccept }) {
    if (!dispatch) {
        return (
            <Card className="glassmorphism h-full flex flex-col items-center justify-center text-center glowing-shadow">
                <CardHeader>
                    <CardTitle className="text-gradient-glow text-2xl">Awaiting Dispatch</CardTitle>
                    <CardDescription>No active dispatches. Your status is "Available".</CardDescription>
                </CardHeader>
                <CardContent>
                    <Siren className="w-24 h-24 text-primary animate-pulse" />
                </CardContent>
            </Card>
        );
    }

    return (
        <Card className="glassmorphism glowing-shadow border-primary shadow-primary/30 animate-pulse">
            <CardHeader>
                <CardTitle className="text-primary text-3xl flex items-center gap-3"><Siren/> New Emergency Dispatch!</CardTitle>
                <CardDescription>A new dispatch request requires your attention.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <InfoRow icon={User} label="Patient" value={`${dispatch.patientName}, ${dispatch.patientAge} ${dispatch.patientGender}`} />
                <InfoRow icon={MapPin} label="Pickup Location" value={dispatch.pickupLocation} />
                <InfoRow icon={Clock} label="ETA to Patient" value={`~${dispatch.etaToPatient} mins`} />
                <p className="text-sm text-muted-foreground p-3 bg-background/50 rounded-lg">
                    <span className="font-bold text-white">Dispatch Notes:</span> {dispatch.notes}
                </p>
            </CardContent>
            <CardFooter className="flex gap-4">
                <Button variant="destructive" className="flex-1"><X className="mr-2"/>Decline</Button>
                <Button className="flex-1 glowing-shadow-interactive" onClick={() => onAccept(dispatch.id)}><Check className="mr-2"/>Accept Dispatch</Button>
            </CardFooter>
        </Card>
    );
}

const InfoRow = ({ icon: Icon, label, value }) => (
    <div className="flex items-start gap-4">
        <Icon className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
        <div>
            <p className="text-sm text-muted-foreground">{label}</p>
            <p className="font-semibold text-white text-lg">{value}</p>
        </div>
    </div>
);
