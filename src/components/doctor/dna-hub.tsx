
"use client";

import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { dummyDnaPatients, DnaPatient } from '@/lib/dummy-data';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { Zap, Activity, Heart, Brain, Shield, Info, X } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { ResearchPanel } from './research-panel';
import { BarChart, LineChart, PieChart, ResponsiveContainer, Bar, Line, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

export function DnaHub() {
    const [selectedPatient, setSelectedPatient] = useState<DnaPatient | null>(null);

    const dnaImage = PlaceHolderImages.find(p => p.id === 'dna-strand');

    const handleSelectPatient = (patient: DnaPatient) => {
        setSelectedPatient(patient);
    };

    const handleClosePanel = () => {
        setSelectedPatient(null);
    };

    return (
        <div className="space-y-6">
            <Card className="glassmorphism glowing-shadow">
                <CardHeader>
                    <CardTitle className="text-gradient-glow text-2xl">DNA Sub-Hub</CardTitle>
                    <CardDescription>Select a patient's DNA to analyze their genetic profile and AI-powered insights.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 text-center">
                        {dummyDnaPatients.map((patient) => (
                            <motion.div
                                key={patient.id}
                                className="cursor-pointer group"
                                whileHover={{ scale: 1.05, y: -10 }}
                                transition={{ type: "spring", stiffness: 300 }}
                                onClick={() => handleSelectPatient(patient)}
                            >
                                {dnaImage && <Image
                                    src={dnaImage.imageUrl}
                                    alt="DNA Strand"
                                    width={200}
                                    height={300}
                                    className="rounded-lg object-cover mx-auto glowing-shadow group-hover:shadow-primary/50 transition-shadow duration-300"
                                    data-ai-hint={dnaImage.imageHint}
                                />}
                                <p className="mt-4 font-semibold text-white group-hover:text-primary transition-colors">{patient.name}</p>
                                <p className="text-sm text-muted-foreground">{patient.condition}</p>
                            </motion.div>
                        ))}
                    </div>
                </CardContent>
            </Card>

            <AnimatePresence>
                {selectedPatient && (
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 50 }}
                        className="fixed inset-0 z-50 bg-background/90 backdrop-blur-lg overflow-y-auto"
                    >
                        <div className="container mx-auto p-4 md:p-8">
                            <PatientDetailPanel patient={selectedPatient} onClose={handleClosePanel} />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

const PatientDetailPanel = ({ patient, onClose }: { patient: DnaPatient, onClose: () => void }) => {
    const dnaImage = PlaceHolderImages.find(p => p.id === 'dna-strand');

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <h2 className="text-3xl font-bold text-gradient-glow">{patient.name}'s Genetic Profile</h2>
                <Button variant="ghost" size="icon" onClick={onClose}><X className="h-8 w-8" /></Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-1 flex flex-col items-center">
                     {dnaImage && <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                    >
                        <Image
                            src={dnaImage.imageUrl}
                            alt="DNA Strand"
                            width={300}
                            height={450}
                            className="rounded-lg object-cover glowing-shadow shadow-primary/40"
                            data-ai-hint={dnaImage.imageHint}
                        />
                    </motion.div>}
                    <Card className="glassmorphism w-full mt-8">
                        <CardHeader>
                            <CardTitle>Patient Overview</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2 text-sm">
                            <p><strong>ID:</strong> {patient.id}</p>
                            <p><strong>Age:</strong> {patient.age}</p>
                            <p><strong>Gender:</strong> {patient.gender}</p>
                            <p><strong>Condition:</strong> <Badge variant="destructive">{patient.condition}</Badge></p>
                        </CardContent>
                    </Card>
                </div>

                <div className="lg:col-span-2 space-y-6">
                    <AnalyticsCard title="Genetic Risk Analysis" icon={Shield}>
                        <p><strong>Family History:</strong> {patient.geneticRisk.familyHistory.join(', ')}</p>
                        <div className="mt-2">
                            <strong>Genetic Markers:</strong>
                            <div className="flex gap-4 mt-1">
                                {patient.geneticRisk.markers.map(marker => (
                                    <Badge key={marker.gene} variant={marker.risk === 'High' ? 'destructive' : 'secondary'}>{marker.gene} ({marker.risk})</Badge>
                                ))}
                            </div>
                        </div>
                    </AnalyticsCard>

                    <AnalyticsCard title="Medication Analysis" icon={Zap}>
                        <p><strong>Current:</strong> {patient.medication.current}</p>
                        <p className="text-primary mt-2"><strong>AI Suggestion:</strong> {patient.medication.aiSuggestion}</p>
                    </AnalyticsCard>

                    <AnalyticsCard title="Advanced Predictions" icon={Brain}>
                        <p><strong>Predicted Future Diseases:</strong> {patient.advanced.predictedDiseases.join(', ')}</p>
                        <p className="mt-2"><strong>Recommended Preventive Measures:</strong> {patient.advanced.preventiveMeasures.join(', ')}</p>
                    </AnalyticsCard>

                    <AnalyticsCard title="Data Visualizations" icon={Activity}>
                        <div className="h-64">
                            <ResponsiveContainer width="100%" height="100%">
                                {patient.graphs.riskProgression ? (
                                     <LineChart data={patient.graphs.riskProgression}>
                                        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border) / 0.5)"/>
                                        <XAxis dataKey="year" stroke="hsl(var(--muted-foreground))"/>
                                        <YAxis stroke="hsl(var(--muted-foreground))"/>
                                        <Tooltip content={<ChartTooltipContent />} wrapperStyle={{ backgroundColor: 'hsl(var(--background)/0.8)', backdropFilter: 'blur(5px)', border: '1px solid hsl(var(--border))', borderRadius: 'var(--radius)'}}/>
                                        <Legend />
                                        <Line type="monotone" dataKey="risk" stroke="hsl(var(--primary))" strokeWidth={2} activeDot={{ r: 8 }} />
                                    </LineChart>
                                ) : (
                                     <BarChart data={patient.graphs.diseaseDistribution}>
                                        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border) / 0.5)"/>
                                        <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" />
                                        <YAxis stroke="hsl(var(--muted-foreground))"/>
                                        <Tooltip content={<ChartTooltipContent />} wrapperStyle={{ backgroundColor: 'hsl(var(--background)/0.8)', backdropFilter: 'blur(5px)', border: '1px solid hsl(var(--border))', borderRadius: 'var(--radius)'}}/>
                                        <Legend />
                                        <Bar dataKey="value" fill="hsl(var(--primary))" />
                                    </BarChart>
                                )}
                            </ResponsiveContainer>
                        </div>
                    </AnalyticsCard>

                    <ResearchPanel patient={patient} />
                </div>
            </div>
        </div>
    );
};

const AnalyticsCard = ({ title, icon: Icon, children }: { title: string, icon: React.ElementType, children: React.ReactNode }) => (
    <Card className="glassmorphism">
        <CardHeader className="flex flex-row items-center gap-4">
            <Icon className="w-8 h-8 text-primary" />
            <CardTitle className="text-gradient-glow text-xl">{title}</CardTitle>
        </CardHeader>
        <CardContent>
            {children}
        </CardContent>
    </Card>
);

const ChartTooltipContent = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="p-2 glassmorphism text-sm">
          <p className="label text-white">{`${label} : ${payload[0].value}`}</p>
        </div>
      );
    }
  
    return null;
  };
