
"use client";

import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { 
    AlertTriangle, 
    Droplets, 
    BedDouble, 
    Trash2, 
    ChefHat, 
    User, 
    Siren,
    Play,
    Pause,
    Bot,
    Volume2,
    VolumeX,
    UserPlus,
    X,
    Check
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { dummyTriagePatients, TriagePatient } from '@/lib/dummy-data';

// --- Main Component ---
export function EmergencyResourceStatus({ hospitalData }) {
    const { facilities, beds: bedData } = hospitalData.hospitalInfo;
    const mountRef = useRef<HTMLDivElement>(null);
    const [infoBox, setInfoBox] = useState<{ visible: boolean, content: string, x: number, y: number }>({ visible: false, content: '', x: 0, y: 0 });
    const [isTriageModalOpen, setIsTriageModalOpen] = useState(false);
    const [log, setLog] = useState<string[]>(['[System] AI Monitoring Initialized.']);
    const [alerts, setAlerts] = useState<any[]>([]);
    const [isAiActive, setIsAiActive] = useState(true);
    const [resources, setResources] = useState({
        oxygen: 85,
        beds: bedData,
    });
    const [aiConfidence, setAiConfidence] = useState(95);
    const [isSoundOn, setIsSoundOn] = useState(true);
    const [isDemoRunning, setIsDemoRunning] = useState(false);
    const [triageList, setTriageList] = useState<TriagePatient[]>(dummyTriagePatients);
    
    const [currentTime, setCurrentTime] = useState(new Date());

    const speak = useCallback((text: string) => {
        if (!isSoundOn || typeof window === 'undefined' || !window.speechSynthesis) return;
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'en-US';
        utterance.rate = 1.1;
        window.speechSynthesis.speak(utterance);
    }, [isSoundOn]);

    const addLog = useCallback((message: string) => {
        setLog(prev => [`[${new Date().toLocaleTimeString()}] ${message}`, ...prev].slice(0, 50));
    }, []);

    const addAlert = useCallback((alert) => {
        if (!isAiActive) return;
        const newAlert = { id: Date.now(), ...alert };
        setAlerts(prev => [newAlert, ...prev]);
        addLog(`[AI Alert] ${alert.message}`);
        if(alert.level === 'critical') {
            const spokenMessage = alert.patient ? 
                `Critical Alert: Patient ${alert.patient} in distress at ${alert.location}.` : 
                `Critical Alert: ${alert.message}`;
            speak(spokenMessage);
        }
        setAiConfidence(prev => Math.max(70, prev - 2));
    }, [addLog, isAiActive, speak]);

    const resolveAlert = useCallback((id: number) => {
        const alert = alerts.find(a => a.id === id);
        if (alert) {
            setAlerts(prev => prev.filter(a => a.id !== id));
            addLog(`[TA Action] Resolved Alert: ${alert.message}`);
        }
    }, [alerts, addLog]);

    const assignBed = (patient: TriagePatient) => {
        let bedType: 'general' | 'icu' | 'trauma' | null = null;
        if (patient.triageLevel === 'Critical') bedType = 'icu';
        else if (patient.triageLevel === 'Moderate') bedType = 'trauma';
        else bedType = 'general';
    
        const targetWingBeds = resources.beds.filter(b => b.wing.toLowerCase() === bedType);
        const availableBed = targetWingBeds.find(b => b.status === 'available');
    
        if (availableBed) {
            setResources(prev => ({
                ...prev,
                beds: prev.beds.map(b => 
                    b.bedId === availableBed.bedId 
                        ? { ...b, status: 'occupied', patient: patient.name, triage: patient.triageLevel, occupiedSince: new Date().toISOString() }
                        : b
                )
            }));
            setTriageList(prev => prev.filter(p => p.patientId !== patient.patientId));
            addLog(`[Bed Mgmt] Assigned ${patient.name} to ${bedType.toUpperCase()} bed ${availableBed.bedId}.`);
        } else {
             addLog(`[Bed Mgmt] No ${bedType} beds available for ${patient.name}.`);
        }
    };


    useEffect(() => {
        const clockInterval = setInterval(() => setCurrentTime(new Date()), 1000);
        
        const resourceInterval = setInterval(() => {
            if (!isAiActive) return;
            setResources(prev => {
                const newOxygen = Math.max(60, prev.oxygen - 0.1);
                 if (newOxygen < 70 && !alerts.some(a => a.type === 'oxygen')) {
                    addAlert({ type: 'oxygen', message: `Oxygen level critical at ${newOxygen.toFixed(1)}%`, level: 'critical', icon: Droplets });
                }
                return {
                    ...prev,
                    oxygen: newOxygen,
                };
            });
            setAiConfidence(prev => Math.min(100, prev + 0.1));
        }, 5000);

        return () => {
            clearInterval(clockInterval);
            clearInterval(resourceInterval);
        };
    }, [isAiActive, alerts, addAlert]);
    
    const handleTriggerDemo = () => {
        setIsDemoRunning(true);
        addLog("[Demo] Starting scripted sequence...");
        
        const icuBed = resources.beds.find(b => b.wing === 'ICU' && b.status === 'occupied');
        const alertMessage = icuBed ? 
            `Patient ${icuBed.patient} in distress in ${icuBed.wing} Bed ${icuBed.bedId}` :
            "Patient distress in ICU";
        
        setTimeout(() => addAlert({ type: 'patient', message: alertMessage, location: icuBed?.bedId || 'ICU', patient: icuBed?.patient, level: 'critical', icon: User }), 2000);

        setTimeout(() => setResources(prev => ({...prev, oxygen: 68})), 5000);
        
        setTimeout(() => {
            setAlerts([]);
            setResources(prev => ({...prev, oxygen: 95}));
            addLog("[Demo] Sequence complete. Systems returning to normal.");
            setIsDemoRunning(false);
        }, 12000);
    };

    const globalStatus = useMemo(() => {
        if (alerts.some(a => a.level === 'critical')) return { text: 'Critical', color: 'bg-red-500' };
        if (alerts.length > 0) return { text: 'Attention', color: 'bg-yellow-500' };
        return { text: 'Normal', color: 'bg-green-500' };
    }, [alerts]);

    return (
        <div className="flex flex-col h-[calc(100vh-10rem)] bg-background text-white font-sans">
            {/* Header */}
            <header className="flex items-center justify-between p-3 border-b border-border/50 bg-background/50">
                <div className="flex items-center gap-3">
                    <h1 className="text-xl font-bold text-gradient-glow">SmartCare AI</h1>
                    <Badge className={cn("flex items-center gap-1", globalStatus.color)}>
                        <span className="w-2 h-2 rounded-full bg-white animate-pulse"></span>
                        {globalStatus.text}
                    </Badge>
                </div>
                <h2 className="hidden md:block text-lg font-semibold text-muted-foreground">Hospital Command Center – {hospitalData.hospitalInfo.name}</h2>
                <div className="flex items-center gap-4">
                    <span className="font-mono text-lg">{currentTime.toLocaleTimeString()}</span>
                    <Button variant="ghost" size="icon" onClick={() => setIsSoundOn(!isSoundOn)}>{isSoundOn ? <Volume2 /> : <VolumeX />}</Button>
                    <Badge variant="outline">Logged in as: TA-007</Badge>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-grow grid grid-cols-1 lg:grid-cols-3 gap-4 p-4 overflow-y-auto">
                <div className="space-y-4">
                    <ResourceCard icon={Droplets} title="Oxygen Supply (ICU)" value={`${resources.oxygen.toFixed(1)}%`} progress={resources.oxygen} />
                    <TriagePanel patients={triageList} onAssign={assignBed} />
                </div>
                <div className="lg:col-span-2">
                    <Facility3DView resources={resources} infoBox={infoBox} setInfoBox={setInfoBox} />
                </div>
            </main>

            {/* Footer */}
            <footer className="flex items-center justify-between p-2 text-xs text-muted-foreground border-t border-border/50">
                <div className="flex items-center gap-4">
                    <span>AI Status: <span className={cn(isAiActive ? 'text-green-400' : 'text-red-400')}>{isAiActive ? 'Operational' : 'Paused'}</span></span>
                     <span>AI Confidence: <span className="text-white font-bold">{aiConfidence.toFixed(1)}%</span></span>
                </div>
                 <div className="flex items-center gap-2">
                    <Button variant="secondary" size="sm" onClick={handleTriggerDemo} disabled={isDemoRunning}>{isDemoRunning ? "Demo Running..." : "Run Demo"}</Button>
                    <Button variant={isAiActive ? "destructive" : "default"} size="sm" onClick={() => setIsAiActive(!isAiActive)}>
                        {isAiActive ? <Pause className="mr-2"/> : <Play className="mr-2"/>} {isAiActive ? 'Pause AI' : 'Resume AI'}
                    </Button>
                </div>
            </footer>
        </div>
    );
}

// --- Sub-components ---

const ResourceCard = ({ icon: Icon, title, value, subtext, progress, valueColor }) => (
    <Card className="glassmorphism">
        <CardContent className="p-4">
            <div className="flex items-center gap-4">
                <Icon className="w-8 h-8 text-primary" />
                <div className="flex-grow">
                    <p className="text-muted-foreground">{title}</p>
                    <p className={cn("text-2xl font-bold text-white", valueColor)}>{value}</p>
                    {subtext && <p className="text-xs text-muted-foreground">{subtext}</p>}
                </div>
            </div>
            {progress !== undefined && <Progress value={progress} className="mt-2 h-2" />}
        </CardContent>
    </Card>
);

const TriagePatientCard = ({ patient, onAssign }) => {
    const levelColors = {
        Critical: 'border-destructive text-destructive',
        Moderate: 'border-yellow-400 text-yellow-400',
        Minor: 'border-green-400 text-green-400',
    };
    return (
        <div className={cn("p-2 rounded-lg border-l-4 flex justify-between items-center bg-background/30", levelColors[patient.triageLevel])}>
            <div>
                <p className="font-bold text-white">{patient.name}, {patient.age}</p>
                <p className="text-xs text-muted-foreground">{patient.symptoms}</p>
            </div>
            <Button size="sm" variant="outline" onClick={() => onAssign(patient)}>Assign Bed</Button>
        </div>
    );
};

const TriagePanel = ({ patients, onAssign }) => (
    <Card className="glassmorphism">
        <CardHeader className="p-3">
            <CardTitle className="text-base text-white flex items-center gap-2"><UserPlus /> Triage Queue ({patients.length})</CardTitle>
        </CardHeader>
        <CardContent className="p-3 pt-0 max-h-96 overflow-y-auto space-y-2">
             {patients.length === 0 ? <p className="text-sm text-center text-muted-foreground py-4">No patients in triage.</p> :
                patients.map(p => <TriagePatientCard key={p.patientId} patient={p} onAssign={onAssign} />)
            }
        </CardContent>
    </Card>
);


const Facility3DView = ({ resources, infoBox, setInfoBox }) => {
    const wings = {
        general: { rows: 5, cols: 10, position: { x: -150, z: -100 }, label: 'General Ward' },
        icu: { rows: 2, cols: 5, position: { x: 50, z: -100 }, label: 'ICU' },
        trauma: { rows: 2, cols: 5, position: { x: 50, z: 20 }, label: 'Trauma Center' },
        surgery: { rows: 1, cols: 2, position: { x: -150, z: 20}, label: 'Operating Rooms'}
    };

    const handleBedClick = (bed) => {
        setInfoBox(prev => ({
            ...prev,
            visible: true,
            content: `${bed.wing} Bed ${bed.bedId} - ${bed.status === 'occupied' ? `Occupied by ${bed.patient}` : 'Available'}`,
        }));
    };
    
     const handleMouseMove = (e: React.MouseEvent) => {
        if(infoBox.visible) {
            setInfoBox(prev => ({ ...prev, x: e.clientX, y: e.clientY }));
        }
    };


    return (
         <Card className="glassmorphism h-full p-4 perspective-1000" onMouseMove={handleMouseMove} onMouseLeave={() => setInfoBox(prev => ({ ...prev, visible: false }))}>
            <CardTitle className="text-gradient-glow">Live Facility View</CardTitle>
             {infoBox.visible && (
                <div className="absolute z-20 p-2 text-xs rounded-md pointer-events-none bg-background/80 border border-border" style={{ left: infoBox.x + 15, top: infoBox.y }}>
                    {infoBox.content}
                </div>
            )}
            <div className="w-full h-full transform-style-3d flex items-center justify-center" style={{ transform: 'rotateX(60deg) scale(1.2)'}}>
                <div className="w-[400px] h-[300px] relative border-2 border-dashed border-primary/20 bg-background/20 rounded-lg p-4">
                     {Object.entries(wings).map(([wingKey, layout]) => {
                         const wingBeds = resources.beds.filter(b => b.wing.toLowerCase() === wingKey);
                         return (
                            <div key={wingKey} className="absolute" style={{ top: `${50 + layout.position.z / 4}%`, left: `${50 + layout.position.x / 4}%` }}>
                                <p className="text-xs text-muted-foreground absolute -top-4">{layout.label}</p>
                                <div className="grid gap-1" style={{ gridTemplateColumns: `repeat(${layout.cols}, 1fr)` }}>
                                    {wingBeds.map((bed, i) => {
                                        let color = 'bg-green-500/50';
                                        if (bed.status === 'occupied') {
                                            if (bed.triage === 'Critical') color = 'bg-red-500/50';
                                            else if (bed.triage === 'Moderate') color = 'bg-yellow-500/50';
                                            else color = 'bg-blue-500/50';
                                        } else if (bed.status === 'in-use') {
                                            color = 'bg-purple-500/50 animate-pulse';
                                        }
                                        return (
                                            <div 
                                                key={bed.bedId} 
                                                className={cn("w-3 h-4 rounded-sm cursor-pointer hover:scale-150 transition-transform", color)}
                                                onClick={() => handleBedClick(bed)}
                                            />
                                        );
                                    })}
                                </div>
                            </div>
                        )
                     })}
                </div>
            </div>
        </Card>
    );
};
