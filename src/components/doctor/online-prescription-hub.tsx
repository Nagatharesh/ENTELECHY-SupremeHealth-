
"use client";

import React, { useState, useMemo, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { onlinePrescriptionData, dummyPatientsForPrescription as allPatients, dummyDoctorsForPrescription as allDoctors, dummyMedicinesForPrescription as allMedicines } from '@/lib/dummy-data';
import { useToast } from "@/hooks/use-toast";
import { cn } from '@/lib/utils';
import { Bot, Pencil, Loader2, Send, CheckCircle, AlertTriangle, FileText, Pill, Download, Search, X, User, Fingerprint, PlusCircle, ChevronRight } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

const DoctorInfo = {
    id: "3001",
    name: "Dr. Anil Verma"
};

export function OnlinePrescriptionHub() {
    const [step, setStep] = useState(0); // 0: Patient Select, 1: Prescription, 2: Signed
    const [selectedPatient, setSelectedPatient] = useState<any | null>(null);
    const [patientSearchTerm, setPatientSearchTerm] = useState('');
    
    const [isSigning, setIsSigning] = useState(false);
    const [signedPrescription, setSignedPrescription] = useState<any | null>(null);
    
    const { toast } = useToast();

    const handlePatientSelect = (patient) => {
        setSelectedPatient(patient);
        setStep(1);
    };
    
    const handlePrescriptionSigned = (prescription) => {
        setSignedPrescription(prescription);
        setStep(2);
        toast({ title: "Prescription Sent Successfully", description: `Prescription for ${selectedPatient.name} has been signed and sent.` });
    };

    const resetFlow = () => {
        setStep(0);
        setSelectedPatient(null);
        setPatientSearchTerm('');
        setSignedPrescription(null);
    };

    const filteredPatients = useMemo(() => {
        if (!patientSearchTerm) return [];
        const lowerTerm = patientSearchTerm.toLowerCase();
        return allPatients.filter(p => 
            p.name.toLowerCase().includes(lowerTerm) || 
            p.id.toLowerCase().includes(lowerTerm)
        );
    }, [patientSearchTerm]);

    return (
        <div className="space-y-6">
            <Card className="glassmorphism glowing-shadow">
                <CardHeader>
                    <div className="flex justify-between items-center">
                        <CardTitle className="text-gradient-glow text-2xl">Online Prescription (AI Assist) - Demo</CardTitle>
                         {step > 0 && <Button variant="outline" onClick={resetFlow}><X className="mr-2"/>New Prescription</Button>}
                    </div>
                    <CardDescription>
                        {step === 0 && 'Search for a patient to begin a new prescription.'}
                        {step === 1 && `Creating prescription for ${selectedPatient?.name}.`}
                        {step === 2 && 'Prescription has been successfully signed and sent.'}
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
                                />
                            </motion.div>
                        )}
                        {step === 1 && selectedPatient && (
                            <motion.div key="step1" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                               <PrescriptionCreator 
                                    patient={selectedPatient}
                                    doctor={DoctorInfo}
                                    onSign={handlePrescriptionSigned}
                               />
                            </motion.div>
                        )}
                        {step === 2 && signedPrescription && (
                            <motion.div key="step2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                                <ConfirmationView prescription={signedPrescription} patientName={selectedPatient?.name || ''} />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </CardContent>
            </Card>
        </div>
    );
}

const PatientSelector = ({ searchTerm, setSearchTerm, filteredPatients, onSelect }) => (
    <div className="space-y-4">
        <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"/>
            <Input 
                placeholder="Search Patient by ID or Name (e.g., P10001 or Ravi)"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
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
                {filteredPatients.length === 0 && <p className="text-muted-foreground text-center py-4">No patients found.</p>}
            </div>
        )}
    </div>
);


