"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Bed, FlaskConical, Zap, Wind, Microscope, Droplets, Sun } from "lucide-react";
import Image from "next/image";

const FacilityCard = ({ icon: Icon, title, value, total, unit, status }) => {
    const percentage = total > 0 ? (value / total) * 100 : 0;
    const indicatorColor = percentage > 75 ? 'hsl(var(--destructive))' : percentage > 50 ? 'hsl(var(--primary))' : 'hsl(var(--secondary))';
    return (
        <Card className="glassmorphism p-4">
            <div className="flex justify-between items-center mb-2">
                <div className="flex items-center gap-3">
                    <Icon className="w-6 h-6 text-primary" />
                    <CardTitle className="text-lg text-white">{title}</CardTitle>
                </div>
                {status && <Badge variant={status === 'Active' ? 'default' : 'destructive'}>{status}</Badge>}
            </div>
            <p className="text-3xl font-bold text-gradient-glow">{value}<span className="text-lg text-muted-foreground">/{total}{unit}</span></p>
            <Progress value={percentage} indicatorColor={indicatorColor} className="mt-2 h-2" />
        </Card>
    )
};

const EquipmentCard = ({ name, status, aiNote }) => (
    <div className="p-3 bg-background/50 rounded-lg flex justify-between items-center">
        <div>
            <p className="font-semibold text-white">{name}</p>
            <p className="text-xs text-muted-foreground italic">{aiNote}</p>
        </div>
        <Badge variant={status === 'Operational' ? 'default' : 'destructive'} className="capitalize">{status}</Badge>
    </div>
)

export function FacilitiesManagement({ hospitalData }) {
    const { facilities, equipment } = hospitalData;

    return (
        <div className="space-y-6">
             <Card className="glassmorphism glowing-shadow">
                <CardHeader>
                    <CardTitle className="text-gradient-glow text-2xl">Facilities & Equipment Management</CardTitle>
                    <CardDescription>Real-time overview of hospital resources and AI-driven monitoring.</CardDescription>
                </CardHeader>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <FacilityCard icon={Bed} title="General Beds" value={facilities.beds.general.occupied} total={facilities.beds.general.total} />
                <FacilityCard icon={Bed} title="ICU Beds" value={facilities.beds.icu.occupied} total={facilities.beds.icu.total} />
                <FacilityCard icon={Bed} title="OPD Slots Today" value={facilities.opdSlots.used} total={facilities.opdSlots.total} />
                <FacilityCard icon={Wind} title="Oxygen Supply" value={facilities.oxygen.levelPercentage} total={100} unit="%" status={facilities.oxygen.status} />
                <FacilityCard icon={Zap} title="Generator Backup" value={facilities.generator.fuelHoursLeft} total={facilities.generator.capacityHours} unit="hrs" status={facilities.generator.status} />
                 <FacilityCard icon={Sun} title="Solar Power" value={facilities.solar.currentProductionKw} total={facilities.solar.capacityKw} unit="kW" status={facilities.solar.status} />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                 <Card className="glassmorphism glowing-shadow">
                    <CardHeader><CardTitle className="text-white">Equipment Status</CardTitle></CardHeader>
                    <CardContent className="space-y-3">
                        {equipment.map(item => <EquipmentCard key={item.name} {...item} />)}
                    </CardContent>
                </Card>
                <Card className="glassmorphism glowing-shadow">
                    <CardHeader><CardTitle className="text-white">Hospital 3D View</CardTitle></CardHeader>
                    <CardContent>
                        <div className="aspect-video bg-black/50 rounded-lg border border-primary/20 flex items-center justify-center perspective-1000">
                             <Image src="/3d-map.png" width={500} height={300} alt="3D Hospital View" className="opacity-50 transform-style-3d -rotate-y-12" />
                             <p className="absolute text-white font-bold bg-black/50 p-2 rounded-md">3D Model Placeholder</p>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
