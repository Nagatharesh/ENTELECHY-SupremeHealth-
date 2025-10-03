
"use client";

import React, { useState, useMemo, useRef, Suspense } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { dummyGuardianRxPatients, GuardianRxPatient } from '@/lib/dummy-data';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { Zap, Activity, Heart, Brain, Shield, Info, X, Search, Bot, FileText, User, BarChart, GitBranch, Pill, Hospital, HeartPulse, Map, Battery, AlertTriangle, Phone, ChevronRight, CheckCircle, Ambulance, Bell, Send, UserCheck, PhoneCall, MessageSquare } from 'lucide-react';
import { LineChart, ResponsiveContainer, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Progress } from '../ui/progress';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Text, Float } from '@react-three/drei';
import { OrganViewer } from './organ-viewer';


const riskConfig = {
    Safe: { color: 'text-green-400', bg: 'bg-green-400/10', glow: 'shadow-green-500/40' },
    Caution: { color: 'text-yellow-400', bg: 'bg-yellow-400/10', glow: 'shadow-yellow-500/40' },
    Critical: { color: 'text-destructive', bg: 'bg-destructive/10', glow: 'shadow-destructive/40' }
};

const adherenceColors = {
    taken: 'bg-green-500',
    late: 'bg-yellow-500',
    missed: 'bg-red-500'
};

export function GuardianRxHub() {
    const [selectedPatient, setSelectedPatient] = useState<GuardianRxPatient | null>(null);

    return (
        <div className="space-y-6">
            <Card className="glassmorphism glowing-shadow">
                <CardHeader>
                    <CardTitle className="text-gradient-glow text-2xl">GuardianRx - Living Medicine Guardian</CardTitle>
                    <CardDescription>Track daily medicine adherence using futuristic AI, IoT, and 3D digital twin visualization.</CardDescription>
                </CardHeader>
                <CardContent>
                    {selectedPatient ? (
                        <AnimatePresence>
                             <motion.div
                                key={selectedPatient.id}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                            >
                                <PatientDetailView patient={selectedPatient} onBack={() => setSelectedPatient(null)} />
                            </motion.div>
                        </AnimatePresence>
                    ) : (
                         <PatientAdherenceDashboard onSelectPatient={setSelectedPatient} />
                    )}
                </CardContent>
            </Card>
        </div>
    );
}

const PatientAdherenceDashboard = ({ onSelectPatient }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 p-4">
            {dummyGuardianRxPatients.map(patient => (
                 <motion.div
                    key={patient.id}
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 300 }}
                >
                    <Card 
                        className={cn("glassmorphism p-4 text-center cursor-pointer h-full flex flex-col justify-between", riskConfig[patient.risk.level].bg, riskConfig[patient.risk.level].glow)}
                        onClick={() => onSelectPatient(patient)}
                    >
                         <div className="w-24 h-24 mx-auto my-4">
                             <Canvas>
                                <ambientLight intensity={0.5} />
                                <pointLight position={[10, 10, 10]} />
                                 <Float speed={1} rotationIntensity={1} floatIntensity={2}>
                                    <Pill3D adherence={patient.adherence} />
                                </Float>
                            </Canvas>
                         </div>
                        <div>
                            <p className="font-bold text-white text-lg">{patient.name}</p>
                            <p className="text-sm text-muted-foreground">{patient.age}, {patient.condition}</p>
                            <p className="text-xs text-muted-foreground">Last Dose: {patient.lastDose}</p>
                             <div className="mt-2">
                                <p className="text-xs text-muted-foreground">Adherence</p>
                                <p className={cn("text-2xl font-bold", riskConfig[patient.risk.level].color)}>{patient.adherence}%</p>
                            </div>
                        </div>
                    </Card>
                </motion.div>
            ))}
        </div>
    );
};

