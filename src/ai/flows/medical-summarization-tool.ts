'use server';
/**
 * @fileOverview A medical summarization tool AI agent.
 *
 * - medicalSummarizationTool - A function that handles the summarization of a patient's medical history.
 * - MedicalSummarizationToolInput - The input type for the medicalSummarizationTool function.
 * - MedicalSummarizationToolOutput - The return type for the medicalSummarizationTool function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const MedicalSummarizationToolInputSchema = z.object({
  medicalHistory: z.string().describe('The patient medical history to summarize.'),
});
export type MedicalSummarizationToolInput = z.infer<typeof MedicalSummarizationToolInputSchema>;

const MedicalSummarizationToolOutputSchema = z.object({
  summary: z.string().describe('The summarized medical history of the patient.'),
});
export type MedicalSummarizationToolOutput = z.infer<typeof MedicalSummarizationToolOutputSchema>;

export async function medicalSummarizationTool(input: MedicalSummarizationToolInput): Promise<MedicalSummarizationToolOutput> {
  return medicalSummarizationToolFlow(input);
}

const prompt = ai.definePrompt({
  name: 'medicalSummarizationToolPrompt',
  input: {schema: MedicalSummarizationToolInputSchema},
  output: {schema: MedicalSummarizationToolOutputSchema},
  prompt: `You are an expert medical summarizer, and will provide a concise medical summary from a patient's medical history.

Medical History: {{{medicalHistory}}}`,
});

const medicalSummarizationToolFlow = ai.defineFlow(
  {
    name: 'medicalSummarizationToolFlow',
    inputSchema: MedicalSummarizationToolInputSchema,
    outputSchema: MedicalSummarizationToolOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
