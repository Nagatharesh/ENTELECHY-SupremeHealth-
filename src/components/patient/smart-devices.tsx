
"use client";

import { useState, useEffect, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { Smartphone, Watch, Battery, Zap, AlertTriangle, ShieldAlert, Wifi, WifiOff, RefreshCw } from 'lucide-react';
import { Smartwatch } from '@/components/icons/smartwatch';
import { BarChart, Bar, AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Line, LineChart } from 'recharts';
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart";

const dummyDevices = [
    { name: 'Fitbit Charge 6', type: 'Watch', manufacturer: 'Fitbit', battery: 80, lastSync: '09:20 AM', connected: false, id: 'fitbit' },
    { name: 'Apple Watch Ultra', type: 'Watch', manufacturer: 'Apple', battery: 65, lastSync: '08:55 AM', connected: false, id: 'apple' },
    { name: 'Oura Ring Gen3', type: 'Ring', manufacturer: 'Oura', battery: 90, lastSync: '09:00 AM', connected: false, id: 'oura' },
    { name: 'Garmin Vivosmart', type: 'Band', manufacturer: 'Garmin', battery: 50, lastSync: '08:40 AM', connected: false, id: 'garmin' },
    { name: 'Xiaomi Mi Band 7', type: 'Band', manufacturer: 'Xiaomi', battery: 70, lastSync: '09:15 AM', connected: false, id: 'xiaomi' },
];

const healthMetrics = {
    heartRate: { value: 78, unit: 'bpm', trend: [72, 75, 74, 78, 76, 80, 78] },
    bloodPressure: { value: '120/80', unit: 'mmHg', trend: [{s:118,d:78}, {s:121,d:79}, {s:120,d:80}, {s:119,d:78}, {s:122,d:81}, {s:120,d:80}, {s:120,d:80}] },
    spO2: { value: 97, unit: '%', trend: [98, 97, 98, 96, 97, 98, 97] },
    sleep: { value: 7, unit: 'hrs', trend: [{deep:2, light:4, rem:1}, {deep:2.5, light:3.5, rem:1.5}, {deep:3, light:3, rem:1}] },
    steps: { value: 8500, unit: '', trend: [8000, 9500, 7000, 10500, 8200, 9100, 8500] },
};

const getMetricRisk = (metric, value) => {
    switch(metric) {
        case 'heartRate':
            if (value > 100 || value < 60) return 'critical';
            if (value > 90 || value < 65) return 'warning';
            return 'normal';
        case 'spO2':
            if (value < 94) return 'critical';
            if (value < 96) return 'warning';
            return 'normal';
        default: return 'normal';
    }
}

const riskColors = {
    normal: 'text-primary',
    warning: 'text-yellow-400',
    critical: 'text-destructive'
}

const riskBgColors = {
    normal: 'bg-primary/10',
    warning: 'bg-yellow-400/10',
    critical: 'bg-destructive/10'
}


export function SmartDevices() {
    const [devices, setDevices] = useState(dummyDevices);
    const [isScanning, setIsScanning] = useState(false);
    const [scanProgress, setScanProgress] = useState(0);

    const connectedDevice = useMemo(() => devices.find(d => d.connected), [devices]);

    useEffect(() => {
        let timer;
        if (isScanning) {
            setScanProgress(0);
            timer = setInterval(() => {
                setScanProgress(prev => {
                    if (prev >= 100) {
                        clearInterval(timer);
                        setIsScanning(false);
                        return 100;
                    }
                    return prev + 2;
                });
            }, 60);
        }
        return () => clearInterval(timer);
    }, [isScanning]);
    
    const startScan = () => {
        setIsScanning(true);
        // Reset device connection status for demo
        setDevices(dummyDevices.map(d => ({ ...d, connected: false })));
    }

    const toggleConnection = (id: string) => {
        setDevices(prev => 
            prev.map(d => 
                d.id === id ? { ...d, connected: !d.connected } : { ...d, connected: false }
            )
        );
    };

    return (
        <div className="space-y-6">
            {!connectedDevice ? (
                <DeviceScanner 
                    devices={devices} 
                    isScanning={isScanning} 
                    scanProgress={scanProgress} 
                    onScan={startScan}
                    onConnect={toggleConnection}
                />
            ) : (
                <MetricsDashboard device={connectedDevice} onDisconnect={() => toggleConnection(connectedDevice.id)} />
            )}
        </div>
    );
}

const DeviceScanner = ({ devices, isScanning, scanProgress, onScan, onConnect }) => {
    return (
        <Card className="glassmorphism glowing-shadow">
            <CardHeader>
                <CardTitle className="text-gradient-glow">Connect to Smart Devices</CardTitle>
                <CardDescription>Scan for nearby devices to sync your health data in real-time.</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center gap-8">
                <div className="relative w-80 h-80">
                    <div className="absolute inset-0 radar-container"/>
                    {isScanning && <div className="absolute inset-0 radar-sweep" style={{ animationDuration: '3s' }}/>}
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center animate-pulse">
                            <Wifi className="w-8 h-8 text-primary"/>
                        </div>
                    </div>
                     {isScanning && devices.map((device, index) => {
                         const angle = (index / devices.length) * 360 + 45;
                         const radius = 50 + (index * 15);
                         const x = 50 + (radius / 160) * 50 * Math.cos(angle * Math.PI / 180);
                         const y = 50 + (radius / 160) * 50 * Math.sin(angle * Math.PI / 180);

                        return (
                             <div key={device.id} className="absolute transform -translate-x-1/2 -translate-y-1/2 opacity-0" style={{ left: `${x}%`, top: `${y}%`, animation: `appear 0.5s forwards ${index * 0.3}s`}}>
                                <Smartwatch className="w-8 h-8 text-secondary animate-ping-slow" />
                             </div>
                        )
                    })}
                </div>
                <Button onClick={onScan} disabled={isScanning} className="w-64 glowing-shadow-interactive">
                    {isScanning ? `Scanning... (${Math.round(scanProgress)}%)` : <><RefreshCw className="mr-2"/>Start Scan</>}
                </Button>
                
                {scanProgress === 100 && !isScanning && (
                    <div className="w-full space-y-3 animate-fade-in-up">
                        <h3 className="text-center font-semibold text-white">Found {devices.length} devices</h3>
                        {devices.map(device => (
                            <DeviceCard key={device.id} device={device} onConnect={onConnect} />
                        ))}
                    </div>
                )}
            </CardContent>
        </Card>
    )
}

const DeviceCard = ({ device, onConnect }) => (
    <Card className="glassmorphism p-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
            <Smartwatch className="w-8 h-8 text-primary" />
            <div>
                <p className="font-bold text-white">{device.name}</p>
                <div className="text-sm text-muted-foreground">{device.manufacturer} - <Badge variant="outline">{device.type}</Badge></div>
            </div>
        </div>
        <div className="flex items-center gap-4">
            <div className="flex items-center gap-1 text-sm"><Battery className="w-4 h-4"/> {device.battery}%</div>
            <Button size="sm" onClick={() => onConnect(device.id)} className="glowing-shadow-interactive"><Zap className="mr-2"/>Connect</Button>
        </div>
    </Card>
)

const MetricsDashboard = ({ device, onDisconnect }) => {
    return (
        <div className="space-y-6 animate-fade-in-up">
            <Card className="glassmorphism glowing-shadow">
                <CardHeader className="flex-row items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Smartwatch className="w-12 h-12 text-primary" />
                        <div>
                            <CardTitle className="text-gradient-glow text-2xl">{device.name}</CardTitle>
                            <CardDescription>Connected via {device.manufacturer} Sync</CardDescription>
                        </div>
                    </div>
                    <div className="flex gap-4">
                         <Button variant="destructive" onClick={() => alert('Emergency alert triggered!')} className="h-12 glowing-shadow-interactive animate-pulse">
                            <ShieldAlert className="mr-2"/>Emergency
                        </Button>
                        <Button variant="outline" onClick={onDisconnect}><WifiOff className="mr-2"/>Disconnect</Button>
                    </div>
                </CardHeader>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                <MetricCard metric="heartRate" value={healthMetrics.heartRate.value} unit={healthMetrics.heartRate.unit} />
                <MetricCard metric="bloodPressure" value={healthMetrics.bloodPressure.value} unit={healthMetrics.bloodPressure.unit} />
                <MetricCard metric="spO2" value={healthMetrics.spO2.value} unit={healthMetrics.spO2.unit} />
                <MetricCard metric="sleep" value={healthMetrics.sleep.value} unit={healthMetrics.sleep.unit} />
                <MetricCard metric="steps" value={healthMetrics.steps.value} unit={healthMetrics.steps.unit} />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <MetricChart title="Heart Rate (Live)" data={healthMetrics.heartRate.trend.map((v, i) => ({name: i, uv:v}))} dataKey="uv" color="hsl(var(--primary))"/>
                <MetricChart title="Steps (7 Days)" data={healthMetrics.steps.trend.map((v, i) => ({name: `Day ${i+1}`, uv:v}))} dataKey="uv" color="hsl(var(--secondary))" type="bar"/>
            </div>
        </div>
    )
}

const MetricCard = ({ metric, value, unit }) => {
    const risk = getMetricRisk(metric, Array.isArray(value) ? value[0] : value);
    return (
        <Card className={cn("glassmorphism p-4", riskBgColors[risk])}>
            <p className="text-sm text-muted-foreground">{metric.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</p>
            <p className={cn("text-3xl font-bold", riskColors[risk])}>{value} <span className="text-lg font-normal text-muted-foreground">{unit}</span></p>
        </Card>
    );
};

const MetricChart = ({ title, data, dataKey, color, type = 'line' }) => {
    const ChartComponent = type === 'line' ? LineChart : BarChart;
    const PathComponent = type === 'line' ? Line : Bar;
    return (
        <Card className="glassmorphism p-4 h-64 glowing-shadow">
            <h3 className="text-white font-semibold mb-4">{title}</h3>
            <ResponsiveContainer width="100%" height="100%">
                <ChartComponent data={data} margin={{ top: 5, right: 20, left: -10, bottom: -10 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border) / 0.5)" />
                    <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                    <Tooltip content={<ChartTooltipContent indicator="dot" />} cursor={false} wrapperStyle={{ backgroundColor: 'hsl(var(--background))', border: '1px solid hsl(var(--border))', borderRadius: 'var(--radius)'}}/>
                    <PathComponent type="monotone" dataKey={dataKey} stroke={color} fill={color} strokeWidth={2} dot={false} barSize={20} radius={type === 'bar' ? [4, 4, 0, 0] : 0} />
                </ChartComponent>
            </ResponsiveContainer>
        </Card>
    );
};




    