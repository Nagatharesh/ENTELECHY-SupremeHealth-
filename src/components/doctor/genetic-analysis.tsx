
"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

const dummyPatients = [
  { name: 'Patient P-102345', geneticRisk: 65, disease: 'BRCA1 Mutation' },
  { name: 'Patient P-102346', geneticRisk: 42, disease: 'APOE ε4 Carrier' },
  { name: 'Patient P-102347', geneticRisk: 80, disease: 'High Cholesterol' },
];

export function GeneticAnalysis() {
  return (
    <div className="space-y-6">
        <Card className="glassmorphism glowing-shadow">
            <CardHeader>
                <CardTitle className="text-gradient-glow text-2xl">3D DNA Virtual Lab</CardTitle>
                <CardDescription>Live visualization of genetic markers and associated risk profiles.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="w-full h-96 flex items-center justify-center glassmorphism p-6 text-center">
                    <div>
                        <h2 className="text-white text-2xl mb-2">Genetic Analysis Hub</h2>
                        <p className="text-muted-foreground">
                            3D DNA Analysis feature is currently disabled for stability.
                        </p>
                    </div>
                </div>
            </CardContent>
        </Card>
        
        <Card className="glassmorphism glowing-shadow">
            <CardHeader>
                <CardTitle className="text-gradient-glow">Patient Genetic Risk Scores</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {dummyPatients.map((p, i) => (
                    <div
                        key={i}
                        className="glassmorphism p-4 rounded-lg glowing-shadow"
                    >
                        <h3 className="text-white mb-1 font-semibold">{p.name}</h3>
                        <p className="text-sm text-muted-foreground mb-3">{p.disease}</p>
                        <div className="bg-background/50 h-4 w-full rounded-full overflow-hidden border border-primary/20">
                            <div
                                className="h-4 rounded-full transition-all duration-1000 ease-out"
                                style={{ 
                                    width: `${p.geneticRisk}%`,
                                    background: `linear-gradient(90deg, hsl(var(--primary)) 0%, hsl(var(--accent)) 100%)`,
                                    boxShadow: `0 0 8px hsl(var(--primary))`
                                }}
                            ></div>
                        </div>
                        <p className="text-white font-bold text-lg mt-2 text-right">{p.geneticRisk}%</p>
                    </div>
                ))}
            </CardContent>
        </Card>

    </div>
  );
};
