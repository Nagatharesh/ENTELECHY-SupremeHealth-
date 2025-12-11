
"use client";

import { Suspense, useState, useEffect } from 'react';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Logo } from '@/components/icons/logo';
import { Button } from '@/components/ui/button';
import { User, Bell, PanelLeft, Ambulance, HeartPulse, FileText, Calendar, Stethoscope, Microscope, Pill, Shield, ClipboardList, BrainCircuit, HelpCircle, MessageCircle } from 'lucide-react';
import { dummyPatients, Patient } from '@/lib/dummy-data';
import { PatientProfile } from '@/components/patient/patient-profile';
import { MedicalRecords } from '@/components/patient/medical-records';
import { Appointments } from '@/components/patient/appointments';
import { VitalsAndPredictions } from '@/components/patient/vitals-and-predictions';
import { DoctorsHub } from '@/components/patient/doctors-hub';
import { Diagnostics } from '@/components/patient/diagnostics';
import { Medicines } from '@/components/patient/medicines';
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
import { AmbulanceBooking } from '@/components/patient/ambulance-booking';
import { Insurance } from '@/components/patient/insurance';
import { SmartDevices } from '@/components/patient/smart-devices';
import { Smartphone } from 'lucide-react';
import { Prescriptions } from '@/components/patient/prescriptions';
import { PatientChatbot } from '@/components/patient/chatbot';
import { HologramTrainer } from '@/components/patient/hologram-trainer';
import { NeedHelpHub } from '@/components/patient/need-help-hub';


function DashboardContent() {
  const searchParams = useSearchParams();
  const patientId = searchParams.get('id');
  const [activeView, setActiveView] = useState('profile');

  useEffect(() => {
    const handleChangeView = (event: CustomEvent) => {
      setActiveView(event.detail);
    };

    window.addEventListener('changeView', handleChangeView as EventListener);
    return () => {
      window.removeEventListener('changeView', handleChangeView as EventListener);
    };
  }, []);

  const patient = dummyPatients.find(p => p.patientId === patientId);

  if (!patient) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-center p-4">
        <h2 className="text-2xl font-bold text-destructive mb-4">Patient Not Found</h2>
        <p className="text-muted-foreground mb-8 max-w-md">The patient ID "{patientId}" does not exist in our records. Please use a valid ID like 'P-102345' for testing, accessible from the login page.</p>
        <Button asChild>
          <Link href="/login?role=patient">Return to Login</Link>
        </Button>
      </div>
    );
  }
  
  const renderContent = () => {
    switch(activeView) {
      case 'profile':
        return <PatientProfile patient={patient} />;
      case 'records':
        return <MedicalRecords patient={patient} />;
      case 'appointments':
        return <Appointments patient={patient} />;
      case 'vitals':
        return <VitalsAndPredictions patient={patient} />;
      case 'chat':
        // Navigate to the chat page
        window.location.href = `/patient/dashboard/chat?id=${patient.patientId}`;
        return null;
      case 'ambulance':
        return <AmbulanceBooking patient={patient} />;
      case 'doctors':
        return <DoctorsHub patient={patient} />;
      case 'diagnostics':
        return <Diagnostics patient={patient} />;
      case 'prescriptions':
        return <Prescriptions patient={patient} />;
      case 'meds':
        return <Medicines patient={patient} />;
      case 'insurance':
        return <Insurance patient={patient} />;
      case 'smart-devices':
        return <SmartDevices />;
      case 'hologram-trainer':
        return <HologramTrainer />;
       case 'need-help':
        return <NeedHelpHub />;
      default:
        return <PatientProfile patient={patient} />;
    }
  }

  const navItems = [
    { id: 'profile', icon: User, label: 'Profile' },
    { id: 'records', icon: FileText, label: 'Records' },
    { id: 'appointments', icon: Calendar, label: 'Appointments' },
    { id: 'vitals', icon: HeartPulse, label: 'Vitals' },
    { id: 'chat', icon: MessageCircle, label: 'Chat' },
    { id: 'ambulance', icon: Ambulance, label: 'Ambulance' },
    { id: 'doctors', icon: Stethoscope, label: 'Doctors' },
    { id: 'diagnostics', icon: Microscope, label: 'Diagnostics' },
    { id: 'prescriptions', icon: ClipboardList, label: 'Prescriptions' },
    { id: 'meds', icon: Pill, label: 'Medicines' },
    { id: 'insurance', icon: Shield, label: 'Insurance' },
    { id: 'smart-devices', icon: Smartphone, label: 'Smart Devices' },
    { id: 'hologram-trainer', icon: BrainCircuit, label: 'Hologram Trainer' },
    { id: 'need-help', icon: HelpCircle, label: 'Need Help' },
  ];

  const NavMenu = ({isSheet = false}: {isSheet?: boolean}) => (
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
                <Image src={`https://i.pravatar.cc/150?u=${patient.patientId}`} alt={patient.name} width={40} height={40} className="rounded-full border-2 border-primary/50"/>
                <div className="ml-3 group-data-[collapsible=icon]:hidden whitespace-nowrap overflow-hidden">
                <span className="font-semibold text-gradient-glow text-lg">{patient.name}</span>
                <p className="text-xs text-muted-foreground">{patient.patientId}</p>
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
                 <NavMenu isSheet={true}/>
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
        <PatientChatbot />
      </div>
    
  );
}

export default function PatientDashboardPage() {
  return (
    <Suspense fallback={<div className="w-full h-screen flex items-center justify-center"><p className="text-lg text-gradient-glow animate-pulse">Loading SupremeHealth Dashboard...</p></div>}>
       <SidebarProvider>
        <DashboardContent />
      </SidebarProvider>
    </Suspense>
  );
}
