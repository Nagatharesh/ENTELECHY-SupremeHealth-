
"use client";

import * as React from 'react';
import { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import { ChevronLeft, ChevronRight, Search, PlusCircle } from 'lucide-react';
import { addDays, format, startOfWeek, endOfWeek } from 'date-fns';
import { dummyHospitalData } from '@/lib/dummy-data';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { Calendar } from '../ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';

const shifts = [
    { label: 'Morning', start: '06:00', end: '14:00' },
    { label: 'Afternoon', start: '14:00', end: '22:00' },
    { label: 'Night', start: '22:00', end: '06:00' }
];

export function StaffScheduling() {
    const [currentDate, setCurrentDate] = useState(new Date('2025-09-21'));
    const [view, setView] = useState('week');
    const [schedules, setSchedules] = useState(dummyHospitalData.schedules);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    
    // Filters
    const [searchTerm, setSearchTerm] = useState('');
    const [departmentFilter, setDepartmentFilter] = useState('All');

    const weekStart = startOfWeek(currentDate, { weekStartsOn: 0 }); // Sunday
    const weekDays = Array.from({ length: 7 }).map((_, i) => addDays(weekStart, i));
    
    const filteredSchedules = useMemo(() => {
        return schedules.filter(s => {
            const nameMatch = searchTerm ? s.staffName.toLowerCase().includes(searchTerm.toLowerCase()) : true;
            const departmentMatch = departmentFilter !== 'All' ? s.department === departmentFilter : true;
            return nameMatch && departmentMatch;
        });
    }, [schedules, searchTerm, departmentFilter]);
    
    const getSchedulesForSlot = (date, shift) => {
        return filteredSchedules.filter(s => 
            new Date(s.date).toDateString() === date.toDateString() && 
            s.shift === shift.label.toLowerCase()
        );
    };

    const handleAddSchedule = (newSchedule) => {
        const newId = `sch-${schedules.length + 1}`;
        setSchedules(prev => [...prev, { ...newSchedule, id: newId }]);
        setIsAddModalOpen(false);
    };
    
    const allDepartments = ['All', ...new Set(dummyHospitalData.staff.members.map(m => m.department))];

    return (
        <div className="space-y-6">
            <Card className="glassmorphism glowing-shadow">
                <CardHeader>
                    <CardTitle className="text-gradient-glow text-2xl">Staff Scheduling</CardTitle>
                    <CardDescription>Manage consultant and worker schedules, shifts, and assignments.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                        <div className="flex gap-2">
                            <Button variant="outline" size="sm" onClick={() => setView('week')} disabled={view === 'week'}>Week View</Button>
                            <Button variant="outline" size="sm" onClick={() => setView('month')} disabled>Month View</Button>
                        </div>
                        <div className="flex items-center gap-2 text-white font-semibold">
                            <Button variant="ghost" size="icon" onClick={() => setCurrentDate(prev => addDays(prev, -7))}><ChevronLeft /></Button>
                            <span>Week of {format(weekStart, 'MMM d')} - {format(endOfWeek(currentDate, { weekStartsOn: 0 }), 'MMM d, yyyy')}</span>
                            <Button variant="ghost" size="icon" onClick={() => setCurrentDate(prev => addDays(prev, 7))}><ChevronRight /></Button>
                            <Button variant="outline" size="sm" onClick={() => setCurrentDate(new Date())}>Today</Button>
                        </div>
                    </div>
                     <div className="mt-4 flex flex-col sm:flex-row gap-4">
                        <div className="relative flex-grow">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input placeholder="Search Staff..." className="pl-10" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
                        </div>
                        <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
                            <SelectTrigger className="w-full sm:w-[180px]"><SelectValue placeholder="All Departments" /></SelectTrigger>
                            <SelectContent>
                                {allDepartments.map(dep => <SelectItem key={dep} value={dep}>{dep}</SelectItem>)}
                            </SelectContent>
                        </Select>
                        <Button className="glowing-shadow-interactive" onClick={() => setIsAddModalOpen(true)}><PlusCircle className="mr-2"/> Add Schedule</Button>
                    </div>
                </CardContent>
            </Card>

            <div className="overflow-x-auto">
                <div className="grid grid-cols-[auto_repeat(7,minmax(150px,1fr))] gap-px bg-border/50 border border-border/50 rounded-lg min-w-[1200px]">
                    {/* Time Header */}
                    <div className="p-2 bg-background/30 font-semibold text-white sticky left-0 z-10">Time</div>
                    {/* Day Headers */}
                    {weekDays.map(day => (
                        <div key={day.toString()} className="p-2 text-center bg-background/30 font-semibold text-white">
                            <p>{format(day, 'EEE')}</p>
                            <p className="text-sm text-muted-foreground">{format(day, 'MMM d')}</p>
                        </div>
                    ))}

                    {/* Schedule Rows */}
                    {shifts.map(shift => (
                        <React.Fragment key={shift.label}>
                            <div className="row-span-1 p-2 flex items-center justify-center bg-background/30 font-semibold text-muted-foreground sticky left-0 z-10">
                                {shift.label}<br/>({shift.start}-{shift.end})
                            </div>
                            {weekDays.map(day => (
                                <div key={`${day.toString()}-${shift.label}`} className="bg-background/20 p-2 space-y-2 min-h-[120px]">
                                    {getSchedulesForSlot(day, shift).map(schedule => (
                                        <ScheduleCard key={schedule.id} schedule={schedule} />
                                    ))}
                                </div>
                            ))}
                        </React.Fragment>
                    ))}
                </div>
            </div>
            <AddScheduleDialog
                isOpen={isAddModalOpen}
                onClose={() => setIsAddModalOpen(false)}
                onAddSchedule={handleAddSchedule}
                staffMembers={dummyHospitalData.staff.members}
            />
        </div>
    );
}

const ScheduleCard = ({ schedule }) => {
    return (
        <div className={cn("p-2 rounded-lg text-xs text-white", schedule.color, "border border-current")}>
            <p className="font-bold">{schedule.staffName}</p>
            <p>{schedule.department}</p>
            <p className="text-right font-mono">{schedule.hours.toFixed(1)}h</p>
        </div>
    );
};

const AddScheduleDialog = ({ isOpen, onClose, onAddSchedule, staffMembers }) => {
    const { toast } = useToast();
    const [staffId, setStaffId] = useState('');
    const [date, setDate] = useState<Date | undefined>(new Date());
    const [shift, setShift] = useState('');
    
    const handleSubmit = () => {
        if (!staffId || !date || !shift) {
            toast({
                variant: 'destructive',
                title: 'Incomplete Information',
                description: 'Please select staff, date, and shift.',
            });
            return;
        }

        const staffMember = staffMembers.find(s => s.staffId === staffId);
        if (!staffMember) return;

        const newSchedule = {
            staffName: staffMember.name,
            department: staffMember.department,
            date: format(date, 'yyyy-MM-dd'),
            shift: shift.toLowerCase(),
            startTime: shifts.find(s => s.label === shift)?.start || '00:00',
            endTime: shifts.find(s => s.label === shift)?.end || '00:00',
            hours: 8.0,
            color: departmentColors[staffMember.department] || 'bg-gray-500/20'
        };

        onAddSchedule(newSchedule);
        toast({ title: "Schedule Added", description: `Added ${staffMember.name} to ${shift} shift on ${format(date, 'PPP')}.` });
    };

    const departmentColors = {
        'Cardiology': 'bg-red-500/20',
        'ICU': 'bg-purple-500/20',
        'Surgery': 'bg-blue-500/20',
        'Emergency': 'bg-orange-500/20',
        'Pediatrics': 'bg-yellow-500/20',
        'Dermatology': 'bg-pink-500/20',
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="glassmorphism">
                <DialogHeader>
                    <DialogTitle className="text-gradient-glow">Add New Schedule</DialogTitle>
                    <DialogDescription>Assign a new shift to a staff member.</DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                    <Select onValueChange={setStaffId}>
                        <SelectTrigger><SelectValue placeholder="Select Staff Member..." /></SelectTrigger>
                        <SelectContent>
                            {staffMembers.map(staff => (
                                <SelectItem key={staff.staffId} value={staff.staffId}>{staff.name} ({staff.department})</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                     <Popover>
                        <PopoverTrigger asChild>
                            <Button variant="outline" className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}>
                                {date ? format(date, 'PPP') : <span>Pick a date</span>}
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0"><Calendar mode="single" selected={date} onSelect={setDate} /></PopoverContent>
                    </Popover>
                    <Select onValueChange={setShift}>
                        <SelectTrigger><SelectValue placeholder="Select Shift..." /></SelectTrigger>
                        <SelectContent>
                            {shifts.map(s => <SelectItem key={s.label} value={s.label}>{s.label} ({s.start} - {s.end})</SelectItem>)}
                        </SelectContent>
                    </Select>
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={onClose}>Cancel</Button>
                    <Button onClick={handleSubmit} className="glowing-shadow-interactive">Add Schedule</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};
