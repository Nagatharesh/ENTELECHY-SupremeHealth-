
"use client";

import { useState, useMemo, useEffect } from 'react';
import { Patient, dummyMedicines, Medicine, dummyDoctors } from '@/lib/dummy-data';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Search, Pin, FlaskConical, Stethoscope, ChevronRight, Hash, Package, Clock, Building, User, Link as LinkIcon } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { cn } from '@/lib/utils';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import Link from 'next/link';

const getDoctorById = (doctorId: string) => dummyDoctors.find(d => d.doctorId === doctorId);

export function Medicines({ patient }: { patient: Patient }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedMedicine, setSelectedMedicine] = useState<Medicine | null>(null);
    const [bookingDetails, setBookingDetails] = useState<{medicine: Medicine, quantity: number, pharmacy: string} | null>(null);
    const [receipt, setReceipt] = useState<any | null>(null);
    const { toast } = useToast();
    const [showExternalLinksDialog, setShowExternalLinksDialog] = useState(false);
    const [showPrivateLinksDialog, setShowPrivateLinksDialog] = useState(false);
    
    const patientMedNames = [
        ...(patient.medications.current || []).map(m => m.name),
        ...(patient.medications.past || []).map(m => m.name)
    ];

    const filteredMedicines = useMemo(() => {
        if (!searchTerm) return dummyMedicines;
        const lowercasedTerm = searchTerm.toLowerCase();
        return dummyMedicines.filter(med => 
            med.name.toLowerCase().includes(lowercasedTerm) ||
            med.usage.toLowerCase().includes(lowercasedTerm) ||
            med.chemical.toLowerCase().includes(lowercasedTerm)
        );
    }, [searchTerm]);

    const handleBook = (medicine: Medicine) => {
        setSelectedMedicine(medicine);
    };

    const handleConfirmBooking = (quantity: number, pharmacy: string) => {
        if (!selectedMedicine) return;

        setBookingDetails({ medicine: selectedMedicine, quantity, pharmacy });
        setSelectedMedicine(null); // Close first dialog
        
        const eta = Math.floor(Math.random() * 45) + 15; // 15 to 60 mins
        const newReceipt = {
            patientName: patient.name,
            medicineName: selectedMedicine.name,
            quantity,
            pharmacy,
            price: pharmacy === 'Govt' ? selectedMedicine.govtPrice * quantity : selectedMedicine.privatePrice * quantity,
            bookingTime: new Date().toLocaleString(),
            eta: `${eta} minutes`,
            receiptId: `REC-${Date.now()}`
        };
        setReceipt(newReceipt);

        toast({
            title: "Medicine Booked!",
            description: `${selectedMedicine.name} (${quantity}) will be delivered in ~${eta} minutes.`,
        });
        
        // Open the external links dialog after booking
        setShowExternalLinksDialog(true);
    };

    const openPrivateLinks = () => {
        setShowExternalLinksDialog(false);
        setShowPrivateLinksDialog(true);
    };
    
    return (
        <div className="space-y-6">
            <Card className="glassmorphism glowing-shadow">
                <CardHeader>
                    <div className="flex justify-between items-center">
                        <div>
                            <CardTitle className="text-gradient-glow text-2xl">Medicine Hub</CardTitle>
                            <CardDescription>Search for medicines, compare prices, and book for delivery.</CardDescription>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="relative mb-6">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                        <Input 
                            placeholder="Search by medicine name, symptom, or condition (e.g., 'fever', 'cold')"
                            className="pl-10 text-base"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    
                    <ScrollArea className="h-[60vh]">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Medicine</TableHead>
                                    <TableHead>Usage</TableHead>
                                    <TableHead className="text-center">Govt. Price</TableHead>
                                    <TableHead className="text-center">Private Price</TableHead>
                                    <TableHead className="text-right">Action</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredMedicines.map(med => {
                                    const isPrescribed = patientMedNames.includes(med.name);
                                    return (
                                        <TableRow key={med.medicineId} className={cn(med.frequentlyUsed && 'bg-primary/5', isPrescribed && 'border-l-4 border-secondary')}>
                                            <TableCell>
                                                <div className="font-medium text-white flex items-center gap-2">
                                                    {med.name}
                                                    {med.frequentlyUsed && <Pin className="w-4 h-4 text-accent" title="Frequently Used" />}
                                                    {isPrescribed && <Badge variant="secondary" className="text-xs">Prescribed</Badge>}
                                                </div>
                                                <div className="text-xs text-muted-foreground flex items-center gap-1"><FlaskConical className="w-3 h-3" />{med.chemical}</div>
                                            </TableCell>
                                            <TableCell>
                                                <div className="text-sm text-muted-foreground">{med.usage}</div>
                                                <div className="text-xs text-muted-foreground/70 flex items-center gap-1 mt-1">
                                                    <Stethoscope className="w-3 h-3" />
                                                    {getDoctorById(med.prescribedBy)?.name || 'Multiple Doctors'}
                                                </div>
                                            </TableCell>
                                            <TableCell className="text-center font-mono text-white">₹{med.govtPrice.toFixed(2)}</TableCell>
                                            <TableCell className="text-center font-mono text-white">₹{med.privatePrice.toFixed(2)}</TableCell>
                                            <TableCell className="text-right">
                                                <Button size="sm" className="glowing-shadow-interactive" onClick={() => handleBook(med)}>
                                                    Book <ChevronRight className="w-4 h-4 ml-1"/>
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </ScrollArea>
                </CardContent>
            </Card>

            <BookingDialog 
                medicine={selectedMedicine} 
                onClose={() => setSelectedMedicine(null)}
                onConfirm={handleConfirmBooking}
            />

            <ReceiptDialog
                receipt={receipt}
                onClose={() => setReceipt(null)}
            />

             <Dialog open={showExternalLinksDialog} onOpenChange={setShowExternalLinksDialog}>
                <DialogContent className="glassmorphism">
                    <DialogHeader>
                        <DialogTitle className="text-gradient-glow">Select View Mode</DialogTitle>
                        <DialogDescription>Choose how you want to view external pharmacy links.</DialogDescription>
                    </DialogHeader>
                    <div className="flex gap-4 py-4">
                        <Button className="flex-1" onClick={openPrivateLinks}>Private View</Button>
                        <Button className="flex-1" variant="outline" disabled>Public View (Coming Soon)</Button>
                    </div>
                </DialogContent>
            </Dialog>

            <Dialog open={showPrivateLinksDialog} onOpenChange={setShowPrivateLinksDialog}>
                <DialogContent className="glassmorphism">
                    <DialogHeader>
                        <DialogTitle className="text-gradient-glow">External Pharmacy Links (Private)</DialogTitle>
                        <DialogDescription>These links will open in a new tab.</DialogDescription>
                    </DialogHeader>
                    <div className="grid grid-cols-1 gap-4 py-4">
                        <Button asChild variant="outline" className="justify-start">
                            <Link href="https://pharmeasy.in/" target="_blank" rel="noopener noreferrer">
                                Pharmeasy
                            </Link>
                        </Button>
                         <Button asChild variant="outline" className="justify-start">
                             <Link href="https://www.amazon.in/Health-Care/b/?ie=UTF8&node=1374494031&ref_=sv_hp_4" target="_blank" rel="noopener noreferrer">
                                Amazon HealthCare
                            </Link>
                        </Button>
                         <Button asChild variant="outline" className="justify-start">
                             <Link href="https://www.apollopharmacy.in/" target="_blank" rel="noopener noreferrer">
                                Apollo Pharmacy
                            </Link>
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}

function BookingDialog({ medicine, onClose, onConfirm }) {
    const [quantity, setQuantity] = useState(1);
    const [pharmacy, setPharmacy] = useState('Private');

    if (!medicine) return null;

    return (
        <Dialog open={!!medicine} onOpenChange={onClose}>
            <DialogContent className="glassmorphism">
                <DialogHeader>
                    <DialogTitle className="text-gradient-glow text-xl">Book Medicine: {medicine.name}</DialogTitle>
                    <DialogDescription>Select quantity and preferred pharmacy type.</DialogDescription>
                </DialogHeader>
                <div className="my-4 space-y-4">
                    <div>
                        <label className="text-sm font-medium text-white">Quantity</label>
                        <Input type="number" value={quantity} onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))} min="1" className="mt-1"/>
                    </div>
                     <div>
                        <label className="text-sm font-medium text-white">Pharmacy</label>
                        <Select value={pharmacy} onValueChange={setPharmacy}>
                            <SelectTrigger className="w-full mt-1">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="Private">Private Pharmacy (Faster, Higher Price)</SelectItem>
                                <SelectItem value="Govt">Government Pharmacy (Slower, Subsidized)</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="p-4 rounded-lg bg-background/50">
                        <p className="text-lg font-bold text-white">Total Price: <span className="text-primary font-mono">₹{(pharmacy === 'Govt' ? medicine.govtPrice : medicine.privatePrice) * quantity}</span></p>
                    </div>
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={onClose}>Cancel</Button>
                    <Button className="glowing-shadow-interactive" onClick={() => onConfirm(quantity, pharmacy)}>Confirm Booking</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

function ReceiptDialog({ receipt, onClose }) {
    if (!receipt) return null;

    return (
        <Dialog open={!!receipt} onOpenChange={onClose}>
            <DialogContent className="glassmorphism">
                 <DialogHeader>
                    <DialogTitle className="text-gradient-glow text-xl">Booking Confirmed & Receipt</DialogTitle>
                    <DialogDescription>Your medicine is on its way. Here is your digital receipt.</DialogDescription>
                </DialogHeader>
                <div className="my-4 space-y-3 text-sm p-4 border border-dashed border-primary/50 rounded-lg bg-background/30">
                    <InfoRow icon={Hash} label="Receipt ID" value={receipt.receiptId} />
                    <InfoRow icon={User} label="Patient Name" value={receipt.patientName} />
                    <InfoRow icon={Package} label="Medicine" value={`${receipt.medicineName} (x${receipt.quantity})`} />
                    <InfoRow icon={Building} label="Pharmacy" value={`${receipt.pharmacy} Pharmacy`} />
                    <InfoRow icon={Clock} label="Booking Time" value={receipt.bookingTime} />
                    <div className="pt-2 border-t border-border">
                        <InfoRow icon={Clock} label="Estimated Delivery" value={receipt.eta} isPrimary />
                        <InfoRow icon={Hash} label="Total Price" value={`₹${receipt.price.toFixed(2)}`} isPrimary />
                    </div>
                </div>
                 <DialogFooter>
                    <Button variant="outline" onClick={onClose}>Close</Button>
                    <Button className="glowing-shadow-interactive" onClick={() => alert('Downloading receipt...')}>Download Receipt</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

const InfoRow = ({ icon: Icon, label, value, isPrimary=false }) => (
    <div className="flex justify-between items-center">
        <p className="flex items-center gap-2 text-muted-foreground"><Icon className={cn("w-4 h-4", isPrimary && "text-primary")}/> {label}</p>
        <p className={cn("font-semibold font-mono", isPrimary ? "text-primary text-base" : "text-white")}>{value}</p>
    </div>
)
