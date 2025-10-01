

"use client";

import { useState, useMemo, useEffect } from 'react';
import { Patient, dummyAadhaarPatients, AadhaarPatient, dummyDoctors, Doctor, dummyMedicines, Medicine, dummyPrescriptions, Prescription } from '@/lib/dummy-data';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { Fingerprint, User, PlusCircle, Pencil, X, Download, Paperclip, Send, AlertTriangle, Loader2, CheckCircle, Hospital, Pill, FileText } from 'lucide-react';
import { format } from 'date-fns';
import { AadhaarPatientProfile } from './aadhaar-patient-profile';
import { Progress } from '../ui/progress';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';

const statusConfig = {
    unsigned: { color: "bg-gray-500", label: "Unsigned", glow: "shadow-gray-500/50" },
    pending: { color: "bg-yellow-500", label: "Pending", glow: "shadow-yellow-500/50 animate-pulse" },
    signed: { color: "bg-green-500", label: "Signed", glow: "shadow-green-500/50" },
    rejected: { color: "bg-red-500", label: "Rejected", glow: "shadow-red-500/50" },
};

export function Prescriptions({ patient }: { patient: Patient }) {
    const [aadhaar, setAadhaar] = useState('');
    const [verifiedPatient, setVerifiedPatient] = useState<AadhaarPatient | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [showNotFoundError, setShowNotFoundError] = useState(false);
    const { toast } = useToast();

    const handleAadhaarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length > 12) value = value.slice(0, 12);
        setAadhaar(value);
        if (showNotFoundError) setShowNotFoundError(false);
    };

    const handleVerify = () => {
        setIsLoading(true);
        setShowNotFoundError(false);
        setTimeout(() => {
            const foundPatient = dummyAadhaarPatients.find(p => p.aadhaar_full === aadhaar);
            if (foundPatient) {
                setVerifiedPatient(foundPatient);
                toast({ title: 'Aadhaar Verified!', description: `Patient details for ${foundPatient.name} have been loaded.` });
            } else {
                setShowNotFoundError(true);
            }
            setIsLoading(false);
        }, 1500);
    };

    const patientPrescriptions = useMemo(() => {
        if (!verifiedPatient) return [];
        return dummyPrescriptions
            .filter(p => p.patient_aadhaar_masked === verifiedPatient.aadhaar_full.slice(-4))
            .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    }, [verifiedPatient]);

    const handleSimulateUpdate = () => {
        // This is a dummy function to simulate a new prescription appearing
        toast({
            title: 'Simulation',
            description: 'A new prescription would be added to the top of the list.',
        });
    };
    
    const reset = () => {
        setVerifiedPatient(null);
        setAadhaar('');
        setShowNotFoundError(false);
    }

    return (
        <div className="space-y-6">
            <Card className="glassmorphism glowing-shadow">
                <CardHeader>
                    <CardTitle className="text-gradient-glow">Prescription Hub</CardTitle>
                    <CardDescription>Enter patient's Aadhaar to view and manage prescriptions in test mode.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center gap-4">
                        <div className="relative flex-grow">
                             <Fingerprint className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                            <Input
                                placeholder="Enter 12-digit Aadhaar number"
                                className="pl-10 text-lg tracking-widest"
                                value={aadhaar}
                                onChange={handleAadhaarChange}
                                disabled={!!verifiedPatient || isLoading}
                                maxLength={12}
                            />
                        </div>
                        {verifiedPatient ? (
                             <Button variant="outline" onClick={reset}><X className="mr-2"/>Clear</Button>
                        ) : (
                             <Button onClick={handleVerify} disabled={aadhaar.length !== 12 || isLoading} className="glowing-shadow-interactive w-32">
                                {isLoading ? <Loader2 className="animate-spin" /> : "Verify"}
                            </Button>
                        )}
                    </div>
                     {isLoading && (
                        <div className="mt-4 p-4 bg-background/50 rounded-lg border border-primary/20 flex flex-col items-center gap-4 animate-fade-in-up">
                            <Loader2 className="w-12 h-12 text-primary animate-spin" />
                            <p className="font-bold text-white text-lg animate-pulse">Verifying Aadhaar & Fetching Patient Data...</p>
                            <Progress value={50} className="w-full animate-pulse" />
                        </div>
                    )}
                    {showNotFoundError && (
                        <Alert variant="destructive" className="mt-4 animate-fade-in-up glowing-shadow">
                             <AlertTriangle className="h-4 w-4" />
                            <AlertTitle>Patient Not Found</AlertTitle>
                            <AlertDescription>
                                The Aadhaar number entered was not found in the test database. 
                                <br/>
                                Please use one of the sample test Aadhaar numbers, e.g., <strong>123412341234</strong>.
                            </AlertDescription>
                        </Alert>
                    )}
                    {verifiedPatient && (
                        <div className="mt-4 animate-fade-in-up">
                            <AadhaarPatientProfile patient={verifiedPatient} />
                        </div>
                    )}
                </CardContent>
            </Card>

            {verifiedPatient && (
                 <Card className="glassmorphism glowing-shadow animate-fade-in-up" style={{animationDelay: '200ms'}}>
                    <CardHeader className="flex flex-row items-center justify-between">
                        <div>
                            <CardTitle className="text-gradient-glow">Prescriptions for {verifiedPatient.name}</CardTitle>
                            <CardDescription>Found {patientPrescriptions.length} records. Most recent first.</CardDescription>
                        </div>
                        <Button className="glowing-shadow-interactive" onClick={handleSimulateUpdate}>
                            <PlusCircle className="mr-2"/> Simulate Prescription Update
                        </Button>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
                            {patientPrescriptions.length > 0 ? patientPrescriptions.map((p, index) => 
                                <PrescriptionCard key={p.prescription_id} prescription={p} index={index}/>
                            ) : (
                                <p className="text-center text-muted-foreground py-8">No prescriptions found for this patient.</p>
                            )}
                        </div>
                    </CardContent>
                </Card>
            )}
        </div>
    );
}


