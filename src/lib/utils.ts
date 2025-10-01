import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { format } from 'date-fns';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function generatePatientId() {
  const today = new Date();
  const datePart = format(today, 'yyyyMMdd');
  const randomPart = Math.floor(1000 + Math.random() * 9000).toString();
  return `PAT-${datePart}-${randomPart}`;
}
