
"use client";

import { useState, useEffect } from 'react';
import { dummyHospitals, dummyDoctors, Patient } from '@/lib/dummy-data';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import Image from 'next/image';
import { MapPin, Phone, Users, UserCheck, Clock, Star, MessageSquare, Video, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Appointments, BookingWizard } from './appointments'; 
import Link from 'next/link';

const center = { lat: 12.9141, lng: 74.8560 }; // St. Joseph Engineering College

const calculateDistance = (coords1, coords2) => {
    const latDiff = coords1.lat - coords2.lat;
    const lonDiff = coords1.lng - coords2.lng;
    return Math.sqrt(latDiff * latDiff + lonDiff * lonDiff) * 111; // Approx km
};

export function DoctorsHub({ patient }: { patient: Patient }) {
    const [showRadar, setShowRadar] = useState(true);
    const [selectedHospital, setSelectedHospital] = useState(null);
    const [nearbyHospitals, setNearbyHospitals] = useState([]);
    const [isBooking, setIsBooking] = useState(false);
    const [selectedDoctorForBooking, setSelectedDoctorForBooking] = useState(null);


    useEffect(() => {
        const timer = setTimeout(() => setShowRadar(false), 2200);

        const hospitalsWithDistance = dummyHospitals.map(h => ({
            ...h,
            distance: calculateDistance(center, h.coordinates)
        })).sort((a, b) => a.distance - b.distance);
        setNearbyHospitals(hospitalsWithDistance);

        return () => clearTimeout(timer);
    }, []);

    const handleMarkerClick = (hospital) => {
        setSelectedHospital(hospital);
    };

    const handleClosePanel = () => {
        setSelectedHospital(null);
        setIsBooking(false);
        setSelectedDoctorForBooking(null);
    };

    const handleBookClick = (doctor) => {
        setSelectedDoctorForBooking(doctor);
        setIsBooking(true);
    };
    
    const handleAppointmentBooked = (newAppointment) => {
        // In a real app, this would update the global state or refetch data.
        console.log("New Appointment Booked:", newAppointment);
        setIsBooking(false);
        setSelectedDoctorForBooking(null);
        // Maybe show a success toast here
    }

    return (
        <div className="space-y-6">
            <Card className="glassmorphism glowing-shadow relative h-[70vh] overflow-hidden perspective-1000">
                <CardHeader>
                    <div className="flex justify-between items-center">
                        <div>
                            <CardTitle className="text-gradient-glow">Find a Doctor</CardTitle>
                            <CardDescription>Nearby hospitals and doctors at your fingertips.</CardDescription>
                        </div>
                        <Button asChild className="glowing-shadow-interactive">
                            <Link href="https://www.practo.com/chennai/doctors" target="_blank" rel="noopener noreferrer">
                                Book Your Favourite Doctor
                            </Link>
                        </Button>
                    </div>
                </CardHeader>
                <CardContent className="relative flex items-center justify-center h-full transform-style-3d">
                    {/* Map Background */}
                    <Image src="/3d-map.png" layout="fill" objectFit="cover" alt="3D map" className="opacity-10 transform-gpu" style={{ transform: 'rotateX(60deg) scale(1.5)' }}/>
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />

                    {/* Radar Animation */}
                    {showRadar && (
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="radar-container" style={{ transform: 'rotateX(60deg) scale(1.2)' }}>
                                <div className="radar-sweep"></div>
                                <div className="radar-marker-center"></div>
                            </div>
                        </div>
                    )}
                    
                    {/* Hospital Markers */}
                    <div className="w-full h-full transform-style-3d" style={{ transform: 'rotateX(60deg) scale(1.2)'}}>
                        {nearbyHospitals.map((hospital, index) => {
                             const angle = (index / nearbyHospitals.length) * 360 + 45;
                             const radius = (index + 1) * 30 + 30; // simple distribution
                             const x = 50 + (radius / 300) * 50 * Math.cos(angle * Math.PI / 180);
                             const y = 50 + (radius / 300) * 50 * Math.sin(angle * Math.PI / 180);

                            return (
                                <div
                                    key={hospital.hospitalId}
                                    className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer hospital-marker"
                                    style={{ 
                                        left: `${x}%`, 
                                        top: `${y}%`,
                                        animationDelay: `${index * 100}ms`
                                    }}
                                    onClick={() => handleMarkerClick(hospital)}
                                >
                                    <div className="relative group">
                                        <div className="marker-pulse"></div>
                                        <div className="marker-dot"></div>
                                        <div className="marker-label opacity-0 group-hover:opacity-100 transition-opacity" style={{ transform: 'rotateX(-60deg)' }}>{hospital.name} ({hospital.distance.toFixed(1)} km)</div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </CardContent>
            </Card>
            
            <Dialog open={!!selectedHospital} onOpenChange={(isOpen) => !isOpen && handleClosePanel()}>
                <DialogContent className="glassmorphism max-w-4xl h-[90vh] flex flex-col">
                    {isBooking && selectedDoctorForBooking ? (
                         <BookingWizard onBook={handleAppointmentBooked} patientId={patient.patientId} preselectedDoctor={selectedDoctorForBooking} onBack={() => setIsBooking(false)} />
                    ) : (
                         <HospitalDetailPanel hospital={selectedHospital} onClose={handleClosePanel} onBookClick={handleBookClick} />
                    )}
                </DialogContent>
            </Dialog>
            
             <div className="mt-8">
                <h2 className="text-2xl font-bold text-gradient-glow mb-4">Appointment History</h2>
                <Appointments patient={patient} showBookingButton={false}/>
            </div>

        </div>
    );
}

const HospitalDetailPanel = ({ hospital, onClose, onBookClick }) => {
    if (!hospital) return null;
    
    const hospitalDoctors = dummyDoctors.filter(d => d.hospitalId === hospital.hospitalId);

    const yourToken = 5; // Dummy data
    const eta = 15; // Dummy data

    return (
        <>
            <DialogHeader>
                <DialogTitle className="text-gradient-glow text-2xl">{hospital.name}</DialogTitle>
                <DialogDescription className="flex items-center gap-2">
                    <MapPin className="w-4 h-4"/>{hospital.location}
                    <span className="mx-2">|</span>
                    <Phone className="w-4 h-4"/><a href={`tel:${hospital.contact}`}>{hospital.contact}</a>
                </DialogDescription>
                 <Button variant="ghost" size="icon" className="absolute top-4 right-4" onClick={onClose}><X/></Button>
            </DialogHeader>
            <div className="flex-grow overflow-y-auto pr-4 -mr-4 space-y-6">
                {/* Vitals-like summary */}
                <div className="grid grid-cols-3 gap-4 text-center">
                    <InfoCard icon={Users} label="Patients Waiting" value={hospital.patientLoad} />
                    <InfoCard icon={UserCheck} label="Your Token" value={`#${yourToken}`} />
                    <InfoCard icon={Clock} label="Estimated Wait" value={`~${eta} mins`} />
                </div>
                
                {/* Doctor List */}
                <div>
                    <h3 className="text-lg font-semibold text-white mb-2">Doctors Available</h3>
                    <div className="space-y-3">
                        {hospitalDoctors.map(doctor => (
                            <DoctorCard key={doctor.doctorId} doctor={doctor} onBookClick={onBookClick}/>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}


const InfoCard = ({ icon: Icon, label, value }) => (
    <div className="glassmorphism p-4 rounded-lg">
        <Icon className="w-8 h-8 text-primary mx-auto mb-2" />
        <p className="text-lg font-bold text-white">{value}</p>
        <p className="text-sm text-muted-foreground">{label}</p>
    </div>
);

const DoctorCard = ({ doctor, onBookClick }) => {
    return (
        <Card className="glassmorphism p-3 flex items-center gap-4 transition-all duration-300 hover:border-primary/50">
            <Image src={`https://i.pravatar.cc/150?u=${doctor.doctorId}`} alt={doctor.name} width={50} height={50} className="rounded-full border-2 border-primary/30" />
            <div className="flex-grow">
                <p className="font-bold text-white">{doctor.name}</p>
                <p className="text-sm text-muted-foreground">{doctor.specialty}</p>
                <div className="flex items-center gap-1 text-yellow-400 text-sm">
                    <Star className="w-4 h-4 fill-current"/>
                    <span>{doctor.rating}</span>
                </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
                <Button size="sm" variant="outline"><MessageSquare className="w-4 h-4 sm:mr-2"/> <span className="hidden sm:inline">Chat</span></Button>
                <Button size="sm" variant="outline"><Video className="w-4 h-4 sm:mr-2"/> <span className="hidden sm:inline">Video Call</span></Button>
                <Button size="sm" className="glowing-shadow-interactive" onClick={() => onBookClick(doctor)}>Book</Button>
            </div>
        </Card>
    );
}

    