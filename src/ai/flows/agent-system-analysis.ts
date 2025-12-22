'use server';
/**
 * @fileOverview This file implements the Genkit flow for the AI Command Center.
 * This flow acts as a master "AI agent" that analyzes the overall hospital system state.
 *
 * @file systemAnalysisFlow - A function that analyzes dummy hospital data and returns insights.
 * @file SystemAnalysisInput - The input type for the systemAnalysisFlow function.
 * @file SystemAnalysisOutput - The return type for the systemAnalysisFlow function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import { dummyHospitalData } from '@/lib/dummy-data';

// Define schemas for structured input and output
const SystemAnalysisInputSchema = z.object({
  // In a real scenario, you might pass specific queries or filters
  timestamp: z.string().describe("The timestamp of the analysis request."),
});
export type SystemAnalysisInput = z.infer<typeof SystemAnalysisInputSchema>;

const SystemAnalysisOutputSchema = z.object({
  agents: z.array(z.object({
    name: z.string().describe("Name of the AI agent."),
    status: z.enum(['Idle', 'Processing', 'Alert']).describe("Current status of the agent."),
    task: z.string().describe("Current task the agent is performing."),
  })).describe("Status of various AI agents."),
  resourceUsage: z.object({
    cpu: z.number().describe("Simulated CPU usage percentage."),
    memory: z.number().describe("Simulated Memory usage percentage."),
    network: z.number().describe("Simulated Network usage percentage."),
  }).describe("Simulated system resource usage."),
  taskQueue: z.array(z.object({
    taskId: z.string().describe("Unique ID for the task."),
    description: z.string().describe("Description of the task."),
    priority: z.enum(['High', 'Medium', 'Low']).describe("Priority of the task."),
    status: z.enum(['Queued', 'In Progress', 'Completed']).describe("Status of the task."),
  })).describe("List of tasks being managed by the AI OS."),
  recommendations: z.array(z.string()).describe("A list of proactive recommendations based on the analysis."),
});
export type SystemAnalysisOutput = z.infer<typeof SystemAnalysisOutputSchema>;

// The main exported function that the UI will call
export async function analyzeSystem(input: SystemAnalysisInput): Promise<SystemAnalysisOutput> {
  return systemAnalysisFlow(input);
}

// Define the prompt for the AI model
const prompt = ai.definePrompt({
  name: 'systemAnalysisPrompt',
  input: { schema: z.object({ 
    livePatientCount: z.number(),
    bedOccupancyRate: z.number(),
    activeAlerts: z.number(),
    staffMembers: z.string(),
    facilities: z.string(),
  }) },
  output: { schema: SystemAnalysisOutputSchema },
  prompt: `You are an AI Operating System's core analysis agent for SupremeHealth.
  Analyze the provided real-time hospital data snapshot.
  Based on this data, generate a list of proactive recommendations and a prioritized task list for other AI agents to execute.
  Simulate the status of other agents (e.g., Patient Monitoring, Resource Allocation, Predictive Maintenance).
  Simulate system resource usage based on the current workload.

  Hospital Data:
  - Live Patient Count: {{{livePatientCount}}}
  - Bed Occupancy: {{{bedOccupancyRate}}}%
  - Active Alerts: {{{activeAlerts}}}
  - Staff Stress Levels: {{{staffMembers}}}
  - Facility Status: {{{facilities}}}

  Generate a response that includes agent statuses, simulated resource usage, a task queue, and actionable recommendations.
  For example, if staff stress is high, recommend re-allocating resources. If bed occupancy is high, prioritize patient discharge workflows.
  If a facility system like Oxygen is low, create a high-priority task for the maintenance agent.
  `,
});

// Define the Genkit flow
const systemAnalysisFlow = ai.defineFlow(
  {
    name: 'systemAnalysisFlow',
    inputSchema: SystemAnalysisInputSchema,
    outputSchema: SystemAnalysisOutputSchema,
  },
  async () => {
    // In a real app, you would fetch live data here. For this simulation, we use dummy data.
    const analysisData = dummyHospitalData;

    // Call the AI model with the data
    const { output } = await prompt({ 
        livePatientCount: analysisData.analytics.livePatientCount,
        bedOccupancyRate: analysisData.analytics.bedOccupancyRate,
        activeAlerts: analysisData.analytics.activeAlerts,
        staffMembers: JSON.stringify(analysisData.staff.members),
        facilities: JSON.stringify(analysisData.hospitalInfo.facilities),
     });
    return output!;
  }
);
