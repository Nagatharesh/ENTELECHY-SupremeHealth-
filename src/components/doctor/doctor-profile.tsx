
"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { singleDemoDoctor } from "@/lib/dummy-data";
import { User, Heart, Briefcase, Mail, Phone, Clock, FileText, CheckCircle, BarChart, ShieldAlert } from "lucide-react";
import Image from "next/image";
import { format, formatDistanceToNow } from 'date-fns';

const StatCard = ({ label, value, icon: Icon }: { label: string, value: string | number, icon: React.ElementType }) => (
    <div className="glassmorphism p-4 rounded-lg text-center transform transition-transform hover:-translate-y-1">
        <Icon className="w-8 h-8 text-primary mx-auto mb-2" />
        <p className="text-3xl font-bold text-gradient-glow">{value}</p>
        <p className="text-sm text-muted-foreground">{label}</p>
    </div>
);


export function DoctorProfile() {
    const doctor = singleDemoDoctor.doctor;

    if (!doctor) {
        return <p>Loading doctor profile...</p>
    }

    return (
        <div className="space-y-6 animate-fade-in-up">
            <Card className="glassmorphism glowing-shadow">
                <CardHeader className="flex flex-col md:flex-row items-center gap-6">
                    <Image src={doctor.photo_url} alt={doctor.fullName} width={120} height={120} className="rounded-full border-4 border-primary/50 glowing-shadow"/>
                    <div className="text-center md:text-left">
                        <div className="flex items-center justify-center md:justify-start gap-2">
                             <CardTitle className="text-4xl font-bold text-gradient-glow">{doctor.fullName}</CardTitle>
                             <Badge variant="destructive">DEMO</Badge>
                        </div>
                        <CardDescription className="text-xl text-primary">{doctor.title}</CardDescription>
                        <p className="text-muted-foreground mt-1">{doctor.age}, {doctor.gender}</p>
                    </div>
                </CardHeader>
                <CardContent className="space-y-4">
                     <p className="text-center md:text-left text-muted-foreground italic">{doctor.bio}</p>
                     <Separator />
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <InfoItem icon={Briefcase} label="Working at" value={`${doctor.hospital.name}, ${doctor.hospital.department}`} />
                        <InfoItem icon={Clock} label="Office Hours" value={doctor.contact.officeHours} />
                        <InfoItem icon={Mail} label="Email" value={doctor.contact.email} />
                        <InfoItem icon={Phone} label="Contact" value={doctor.contact.phone} />
                    </div>
                </CardContent>
            </Card>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard label="Total Patients" value={doctor.analytics.totalPatients} icon={User} />
                <StatCard label="Last Shift" value={formatDistanceToNow(new Date(doctor.analytics.lastShift), { addSuffix: true })} icon={Clock} />
                <StatCard label="Avg Response" value={`${doctor.analytics.avgResponseMins} min`} icon={Phone} />
                <StatCard label="Risk Score" value={doctor.analytics.riskScore} icon={ShieldAlert} />
            </div>

            <Card className="glassmorphism glowing-shadow">
                <CardHeader>
                    <CardTitle className="text-gradient-glow">Certificates</CardTitle>
                    <CardDescription>{doctor.uiHints.certificatesWatermarkText}</CardDescription>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {doctor.certificates.map(cert => (
                        <Card key={cert.certId} className="glassmorphism flex items-center gap-4 p-4">
                             <div className="relative w-24 h-24 flex-shrink-0">
                                <Image src={cert.image_url} alt={cert.title} layout="fill" objectFit="cover" className="rounded-md opacity-20"/>
                                 <div className="absolute inset-0 flex items-center justify-center">
                                    <CheckCircle className="w-12 h-12 text-primary/50"/>
                                </div>
                            </div>
                            <div>
                                <p className="font-bold text-white">{cert.title}</p>
                                <p className="text-sm text-muted-foreground">{cert.issuedBy} - {cert.year}</p>
                                <Button variant="outline" size="sm" className="mt-2" disabled={!doctor.uiHints.showDownloadButton}>Download</Button>
                            </div>
                        </Card>
                    ))}
                </CardContent>
            </Card>

            <Card className="glassmorphism glowing-shadow">
                <CardHeader>
                    <CardTitle className="text-gradient-glow">Recent Clinical Records</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    {doctor.records.map(record => (
                        <div key={record.recordId} className="p-4 rounded-lg bg-background/50 border-l-4 border-primary/50">
                            <p className="text-sm text-muted-foreground">{format(new Date(record.date), 'PPP')}</p>
                            <p className="font-semibold text-white">{record.patientSummary}</p>
                            <p className="text-sm text-muted-foreground italic my-1">"{record.notes}"</p>
                            <div className="flex gap-2 mt-2">
                                {record.diagnosisTags.map(tag => <Badge key={tag} variant="secondary">{tag}</Badge>)}
                            </div>
                        </div>
                    ))}
                </CardContent>
            </Card>
        </div>
    );
}


const InfoItem = ({ icon: Icon, label, value }: {icon: React.ElementType, label: string, value: string}) => (
    <div className="flex items-start gap-3">
        <Icon className="w-5 h-5 mt-1 text-primary"/>
        <div>
            <p className="text-xs text-muted-foreground">{label}</p>
            <p className="text-sm font-semibold text-white">{value}</p>
        </div>
    </div>
)

    