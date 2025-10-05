"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { BrainCircuit } from "lucide-react";
import Link from "next/link";

export function HologramTrainer() {
    return (
        <div className="space-y-6">
            <Card className="glassmorphism glowing-shadow">
                <CardHeader>
                    <CardTitle className="text-gradient-glow text-2xl">Hologram Trainer</CardTitle>
                    <CardDescription>Engage with AI-driven holographic guides for rehabilitation and medical education.</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col items-center justify-center text-center p-8">
                    <p className="mb-6 text-muted-foreground">Launch the interactive holographic training simulation to guide you through your prescribed exercises or learn about your condition.</p>
                    <Button size="lg" className="glowing-shadow-interactive" asChild>
                        <Link href="https://driver-shield-54053563.figma.site" target="_blank" rel="noopener noreferrer">
                            <BrainCircuit className="mr-2 h-5 w-5"/>
                            Open Hologram Link
                        </Link>
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
}
