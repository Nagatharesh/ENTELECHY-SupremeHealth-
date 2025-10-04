
"use client";

import { Suspense } from 'react';
import { AmbulanceDashboard } from '@/components/ambulance/ambulance-dashboard';

export default function AmbulanceDashboardPage() {
  return (
    <Suspense fallback={<div className="w-full h-screen flex items-center justify-center"><p className="text-lg text-gradient-glow animate-pulse">Loading Ambulance Dashboard...</p></div>}>
      <AmbulanceDashboard />
    </Suspense>
  );
}
