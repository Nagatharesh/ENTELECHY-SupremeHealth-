"use client";

import { Suspense, useState } from 'react';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Logo } from '@/components/icons/logo';
import { Button } from '@/components/ui/button';
import { User, Bell, PanelLeft, Building, Users, FlaskConical, AlertTriangle, BarChart3, BedDouble, DollarSign, Calendar } from 'lucide-react';
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

import { dummyHospitalData } from '@/lib/dummy-data';
import { HospitalOverview } from '@/components/hospital/hospital-overview';
import { FacilitiesManagement } from '@/components/hospital/facilities-management';
import { StaffManagement } from '@/components/hospital/staff-management';
import { LabReportCenter } from '@/components/hospital/lab-report-center';
import { SafetyAndAlerts } from '@/components/hospital/safety-and-alerts';
import { EmergencyResourceStatus } from '@/components/hospital/emergency-resource-status';
import { ReportsAndAnalytics } from '@/components/hospital/reports-and-analytics';
import { StaffScheduling } from '@/components/hospital/staff-scheduling';

function DashboardContent() {
  const searchParams = useSearchParams();
  const hospitalId = searchParams.get('id') || 'HOS-001'; // Default for demo
  const [activeView, setActiveView] = useState('overview');

  const hospitalData = dummyHospitalData; // Using the main dummy data object

  if (!hospitalData || hospitalData.hospitalInfo.hospitalId !== hospitalId) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-center p-4">
        <h2 className="text-2xl font-bold text-destructive mb-4">Hospital Not Found</h2>
        <p className="text-muted-foreground mb-8 max-w-md">The hospital ID provided does not exist. Please login again.</p>
        <Button asChild>
          <Link href="/login?role=hospital">Return to Login</Link>
        </Button>
      </div>
    );
  }
  
  const renderContent = () => {
    switch(activeView) {
      case 'overview':
        return <HospitalOverview hospitalData={hospitalData} />;
      case 'facilities':
        return <FacilitiesManagement hospitalData={hospitalData} />;
      case 'emergency-resources':
        return <EmergencyResourceStatus hospitalData={hospitalData} />;
      case 'staff':
        return <StaffManagement hospitalData={hospitalData} />;
       case 'scheduling':
        return <StaffScheduling />;
      case 'labs':
        return <LabReportCenter hospitalData={hospitalData} />;
      case 'safety':
        return <SafetyAndAlerts hospitalData={hospitalData} />;
      case 'analytics':
        return <ReportsAndAnalytics hospitalData={hospitalData} />;
      default:
        return <HospitalOverview hospitalData={hospitalData} />;
    }
  }

  const navItems = [
    { id: 'overview', icon: BarChart3, label: 'Overview' },
    { id: 'facilities', icon: Building, label: 'Facilities' },
    { id: 'emergency-resources', icon: BedDouble, label: 'Emergency Resources' },
    { id: 'staff', icon: Users, label: 'Staff Management' },
    { id: 'scheduling', icon: Calendar, label: 'Staff Scheduling' },
    { id: 'labs', icon: FlaskConical, label: 'Lab Center' },
    { id: 'safety', icon: AlertTriangle, label: 'Safety & Alerts' },
    { id: 'analytics', icon: DollarSign, label: 'Reports & Analytics' },
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
                <Image src="https://i.pravatar.cc/150?u=hospital-admin" alt={hospitalData.hospitalInfo.name} width={40} height={40} className="rounded-full border-2 border-primary/50"/>
                <div className="ml-3 group-data-[collapsible=icon]:hidden whitespace-nowrap overflow-hidden">
                <span className="font-semibold text-gradient-glow text-lg">{hospitalData.hospitalInfo.name}</span>
                <p className="text-xs text-muted-foreground">Admin Dashboard</p>
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
      </div>
    
  );
}

export default function HospitalDashboardPage() {
  return (
    <Suspense fallback={<div className="w-full h-screen flex items-center justify-center"><p className="text-lg text-gradient-glow animate-pulse">Loading SupremeHealth Hospital Dashboard...</p></div>}>
      <DashboardContent />
    </Suspense>
  );
}
