"use client";

import { useSearchParams } from "next/navigation";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  HeartPulse,
  Stethoscope,
  Hospital,
  Ambulance,
  Mail,
  Lock,
  Phone,
  Hash,
  Car,
} from "lucide-react";
import Link from 'next/link';
import { Logo } from '@/components/icons/logo';

const patientSchema = z.object({
  phone: z.string().min(10, "Please enter a valid phone number."),
});
const doctorSchema = z.object({
  email: z.string().email("Invalid email address."),
  password: z.string().min(8, "Password must be at least 8 characters."),
  nmrId: z.string().regex(/^[A-Z0-9]{8,12}$/, "Invalid NMR ID. Must be 8-12 alphanumeric characters."),
});
const hospitalSchema = z.object({
  email: z.string().email("Invalid email address."),
  password: z.string().min(8, "Password must be at least 8 characters."),
  nin: z.string().regex(/^[0-9]{10,14}$/, "Invalid NIN. Must be a 10-14 digit number."),
});
const ambulanceSchema = z.object({
  emailOrPhone: z.string().min(1, "This field is required."),
  password: z.string().min(8, "Password must be at least 8 characters."),
  vehicleNumber: z.string().regex(/^[A-Z0-9- ]{4,12}$/, "Invalid vehicle number. Must be 4-12 alphanumeric characters."),
});

type Role = "patient" | "doctor" | "hospital" | "ambulance";

const InputWithIcon = ({ icon: Icon, ...props }: { icon: React.ElementType } & React.ComponentProps<typeof Input>) => (
  <div className="relative">
    <Icon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
    <Input className="pl-10" {...props} />
  </div>
);

