"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Logo } from "@/components/icons/logo";
import { cn } from "@/lib/utils";

export function SplashScreen() {
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const redirectTimer = setTimeout(() => {
      setIsExiting(true);
    }, 2500); // Start exit animation
    
    const navigationTimer = setTimeout(() => {
      router.push("/home");
    }, 3500); // Navigate after exit animation

    return () => {
      clearTimeout(redirectTimer);
      clearTimeout(navigationTimer);
    };
  }, [router]);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-background overflow-hidden">
      {/* Background animations */}
      <div className="absolute inset-0 z-0">
        <div className="absolute -top-1/4 -left-1/4 w-1/2 h-1/2 rounded-full bg-primary/10 blur-3xl animate-pulse" />
        <div className="absolute -bottom-1/4 -right-1/4 w-1/2 h-1/2 rounded-full bg-secondary/10 blur-3xl animate-pulse animation-delay-2000" />
      </div>

      {/* Animated Logo */}
      <div
        className={cn(
          "z-10 transition-all duration-1000 ease-in-out",
          isMounted ? "scale-100 opacity-100" : "scale-0 opacity-0",
          isExiting && "scale-[300%] opacity-0"
        )}
      >
        <Logo animated={true} />
      </div>

      <style jsx>{`
        .animation-delay-2000 {
          animation-delay: 2s;
        }
      `}</style>
    </div>
  );
}
