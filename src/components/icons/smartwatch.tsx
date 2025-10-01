
import type { SVGProps } from "react";
import { cn } from "@/lib/utils";

export function Smartwatch({ className, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("lucide lucide-smart-watch", className)}
      {...props}
    >
      <defs>
        <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: "hsl(var(--primary))", stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: "hsl(var(--secondary))", stopOpacity: 1 }} />
        </linearGradient>
      </defs>
      <rect width="16" height="16" x="4" y="4" rx="2" fill="url(#grad1)" fillOpacity="0.2" stroke="url(#grad1)" />
      <path d="M12 8v4l2 2" stroke="white" />
      <path d="M18 12h2" />
      <path d="M6 12H4" />
      <path d="M12 18v2" />
      <path d="M12 6V4" />
    </svg>
  );
}
