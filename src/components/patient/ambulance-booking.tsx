
"use client";

import { useState, useEffect, useMemo } from 'react';
import { dummyAmbulances, Patient, dummyHospitals } from '@/lib/dummy-data';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Ambulance, Phone, Car, Clock, MapPin, XCircle, Bot, ShieldPlus, HeartPulse, Brain, ArrowRight, User, Star, TrendingUp, HelpCircle, Map } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { Progress } from '@/components/ui/progress';
import Link from 'next/link';

const AmbulanceCard = ({ ambulance, onSelect, patientCoords }) => {
    const distance = useMemo(() => {
        if (!patientCoords) return Infinity;
        const latDiff = patientCoords.lat - ambulance.current_coords.lat;
        const lonDiff = patientCoords.lng - ambulance.current_coords.lng;
        return Math.sqrt(latDiff * latDiff + lonDiff * lonDiff) * 111;
    }, [patientCoords, ambulance.current_coords]);

    const eta = useMemo(() => {
        if (distance === Infinity || ambulance.speed_kmph === 0) return Infinity;
        return Math.round((distance / ambulance.speed_kmph) * 60);
    }, [distance, ambulance.speed_kmph]);

    return (
        <Card className="glassmorphism hover:border-primary/50 transition-all duration-300">
            <CardContent className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <div className="p-3 bg-primary/10 rounded-full border border-primary/20">
                        <Ambulance className="w-8 h-8 text-primary" />
                    </div>
                    <div>
                        <p className="font-bold text-white">{ambulance.vehicle_no}</p>
                        <div className="text-sm text-muted-foreground">{ambulance.driver_name} - <Badge variant="secondary" className="text-xs">{ambulance.type}</Badge></div>
                        <div className="flex items-center gap-4 text-xs mt-1">
                            <span className="flex items-center gap-1"><MapPin className="w-3 h-3"/>~{distance.toFixed(1)} km</span>
                            <span className="flex items-center gap-1"><Clock className="w-3 h-3"/>~{eta} mins</span>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col items-end gap-2">
                    <Badge variant={ambulance.status === 'available' ? 'default' : 'destructive'} className="capitalize">{ambulance.status}</Badge>
                    <Button size="sm" className="glowing-shadow-interactive" onClick={() => onSelect(ambulance, distance, eta)} disabled={ambulance.status !== 'available'}>
                        Select
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
};

const BookingConfirmation = ({ ambulance, distance, eta, onConfirm, onCancel }) => {
    if (!ambulance) return null;

    return (
        <Dialog open={!!ambulance} onOpenChange={(isOpen) => !isOpen && onCancel()}>
            <DialogContent className="glassmorphism">
                <DialogHeader>
                    <DialogTitle className="text-gradient-glow">Confirm Ambulance Booking</DialogTitle>
                    <DialogDescription>
                        An ambulance is ready for you. Please confirm the details below.
                    </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 my-4">
                    <InfoRow icon={Car} label="Vehicle No" value={ambulance.vehicle_no} />
                    <InfoRow icon={Phone} label="Driver" value={`${ambulance.driver_name} (${ambulance.driver_phone})`} />
                    <InfoRow icon={ShieldPlus} label="Type" value={ambulance.type} />
                    <InfoRow icon={MapPin} label="Distance" value={`~${distance.toFixed(1)} km`} />
                    <InfoRow icon={Clock} label="Estimated Arrival" value={`~${eta} minutes`} />
                </div>
                <DialogFooter className="flex justify-end gap-4">
                    <Button variant="outline" onClick={onCancel}>Cancel</Button>
                    <Button className="glowing-shadow-interactive" onClick={onConfirm}>Request Now</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

const TrackingView = ({ booking, onCancel }) => {
    const [eta, setEta] = useState(booking.eta);
    const [progress, setProgress] = useState(0);
    const [oxygenLevel, setOxygenLevel] = useState(booking.ambulance.oxygenLevel);

    useEffect(() => {
        if (booking.status !== 'enroute') return;
        const totalDuration = booking.eta * 60; // in seconds
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
    }, [booking.status, booking.eta]);

    const formatTime = (minutes: number) => {
        const mins = Math.floor(minutes);
        const secs = Math.round((minutes - mins) * 60);
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    return (
        <Card className="glassmorphism glowing-shadow">
            <CardHeader>
                <CardTitle className="text-gradient-glow">Ambulance En-Route</CardTitle>
                <p className="text-sm text-muted-foreground italic">“Your ambulance is 3 km away, arriving in {Math.ceil(eta)} minutes.”</p>
            </CardHeader>
            <CardContent>
                 <div className="relative h-96 bg-background/50 rounded-lg overflow-hidden border border-primary/20 perspective-1000">
                    <Image src="https://images.unsplash.com/photo-1588628062512-3213b31524e3?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" layout="fill" objectFit="cover" alt="3D map" className="opacity-30" data-ai-hint="night street map" />
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
                    <DriverInfoCard driver={booking.ambulance.driver} />
                    <FacilityStatusCard ambulance={booking.ambulance} oxygenLevel={oxygenLevel} />
                </div>
                
                <div className="mt-6 flex justify-center gap-4">
                    <Button variant="destructive" onClick={onCancel} className="flex-1 max-w-xs">
                        <XCircle className="mr-2"/>
                        Cancel Booking
                    </Button>
                    <Button asChild variant="secondary" className="flex-1 max-w-xs glowing-shadow-interactive">
                        <Link href="https://stone-flight-68945608.figma.site" target="_blank" rel="noopener noreferrer">
                            <Map className="mr-2"/>
                            View Map
                        </Link>
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
};

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


const InfoRow = ({icon: Icon, label, value}) => (
    <div className="flex items-center justify-between p-3 rounded-lg bg-card/50">
        <div className="flex items-center gap-3">
            <Icon className="w-5 h-5 text-primary" />
            <span className="text-muted-foreground">{label}</span>
        </div>
        <span className="font-semibold text-white">{value}</span>
    </div>
);


export function AmbulanceBooking({ patient }: { patient: Patient }) {
    const [step, setStep] = useState(1);
    const [patientCoords, setPatientCoords] = useState(null);
    const [selectedAmbulanceType, setSelectedAmbulanceType] = useState<string | null>(null);
    const [selectedHospital, setSelectedHospital] = useState<string | null>(null);
    const [selectedAmbulance, setSelectedAmbulance] = useState(null);
    const [selectionDetails, setSelectionDetails] = useState({ distance: 0, eta: 0 });
    const [activeBooking, setActiveBooking] = useState(null);
    

    useEffect(() => {
        // Mocking patient location for demo
        setPatientCoords({ lat: 19.0760, lng: 72.8777 }); 
    }, []);

    const filteredAmbulances = useMemo(() => {
        if (!dummyAmbulances) return [];
        let ambulances = dummyAmbulances;
        if (selectedAmbulanceType) {
            ambulances = ambulances.filter(a => a.type === selectedAmbulanceType);
        }
        return [...ambulances].sort((a, b) => {
            if (!patientCoords) return 0;
            const distA = Math.sqrt(Math.pow(patientCoords.lat - a.current_coords.lat, 2) + Math.pow(patientCoords.lng - a.current_coords.lng, 2));
            const distB = Math.sqrt(Math.pow(patientCoords.lat - b.current_coords.lat, 2) + Math.pow(patientCoords.lng - b.current_coords.lng, 2));
            const etaA = a.speed_kmph > 0 ? (distA * 111) / a.speed_kmph : Infinity;
            const etaB = b.speed_kmph > 0 ? (distB * 111) / b.speed_kmph : Infinity;
            
            if (a.status !== 'available' && b.status === 'available') return 1;
            if (a.status === 'available' && b.status !== 'available') return -1;
            
            return etaA - etaB;
        });
    }, [patientCoords, selectedAmbulanceType]);

    const resetFlow = () => {
        setStep(1);
        setSelectedAmbulanceType(null);
        setSelectedHospital(null);
        setSelectedAmbulance(null);
        setActiveBooking(null);
    }

    const handleSelectAmbulance = (ambulance, distance, eta) => {
        setSelectedAmbulance(ambulance);
        setSelectionDetails({ distance, eta });
    };

    const handleConfirmBooking = () => {
        // Mock booking logic
        console.log("Booking confirmed for", selectedAmbulance.id);
        setActiveBooking({
            id: `B-${Date.now()}`,
            patient_id: patient.patientId,
            ambulance: selectedAmbulance,
            status: 'enroute',
            eta: selectionDetails.eta,
        });
        setSelectedAmbulance(null);
        setStep(3); // Move to tracking view
    };

    const handleCancelSelection = () => {
        setSelectedAmbulance(null);
    };
    
    const handleCancelBooking = () => {
        // Mock cancellation
        console.log("Booking cancelled", activeBooking?.id);
        resetFlow();
    }
    
    const autoAssign = () => {
        const firstAvailable = filteredAmbulances.find(a => a.status === 'available');
        if (firstAvailable) {
            const distance = Math.sqrt(Math.pow(patientCoords.lat - firstAvailable.current_coords.lat, 2) + Math.pow(patientCoords.lng - firstAvailable.current_coords.lng, 2)) * 111;
            const eta = Math.round((distance / firstAvailable.speed_kmph) * 60);
            handleSelectAmbulance(firstAvailable, distance, eta);
        } else {
            alert("No ambulances available matching your criteria.");
        }
    }

    if (step === 3 && activeBooking) {
        return <TrackingView booking={activeBooking} onCancel={handleCancelBooking}/>;
    }

    return (
        <div className="space-y-6">
            <Card className="glassmorphism glowing-shadow">
                {step === 1 && (
                    <>
                        <CardHeader>
                            <CardTitle className="text-gradient-glow">Request an Ambulance</CardTitle>
                            <CardDescription>Select the type of ambulance and destination hospital.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div>
                                <h3 className="text-lg font-semibold text-white mb-2">Ambulance Type</h3>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <AmbulanceTypeCard icon={ShieldPlus} type="Basic" selected={selectedAmbulanceType} onSelect={setSelectedAmbulanceType} />
                                    <AmbulanceTypeCard icon={HeartPulse} type="ICU" selected={selectedAmbulanceType} onSelect={setSelectedAmbulanceType} />
                                    <AmbulanceTypeCard icon={Brain} type="Advanced Life Support" selected={selectedAmbulanceType} onSelect={setSelectedAmbulanceType} />
                                </div>
                            </div>
                             <div>
                                <h3 className="text-lg font-semibold text-white mb-2">Destination</h3>
                                <Select value={selectedHospital || ''} onValueChange={setSelectedHospital}>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Select a hospital..." />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {dummyHospitals.map(h => <SelectItem key={h.hospitalId} value={h.hospitalId}>{h.name}, {h.location}</SelectItem>)}
                                    </SelectContent>
                                </Select>
                            </div>
                            <Button onClick={() => setStep(2)} disabled={!selectedAmbulanceType || !selectedHospital} className="w-full glowing-shadow-interactive">Next <ArrowRight /></Button>
                        </CardContent>
                    </>
                )}
                {step === 2 && (
                     <>
                        <CardHeader>
                            <Button variant="ghost" onClick={() => setStep(1)} className="absolute top-4 left-4">Back</Button>
                            <CardTitle className="text-gradient-glow text-center">Select an Ambulance</CardTitle>
                            <CardDescription className="text-center">Choose from the available ambulances or let us pick the fastest one for you.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="flex justify-end mb-4">
                                <Button onClick={autoAssign} className="glowing-shadow-interactive"><Bot className="mr-2" /> Auto-assign nearest</Button>
                            </div>
                            <div className="space-y-4 max-h-[50vh] overflow-y-auto pr-2">
                                {filteredAmbulances.map(amb => (
                                    <AmbulanceCard 
                                        key={amb.id} 
                                        ambulance={amb} 
                                        onSelect={handleSelectAmbulance}
                                        patientCoords={patientCoords}
                                    />
                                ))}
                            </div>
                        </CardContent>
                    </>
                )}
            </Card>
            <BookingConfirmation
                ambulance={selectedAmbulance}
                distance={selectionDetails.distance}
                eta={selectionDetails.eta}
                onConfirm={handleConfirmBooking}
                onCancel={handleCancelSelection}
            />
        </div>
    );
}

const AmbulanceTypeCard = ({ icon: Icon, type, selected, onSelect }) => {
    const isSelected = selected === type;
    return (
        <Card 
            className={cn('glassmorphism text-center p-4 cursor-pointer transition-all duration-300', isSelected ? 'border-primary shadow-primary/30 shadow-lg' : 'hover:border-primary/50')}
            onClick={() => onSelect(type)}
        >
            <Icon className={cn('w-10 h-10 mx-auto mb-2', isSelected ? 'text-primary' : 'text-muted-foreground')} />
            <p className={cn('font-semibold', isSelected ? 'text-white' : 'text-muted-foreground')}>{type}</p>
        </Card>
    )
}

    