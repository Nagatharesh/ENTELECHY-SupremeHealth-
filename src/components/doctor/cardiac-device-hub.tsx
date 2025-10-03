
"use client";

import React, { useState, useMemo, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { dummyCardiacPatients, CardiacPatient } from '@/lib/dummy-data';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { Zap, Activity, Heart, Brain, Shield, Info, X, Search, Bot, FileText, User, BarChart, GitBranch, Pill, Hospital, HeartPulse, Map, Battery, AlertTriangle, Phone, ChevronRight, CheckCircle, Ambulance, Bell, Send } from 'lucide-react';
import { LineChart, ResponsiveContainer, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Progress } from '../ui/progress';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { CardiacResearchAssistant } from './cardiac-research-assistant';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"


const getRiskConfig = (risk: number) => {
    if (risk > 90) return { label: 'Critical', color: 'text-destructive', bg: 'bg-destructive/10', border: 'border-destructive', shadow: 'shadow-destructive/50' };
    if (risk > 70) return { label: 'High', color: 'text-orange-400', bg: 'bg-orange-400/10', border: 'border-orange-400', shadow: 'shadow-orange-400/50' };
    if (risk > 50) return { label: 'Moderate', color: 'text-yellow-400', bg: 'bg-yellow-400/10', border: 'border-yellow-400', shadow: 'shadow-yellow-400/50' };
    return { label: 'Low', color: 'text-green-400', bg: 'bg-green-400/10', border: 'border-green-400', shadow: 'shadow-green-400/50' };
};

export function CardiacDeviceHub() {
    const [selectedPatient, setSelectedPatient] = useState<CardiacPatient | null>(null);
    const [filter, setFilter] = useState<{device: string, risk: string}>({device: 'all', risk: 'all'});

    const filteredPatients = useMemo(() => {
        return dummyCardiacPatients.filter(p => {
            const deviceMatch = filter.device === 'all' || p.device.type.toLowerCase() === filter.device.toLowerCase();
            const riskConfig = getRiskConfig(p.aiPrediction.risk);
            const riskMatch = filter.risk === 'all' || riskConfig.label.toLowerCase() === filter.risk.toLowerCase();
            return deviceMatch && riskMatch;
        })
    }, [filter]);

    if (selectedPatient) {
        return (
            <AnimatePresence>
                <motion.div
                    key={selectedPatient.patientId}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    <PatientDetailView patient={selectedPatient} onBack={() => setSelectedPatient(null)} />
                </motion.div>
            </AnimatePresence>
        );
    }

    return (
        <div className="space-y-6">
            <Card className="glassmorphism glowing-shadow">
                <CardHeader>
                    <CardTitle className="text-gradient-glow text-2xl flex items-center gap-2"><HeartPulse />Cardiac Device Watch — Predict & Protect</CardTitle>
                    <CardDescription>Continuously monitoring implanted cardiac devices to predict failure and orchestrate emergency responses.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex gap-4 mb-6">
                         <Select value={filter.device} onValueChange={(v) => setFilter(f => ({...f, device: v}))}>
                            <SelectTrigger className="w-[180px]"><SelectValue placeholder="Filter by device..." /></SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Devices</SelectItem>
                                <SelectItem value="Pacemaker">Pacemaker</SelectItem>
                                <SelectItem value="ICD">ICD</SelectItem>
                                <SelectItem value="LVAD">LVAD</SelectItem>
                            </SelectContent>
                        </Select>
                         <Select value={filter.risk} onValueChange={(v) => setFilter(f => ({...f, risk: v}))}>
                            <SelectTrigger className="w-[180px]"><SelectValue placeholder="Filter by risk..." /></SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Risk Levels</SelectItem>
                                <SelectItem value="Low">Low</SelectItem>
                                <SelectItem value="Moderate">Moderate</SelectItem>
                                <SelectItem value="High">High</SelectItem>
                                <SelectItem value="Critical">Critical</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {filteredPatients.map(patient => (
                            <PatientQuickCard key={patient.patientId} patient={patient} onSelect={() => setSelectedPatient(patient)} />
                        ))}
                    </div>
                </CardContent>
            </Card>
            <div className="text-center p-4 mt-4 glassmorphism text-sm">
                <p className="text-muted-foreground">
                    <AlertTriangle className="inline w-4 h-4 mr-2" />
                    This is a simulated AI prediction demo. Predictions in this prototype are for demonstration only — clinical decisions must be made by qualified clinicians.
                </p>
            </div>
        </div>
    );
}

const PatientQuickCard = ({ patient, onSelect }: { patient: CardiacPatient, onSelect: () => void }) => {
    const riskConfig = getRiskConfig(patient.aiPrediction.risk);
    const mapImage = PlaceHolderImages.find(p => p.id === `map_${patient.patientId}`);
    return (
        <Card className={cn("glassmorphism flex flex-col h-full transition-all duration-300 transform hover:-translate-y-1 hover:shadow-2xl", riskConfig.bg, `hover:${riskConfig.shadow}`)}>
            <CardHeader>
                <div className="flex justify-between items-start">
                    <div>
                        <CardTitle className={cn("text-xl", riskConfig.color)}>{patient.name}</CardTitle>
                        <CardDescription>{patient.device.type}</CardDescription>
                    </div>
                     <Badge className={cn('text-white', riskConfig.bg, riskConfig.border)}>{riskConfig.label}</Badge>
                </div>
            </CardHeader>
            <CardContent className="flex-grow space-y-3">
                 <div className="relative w-full h-24 rounded-md overflow-hidden border border-border/50">
                    {mapImage && <Image src={mapImage.imageUrl} alt={`Map for ${patient.name}`} layout="fill" objectFit="cover" className="opacity-50" />}
                </div>
                <div className="text-center">
                    <p className="text-sm text-muted-foreground">Predicted Failure</p>
                    <p className="text-lg font-bold text-white">{patient.aiPrediction.timeframe}</p>
                </div>
                <div>
                     <p className="text-sm text-muted-foreground text-center">Device Health</p>
                    <Progress value={100 - patient.aiPrediction.risk} className="h-2 mt-1" indicatorColor={`hsl(var(--${riskConfig.label.toLowerCase() === 'critical' ? 'destructive' : 'primary'}))`} />
                </div>
            </CardContent>
            <CardFooter>
                 <Button className="w-full glowing-shadow-interactive" onClick={onSelect}>View Details <ChevronRight /></Button>
            </CardFooter>
        </Card>
    )
}

const PatientDetailView = ({ patient, onBack }: { patient: CardiacPatient, onBack: () => void }) => {
    const riskConfig = getRiskConfig(patient.aiPrediction.risk);
    const deviceImage = PlaceHolderImages.find(p => p.id === `device_${patient.device.type.toLowerCase()}`);
    const mapImage = PlaceHolderImages.find(p => p.id === `map_${patient.patientId}`);
    
    const [showEmergencyDialog, setShowEmergencyDialog] = useState(patient.aiPrediction.risk > 90);

    const handleDispatch = () => {
        setShowEmergencyDialog(true);
    };
    
    return (
        <div className="space-y-6">
             <Button variant="outline" onClick={onBack}>&larr; Back to Patient List</Button>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                    <Card className={cn("glassmorphism", riskConfig.bg, `shadow-lg ${riskConfig.shadow}`)}>
                        <CardHeader>
                            <div className="flex justify-between items-start">
                                <div>
                                    <CardTitle className={cn("text-3xl font-bold", riskConfig.color)}>{patient.name}</CardTitle>
                                    <CardDescription>{patient.patientId} &bull; {patient.age}, {patient.gender}</CardDescription>
                                </div>
                                <div className="text-right">
                                    <p className="font-bold text-lg text-white">{patient.device.type}</p>
                                    <p className="text-xs text-muted-foreground">SN: {patient.device.serial}</p>
                                    <p className="text-xs text-muted-foreground">Implanted: {patient.device.implantedDate}</p>
                                </div>
                            </div>
                        </CardHeader>
                    </Card>

                    <div className="grid grid-cols-1 xl:grid-cols-5 gap-6">
                        <div className="xl:col-span-3 space-y-6">
                            <Card className="glassmorphism p-4">
                                <CardTitle className="text-lg text-gradient-glow mb-2">Live Vitals</CardTitle>
                                <div className="grid grid-cols-3 gap-2 text-center">
                                    <VitalsBox label="Heart Rate" value={patient.vitals.hr} unit="bpm" />
                                    <VitalsBox label="Blood Pressure" value={patient.vitals.bp} unit="" />
                                    <VitalsBox label="SpO2" value={patient.vitals.spo2} unit="%" />
                                </div>
                            </Card>
                            <Card className="glassmorphism p-4">
                                <CardTitle className="text-lg text-gradient-glow mb-2">3-Hour Risk Timeline</CardTitle>
                                <div className="h-24 w-full flex items-center">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <LineChart data={[{name: '3h', risk: 10}, {name: '2h', risk: 40}, {name: '1h', risk: 60}, {name: 'Now', risk: patient.aiPrediction.risk}]}>
                                            <YAxis domain={[0, 100]} hide />
                                            <XAxis dataKey="name" interval="preserveStartEnd" stroke="hsl(var(--muted-foreground))" />
                                            <Line type="monotone" dataKey="risk" stroke={riskConfig.color} strokeWidth={3} dot={{ r: 4, fill: riskConfig.color }} activeDot={{ r: 8 }}/>
                                        </LineChart>
                                    </ResponsiveContainer>
                                </div>
                            </Card>
                        </div>
                        <Card className="glassmorphism p-4 xl:col-span-2">
                             <CardTitle className="text-lg text-gradient-glow mb-2">Device Health</CardTitle>
                             {deviceImage && <Image src={deviceImage.imageUrl} alt={patient.device.type} width={200} height={200} className={cn("mx-auto my-4 transition-all duration-500", riskConfig.risk > 70 && 'animate-pulse')}/>}
                        </Card>
                    </div>

                    <Card className="glassmorphism p-4">
                        <CardTitle className="text-lg text-gradient-glow mb-2">AI Explanation & Action</CardTitle>
                        <Alert variant={riskConfig.risk > 90 ? 'destructive' : 'default'} className={cn(riskConfig.bg, riskConfig.border)}>
                            <Bot className={cn("h-4 w-4", riskConfig.color)} />
                            <AlertTitle className={riskConfig.color}>AI Prediction: {riskConfig.label} Risk</AlertTitle>
                            <AlertDescription>
                                <p className="font-semibold">{patient.aiPrediction.explanation}</p>
                                <p className="mt-2 text-white"><strong className="text-primary">Suggested Action:</strong> {patient.aiPrediction.suggestion}</p>
                            </AlertDescription>
                        </Alert>
                    </Card>
                     <Card className="glassmorphism p-4">
                        <CardTitle className="text-lg text-gradient-glow mb-4">Emergency Controls</CardTitle>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <Button variant="outline"><Bell className="mr-2"/>Notify Doctor</Button>
                            <Button variant="outline"><Phone className="mr-2"/>Tele-Eval</Button>
                            <Button variant="destructive" onClick={handleDispatch} className="glowing-shadow-interactive"><Ambulance className="mr-2"/>Dispatch Ambulance</Button>
                            <Button variant="secondary"><Send className="mr-2"/>Send Packet</Button>
                        </div>
                    </Card>
                </div>
                <div className="space-y-6">
                    <Card className="glassmorphism p-4">
                         <CardTitle className="text-lg text-gradient-glow mb-2">Patient Location</CardTitle>
                         {mapImage && <Image src={mapImage.imageUrl} alt={`Map for ${patient.name}`} width={400} height={300} className="rounded-md w-full" />}
                    </Card>
                    <CardiacResearchAssistant patient={patient} />
                </div>
            </div>
             <EmergencyDispatchDialog open={showEmergencyDialog} setOpen={setShowEmergencyDialog} patient={patient} />
        </div>
    )
}

const VitalsBox = ({ label, value, unit }) => (
    <div className="glassmorphism p-2 rounded-lg">
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className="text-lg font-bold text-white">{value} <span className="text-xs">{unit}</span></p>
    </div>
);

const EmergencyDispatchDialog = ({ open, setOpen, patient }: { open: boolean, setOpen: (o: boolean) => void, patient: CardiacPatient }) => {
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="glassmorphism border-destructive shadow-destructive/50">
                <DialogHeader>
                    <DialogTitle className="text-destructive text-2xl flex items-center gap-2"><AlertTriangle />Confirm Emergency Dispatch</DialogTitle>
                    <DialogDescription>
                        ASI has detected a critical failure risk. Auto-dispatching ambulance for <span className="font-bold text-white">{patient.name}</span>.
                    </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 my-4">
                    <p>An emergency packet will be sent to <span className="font-bold text-white">{patient.nearbyHospitals[0].name}</span>.</p>
                    <p className="text-sm text-muted-foreground">This action will be logged. This is a simulation.</p>
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
                    <Button variant="destructive" className="glowing-shadow-interactive" onClick={() => setOpen(false)}>Confirm Dispatch</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
