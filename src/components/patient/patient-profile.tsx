
"use client";

import { Patient } from "@/lib/dummy-data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { QuickActions } from "./quick-actions";
import { HealthSnapshot } from "./health-snapshot";
import { User, Phone, Shield, Building, MapPin } from "lucide-react";
import Image from "next/image";

export function PatientProfile({ patient }: { patient: Patient }) {
  const getAge = (dob: string) => {
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
  }
  
  const handleAmbulanceClick = () => {
    // This is a placeholder. The parent dashboard component will handle switching the view.
    const event = new CustomEvent('changeView', { detail: 'ambulance' });
    window.dispatchEvent(event);
  };


  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2">
            <Card className="glassmorphism glowing-shadow">
                <CardHeader className="flex flex-row items-center gap-6">
                    <Image src={`https://i.pravatar.cc/150?u=${patient.patientId}`} alt={patient.name} width={100} height={100} className="rounded-full border-4 border-primary/50 glowing-shadow"/>
                    <div>
                        <CardTitle className="text-4xl font-bold text-gradient-glow">{patient.name}</CardTitle>
                        <p className="text-muted-foreground">{patient.patientId} &bull; {getAge(patient.dob)} years old &bull; {patient.gender}</p>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
                        <InfoItem icon={Phone} label="Contact" value={patient.phone} />
                        <InfoItem icon={User} label="Emergency Contact" value={`${patient.emergencyContact.name} (${patient.emergencyContact.phone})`} />
                        <InfoItem icon={Shield} label="Aadhaar" value={patient.aadhaar} />
                        <InfoItem icon={MapPin} label="Address" value={patient.address} />
                        <InfoItem icon={Building} label="Insurance" value={`${patient.insurance.provider} - ${patient.insurance.policyId}`} />
                        <InfoItem icon={User} label="Blood Group" value={patient.bloodGroup} />
                    </div>
                    <div className="mt-6">
                        <h4 className="font-semibold text-white mb-2">Medical Summary</h4>
                        <p className="text-muted-foreground text-sm">{patient.medicalSummary}</p>
                    </div>
                </CardContent>
            </Card>
        </div>
        <QuickActions patient={patient} onAmbulanceClick={handleAmbulanceClick}/>
      </div>

      <HealthSnapshot vitals={patient.vitals} />
    </div>
  );
}

const InfoItem = ({ icon: Icon, label, value }: { icon: React.ElementType, label: string, value: string }) => (
    <div className="flex items-start gap-3 p-3 rounded-md bg-card/50">
        <Icon className="w-5 h-5 mt-1 text-primary"/>
        <div>
            <p className="text-xs text-muted-foreground">{label}</p>
            <p className="text-sm font-semibold text-white">{value}</p>
        </div>
    </div>
)
