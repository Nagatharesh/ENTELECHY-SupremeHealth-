
"use client";

import { useState, useMemo, useEffect } from 'react';
import { Patient, dummyAadhaarPatients, AadhaarPatient, dummyDoctors, Doctor, dummyMedicines, Medicine } from '@/lib/dummy-data';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { Fingerprint, User, PlusCircle, Pencil, X, Download, Paperclip, Send, AlertTriangle } from 'lucide-react';
import { format } from 'date-fns';

type PrescriptionMedicine = {
    id: string;
    name: string;
    dose: string;
    route: string;
    frequency: string;
    duration: string;
};

type Prescription = {
    id: string;
    patientAadhaar: string;
    patientName: string;
    consultationDate: string;
    doctorId: string;
    hospital: string;
    medicines: PrescriptionMedicine[];
    notes: string;
    attachments: File[];
    status: 'draft' | 'pending' | 'approved' | 'rejected';
    eSignUrl?: string;
    approvedAt?: string;
    doctorLicense?: string;
};

const dummyPrescriptions: Prescription[] = [
    {
        id: 'PRES-001',
        patientAadhaar: '1234-5678-9012',
        patientName: 'Rahul Sharma',
        consultationDate: '2024-07-28',
        doctorId: 'DOC-007',
        hospital: 'Fortis Hospital',
        medicines: [
            { id: 'MED-001', name: 'Paracetamol 500 mg', dose: '1 tab', route: 'Oral', frequency: 'TDS', duration: '5 days' },
            { id: 'MED-010', name: 'Salbutamol inhaler', dose: '2 puffs', route: 'Inhalation', frequency: 'PRN', duration: 'as needed' },
        ],
        notes: 'Follow-up in 7 days if symptoms persist.',
        attachments: [],
        status: 'approved',
        eSignUrl: '/api/prescriptions/PRES-001/download?format=pdf',
        approvedAt: '2025-10-01T15:00:00+05:30',
        doctorLicense: 'DEL-12345'
    }
];

