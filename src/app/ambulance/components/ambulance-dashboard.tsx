
"use client";

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { dummyAmbulances } from '@/lib/dummy-data';
import { Button } from '@/components/ui/button';
import { LogOut, Siren, Activity, Droplets, Thermometer, Wind, HeartPulse, Gauge, Shield, Battery, Wifi, Phone, UserCheck, MapPin, Clock } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Logo } from '@/components/icons/logo';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ChartContainer, ChartTooltipContent, type ChartConfig } from '@/components/ui/chart';
import { BarChart, Bar, ResponsiveContainer } from 'recharts';
import { Progress } from '@/components/ui/progress';

const chartConfig = {
  value: { label: "Value" },
} satisfies ChartConfig;

const StatChart = ({ title, value, unit, chartData, Icon, color }) => (
    <Card className="glassmorphism flex flex-col">
        <CardHeader className="pb-2">
            <CardDescription className="flex items-center gap-2 text-muted-foreground"><Icon className={`w-4 h-4 ${color}`} />{title}</CardDescription>
            <CardTitle className={`text-2xl font-bold ${color}`}>{value}<span className="text-sm font-normal text-muted-foreground">{unit}</span></CardTitle>
        </CardHeader>
        <CardContent className="flex-1 flex items-end">
            <ChartContainer config={chartConfig} className="w-full h-[50px]">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                        <Bar dataKey="value" fill={color} radius={2} />
                    </BarChart>
                </ResponsiveContainer>
            </ChartContainer>
        </CardContent>
    </Card>
);

const ReadinessIndicator = ({ title, value, Icon }) => (
    <div className="glassmorphism p-3 rounded-lg">
        <div className="flex justify-between items-center mb-1">
            <span className="text-sm font-medium text-white flex items-center gap-2"><Icon className="w-4 h-4 text-primary" />{title}</span>
            <span className="font-mono text-white">{value}%</span>
        </div>
        <Progress value={value} indicatorColor={value < 20 ? 'hsl(var(--destructive))' : value < 50 ? 'hsl(var(--primary))' : 'hsl(var(--secondary))'} />
    </div>
);

const ConnectivityIndicator = ({ title, value, Icon }) => (
     <div className="glassmorphism p-3 rounded-lg text-center">
        <Icon className="w-6 h-6 text-primary mx-auto mb-2" />
        <p className="text-sm font-semibold text-white">{value}</p>
        <p className="text-xs text-muted-foreground">{title}</p>
    </div>
)

