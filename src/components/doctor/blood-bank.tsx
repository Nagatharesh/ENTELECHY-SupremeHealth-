
"use client";

import { useState, useMemo } from 'react';
import { dummyDonors, Donor, dummyHospitals, Hospital, dummyDonations } from '@/lib/dummy-data';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Droplets, HospitalIcon, TrendingUp, Search, User, Phone, MapPin, Calendar, PlusCircle, History, ExternalLink } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from '../ui/badge';
import { ChartContainer, ChartTooltipContent, type ChartConfig } from '@/components/ui/chart';
import { BarChart, Bar, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid, Line, LineChart, Pie, PieChart, Cell } from 'recharts';
import { Input } from '../ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '../ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { format, formatDistanceToNow } from 'date-fns';
import Link from 'next/link';

const BLOOD_TYPES = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
const COLORS = ["hsl(var(--chart-1))", "hsl(var(--chart-2))", "hsl(var(--chart-3))", "hsl(var(--chart-4))", "hsl(var(--chart-5))", "hsl(var(--primary))", "hsl(var(--secondary))", "hsl(var(--accent))"];


export function BloodBank() {
    const { toast } = useToast();
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedDonor, setSelectedDonor] = useState<Donor | null>(null);
    const [showRequestModal, setShowRequestModal] = useState<any>(null);

    const filteredDonors = useMemo(() => {
        return dummyDonors.filter(d => 
            d.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            d.phone.includes(searchTerm) ||
            d.bloodGroup.toLowerCase().includes(searchTerm.toLowerCase()) ||
            d.location.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [searchTerm]);
    
    const handleRequest = (type: 'donor' | 'hospital', item: Donor | Hospital) => {
        setShowRequestModal({ type, item });
    };

    const confirmRequest = () => {
        toast({
            title: "Request Sent!",
            description: `A blood request has been sent to ${showRequestModal.item.name}.`,
        });
        setShowRequestModal(null);
    };

    return (
        <div className="space-y-6">
            <Tabs defaultValue="dashboard">
                <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
                    <TabsTrigger value="donors">Donors</TabsTrigger>
                    <TabsTrigger value="hospitals">Hospitals</TabsTrigger>
                </TabsList>
                
                <TabsContent value="dashboard">
                    <DashboardTab />
                </TabsContent>

                <TabsContent value="donors">
                    <DonorsTab donors={filteredDonors} searchTerm={searchTerm} setSearchTerm={setSearchTerm} onSelectDonor={setSelectedDonor} onRequest={handleRequest} />
                </TabsContent>

                <TabsContent value="hospitals">
                    <HospitalsTab hospitals={dummyHospitals} onRequest={handleRequest} />
                </TabsContent>
            </Tabs>
            
            <Dialog open={!!selectedDonor} onOpenChange={() => setSelectedDonor(null)}>
                <DialogContent className="glassmorphism max-w-2xl">
                    {selectedDonor && <DonorProfile donor={selectedDonor} />}
                </DialogContent>
            </Dialog>

            <Dialog open={!!showRequestModal} onOpenChange={() => setShowRequestModal(null)}>
                 <DialogContent className="glassmorphism">
                     <DialogHeader>
                        <DialogTitle>Confirm Blood Request</DialogTitle>
                        <DialogDescription>
                            You are requesting blood from {showRequestModal?.item.name}.
                        </DialogDescription>
                     </DialogHeader>
                     <DialogFooter>
                        <Button variant="outline" onClick={() => setShowRequestModal(null)}>Cancel</Button>
                        <Button onClick={confirmRequest}>Send Request</Button>
                     </DialogFooter>
                 </DialogContent>
            </Dialog>
        </div>
    );
}

const DashboardTab = () => {
    const donorsByGroup = useMemo(() => {
        const counts = BLOOD_TYPES.reduce((acc, type) => ({ ...acc, [type]: 0 }), {});
        dummyDonors.forEach(d => {
            if (counts[d.bloodGroup] !== undefined) {
                counts[d.bloodGroup]++;
            }
        });
        return Object.entries(counts).map(([name, value]) => ({ name, value }));
    }, []);

    const monthlyDonations = useMemo(() => {
        const counts = dummyDonations.reduce((acc, donation) => {
            const month = format(new Date(donation.date), 'MMM');
            acc[month] = (acc[month] || 0) + 1;
            return acc;
        }, {});
        const monthOrder = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        return monthOrder.map(month => ({ name: month, Donations: counts[month] || 0 }));
    }, []);

    const chartConfig = {
      value: {
        label: "Donors",
      },
       Donations: {
        label: "Donations",
      }
    } satisfies ChartConfig

    return (
        <div className="space-y-6">
            <Card className="glassmorphism glowing-shadow">
                <CardHeader>
                    <div className="flex justify-between items-center">
                        <div>
                            <CardTitle className="text-gradient-glow text-2xl">Blood Bank Dashboard</CardTitle>
                            <CardDescription>Analytics on donors, donations, and inventory.</CardDescription>
                        </div>
                        <Button asChild>
                           <Link href="https://eraktkosh.mohfw.gov.in/eraktkoshPortal/#/" target="_blank" rel="noopener noreferrer">
                                <ExternalLink className="mr-2 h-4 w-4" />
                                Emergency Blood Donor Details
                            </Link>
                        </Button>
                    </div>
                </CardHeader>
            </Card>
             <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <ChartCard title="Donors by Blood Group">
                    <ChartContainer config={chartConfig} className="w-full h-[250px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={donorsByGroup}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border) / 0.5)" />
                                <XAxis dataKey="name" tickLine={false} axisLine={false} stroke="hsl(var(--foreground))" fontSize={12} />
                                <YAxis tickLine={false} axisLine={false} stroke="hsl(var(--foreground))" fontSize={12} />
                                <Tooltip content={<ChartTooltipContent />} cursor={{ fill: 'hsl(var(--primary)/0.1)' }} />
                                <Bar dataKey="value" name="Donors">
                                    {donorsByGroup.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </ChartContainer>
                </ChartCard>
                 <ChartCard title="Monthly Donations Trend">
                    <ChartContainer config={chartConfig} className="w-full h-[250px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={monthlyDonations}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border) / 0.5)" />
                                <XAxis dataKey="name" tickLine={false} axisLine={false} stroke="hsl(var(--foreground))" fontSize={12} />
                                <YAxis tickLine={false} axisLine={false} stroke="hsl(var(--foreground))" fontSize={12} />
                                <Tooltip content={<ChartTooltipContent />} cursor={{ fill: 'hsl(var(--primary)/0.1)' }} />
                                <Line type="monotone" dataKey="Donations" stroke="hsl(var(--primary))" strokeWidth={2} activeDot={{ r: 8 }} />
                            </LineChart>
                        </ResponsiveContainer>
                    </ChartContainer>
                </ChartCard>
            </div>
        </div>
    )
}

const DonorsTab = ({ donors, searchTerm, setSearchTerm, onSelectDonor, onRequest }) => (
    <Card className="glassmorphism">
        <CardHeader>
            <CardTitle>Donors</CardTitle>
            <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <Input placeholder="Search by name, phone, blood group..." className="pl-10" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
            </div>
        </CardHeader>
        <CardContent>
             <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Donor</TableHead>
                        <TableHead>Contact</TableHead>
                        <TableHead>Donations</TableHead>
                        <TableHead>Last Donated</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {donors.map(donor => (
                        <TableRow key={donor.donorId}>
                            <TableCell>
                                <div className="font-bold text-white">{donor.name}</div>
                                <div className="text-sm text-muted-foreground">{donor.bloodGroup} | {donor.location}</div>
                            </TableCell>
                            <TableCell>
                                <div className="flex items-center gap-2"><Phone className="w-4 h-4"/>{donor.phone}</div>
                            </TableCell>
                            <TableCell>{donor.donationCount}</TableCell>
                            <TableCell>{formatDistanceToNow(new Date(donor.lastDonationDate), { addSuffix: true })}</TableCell>
                            <TableCell className="text-right space-x-2">
                                <Button variant="outline" size="sm" onClick={() => onSelectDonor(donor)}>View</Button>
                                <Button size="sm" onClick={() => onRequest('donor', donor)}>Request</Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </CardContent>
    </Card>
);

const HospitalsTab = ({ hospitals, onRequest }) => (
     <Card className="glassmorphism">
        <CardHeader>
            <CardTitle>Hospital Inventory</CardTitle>
        </CardHeader>
        <CardContent>
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {hospitals.map(h => (
                    <Card key={h.hospitalId} className="glassmorphism p-4">
                        <CardTitle className="text-lg text-white">{h.name}</CardTitle>
                        <CardDescription>{h.location}</CardDescription>
                        <div className="grid grid-cols-4 gap-2 mt-4 text-center text-xs">
                            {BLOOD_TYPES.map(type => (
                                 <div key={type} className={`p-2 rounded ${h.stock[type] < 10 ? 'bg-destructive/20 text-destructive' : 'bg-green-500/20 text-green-400'}`}>
                                    <div className="font-bold">{type}</div>
                                    <div className="font-mono">{h.stock[type] || 0}</div>
                                 </div>
                            ))}
                        </div>
                         <Button className="w-full mt-4" size="sm" onClick={() => onRequest('hospital', h)}>Request Stock</Button>
                    </Card>
                ))}
            </div>
        </CardContent>
    </Card>
);

const ChartCard = ({ title, children }) => (
    <Card className="glassmorphism">
        <CardHeader>
            <CardTitle className="text-lg text-white">{title}</CardTitle>
        </CardHeader>
        <CardContent>
            {children}
        </CardContent>
    </Card>
);

const DonorProfile = ({ donor }: { donor: Donor }) => (
    <>
        <DialogHeader>
            <DialogTitle className="text-2xl text-gradient-glow">{donor.name}</DialogTitle>
            <DialogDescription>
                <Badge>{donor.bloodGroup}</Badge> | {donor.location} | {donor.phone}
            </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
             <h3 className="font-semibold text-white flex items-center gap-2"><History/>Donation History</h3>
             <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Location</TableHead>
                        <TableHead>Type</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {donor.donationHistory.map(h => (
                        <TableRow key={h.donationId}>
                            <TableCell>{format(new Date(h.date), 'PPP')}</TableCell>
                            <TableCell>{h.location}</TableCell>
                            <TableCell><Badge variant="secondary">{h.type}</Badge></TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    </>
);

    
