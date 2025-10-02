
"use client";

import { Patient } from "@/lib/dummy-data";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { QuickActions } from "./quick-actions";
import { User, Phone, Shield, Droplet, Heart, Activity, Siren, GitBranchPlus, FileClock, ShieldAlert, Pill } from "lucide-react";
import Image from "next/image";
import { ProfileAnalytics } from "./profile-analytics";
import { useState, useEffect } from "react";

export function PatientProfile({ patient }: { patient: Patient }) {
  const [lastVisitDate, setLastVisitDate] = useState('');
  
  useEffect(() => {
    // This ensures date formatting only happens on the client, avoiding hydration mismatches.
    const lastEncounter = patient.medicalEncounters[patient.medicalEncounters.length - 1];
    if (lastEncounter) {
      setLastVisitDate(new Date(lastEncounter.date).toLocaleDateString());
    }
  }, [patient.medicalEncounters]);

  const getAge = (dob: string) => {
    if (!dob) return '';
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
                        <CardDescription className="text-lg">
                           {getAge(patient.dob)} years old {patient.gender} &bull; {patient.bloodGroup}
                        </CardDescription>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
                        <InfoItem icon={Heart} label="Chronic Conditions" value={patient.healthOverview.chronicConditions.join(', ')} />
                        <InfoItem icon={ShieldAlert} label="Allergies" value={patient.healthOverview.allergies.join(', ')} />
                        <InfoItem icon={Activity} label="Lifestyle" value={patient.healthOverview.lifestyle} />
                        <InfoItem icon={Pill} label="Current Medications" value={patient.medications.current.map(m => m.name).join(', ')} />
                        <InfoItem icon={FileClock} label="Last Visit" value={lastVisitDate || 'Loading...'} />
                        <InfoItem icon={GitBranchPlus} label="Insurance" value={`${patient.insurance.provider}`} />
                    </div>
                </CardContent>
            </Card>
        </div>
        <QuickActions patient={patient} onAmbulanceClick={handleAmbulanceClick}/>
      </div>

      <ProfileAnalytics patient={patient} />
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
