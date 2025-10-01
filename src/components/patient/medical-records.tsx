
"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { FileText, TestTube, Pill, Microscope, Stethoscope, HeartPulse, Shield, Beaker } from "lucide-react";
import { Patient, MedicalEncounter, Investigation, dummyDoctors, dummyMedicines } from "@/lib/dummy-data";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import Image from "next/image";

const RecordIcon = ({ type }: { type: string }) => {
    switch (type.toLowerCase()) {
        case "consultation":
        case "emergency":
        case "general medicine":
        case "pulmonology":
            return <Stethoscope className="w-5 h-5 text-primary" />;
        case "lab test":
        case "blood test":
             return <Beaker className="w-5 h-5 text-secondary" />;
        case "prescription": return <Pill className="w-5 h-5 text-tertiary" />;
        case "spirometry": return <HeartPulse className="w-5 h-5 text-pink-400" />;
        case "ecg": return <HeartPulse className="w-5 h-5 text-red-400" />;
        case "procedure":
        case "surgery": return <Microscope className="w-5 h-5 text-accent" />;
        case "x-ray":
        case "radiology":
        case "ultrasound":
        case "mri": return <Shield className="w-5 h-5 text-yellow-400" />;
        default: return <FileText className="w-5 h-5 text-primary" />;
    }
}

const getDoctorName = (doctorName: string) => {
  return dummyDoctors.find(d => d.name === doctorName)?.name || doctorName || "Unknown Doctor";
}

const getMedicineDetails = (medicineId: string) => {
    return dummyMedicines.find(m => m.medicineId === medicineId);
}

export function MedicalRecords({ patient }: { patient: Patient }) {

  const allRecords = [
    ...patient.medicalEncounters.map(e => ({ ...e, recordType: 'Encounter' })),
    ...patient.investigations.map(i => ({ ...i, recordType: 'Investigation' }))
  ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <Card className="glassmorphism glowing-shadow h-full">
        <CardHeader>
            <CardTitle className="text-gradient-glow">Medical History</CardTitle>
        </CardHeader>
        <CardContent>
            <ScrollArea className="h-[calc(100vh-16rem)]">
            <div className="relative pl-6">
                {/* Timeline Line */}
                <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-border -translate-x-1/2"></div>
                
                {allRecords.map((record, index) => (
                <div key={index} className="mb-8 relative">
                    <div className="absolute left-8 -translate-x-1/2 mt-1.5 h-4 w-4 rounded-full bg-primary ring-4 ring-background z-10 animate-pulse"></div>
                    <div className="ml-8">
                        <div className="flex items-center gap-3">
                            <RecordIcon type={(record as any).department || (record as any).type} />
                            <p className="text-sm font-semibold text-white capitalize">{(record as any).department || (record as any).type}</p>
                            <span className="text-xs text-muted-foreground">{new Date(record.date).toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' })}</span>
                        </div>
                        
                        {record.recordType === 'Encounter' && (
                            <EncounterCard record={record as MedicalEncounter} />
                        )}

                        {record.recordType === 'Investigation' && (
                            <InvestigationCard record={record as Investigation} />
                        )}
                    </div>
                </div>
                ))}
            </div>
            </ScrollArea>
        </CardContent>
    </Card>
  );
}

const EncounterCard = ({ record }: { record: MedicalEncounter }) => {
    return (
        <div className="mt-2 text-sm">
            <p><span className="font-semibold text-white">Reason:</span> <span className="text-muted-foreground">{record.reason}</span></p>
            <p><span className="font-semibold text-white">Findings:</span> <span className="text-muted-foreground">{record.findings}</span></p>
            <p><span className="font-semibold text-white">Treatment:</span> <span className="text-muted-foreground">{record.treatment}</span></p>
            <p className="text-xs mt-1 text-muted-foreground/50">with {getDoctorName(record.doctor)}</p>
        </div>
    );
};


const InvestigationCard = ({ record }: { record: Investigation }) => {
    return (
        <div className="mt-2 text-sm">
            <p><span className="font-semibold text-white">Summary:</span> <span className="text-muted-foreground">{record.summary}</span></p>
            <p className="text-xs mt-1 text-muted-foreground/50">Report by {getDoctorName(record.doctor)}</p>
             {record.imageUrl && (
                 <Dialog>
                    <DialogTrigger asChild>
                        <Button variant="link" className="px-0 h-auto text-primary">View Report Image</Button>
                    </DialogTrigger>
                    <DialogContent className="glassmorphism">
                        <DialogHeader>
                            <DialogTitle className="text-gradient-glow">Radiology Report</DialogTitle>
                        </DialogHeader>
                        <div className="relative w-full aspect-video rounded-md overflow-hidden mt-4">
                             <Image src={record.imageUrl} alt="Radiology Scan" fill objectFit="contain" />
                        </div>
                    </DialogContent>
                </Dialog>
            )}
        </div>
    );
};
