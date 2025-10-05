
"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Expand } from 'lucide-react';

export function NeuraView({ hospitalData, onNavigate }) {
    return (
        <div className="space-y-6">
            <Card className="glassmorphism glowing-shadow">
                <CardHeader>
                    <CardTitle className="text-gradient-glow text-2xl">NeuraView - 3D Facility Management</CardTitle>
                    <CardDescription>Launch the interactive 3D model of the hospital campus to monitor live status, alerts, and resource allocation.</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col items-center justify-center text-center p-8">
                    <p className="mb-6 text-muted-foreground">Click the button below to open the full-screen interactive 3D view of the hospital facilities.</p>
                    <Button size="lg" className="glowing-shadow-interactive" onClick={() => onNavigate('facilities')}>
                        <Expand className="mr-2 h-5 w-5"/>
                        Launch 3D Campus View
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
}
