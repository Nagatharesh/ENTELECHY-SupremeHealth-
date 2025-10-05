
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { DollarSign, ExternalLink } from "lucide-react";
import Link from "next/link";

export function FundingHub() {
    return (
        <div className="space-y-6">
            <Card className="glassmorphism glowing-shadow">
                <CardHeader>
                    <CardTitle className="text-gradient-glow text-2xl">Funding & Research Grants</CardTitle>
                    <CardDescription>Explore opportunities to fund your next medical breakthrough.</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col items-center justify-center text-center p-8">
                    <p className="mb-6 text-muted-foreground">Access the official ICMR portal for research funding schemes and programs.</p>
                    <Button size="lg" className="glowing-shadow-interactive" asChild>
                        <Link href="https://www.icmr.gov.in/icmr-scheme-for-md-ms-phd-programme" target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="mr-2 h-5 w-5"/>
                            Fundraise
                        </Link>
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
}
