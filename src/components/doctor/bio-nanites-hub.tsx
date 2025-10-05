
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Dna } from "lucide-react";

export function BioNanitesHub() {
    return (
        <div className="space-y-6">
            <Card className="glassmorphism glowing-shadow">
                <CardHeader>
                    <CardTitle className="text-gradient-glow text-2xl">Bio-nanites Hub</CardTitle>
                    <CardDescription>Monitor and control biological nanites for targeted therapies.</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col items-center justify-center text-center p-8">
                    <p className="mb-6 text-muted-foreground">Access the real-time monitoring and control interface for deployed biological nanites.</p>
                    <Button size="lg" className="glowing-shadow-interactive">
                        <Dna className="mr-2 h-5 w-5"/>
                        View Bio-nanites
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
}
