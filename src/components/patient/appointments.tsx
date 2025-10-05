

"use client";

import { useState, useMemo, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Calendar, Clock, Bot, PlusCircle, Video, MessageSquare, ArrowRight, ArrowLeft, Star, Users, BriefcaseMedical } from "lucide-react";
import { Patient, dummyDoctors, dummyHospitals, Doctor } from "@/lib/dummy-data";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { addDays, format, isSameDay } from 'date-fns';
import { useToast } from "@/hooks/use-toast";
import Image from 'next/image';
import { Progress } from "../ui/progress";
import Link from 'next/link';


const getDoctorById = (doctorId: string) => dummyDoctors.find(d => d.doctorId === doctorId);
const getHospitalById = (hospitalId: string) => dummyHospitals.find(h => h.hospitalId === hospitalId);

const specialties = [...new Set(dummyDoctors.map(d => d.specialty))];
const hospitals = [...new Set(dummyHospitals.map(h => h.name))];
const cities = [...new Set(dummyHospitals.map(h => h.location.split(',')[0]))];

export function Appointments({ patient, showBookingButton = true }: { patient: Patient, showBookingButton?: boolean }) {
  const [appointments, setAppointments] = useState(patient.appointments);
  const { toast } = useToast();
  const [activeInteraction, setActiveInteraction] = useState<{type: 'chat' | 'video' | 'summary', data: any} | null>(null);

  const sortedAppointments = [...appointments].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  const upcomingAppointments = sortedAppointments.filter(a => new Date(a.date) >= new Date());
  const pastAppointments = sortedAppointments.filter(a => new Date(a.date) < new Date());

  const handleNewAppointment = (newAppointment) => {
    setAppointments(prev => [...prev, newAppointment]);
    toast({
      title: "Appointment Booked!",
      description: `Your appointment with ${getDoctorById(newAppointment.doctorId)?.name} is confirmed for ${format(new Date(newAppointment.date), 'PPP p')}. Your token is #${newAppointment.token}.`,
    });
  };
  
  const handleInteraction = (type, data) => {
    setActiveInteraction({type, data});
  }

  return (
    <div className="space-y-6">
        <div className="flex justify-between items-center">
            <h2 className="text-3xl font-bold text-gradient-glow">Appointments</h2>
            <div className="flex gap-2">
              {showBookingButton && <BookingDialog onBook={handleNewAppointment} patientId={patient.patientId} />}
              <VisitedHospitalDialog />
            </div>
        </div>
        
        <Card className="glassmorphism glowing-shadow">
            <CardHeader>
                <CardTitle className="text-gradient-glow">Appointment Timeline</CardTitle>
            </CardHeader>
            <CardContent>
                <AppointmentTimeline appointments={sortedAppointments} />
            </CardContent>
        </Card>

        {upcomingAppointments.length > 0 && (
            <Card className="glassmorphism glowing-shadow">
                <CardHeader>
                  <CardTitle className="text-gradient-glow">Upcoming Appointments</CardTitle>
                  <Dialog>
                    <DialogContent className="hidden" />
                      <DialogHeader>
                          <DialogTitle>AI Suggestion</DialogTitle>
                           <DialogDescription className="flex items-center gap-2 text-primary animate-pulse"><Bot className="w-5 h-5"/>AI Suggestion: An earlier slot for Dr. Neha Kapoor is available on Oct 18 at Apollo Hospital.</DialogDescription>
                      </DialogHeader>
                  </Dialog>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {upcomingAppointments.map((appt) => (
                            <AppointmentCard key={appt.appointmentId} appointment={appt} onInteraction={handleInteraction} />
                        ))}
                    </div>
                </CardContent>
            </Card>
        )}
      
      <Card className="glassmorphism">
        <CardHeader>
          <CardTitle className="text-gradient-glow">Past Appointments</CardTitle>
        </CardHeader>
        <CardContent>
            {pastAppointments.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {pastAppointments.map((appt) => (
                    <AppointmentCard key={appt.appointmentId} appointment={appt} isPast onInteraction={handleInteraction}/>
                    ))}
                </div>
            ) : (
                <p className="text-muted-foreground text-center py-8">No past appointments.</p>
            )}
        </CardContent>
      </Card>
      
       <InteractionDialog activeInteraction={activeInteraction} onClose={() => setActiveInteraction(null)} />
    </div>
  );
}

