
"use client";

import { useState, useMemo } from 'react';
import { Patient, dummyInsurancePlans, InsurancePlan } from '@/lib/dummy-data';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { FileDown, FileText, CheckCircle, ShieldCheck, Building, Star, Filter, X } from 'lucide-react';
import { Label } from '../ui/label';

export function Insurance({ patient }: { patient: Patient }) {
    const [selectedPlan, setSelectedPlan] = useState<InsurancePlan | null>(null);
    const [showBookingDialog, setShowBookingDialog] = useState(false);
    
    // Filters - state can be added here
    const [cityFilter, setCityFilter] = useState('');
    const [compareList, setCompareList] = useState<string[]>([]);
    
    const { toast } = useToast();

    const filteredPlans = useMemo(() => {
        return dummyInsurancePlans.filter(plan => 
            cityFilter ? plan.city === cityFilter || plan.city === 'Multi-city' : true
        );
    }, [cityFilter]);

    const handleViewDetails = (plan: InsurancePlan) => {
        setSelectedPlan(plan);
    };

    const handleBookNow = (plan: InsurancePlan) => {
        setSelectedPlan(plan);
        setShowBookingDialog(true);
    };

    const handleCloseDialog = () => {
        setSelectedPlan(null);
        setShowBookingDialog(false);
    };
    
    const handleBookingConfirmed = (policyNumber: string) => {
        toast({
            title: "Policy Confirmed!",
            description: `Your policy number is ${policyNumber}. You can download the documents now.`,
            variant: 'default',
        });
        handleCloseDialog();
    };

    return (
        <div className="space-y-6">
            <Card className="glassmorphism glowing-shadow">
                <CardHeader>
                    <CardTitle className="text-gradient-glow text-2xl">Insurance Marketplace</CardTitle>
                    <CardDescription>Compare, book, and manage your health insurance plans.</CardDescription>
                </CardHeader>
                <CardContent>
                    {/* Add filter controls here */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredPlans.map(plan => (
                            <InsuranceCard 
                                key={plan.planId} 
                                plan={plan} 
                                onViewDetails={handleViewDetails}
                                onBookNow={handleBookNow}
                            />
                        ))}
                    </div>
                </CardContent>
            </Card>

            <PlanDetailsDialog 
                plan={selectedPlan} 
                open={!!selectedPlan && !showBookingDialog} 
                onClose={handleCloseDialog}
                onBookNow={() => setShowBookingDialog(true)}
            />
            
            <BookingDialog
                plan={selectedPlan}
                patient={patient}
                open={showBookingDialog}
                onClose={handleCloseDialog}
                onBookingConfirmed={handleBookingConfirmed}
            />
        </div>
    );
}

function InsuranceCard({ plan, onViewDetails, onBookNow }: { plan: InsurancePlan; onViewDetails: (p: InsurancePlan) => void; onBookNow: (p: InsurancePlan) => void; }) {
    return (
        <Card className="glassmorphism flex flex-col h-full hover:border-primary/50 transition-all duration-300 transform hover:-translate-y-1">
            <CardHeader>
                <div className="flex justify-between items-start">
                    <div>
                        <CardTitle className="text-xl text-white">{plan.planName}</CardTitle>
                        <CardDescription>{plan.insurerName}</CardDescription>
                    </div>
                    <Badge variant="secondary" className="flex items-center gap-1">
                        <Star className="w-3 h-3 fill-current text-yellow-400" /> {plan.rating}
                    </Badge>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground pt-2">
                    <Building className="w-4 h-4"/>
                    <span>{plan.hospitalName}, {plan.city}</span>
                </div>
            </CardHeader>
            <CardContent className="flex-grow space-y-3">
                <div>
                    <p className="text-3xl font-bold text-gradient-glow">₹{plan.premiumMonthly?.toLocaleString()}<span className="text-sm font-normal text-muted-foreground">/month</span></p>
                    <p className="text-xs text-muted-foreground">or ₹{plan.premiumAnnual?.toLocaleString()}/year</p>
                </div>
                <div className="text-sm">
                    <p className="font-semibold text-white">Coverage: <span className="font-mono text-primary">₹{plan.coverageLimit.toLocaleString()}</span></p>
                    <p className="font-semibold text-white">OPD: <span className="font-mono text-primary">₹{plan.opdCoverage?.toLocaleString() || 'N/A'}</span></p>
                </div>
                <div className="flex flex-wrap gap-1">
                    {plan.inclusions.slice(0, 2).map(inc => <Badge key={inc} variant="outline" className="text-xs">{inc}</Badge>)}
                </div>
            </CardContent>
            <CardFooter className="flex justify-between gap-2">
                <Button variant="outline" onClick={() => onViewDetails(plan)}>View Details</Button>
                <Button className="glowing-shadow-interactive" onClick={() => onBookNow(plan)}>Book Now</Button>
            </CardFooter>
        </Card>
    );
}

