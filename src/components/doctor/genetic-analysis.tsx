
"use client";

import { useState, useRef, useEffect } from 'react';
import { dummyGeneticData } from '@/lib/dummy-data';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dna, Bot, AlertTriangle, ShieldCheck, Pill } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from '@/components/ui/badge';
import { DNA } from '@/components/icons/dna';

export function GeneticAnalysis() {
    const [selectedPatientId, setSelectedPatientId] = useState<string | null>(null);
    const [analysis, setAnalysis] = useState<any | null>(null);
    const [isAnalyzing, setIsAnalyzing] = useState(false);

    const handleAnalyze = () => {
        if (!selectedPatientId) return;
        setIsAnalyzing(true);
        setAnalysis(null);
        setTimeout(() => {
            const data = dummyGeneticData.find(d => d.patientId === selectedPatientId);
            setAnalysis(data);
            setIsAnalyzing(false);
        }, 3000);
    };

    return (
        <div className="space-y-6">
            <Card className="glassmorphism glowing-shadow">
                <CardHeader>
                    <CardTitle className="text-gradient-glow text-2xl">3D DNA Virtual Lab</CardTitle>
                    <CardDescription>Select a patient to perform AI-driven genetic analysis.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex gap-4 items-center">
                        <Select onValueChange={setSelectedPatientId} value={selectedPatientId || ''}>
                            <SelectTrigger className="w-full md:w-1/3">
                                <SelectValue placeholder="Select Patient ID..." />
                            </SelectTrigger>
                            <SelectContent>
                                {dummyGeneticData.map(p => (
                                    <SelectItem key={p.patientId} value={p.patientId}>
                                        {p.patientId} ({p.markers.map(m => m.gene).join(', ')})
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <Button onClick={handleAnalyze} disabled={!selectedPatientId || isAnalyzing} className="glowing-shadow-interactive w-48">
                            {isAnalyzing ? "Analyzing..." : "Run Analysis"}
                        </Button>
                    </div>
                </CardContent>
            </Card>

            {isAnalyzing && <AnalysisInProgress />}
            {analysis && <AnalysisResult result={analysis} />}

        </div>
    );
}

const AnalysisInProgress = () => (
    <Card className="glassmorphism glowing-shadow flex flex-col items-center justify-center p-8 space-y-4">
        <div className="w-64 h-64 relative">
           <DNA />
        </div>
        <p className="text-xl font-bold text-gradient-glow animate-pulse">AI Analyzing Genetic Markers...</p>
        <p className="text-muted-foreground">This may take a moment.</p>
    </Card>
);

const AnalysisResult = ({ result }: { result: any }) => (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-fade-in-up">
        <div className="lg:col-span-1 space-y-6">
            <Card className="glassmorphism glowing-shadow">
                <CardHeader>
                    <CardTitle className="text-gradient-glow">Genetic Markers</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    {result.markers.map((marker, index) => (
                        <MarkerCard key={index} marker={marker} />
                    ))}
                </CardContent>
            </Card>
        </div>
        <div className="lg:col-span-2 space-y-6">
             <Card className="glassmorphism glowing-shadow">
                <CardHeader>
                    <CardTitle className="text-gradient-glow flex items-center gap-2"><Bot />AI Recommendations</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <RecommendationCard icon={ShieldCheck} title="Preventive Care" content={result.recommendations.preventiveCare} />
                    <RecommendationCard icon={Pill} title="Medication" content={result.recommendations.medication} />
                </CardContent>
            </Card>
        </div>
         <div className="lg:col-span-3">
             <Card className="glassmorphism glowing-shadow">
                <CardHeader>
                    <CardTitle className="text-gradient-glow">3D Visualization</CardTitle>
                </CardHeader>
                <CardContent className="h-96 flex items-center justify-center">
                    <DNA interactive={true} />
                </CardContent>
            </Card>
        </div>
    </div>
);

const MarkerCard = ({ marker }: { marker: any }) => {
    const riskColor = {
        High: "border-destructive text-destructive",
        Medium: "border-yellow-500 text-yellow-400",
        Low: "border-green-500 text-green-400",
    };
    return (
        <div className={`p-4 rounded-lg border-l-4 glassmorphism ${riskColor[marker.riskFactor]}`}>
            <div className="flex justify-between items-center">
                <p className="font-bold text-lg text-white">{marker.gene}</p>
                <Badge variant="outline" className={riskColor[marker.riskFactor]}>{marker.riskFactor} Risk</Badge>
            </div>
            <p className="text-sm text-muted-foreground">{marker.details}</p>
        </div>
    );
};

const RecommendationCard = ({ icon: Icon, title, content }: { icon: React.ElementType, title: string, content: string}) => (
    <div className="glassmorphism p-4 rounded-lg flex items-start gap-4">
        <Icon className="w-8 h-8 text-primary flex-shrink-0 mt-1" />
        <div>
            <p className="font-semibold text-lg text-white">{title}</p>
            <p className="text-sm text-muted-foreground">{content}</p>
        </div>
    </div>
);
