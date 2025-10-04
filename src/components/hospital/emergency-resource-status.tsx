
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
    Video, 
    Focus, 
    AlertTriangle, 
    ChevronRight, 
    Droplets, 
    BedDouble, 
    Trash2, 
    ChefHat, 
    User, 
    Siren,
    Cpu,
    CheckCircle,
    XCircle,
    Play,
    Pause,
    Bot,
    Volume2,
    VolumeX,
    Image as ImageIcon
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import Image from 'next/image';

// --- Main Component ---
export function EmergencyResourceStatus({ hospitalData }) {
    const { toast } = useToast();
    const [log, setLog] = useState<string[]>(['[System] AI Monitoring Initialized.']);
    const [alerts, setAlerts] = useState<any[]>([]);
    const [isAiActive, setIsAiActive] = useState(true);
    const [resources, setResources] = useState({
        oxygen: 85,
        beds: { total: 100, available: 12 },
        food: { served: 85, total: 100, aiStatus: '✅ Staff wearing masks' },
        waste: 'Medium'
    });
    const [aiConfidence, setAiConfidence] = useState(95);
    const [isSoundOn, setIsSoundOn] = useState(true);
    const [isDemoRunning, setIsDemoRunning] = useState(false);
    
    const [currentTime, setCurrentTime] = useState(new Date());

    const addLog = useCallback((message: string) => {
        setLog(prev => [`[${new Date().toLocaleTimeString()}] ${message}`, ...prev].slice(0, 50));
    }, []);

    const addAlert = useCallback((alert) => {
        if (!isAiActive) return;
        const newAlert = { id: Date.now(), ...alert };
        setAlerts(prev => [newAlert, ...prev]);
        addLog(`[AI Alert] ${alert.message}`);
        if(isSoundOn) {
           // In a real app, you'd play a sound here.
           console.log("Beep!");
        }
        setAiConfidence(prev => Math.max(70, prev - 2));
    }, [addLog, isAiActive, isSoundOn]);

    const resolveAlert = useCallback((id: number) => {
        const alert = alerts.find(a => a.id === id);
        if (alert) {
            setAlerts(prev => prev.filter(a => a.id !== id));
            addLog(`[TA Action] Resolved Alert: ${alert.message}`);
        }
    }, [alerts, addLog]);


    useEffect(() => {
        const clockInterval = setInterval(() => setCurrentTime(new Date()), 1000);
        
        const resourceInterval = setInterval(() => {
            if (!isAiActive) return;
            setResources(prev => {
                const newOxygen = Math.max(60, prev.oxygen - 0.1);
                const newBeds = prev.beds.available < 5 ? prev.beds.available + 1 : prev.beds.available;
                 if (newOxygen < 70 && !alerts.some(a => a.type === 'oxygen')) {
                    addAlert({ type: 'oxygen', message: `Oxygen level critical at ${newOxygen.toFixed(1)}%`, level: 'critical', icon: Droplets });
                }
                return {
                    ...prev,
                    oxygen: newOxygen,
                    beds: {...prev.beds, available: newBeds}
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
        
        setTimeout(() => addAlert({ type: 'patient', message: "Patient distress in ICU - CAM-01", level: 'critical', icon: User }), 2000);
        setTimeout(() => setResources(prev => ({...prev, oxygen: 68})), 5000);
        setTimeout(() => setResources(prev => ({...prev, food: {...prev.food, aiStatus: '⚠️ Glove violation detected'}})), 8000);
        
        setTimeout(() => {
            setAlerts([]);
            setResources(prev => ({...prev, oxygen: 95}));
            addLog("[Demo] Sequence complete. Systems returning to normal.");
            setIsDemoRunning(false);
        }, 12000);
    };

    const cameraFeeds = [
        { id: 'CAM-01', title: 'ICU', location: 'Room 304', image: 'https://picsum.photos/seed/cam1/600/400' },
        { id: 'CAM-02', title: 'Main Ward', location: 'Floor 2', image: 'https://picsum.photos/seed/cam2/600/400' },
        { id: 'CAM-03', title: 'Canteen', location: 'Ground Floor', image: 'https://picsum.photos/seed/cam3/600/400' },
    ];
    
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
                <CameraFeedsPanel feeds={cameraFeeds} alerts={alerts} isAiActive={isAiActive} />
                <ResourceManagementPanel resources={resources} setResources={setResources} addLog={addLog} />
                <AlertsAndLogsPanel alerts={alerts} log={log} addAlert={addAlert} resolveAlert={resolveAlert} />
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

const CameraFeedsPanel = ({ feeds, alerts, isAiActive }) => (
    <div className="space-y-4">
        {feeds.map(feed => (
            <Card key={feed.id} className="glassmorphism overflow-hidden">
                <CardHeader className="p-3">
                    <div className="flex justify-between items-center">
                        <CardTitle className="text-base text-white">{feed.title} - {feed.id}</CardTitle>
                        <Badge variant={isAiActive ? "default" : "destructive"}>{isAiActive ? 'AI Active' : 'AI Paused'}</Badge>
                    </div>
                    <CardDescription>{feed.location}</CardDescription>
                </CardHeader>
                <CardContent className="p-0 relative">
                    <Image src={feed.image} width={600} height={400} alt={feed.title} className="w-full h-auto" />
                    {alerts.some(a => a.message.includes(feed.id)) && <div className="absolute top-2 right-2 w-3 h-3 bg-red-500 rounded-full animate-ping" />}
                </CardContent>
            </Card>
        ))}
    </div>
);

const ResourceManagementPanel = ({ resources, setResources, addLog }) => {
    const bedStatusColor = resources.beds.available > 20 ? 'text-green-400' : resources.beds.available > 5 ? 'text-yellow-400' : 'text-red-400';
    
    return (
        <div className="space-y-4">
            <ResourceCard icon={Droplets} title="Oxygen Supply (ICU)" value={`${resources.oxygen.toFixed(1)}%`} progress={resources.oxygen} />
            <ResourceCard icon={BedDouble} title="Bed Availability" value={`${resources.beds.available} / ${resources.beds.total}`} progress={(resources.beds.available / resources.beds.total) * 100} valueColor={bedStatusColor} />
            <ResourceCard icon={ChefHat} title="Food Service (Canteen)" value={`${resources.food.served} / ${resources.food.total} Served`} subtext={resources.food.aiStatus} />
            <ResourceCard icon={Trash2} title="Waste Management" value={resources.waste} />
        </div>
    );
};

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
                <Button variant="ghost" size="icon"><ChevronRight /></Button>
            </div>
            {progress !== undefined && <Progress value={progress} className="mt-2 h-2" />}
        </CardContent>
    </Card>
);


const AlertsAndLogsPanel = ({ alerts, log, addAlert, resolveAlert }) => {
    
    const handleTriggerAlert = (type: string) => {
        switch(type) {
            case 'icu':
                addAlert({type: 'patient', message: 'Patient distress in ICU - CAM-01', level: 'critical', icon: User });
                break;
            case 'canteen':
                addAlert({type: 'hygiene', message: 'Hygiene protocol breach in Canteen - CAM-03', level: 'warning', icon: ChefHat });
                break;
            case 'oxygen':
                 addAlert({ type: 'oxygen', message: `Oxygen level low`, level: 'critical', icon: Droplets });
                break;
        }
    }
    
    return (
        <div className="flex flex-col gap-4 h-full">
            <Card className="glassmorphism">
                <CardHeader className="p-3">
                    <CardTitle className="text-base text-white flex items-center gap-2"><Siren className="text-red-500"/>Active Alerts ({alerts.length})</CardTitle>
                     <div className="flex gap-2 pt-2">
                        <Button size="sm" variant="outline" onClick={() => handleTriggerAlert('icu')}>Trigger ICU Alert</Button>
                        <Button size="sm" variant="outline" onClick={() => handleTriggerAlert('canteen')}>Simulate Violation</Button>
                        <Button size="sm" variant="outline" onClick={() => handleTriggerAlert('oxygen')}>Low O2 Event</Button>
                    </div>
                </CardHeader>
                <CardContent className="p-3 pt-0 max-h-48 overflow-y-auto space-y-2">
                    {alerts.length === 0 ? <p className="text-sm text-center text-muted-foreground py-4">No active alerts.</p> :
                        alerts.map(alert => <AlertCard key={alert.id} alert={alert} onResolve={resolveAlert} />)
                    }
                </CardContent>
            </Card>
            <Card className="glassmorphism flex-grow flex flex-col">
                <CardHeader className="p-3">
                    <CardTitle className="text-base text-white">System Activity Log</CardTitle>
                </CardHeader>
                <CardContent className="p-3 pt-0 flex-grow overflow-hidden">
                    <ScrollArea className="h-full">
                        <div className="space-y-1 text-xs font-mono">
                            {log.map((entry, i) => (
                                <p key={i} className="animate-fade-in-up text-muted-foreground">
                                    <span className="text-primary/70">{entry.split(']')[0]}]</span>{entry.split(']')[1]}
                                </p>
                            ))}
                        </div>
                    </ScrollArea>
                </CardContent>
            </Card>
        </div>
    );
};

const AlertCard = ({ alert, onResolve }) => {
    const alertConfig = {
        critical: { bg: 'bg-red-500/10', border: 'border-red-500/50', iconColor: 'text-red-500' },
        warning: { bg: 'bg-yellow-500/10', border: 'border-yellow-500/50', iconColor: 'text-yellow-500' },
        info: { bg: 'bg-blue-500/10', border: 'border-blue-500/50', iconColor: 'text-blue-500' }
    };
    const config = alertConfig[alert.level] || alertConfig.info;
    const Icon = alert.icon;

    return (
        <div className={cn('p-2.5 rounded-lg border flex justify-between items-center', config.bg, config.border)}>
            <div className="flex items-center gap-2">
                {Icon && <Icon className={cn('w-5 h-5', config.iconColor)} />}
                <p className="text-sm text-white">{alert.message}</p>
            </div>
            <Button size="sm" variant="ghost" onClick={() => onResolve(alert.id)}>Resolve</Button>
        </div>
    );
};
