

"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { User, Clock, Coffee, Send, BrainCircuit, BarChart, Bot } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  BarChart as RechartsBarChart,
  ResponsiveContainer,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useState } from "react";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";

const StressLevelCard = ({ staff }) => {
    const { toast } = useToast();
    const [open, setOpen] = useState(false);
    const stressPercentage = (staff.stressLevel / 10) * 100;
    const stressColor = stressPercentage > 70 ? 'hsl(var(--destructive))' : stressPercentage > 40 ? 'hsl(var(--primary))' : 'hsl(var(--secondary))';

    const handleGrantLeave = () => {
        setOpen(false);
        toast({
            title: "Leave Recommended",
            description: `An automated leave recommendation has been sent to ${staff.name}.`,
        });
    };

    return (
        <Card className="glassmorphism p-4 flex flex-col md:flex-row items-center gap-6">
            <Avatar className="h-20 w-20 border-4" style={{ borderColor: stressColor }}>
                <AvatarImage src={`https://i.pravatar.cc/150?u=${staff.staffId}`} alt={staff.name} />
                <AvatarFallback>{staff.name.substring(0, 2)}</AvatarFallback>
            </Avatar>
            <div className="flex-grow text-center md:text-left">
                <CardTitle className="text-xl text-white">{staff.name}</CardTitle>
                <CardDescription>{staff.role} &bull; {staff.department}</CardDescription>
                <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-sm mt-2">
                    <div className="flex items-center gap-2"><Clock className="w-4 h-4 text-muted-foreground"/>Hours this week: <span className="font-bold text-white">{staff.hoursThisWeek}</span></div>
                    <div className="flex items-center gap-2"><Clock className="w-4 h-4 text-muted-foreground"/>Consecutive Days: <span className="font-bold text-white">{staff.consecutiveDaysWorked}</span></div>
                </div>
                 <Alert className="mt-2 bg-background/30 border-primary/20">
                    <Bot className="h-4 w-4 text-primary" />
                    <AlertTitle className="text-sm text-primary">AI Insight</AlertTitle>
                    <AlertDescription className="text-xs">
                        {staff.aiNote}
                    </AlertDescription>
                </Alert>
            </div>
            <div className="w-full md:w-1/3 space-y-2 text-center">
                <p className="text-sm font-medium text-muted-foreground">AI Stress Prediction</p>
                <div className="flex items-center gap-2 justify-center">
                    <p className="text-3xl font-bold" style={{ color: stressColor }}>{staff.stressLevel}/10</p>
                </div>
                <Progress value={stressPercentage} indicatorColor={stressColor} />
                {staff.stressLevel > 7 && (
                    <Dialog open={open} onOpenChange={setOpen}>
                        <DialogTrigger asChild>
                            <Button variant="destructive" size="sm" className="w-full glowing-shadow-interactive">
                                <Coffee className="mr-2" /> Recommend Leave
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="glassmorphism">
                            <DialogHeader>
                                <DialogTitle>Confirm Leave Recommendation</DialogTitle>
                                <DialogDescription>
                                    This will send a notification to HR and {staff.name} suggesting a mandatory rest day due to high stress levels. Are you sure?
                                </DialogDescription>
                            </DialogHeader>
                            <DialogFooter>
                                <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
                                <Button variant="destructive" onClick={handleGrantLeave}>Confirm Recommendation</Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                )}
            </div>
        </Card>
    );
};

export function StaffManagement({ hospitalData }) {
    const { staff: { members: staff, departmentAnalytics } } = hospitalData;

    const departmentHoursChartConfig = {
      hours: {
        label: "Hours",
        color: "hsl(var(--primary))",
      },
    };

    return (
        <div className="space-y-6">
            <Card className="glassmorphism glowing-shadow">
                <CardHeader>
                    <CardTitle className="text-gradient-glow text-2xl">Doctor &amp; Staff Stress Management</CardTitle>
                    <CardDescription>AI-powered monitoring to prevent burnout and ensure patient safety.</CardDescription>
                </CardHeader>
            </Card>

            <div className="space-y-4">
                {staff.map(member => (
                    <StressLevelCard key={member.staffId} staff={member} />
                ))}
            </div>

            <Card className="glassmorphism glowing-shadow">
                <CardHeader>
                    <CardTitle className="text-white">Total Hours by Department</CardTitle>
                </CardHeader>
                <CardContent className="h-80">
                     <ChartContainer config={departmentHoursChartConfig} className="w-full h-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <RechartsBarChart data={departmentAnalytics}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border) / 0.5)" />
                                <XAxis dataKey="department" tickLine={false} axisLine={false} stroke="hsl(var(--foreground))" fontSize={12} />
                                <YAxis tickLine={false} axisLine={false} stroke="hsl(var(--foreground))" fontSize={12} />
                                <Tooltip content={<ChartTooltipContent />} cursor={{ fill: 'hsl(var(--primary)/0.1)' }} />
                                <Bar dataKey="totalHours" fill="var(--color-hours)" radius={[4, 4, 0, 0]} />
                            </RechartsBarChart>
                        </ResponsiveContainer>
                    </ChartContainer>
                </CardContent>
            </Card>
        </div>
    );
}
