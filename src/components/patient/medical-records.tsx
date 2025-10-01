
"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { FileText, TestTube, Pill, Microscope, Stethoscope, HeartPulse, Shield, Beaker, ChevronDown, Ambulance } from "lucide-react";
import { Patient, MedicalEncounter, Investigation, dummyDoctors, dummyMedicines } from "@/lib/dummy-data";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const RecordIcon = ({ type }: { type: string }) => {
    switch (type.toLowerCase()) {
        case "consultation":
        case "general medicine":
        case "pulmonology":
        case "cardiology":
        case "dermatology":
            return <Stethoscope className="w-5 h-5" />;
        case "emergency":
             return <Ambulance className="w-5 h-5 text-destructive" />;
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
        default: return <FileText className="w-5 h-5" />;
    }
}

const getDoctorName = (doctorName: string) => {
  return dummyDoctors.find(d => d.name === doctorName)?.name || doctorName || "Unknown Doctor";
}

export function MedicalRecords({ patient }: { patient: Patient }) {

  const allRecords = [
    ...patient.medicalEncounters.map(e => ({ ...e, recordType: 'Encounter' })),
  ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <Card className="glassmorphism glowing-shadow h-full">
        <CardHeader>
            <CardTitle className="text-gradient-glow">Medical History</CardTitle>
        </CardHeader>
        <CardContent>
            <ScrollArea className="h-[calc(100vh-16rem)] perspective-1000">
            <div className="w-full space-y-4 pr-4">
                {allRecords.map((record, index) => (
                    <EncounterCard key={record.encounterId} record={record as MedicalEncounter} patient={patient} index={index}/>
                ))}
            </div>
            </ScrollArea>
        </CardContent>
    </Card>
  );
}

const EncounterCard = ({ record, patient, index }: { record: MedicalEncounter, patient: Patient, index: number }) => {
    const encounterInvestigations = patient.investigations.filter(inv => inv.date === record.date && inv.doctor === record.doctor);

    return (
        <div className="timeline-glow relative">
            <div className="timeline-point-glow">
                <RecordIcon type={record.department} />
            </div>
            <Card className="glassmorphism timeline-card-glow" style={{ animationDelay: `${index * 100}ms` }}>
                <CardHeader>
                    <div className="flex justify-between items-start">
                        <div>
                            <CardTitle className="text-lg text-gradient-glow">{record.department}</CardTitle>
                            <p className="text-sm text-muted-foreground">
                                {new Date(record.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                                {' \u2022 '}
                                {getDoctorName(record.doctor)}
                            </p>
                        </div>
                         {record.department.toLowerCase() === 'emergency' && <Badge variant="destructive">Urgent</Badge>}
                    </div>
                </CardHeader>
                <CardContent className="space-y-4">
                    <DetailSection title="Reason for Visit" content={record.reason} />
                    <DetailSection title="Findings" content={record.findings} />
                    <DetailSection title="Treatment" content={record.treatment} />
                    
                    {encounterInvestigations.length > 0 && (
                        <div>
                            <h4 className="font-semibold text-white mb-2">Investigations</h4>
                            <div className="space-y-2">
                                {encounterInvestigations.map(inv => <InvestigationCard key={inv.investigationId} record={inv} />)}
                            </div>
                        </div>
                    )}
                    
                    <DetailSection title="Discharge Notes" content={record.dischargeNotes} />
                </CardContent>
            </Card>
        </div>
    )
}

const DetailSection = ({ title, content }: { title: string, content: string}) => (
    <div>
        <h4 className="font-semibold text-white mb-1">{title}</h4>
        <p className="text-sm text-muted-foreground">{content}</p>
    </div>
);


const InvestigationCard = ({ record }: { record: Investigation }) => {
    return (
        <div className="text-sm p-3 rounded-md bg-background/50">
            <p><span className="font-semibold text-white">{record.type}:</span> <span className="text-muted-foreground">{record.summary}</span></p>
             {record.imageUrl && (
                 <Dialog>
                    <DialogTrigger asChild>
                        <Button variant="link" className="px-0 h-auto text-primary">View Report Image</Button>
                    </DialogTrigger>
                    <DialogContent className="glassmorphism">
                        <DialogHeader>
                            <DialogTitle className="text-gradient-glow">Radiology Report: {record.type}</DialogTitle>
                        </DialogHeader>
                        <div className="relative w-full aspect-video rounded-md overflow-hidden mt-4">
                             <Image src={record.imageUrl} alt={`Radiology Scan for ${record.type}`} fill objectFit="contain" />
                        </div>
                    </DialogContent>
                </Dialog>
            )}
        </div>
    );
};