const Pill3D = ({ adherence }) => {
    const getColor = () => {
        if (adherence < 75) return '#FF4136'; // Red
        if (adherence < 90) return '#FFDC00'; // Yellow
        return '#2ECC40'; // Green
    };

    return (
        <mesh>
            <capsuleGeometry args={[0.5, 1, 4, 16]} />
            <meshStandardMaterial color={getColor()} metalness={0.6} roughness={0.2} />
        </mesh>
    );
};


const PatientDetailView = ({ patient, onBack }: { patient: GuardianRxPatient, onBack: () => void }) => {
    return (
        <div className="space-y-6">
            <Button variant="outline" onClick={onBack}>&larr; Back to Dashboard</Button>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                     <Card className={cn("glassmorphism", riskConfig[patient.risk.level].bg, riskConfig[patient.risk.level].glow)}>
                         <CardHeader>
                            <CardTitle className={cn("text-3xl font-bold", riskConfig[patient.risk.level].color)}>{patient.name}</CardTitle>
                            <CardDescription>{patient.age}, {patient.condition}</CardDescription>
                        </CardHeader>
                     </Card>
                     <Card className="glassmorphism">
                        <CardHeader><CardTitle className="text-gradient-glow">Digital Twin Health Panel</CardTitle></CardHeader>
                        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6 h-96">
                            <div className="w-full h-full">
                                <OrganViewer organName={patient.digitalTwin.organ} annotations={[]} />
                            </div>
                            <div className="space-y-4">
                                <h3 className="font-semibold text-white">Predicted Effects (Missed Dose)</h3>
                                <p className="text-muted-foreground text-sm">{patient.digitalTwin.prediction}</p>
                                <div className="space-y-2">
                                    <p>Heart Rate: <span className="font-bold text-primary">{patient.digitalTwin.vitals.hr} bpm</span></p>
                                    <p>Blood Pressure: <span className="font-bold text-primary">{patient.digitalTwin.vitals.bp}</span></p>
                                    {patient.digitalTwin.vitals.glucose && <p>Glucose: <span className="font-bold text-primary">{patient.digitalTwin.vitals.glucose} mg/dL</span></p>}
                                    {patient.digitalTwin.vitals.cholesterol && <p>Cholesterol: <span className="font-bold text-primary">{patient.digitalTwin.vitals.cholesterol} mg/dL</span></p>}
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                     <Card className="glassmorphism">
                        <CardHeader><CardTitle className="text-gradient-glow">7-Day Medicine Timeline</CardTitle></CardHeader>
                        <CardContent>
                             <div className="flex justify-between">
                                {patient.adherenceHistory.map((status, index) => (
                                    <div key={index} className="flex flex-col items-center gap-2">
                                        <div className={cn("w-10 h-10 rounded-full", adherenceColors[status])} />
                                        <p className="text-xs text-muted-foreground">Day {index + 1}</p>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                     </Card>
                </div>
                <div className="space-y-6">
                    <Card className="glassmorphism">
                        <CardHeader><CardTitle className="text-gradient-glow">Doctor Actions</CardTitle></CardHeader>
                        <CardContent className="space-y-3">
                             <Button className="w-full glowing-shadow-interactive"><MessageSquare className="mr-2"/> Send Reminder</Button>
                             <Button className="w-full glowing-shadow-interactive"><PhoneCall className="mr-2"/> Call Patient</Button>
                             <Button className="w-full glowing-shadow-interactive"><UserCheck className="mr-2"/> Notify Caregiver</Button>
                             <Button variant="outline" className="w-full">Adjust Prescription</Button>
                        </CardContent>
                    </Card>
                    <Card className="glassmorphism">
                        <CardHeader><CardTitle className="text-gradient-glow flex items-center gap-2"><Bot /> AI Insights</CardTitle></CardHeader>
                         <CardContent>
                            <Alert variant={patient.risk.level === 'Critical' ? 'destructive' : 'default'} className={cn(riskConfig[patient.risk.level].bg)}>
                                <AlertTriangle />
                                <AlertTitle>{patient.risk.level} Risk Detected</AlertTitle>
                                <AlertDescription>{patient.risk.details}</AlertDescription>
                            </Alert>
                         </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
};
