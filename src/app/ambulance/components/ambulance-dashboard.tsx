
"use client";

import { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { dummyAmbulances, dummyDispatchRequests, dummyTripLogs } from '@/lib/dummy-data';
import { DispatchAlert } from './dispatch-alert';
import { LiveNavigation } from './live-navigation';
import { VehicleStatus } from './vehicle-status';
import { TripLogger } from './trip-logger';
import { CommunicationHub } from './communication-hub';
import { PreTripChecklist } from './pre-trip-checklist';
import { Button } from '@/components/ui/button';
import { LogOut, Siren } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Logo } from '@/components/icons/logo';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

export function AmbulanceDashboard() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const { toast } = useToast();
    const ambulanceId = searchParams.get('id');

    const [ambulance, setAmbulance] = useState<any>(null);
    const [currentDispatch, setCurrentDispatch] = useState<any>(null);
    const [tripLogs, setTripLogs] = useState<any[]>([]);
    const [checklistComplete, setChecklistComplete] = useState(false);
    const [eta, setEta] = useState(0);

    const pendingDispatch = useMemo(() => dummyDispatchRequests.find(d => d.ambulanceId === ambulanceId && d.status === 'pending'), [ambulanceId]);

    useEffect(() => {
        const foundAmbulance = dummyAmbulances.find(a => a.id === ambulanceId);
        setAmbulance(foundAmbulance);
        
        const initialLogs = dummyTripLogs.filter(t => t.ambulanceId === ambulanceId);
        setTripLogs(initialLogs);

    }, [ambulanceId]);

     useEffect(() => {
        if (!currentDispatch || currentDispatch.status !== 'enroute') return;
        const totalDuration = currentDispatch.etaToPatient;
        setEta(totalDuration);
        const interval = setInterval(() => {
            setEta(prev => {
                if (prev <= 0) {
                    clearInterval(interval);
                    return 0;
                }
                return prev - (1/60);
            });
        }, 1000);
        return () => clearInterval(interval);
    }, [currentDispatch]);


    const handleAcceptDispatch = (dispatchId: string) => {
        if(!checklistComplete){
            toast({
                variant: "destructive",
                title: "Pre-Trip Checklist Incomplete",
                description: "You must complete the vehicle checklist before accepting a dispatch.",
            });
            return;
        }
        const dispatch = dummyDispatchRequests.find(d => d.id === dispatchId);
        if (dispatch) {
            setCurrentDispatch({ ...dispatch, status: 'enroute' });
            toast({
                title: "Dispatch Accepted!",
                description: `Navigating to ${dispatch.pickupLocation}.`,
            });
        }
    };
    
    const handleDeclineDispatch = (dispatchId: string) => {
        toast({
            variant: "destructive",
            title: "Dispatch Declined",
            description: "The dispatch request has been declined and will be reassigned.",
        });
        // In a real app, you'd also update the dispatch request status on the backend.
        // For this demo, we'll just clear the current alert.
        const nextRequest = dummyDispatchRequests.find(d => d.ambulanceId === ambulanceId && d.status === 'pending' && d.id !== dispatchId) || null;
    }

    const handlePanic = () => {
        toast({
            variant: "destructive",
            title: "PANIC BUTTON ACTIVATED",
            description: "Emergency signal sent to command center. Your location is being tracked.",
            duration: 10000,
        });
    }

    const handleCompleteTrip = () => {
        if (currentDispatch && ambulance) {
            const newLog = {
                id: `log-${Date.now()}`,
                ambulanceId: ambulance.id,
                patientName: currentDispatch.patientName,
                from: currentDispatch.pickupLocation,
                to: currentDispatch.destination,
                startTime: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
                endTime: new Date().toISOString(),
                distance: 7.2, 
                notes: 'Patient stable on arrival. Transferred to ER.'
            };
            setTripLogs(prev => [newLog, ...prev]);
            setCurrentDispatch(null);
             toast({
                title: "Trip Completed",
                description: `Trip log for ${newLog.patientName} has been saved.`,
            });
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
    
    const readinessScore = ((ambulance.fuelLevel / 100) * 0.4 + (ambulance.oxygenLevel / 100) * 0.4 + (ambulance.facilities.emergencyKit ? 1 : 0) * 0.2) * 100;
    const isReady = readinessScore > 70 && checklistComplete;

    return (
        <div className="min-h-screen bg-background text-white p-4 space-y-6">
            <header className="flex justify-between items-center">
                 <Link href="/home">
                    <Logo />
                 </Link>
                <div className='text-center'>
                    <h1 className="text-2xl font-bold text-gradient-glow">{ambulance.driver_name} - {ambulance.vehicle_no}</h1>
                    <p className="text-muted-foreground">AI Ambulance Command Center</p>
                </div>
                 <div className="flex items-center gap-4">
                    {currentDispatch && <Badge variant="secondary" className="text-lg">ETA: {Math.ceil(eta)} min</Badge>}
                    <Button variant="destructive" className="glowing-shadow-interactive" onClick={handlePanic}><Siren className="mr-2"/>PANIC</Button>
                    <Button variant="outline" onClick={() => router.push('/login?role=ambulance')}><LogOut className="mr-2"/>Logout</Button>
                </div>
            </header>

            <main className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                <div className="lg:col-span-3 space-y-6">
                    {currentDispatch ? (
                        <LiveNavigation dispatch={currentDispatch} onComplete={handleCompleteTrip} />
                    ) : (
                        <DispatchAlert 
                            dispatch={pendingDispatch} 
                            onAccept={handleAcceptDispatch} 
                            onDecline={handleDeclineDispatch}
                            isReady={isReady}
                        />
                    )}
                </div>
                <div className="space-y-6">
                    <VehicleStatus ambulance={ambulance} readinessScore={readinessScore} />
                    {!currentDispatch ? (
                        <PreTripChecklist onComplete={() => {setChecklistComplete(true); toast({title: "Checklist Complete", description: "Vehicle is now ready for dispatch."})}} />
                    ) : (
                        <CommunicationHub />
                    )}
                    <TripLogger logs={tripLogs} />
                </div>
            </main>
        </div>
    );
}
