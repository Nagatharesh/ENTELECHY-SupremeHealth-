'use server';

/**
 * @fileOverview This file implements the Genkit flow for the AutomatedDoctorPatientMatchingTool story.
 *
 * The flow suggests potential doctors for a patient based on their medical history and current needs.
 *
 * @file DoctorPatientMatchingFlow - A function that suggests doctors for a patient.
 * @file DoctorPatientMatchingInput - The input type for the DoctorPatientMatchingFlow function.
 * @file DoctorPatientMatchingOutput - The return type for the DoctorPatientMatchingFlow function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const DoctorPatientMatchingInputSchema = z.object({
  patientMedicalHistory: z
    .string()
    .describe('The patient medical history.'),
  patientCurrentNeeds: z
    .string()
    .describe('The patient current needs.'),
});

export type DoctorPatientMatchingInput = z.infer<
  typeof DoctorPatientMatchingInputSchema
>;

const DoctorPatientMatchingOutputSchema = z.object({
  suggestedDoctors: z
    .array(z.string())
    .describe('A list of suggested doctors.'),
  reasoning: z
    .string()
    .describe('The reasoning behind the doctor suggestions.'),
});

export type DoctorPatientMatchingOutput = z.infer<
  typeof DoctorPatientMatchingOutputSchema
>;

export async function matchDoctorToPatient(
  input: DoctorPatientMatchingInput
): Promise<DoctorPatientMatchingOutput> {
  return doctorPatientMatchingFlow(input);
}

const prompt = ai.definePrompt({
  name: 'doctorPatientMatchingPrompt',
  input: {schema: DoctorPatientMatchingInputSchema},
  output: {schema: DoctorPatientMatchingOutputSchema},
  prompt: `You are an expert medical assistant. Based on the patient's medical history and current needs, suggest a list of doctors who would be best suited to treat the patient. Provide also reasoning for each doctor suggestion.

Patient Medical History: {{{patientMedicalHistory}}}

Patient Current Needs: {{{patientCurrentNeeds}}}

Format your output as a JSON object with 'suggestedDoctors' (an array of doctor names) and 'reasoning' (the reasoning behind the suggestions).`,
});

const doctorPatientMatchingFlow = ai.defineFlow(
  {
    name: 'doctorPatientMatchingFlow',
    inputSchema: DoctorPatientMatchingInputSchema,
    outputSchema: DoctorPatientMatchingOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
