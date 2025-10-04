
"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { format, formatDistanceToNow } from 'date-fns';
import { History, FileText } from "lucide-react";

export function TripLogger({ logs }) {
    return (
        <Card className="glassmorphism">
            <CardHeader>
                <CardTitle className="text-white flex items-center gap-2"><History/>Trip Log</CardTitle>
                <CardDescription>Summary of your recent trips.</CardDescription>
            </CardHeader>
            <CardContent>
                <ScrollArea className="h-64">
                    <div className="space-y-4">
                        {logs.length > 0 ? logs.map(log => (
                            <div key={log.id} className="p-3 bg-background/50 rounded-lg">
                                <div className="flex justify-between items-center">
                                    <p className="font-semibold text-white">{log.patientName}</p>
                                    <p className="text-xs text-muted-foreground">{formatDistanceToNow(new Date(log.endTime), { addSuffix: true })}</p>
                                </div>
                                <p className="text-sm text-muted-foreground">From: {log.from}</p>
                                <p className="text-sm text-muted-foreground">To: {log.to}</p>
                                <Button variant="link" className="p-0 h-auto text-primary mt-1"><FileText className="mr-1 w-4 h-4"/>View Full Report</Button>
                            </div>
                        )) : (
                            <p className="text-center text-muted-foreground py-10">No trip history.</p>
                        )}
                    </div>
                </ScrollArea>
            </CardContent>
        </Card>
    );
}