const PrescriptionCreator = ({ patient, doctor, onSign }) => {
    const { toast } = useToast();
    const [medicines, setMedicines] = useState<any[]>([]);
    const [doctorSignId, setDoctorSignId] = useState('');
    const [isSigning, setIsSigning] = useState(false);
    
    const handleAddMedicine = (med) => {
        if (medicines.find(m => m.id === med.id)) {
            toast({ variant: 'destructive', title: 'Medicine already added.' });
            return;
        }

        // Allergy Check
        if (patient.allergies.toLowerCase().includes(med.name.split(' ')[0].toLowerCase())) {
            toast({ variant: 'destructive', title: 'Allergy Alert!', description: `${patient.name} is allergic to ${med.name}.` });
        }

        setMedicines(prev => [...prev, { ...med, quantity: 1, duration: 5, notes: '' }]);
    };
    
    const handleRemoveMedicine = (medId) => {
        setMedicines(prev => prev.filter(m => m.id !== medId));
    };

    const handleUpdateMedicine = (medId, field, value) => {
        setMedicines(prev => prev.map(m => m.id === medId ? { ...m, [field]: value } : m));
    };

    const handleSignAndSend = () => {
        if (doctorSignId !== doctor.id) {
            toast({ variant: 'destructive', title: 'E-sign Failed', description: 'Entered Doctor ID does not match your registered ID.' });
            return;
        }
        setIsSigning(true);
        setTimeout(() => {
            const prescription = {
                id: `RX-${Date.now()}`,
                patient,
                doctor,
                medicines,
                signedAt: new Date().toISOString(),
            };
            onSign(prescription);
            setIsSigning(false);
        }, 1500);
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
                <Card className="glassmorphism">
                    <CardHeader>
                        <CardTitle className="text-lg text-white">Patient Summary</CardTitle>
                    </CardHeader>
                    <CardContent className="grid grid-cols-2 gap-4 text-sm">
                        <InfoItem label="Name" value={patient.name} />
                        <InfoItem label="Age/Gender" value={`${patient.age}, ${patient.gender}`} />
                        <InfoItem label="Allergies" value={patient.allergies} isWarning={patient.allergies !== 'None'} />
                        <InfoItem label="Chronic Conditions" value={patient.conditions} />
                    </CardContent>
                </Card>

                <div className="space-y-4">
                    <h3 className="font-semibold text-lg text-white">Prescription Editor</h3>
                    {medicines.length > 0 ? medicines.map(med => (
                        <MedicineEditor 
                            key={med.id} 
                            medicine={med} 
                            patientAllergies={patient.allergies}
                            onUpdate={handleUpdateMedicine} 
                            onRemove={handleRemoveMedicine} 
                        />
                    )) : (
                        <div className="text-center py-10 glassmorphism rounded-lg">
                            <p className="text-muted-foreground">No medicines added yet.</p>
                        </div>
                    )}
                </div>

                 <div className="space-y-4">
                    <h3 className="font-semibold text-lg text-white">E-Signature</h3>
                    <div className="flex gap-4 p-4 glassmorphism rounded-lg">
                        <Input 
                            placeholder="Enter Your Doctor ID to Sign"
                            value={doctorSignId}
                            onChange={(e) => setDoctorSignId(e.target.value)}
                        />
                        <Button onClick={handleSignAndSend} disabled={isSigning || medicines.length === 0} className="glowing-shadow-interactive w-48">
                            {isSigning ? <Loader2 className="animate-spin" /> : <><Pencil className="mr-2" />Sign & Send</>}
                        </Button>
                    </div>
                </div>
            </div>

            <div className="space-y-4">
                 <MedicineSearch onAdd={handleAddMedicine} />
            </div>
        </div>
    );
};

const MedicineSearch = ({ onAdd }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const filteredMeds = useMemo(() => {
        if (!searchTerm) return [];
        const lowerTerm = searchTerm.toLowerCase();
        return allMedicines.filter(m => m.name.toLowerCase().includes(lowerTerm));
    }, [searchTerm]);

    return (
        <Card className="glassmorphism p-4 space-y-3">
            <h3 className="text-lg font-semibold text-white">Search Medicines</h3>
            <Input placeholder="Type to search..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
            <div className="max-h-96 overflow-y-auto space-y-2">
                {filteredMeds.map(med => (
                    <div key={med.id} className="p-2 glassmorphism rounded-md flex justify-between items-center">
                        <div>
                            <p className="font-semibold text-white">{med.name}</p>
                            <p className="text-xs text-muted-foreground">{med.strength}</p>
                        </div>
                        <Button size="sm" variant="ghost" onClick={() => onAdd(med)}><PlusCircle/></Button>
                    </div>
                ))}
            </div>
        </Card>
    );
};

