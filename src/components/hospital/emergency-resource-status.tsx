
"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// This component now acts as a placeholder for a more advanced 3D visualization.
// The structure below is designed to be replaced or enhanced with a library like Three.js.

export function EmergencyResourceStatus({ hospitalData }) {
    const { facilities } = hospitalData.hospitalInfo;

    // Dummy data for display purposes
    const resources = {
        traumaRooms: [
            { name: "Trauma Room 1", status: "Occupied" },
            { name: "Trauma Room 2", status: "Occupied" },
            { name: "Trauma Room 3", status: "Available" },
        ],
        orAvailability: [
            { name: "Emergency OR 1", status: "In Use" },
            { name: "Emergency OR 2", status: "Ready" },
        ],
        staffStatus: [
            { name: "Emergency Physicians", active: 6, total: 6 },
            { name: "Trauma Nurses", active: 11, total: 12 },
        ]
    };

    const getStatusColor = (status: string) => {
        switch (status.toLowerCase()) {
            case 'occupied':
            case 'in use':
                return 'text-red-500';
            case 'available':
            case 'ready':
                return 'text-green-500';
            default:
                return 'text-white';
        }
    };

    return (
        <div className="space-y-6">
            <Card className="glassmorphism glowing-shadow">
                <CardHeader>
                    <div className="flex justify-between items-center">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 flex-grow">
                            <div>
                                <h3 className="font-semibold text-white">Emergency Resource Status</h3>
                                <ul className="text-sm text-muted-foreground">
                                    {resources.traumaRooms.map(room => (
                                        <li key={room.name} className="flex justify-between">
                                            <span>{room.name}</span>
                                            <span className={cn("font-bold", getStatusColor(room.status))}>{room.status}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div>
                                <h3 className="font-semibold text-white">OR Availability</h3>
                                <ul className="text-sm text-muted-foreground">
                                    {resources.orAvailability.map(or => (
                                        <li key={or.name} className="flex justify-between">
                                            <span>{or.name}</span>
                                            <span className={cn("font-bold", getStatusColor(or.status))}>{or.status}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                             <div>
                                <h3 className="font-semibold text-white">Staff Status</h3>
                                <ul className="text-sm text-muted-foreground">
                                    {resources.staffStatus.map(staff => (
                                        <li key={staff.name} className="flex justify-between">
                                            <span>{staff.name}</span>
                                            <span className="font-bold text-white">{staff.active}/{staff.total} Active</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                         <div className="ml-8">
                            <Button className="glowing-shadow-interactive">Triage Assignment</Button>
                        </div>
                    </div>
                </CardHeader>
            </Card>

            <div id="threejs-canvas-container" className="w-full h-[60vh] bg-background/50 rounded-lg border-2 border-dashed border-primary/30 flex items-center justify-center">
                <p className="text-2xl text-muted-foreground animate-pulse">Loading 3D Emergency Room View...</p>
            </div>
        </div>
    );
}
