
"use client";

import * as React from 'react';
import { useState } from 'react';
import dynamic from 'next/dynamic';
import { dummyOrganStatus } from '@/lib/dummy-data';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BrainCircuit, Heart, Activity } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from '@/lib/utils';

const OrganViewer = dynamic(() => import('./organ-viewer').then(mod => mod.OrganViewer), {
    ssr: false,
    loading: () => <div className="w-full h-full flex items-center justify-center glassmorphism"><p className="text-lg text-gradient-glow animate-pulse">Loading 3D Viewer...</p></div>
});

const organModels = {
    Heart: { icon: Heart },
    Brain: { icon: BrainCircuit },
    Lungs: { icon: Activity },
    Liver: { icon: Activity },
    Kidneys: { icon: Activity },
};

export function OrganVisualization() {
    const [selectedPatientId, setSelectedPatientId] = useState(dummyOrganStatus[0].patientId);
    const [selectedOrgan, setSelectedOrgan] = useState('Heart');

    const patientData = dummyOrganStatus.find(p => p.patientId === selectedPatientId);
    const organData = patientData?.organs.find(o => o.name === selectedOrgan);

    const OrganIcon = organModels[selectedOrgan as keyof typeof organModels]?.icon || Activity;

    const getStatusColor = (status?: string) => {
        switch (status) {
            case 'Normal': return 'text-green-400';
            case 'Fatty Liver':
            case 'Mild Infection': return 'text-yellow-400';
            case 'Tumor Detected': return 'text-destructive';
            default: return 'text-white';
        }
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[80vh]">
            <div className="lg:col-span-2 h-full">
                <Card className="glassmorphism glowing-shadow h-full">
                    <CardHeader>
                        <CardTitle className="text-gradient-glow">3D Organ Viewer</CardTitle>
                    </CardHeader>
                    <CardContent className="h-[90%]">
                        <OrganViewer organName={selectedOrgan} annotations={organData?.annotations || []} />
                    </CardContent>
                </Card>
            </div>
            <div className="lg:col-span-1 space-y-6 h-full">
                <Card className="glassmorphism glowing-shadow">
                    <CardHeader>
                        <CardTitle className="text-gradient-glow text-lg">Controls</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <Select onValueChange={setSelectedPatientId} value={selectedPatientId}>
                            <SelectTrigger><SelectValue placeholder="Select Patient..." /></SelectTrigger>
                            <SelectContent>
                                {dummyOrganStatus.map(p => <SelectItem key={p.patientId} value={p.patientId}>{p.patientId}</SelectItem>)}
                            </SelectContent>
                        </Select>
                        <div className="grid grid-cols-3 gap-2">
                            {Object.keys(organModels).map(organName => (
                                <Button key={organName} variant={selectedOrgan === organName ? 'default' : 'outline'} onClick={() => setSelectedOrgan(organName)} className="flex-col h-16">
                                    {React.createElement(organModels[organName as keyof typeof organModels].icon, { className: "w-6 h-6" })}
                                    <span className="text-xs">{organName}</span>
                                </Button>
                            ))}
                        </div>
                    </CardContent>
                </Card>
                 <Card className="glassmorphism glowing-shadow">
                    <CardHeader>
                        <CardTitle className="text-gradient-glow text-lg flex items-center gap-2">
                           <OrganIcon /> {selectedOrgan} Status
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        <p className="flex justify-between">Status: <span className={cn("font-bold", getStatusColor(organData?.status))}>{organData?.status}</span></p>
                        <p className="text-sm text-muted-foreground">{organData?.details}</p>
                         {organData?.annotations && organData.annotations.length > 0 && (
                            <div>
                                <h4 className="font-semibold text-white mt-4">Annotations:</h4>
                                <ul className="list-disc list-inside text-muted-foreground text-sm space-y-1 mt-2">
                                     {organData.annotations.map((anno, i) => <li key={i}>{anno.text}</li>)}
                                </ul>
                            </div>
                         )}
                    </CardContent>
                 </Card>
            </div>
        </div>
    );
}
