
"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Fuel, Droplets, ShieldCheck, Wrench } from "lucide-react";

export function VehicleStatus({ ambulance }) {
    return (
        <Card className="glassmorphism glowing-shadow">
            <CardHeader>
                <CardTitle className="text-white">Vehicle Readiness</CardTitle>
                <CardDescription>Live status of vehicle systems.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <StatusItem 
                    icon={Fuel} 
                    label="Fuel Level" 
                    value={ambulance.fuelLevel}
                    unit="%"
                />
                <StatusItem 
                    icon={Droplets} 
                    label="Oxygen Level" 
                    value={ambulance.oxygenLevel}
                    unit="%"
                />
                <StatusItem 
                    icon={ShieldCheck} 
                    label="Medical Kit" 
                    value={ambulance.facilities.emergencyKit ? 'Stocked' : 'Needs Refill'}
                    isBadge
                    isOk={ambulance.facilities.emergencyKit}
                />
                <StatusItem 
                    icon={Wrench} 
                    label="Engine Status" 
                    value="Healthy"
                    isBadge
                    isOk
                />
            </CardContent>
        </Card>
    );
}

const StatusItem = ({ icon: Icon, label, value, unit = '', isBadge = false, isOk = true }) => (
    <div>
        <div className="flex justify-between items-center mb-1">
            <p className="text-sm font-medium text-muted-foreground flex items-center gap-2"><Icon className="w-5 h-5"/>{label}</p>
            {isBadge ? (
                <Badge variant={isOk ? 'default' : 'destructive'}>{value}</Badge>
            ) : (
                <p className="font-semibold text-white">{value}{unit}</p>
            )}
        </div>
        {!isBadge && <Progress value={typeof value === 'number' ? value : 0} />}
    </div>
);
