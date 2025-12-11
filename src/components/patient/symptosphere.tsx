
"use client";

import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Activity, ExternalLink } from "lucide-react";
import Link from "next/link";

// Dummy analytics data for this feature, as requested.
const symptosphereAnalytics = {
    totalPressCount: 1421,
    uniqueUsers: 893,
    avgSessionDuration: "00:03:11",
    geoHeatmap: ["IN", "SG", "AE", "CA"],
    buttonCTR: "87.4%"
};

// Logging function for the button press event.
const logPressEvent = () => {
    console.log("SYMPTOSPHERE button pressed. Current Analytics:", symptosphereAnalytics);
    // In a real scenario, this would dispatch an event to an analytics service.
};

export function Symptosphere() {
    
    const handlePress = () => {
        logPressEvent();
        window.open("https://five-spree-58190815.figma.site", "_blank", "noopener,noreferrer");
    };

    return (
        <div className="space-y-6">
            <Card className="glassmorphism glowing-shadow">
                <CardHeader className="text-center">
                    <div className="flex justify-center items-center gap-4 mb-4">
                        <Activity className="w-10 h-10 text-primary" />
                        <CardTitle className="text-gradient-glow text-4xl font-orbitron">SYMPTOSPHERE</CardTitle>
                    </div>
                    <CardDescription className="text-lg">AI-Driven Symptom Gateway</CardDescription>
                </CardHeader>
                <div className="h-[40vh] flex items-center justify-center p-8">
                    <div className="relative group">
                         <div 
                            className="absolute -inset-1 bg-gradient-to-r from-secondary to-accent rounded-full blur-xl opacity-70 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-glow-pulse"
                            style={{ animationDuration: '3s' }}
                        />
                        <Button 
                            onClick={handlePress}
                            className="relative w-48 h-48 rounded-full text-2xl font-bold text-white bg-gradient-to-br from-primary/80 to-secondary/80 border-2 border-primary/50 shadow-2xl shadow-primary/40 transition-all duration-300 transform group-hover:scale-110 group-hover:shadow-primary/80 group-active:scale-100"
                        >
                             <div className="absolute inset-0 rounded-full animate-ripple" style={{animationDuration: '1.5s'}} />
                            PRESS IT
                        </Button>
                    </div>
                </div>
            </Card>
        </div>
    );
}
