"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { FileText, TestTube, Pill } from "lucide-react";
import { Patient } from "@/lib/dummy-data";

type MedicalRecords = Patient["medicalRecords"];

const RecordIcon = ({ type }: { type: string }) => {
    switch (type.toLowerCase()) {
        case "consultation":
            return <FileText className="w-5 h-5 text-primary" />;
        case "lab test":
            return <TestTube className="w-5 h-5 text-secondary" />;
        case "prescription":
            return <Pill className="w-5 h-5 text-tertiary" />;
        default:
            return <FileText className="w-5 h-5 text-primary" />;
    }
}

export function MedicalRecordsTimeline({ records }: { records: MedicalRecords }) {
  const sortedRecords = [...records].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <Card className="glassmorphism glowing-shadow">
      <CardHeader>
        <CardTitle className="text-gradient-glow">Medical History</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-72">
          <div className="relative pl-6">
            {/* Timeline Line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-border -translate-x-1/2"></div>
            
            {sortedRecords.map((record, index) => (
              <div key={index} className="mb-8 relative">
                <div className="absolute left-8 -translate-x-1/2 mt-1.5 h-4 w-4 rounded-full bg-primary ring-4 ring-background z-10"></div>
                <div className="ml-8">
                  <div className="flex items-center gap-3">
                    <RecordIcon type={record.type} />
                    <p className="text-sm font-semibold text-white">{record.type}</p>
                    <span className="text-xs text-muted-foreground">{new Date(record.date).toLocaleDateString()}</span>
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">{record.details}</p>
                  <p className="text-xs mt-1 text-muted-foreground/50">with {record.doctor}</p>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
