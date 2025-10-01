"use client";

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Logo } from '@/components/icons/logo';
import { Button } from '@/components/ui/button';
import { Home, User, Bell } from 'lucide-react';
import { dummyPatients, Patient } from '@/lib/dummy-data';
import { HealthSnapshot } from '@/components/patient/health-snapshot';
import { UpcomingAppointments } from '@/components/patient/upcoming-appointments';
import { MedicalRecordsTimeline } from '@/components/patient/medical-records';
import { QuickActions } from '@/components/patient/quick-actions';
import { VitalsChart } from '@/components/patient/vitals-chart';
import { PredictionCharts } from '@/components/patient/prediction-charts';
import { Card } from '@/components/ui/card';

function DashboardContent() {
  const searchParams = useSearchParams();
  const patientId = searchParams.get('id');

  const patient = dummyPatients.find(p => p.patientId === patientId);

  if (!patient) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-center">
        <h2 className="text-2xl font-bold text-destructive mb-4">Patient Not Found</h2>
        <p className="text-muted-foreground mb-8">The patient ID "{patientId}" does not exist in our records.</p>
        <Button asChild>
          <Link href="/login?role=patient">Return to Login</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="fixed top-0 left-0 right-0 z-50 glassmorphism">
        <div className="container mx-auto flex h-20 items-center justify-between px-4">
          <Link href="/home">
            <Logo />
          </Link>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1 right-1 flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
            </Button>
            <div className="flex items-center gap-2">
              <User className="h-5 w-5 text-primary"/>
              <span className="font-semibold text-gradient-glow">{patient.name}</span>
            </div>
            <Button asChild variant="outline">
              <Link href="/home"><Home className="mr-2"/> Home</Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-grow pt-24 pb-8 px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-fade-in-up">
          {/* Left Column */}
          <div className="lg:col-span-2 xl:col-span-3 space-y-6">
            <HealthSnapshot vitals={patient.vitals} />
            <Card className="glassmorphism p-4 md:p-6 glowing-shadow">
               <VitalsChart vitals={patient.vitals} predictions={patient.predictions.vitalsNext7Days} />
            </Card>
            <PredictionCharts predictions={patient.predictions} />
          </div>

          {/* Right Column */}
          <div className="lg:col-span-1 xl:col-span-1 space-y-6">
            <QuickActions patient={patient} />
            <UpcomingAppointments appointments={patient.appointments} />
            <MedicalRecordsTimeline records={patient.medicalRecords} />
          </div>
        </div>
      </main>
    </div>
  );
}

export default function PatientDashboardPage() {
  return (
    <Suspense fallback={<div className="w-full h-screen flex items-center justify-center"><p>Loading Dashboard...</p></div>}>
      <DashboardContent />
    </Suspense>
  );
}