export function Prescriptions({ patient }: { patient: Patient }) {
    const [aadhaar, setAadhaar] = useState('');
    const [verifiedPatient, setVerifiedPatient] = useState<AadhaarPatient | null>(null);
    const [showOtpModal, setShowOtpModal] = useState(false);
    const [isEditorOpen, setIsEditorOpen] = useState(false);
    const [prescriptions, setPrescriptions] = useState<Prescription[]>(dummyPrescriptions);
    const { toast } = useToast();

    const handleAadhaarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length > 12) value = value.slice(0, 12);
        
        let formattedValue = '';
        if (value.length > 8) {
            formattedValue = `${value.slice(0, 4)}-${value.slice(4, 8)}-${value.slice(8)}`;
        } else if (value.length > 4) {
            formattedValue = `${value.slice(0, 4)}-${value.slice(4)}`;
        } else {
            formattedValue = value;
        }

        setAadhaar(formattedValue);
    };

    const handleVerify = () => {
        const foundPatient = dummyAadhaarPatients.find(p => p.aadhaar_full === aadhaar);
        if (foundPatient) {
            setShowOtpModal(true);
        } else {
            toast({ variant: 'destructive', title: 'Aadhaar Not Found', description: 'No patient record found for this Aadhaar number.' });
        }
    };
    
    const handleOtpSubmit = () => {
        const foundPatient = dummyAadhaarPatients.find(p => p.aadhaar_full === aadhaar);
        setVerifiedPatient(foundPatient!);
        setShowOtpModal(false);
        toast({ title: 'Aadhaar Verified!', description: `Patient details for ${foundPatient!.name} have been loaded.` });
    };

    const handleSavePrescription = (prescription: Prescription) => {
        const existingIndex = prescriptions.findIndex(p => p.id === prescription.id);
        if(existingIndex > -1) {
            setPrescriptions(prev => {
                const newPrescriptions = [...prev];
                newPrescriptions[existingIndex] = prescription;
                return newPrescriptions;
            });
             toast({ title: 'Draft Saved!', description: 'Your prescription draft has been updated.' });
        } else {
            setPrescriptions(prev => [...prev, prescription]);
            toast({ title: 'Draft Created!', description: 'Your prescription draft has been saved.' });
        }
        setIsEditorOpen(false);
    }
    
    const patientPrescriptions = useMemo(() => {
        if(!verifiedPatient) return [];
        return prescriptions.filter(p => p.patientAadhaar === verifiedPatient.aadhaar_full);
    }, [verifiedPatient, prescriptions]);


    return (
        <div className="space-y-6">
            <Card className="glassmorphism glowing-shadow">
                <CardHeader>
                    <CardTitle className="text-gradient-glow">Aadhaar Verification</CardTitle>
                    <CardDescription>Enter patient's Aadhaar to auto-fill details and manage prescriptions.</CardDescription>
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
                                disabled={!!verifiedPatient}
                            />
                        </div>
                        {verifiedPatient ? (
                             <Button variant="outline" onClick={() => { setVerifiedPatient(null); setAadhaar(''); }}><X className="mr-2"/>Clear</Button>
                        ) : (
                             <Button onClick={handleVerify} disabled={aadhaar.length !== 14} className="glowing-shadow-interactive">Verify</Button>
                        )}
                    </div>
                    {verifiedPatient && (
                        <div className="mt-4 p-4 bg-primary/10 rounded-lg border border-primary/20 flex items-center gap-4">
                            <User className="w-8 h-8 text-primary"/>
                            <div>
                                <p className="font-bold text-white text-lg">{verifiedPatient.name}</p>
                                <p className="text-sm text-muted-foreground">{verifiedPatient.gender}, {new Date().getFullYear() - new Date(verifiedPatient.dob).getFullYear()} years old &bull; {verifiedPatient.contact}</p>
                            </div>
                        </div>
                    )}
                </CardContent>
            </Card>

            {verifiedPatient && (
                 <Card className="glassmorphism glowing-shadow">
                    <CardHeader className="flex flex-row items-center justify-between">
                        <div>
                            <CardTitle className="text-gradient-glow">Prescriptions for {verifiedPatient.name}</CardTitle>
                            <CardDescription>Manage and view all prescriptions.</CardDescription>
                        </div>
                        <Button className="glowing-shadow-interactive" onClick={() => setIsEditorOpen(true)}>
                            <PlusCircle className="mr-2"/> New Prescription
                        </Button>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {patientPrescriptions.length > 0 ? patientPrescriptions.map(p => 
                                <PrescriptionCard key={p.id} prescription={p} onEdit={() => setIsEditorOpen(true)} />
                            ) : (
                                <p className="text-center text-muted-foreground py-8">No prescriptions found for this patient.</p>
                            )}
                        </div>
                    </CardContent>
                </Card>
            )}

            <Dialog open={showOtpModal} onOpenChange={setShowOtpModal}>
                <DialogContent className="glassmorphism">
                    <DialogHeader>
                        <DialogTitle className="text-gradient-glow">Enter OTP</DialogTitle>
                        <DialogDescription>An OTP has been sent to the mobile number linked with Aadhaar ending in ...{aadhaar.slice(-4)}. (This is a dummy flow, enter any 6 digits).</DialogDescription>
                    </DialogHeader>
                    <div className="py-4">
                        <Input placeholder="Enter 6-digit OTP" maxLength={6} className="text-center text-2xl tracking-[1rem]"/>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setShowOtpModal(false)}>Cancel</Button>
                        <Button className="glowing-shadow-interactive" onClick={handleOtpSubmit}>Verify OTP</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
            
            <Dialog open={isEditorOpen} onOpenChange={setIsEditorOpen}>
                <DialogContent className="glassmorphism max-w-4xl h-[90vh] flex flex-col">
                    <PrescriptionEditor 
                        patient={verifiedPatient} 
                        onSave={handleSavePrescription} 
                        onClose={() => setIsEditorOpen(false)}
                    />
                </DialogContent>
            </Dialog>

        </div>
    );
}

