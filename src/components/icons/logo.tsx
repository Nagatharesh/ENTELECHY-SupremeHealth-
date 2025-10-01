import type { HTMLAttributes } from "react";

export function Logo(props: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className="flex items-center justify-center" {...props}>
      <svg
        width="36"
        height="36"
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="transform-gpu transition-transform duration-300 group-hover:scale-110"
      >
        <defs>
          <linearGradient id="logo-gradient" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="hsl(var(--accent))" />
            <stop offset="100%" stopColor="hsl(var(--primary))" />
          </linearGradient>
        </defs>
        <path
          d="M24 4C12.9543 4 4 12.9543 4 24C4 35.0457 12.9543 44 24 44C35.0457 44 44 35.0457 44 24"
          stroke="url(#logo-gradient)"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
          pathLength="1"
          strokeDasharray="1"
          strokeDashoffset="0"
          className="animate-pulse"
        />
        <path
          d="M24 16V32"
          stroke="url(#logo-gradient)"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M16 24H32"
          stroke="url(#logo-gradient)"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span className="ml-3 text-2xl font-bold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-accent to-primary">
        SupremeHealth
      </span>
    </div>
  );
}
