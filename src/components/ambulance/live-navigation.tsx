
"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Map, Bot, Route, AlertCircle, CheckCircle, User, Star, TrendingUp, HelpCircle, Phone, WifiOff, XCircle } from "lucide-react";
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { Ambulance } from 'lucide-react';


const DriverInfoCard = ({ driver }) => (
    <Card className="glassmorphism p-4">
        <CardHeader className="p-0 mb-4 flex-row items-center justify-between">
            <CardTitle className="text-white text-lg">Driver Profile</CardTitle>
            <Button size="sm" variant="outline" asChild><a href={`tel:${driver.contact}`}><Phone/></a></Button>
        </CardHeader>
        <CardContent className="p-0 space-y-3">
            <StatBar icon={User} label="Name" value={driver.name} />
            <StatBar icon={TrendingUp} label="Experience" value={`${driver.experience} years`} />
            <StatBar icon={Car} label="Completed Rides" value={driver.completedRides} />
            <StatBar icon={Star} label="Rating" value={`${driver.rating}/5`} isRating />
        </CardContent>
    </Card>
);

const FacilityStatusCard = ({ ambulance, oxygenLevel }) => (
    <Card className="glassmorphism p-4">
        <CardHeader className="p-0 mb-4">
            <CardTitle className="text-white text-lg">Ambulance Status</CardTitle>
        </CardHeader>
        <CardContent className="p-0 space-y-3">
            <ProgressBar label="Oxygen Level" value={oxygenLevel} unit="%" color="hsl(var(--secondary))" />
            <FacilityItem label="Ventilator" available={ambulance.facilities.ventilator} />
            <FacilityItem label="Emergency Kit" available={ambulance.facilities.emergencyKit} />
        </CardContent>
    </Card>
);

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

const ProgressBar = ({ label, value, unit, color }) => (
    <div>
        <div className="flex justify-between items-center text-sm mb-1">
            <p className="text-muted-foreground">{label}</p>
            <p className="font-semibold text-white">{Math.round(value)}{unit}</p>
        </div>
        <Progress value={value} indicatorColor={color} />
    </div>
);

const FacilityItem = ({ label, available }) => (
    <div className="flex justify-between items-center text-sm">
        <p className="text-muted-foreground flex items-center gap-2"><HelpCircle className="w-4 h-4"/>{label}</p>
        <Badge variant={available ? "default" : "destructive"} className="bg-opacity-70">
            {available ? "Available" : "Unavailable"}
        </Badge>
    </div>
);


export function LiveNavigation({ dispatch, onComplete }) {
    const [eta, setEta] = useState(dispatch.etaToPatient);
    const [progress, setProgress] = useState(0);
    const [oxygenLevel, setOxygenLevel] = useState(dispatch.ambulance?.oxygenLevel || 95);

    useEffect(() => {
        const totalDuration = dispatch.etaToPatient * 60; // in seconds
        let elapsedTime = 0;

        const interval = setInterval(() => {
            setEta(prev => Math.max(0, prev - (1/60)));
            
            elapsedTime++;
            const newProgress = Math.min((elapsedTime / totalDuration) * 100, 100);
            setProgress(newProgress);
            
            // Simulate oxygen level fluctuation
            setOxygenLevel(prev => Math.max(85, Math.min(100, prev + (Math.random() - 0.5) * 0.2)));

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
                <CardTitle className="text-gradient-glow text-2xl">Live Navigation</CardTitle>
                <CardDescription>Navigating to: <span className="text-white font-bold">{dispatch.destination}</span></CardDescription>
                 <p className="text-sm text-muted-foreground italic">“Your ambulance is en route to {dispatch.pickupLocation}, arriving in approximately {Math.ceil(eta)} minutes.”</p>
            </CardHeader>
            <CardContent>
                <div className="relative h-96 bg-background/50 rounded-lg overflow-hidden border border-primary/20 perspective-1000">
                    <Image src="https://images.unsplash.com/photo-1588628062512-3213b31524e3?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" layout="fill" objectFit="cover" alt="3D map" className="opacity-10" data-ai-hint="night street map" />
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />

                    <div className="absolute top-4 left-4 glassmorphism p-2 rounded-lg">
                        <p className="text-sm text-muted-foreground">ETA</p>
                        <p className="text-2xl font-bold text-white">{formatTime(eta)}</p>
                    </div>

                    <div 
                        className="absolute top-1/2 left-1/2 transform-style-3d"
                        style={{ 
                            width: '2px', 
                            height: '2px', 
                            transform: `translate(-50%, -50%) rotateX(60deg) translateX(${(progress-50)*4}px)`,
                            transition: 'transform 1s linear'
                        }}
                    >
                        {/* 3D animated path */}
                        <div className="absolute w-96 h-0.5 bg-primary/20 -translate-x-1/2 -translate-y-1/2">
                            <div className="h-full bg-primary animate-pulse" style={{width: `${progress}%`}} />
                        </div>
                        
                        {/* Ambulance Icon */}
                        <div className="absolute transform -translate-x-1/2 -translate-y-full">
                             <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center animate-ping-slow">
                                <Ambulance className="w-5 h-5 text-primary" />
                            </div>
                             <Ambulance className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-5 h-5 text-primary" style={{ transform: 'rotate(-30deg)' }} />
                        </div>

                         {/* Destination Icon */}
                        <div className="absolute transform -translate-y-1/2" style={{ left: '190px'}}>
                            <div className="w-4 h-4 rounded-full bg-destructive animate-ping"/>
                            <div className="absolute w-3 h-3 rounded-full bg-destructive"/>
                        </div>
                    </div>


                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-center text-primary font-bold bg-background/50 px-4 py-1 rounded-full text-sm">
                        Live 3D Tracking Simulation
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
                    <DriverInfoCard driver={dispatch.driver} />
                    <FacilityStatusCard ambulance={dispatch.facilities} oxygenLevel={oxygenLevel} />
                </div>
            </CardContent>
            <CardFooter>
                <Button className="w-full glowing-shadow-interactive" onClick={onComplete}>
                    <CheckCircle className="mr-2" /> Mark Trip as Complete
                </Button>
            </CardFooter>
        </Card>
    )
}
