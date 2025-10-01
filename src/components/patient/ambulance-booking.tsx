
"use client";

import { useState, useEffect, useMemo } from 'react';
import { dummyAmbulances, Patient } from '@/lib/dummy-data';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Ambulance, Phone, Car, Clock, MapPin, CheckCircle, XCircle, Bot } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';

const AmbulanceCard = ({ ambulance, onSelect, patientCoords }) => {
    const distance = useMemo(() => {
        if (!patientCoords) return Infinity;
        const latDiff = patientCoords.lat - ambulance.current_coords.lat;
        const lonDiff = patientCoords.lng - ambulance.current_coords.lng;
        // Simple approximation for demo
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
                        <p className="text-sm text-muted-foreground">{ambulance.driver_name}</p>
                        <div className="flex items-center gap-4 text-xs mt-1">
                            <span className="flex items-center gap-1"><MapPin className="w-3 h-3"/>~{distance.toFixed(1)} km</span>
                            <span className="flex items-center gap-1"><Clock className="w-3 h-3"/>~{eta} mins</span>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col items-end gap-2">
                    <Badge variant={ambulance.status === 'available' ? 'default' : 'secondary'} className="capitalize">{ambulance.status}</Badge>
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
                    <InfoRow icon={MapPin} label="Distance" value={`~${distance.toFixed(1)} km`} />
                    <InfoRow icon={Clock} label="Estimated Arrival" value={`~${eta} minutes`} />
                </div>
                <div className="flex justify-end gap-4">
                    <Button variant="outline" onClick={onCancel}>Cancel</Button>
                    <Button className="glowing-shadow-interactive" onClick={onConfirm}>Request Now</Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};

const TrackingView = ({ booking, onCancel }) => {
    const [eta, setEta] = useState(booking.eta);

    useEffect(() => {
        if (booking.status !== 'enroute') return;
        const interval = setInterval(() => {
            setEta(prev => Math.max(0, prev - 1));
        }, 60 * 1000);
        return () => clearInterval(interval);
    }, [booking.status]);

    return (
        <Card className="glassmorphism glowing-shadow">
            <CardHeader>
                <CardTitle className="text-gradient-glow">Ambulance En-Route</CardTitle>
                <p className="text-sm text-muted-foreground italic">“Help is on the way — stay calm, we’ll get you there.”</p>
            </CardHeader>
            <CardContent>
                <div className="relative h-64 bg-background/50 rounded-lg overflow-hidden border border-primary/20">
                     <div className="absolute inset-0 bg-grid-primary/10 [mask-image:radial-gradient(ellipse_at_center,transparent_30%,black)]"></div>
                     <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                        <Ambulance className="w-16 h-16 text-primary animate-pulse" />
                        <p className="text-center text-primary font-bold mt-2">Live Tracking Mock</p>
                     </div>
                </div>
                <div className="mt-6 space-y-4">
                     <InfoRow icon={Car} label="Vehicle No" value={booking.ambulance.vehicle_no} />
                     <InfoRow icon={Phone} label="Driver Contact" value={booking.ambulance.driver_name} isPhone={true} phone={booking.ambulance.driver_phone}/>
                     <InfoRow icon={Clock} label="Arriving In" value={`${eta} minutes`} />
                </div>
                <div className="mt-6 flex justify-center">
                    <Button variant="destructive" onClick={onCancel} className="w-full max-w-xs">
                        <XCircle className="mr-2"/>
                        Cancel Booking
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
};

const InfoRow = ({icon: Icon, label, value, isPhone = false, phone}) => (
    <div className="flex items-center justify-between p-3 rounded-lg bg-card/50">
        <div className="flex items-center gap-3">
            <Icon className="w-5 h-5 text-primary" />
            <span className="text-muted-foreground">{label}</span>
        </div>
        {isPhone ? (
             <a href={`tel:${phone}`} className="font-semibold text-white hover:text-primary transition-colors">{value}</a>
        ) : (
            <span className="font-semibold text-white">{value}</span>
        )}
    </div>
);


export function AmbulanceBooking({ patient }: { patient: Patient }) {
    const [patientCoords, setPatientCoords] = useState(null);
    const [selectedAmbulance, setSelectedAmbulance] = useState(null);
    const [selectionDetails, setSelectionDetails] = useState({ distance: 0, eta: 0 });
    const [activeBooking, setActiveBooking] = useState(null);

    useEffect(() => {
        // Mocking patient location for demo
        setPatientCoords({ lat: 19.0760, lng: 72.8777 }); 
    }, []);

    const sortedAmbulances = useMemo(() => {
        if (!patientCoords) return dummyAmbulances;
        return [...dummyAmbulances].sort((a, b) => {
            const distA = Math.sqrt(Math.pow(patientCoords.lat - a.current_coords.lat, 2) + Math.pow(patientCoords.lng - a.current_coords.lng, 2));
            const distB = Math.sqrt(Math.pow(patientCoords.lat - b.current_coords.lat, 2) + Math.pow(patientCoords.lng - b.current_coords.lng, 2));
            const etaA = a.speed_kmph > 0 ? (distA * 111) / a.speed_kmph : Infinity;
            const etaB = b.speed_kmph > 0 ? (distB * 111) / b.speed_kmph : Infinity;
            return etaA - etaB;
        });
    }, [patientCoords]);

    const handleSelect = (ambulance, distance, eta) => {
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
    };

    const handleCancelSelection = () => {
        setSelectedAmbulance(null);
    };
    
    const handleCancelBooking = () => {
        // Mock cancellation
        console.log("Booking cancelled", activeBooking.id);
        setActiveBooking(null);
    }

    if (activeBooking) {
        return <TrackingView booking={activeBooking} onCancel={handleCancelBooking}/>;
    }

    return (
        <div className="space-y-6">
            <Card className="glassmorphism glowing-shadow">
                <CardHeader>
                    <CardTitle className="text-gradient-glow">Request an Ambulance</CardTitle>
                    <p className="text-muted-foreground">Select a nearby ambulance or auto-assign the fastest one.</p>
                </CardHeader>
                <CardContent>
                    <div className="flex justify-end mb-4">
                        <Button className="glowing-shadow-interactive"><Bot className="mr-2" /> Auto-assign nearest</Button>
                    </div>
                    <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
                        {sortedAmbulances.map(amb => (
                            <AmbulanceCard 
                                key={amb.id} 
                                ambulance={amb} 
                                onSelect={handleSelect}
                                patientCoords={patientCoords}
                            />
                        ))}
                    </div>
                </CardContent>
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
