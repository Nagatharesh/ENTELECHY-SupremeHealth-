
"use client";

import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Calendar, Clock, Bot, PlusCircle, Video, MessageSquare, ArrowRight, ArrowLeft, Star } from "lucide-react";
import { Patient, dummyDoctors, dummyHospitals, Doctor } from "@/lib/dummy-data";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { addDays, format, isSameDay } from 'date-fns';
import { useToast } from "@/hooks/use-toast";


const getDoctorById = (doctorId: string) => dummyDoctors.find(d => d.doctorId === doctorId);
const getHospitalById = (hospitalId: string) => dummyHospitals.find(h => h.hospitalId === hospitalId);

const specialties = [...new Set(dummyDoctors.map(d => d.specialty))];
const cities = [...new Set(dummyHospitals.map(h => h.location.split(',')[0]))];

export function Appointments({ patient }: { patient: Patient }) {
  const [appointments, setAppointments] = useState(patient.appointments);
  const { toast } = useToast();

  const sortedAppointments = [...appointments].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  const upcomingAppointments = sortedAppointments.filter(a => new Date(a.date) >= new Date());
  const pastAppointments = sortedAppointments.filter(a => new Date(a.date) < new Date());

  const handleNewAppointment = (newAppointment) => {
    setAppointments(prev => [...prev, newAppointment]);
    toast({
      title: "Appointment Booked!",
      description: `Your appointment with ${getDoctorById(newAppointment.doctorId)?.name} is confirmed for ${format(new Date(newAppointment.date), 'PPP p')}.`,
      variant: "default",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-gradient-glow">Appointments</h2>
        <BookingWizard onBook={handleNewAppointment} patientId={patient.patientId} />
      </div>

      <Card className="glassmorphism glowing-shadow">
        <CardHeader>
          <CardTitle className="text-gradient-glow">Upcoming Appointments</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {upcomingAppointments.length > 0 ? upcomingAppointments.map((appt) => (
              <AppointmentCard key={appt.appointmentId} appointment={appt} />
            )) : (
              <p className="text-muted-foreground text-center py-8">No upcoming appointments.</p>
            )}
          </div>
        </CardContent>
      </Card>
      
      <Card className="glassmorphism">
        <CardHeader>
          <CardTitle className="text-gradient-glow">Past Appointments</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {pastAppointments.length > 0 ? pastAppointments.map((appt) => (
              <AppointmentCard key={appt.appointmentId} appointment={appt} isPast />
            )) : (
              <p className="text-muted-foreground text-center py-8">No past appointments.</p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

const AppointmentCard = ({ appointment, isPast = false }) => {
  const doctor = getDoctorById(appointment.doctorId);
  const hospital = getHospitalById(appointment.hospitalId);

  return (
    <div
      className={cn(
        "p-4 rounded-lg flex items-start gap-4 transition-all duration-300",
        appointment.urgent ? "bg-destructive/10 border-l-4 border-destructive" : "bg-card/50",
        isPast && "opacity-60"
      )}
    >
      <div className="p-3 bg-primary/10 rounded-full border border-primary/20">
        <Calendar className="w-8 h-8 text-primary" />
      </div>
      <div className="flex-grow">
        <p className="font-semibold text-white text-lg">{doctor?.name}</p>
        <p className="text-sm text-muted-foreground">{hospital?.name}</p>
        <div className="flex items-center gap-2 text-sm text-primary mt-2">
          <Clock className="w-4 h-4" />
          <span>{format(new Date(appointment.date), 'EEE, MMM d, yyyy @ h:mm a')}</span>
        </div>
      </div>
      <div className="flex flex-col items-end gap-2">
        {appointment.urgent && <Badge variant="destructive">Urgent</Badge>}
        {!isPast && (
          <div className="flex gap-2">
            <Button size="sm" variant="outline"><MessageSquare className="w-4 h-4 mr-2"/>Chat</Button>
            <Button size="sm" variant="outline"><Video className="w-4 h-4 mr-2"/>Video Call</Button>
          </div>
        )}
      </div>
    </div>
  );
};


function BookingWizard({ onBook, patientId }) {
    const [open, setOpen] = useState(false);
    const [step, setStep] = useState(1);

    const [selectedSpecialty, setSelectedSpecialty] = useState<string | null>(null);
    const [selectedCity, setSelectedCity] = useState<string | null>(null);
    const [selectedHospital, setSelectedHospital] = useState<string | null>(null);
    const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [selectedTime, setSelectedTime] = useState<string | null>(null);

    const filteredHospitals = useMemo(() => {
        return dummyHospitals.filter(h => h.location.startsWith(selectedCity || ''));
    }, [selectedCity]);
    
    const filteredDoctors = useMemo(() => {
        let doctors = dummyDoctors;
        if (selectedSpecialty) doctors = doctors.filter(d => d.specialty === selectedSpecialty);
        if (selectedHospital) doctors = doctors.filter(d => d.hospitalId === selectedHospital);
        else if (selectedCity) {
            const cityHospitals = filteredHospitals.map(h => h.hospitalId);
            doctors = doctors.filter(d => cityHospitals.includes(d.hospitalId));
        }
        return doctors;
    }, [selectedSpecialty, selectedCity, selectedHospital, filteredHospitals]);

    const handleNext = () => setStep(s => s + 1);
    const handleBack = () => setStep(s => s - 1);

    const reset = () => {
        setStep(1);
        setSelectedSpecialty(null);
        setSelectedCity(null);
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
        urgent: false
      };
      onBook(newAppointment);
      setOpen(false);
      reset();
    };

    const renderStep = () => {
        switch (step) {
            case 1: // Specialty, City, Hospital
                return <Step1 
                    specialty={selectedSpecialty} setSpecialty={setSelectedSpecialty}
                    city={selectedCity} setCity={setSelectedCity}
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
            case 1: return selectedSpecialty;
            case 2: return selectedDoctor;
            case 3: return selectedDate && selectedTime;
            case 4: return true;
            default: return false;
        }
    };

    return (
        <Dialog open={open} onOpenChange={(isOpen) => { if (!isOpen) reset(); setOpen(isOpen); }}>
            <DialogTrigger asChild>
                <Button className="glowing-shadow-interactive"><PlusCircle className="mr-2" /> Book New Appointment</Button>
            </DialogTrigger>
            <DialogContent className="glassmorphism sm:max-w-[600px]">
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
            </DialogContent>
        </Dialog>
    );
}

const Step1 = ({ specialty, setSpecialty, city, setCity, hospital, setHospital, hospitals }) => (
    <div className="space-y-4 animate-fade-in-up">
        <h3 className="font-semibold text-lg text-white">Filter your search</h3>
        <Select value={specialty || ''} onValueChange={setSpecialty}>
            <SelectTrigger><SelectValue placeholder="Select Specialty..." /></SelectTrigger>
            <SelectContent>
                {specialties.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
            </SelectContent>
        </Select>
        <Select value={city || ''} onValueChange={(v) => { setCity(v); setHospital(null); }}>
            <SelectTrigger><SelectValue placeholder="Select City (optional)" /></SelectTrigger>
            <SelectContent>
                {cities.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
            </SelectContent>
        </Select>
        <Select value={hospital || ''} onValueChange={setHospital} disabled={!city}>
            <SelectTrigger><SelectValue placeholder="Select Hospital (optional)" /></SelectTrigger>
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
                        <div className="flex-grow">
                            <p className="font-bold text-white">{doc.name}</p>
                            <p className="text-xs text-muted-foreground">{hospital?.name}, {hospital?.location}</p>
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
    const timeSlots = ["09:00", "10:00", "11:00", "14:00", "15:00", "16:00"];

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
                                {format(new Date(`1970-01-01T${t}:00`), 'p')}
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
                <p><span className="font-semibold text-muted-foreground">Date & Time:</span> <span className="text-white">{format(date, 'EEEE, MMMM d, yyyy')} at {format(new Date(`1970-01-01T${time}:00`), 'p')}</span></p>
            </Card>
        </div>
    );
};