const statusConfig = {
    draft: { color: "bg-gray-500", label: "Draft" },
    pending: { color: "bg-yellow-500", label: "Pending" },
    approved: { color: "bg-green-500", label: "Approved" },
    rejected: { color: "bg-red-500", label: "Rejected" },
};

const PrescriptionCard = ({ prescription, onEdit }) => {
    const doctor = dummyDoctors.find(d => d.doctorId === prescription.doctorId);
    const status = statusConfig[prescription.status];
    return (
        <Card className="glassmorphism p-4">
            <div className="flex justify-between items-start">
                <div>
                    <p className="text-sm text-muted-foreground">Consultation: {format(new Date(prescription.consultationDate), 'PPP')}</p>
                    <p className="font-bold text-lg text-white">Dr. {doctor?.name}</p>
                </div>
                 <div className="flex items-center gap-4">
                     <Badge className={cn("text-white", status.color)}>{status.label}</Badge>
                     <Button variant="ghost" size="icon" onClick={onEdit}><Pencil className="w-4 h-4"/></Button>
                 </div>
            </div>
             <div className="mt-4">
                <h4 className="text-sm font-semibold text-white mb-2">Medicines ({prescription.medicines.length})</h4>
                <div className="text-sm text-muted-foreground">
                    {prescription.medicines.map(m => m.name).join(', ')}
                </div>
            </div>
             <CardFooter className="p-0 pt-4 flex justify-end">
                <Button variant="outline" disabled={prescription.status !== 'approved'}><Download className="mr-2"/> Download</Button>
            </CardFooter>
        </Card>
    )
}

