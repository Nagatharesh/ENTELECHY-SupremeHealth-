
"use client";

import { AadhaarPatient } from "@/lib/dummy-data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User, Phone, Shield, Building, MapPin, Mail } from "lucide-react";
import Image from "next/image";

export function AadhaarPatientProfile({ patient }: { patient: AadhaarPatient }) {
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
  
  return (
    <Card className="glassmorphism glowing-shadow">
        <CardHeader className="flex flex-row items-center gap-6">
            <Image src={`https://i.pravatar.cc/150?u=${patient.aadhaar_full}`} alt={patient.name} width={100} height={100} className="rounded-full border-4 border-primary/50 glowing-shadow"/>
            <div>
                <CardTitle className="text-4xl font-bold text-gradient-glow">{patient.name}</CardTitle>
                <p className="text-muted-foreground">{patient.aadhaar_full.replace(/(\d{4})-(\d{4})-.*/, 'XXXX-XXXX-....')} &bull; {getAge(patient.dob)} years old &bull; {patient.gender}</p>
            </div>
        </CardHeader>
        <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
                <InfoItem icon={Phone} label="Contact" value={patient.contact} />
                <InfoItem icon={Mail} label="Email" value={`${patient.name.split(' ')[0].toLowerCase()}@example.com`} />
                <InfoItem icon={MapPin} label="Address" value={patient.address} />
            </div>
        </CardContent>
    </Card>
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