export function LoginForm() {
  const searchParams = useSearchParams();
  const defaultTab = (searchParams.get("role") as Role) || "patient";

  const patientForm = useForm<z.infer<typeof patientSchema>>({
    resolver: zodResolver(patientSchema),
    defaultValues: { phone: "" },
  });
  const doctorForm = useForm<z.infer<typeof doctorSchema>>({
    resolver: zodResolver(doctorSchema),
    defaultValues: { email: "", password: "", nmrId: "" },
  });
  const hospitalForm = useForm<z.infer<typeof hospitalSchema>>({
    resolver: zodResolver(hospitalSchema),
    defaultValues: { email: "", password: "", nin: "" },
  });
  const ambulanceForm = useForm<z.infer<typeof ambulanceSchema>>({
    resolver: zodResolver(ambulanceSchema),
    defaultValues: { emailOrPhone: "", password: "", vehicleNumber: "" },
  });

  function onPatientSubmit(values: z.infer<typeof patientSchema>) {
    console.log("Patient Login:", values);
    // TODO: Implement Firebase phone auth
  }
  function onDoctorSubmit(values: z.infer<typeof doctorSchema>) {
    console.log("Doctor Signup:", values);
    // TODO: Implement Firebase email/password auth
  }
  function onHospitalSubmit(values: z.infer<typeof hospitalSchema>) {
    console.log("Hospital Signup:", values);
    // TODO: Implement Firebase email/password auth
  }
  function onAmbulanceSubmit(values: z.infer<typeof ambulanceSchema>) {
    console.log("Ambulance Signup:", values);
    // TODO: Implement Firebase email/password auth
  }

  return (
    <div className="w-full max-w-md animate-fade-in-up z-10">
        <div className="flex justify-center mb-8">
            <Link href="/home">
                <Logo />
            </Link>
        </div>
      <Tabs defaultValue={defaultTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4 glassmorphism p-1 h-auto">
          <TabsTrigger value="patient"><HeartPulse className="mr-0 md:mr-2 h-4 w-4" /><span className="hidden md:inline">Patient</span></TabsTrigger>
          <TabsTrigger value="doctor"><Stethoscope className="mr-0 md:mr-2 h-4 w-4" /><span className="hidden md:inline">Doctor</span></TabsTrigger>
          <TabsTrigger value="hospital"><Hospital className="mr-0 md:mr-2 h-4 w-4" /><span className="hidden md:inline">Hospital</span></TabsTrigger>
          <TabsTrigger value="ambulance"><Ambulance className="mr-0 md:mr-2 h-4 w-4" /><span className="hidden md:inline">Ambulance</span></TabsTrigger>
        </TabsList>
        <Card className="glassmorphism mt-2 animate-glow-pulse">
            
          {/* Patient Tab */}
          <TabsContent value="patient">
            <CardHeader>
              <CardTitle className="text-gradient-glow">Patient Hub</CardTitle>
              <CardDescription>Login or create an account with your phone number.</CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...patientForm}>
                <form onSubmit={patientForm.handleSubmit(onPatientSubmit)} className="space-y-6">
                  <FormField
                    control={patientForm.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number</FormLabel>
                        <FormControl>
                          <InputWithIcon icon={Phone} type="tel" placeholder="+1 (555) 000-0000" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" className="w-full glowing-shadow-interactive">Send OTP</Button>
                </form>
              </Form>
            </CardContent>
          </TabsContent>
          
          {/* Doctor Tab */}
          <TabsContent value="doctor">
            <CardHeader>
              <CardTitle className="text-gradient-glow">Doctor Hub</CardTitle>
              <CardDescription>Login or register with your professional credentials.</CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...doctorForm}>
                <form onSubmit={doctorForm.handleSubmit(onDoctorSubmit)} className="space-y-4">
                  <FormField name="email" control={doctorForm.control} render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl><InputWithIcon icon={Mail} type="email" placeholder="dr.name@hospital.com" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField name="password" control={doctorForm.control} render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl><InputWithIcon icon={Lock} type="password" placeholder="********" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField name="nmrId" control={doctorForm.control} render={({ field }) => (
                      <FormItem>
                        <FormLabel>NMR ID</FormLabel>
                        <FormControl><InputWithIcon icon={Hash} type="text" placeholder="NMRA123456" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" className="w-full glowing-shadow-interactive">Login / Register</Button>
                </form>
              </Form>
            </CardContent>
          </TabsContent>

          {/* Hospital Tab */}
          <TabsContent value="hospital">
            <CardHeader>
                <CardTitle className="text-gradient-glow">Hospital Hub</CardTitle>
                <CardDescription>Access the hospital management dashboard.</CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...hospitalForm}>
                <form onSubmit={hospitalForm.handleSubmit(onHospitalSubmit)} className="space-y-4">
                    <FormField name="email" control={hospitalForm.control} render={({ field }) => (
                        <FormItem>
                            <FormLabel>Hospital Email</FormLabel>
                            <FormControl><InputWithIcon icon={Mail} type="email" placeholder="admin@hospital.com" {...field} /></FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                    />
                    <FormField name="password" control={hospitalForm.control} render={({ field }) => (
                        <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl><InputWithIcon icon={Lock} type="password" placeholder="********" {...field} /></FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                    />
                    <FormField name="nin" control={hospitalForm.control} render={({ field }) => (
                        <FormItem>
                            <FormLabel>NIN</FormLabel>
                            <FormControl><InputWithIcon icon={Hash} type="text" placeholder="10-14 digit number" {...field} /></FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                    />
                    <Button type="submit" className="w-full glowing-shadow-interactive">Login / Register</Button>
                </form>
                </Form>
            </CardContent>
          </TabsContent>

          {/* Ambulance Tab */}
          <TabsContent value="ambulance">
            <CardHeader>
                <CardTitle className="text-gradient-glow">Ambulance Hub</CardTitle>
                <CardDescription>Login to manage dispatches and vehicle status.</CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...ambulanceForm}>
                <form onSubmit={ambulanceForm.handleSubmit(onAmbulanceSubmit)} className="space-y-4">
                    <FormField name="emailOrPhone" control={ambulanceForm.control} render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email or Phone</FormLabel>
                            <FormControl><InputWithIcon icon={Mail} type="text" placeholder="team@ambulance.org" {...field} /></FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                    />
                    <FormField name="password" control={ambulanceForm.control} render={({ field }) => (
                        <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl><InputWithIcon icon={Lock} type="password" placeholder="********" {...field} /></FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                    />
                    <FormField name="vehicleNumber" control={ambulanceForm.control} render={({ field }) => (
                        <FormItem>
                            <FormLabel>Vehicle Number</FormLabel>
                            <FormControl><InputWithIcon icon={Car} type="text" placeholder="STATE-XX-1234" {...field} /></FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                    />
                    <Button type="submit" className="w-full glowing-shadow-interactive">Login / Register</Button>
                </form>
                </Form>
            </CardContent>
          </TabsContent>
        </Card>
      </Tabs>
    </div>
  );
}
