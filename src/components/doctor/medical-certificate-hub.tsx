
"use client";

import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { dummyPatientsForPrescription as allPatients, dummyDoctorsForPrescription as allDoctors, dummyEncounters } from '@/lib/dummy-data';
import { useToast } from "@/hooks/use-toast";
import { cn } from '@/lib/utils';
import { Bot, Pencil, Loader2, Send, CheckCircle, AlertTriangle, FileText, Pill, Download, Search, X, User, Fingerprint, PlusCircle, ChevronRight, QrCode, Shield, Calendar, Activity, ShieldAlert, Heart } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Calendar as CalendarIcon } from 'lucide-react';
import { Calendar as CalendarPicker } from '../ui/calendar';
import { format } from 'date-fns';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Dialog, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogContent } from '../ui/dialog';
import { Alert, AlertTitle } from '../ui/alert';

const LoggedInDoctor = {
    id: "3001",
    name: "Dr. Anil Verma"
};

const certificateTypes = ["Sick Leave", "Fitness for Duty", "Travel Medical", "School/College Leave", "Fitness to Exercise"];

export function MedicalCertificateHub() {
    const [step, setStep] = useState(0); // 0: Patient Select, 1: AI guidance, 2: Preview, 3: Signed
    const [selectedPatient, setSelectedPatient] = useState<any | null>(null);
    const [patientSearchTerm, setPatientSearchTerm] = useState('');
    const [isEligible, setIsEligible] = useState<boolean | null>(null);
    const [showEligibilityModal, setShowEligibilityModal] = useState(false);
    
    const [certData, setCertData] = useState<any>({});
    const [isSigning, setIsSigning] = useState(false);
    const [signedCert, setSignedCert] = useState<any | null>(null);
    
    const { toast } = useToast();

    const handlePatientSelect = (patient) => {
        setSelectedPatient(patient);
        const hasVisit = dummyEncounters.some(e => e.patientId === patient.id && e.doctorId === LoggedInDoctor.id);
        setIsEligible(hasVisit);
        if (!hasVisit) {
            setShowEligibilityModal(true);
        } else {
            setStep(1);
        }
    };
    
    const handleGenerate = (data) => {
        setCertData(data);
        setStep(2);
    }
    
    const handleCertificateSigned = (certificate) => {
        setSignedCert(certificate);
        setStep(3);
        toast({ title: "Certificate Sent Successfully", description: `Medical certificate for ${selectedPatient.name} has been signed and sent.` });
    };

    const resetFlow = () => {
        setStep(0);
        setSelectedPatient(null);
        setPatientSearchTerm('');
        setSignedCert(null);
        setCertData({});
        setIsEligible(null);
    };

    const filteredPatients = useMemo(() => {
        if (!patientSearchTerm) return [];
        const lowerTerm = patientSearchTerm.toLowerCase();
        return allPatients.filter(p => 
            p.name.toLowerCase().includes(lowerTerm) || 
            p.id.toLowerCase().includes(lowerTerm)
        );
    }, [patientSearchTerm]);
    
    const handleFakeAttempt = () => {
        if (patientSearchTerm && !filteredPatients.length) {
            toast({ variant: 'destructive', title: 'Fake Certificate Attempt Detected', description: 'Unrecognized Patient ID. This attempt has been logged.' });
            setStep(99); // Fake attempt step
        }
    };

    return (
        <div className="space-y-6">
            <Card className="glassmorphism glowing-shadow">
                <CardHeader>
                    <div className="flex justify-between items-center">
                        <CardTitle className="text-gradient-glow text-2xl">Medical Certificate Generator (AI Assist)</CardTitle>
                         {step > 0 && step !== 99 && <Button variant="outline" onClick={resetFlow}><X className="mr-2"/>New Certificate</Button>}
                    </div>
                    <CardDescription>
                        {step === 0 && 'Search for a patient to begin a new certificate.'}
                        {step === 1 && `Creating certificate for ${selectedPatient?.name}.`}
                        {step === 2 && 'Previewing certificate.'}
                        {step === 3 && 'Certificate has been successfully signed and sent.'}
                        {step === 99 && 'Potential fake certificate attempt detected.'}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <AnimatePresence mode="wait">
                        {step === 0 && (
                            <motion.div key="step0" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                                <PatientSelector 
                                    searchTerm={patientSearchTerm} 
                                    setSearchTerm={setPatientSearchTerm}
                                    filteredPatients={filteredPatients}
                                    onSelect={handlePatientSelect}
                                    onBlur={handleFakeAttempt}
                                />
                            </motion.div>
                        )}
                        {step === 1 && selectedPatient && (
                             <motion.div key="step1" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                                <CertificateCreator patient={selectedPatient} doctor={LoggedInDoctor} onGenerate={handleGenerate} />
                            </motion.div>
                        )}
                         {step === 2 && (
                            <motion.div key="step2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                                <CertificatePreview certData={certData} patient={selectedPatient} doctor={LoggedInDoctor} onSign={handleCertificateSigned} onEdit={() => setStep(1)} />
                            </motion.div>
                        )}
                        {step === 3 && signedCert && (
                             <motion.div key="step3" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                                <ConfirmationView certificate={signedCert} />
                            </motion.div>
                        )}
                         {step === 99 && (
                             <motion.div key="step99" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                                <FakeAttemptView onTryAgain={resetFlow} />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </CardContent>
            </Card>
            <EligibilityModal open={showEligibilityModal} onOpenChange={setShowEligibilityModal} />
        </div>
    );
}


// --- Step Components ---

const PatientSelector = ({ searchTerm, setSearchTerm, filteredPatients, onSelect, onBlur }) => (
    <div className="space-y-4">
        <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"/>
            <Input 
                placeholder="Search Patient by ID or Name (e.g., P10001 or Ravi)"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onBlur={onBlur}
                className="pl-10 text-lg"
            />
        </div>
        {searchTerm && (
            <div className="space-y-2 max-h-60 overflow-y-auto">
                {filteredPatients.map(p => (
                    <Card key={p.id} className="p-3 flex justify-between items-center glassmorphism hover:border-primary cursor-pointer" onClick={() => onSelect(p)}>
                        <div>
                            <p className="font-bold text-white">{p.name} ({p.id})</p>
                            <p className="text-sm text-muted-foreground">{p.age}, {p.gender}</p>
                        </div>
                        <ChevronRight />
                    </Card>
                ))}
            </div>
        )}
    </div>
);

const CertificateCreator = ({ patient, doctor, onGenerate }) => {
    const [certType, setCertType] = useState('');
    const [startDate, setStartDate] = useState<Date>();
    const [endDate, setEndDate] = useState<Date>();
    const [summary, setSummary] = useState('');
    const [restrictions, setRestrictions] = useState('');

    const lastVisit = dummyEncounters.find(e => e.patientId === patient.id && e.doctorId === doctor.id);
    
    const handleAiSuggest = () => {
        setSummary(lastVisit?.notes || 'No recent visit notes found.');
        setRestrictions('Light duties advised. Avoid heavy lifting.');
    }

    const canGenerate = certType && startDate && endDate && summary;

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-4">
                <Card className="glassmorphism p-4">
                    <CardTitle className="text-lg text-white mb-2">Patient Summary</CardTitle>
                    <InfoItem label="Name" value={patient.name} />
                    <InfoItem label="Allergies" value={patient.allergies} isWarning={patient.allergies !== 'None'} />
                    <InfoItem label="Last Visit" value={lastVisit ? format(new Date(lastVisit.date), 'PPP') : 'N/A'} />
                </Card>
                <div className="space-y-4">
                    <Select value={certType} onValueChange={setCertType}>
                        <SelectTrigger><SelectValue placeholder="Step 1: Select Certificate Type" /></SelectTrigger>
                        <SelectContent>{certificateTypes.map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}</SelectContent>
                    </Select>

                    <div className="grid grid-cols-2 gap-4">
                        <DatePicker label="Start Date" date={startDate} setDate={setStartDate} />
                        <DatePicker label="End Date" date={endDate} setDate={setEndDate} />
                    </div>
                    <Textarea placeholder="Clinical Summary / Diagnosis" value={summary} onChange={e => setSummary(e.target.value)} />
                    <Textarea placeholder="Activity Restrictions" value={restrictions} onChange={e => setRestrictions(e.target.value)} />
                </div>
                 <Button onClick={() => onGenerate({certType, startDate, endDate, summary, restrictions})} disabled={!canGenerate} className="w-full glowing-shadow-interactive">Preview Certificate</Button>
            </div>
            <div className="space-y-4">
                <Card className="glassmorphism p-4">
                    <CardTitle className="text-lg text-white flex items-center gap-2"><Bot />AI Assistant</CardTitle>
                    <CardContent className="p-0 pt-4 space-y-3">
                        <p className="text-sm text-muted-foreground">Use AI to pre-fill details from the patient's last visit.</p>
                        <Button variant="outline" onClick={handleAiSuggest} className="w-full">Suggest Draft from Last Visit</Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
};

const CertificatePreview = ({ certData, patient, doctor, onSign, onEdit }) => {
    const [doctorSignId, setDoctorSignId] = useState('');
    const { toast } = useToast();

    const handleSign = () => {
        if(doctorSignId !== doctor.id) {
            toast({ variant: "destructive", title: "E-sign failed — entered ID does not match your registered Doctor ID." });
            return;
        }
        const signedCertificate = {
            ...certData,
            patient,
            doctor,
            id: `CERT-${Date.now()}`,
            signedAt: new Date().toISOString(),
            hash: 'sha256-' + Math.random().toString(36).substring(2)
        };
        onSign(signedCertificate);
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 p-6 border-2 border-dashed border-primary/30 rounded-lg bg-background/30 space-y-4">
                <div className="text-center">
                    <h3 className="text-2xl font-bold text-gradient-glow">{doctor.name}'s Clinic</h3>
                    <p className="text-muted-foreground">Official Medical Certificate</p>
                </div>
                <Separator />
                <p><strong>Patient:</strong> {patient.name} ({patient.id})</p>
                <p><strong>Certificate Type:</strong> {certData.certType}</p>
                <p><strong>Period:</strong> {format(certData.startDate, 'PPP')} to {format(certData.endDate, 'PPP')}</p>
                <p><strong>Diagnosis:</strong> {certData.summary}</p>
                <p><strong>Restrictions:</strong> {certData.restrictions}</p>
                <Separator />
                <div className="flex justify-between items-end">
                    <div>
                        <p className="font-bold">{doctor.name}</p>
                        <p className="text-sm text-muted-foreground">Reg No: {allDoctors.find(d => d.id === doctor.id)?.registration}</p>
                    </div>
                    <QrCode className="w-16 h-16 text-muted-foreground" />
                </div>
            </div>
             <div className="space-y-4">
                <h3 className="font-semibold text-lg text-white">E-Signature</h3>
                <p className="text-sm text-muted-foreground">Enter your numeric Doctor ID to sign and issue this certificate.</p>
                <Input placeholder="Enter Doctor ID" value={doctorSignId} onChange={e => setDoctorSignId(e.target.value)} type="password" />
                <Button onClick={handleSign} className="w-full glowing-shadow-interactive"><Pencil className="mr-2"/>Sign & Issue</Button>
                <Button onClick={onEdit} variant="outline" className="w-full">Edit</Button>
            </div>
        </div>
    )
}

const ConfirmationView = ({ certificate }) => (
    <div className="text-center space-y-6 p-8">
        <CheckCircle className="w-24 h-24 text-green-400 mx-auto animate-pulse"/>
        <h3 className="text-3xl font-bold text-gradient-glow">Certificate Issued Successfully</h3>
        <p className="text-muted-foreground">Certificate <span className="text-white font-mono">{certificate.id}</span> has been sent to {certificate.patient.name}.</p>
        <div className="flex gap-4 justify-center">
            <Button variant="outline"><Download className="mr-2" /> Download PDF</Button>
            <Button variant="outline"><Send className="mr-2" /> Resend Notification</Button>
        </div>
    </div>
);

const FakeAttemptView = ({ onTryAgain }) => (
    <div className="text-center space-y-6 p-8">
        <AlertTriangle className="w-24 h-24 text-destructive mx-auto animate-pulse"/>
        <h3 className="text-3xl font-bold text-destructive">Unrecognized Patient ID</h3>
        <p className="text-muted-foreground">Potential fake certificate attempt detected. This action has been logged.</p>
        <div className="p-4 border-2 border-dashed border-destructive/50 rounded-lg bg-destructive/10 relative">
            <p className="text-white italic blur-sm">This is a sample fake certificate...</p>
            <div className="absolute inset-0 flex items-center justify-center">
                <p className="text-4xl font-black text-destructive/50 -rotate-12">UNVERIFIED / FAKE</p>
            </div>
        </div>
        <div className="flex gap-4 justify-center">
            <Button variant="destructive" className="glowing-shadow-interactive">Report Attempt</Button>
            <Button variant="outline" onClick={onTryAgain}>Try Again</Button>
        </div>
    </div>
);

const EligibilityModal = ({open, onOpenChange}) => (
    <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="glassmorphism">
            <DialogHeader>
                <DialogTitle className="text-destructive">Patient Not Eligible for Certificate</DialogTitle>
                <DialogDescription>
                    Valid certificates require a prior consultation with you. This patient has no recorded visits with you.
                </DialogDescription>
            </DialogHeader>
            <div className="flex gap-4 mt-4">
                 <Button variant="outline" className="w-full" onClick={() => { onOpenChange(false); alert("Booking link sent to patient."); }}>
                    <Send className="mr-2" />Request Consultation
                </Button>
                 <Button variant="secondary" className="w-full" onClick={() => { onOpenChange(false); alert("Request sent to admin for manual review."); }}>
                    <ShieldAlert className="mr-2" />Escalate for Review
                </Button>
            </div>
        </DialogContent>
    </Dialog>
)

// --- Helper Components ---
const DatePicker = ({ label, date, setDate }: { label: string; date?: Date; setDate: (date?: Date) => void }) => (
    <Popover>
        <PopoverTrigger asChild>
            <Button variant="outline" className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}>
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, 'PPP') : <span>{label}</span>}
            </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0"><CalendarPicker mode="single" selected={date} onSelect={setDate} initialFocus /></PopoverContent>
    </Popover>
);

const InfoItem = ({ label, value, isWarning = false }) => (
    <div>
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className={cn("font-semibold text-white", isWarning && "text-destructive font-bold")}>{value}</p>
    </div>
);