const MedicineEditor = ({ medicine, patientAllergies, onUpdate, onRemove }) => {
    const isAllergic = patientAllergies.toLowerCase().includes(medicine.name.split(' ')[0].toLowerCase());
    return (
        <Card className={cn("glassmorphism p-3", isAllergic && "border-destructive glowing-shadow")}>
            <div className="flex justify-between items-center">
                <div>
                     <p className="font-semibold text-white">{medicine.name} <span className="text-sm text-muted-foreground">{medicine.strength}</span></p>
                    {isAllergic && <Badge variant="destructive" className="mt-1">Allergy Warning</Badge>}
                </div>
                <Button variant="ghost" size="icon" onClick={() => onRemove(medicine.id)}><X className="w-4 h-4 text-destructive"/></Button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-2">
                <Input placeholder="Dose" value={medicine.quantity} onChange={(e) => onUpdate(medicine.id, 'quantity', e.target.value)}/>
                <Input placeholder="Duration (days)" type="number" value={medicine.duration} onChange={(e) => onUpdate(medicine.id, 'duration', parseInt(e.target.value))}/>
                <Input placeholder="Route" value={medicine.route} onChange={(e) => onUpdate(medicine.id, 'route', e.target.value)} className="col-span-2"/>
                <Textarea placeholder="Notes / Frequency" value={medicine.notes} onChange={(e) => onUpdate(medicine.id, 'notes', e.target.value)} className="col-span-4"/>
            </div>
        </Card>
    );
};

const ConfirmationView = ({ prescription, patientName }) => (
    <div className="space-y-6">
        <div className="p-6 text-center bg-green-500/10 border-2 border-dashed border-green-500/30 rounded-lg">
            <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4 animate-pulse"/>
            <h3 className="text-2xl font-bold text-gradient-glow">Prescription Sent</h3>
            <p className="text-muted-foreground">ID: {prescription.id}</p>
        </div>

        <Card className="glassmorphism">
            <CardHeader>
                <CardTitle className="text-xl text-white">Sent Prescription for {patientName}</CardTitle>
            </CardHeader>
            <CardContent>
                 <div className="space-y-1 mb-4">
                    {prescription.medicines.map((med) => (
                        <div key={med.id} className="grid grid-cols-4 gap-x-2 p-2 rounded bg-background/30">
                           <span className="font-semibold col-span-2 text-white">{med.name} {med.strength}</span>
                           <span>{med.quantity} / dose</span>
                           <span>{med.notes || 'As directed'}</span>
                        </div>
                    ))}
                </div>
            </CardContent>
            <CardFooter className="flex justify-between items-center">
                 <p className="text-sm text-muted-foreground">Signed at {new Date(prescription.signedAt).toLocaleString()}</p>
                 <Button variant="outline" className="glowing-shadow-interactive">
                    <Download className="mr-2"/> Download PDF
                </Button>
            </CardFooter>
        </Card>

        <Card className="glassmorphism">
            <CardHeader>
                <CardTitle className="text-xl text-white">Notifications Log</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-background/30 rounded-lg">
                    <p>Patient Notification (SMS)</p>
                    <Badge className="bg-green-500 text-white">Sent</Badge>
                </div>
                <div className="flex justify-between items-center p-3 bg-background/30 rounded-lg">
                    <p>Pharmacy Push (API)</p>
                    <Badge className="bg-green-500 text-white">Sent</Badge>
                </div>
                 <div className="flex justify-between items-center p-3 bg-background/30 rounded-lg">
                    <p>Audit Log Entry</p>
                    <Badge className="bg-green-500 text-white">Created</Badge>
                </div>
            </CardContent>
        </Card>
    </div>
);

const InfoItem = ({ label, value, isWarning=false }) => (
    <div>
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className={cn("font-semibold text-white", isWarning && "text-destructive font-bold")}>{value}</p>
    </div>
)

    