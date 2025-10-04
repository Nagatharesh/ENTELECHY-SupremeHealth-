
"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Map, Bot, Route, AlertCircle, CheckCircle, User, Star, TrendingUp, HelpCircle, Phone, WifiOff, XCircle, Car, Ambulance, Heart, Droplet, Wind } from "lucide-react";
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { PlaceHolderImages } from '@/lib/placeholder-images';


const PatientVitalsCard = ({ vitals }) => {
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


export function LiveNavigation({ dispatch, onComplete }) {
    const [eta, setEta] = useState(dispatch.etaToPatient);
    const [progress, setProgress] = useState(0);
    const mapImage = PlaceHolderImages.find(p => p.id === `map_${dispatch.patientId || 'P3001'}`);


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

    return (
        <Card className="glassmorphism glowing-shadow">
            <CardHeader>
                <CardTitle className="text-gradient-glow text-2xl">Live Navigation & Patient Monitoring</CardTitle>
                <CardDescription>Navigating to: <span className="text-white font-bold">{dispatch.destination}</span> for patient <span className="text-white font-bold">{dispatch.patientName}</span></CardDescription>
            </CardHeader>
            <CardContent>
                 <div className="relative h-96 bg-background/50 rounded-lg overflow-hidden border border-primary/20">
                    {mapImage && <Image src={mapImage.imageUrl} alt={`Map for ${dispatch.patientName}`} layout="fill" objectFit="cover" className="opacity-40" />}
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />

                    <div className="absolute top-4 left-4 glassmorphism p-2 rounded-lg z-10">
                        <p className="text-sm text-muted-foreground">ETA</p>
                        <p className="text-2xl font-bold text-white">{formatTime(eta)}</p>
                    </div>

                     <div className="absolute top-4 right-4 glassmorphism p-2 rounded-lg z-10 text-right">
                        <p className="text-sm text-muted-foreground">AI Suggestion</p>
                        <p className="text-md font-bold text-primary">Traffic moderate, stay on route</p>
                    </div>

                    <div className="absolute bottom-4 left-4 right-4 z-10">
                        <Progress value={progress} />
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
                    {dispatch.driver && (
                        <Card className="glassmorphism p-4">
                            <CardHeader className="p-0 mb-4 flex-row items-center justify-between">
                                <CardTitle className="text-white text-lg">Driver Profile</CardTitle>
                                <Button size="sm" variant="outline" asChild><a href={`tel:${dispatch.driver.contact}`}><Phone/></a></Button>
                            </CardHeader>
                            <CardContent className="p-0 space-y-3">
                                <StatBar icon={User} label="Name" value={dispatch.driver.name} />
                                <StatBar icon={TrendingUp} label="Experience" value={`${dispatch.driver.experience} years`} />
                                <StatBar icon={Car} label="Completed Rides" value={dispatch.driver.completedRides} />
                                <StatBar icon={Star} label="Rating" value={`${dispatch.driver.rating}/5`} isRating />
                            </CardContent>
                        </Card>
                    )}
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