export function AmbulanceDashboard() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const ambulanceId = searchParams.get('id');

    const [ambulance, setAmbulance] = useState<any>(null);
    
    // Simulating real-time data
    const [ambulanceData, setAmbulanceData] = useState({
        oxygenLevel: 98,
        cabinTemp: 22,
        humidity: 45,
        aqi: 15,
        defibrillatorReady: 99,
        oxygenCylinder: 85,
        powerBackup: 92,
        distanceToHospital: 4.2,
        eta: 12,
        patient: {
            heartRate: 88,
            spO2: 97,
            bloodPressure: '120/80',
        }
    });

    useEffect(() => {
        const foundAmbulance = dummyAmbulances.find(a => a.id === ambulanceId);
        setAmbulance(foundAmbulance);
    }, [ambulanceId]);

    // Simulate real-time data changes
    useEffect(() => {
        const interval = setInterval(() => {
            setAmbulanceData(prev => ({
                ...prev,
                oxygenLevel: Math.max(85, Math.min(100, prev.oxygenLevel + (Math.random() - 0.5) * 0.5)),
                cabinTemp: Math.max(18, Math.min(25, prev.cabinTemp + (Math.random() - 0.5) * 0.2)),
                humidity: Math.max(40, Math.min(50, prev.humidity + (Math.random() - 0.5) * 1)),
                eta: Math.max(5, prev.eta - 0.1),
                patient: {
                    ...prev.patient,
                    heartRate: Math.max(70, Math.min(110, prev.patient.heartRate + (Math.random() - 0.5) * 2)),
                    spO2: Math.max(94, Math.min(99, prev.patient.spO2 + (Math.random() - 0.4))),
                }
            }));
        }, 2000);
        return () => clearInterval(interval);
    }, []);
    

    if (!ambulance) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen text-center p-4">
                <h2 className="text-2xl font-bold text-destructive mb-4">Ambulance Not Found</h2>
                <p className="text-muted-foreground mb-8 max-w-md">The ambulance ID provided does not exist. Please login again.</p>
                <Button asChild>
                  <Link href="/login?role=ambulance">Return to Login</Link>
                </Button>
            </div>
        );
    }
    
    // Generate dummy chart data for aesthetics
    const generateChartData = () => Array.from({ length: 10 }, () => ({ value: Math.random() * 100 }));


    return (
        <div className="min-h-screen bg-background text-white p-4 space-y-6 flex flex-col">
            <header className="flex justify-between items-center">
                 <Link href="/home">
                    <Logo />
                 </Link>
                <div className='text-center'>
                    <h1 className="text-2xl font-bold text-gradient-glow">{ambulance.driver_name} - {ambulance.vehicle_no}</h1>
                    <p className="text-muted-foreground">AI Ambulance Command Center</p>
                </div>
                 <div className="flex items-center gap-4">
                    <Button variant="destructive" className="glowing-shadow-interactive"><Siren className="mr-2"/>PANIC</Button>
                    <Button variant="outline" onClick={() => router.push('/login?role=ambulance')}><LogOut className="mr-2"/>Logout</Button>
                </div>
            </header>

            <main className="flex-grow grid grid-cols-1 lg:grid-cols-12 gap-6">
                <div className="lg:col-span-3 space-y-6">
                    <Card className="glassmorphism glowing-shadow">
                        <CardHeader>
                            <CardTitle className="text-white">Emergency Readiness</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <ReadinessIndicator title="Defibrillator Ready" value={ambulanceData.defibrillatorReady} Icon={Activity} />
                            <ReadinessIndicator title="Oxygen Cylinder" value={ambulanceData.oxygenCylinder} Icon={Gauge} />
                            <ReadinessIndicator title="Power Backup" value={ambulanceData.powerBackup} Icon={Battery} />
                        </CardContent>
                    </Card>
                     <Card className="glassmorphism">
                        <CardHeader>
                            <CardTitle className="text-white">Crew & Response</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <ConnectivityIndicator title="Driver" value="Available" Icon={UserCheck} />
                            <ConnectivityIndicator title="Paramedic" value="Available" Icon={UserCheck} />
                             <ConnectivityIndicator title="Emergency Mode" value="Standby" Icon={Shield} />
                        </CardContent>
                    </Card>
                </div>

                <div className="lg:col-span-6 flex flex-col items-center justify-center gap-8">
                     <div className="grid grid-cols-3 gap-6 w-full">
                        <StatChart title="Heart Rate" value={ambulanceData.patient.heartRate.toFixed(0)} unit="bpm" chartData={generateChartData()} Icon={HeartPulse} color="hsl(var(--chart-1))" />
                        <StatChart title="Blood Oxygen" value={ambulanceData.patient.spO2.toFixed(0)} unit="%" chartData={generateChartData()} Icon={Droplets} color="hsl(var(--chart-2))" />
                        <StatChart title="Blood Pressure" value={ambulanceData.patient.bloodPressure} unit="" chartData={generateChartData()} Icon={Activity} color="hsl(var(--chart-3))" />
                    </div>

                    <div className="w-full flex-grow flex items-center justify-center">
                        <Button asChild size="lg" className="h-24 text-3xl glowing-shadow-interactive w-full">
                            <Link href="https://aistudio.google.com/apps/drive/113XiIrtijHWDzNtIbu7-1molDMWEoYhA?fullscreenApplet=true&showPreview=true&showAssistant=true" target="_blank" rel="noopener noreferrer">
                                RapidAid
                            </Link>
                        </Button>
                    </div>

                    <div className="grid grid-cols-4 gap-6 w-full">
                        <StatChart title="Oxygen Level" value={ambulanceData.oxygenLevel.toFixed(0)} unit="%" chartData={generateChartData()} Icon={Wind} color="hsl(var(--chart-4))" />
                        <StatChart title="Cabin Temp" value={ambulanceData.cabinTemp.toFixed(1)} unit="°C" chartData={generateChartData()} Icon={Thermometer} color="hsl(var(--chart-5))" />
                        <StatChart title="Humidity" value={ambulanceData.humidity.toFixed(0)} unit="%" chartData={generateChartData()} Icon={Droplets} color="hsl(var(--chart-1))" />
                        <StatChart title="Air Quality" value={ambulanceData.aqi.toFixed(0)} unit="AQI" chartData={generateChartData()} Icon={Wind} color="hsl(var(--chart-2))" />
                    </div>
                </div>

                <div className="lg:col-span-3 space-y-6">
                    <Card className="glassmorphism glowing-shadow">
                        <CardHeader>
                            <CardTitle className="text-white">Operational Metrics</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <ConnectivityIndicator title="Distance to Hospital" value={`${ambulanceData.distanceToHospital.toFixed(1)} km`} Icon={MapPin} />
                            <ConnectivityIndicator title="Estimated Arrival" value={`${ambulanceData.eta.toFixed(0)} min`} Icon={Clock} />
                        </CardContent>
                    </Card>
                     <Card className="glassmorphism">
                        <CardHeader>
                            <CardTitle className="text-white">Connectivity</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <ConnectivityIndicator title="GPS Signal" value="Strong" Icon={MapPin} />
                            <ConnectivityIndicator title="Network" value="5G" Icon={Wifi} />
                            <ConnectivityIndicator title="Dispatch Link" value="Connected" Icon={Phone} />
                        </CardContent>
                    </Card>
                </div>
            </main>
        </div>
    );

    