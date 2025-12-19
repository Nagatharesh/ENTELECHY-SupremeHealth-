import { config } from 'dotenv';
config();

import '@/ai/flows/doctor-patient-matching.ts';
import '@/ai/flows/medical-summarization-tool.ts';
import '@/ai/flows/send-lab-report-email.ts';
import '@/ai/flows/agent-system-analysis.ts';
