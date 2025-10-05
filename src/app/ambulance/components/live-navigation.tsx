
"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Map, Bot, Route, AlertCircle, CheckCircle, User, Star, TrendingUp, HelpCircle, Phone, WifiOff, XCircle, Ambulance, Heart, Droplet, Wind } from "lucide-react";
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { PlaceHolderImages } from '@/lib/placeholder-images';


const PatientVitalsCard = ({ vitals }) => {
    if (!vitals) {
        return (
            <Card className="glassmorphism p-4">
                <CardHeader className="p-0 mb-4">
                    <CardTitle className="text-white text-lg">Live Patient Vitals</CardTitle>
                </CardHeader>
                <CardContent className="p-0 space-y-3">
                    <p className="text-muted-foreground text-sm">No vitals data available.</p>
                </CardContent>
            </Card>
        );
    }
    return (
        <Card className="glassmorphism p-4">
            <CardHeader className="p-0 mb-4">
                <CardTitle className="text-white text-lg">Live Patient Vitals</CardTitle>
            </CardHeader>
            <CardContent className="p-0 space-y-3">
                 <StatBar icon={Heart} label="Heart Rate" value={`${vitals.hr} bpm`} />
                 <StatBar icon={Droplet} label="Blood Pressure" value={`${vitals.bp}`} />
                 <StatBar icon={Wind} label="SpO2" value={`${vitals.spo2}%`} />
            </CardContent>
        </Card>
    );
};


const StatBar = ({ icon: Icon, label, value, isRating=false }) => (
    <div>
        <div className="flex justify-between items-center text-sm mb-1">
            <p className="text-muted-foreground flex items-center gap-2"><Icon className="w-4 h-4" />{label}</p>
            {isRating ? (
                <div className="flex items-center gap-1 font-bold text-yellow-400">
                    <Star className="w-4 h-4 fill-current"/>{value}
                </div>
            ) : (
                <p className="font-semibold text-white">{value}</p>
            )}
        </div>
    </div>
);

const DriverInfoCard = ({ driver }) => {
    if (!driver) return null;
    return (
        <Card className="glassmorphism p-4">
            <CardHeader className="p-0 mb-4 flex-row items-center justify-between">
                <CardTitle className="text-white text-lg">Driver Profile</CardTitle>
                <Button size="sm" variant="outline" asChild><a href={`tel:${driver.contact}`}><Phone/></a></Button>
            </CardHeader>
            <CardContent className="p-0 space-y-3">
                <StatBar icon={User} label="Name" value={driver.name} />
                <StatBar icon={TrendingUp} label="Experience" value={`${driver.experience} years`} />
                <StatBar icon={Ambulance} label="Completed Rides" value={driver.completedRides} />
                <StatBar icon={Star} label="Rating" value={`${driver.rating}/5`} isRating />
            </CardContent>
        </Card>
    );
};


export function LiveNavigation({ dispatch, onComplete }) {
    const [eta, setEta] = useState(dispatch.etaToPatient);
    const [progress, setProgress] = useState(0);
    const mapImage = PlaceHolderImages.find(p => p.id === 'ambulance-map-view');


    useEffect(() => {
        const totalDuration = dispatch.etaToPatient * 60; // in seconds
        let elapsedTime = 0;

        const interval = setInterval(() => {
            setEta(prev => Math.max(0, prev - (1/60)));
            
            elapsedTime++;
            const newProgress = Math.min((elapsedTime / totalDuration) * 100, 100);
            setProgress(newProgress);
            
            if(newProgress >= 100){
                clearInterval(interval);
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [dispatch.etaToPatient]);

    const formatTime = (minutes: number) => {
        const mins = Math.floor(minutes);
        const secs = Math.round((minutes - mins) * 60);
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    const pathPoints = [
        { x: 10, y: 50 },
        { x: 30, y: 50 },
        { x: 40, y: 60 },
        { x: 40, y: 80 },
        { x: 60, y: 80 },
        { x: 75, y: 70 },
        { x: 90, y: 70 },
    ];
    
    const getAmbulancePosition = (prog: number) => {
        const progressAlongPath = prog / 100 * (pathPoints.length - 1);
        const segmentIndex = Math.floor(progressAlongPath);
        const segmentProgress = progressAlongPath - segmentIndex;
        
        if(segmentIndex >= pathPoints.length - 1) return pathPoints[pathPoints.length - 1];

        const start = pathPoints[segmentIndex];
        const end = pathPoints[segmentIndex + 1];

        return {
            x: start.x + (end.x - start.x) * segmentProgress,
            y: start.y + (end.y - start.y) * segmentProgress,
        }
    }
    
    const ambulancePos = getAmbulancePosition(progress);


    return (
        <Card className="glassmorphism glowing-shadow">
            <CardHeader>
                <div className="flex justify-between items-center">
                    <CardTitle className="text-gradient-glow text-2xl">Live Navigation & Patient Monitoring</CardTitle>
                    <Button variant="outline" asChild>
                        <a href="https://class-honey-37794972.figma.site/" target="_blank" rel="noopener noreferrer">
                            <Map className="mr-2"/> View Full Map
                        </a>
                    </Button>
                </div>
                <CardDescription>Navigating to: <span className="text-white font-bold">{dispatch.destination}</span> for patient <span className="text-white font-bold">{dispatch.patientName}</span></CardDescription>
            </CardHeader>
            <CardContent>
                 <div className="relative h-96 bg-background/50 rounded-lg overflow-hidden border border-primary/20">
                    {mapImage && <Image src={mapImage.imageUrl} alt={`Map for ${dispatch.patientName}`} layout="fill" objectFit="cover" className="opacity-80" data-ai-hint={mapImage.imageHint} />}
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />

                    <div className="absolute top-4 left-4 glassmorphism p-2 rounded-lg z-10">
                        <p className="text-sm text-muted-foreground">ETA</p>
                        <p className="text-2xl font-bold text-white">{formatTime(eta)}</p>
                    </div>

                     <div className="absolute top-4 right-4 glassmorphism p-2 rounded-lg z-10 text-right">
                        <p className="text-sm text-muted-foreground">AI Suggestion</p>
                        <p className="text-md font-bold text-primary">Traffic moderate, stay on route</p>
                    </div>
                    
                    <div
                        className="absolute transition-all duration-1000 linear"
                        style={{
                            left: `${ambulancePos.x}%`,
                            top: `${ambulancePos.y}%`,
                            transform: 'translate(-50%, -50%)',
                        }}
                    >
                         <div className="relative">
                            <Ambulance className="w-8 h-8 text-white drop-shadow-lg" style={{filter: 'drop-shadow(0 0 5px hsl(var(--primary)))'}}/>
                            <div className="absolute inset-0 -m-1 rounded-full bg-primary/50 animate-ping"/>
                        </div>
                    </div>


                    <div className="absolute bottom-4 left-4 right-4 z-10">
                        <Progress value={progress} />
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
                    <DriverInfoCard driver={dispatch.driver} />
                    <PatientVitalsCard vitals={dispatch.patientVitals} />
                </div>
            </CardContent>
            <CardFooter>
                <Button className="w-full glowing-shadow-interactive" onClick={onComplete}>
                    <CheckCircle className="mr-2" /> Mark Trip as Complete
                </Button>
            </CardFooter>
        </Card>
    );
}