const VisitedHospitalDialog = () => (
  <Dialog>
    <DialogTrigger asChild>
      <Button variant="outline">Visited Hospital</Button>
    </DialogTrigger>
    <DialogContent className="glassmorphism">
      <DialogHeader>
        <DialogTitle className="text-gradient-glow">Select a Hospital</DialogTitle>
      </DialogHeader>
      <div className="flex flex-col gap-4 py-4">
        <Button asChild variant="outline" className="justify-start">
          <Link href="https://www.practo.com/chennai/hospital/sims-hospital-vadapalani-4/doctors?utm_source=google&utm_medium=reserve_with_google&utm_campaign=establishment_feed&hl=en-IN&gei=fkniaNOfOZaG4-EPvtvMiAI&rwg_token=ACgRB3c0FKrI5QEW8iz9KrWQshQoIkL58ryQyY7uI389ZoM0QKN6blX4hK4WtfnMDorH9TaadWdkZno2Lbum9FRnVhy_yAp4NQ%3D%3D" target="_blank" rel="noopener noreferrer">
            Sims Hospital
          </Link>
        </Button>
        <Button asChild variant="outline" className="justify-start">
          <Link href="https://www.apollohospitals.com/campaigns/chennai/consultleads-v2/?utm_source=paid_sitelink&utm_medium=cpc&utm_campaign=20761217977&utm_adgroup=157733109486&utm_match_type=e&network=g&ad=691394364139&utm_device=c&utm_keyword=apollo&utm_gclid=Cj0KCQjwrojHBhDdARIsAJdEJ_ehmpucYWaLT9ZbHQuPkYwpTXOrRFHQVsr1f1EsiaYcaEUd8PNkJCYaAiBzEALw_wcB&gad_source=1&gad_campaignid=20761217977&gbraid=0AAAAACp3XpK25BZsqFprxYspeLE82uKaH&gclid=Cj0KCQjwrojHBhDdARIsAJdEJ_ehmpucYWaLT9ZbHQuPkYwpTXOrRFHQVsr1f1EsiaYcaEUd8PNkJCYaAiBzEALw_wcB" target="_blank" rel="noopener noreferrer">
            Apollo Hospital
          </Link>
        </Button>
      </div>
    </DialogContent>
  </Dialog>
);

const InteractionDialog = ({ activeInteraction, onClose }) => {
    if (!activeInteraction) return null;

    const { type, data } = activeInteraction;
    const doctor = getDoctorById(data.doctorId);

    let title = '';
    let content = null;

    switch (type) {
        case 'chat':
            title = `Chat with Dr. ${doctor?.name}`;
            content = <p className="text-lg italic text-white p-4 glassmorphism rounded-lg">"{data.chatResponse}"</p>;
            break;
        case 'video':
            title = `Video Call with Dr. ${doctor?.name}`;
            content = (
                <div className="w-full aspect-video bg-black rounded-lg flex items-center justify-center glassmorphism glowing-shadow">
                    <div className="relative w-24 h-24">
                        <div className="absolute inset-0 rounded-full bg-primary animate-ripple"/>
                        <div className="absolute inset-2 rounded-full bg-primary animate-ripple" style={{animationDelay: '0.5s'}}/>
                        <Video className="w-12 h-12 text-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"/>
                    </div>
                </div>
            );
            break;
        case 'summary':
            title = `Summary for visit on ${format(new Date(data.date), 'PPP')}`;
            content = <p className="text-lg text-white p-4 glassmorphism rounded-lg">{data.summary}</p>;
            break;
    }

    return (
        <Dialog open={true} onOpenChange={onClose}>
            <DialogContent className="glassmorphism">
                <DialogHeader>
                    <DialogTitle className="text-gradient-glow">{title}</DialogTitle>
                </DialogHeader>
                {content}
            </DialogContent>
        </Dialog>
    );
};