const PrescriptionCard = ({ prescription, index }: { prescription: Prescription; index: number; }) => {
    const status = statusConfig[prescription.e_sign_status];
    return (
        <Card className="glassmorphism p-4 timeline-card-glow" style={{animationDelay: `${index * 100}ms`}}>
            <div className="flex justify-between items-start mb-4">
                <div>
                    <p className="text-sm text-muted-foreground">{format(new Date(prescription.date), 'PPP p')}</p>
                    <p className="font-bold text-lg text-white">Dr. {prescription.doctor.name} <span className="text-sm text-muted-foreground">({prescription.doctor.specialty})</span></p>
                    <p className="text-xs text-muted-foreground flex items-center gap-1"><Hospital className="w-3 h-3"/>{prescription.clinic.name}</p>
                </div>
                 <div className="flex flex-col items-end gap-2">
                    <Badge className={cn("text-white shadow-lg", status.color, status.glow)}>{status.label}</Badge>
                    {prescription.token_number && <Badge variant="outline">Token: #{prescription.token_number}</Badge>}
                 </div>
            </div>
            
            <div className="mb-4">
                <h4 className="text-sm font-semibold text-white mb-2 flex items-center gap-2"><Pill className="w-4 h-4"/>Medicines</h4>
                <div className="text-sm text-muted-foreground space-y-1">
                    {prescription.medicines.map(med => (
                        <div key={med.name} className="grid grid-cols-4 gap-x-2">
                           <span className="font-semibold col-span-2 text-white">{med.name} {med.strength}</span>
                           <span>{med.dose} {med.form}</span>
                           <span>{med.frequency} for {med.duration_days} days</span>
                        </div>
                    ))}
                </div>
            </div>

            {prescription.notes && (
                 <div className="mb-4">
                    <h4 className="text-sm font-semibold text-white mb-1 flex items-center gap-2"><FileText className="w-4 h-4"/>Doctor's Notes</h4>
                    <p className="text-sm text-muted-foreground italic">"{prescription.notes}"</p>
                </div>
            )}
            
             <CardFooter className="p-0 pt-4 flex justify-between items-center">
                 <div>
                    <p className="text-xs text-muted-foreground">Suggested Pharmacy</p>
                    <p className="text-sm font-semibold text-white">{prescription.suggested_pharmacy.name}</p>
                 </div>
                 <div className="flex items-center gap-4">
                    <p className="text-lg font-bold text-gradient-glow">Total: ₹{prescription.total_cost_inr}</p>
                    <Button 
                        asChild
                        variant="outline" 
                        disabled={prescription.e_sign_status !== 'signed'} 
                        className="glowing-shadow-interactive disabled:opacity-50"
                    >
                        <a href={prescription.download_pdf_url} target="_blank" rel="noopener noreferrer">
                             <Download className="mr-2"/> Download PDF
                        </a>
                    </Button>
                 </div>
            </CardFooter>
        </Card>
    )
}
