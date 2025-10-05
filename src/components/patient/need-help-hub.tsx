
"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Phone, MessageSquare, LifeBuoy, Ambulance, Stethoscope, Calendar, ExternalLink, HelpCircle } from "lucide-react";
import Link from "next/link";

const supportContacts = [
    {
        type: "General & Customer Support",
        description: "For general inquiries, feedback, or assistance with your account.",
        phone: "1800-123-4567",
        email: "support@supremehealth.demo",
        icon: Phone
    },
    {
        type: "Technical Assistance",
        description: "For issues with the app, smart devices, or video consultations.",
        phone: "1800-123-4568",
        email: "tech@supremehealth.demo",
        icon: MessageSquare
    },
    {
        type: "Billing & Insurance",
        description: "For all questions related to payments, claims, and insurance coverage.",
        phone: "1800-123-4569",
        email: "billing@supremehealth.demo",
        icon: LifeBuoy
    }
];

export function NeedHelpHub() {
    
    const handleActionClick = (viewId: string) => {
        const event = new CustomEvent('changeView', { detail: viewId });
        window.dispatchEvent(event);
    }
    
    return (
        <div className="space-y-6">
            <Card className="glassmorphism glowing-shadow">
                <CardHeader>
                    <CardTitle className="text-gradient-glow text-2xl">Need Help?</CardTitle>
                    <CardDescription>Find all the support and emergency contact information you need right here.</CardDescription>
                </CardHeader>
            </Card>

            <Card className="glassmorphism glowing-shadow">
                <CardHeader>
                    <CardTitle className="text-destructive text-xl">Emergency Services</CardTitle>
                </CardHeader>
                 <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Button variant="destructive" className="h-24 text-lg glowing-shadow-interactive" onClick={() => handleActionClick('ambulance')}>
                        <Ambulance className="mr-4 h-8 w-8" />
                        Request Ambulance
                    </Button>
                     <Button variant="secondary" className="h-24 text-lg">
                        <Phone className="mr-4 h-8 w-8" />
                        Call National Emergency
                    </Button>
                </CardContent>
            </Card>

            <Card className="glassmorphism">
                <CardHeader>
                    <CardTitle className="text-white">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Button variant="outline" className="h-20 text-md" onClick={() => handleActionClick('doctors')}>
                        <Stethoscope className="mr-3 h-6 w-6"/> Find a Doctor
                    </Button>
                    <Button variant="outline" className="h-20 text-md" onClick={() => handleActionClick('appointments')}>
                        <Calendar className="mr-3 h-6 w-6"/> Book an Appointment
                    </Button>
                </CardContent>
            </Card>

            <Card className="glassmorphism">
                <CardHeader>
                    <CardTitle className="text-white">External Health Resources</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground">The National Institute of Allergy and Infectious Diseases (NIAID) is a leading research organization. Visit their site for trusted information on infectious diseases, allergies, and immunology.</p>
                    <Button asChild variant="outline" className="w-full justify-start">
                        <Link href="https://crowdfunding.milaap.org/inf-sba/?gad_source=1&gad_campaignid=22977966476&gbraid=0AAAAADgqGzlTu5GKa9u2vXSkcJr_f_3_A&gclid=Cj0KCQjwrojHBhDdARIsAJdEJ_f7DcQNvmD2TeTPFfORR_gplhl3B0i4wvhMNiTh8CN_DYdBAi6qWBcaAja6EALw_wcB" target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="mr-2 h-4 w-4" />
                            Learn about NIAID (National Institute of Allergy and Infectious Diseases)
                        </Link>
                    </Button>
                </CardContent>
            </Card>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {supportContacts.map(contact => (
                    <Card key={contact.type} className="glassmorphism">
                        <CardHeader>
                            <CardTitle className="text-lg text-white flex items-center gap-3">
                                <contact.icon className="w-6 h-6 text-primary"/>
                                {contact.type}
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <p className="text-sm text-muted-foreground">{contact.description}</p>
                            <div className="flex flex-col gap-2">
                                <Button variant="outline" asChild>
                                    <a href={`tel:${contact.phone}`}><Phone className="mr-2"/>{contact.phone}</a>
                                </Button>
                                <Button variant="outline" asChild>
                                    <a href={`mailto:${contact.email}`}><MessageSquare className="mr-2"/>{contact.email}</a>
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
