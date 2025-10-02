
"use client";

import * as React from 'react';
import { useState, useRef, useEffect, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF, Html } from '@react-three/drei';
import { dummyOrganStatus } from '@/lib/dummy-data';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BrainCircuit, Heart, Activity, ShieldAlert } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from '../ui/badge';
import { cn } from '@/lib/utils';


const organModels = {
    Heart: { path: '/models/heart.glb', scale: 0.05, icon: Heart },
    Brain: { path: '/models/brain.glb', scale: 0.1, icon: BrainCircuit },
    Lungs: { path: '/models/lungs.glb', scale: 0.03, icon: Activity },
    Liver: { path: '/models/liver.glb', scale: 0.02, icon: Activity },
    Kidneys: { path: '/models/kidneys.glb', scale: 0.04, icon: Activity },
};

function Model({ path, scale, annotations }) {
    const { scene } = useGLTF(path);
    const ref = useRef();

    useEffect(() => {
        scene.traverse((child) => {
            if (child.isMesh) {
                child.material.transparent = true;
                child.material.opacity = 0.6;
                child.material.metalness = 0.8;
                child.material.roughness = 0.2;
                child.material.color.set('cyan');
            }
        });
    }, [scene]);

    return (
         <primitive object={scene} scale={scale} ref={ref}>
            {annotations.map((anno, i) => (
                 <Html key={i} position={anno.position}>
                    <div className="p-2 rounded-lg glassmorphism text-white text-xs whitespace-nowrap shadow-lg border border-destructive/50">
                        {anno.text}
                    </div>
                </Html>
            ))}
        </primitive>
    );
}

useGLTF.preload(Object.values(organModels).map(m => m.path));


export function OrganVisualization() {
    const [selectedPatientId, setSelectedPatientId] = useState(dummyOrganStatus[0].patientId);
    const [selectedOrgan, setSelectedOrgan] = useState('Heart');

    const patientData = dummyOrganStatus.find(p => p.patientId === selectedPatientId);
    const organData = patientData?.organs.find(o => o.name === selectedOrgan);

    const annotations = organData?.annotations || [];

    const OrganIcon = organModels[selectedOrgan].icon;

    const getStatusColor = (status) => {
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
                        <Canvas camera={{ position: [0, 0, 2], fov: 50 }}>
                            <ambientLight intensity={1.5} />
                            <directionalLight position={[5, 5, 5]} intensity={2} />
                            <pointLight position={[-5, -5, -5]} intensity={3} color="magenta" />
                            <Suspense fallback={<Html><div className="text-white">Loading Model...</div></Html>}>
                                <Model key={selectedOrgan} path={organModels[selectedOrgan].path} scale={organModels[selectedOrgan].scale} annotations={annotations} />
                            </Suspense>
                            <OrbitControls enableZoom={true} enablePan={true} />
                        </Canvas>
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
                                    {React.createElement(organModels[organName].icon, { className: "w-6 h-6" })}
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
                         {organData?.annotations.length > 0 && (
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