function PrescriptionEditor({ patient, onSave, onClose }) {
    const [prescription, setPrescription] = useState<Prescription>({
        id: `PRES-${Date.now()}`,
        patientAadhaar: patient!.aadhaar_full,
        patientName: patient!.name,
        consultationDate: format(new Date(), 'yyyy-MM-dd'),
        doctorId: '',
        hospital: '',
        medicines: [{ id: `M${Date.now()}`, name: '', dose: '', route: '', frequency: '', duration: '' }],
        notes: '',
        attachments: [],
        status: 'draft',
    });
    const { toast } = useToast();

    const handleMedicineChange = (index, field, value) => {
        const newMedicines = [...prescription.medicines];
        newMedicines[index][field] = value;
        setPrescription(p => ({...p, medicines: newMedicines}));
    };

    const addMedicineRow = () => {
        setPrescription(p => ({...p, medicines: [...p.medicines, { id: `M${Date.now()}`, name: '', dose: '', route: '', frequency: '', duration: '' }]}));
    };
    
    const removeMedicineRow = (index) => {
        const newMedicines = prescription.medicines.filter((_, i) => i !== index);
        setPrescription(p => ({...p, medicines: newMedicines}));
    };
    
    const handleSendForESign = () => {
        const newPrescription = {...prescription, status: 'pending' as const };
        setPrescription(newPrescription);
        onSave(newPrescription);
         toast({ title: "Sent for e-Sign", description: `Prescription sent to Dr. ${dummyDoctors.find(d=>d.doctorId === prescription.doctorId)?.name} for approval.` });
    };

    return (
        <>
             <DialogHeader>
                <DialogTitle className="text-gradient-glow text-2xl">Prescription Editor</DialogTitle>
                <DialogDescription>Create or edit a prescription for {patient?.name}.</DialogDescription>
            </DialogHeader>
            
            <div className="flex-grow overflow-y-auto pr-6 -mr-6 space-y-6">
                {/* Patient & Doctor Info */}
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                     <InputWithLabel label="Patient Name" value={prescription.patientName} disabled/>
                     <InputWithLabel label="Patient Aadhaar" value={prescription.patientAadhaar.replace(/(\d{4})-(\d{4})-.*/, 'XXXX-XXXX-....')} disabled/>
                     <InputWithLabel label="Consultation Date" type="date" value={prescription.consultationDate} onChange={(e) => setPrescription(p => ({...p, consultationDate: e.target.value}))}/>
                     <Select value={prescription.doctorId} onValueChange={(val) => setPrescription(p => ({...p, doctorId: val}))}>
                        <SelectTrigger><SelectValue placeholder="Select Doctor..." /></SelectTrigger>
                        <SelectContent>
                            {dummyDoctors.map(d => <SelectItem key={d.doctorId} value={d.doctorId}>{d.name} ({d.specialty})</SelectItem>)}
                        </SelectContent>
                    </Select>
                 </div>
                 
                 {/* Medicines Table */}
                 <div>
                    <h3 className="text-white font-semibold mb-2">Medicines</h3>
                    <div className="space-y-2">
                        {prescription.medicines.map((med, index) => (
                             <div key={med.id} className="grid grid-cols-12 gap-2 items-center">
                                <Input className="col-span-3" placeholder="Medicine Name" value={med.name} onChange={(e) => handleMedicineChange(index, 'name', e.target.value)} />
                                <Input className="col-span-2" placeholder="Dose" value={med.dose} onChange={(e) => handleMedicineChange(index, 'dose', e.target.value)} />
                                <Input className="col-span-2" placeholder="Route" value={med.route} onChange={(e) => handleMedicineChange(index, 'route', e.target.value)} />
                                <Input className="col-span-2" placeholder="Frequency" value={med.frequency} onChange={(e) => handleMedicineChange(index, 'frequency', e.target.value)} />
                                <Input className="col-span-2" placeholder="Duration" value={med.duration} onChange={(e) => handleMedicineChange(index, 'duration', e.target.value)} />
                                <Button variant="ghost" size="icon" onClick={() => removeMedicineRow(index)}><X className="w-4 h-4 text-destructive"/></Button>
                            </div>
                        ))}
                    </div>
                     <Button variant="outline" size="sm" onClick={addMedicineRow} className="mt-2"><PlusCircle className="mr-2"/>Add Medicine</Button>
                 </div>
                 
                 {/* Notes & Attachments */}
                 <div className="space-y-4">
                     <Textarea placeholder="Add notes..." value={prescription.notes} onChange={(e) => setPrescription(p => ({...p, notes: e.target.value}))}/>
                     <div>
                        <label htmlFor="attachments" className="flex items-center gap-2 text-sm font-medium text-white p-2 rounded-md border border-dashed border-primary/50 cursor-pointer hover:bg-primary/10">
                            <Paperclip/> Attach Lab Reports / Images
                        </label>
                        <input type="file" id="attachments" multiple className="hidden"/>
                     </div>
                 </div>
            </div>
            
            <DialogFooter className="flex-col sm:flex-row justify-between w-full">
                <div className="flex items-center gap-2">
                     <Badge className={cn("text-white", statusConfig[prescription.status].color)}>{statusConfig[prescription.status].label}</Badge>
                     {prescription.status === 'rejected' && <div className="text-destructive text-sm flex items-center gap-1"><AlertTriangle className="w-4 h-4"/> Rejected by Doctor</div>}
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" onClick={() => onSave(prescription)}>Save Draft</Button>
                    <Button className="glowing-shadow-interactive" onClick={handleSendForESign} disabled={!prescription.doctorId || prescription.status === 'pending'}>
                        <Send className="mr-2"/> Send for e-Sign
                    </Button>
                </div>
            </DialogFooter>
        </>
    );
}

const InputWithLabel = ({ label, ...props }) => (
    <div>
        <label className="text-xs text-muted-foreground">{label}</label>
        <Input {...props} />
    </div>
);
