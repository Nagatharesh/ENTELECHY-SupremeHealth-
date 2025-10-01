import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface LogoProps extends HTMLAttributes<HTMLDivElement> {
  animated?: boolean;
}

export function Logo({ className, animated = false, ...props }: LogoProps) {
  return (
    <div className={cn("flex items-center justify-center group", className)} {...props}>
      <svg
        width={animated ? "80" : "40"}
        height={animated ? "80" : "40"}
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={cn(
          "transform-gpu transition-transform duration-500",
          !animated && "group-hover:scale-110",
          animated && "animate-logo-rotate"
        )}
      >
        <defs>
          <linearGradient id="logo-gradient-primary" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(var(--primary))" />
            <stop offset="100%" stopColor="hsl(var(--tertiary))" />
          </linearGradient>
          <linearGradient id="logo-gradient-secondary" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="hsl(var(--secondary))" />
            <stop offset="100%" stopColor="hsl(var(--accent))" />
          </linearGradient>
          <filter id="logo-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        
        <circle cx="24" cy="24" r="22" fill="none" stroke="hsl(var(--primary) / 0.3)" strokeWidth="1" />
        <circle 
          cx="24" 
          cy="24" 
          r="20" 
          fill="url(#logo-gradient-primary)" 
          className="opacity-80" 
          filter="url(#logo-glow)" 
        />
        
        <path
          d="M10 24 H 16 L 20 18 L 28 30 L 32 24 H 38"
          stroke="url(#logo-gradient-secondary)"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={cn(animated ? "animate-heartbeat-glow" : "animate-[pulse_2s_ease-in-out_infinite]")}
          style={{ filter: 'drop-shadow(0 0 4px hsl(var(--secondary)))' }}
        />
        
        <path d="M24 20 V 28 M20 24 H 28" stroke="white" strokeWidth="3" strokeLinecap="round" className="animate-pulse" />
      </svg>
      <span className={cn(
        "ml-4 font-bold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-primary to-tertiary transition-all duration-300",
        !animated && "text-2xl group-hover:from-white group-hover:to-gray-300",
        animated ? "text-5xl font-orbitron" : "text-2xl",
      )}
            style={{ textShadow: `0 0 12px hsl(var(--primary)/${animated ? '1' : '0.7'})` }}>
        SupremeHealth
      </span>
    </div>
  );
}
