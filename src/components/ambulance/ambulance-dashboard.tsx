
"use client";

import { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { dummyAmbulances, dummyDispatchRequests, dummyTripLogs } from '@/lib/dummy-data';
import { DispatchAlert } from './dispatch-alert';
import { LiveNavigation } from './live-navigation';
import { VehicleStatus } from './vehicle-status';
import { TripLogger } from './trip-logger';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { LogOut } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Logo } from '../icons/logo';

export function AmbulanceDashboard() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const ambulanceId = searchParams.get('id');

    const [ambulance, setAmbulance] = useState(null);
    const [currentDispatch, setCurrentDispatch] = useState(null);
    const [tripLogs, setTripLogs] = useState([]);

    useEffect(() => {
        const foundAmbulance = dummyAmbulances.find(a => a.id === ambulanceId);
        setAmbulance(foundAmbulance);
        
        // Simulate finding an initial dispatch request for this ambulance
        const initialDispatch = dummyDispatchRequests.find(d => d.ambulanceId === ambulanceId && d.status === 'pending');
        setCurrentDispatch(initialDispatch || null);

        const initialLogs = dummyTripLogs.filter(t => t.ambulanceId === ambulanceId);
        setTripLogs(initialLogs);

    }, [ambulanceId]);

    const handleAcceptDispatch = (dispatchId: string) => {
        const dispatch = dummyDispatchRequests.find(d => d.id === dispatchId);
        if (dispatch) {
            setCurrentDispatch({ ...dispatch, status: 'accepted' });
        }
    };

    const handleCompleteTrip = () => {
        if (currentDispatch) {
            const newLog = {
                id: `log-${Date.now()}`,
                ambulanceId: ambulance.id,
                patientName: currentDispatch.patientName,
                from: currentDispatch.pickupLocation,
                to: currentDispatch.destination,
                startTime: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
                endTime: new Date().toISOString(),
                distance: 7.2, 
                notes: 'Patient stable on arrival.'
            };
            setTripLogs(prev => [newLog, ...prev]);
            setCurrentDispatch(null);
        }
    };

    if (!ambulance) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen text-center p-4">
                <h2 className="text-2xl font-bold text-destructive mb-4">Ambulance Not Found</h2>
                <p className="text-muted-foreground mb-8 max-w-md">The ambulance ID provided does not exist. Please login again.</p>
                <Button asChild>
                  <Link href="/login?role=ambulance">Return to Login</Link>
                </Button>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background text-white p-4 space-y-6">
            <header className="flex justify-between items-center">
                 <Link href="/home">
                    <Logo />
                 </Link>
                <div className='text-right'>
                    <h1 className="text-2xl font-bold text-gradient-glow">{ambulance.driver_name} - {ambulance.vehicle_no}</h1>
                    <p className="text-muted-foreground">AI-Powered Ambulance Hub</p>
                </div>
                <Button variant="outline" onClick={() => router.push('/login?role=ambulance')}><LogOut className="mr-2"/>Logout</Button>
            </header>

            <main className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                    {currentDispatch ? (
                        <LiveNavigation dispatch={currentDispatch} onComplete={handleCompleteTrip} />
                    ) : (
                        <DispatchAlert dispatch={dummyDispatchRequests.find(d => d.ambulanceId === ambulance.id && d.status === 'pending')} onAccept={handleAcceptDispatch} />
                    )}
                </div>
                <div className="space-y-6">
                    <VehicleStatus ambulance={ambulance} />
                    <TripLogger logs={tripLogs} />
                </div>
            </main>
        </div>
    );
}
