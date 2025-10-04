
"use client";

import { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { User, Clock, Coffee, Send, BrainCircuit, BarChart, Bot, Search, Users, Stethoscope, Briefcase, AlertCircle, Eye, Calendar, MessageSquare, ChevronDown, ChevronUp } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from '@/lib/utils';


// --- Enriched Dummy Data ---
const dummyPeopleData = {
    patients: [
        { id: 'P001', name: 'Anitha', age: 45, ward: 'Room 302', doctor: 'Dr. Rajesh', status: 'Stable', oxygen: 97 },
        { id: 'P002', name: 'Karthik', age: 63, ward: 'ICU-2', doctor: 'Dr. Meena', status: 'Critical', oxygen: 85 },
        { id: 'P003', name: 'Suresh', age: 55, ward: 'Ward A', doctor: 'Dr. Rajesh', status: 'Under Observation', oxygen: 94 },
    ],
    doctors: [
        { id: 'D001', name: 'Dr. Rajesh', department: 'Cardiology', hours: '9AM–5PM', contact: '9876543210', availability: 'Available' },
        { id: 'D002', name: 'Dr. Meena', department: 'Neurology', hours: '10AM–6PM', contact: '9876501234', availability: 'Busy' },
        { id: 'D003', name: 'Dr. Kumar', department: 'Pediatrics', hours: '8AM–4PM', contact: '9876501235', availability: 'Available' },
    ],
    staff: [
        { id: 'S001', name: 'Priya', role: 'Nurse', shift: 'Night', department: 'ICU', contact: '9876003211', status: 'On Duty' },
        { id: 'S002', name: 'John', role: 'Cleaner', shift: 'Morning', department: 'Ward-A', contact: '9876012234', status: 'Off Duty' },
        { id: 'S003', name: 'Maria', role: 'Technician', shift: 'Afternoon', department: 'Radiology', contact: '9876012235', status: 'On Duty' },
    ]
};

// --- Main Component ---
export function StaffManagement({ hospitalData }) {
    return (
        <div className="space-y-6">
            <Card className="glassmorphism glowing-shadow">
                <CardHeader>
                    <CardTitle className="text-gradient-glow text-2xl">People Management Hub</CardTitle>
                    <CardDescription>A real-time dashboard for monitoring patients, doctors, and staff.</CardDescription>
                </CardHeader>
            </Card>

            <Tabs defaultValue="patients" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="patients"><Users className="mr-2"/>Patients</TabsTrigger>
                    <TabsTrigger value="doctors"><Stethoscope className="mr-2"/>Doctors</TabsTrigger>
                    <TabsTrigger value="staff"><Briefcase className="mr-2"/>Staff</TabsTrigger>
                </TabsList>
                <TabsContent value="patients">
                    <PatientsSection />
                </TabsContent>
                <TabsContent value="doctors">
                    <DoctorsSection />
                </TabsContent>
                <TabsContent value="staff">
                    <StaffSection />
                </TabsContent>
            </Tabs>
        </div>
    );
}

// --- Patients Section ---
function PatientsSection() {
    const [searchTerm, setSearchTerm] = useState('');
    const filteredPatients = useMemo(() => {
        return dummyPeopleData.patients.filter(p => 
            p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
            p.id.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [searchTerm]);

    const getStatusConfig = (status) => {
        switch(status) {
            case 'Stable': return { color: 'bg-green-500/20 text-green-400', icon: CheckCircle };
            case 'Under Observation': return { color: 'bg-yellow-500/20 text-yellow-400', icon: Eye };
            case 'Critical': return { color: 'bg-red-500/20 text-red-500', icon: AlertCircle };
            default: return { color: 'bg-gray-500/20 text-gray-400', icon: User };
        }
    };

    return (
        <Card className="glassmorphism">
            <CardHeader>
                <div className="flex justify-between items-center">
                    <CardTitle>Live Patient Overview</CardTitle>
                    <div className="w-1/3 relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground"/>
                        <Input placeholder="Search by name or ID..." className="pl-10" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Patient ID</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Age</TableHead>
                            <TableHead>Ward/Room</TableHead>
                            <TableHead>Doctor Assigned</TableHead>
                            <TableHead>Health Status</TableHead>
                            <TableHead>Oxygen Level</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredPatients.map(patient => {
                            const statusConfig = getStatusConfig(patient.status);
                            return (
                                <TableRow key={patient.id}>
                                    <TableCell className="font-mono">{patient.id}</TableCell>
                                    <TableCell className="font-semibold text-white">{patient.name}</TableCell>
                                    <TableCell>{patient.age}</TableCell>
                                    <TableCell>{patient.ward}</TableCell>
                                    <TableCell>{patient.doctor}</TableCell>
                                    <TableCell><Badge className={statusConfig.color}><statusConfig.icon className="w-3 h-3 mr-1"/>{patient.status}</Badge></TableCell>
                                    <TableCell>{patient.oxygen}%</TableCell>
                                    <TableCell className="text-right space-x-2">
                                        <Button variant="outline" size="sm"><Eye className="mr-1"/>View</Button>
                                        <Button variant="secondary" size="sm">Report</Button>
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
}

// --- Doctors Section ---
function DoctorsSection() {
    const [filter, setFilter] = useState({ department: 'All', availability: 'All' });
    const filteredDoctors = useMemo(() => {
        return dummyPeopleData.doctors.filter(d => 
            (filter.department === 'All' || d.department === filter.department) &&
            (filter.availability === 'All' || d.availability === filter.availability)
        );
    }, [filter]);
    const allDepartments = ['All', ...new Set(dummyPeopleData.doctors.map(d => d.department))];

    return (
        <Card className="glassmorphism">
            <CardHeader>
                 <div className="flex justify-between items-center">
                    <CardTitle>Doctors on Duty</CardTitle>
                    <div className="flex gap-2">
                         <Select value={filter.department} onValueChange={(v) => setFilter(f => ({...f, department: v}))}>
                            <SelectTrigger className="w-[180px]"><SelectValue placeholder="Department" /></SelectTrigger>
                            <SelectContent>{allDepartments.map(d => <SelectItem key={d} value={d}>{d}</SelectItem>)}</SelectContent>
                        </Select>
                         <Select value={filter.availability} onValueChange={(v) => setFilter(f => ({...f, availability: v}))}>
                            <SelectTrigger className="w-[180px]"><SelectValue placeholder="Availability" /></SelectTrigger>
                            <SelectContent>
                                <SelectItem value="All">All</SelectItem>
                                <SelectItem value="Available">Available</SelectItem>
                                <SelectItem value="Busy">Busy</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Doctor ID</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Department</TableHead>
                            <TableHead>Duty Hours</TableHead>
                            <TableHead>Contact</TableHead>
                            <TableHead>Availability</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredDoctors.map(doctor => (
                            <TableRow key={doctor.id}>
                                <TableCell className="font-mono">{doctor.id}</TableCell>
                                <TableCell className="font-semibold text-white">{doctor.name}</TableCell>
                                <TableCell>{doctor.department}</TableCell>
                                <TableCell>{doctor.hours}</TableCell>
                                <TableCell>{doctor.contact}</TableCell>
                                <TableCell><Badge className={cn(doctor.availability === 'Available' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-500')}>{doctor.availability}</Badge></TableCell>
                                <TableCell className="text-right space-x-2">
                                     <Button variant="outline" size="sm"><Calendar className="mr-1"/>Schedule</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
}

// --- Staff Section ---
function StaffSection() {
     const [filter, setFilter] = useState({ department: 'All', shift: 'All' });
    const filteredStaff = useMemo(() => {
        return dummyPeopleData.staff.filter(s => 
            (filter.department === 'All' || s.department === filter.department) &&
            (filter.shift === 'All' || s.shift === filter.shift)
        );
    }, [filter]);
    const allDepartments = ['All', ...new Set(dummyPeopleData.staff.map(s => s.department))];
    const allShifts = ['All', 'Morning', 'Afternoon', 'Night'];

    const getShiftColor = (shift) => {
        switch(shift) {
            case 'Morning': return 'bg-yellow-500/20 text-yellow-400';
            case 'Afternoon': return 'bg-blue-500/20 text-blue-400';
            case 'Night': return 'bg-purple-500/20 text-purple-400';
            default: return 'bg-gray-500/20';
        }
    };

    return (
        <Card className="glassmorphism">
            <CardHeader>
                 <div className="flex justify-between items-center">
                    <CardTitle>General Staff</CardTitle>
                    <div className="flex gap-2">
                         <Select value={filter.department} onValueChange={(v) => setFilter(f => ({...f, department: v}))}>
                            <SelectTrigger className="w-[180px]"><SelectValue placeholder="Department" /></SelectTrigger>
                            <SelectContent>{allDepartments.map(d => <SelectItem key={d} value={d}>{d}</SelectItem>)}</SelectContent>
                        </Select>
                         <Select value={filter.shift} onValueChange={(v) => setFilter(f => ({...f, shift: v}))}>
                            <SelectTrigger className="w-[180px]"><SelectValue placeholder="Shift" /></SelectTrigger>
                            <SelectContent>{allShifts.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent>
                        </Select>
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Staff ID</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Role</TableHead>
                            <TableHead>Shift</TableHead>
                            <TableHead>Department</TableHead>
                            <TableHead>Contact</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredStaff.map(staff => (
                            <TableRow key={staff.id}>
                                <TableCell className="font-mono">{staff.id}</TableCell>
                                <TableCell className="font-semibold text-white">{staff.name}</TableCell>
                                <TableCell>{staff.role}</TableCell>
                                <TableCell><Badge className={getShiftColor(staff.shift)}>{staff.shift}</Badge></TableCell>
                                <TableCell>{staff.department}</TableCell>
                                <TableCell>{staff.contact}</TableCell>
                                <TableCell><Badge className={cn(staff.status === 'On Duty' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-500')}>{staff.status}</Badge></TableCell>
                                <TableCell className="text-right space-x-2">
                                     <Button variant="outline" size="sm"><MessageSquare className="mr-1"/>Task</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
}

    