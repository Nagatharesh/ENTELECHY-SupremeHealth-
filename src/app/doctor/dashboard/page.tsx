
"use client";

import { Suspense, useState, useEffect } from 'react';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Logo } from '@/components/icons/logo';
import { Button } from '@/components/ui/button';
import { User, Bell, PanelLeft, MessageSquare, Droplets, Dna, Search, BrainCircuit, HeartPulse, List, Pencil, FileText } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"
import {
  Sidebar,
  SidebarProvider,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarTrigger as SidebarTriggerButton
} from "@/components/ui/sidebar"

import { dummyDoctors, Doctor } from '@/lib/dummy-data';
import { DoctorProfile } from '@/components/doctor/doctor-profile';
import { DoctorCommunication } from '@/components/doctor/doctor-communication';
import { BloodBank } from '@/components/doctor/blood-bank';
import { PatientReferralHub } from '@/components/doctor/patient-referral-hub';
import { StrokePredictionHub } from '@/components/doctor/stroke-prediction-hub';
import { CardiacDeviceHub } from '@/components/doctor/cardiac-device-hub';
import { GuardianRxHub } from '@/components/doctor/guardian-rx-hub';
import { PatientListDashboard } from '@/components/doctor/patient-list-dashboard';
import { OnlinePrescriptionHub } from '@/components/doctor/online-prescription-hub';
import { MedicalCertificateHub } from '@/components/doctor/medical-certificate-hub';
import { DoctorChatbot } from '@/components/doctor/doctor-chatbot';
import { BioNanitesHub } from '@/components/doctor/bio-nanites-hub';
import { GeneticsHub } from '@/components/doctor/genetics-hub';


function DashboardContent() {
  const searchParams = useSearchParams();
  const doctorId = searchParams.get('id') || 'DOC-001'; // Default for demo
  const [activeView, setActiveView] = useState('profile');

  const doctor = dummyDoctors.find(d => d.doctorId === doctorId);

  if (!doctor) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-center p-4">
        <h2 className="text-2xl font-bold text-destructive mb-4">Doctor Not Found</h2>
        <p className="text-muted-foreground mb-8 max-w-md">The doctor ID provided does not exist. Please login again.</p>
        <Button asChild>
          <Link href="/login?role=doctor">Return to Login</Link>
        </Button>
      </div>
    );
  }
  
  const renderContent = () => {
    switch(activeView) {
      case 'profile':
        return <DoctorProfile />;
      case 'patient-list':
        return <PatientListDashboard />;
      case 'communication':
        return <DoctorCommunication doctor={doctor} />;
      case 'blood':
        return <BloodBank />;
      case 'referral':
        return <PatientReferralHub />;
      case 'stroke':
        return <StrokePredictionHub />;
      case 'cardiac':
        return <CardiacDeviceHub />;
      case 'guardian-rx':
        return <GuardianRxHub />;
      case 'prescription':
        return <OnlinePrescriptionHub />;
      case 'medical-certificate':
        return <MedicalCertificateHub />;
      case 'bio-nanites':
        return <BioNanitesHub />;
      case 'genetics':
        return <GeneticsHub />;
      default:
        return <DoctorProfile />;
    }
  }

  const navItems = [
    { id: 'profile', icon: User, label: 'Profile' },
    { id: 'patient-list', icon: List, label: 'Patient Dashboard' },
    { id: 'communication', icon: MessageSquare, label: 'Communication' },
    { id: 'blood', icon: Droplets, label: 'Blood Bank' },
    { id: 'referral', icon: Search, label: 'Referral Hub'},
    { id: 'stroke', icon: BrainCircuit, label: 'Stroke Prediction' },
    { id: 'cardiac', icon: HeartPulse, label: 'Cardiac ASI' },
    { id: 'guardian-rx', icon: Dna, label: 'GuardianRx' },
    { id: 'prescription', icon: Pencil, label: 'Online Prescription' },
    { id: 'medical-certificate', icon: FileText, label: 'Medical Certificate' },
    { id: 'bio-nanites', icon: Dna, label: 'Bio-nanites' },
    { id: 'genetics', icon: Dna, label: 'Genetics' },
  ];

  const NavMenu = () => (
    <SidebarProvider>
        <Sidebar>
        <SidebarHeader className="flex items-center justify-center group-data-[collapsible=icon]:justify-center group-data-[collapsible=expanded]:justify-between">
            <Logo className="group-data-[collapsible=icon]:hidden"/>
            <SidebarTriggerButton />
        </SidebarHeader>
        <SidebarContent>
            <SidebarMenu>
            {navItems.map(item => (
                <SidebarMenuItem key={item.id}>
                <SidebarMenuButton onClick={() => setActiveView(item.id)} isActive={activeView === item.id} tooltip={item.label}>
                    <item.icon />
                    <span>{item.label}</span>
                </SidebarMenuButton>
                </SidebarMenuItem>
            ))}
            </SidebarMenu>
        </SidebarContent>
        <SidebarFooter>
            <div className="flex items-center justify-center p-2 group-data-[collapsible=icon]:w-auto group-data-[collapsible=expanded]:w-full">
                <Image src={`https://i.pravatar.cc/150?u=${doctor.doctorId}`} alt={doctor.name} width={40} height={40} className="rounded-full border-2 border-primary/50"/>
                <div className="ml-3 group-data-[collapsible=icon]:hidden whitespace-nowrap overflow-hidden">
                <span className="font-semibold text-gradient-glow text-lg">{doctor.name}</span>
                <p className="text-xs text-muted-foreground">{doctor.specialty}</p>
                </div>
            </div>
        </SidebarFooter>
        </Sidebar>
    </SidebarProvider>
  )

  return (
    
      <div className="flex flex-col md:flex-row min-h-screen bg-background">
        <div className="hidden md:flex flex-col glassmorphism !border-r-border/50">
            <NavMenu />
        </div>

        <main className="flex-1 min-w-0">
          <header className="flex md:hidden items-center justify-between p-4 glassmorphism">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <PanelLeft className="h-6 w-6 text-primary" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="p-0 w-[var(--sidebar-width-mobile)]">
                 <NavMenu />
              </SheetContent>
            </Sheet>
            <Link href="/home">
              <Logo />
            </Link>
             <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5 text-primary" />
              <span className="absolute top-1 right-1 flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
            </Button>
          </header>
          
          <div className="p-4 md:p-8 animate-fade-in-up">
            {renderContent()}
          </div>
        </main>
        <DoctorChatbot />
      </div>
    
  );
}

export default function DoctorDashboardPage() {
  return (
    <Suspense fallback={<div className="w-full h-screen flex items-center justify-center"><p className="text-lg text-gradient-glow animate-pulse">Loading SupremeHealth Dashboard...</p></div>}>
      <DashboardContent />
    </Suspense>
  );
}
