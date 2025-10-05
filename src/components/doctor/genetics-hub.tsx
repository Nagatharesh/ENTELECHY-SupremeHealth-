"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dna, ExternalLink } from 'lucide-react';
import Link from 'next/link';

export function GeneticsHub() {
    return (
        <div className="space-y-6">
            <Card className="glassmorphism glowing-shadow">
                <CardHeader>
                     <div className="flex justify-between items-center">
                        <div>
                            <CardTitle className="text-gradient-glow text-2xl flex items-center gap-2"><Dna />Genetics Hub</CardTitle>
                            <CardDescription>Explore detailed genetic insights and analytics.</CardDescription>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="flex flex-col items-center justify-center text-center p-8">
                    <p className="mb-6 text-muted-foreground">Launch the external genetics analysis portal to view detailed patient DNA data.</p>
                     <Button asChild size="lg" className="glowing-shadow-interactive">
                       <Link href="https://gxjr7jwn-3000.inc1.devtunnels.ms/" target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="mr-2 h-4 w-4" />
                            View Genetics
                        </Link>
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
}