const AppointmentTimeline = ({ appointments }) => {
    if (!appointments || appointments.length === 0) return <p className="text-muted-foreground">No appointments to show.</p>;
  
    return (
      <div className="relative w-full h-48 p-4">
        <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gradient-to-r from-primary/20 via-secondary/20 to-accent/20"/>
        <div className="relative flex justify-between h-full">
          {appointments.map((appt, index) => {
            const isPast = new Date(appt.date) < new Date();
            const doctor = getDoctorById(appt.doctorId);
            const position = (index / (appointments.length -1)) * 100;
  
            return (
              <div 
                key={appt.appointmentId} 
                className="group absolute top-1/2 transform -translate-x-1/2 -translate-y-1/2" 
                style={{ left: `${position}%` }}
              >
                <div className={cn("w-4 h-4 rounded-full border-2 cursor-pointer transition-all duration-300", 
                  isPast ? "bg-muted border-muted-foreground" : "bg-primary border-primary animate-pulse",
                  "group-hover:scale-150"
                  )}>
                </div>
                <div className="absolute bottom-full mb-3 left-1/2 -translate-x-1/2 w-48 p-2 glassmorphism opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10">
                  <p className="font-bold text-sm text-white">{doctor?.name}</p>
                  <p className="text-xs text-muted-foreground">{format(new Date(appt.date), 'MMM d, yyyy')}</p>
                  <Badge variant={isPast ? 'secondary' : 'default'} className="mt-1 text-xs">{isPast ? 'Completed' : 'Upcoming'}</Badge>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };
  

const AppointmentCard = ({ appointment, isPast = false, onInteraction }) => {
  const doctor = getDoctorById(appointment.doctorId);
  const hospital = getHospitalById(appointment.hospitalId);

  return (
    <div
      className={cn(
        "p-4 rounded-lg flex flex-col gap-4 transition-all duration-300 glassmorphism timeline-card-glow",
        appointment.urgent ? "border-l-4 border-destructive shadow-destructive/20" : "hover:border-primary/50",
        isPast && "opacity-70 hover:opacity-100"
      )}
    >
      <div className="flex-grow flex items-start gap-4">
         <Image src={`https://i.pravatar.cc/150?u=${doctor?.doctorId}`} alt={doctor?.name || ''} width={50} height={50} className="rounded-full border-2 border-primary/30" />
        <div className="flex-grow">
            <p className="font-semibold text-white text-lg">{doctor?.name}</p>
            <p className="text-sm text-muted-foreground">{hospital?.name}</p>
            <div className="flex items-center gap-2 text-sm text-primary mt-2">
            <Clock className="w-4 h-4" />
            <span>{format(new Date(appointment.date), 'EEE, MMM d, yyyy @ h:mm a')}</span>
            </div>
        </div>
        {appointment.urgent && <Badge variant="destructive">Urgent</Badge>}
      </div>

      {!isPast ? (
        <>
            <div className="grid grid-cols-2 gap-4 text-center">
                <div className="glassmorphism p-2 rounded-lg">
                    <p className="text-sm text-muted-foreground">Token No.</p>
                    <p className="text-2xl font-bold text-gradient-glow">#{appointment.token}</p>
                </div>
                <div className="glassmorphism p-2 rounded-lg">
                    <p className="text-sm text-muted-foreground">Wait Time</p>
                    <p className="text-2xl font-bold text-gradient-glow">~{appointment.waitTime}m</p>
                </div>
            </div>
            <Progress value={appointment.patientsAhead / (appointment.patientsAhead + appointment.token) * 100} className="h-2" />
            <div className="flex gap-2">
                <Button size="sm" variant="outline" className="w-full relative overflow-hidden aura-breathing" onClick={() => onInteraction('chat', appointment)}>
                    <MessageSquare className="w-4 h-4 mr-2"/>Chat
                </Button>
                <Button size="sm" variant="outline" className="w-full relative overflow-hidden animate-ripple" onClick={() => onInteraction('video', appointment)}>
                    <Video className="w-4 h-4 mr-2"/>Video Call
                </Button>
            </div>
        </>
      ) : (
        <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground">Your feedback:</p>
                 <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className={cn("w-5 h-5 cursor-pointer transition-colors", star <= appointment.feedback ? "text-yellow-400 fill-yellow-400" : "text-muted-foreground hover:text-yellow-300")} />
                    ))}
                </div>
            </div>
             <Button size="sm" variant="secondary" className="w-full" onClick={() => onInteraction('summary', appointment)}>View Summary</Button>
        </div>
      )}
    </div>
  );
};


function BookingDialog({ onBook, patientId }) {
    const [open, setOpen] = useState(false);
    const [showRadar, setShowRadar] = useState(false);
    const { toast } = useToast();

    const handleTriggerClick = () => {
        setShowRadar(true);
        setTimeout(() => {
            setShowRadar(false);
            setOpen(true);
        }, 2000);
    }
    
    const handleBookAppointment = (newAppointment) => {
        onBook(newAppointment);
        setOpen(false);
    }

    return (
        <>
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button onClick={handleTriggerClick} className="glowing-shadow-interactive"><PlusCircle className="mr-2" /> Book New Appointment</Button>
            </DialogTrigger>
            <DialogContent className="glassmorphism sm:max-w-[600px]">
                 <BookingWizard onBook={handleBookAppointment} patientId={patientId} />
            </DialogContent>
        </Dialog>
        
        <Dialog open={showRadar} onOpenChange={setShowRadar}>
            <DialogContent className="glassmorphism bg-transparent border-none shadow-none flex items-center justify-center p-0">
                <DialogHeader>
                  <DialogTitle className="sr-only">Finding Doctors</DialogTitle>
                </DialogHeader>
                <div className="radar-container">
                    <div className="radar-sweep"></div>
                    <div className="radar-marker-center"></div>
                </div>
            </DialogContent>
        </Dialog>
        </>
    )
}

export function BookingWizard({ onBook, patientId, preselectedDoctor = null, onBack = null }) {
    const [step, setStep] = useState(1);

    const [selectedSpecialty, setSelectedSpecialty] = useState<string | null>(null);
    const [selectedHospital, setSelectedHospital] = useState<string | null>(null);
    const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [selectedTime, setSelectedTime] = useState<string | null>(null);
    
    useEffect(() => {
        if (preselectedDoctor) {
            const hospital = getHospitalById(preselectedDoctor.hospitalId);
            
            setSelectedSpecialty(preselectedDoctor.specialty);
            setSelectedHospital(preselectedDoctor.hospitalId);
            setSelectedDoctor(preselectedDoctor);
            setStep(3); // Skip to date/time selection
        }
    }, [preselectedDoctor]);


    const filteredHospitals = useMemo(() => {
        return dummyHospitals;
    }, []);
    
    const filteredDoctors = useMemo(() => {
        let doctors = dummyDoctors;
        if (selectedSpecialty) doctors = doctors.filter(d => d.specialty === selectedSpecialty);
        if (selectedHospital) doctors = doctors.filter(d => d.hospitalId === selectedHospital);
        return doctors;
    }, [selectedSpecialty, selectedHospital]);

    const handleNext = () => setStep(s => s + 1);
    const handleBack = () => {
        if (preselectedDoctor && step === 3 && onBack) {
            onBack();
        } else {
            setStep(s => s - 1);
        }
    }

    const reset = () => {
        setStep(1);
        setSelectedSpecialty(null);
        setSelectedHospital(null);
        setSelectedDoctor(null);
        setSelectedDate(null);
        setSelectedTime(null);
    };

    const handleConfirmBooking = () => {
      if (!selectedDoctor || !selectedDate || !selectedTime) return;

      const [hours, minutes] = selectedTime.split(':');
      const bookingDateTime = new Date(selectedDate);
      bookingDateTime.setHours(parseInt(hours), parseInt(minutes), 0, 0);

      const newAppointment = {
        appointmentId: `APP-${Date.now()}`,
        date: bookingDateTime.toISOString(),
        doctorId: selectedDoctor.doctorId,
        hospitalId: selectedDoctor.hospitalId,
        status: "booked",
        urgent: false,
        token: Math.floor(Math.random() * 20) + 1,
        patientsAhead: Math.floor(Math.random() * 5),
        waitTime: Math.floor(Math.random() * 30) + 5,
        chatResponse: "Your appointment is confirmed. Please arrive 15 minutes early.",
        summary: "New appointment booked.",
        feedback: 0,
      };
      onBook(newAppointment);
      reset();
    };

    const renderStep = () => {
        switch (step) {
            case 1: // Specialty, Hospital
                return <Step1 
                    specialty={selectedSpecialty} setSpecialty={setSelectedSpecialty}
                    hospital={selectedHospital} setHospital={setSelectedHospital}
                    hospitals={filteredHospitals} />;
            case 2: // Doctor
                return <Step2 doctors={filteredDoctors} selected={selectedDoctor} onSelect={setSelectedDoctor} />;
            case 3: // Date & Time
                return <Step3 
                    doctor={selectedDoctor} 
                    date={selectedDate} setDate={setSelectedDate}
                    time={selectedTime} setTime={setSelectedTime}
                />;
            case 4: // Confirmation
                return <Step4 
                    doctor={selectedDoctor}
                    hospital={getHospitalById(selectedDoctor?.hospitalId || '')}
                    date={selectedDate}
                    time={selectedTime}
                />;
            default:
                return null;
        }
    };
    
    const canGoNext = () => {
        switch (step) {
            case 1: return selectedSpecialty && selectedHospital;
            case 2: return selectedDoctor;
            case 3: return selectedDate && selectedTime;
            case 4: return true;
            default: return false;
        }
    };

    return (
        <>
            <DialogHeader>
                <DialogTitle className="text-gradient-glow text-2xl">Book an Appointment</DialogTitle>
                <DialogDescription>Step {step} of 4: Find your doctor and book a slot.</DialogDescription>
            </DialogHeader>
            
            <div className="my-6 min-h-[300px]">
                {renderStep()}
            </div>
            
            <DialogFooter className="flex justify-between w-full">
                <div>{step > 1 && <Button variant="outline" onClick={handleBack}><ArrowLeft className="mr-2"/> Back</Button>}</div>
                <div>
                    {step < 4 && <Button onClick={handleNext} disabled={!canGoNext()} className="glowing-shadow-interactive">Next <ArrowRight className="ml-2"/></Button>}
                    {step === 4 && <Button onClick={handleConfirmBooking} className="glowing-shadow-interactive">Confirm Booking</Button>}
                </div>
            </DialogFooter>
        </>
    );
}

const Step1 = ({ specialty, setSpecialty, hospital, setHospital, hospitals }) => (
    <div className="space-y-4 animate-fade-in-up">
        <h3 className="font-semibold text-lg text-white">Filter your search</h3>
        <Select value={specialty || ''} onValueChange={setSpecialty}>
            <SelectTrigger><SelectValue placeholder="Select Specialty..." /></SelectTrigger>
            <SelectContent>
                {specialties.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
            </SelectContent>
        </Select>
        <Select value={hospital || ''} onValueChange={setHospital}>
            <SelectTrigger><SelectValue placeholder="Select Hospital" /></SelectTrigger>
            <SelectContent>
                {hospitals.map(h => <SelectItem key={h.hospitalId} value={h.hospitalId}>{h.name}</SelectItem>)}
            </SelectContent>
        </Select>
    </div>
);

const Step2 = ({ doctors, selected, onSelect }) => (
    <div className="space-y-3 animate-fade-in-up">
        <h3 className="font-semibold text-lg text-white">Select a Doctor</h3>
        <div className="max-h-[300px] overflow-y-auto space-y-2 pr-2">
            {doctors.length > 0 ? doctors.map(doc => {
                const hospital = getHospitalById(doc.hospitalId);
                return (
                    <Card 
                        key={doc.doctorId}
                        className={cn("glassmorphism cursor-pointer p-3 flex items-center gap-4 transition-all", selected?.doctorId === doc.doctorId && "border-primary shadow-primary/30 shadow-lg")}
                        onClick={() => onSelect(doc)}
                    >
                       <Image src={`https://i.pravatar.cc/150?u=${doc.doctorId}`} alt={doc.name} width={40} height={40} className="rounded-full" />
                        <div className="flex-grow">
                            <p className="font-bold text-white">{doc.name}</p>
                            <p className="text-xs text-muted-foreground">{hospital?.name}, {hospital?.location}</p>
                             <div className="text-xs text-muted-foreground flex gap-4 mt-1">
                                <span>Queue: {doc.queue}</span>
                                <span>Wait: ~{doc.waitTime}</span>
                             </div>
                        </div>
                        <div className="flex items-center gap-1 text-yellow-400">
                            <Star className="w-4 h-4 fill-current"/>
                            <span className="font-bold">{doc.rating}</span>
                        </div>
                    </Card>
                )
            }) : <p className="text-muted-foreground text-center py-10">No doctors match your criteria.</p>}
        </div>
    </div>
);

const Step3 = ({ doctor, date, setDate, time, setTime }) => {
    const today = new Date();
    const availableDates = Array.from({ length: 7 }, (_, i) => addDays(today, i));
    
    // Dummy slots for every doctor for demo purposes
    const timeSlots = doctor?.slots || ["09:00", "10:00", "11:00", "14:00", "15:00", "16:00"];

    return (
        <div className="space-y-4 animate-fade-in-up">
            <h3 className="font-semibold text-lg text-white">Select Date & Time for <span className="text-primary">{doctor?.name}</span></h3>
            <div>
                <h4 className="font-medium text-white mb-2">Date</h4>
                <div className="flex gap-2">
                    {availableDates.map(d => (
                        <Button 
                            key={d.toString()} 
                            variant={isSameDay(d, date || new Date(0)) ? 'default' : 'outline'}
                            onClick={() => setDate(d)}
                            className="flex flex-col h-auto p-2"
                        >
                            <span className="text-xs">{format(d, 'EEE')}</span>
                            <span className="font-bold text-lg">{format(d, 'd')}</span>
                        </Button>
                    ))}
                </div>
            </div>
            <div>
                <h4 className="font-medium text-white mb-2">Time</h4>
                {date ? (
                    <div className="grid grid-cols-4 gap-2">
                        {timeSlots.map(t => (
                            <Button 
                                key={t}
                                variant={time === t ? 'default' : 'outline'}
                                onClick={() => setTime(t)}
                            >
                                {t}
                            </Button>
                        ))}
                    </div>
                ) : <p className="text-muted-foreground">Please select a date first.</p>}
            </div>
        </div>
    )
};


const Step4 = ({ doctor, hospital, date, time }) => {
    if (!doctor || !hospital || !date || !time) return <p className="text-destructive">Something went wrong. Please go back.</p>;

    return (
        <div className="space-y-4 animate-fade-in-up">
            <h3 className="font-semibold text-lg text-white">Confirm your Appointment</h3>
            <Card className="glassmorphism p-4">
                <p><span className="font-semibold text-muted-foreground">Doctor:</span> <span className="text-white font-bold">{doctor.name} ({doctor.specialty})</span></p>
                <p><span className="font-semibold text-muted-foreground">Hospital:</span> <span className="text-white">{hospital.name}, {hospital.location}</span></p>
                <p><span className="font-semibold text-muted-foreground">Date & Time:</span> <span className="text-white">{format(date, 'EEEE, MMMM d, yyyy')} at {time}</span></p>
            </Card>
        </div>
    );
};
