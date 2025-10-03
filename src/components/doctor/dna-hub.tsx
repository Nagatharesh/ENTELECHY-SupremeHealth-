
'use client';

import React, { useState, useMemo, Suspense } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { dummyDnaPatients, DnaPatient } from '@/lib/dummy-data';
import { ResearchPanel } from './research-panel';
import { BarChart, LineChart, PieChart, ResponsiveContainer, Bar, Line, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { Zap, Activity, Heart, Brain, Shield, Info, X } from 'lucide-react';
import dynamic from 'next/dynamic';

const DnaVisualization = dynamic(() => import('./dna-visualization').then(mod => mod.DnaVisualization), {
  ssr: false,
  loading: () => <div className="w-24 h-48 flex items-center justify-center"><p className="text-xs text-primary animate-pulse">Loading DNA...</p></div>
});


const riskColors = {
  Low: 'text-green-400',
  Moderate: 'text-yellow-400',
  High: 'text-red-400',
};

const chartColors = ['#00EFFF', '#39FF14', '#FFD700', '#FF2E92', '#9D4EDD'];

export function DnaHub() {
  const [selectedPatient, setSelectedPatient] = useState<DnaPatient | null>(null);

  const handlePatientSelect = (patient: DnaPatient) => {
    setSelectedPatient(patient);
  };

  const handleClosePanel = () => {
    setSelectedPatient(null);
  };

  return (
    <div className="space-y-6">
      <Card className="glassmorphism glowing-shadow">
        <CardHeader>
          <CardTitle className="text-gradient-glow text-3xl">DNA Command Center</CardTitle>
          <CardDescription>Select a patient's DNA to analyze their genetic makeup and predictive health insights.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative h-[400px] w-full perspective-1000">
            {dummyDnaPatients.map((patient, index) => {
              const angle = (index / dummyDnaPatients.length) * Math.PI * 2;
              const radius = 250;
              const x = Math.cos(angle) * radius;
              const z = Math.sin(angle) * radius;
              return (
                <motion.div
                  key={patient.id}
                  className="absolute"
                  style={{ top: '50%', left: '50%', x: '-50%', y: '-50%' }}
                  animate={{ 
                    transform: `translateX(${x}px) translateZ(${z}px) rotateY(${-angle}rad) rotateX(0.5rad)` 
                  }}
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                >
                  <DnaVisualization
                    onClick={() => handlePatientSelect(patient)}
                    color1={chartColors[index % chartColors.length]}
                    color2={chartColors[(index + 1) % chartColors.length]}
                  />
                </motion.div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      <AnimatePresence>
        {selectedPatient && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 bg-background/80 backdrop-blur-lg z-50 overflow-y-auto"
          >
            <div className="container mx-auto p-4 md:p-8">
              <Button onClick={handleClosePanel} variant="ghost" size="icon" className="absolute top-4 right-4 z-10"><X /></Button>
              <PatientDnaPanel patient={selectedPatient} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

const PatientDnaPanel = ({ patient }: { patient: DnaPatient }) => {
  return (
    <div className="space-y-6">
      <PatientOverviewCard patient={patient} />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <GeneticsSection patient={patient} />
          <MedicinesSection patient={patient} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ChartCard title="Genetic Risk Progression">
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={patient.graphs.riskProgression}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border) / 0.5)" />
                  <XAxis dataKey="year" stroke="hsl(var(--muted-foreground))" />
                  <YAxis stroke="hsl(var(--muted-foreground))" />
                  <Tooltip content={<CustomTooltip />} />
                  <Line type="monotone" dataKey="risk" stroke="url(#risk-gradient)" strokeWidth={3} />
                  <defs>
                    <linearGradient id="risk-gradient" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="#FF2E92" />
                      <stop offset="100%" stopColor="#FFD700" />
                    </linearGradient>
                  </defs>
                </LineChart>
              </ResponsiveContainer>
            </ChartCard>
            <ChartCard title="Disease Distribution">
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie data={patient.graphs.diseaseDistribution} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                    {patient.graphs.diseaseDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={chartColors[index % chartColors.length]} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                </PieChart>
              </ResponsiveContainer>
            </ChartCard>
          </div>
        </div>
        <div className="space-y-6">
          <AdvancedLayer patient={patient} />
          <ResearchPanel patient={patient} />
        </div>
      </div>
    </div>
  );
};

const PatientOverviewCard = ({ patient }: { patient: DnaPatient }) => (
  <Card className="glassmorphism glowing-shadow">
    <CardHeader className="flex flex-row items-center gap-6">
      <Image src={`https://i.pravatar.cc/150?u=${patient.id}`} alt={patient.name} width={100} height={100} className="rounded-full border-4 border-primary/50 glowing-shadow"/>
      <div>
        <CardTitle className="text-4xl font-bold text-gradient-glow">{patient.name}</CardTitle>
        <CardDescription className="text-lg">
          {patient.age} years old {patient.gender} &bull; Patient ID: {patient.id}
        </CardDescription>
        <Badge className="mt-2 text-base" variant="destructive">{patient.condition}</Badge>
      </div>
    </CardHeader>
  </Card>
);

const GeneticsSection = ({ patient }: { patient: DnaPatient }) => (
  <Card className="glassmorphism">
    <CardHeader>
      <CardTitle className="text-gradient-glow flex items-center gap-2"><Zap /> Genetics</CardTitle>
    </CardHeader>
    <CardContent className="space-y-4">
      <div>
        <h4 className="font-semibold text-white">Family History</h4>
        <p className="text-muted-foreground">{patient.geneticRisk.familyHistory.join(', ')}</p>
      </div>
      <div>
        <h4 className="font-semibold text-white">Genetic Risk Analysis</h4>
        <div className="flex flex-wrap gap-2 mt-2">
          {patient.geneticRisk.markers.map(marker => (
            <Badge key={marker.gene} variant="outline" className={cn("text-base border-2", riskColors[marker.risk])}>
              {marker.gene}: {marker.risk}
            </Badge>
          ))}
        </div>
      </div>
    </CardContent>
  </Card>
);

const MedicinesSection = ({ patient }: { patient: DnaPatient }) => (
  <Card className="glassmorphism">
    <CardHeader>
      <CardTitle className="text-gradient-glow flex items-center gap-2"><Activity /> Medications</CardTitle>
    </CardHeader>
    <CardContent className="space-y-4">
      <div>
        <h4 className="font-semibold text-white">Current Medication</h4>
        <p className="text-muted-foreground">{patient.medication.current}</p>
      </div>
      <div>
        <h4 className="font-semibold text-white">AI-Suggested Medication</h4>
        <p className="text-primary">{patient.medication.aiSuggestion}</p>
      </div>
    </CardContent>
  </Card>
);

const AdvancedLayer = ({ patient }: { patient: DnaPatient }) => (
  <Card className="glassmorphism">
    <CardHeader>
      <CardTitle className="text-gradient-glow flex items-center gap-2"><Shield /> Advanced Layer</CardTitle>
    </CardHeader>
    <CardContent className="space-y-4">
      <div>
        <h4 className="font-semibold text-white">AI Predicted Future Diseases</h4>
        <p className="text-muted-foreground">{patient.advanced.predictedDiseases.join(', ')}</p>
      </div>
      <div>
        <h4 className="font-semibold text-white">Preventive Measures</h4>
        <p className="text-muted-foreground">{patient.advanced.preventiveMeasures.join(', ')}</p>
      </div>
    </CardContent>
  </Card>
);


const ChartCard = ({ title, children }: { title: string, children: React.ReactNode }) => (
  <Card className="glassmorphism h-[300px]">
    <CardHeader>
      <CardTitle className="text-gradient-glow">{title}</CardTitle>
    </CardHeader>
    <CardContent>
      {children}
    </CardContent>
  </Card>
);

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="p-2 glassmorphism border-primary/50 text-white">
        <p className="label">{`${label}`}</p>
        {payload.map((pld: any, index: number) => (
          <p key={index} style={{ color: pld.fill || pld.stroke }}>{`${pld.name}: ${pld.value}`}</p>
        ))}
      </div>
    );
  }
  return null;
};
