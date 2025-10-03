
"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, FileText, Send, CheckCircle, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

const statusConfig = {
    pending: { label: "Pending", color: "bg-yellow-500/20 text-yellow-400" },
    processing: { label: "Processing", color: "bg-blue-500/20 text-blue-400 animate-pulse" },
    completed: { label: "Completed", color: "bg-green-500/20 text-green-400" },
};

export function LabReportCenter({ hospitalData }) {
    const { labReports } = hospitalData;
    const { toast } = useToast();
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');

    const filteredReports = labReports.filter(report => {
        const termMatch = report.patientName.toLowerCase().includes(searchTerm.toLowerCase()) || report.reportId.toLowerCase().includes(searchTerm.toLowerCase());
        const statusMatch = statusFilter === 'all' || report.status === statusFilter;
        return termMatch && statusMatch;
    });

    const handleSend = (reportId) => {
        // In a real app, this would trigger a backend process
        toast({
            title: "Report Sent",
            description: `Report ${reportId} has been sent to the patient and doctor.`,
        });
    };
    
    const ReportView = ({ report }) => (
        <DialogContent className="glassmorphism max-w-2xl">
            <DialogHeader>
                <DialogTitle className="text-gradient-glow">{report.testName} Report</DialogTitle>
                <DialogDescription>
                    Report ID: {report.reportId} | Patient: {report.patientName}
                </DialogDescription>
            </DialogHeader>
            <div className="p-4 my-4 border rounded-lg border-dashed border-primary/30 bg-background/50">
                <h3 className="font-bold text-white mb-2">Simulated Report Details:</h3>
                <p className="text-sm text-muted-foreground">This is a placeholder for the actual lab report PDF. In a real application, this would embed or link to the official report document.</p>
                <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
                    <p><strong className="text-white">Hemoglobin:</strong> 14.5 g/dL</p>
                    <p><strong className="text-white">WBC Count:</strong> 7,500 /mcL</p>
                    <p><strong className="text-white">Platelets:</strong> 250,000 /mcL</p>
                    <p><strong className="text-white">Glucose:</strong> 98 mg/dL</p>
                </div>
            </div>
        </DialogContent>
    );

    return (
        <div className="space-y-6">
            <Card className="glassmorphism glowing-shadow">
                <CardHeader>
                    <CardTitle className="text-gradient-glow text-2xl">Lab Report Center</CardTitle>
                    <CardDescription>Manage and distribute lab reports efficiently.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex gap-4 mb-6">
                        <div className="relative flex-grow">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input 
                                placeholder="Search by Patient Name or Report ID..."
                                className="pl-10"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <Select value={statusFilter} onValueChange={setStatusFilter}>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Filter by status..." />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Statuses</SelectItem>
                                <SelectItem value="pending">Pending</SelectItem>
                                <SelectItem value="processing">Processing</SelectItem>
                                <SelectItem value="completed">Completed</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Report ID</TableHead>
                                <TableHead>Patient Name</TableHead>
                                <TableHead>Test Name</TableHead>
                                <TableHead>Date</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredReports.map(report => (
                                <TableRow key={report.reportId}>
                                    <TableCell className="font-mono text-white">{report.reportId}</TableCell>
                                    <TableCell>{report.patientName}</TableCell>
                                    <TableCell>{report.testName}</TableCell>
                                    <TableCell>{format(new Date(report.date), 'PPP')}</TableCell>
                                    <TableCell>
                                        <Badge className={statusConfig[report.status].color}>
                                            {statusConfig[report.status].label}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-right space-x-2">
                                        <Dialog>
                                            <DialogTrigger asChild>
                                                <Button variant="outline" size="sm"><FileText className="w-4 h-4 mr-1" /> View</Button>
                                            </DialogTrigger>
                                            <ReportView report={report} />
                                        </Dialog>
                                        <Button 
                                            size="sm" 
                                            disabled={report.status !== 'completed'}
                                            onClick={() => handleSend(report.reportId)}
                                            className="glowing-shadow-interactive"
                                        >
                                            <Send className="w-4 h-4 mr-1" /> Send
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}

    