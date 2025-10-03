
"use client";

import React from 'react';
import { doctorDashboardData } from '@/lib/dummy-data';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Users, CheckCircle, Clock, MessageSquare, Phone, User, Calendar, Watch } from 'lucide-react';
import { format, parseISO } from 'date-fns';
import { cn } from '@/lib/utils';
import Image from 'next/image';

const statusStyles = {
  booked: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
  completed: "bg-green-500/20 text-green-400 border-green-500/30",
  cancelled: "bg-red-500/20 text-red-400 border-red-500/30",
};

const StatCard = ({ label, value, icon: Icon, subValue, subLabel }: { label: string; value: string | number; icon: React.ElementType; subValue?: string | number; subLabel?: string }) => (
    <div className="glassmorphism p-6 rounded-lg text-center transform transition-transform hover:-translate-y-2 hover:shadow-primary/30 shadow-lg">
        <Icon className="w-10 h-10 text-primary mx-auto mb-3" />
        <p className="text-4xl font-bold text-gradient-glow">{value}</p>
        <p className="text-sm text-muted-foreground">{label}</p>
        {subValue && (
            <p className="text-xs text-muted-foreground mt-1">{subValue} {subLabel}</p>
        )}
    </div>
);

export function PatientListDashboard() {
    const { doctorInfo, patients, analyticsSummary, uiHints, flags } = doctorDashboardData.doctorPatientDashboardData;

    return (
        <div className="space-y-8">
            <Card className="glassmorphism glowing-shadow">
                 <CardHeader>
                    <div className="flex justify-between items-center">
                        <div>
                            <CardTitle className="text-3xl font-bold text-gradient-glow">Patient Dashboard</CardTitle>
                            <CardDescription>Dr. {doctorInfo.fullName} - {doctorInfo.specialty}</CardDescription>
                        </div>
                        {uiHints.displayDoctorWorkingHours && (
                            <div className="text-right">
                                <p className="text-white flex items-center gap-2"><Watch className="w-4 h-4 text-primary" /> Working Hours</p>
                                <p className="text-sm text-muted-foreground">{doctorInfo.workingHours.startTime} - {doctorInfo.workingHours.endTime}</p>
                            </div>
                        )}
                    </div>
                </CardHeader>
            </Card>

            <div className="grid grid-cols-2 lg:grid-cols-5 gap-6">
                <StatCard label="Total Patients Today" value={analyticsSummary.totalPatientsToday} icon={Users} />
                <StatCard label="Completed" value={patients.filter(p => p.status === 'completed').length} icon={CheckCircle} />
                <StatCard label="Waiting" value={patients.filter(p => p.status === 'booked').length} icon={Clock} />
                <StatCard label="Messages" value={analyticsSummary.totalMessages} icon={MessageSquare} />
                <StatCard label="Calls" value={analyticsSummary.totalCalls} icon={Phone} />
            </div>

            <Card className="glassmorphism glowing-shadow">
                <CardHeader>
                    <CardTitle className="text-gradient-glow">Today's Appointments</CardTitle>
                </CardHeader>
                <CardContent>
                    <ScrollArea className="h-[50vh]">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    {uiHints.showTokenOrder && <TableHead>Token</TableHead>}
                                    <TableHead>Patient</TableHead>
                                    <TableHead>Time</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Contact</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {patients.map(patient => (
                                    <TableRow key={patient.patientId} className={cn(uiHints.highlightNextAppointment && patient.tokenNumber === 2 ? 'bg-primary/20 animate-pulse' : '')}>
                                        {uiHints.showTokenOrder && <TableCell className="font-bold text-2xl text-primary">#{patient.tokenNumber}</TableCell>}
                                        <TableCell>
                                            <div className="flex items-center gap-3">
                                                {flags.placeholderPhotos && <Image src={`https://via.placeholder.com/40?text=${patient.fullName.charAt(0)}`} alt={patient.fullName} width={40} height={40} className="rounded-full" />}
                                                <div>
                                                    <p className="font-semibold text-white">{patient.fullName}</p>
                                                    <p className="text-xs text-muted-foreground">{patient.age}, {patient.gender}</p>
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex flex-col">
                                                 <span className="font-mono">{patient.appointmentTime.start} - {patient.appointmentTime.end}</span>
                                                 <span className="text-xs text-muted-foreground">{format(parseISO(patient.appointmentDate), "do MMM yyyy")}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <Badge className={cn(uiHints.colorCodeByStatus && statusStyles[patient.status], "capitalize")}>{patient.status}</Badge>
                                        </TableCell>
                                        <TableCell>
                                             <div className="text-xs space-y-1">
                                                <p className="flex items-center gap-1"><MessageSquare className="w-3 h-3"/> {patient.messagesCount} msgs</p>
                                                <p className="flex items-center gap-1"><Phone className="w-3 h-3"/> {patient.callsCount} calls</p>
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            {uiHints.showCallAndMessageButtons && (
                                                <div className="flex gap-2 justify-end">
                                                    <Button size="sm" variant="outline"><MessageSquare /></Button>
                                                    <Button size="sm" variant="outline"><Phone /></Button>
                                                </div>
                                            )}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </ScrollArea>
                </CardContent>
            </Card>
        </div>
    );
}
