
"use client";

import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, FileText, Send, CheckCircle, Clock, Bot, AlertTriangle, FileDown } from "lucide-react";
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
import { BarChart, Bar, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { ChartContainer, ChartTooltipContent } from '@/components/ui/chart';
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { Separator } from "../ui/separator";


const statusConfig = {
    pending: { label: "Pending", color: "bg-yellow-500/20 text-yellow-400" },
    processing: { label: "Processing", color: "bg-blue-500/20 text-blue-400 animate-pulse" },
    completed: { label: "Completed", color: "bg-green-500/20 text-green-400" },
    critical: { label: "Critical", color: "bg-red-500/20 text-red-500 animate-pulse" }
};

const StatCard = ({ title, value, icon: Icon }) => (
    <Card className="glassmorphism p-4">
        <CardHeader className="p-0 flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
            <Icon className="w-4 h-4 text-primary" />
        </CardHeader>
        <CardContent className="p-0">
            <div className="text-2xl font-bold text-white">{value}</div>
        </CardContent>
    </Card>
);

export function LabReportCenter({ hospitalData }) {
    const { labReports } = hospitalData;
    const { toast } = useToast();
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');

    const filteredReports = useMemo(() => {
         return labReports.filter(report => {
            const termMatch = report.patientName.toLowerCase().includes(searchTerm.toLowerCase()) || report.reportId.toLowerCase().includes(searchTerm.toLowerCase());
            const statusMatch = statusFilter === 'all' || report.status === statusFilter || (statusFilter === 'critical' && report.critical);
            return termMatch && statusMatch;
        });
    }, [labReports, searchTerm, statusFilter]);

    const handleSend = (reportId) => {
        // In a real app, this would trigger a backend process
        toast({
            title: "Report Sent",
            description: `Report ${reportId} has been sent to the patient and doctor.`,
        });
    };

    const analytics = useMemo(() => {
        const total = labReports.length;
        const pending = labReports.filter(r => r.status === 'pending').length;
        const critical = labReports.filter(r => r.critical).length;
        const distribution = labReports.reduce((acc, report) => {
            const type = report.testName.includes('Blood') ? 'Hematology' : 'Chemistry';
            acc[type] = (acc[type] || 0) + 1;
            return acc;
        }, {});
        return {
            total,
            pending,
            critical,
            distribution: Object.entries(distribution).map(([name, value]) => ({ name, value }))
        };
    }, [labReports]);
    
    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                 <StatCard title="Total Reports" value={analytics.total} icon={FileText} />
                 <StatCard title="Pending Review" value={analytics.pending} icon={Clock} />
                 <StatCard title="Critical Alerts" value={analytics.critical} icon={AlertTriangle} />
                  <Card className="glassmorphism p-4 lg:col-span-1">
                    <CardHeader className="p-0 pb-2"><CardTitle className="text-sm font-medium text-muted-foreground">Report Distribution</CardTitle></CardHeader>
                    <CardContent className="p-0 h-16">
                        <ChartContainer config={{}} className="h-full w-full">
                            <ResponsiveContainer>
                                <BarChart data={analytics.distribution} layout="vertical" margin={{left: 10}}>
                                    <XAxis type="number" hide />
                                    <YAxis type="category" dataKey="name" hide />
                                    <Tooltip content={<ChartTooltipContent />} cursor={{fill: 'hsl(var(--primary)/0.1)'}} wrapperStyle={{ zIndex: 50}} />
                                    <Bar dataKey="value" stackId="a" fill="hsl(var(--primary))" radius={[4,4,4,4]} />
                                </BarChart>
                            </ResponsiveContainer>
                        </ChartContainer>
                    </CardContent>
                </Card>
            </div>

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
                                <SelectItem value="critical">Critical</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    
                    <div className="max-h-[60vh] overflow-y-auto">
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
                                    <TableRow key={report.reportId} className={report.critical ? 'border-l-4 border-destructive' : ''}>
                                        <TableCell className="font-mono text-white">{report.reportId}</TableCell>
                                        <TableCell>{report.patientName}</TableCell>
                                        <TableCell>{report.testName}</TableCell>
                                        <TableCell>{format(new Date(report.date), 'PPP')}</TableCell>
                                        <TableCell>
                                            <Badge className={statusConfig[report.status].color}>
                                                {statusConfig[report.status].label}
                                            </Badge>
                                            {report.critical && <Badge className="ml-2 bg-red-500/20 text-red-500">Critical</Badge>}
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
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

const ReportView = ({ report }) => {
    const isAbnormal = (value: number, range: string) => {
        const [min, max] = range.split('-').map(Number);
        return value < min || value > max;
    };

    return (
        <DialogContent className="glassmorphism max-w-4xl h-[90vh] flex flex-col">
            <DialogHeader>
                <DialogTitle className="text-gradient-glow text-2xl">{report.testName} Report</DialogTitle>
                <DialogDescription>
                    Report ID: {report.reportId} | Patient: {report.patientName} | Date: {format(new Date(report.date), 'PPP')}
                </DialogDescription>
            </DialogHeader>

            <div className="flex-grow grid grid-cols-1 md:grid-cols-3 gap-6 overflow-y-auto">
                <div className="md:col-span-2 space-y-4">
                    <Card className="glassmorphism p-4">
                        <CardTitle className="text-lg text-white mb-2">Patient & Specimen Details</CardTitle>
                        <div className="grid grid-cols-2 text-sm text-muted-foreground">
                            <p><strong>Patient:</strong> {report.patientName}</p>
                            <p><strong>Doctor:</strong> {report.doctor}</p>
                            <p><strong>Specimen:</strong> {report.specimenType}</p>
                             <p><strong>Collected:</strong> {format(new Date(report.collectionDate), 'Pp')}</p>
                        </div>
                    </Card>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Test</TableHead>
                                <TableHead>Result</TableHead>
                                <TableHead>Reference Range</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {report.results.map((res, index) => (
                                <TableRow key={index} className={isAbnormal(res.value, res.range) ? 'bg-destructive/10' : ''}>
                                    <TableCell className="font-medium text-white">{res.test}</TableCell>
                                    <TableCell className={`font-mono font-bold ${isAbnormal(res.value, res.range) ? 'text-destructive' : 'text-white'}`}>{res.value} {res.unit}</TableCell>
                                    <TableCell className="font-mono text-muted-foreground">{res.range} {res.unit}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
                 <div className="space-y-4">
                    <Card className="glassmorphism p-4 sticky top-0 glowing-shadow">
                        <CardHeader className="p-0 mb-2">
                             <CardTitle className="text-lg text-white flex items-center gap-2"><Bot/>AI Assistant</CardTitle>
                        </CardHeader>
                        <CardContent className="p-0">
                            {report.critical && (
                                 <Alert variant="destructive" className="mb-4">
                                    <AlertTriangle className="h-4 w-4" />
                                    <AlertTitle>Critical Value Detected!</AlertTitle>
                                    <AlertDescription>{report.aiSummary.split('. ')[0]}.</AlertDescription>
                                </Alert>
                            )}
                            <p className="text-sm text-muted-foreground">{report.aiSummary}</p>
                        </CardContent>
                    </Card>
                </div>
            </div>

             <DialogFooter className="mt-4">
                <Button variant="outline" className="glowing-shadow-interactive"><FileDown className="mr-2"/>Download PDF</Button>
            </DialogFooter>
        </DialogContent>
    );
};