function PlanDetailsDialog({ plan, open, onClose, onBookNow }: { plan: InsurancePlan | null; open: boolean; onClose: () => void; onBookNow: () => void; }) {
    if (!plan) return null;

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="glassmorphism max-w-4xl h-[90vh] flex flex-col">
                <DialogHeader>
                    <DialogTitle className="text-gradient-glow text-2xl">{plan.planName}</DialogTitle>
                    <DialogDescription>{plan.insurerName} - {plan.hospitalName}, {plan.city}</DialogDescription>
                </DialogHeader>
                <ScrollArea className="flex-grow pr-6 -mr-6">
                    <div className="space-y-6">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                            <InfoBox label="Coverage Limit" value={`₹${plan.coverageLimit.toLocaleString()}`} />
                            <InfoBox label="Monthly Premium" value={`₹${plan.premiumMonthly?.toLocaleString() || 'N/A'}`} />
                            <InfoBox label="Co-pay" value={`${plan.copayPercent}%`} />
                            <InfoBox label="Waiting Period" value={`${plan.waitingPeriodMonths} months`} />
                        </div>

                        <div>
                            <h3 className="font-semibold text-white text-lg mb-2">Terms & Conditions</h3>
                            <div className="p-4 bg-background/50 rounded-lg border border-border/50 max-h-[200px] overflow-y-auto text-sm text-muted-foreground">
                                <p>{plan.policyText}</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <InfoList title="Key Inclusions" items={plan.inclusions} />
                            <InfoList title="Key Exclusions" items={plan.exclusions} />
                        </div>
                        
                         <div className="flex gap-2">
                            <Button variant="outline"><FileDown className="mr-2" /> Download Policy (PDF)</Button>
                            <Button variant="outline"><FileDown className="mr-2" /> Download (JSON)</Button>
                        </div>

                    </div>
                </ScrollArea>
                <DialogFooter>
                    <Button variant="outline" onClick={onClose}>Close</Button>
                    <Button className="glowing-shadow-interactive" onClick={onBookNow}>Proceed to Book</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

const InfoBox = ({ label, value }: { label: string, value: string }) => (
    <div className="glassmorphism p-3 rounded-lg">
        <p className="text-sm text-muted-foreground">{label}</p>
        <p className="text-xl font-bold text-white">{value}</p>
    </div>
);

const InfoList = ({ title, items }: { title: string, items: string[] }) => (
    <div>
        <h3 className="font-semibold text-white text-lg mb-2">{title}</h3>
        <ul className="space-y-2">
            {items.map(item => (
                <li key={item} className="flex items-start gap-2">
                    <ShieldCheck className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                    <span className="text-sm text-muted-foreground">{item}</span>
                </li>
            ))}
        </ul>
    </div>
);


function BookingDialog({ plan, patient, open, onClose, onBookingConfirmed }: { plan: InsurancePlan | null, patient: Patient, open: boolean, onClose: () => void, onBookingConfirmed: (policyNumber: string) => void }) {
    const [acceptedTerms, setAcceptedTerms] = useState(false);
    const [signature, setSignature] = useState('');

    if (!plan) return null;
    
    const canConfirm = acceptedTerms && signature.trim() === patient.name;

    const handleConfirm = () => {
        const policyNumber = `POL-2025-${Math.floor(1000 + Math.random() * 9000)}`;
        onBookingConfirmed(policyNumber);
    };

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="glassmorphism max-w-2xl">
                <DialogHeader>
                    <DialogTitle className="text-gradient-glow text-2xl">Confirm Booking</DialogTitle>
                    <DialogDescription>Review the details and confirm your policy for {plan.planName}.</DialogDescription>
                </DialogHeader>
                <div className="space-y-4 my-4">
                    <p><span className="font-semibold text-muted-foreground">Policy Holder:</span> <span className="text-white">{patient.name}</span></p>
                    <p><span className="font-semibold text-muted-foreground">Premium:</span> <span className="text-white">₹{plan.premiumAnnual?.toLocaleString()}/year</span></p>

                    <div className="p-4 bg-background/50 rounded-lg border border-border/50">
                        <h4 className="font-semibold text-white mb-2">Acceptance & E-Signature</h4>
                        <div className="flex items-center space-x-2 mb-4">
                            <Checkbox id="terms" checked={acceptedTerms} onCheckedChange={(checked) => setAcceptedTerms(checked as boolean)} />
                            <label htmlFor="terms" className="text-sm font-medium leading-none text-muted-foreground peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                I have read and agree to the Terms & Conditions.
                            </label>
                        </div>
                        <div>
                            <Label htmlFor="signature" className="text-muted-foreground">Type your full name to sign: <span className="text-primary font-bold">{patient.name}</span></Label>
                            <Input 
                                id="signature"
                                value={signature}
                                onChange={(e) => setSignature(e.target.value)}
                                placeholder="E-Signature"
                                className="mt-1"
                            />
                        </div>
                    </div>
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={onClose}>Cancel</Button>
                    <Button onClick={handleConfirm} disabled={!canConfirm} className="glowing-shadow-interactive">
                        Confirm & Generate Policy
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

