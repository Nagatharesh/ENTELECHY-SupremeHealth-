"use client";

import { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ChevronLeft, ChevronRight, Search, PlusCircle } from 'lucide-react';
import { addDays, format, startOfWeek, endOfWeek } from 'date-fns';
import { dummyHospitalData } from '@/lib/dummy-data';
import { cn } from '@/lib/utils';

const shifts = [
    { label: 'Morning', start: '06:00', end: '14:00' },
    { label: 'Afternoon', start: '14:00', end: '22:00' },
    { label: 'Night', start: '22:00', end: '06:00' }
];

export function StaffScheduling() {
    const [currentDate, setCurrentDate] = useState(new Date('2025-09-21'));
    const [view, setView] = useState('week');
    
    const weekStart = startOfWeek(currentDate, { weekStartsOn: 0 }); // Sunday
    const weekDays = Array.from({ length: 7 }).map((_, i) => addDays(weekStart, i));
    
    const schedules = dummyHospitalData.schedules;
    
    const getSchedulesForSlot = (date, shift) => {
        return schedules.filter(s => 
            new Date(s.date).toDateString() === date.toDateString() && 
            s.shift === shift.label.toLowerCase()
        );
    };

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
                            <Button variant="outline" size="sm" onClick={() => setView('month')} disabled={view === 'month'}>Month View</Button>
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
                            <Input placeholder="Search Staff..." className="pl-10" />
                        </div>
                        <Select>
                            <SelectTrigger className="w-full sm:w-[180px]"><SelectValue placeholder="All Types" /></SelectTrigger>
                            <SelectContent><SelectItem value="all">All Types</SelectItem></SelectContent>
                        </Select>
                        <Select>
                            <SelectTrigger className="w-full sm:w-[180px]"><SelectValue placeholder="All Departments" /></SelectTrigger>
                            <SelectContent><SelectItem value="all">All Departments</SelectItem></SelectContent>
                        </Select>
                        <Button className="glowing-shadow-interactive"><PlusCircle className="mr-2"/> Add Schedule</Button>
                    </div>
                </CardContent>
            </Card>

            <div className="overflow-x-auto">
                <div className="grid grid-cols-[auto_repeat(7,minmax(150px,1fr))] gap-px bg-border/50 border border-border/50 rounded-lg min-w-[1200px]">
                    {/* Time Header */}
                    <div className="p-2 bg-background/30 font-semibold text-white">Time</div>
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
                            <div className="row-span-1 p-2 flex items-center justify-center bg-background/30 font-semibold text-muted-foreground">
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
