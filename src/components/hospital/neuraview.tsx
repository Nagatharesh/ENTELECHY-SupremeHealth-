
"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Expand } from 'lucide-react';

export function NeuraView({ hospitalData, onNavigate }) {
    const handleLaunch = () => {
        window.open('https://good-warm-01610428.figma.site', '_blank', 'noopener,noreferrer');
    };

    return (
        <div className="space-y-6">
            <Card className="glassmorphism glowing-shadow">
                <CardHeader>
                    <CardTitle className="text-gradient-glow text-2xl">NeuraView - 3D Facility Management</CardTitle>
                    <CardDescription>Launch the interactive 3D model of the hospital campus to monitor live status, alerts, and resource allocation.</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col items-center justify-center text-center p-8">
                    <p className="mb-6 text-muted-foreground">Launch the interactive 3D model of the hospital campus to monitor live status, alerts, and resource allocation.</p>
                    <Button size="lg" className="glowing-shadow-interactive" onClick={handleLaunch}>
                        <Expand className="mr-2 h-5 w-5"/>
                        Launch NeuraView
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
}
