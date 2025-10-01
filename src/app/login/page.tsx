
"use client";

import { Suspense, useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

const LoginForm = dynamic(() => import('@/components/auth/login-form').then(mod => mod.LoginForm), {
  ssr: false,
  loading: () => <div className="w-full max-w-md h-[580px] animate-pulse rounded-lg bg-card/50"></div>,
});


export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-background bg-grid-white/[0.05]">
       <div className="absolute pointer-events-none inset-0 flex items-center justify-center bg-background [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
      <Suspense fallback={<div className="w-full max-w-md h-[580px] animate-pulse rounded-lg bg-card/50"></div>}>
        <LoginForm />
      </Suspense>
    </div>
  );
}
