
"use client";

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { Patient, dummyDoctors, Doctor } from '@/lib/dummy-data';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Upload, Camera, FileScan, Bot, X, Leaf, Pill, ChevronRight, MessageSquare, Video, Calendar, BarChart, History, Activity } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { BookingWizard } from './appointments';

// --- Expanded Dummy Data for Rich Analytics ---

const skinAnalysisData = {
    disease: 'Psoriasis',
    analytics: {
        stage: [
            { name: 'Stage 1', value: 12 },
            { name: 'Stage 2', value: 38 },
            { name: 'Stage 3', value: 45 },
            { name: 'Stage 4', value: 5 },
        ],
        medicines: [
            { name: 'Topical Steroids', availability: 80, rate: 350 },
            { name: 'Methotrexate', availability: 65, rate: 800 },
            { name: 'Aloe Vera Gel', availability: 95, rate: 150 },
        ],
        effectiveness: [
            { name: 'Steroids', improvement: 70 },
            { name: 'Methotrexate', improvement: 85 },
            { name: 'Aloe Vera', improvement: 40 },
        ]
    },
    suggestedDoctors: [dummyDoctors.find(d => d.specialty === "Dermatology")],
    history: [
        { date: '2024-03-15', severity: 30, medicine: 'Topical Steroids' },
        { date: '2024-06-20', severity: 45, medicine: 'Methotrexate' },
        { date: '2024-09-01', severity: 25, medicine: 'Aloe Vera Gel' },
    ]
};

const scanAnalysisData = {
    type: 'MRI Brain Scan',
    finding: 'Small benign tumor detected in right temporal lobe',
    analytics: {
        stage: [
            { name: 'Stage 1', value: 70 },
            { name: 'Stage 2', value: 25 },
            { name: 'Stage 3', value: 5 },
            { name: 'Stage 4', value: 0 },
        ],
        medicines: [
            { name: 'Tumor Inhibitors', availability: 50, rate: 5000 },
            { name: 'Brahmi', availability: 90, rate: 400 },
        ],
        effectiveness: [
            { name: 'Inhibitors', improvement: 65 },
            { name: 'Brahmi', improvement: 20 },
        ]
    },
    suggestedDoctors: [dummyDoctors.find(d => d.specialty === "Neurology"), dummyDoctors.find(d => d.specialty === "Oncology")],
     history: [
        { date: '2023-11-01', severity: 10, medicine: 'Observation' },
        { date: '2024-02-10', severity: 12, medicine: 'Observation' },
        { date: '2024-05-15', severity: 15, medicine: 'Brahmi' },
        { date: '2024-08-20', severity: 18, medicine: 'Inhibitor Trial' },
    ]
};

// --- Main Component ---

export function Diagnostics({ patient }: { patient: Patient }) {
    const { toast } = useToast();
    const [activeTab, setActiveTab] = useState('skin');
    const [uploadedImage, setUploadedImage] = useState<string | null>(null);
    const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);
    const [analysisResult, setAnalysisResult] = useState<any | null>(null);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [isBooking, setIsBooking] = useState(false);
    const [selectedDoctorForBooking, setSelectedDoctorForBooking] = useState<Doctor | null>(null);
    
    const [hasCameraPermission, setHasCameraPermission] = useState<boolean | null>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);


    useEffect(() => {
        return () => {
            if (videoRef.current && videoRef.current.srcObject) {
                const stream = videoRef.current.srcObject as MediaStream;
                stream.getTracks().forEach(track => track.stop());
            }
        };
    }, []);

    const getCameraPermission = async () => {
      if (hasCameraPermission) {
        if(videoRef.current && !videoRef.current.srcObject){
            const stream = await navigator.mediaDevices.getUserMedia({video: true});
            videoRef.current.srcObject = stream;
        }
        return;
      }
      try {
        const stream = await navigator.mediaDevices.getUserMedia({video: true});
        setHasCameraPermission(true);

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (error) {
        console.error('Error accessing camera:', error);
        setHasCameraPermission(false);
        toast({
          variant: 'destructive',
          title: 'Camera Access Denied',
          description: 'Please enable camera permissions in your browser settings to use this app.',
        });
      }
    };
    
    const takePicture = () => {
        if (videoRef.current && canvasRef.current) {
            const context = canvasRef.current.getContext('2d');
            if (context) {
                canvasRef.current.width = videoRef.current.videoWidth;
                canvasRef.current.height = videoRef.current.videoHeight;
                context.drawImage(videoRef.current, 0, 0);
                const dataUrl = canvasRef.current.toDataURL('image/png');
                setUploadedImage(dataUrl);
                setUploadedFileName('capture.png');
                stopCameraStream();
            }
        }
    };
    
    const stopCameraStream = () => {
        if (videoRef.current && videoRef.current.srcObject) {
            const stream = videoRef.current.srcObject as MediaStream;
            stream.getTracks().forEach(track => track.stop());
            videoRef.current.srcObject = null;
        }
    };


    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setUploadedImage(reader.result as string);
                setUploadedFileName(file.name);
            };
            reader.readAsDataURL(file);
        }
    };
    
    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        const file = e.dataTransfer.files?.[0];
         if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setUploadedImage(reader.result as string);
                setUploadedFileName(file.name);
            };
            reader.readAsDataURL(file);
        }
    }

    const handleAnalyze = () => {
        if (!uploadedImage && !uploadedFileName) {
            toast({ variant: 'destructive', title: 'No file selected', description: 'Please upload an image or report to analyze.' });
            return;
        }
        setIsAnalyzing(true);
        setTimeout(() => {
            if (activeTab === 'skin') {
                setAnalysisResult({ ...skinAnalysisData, type: 'skin' });
            } else {
                setAnalysisResult({...scanAnalysisData, type: 'scan'});
            }
            setIsAnalyzing(false);
        }, 3000);
    };

    const reset = () => {
        setUploadedImage(null);
        setUploadedFileName(null);
        setAnalysisResult(null);
        setIsAnalyzing(false);
        stopCameraStream();
        setHasCameraPermission(null);
    };
    
    const handleBookClick = (doctor) => {
        setSelectedDoctorForBooking(doctor);
        setIsBooking(true);
    };
    
    const handleAppointmentBooked = (newAppointment) => {
        toast({
          title: "Appointment Booked!",
          description: `Your token is 3. ETA: 20 minutes.`,
        });
        setIsBooking(false);
        setSelectedDoctorForBooking(null);
    };
    
    if (isBooking && selectedDoctorForBooking) {
        return (
             <Dialog open={isBooking} onOpenChange={setIsBooking}>
                <DialogContent className="glassmorphism max-w-4xl h-[90vh] flex flex-col">
                    <BookingWizard onBook={handleAppointmentBooked} patientId={patient.patientId} preselectedDoctor={selectedDoctorForBooking} onBack={() => setIsBooking(false)} />
                </DialogContent>
            </Dialog>
        );
    }

    return (
        <div className="space-y-6">
            <Card className="glassmorphism glowing-shadow">
                <CardHeader>
                    <CardTitle className="text-gradient-glow text-2xl">AI-Powered Diagnostics</CardTitle>
                    <CardDescription>Upload a skin photo or medical report for an instant AI analysis and treatment roadmap.</CardDescription>
                </CardHeader>
                <CardContent>
                    {analysisResult ? (
                        <AnalysisResult result={analysisResult} onReset={reset} onBook={handleBookClick} />
                    ) : (
                        <>
                            <div className="flex gap-2 mb-6">
                                <Button onClick={() => setActiveTab('skin')} variant={activeTab === 'skin' ? 'default' : 'outline'} className="flex-1">Skin Analysis</Button>
                                <Button onClick={() => setActiveTab('scan')} variant={activeTab === 'scan' ? 'default' : 'outline'} className="flex-1">Scan / Report Analysis</Button>
                            </div>
                            
                            <UploadArea
                                onFileChange={handleFileChange}
                                onDrop={handleDrop}
                                uploadedFileName={uploadedFileName}
                                activeTab={activeTab}
                                onRemove={() => { setUploadedImage(null); setUploadedFileName(null); }}
                            />

                            <CameraArea
                                activeTab={activeTab}
                                hasCameraPermission={hasCameraPermission}
                                getCameraPermission={getCameraPermission}
                                takePicture={takePicture}
                                videoRef={videoRef}
                                uploadedImage={uploadedImage}
                                stopCameraStream={stopCameraStream}
                            />
                            <canvas ref={canvasRef} className="hidden"></canvas>


                            <Button onClick={handleAnalyze} disabled={isAnalyzing || (!uploadedImage && !uploadedFileName)} className="w-full mt-6 glowing-shadow-interactive">
                                {isAnalyzing ? <><Bot className="animate-spin mr-2" />Analyzing...</> : 'Run AI Analysis'}
                            </Button>
                        </>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}

// --- UI Components for Analysis ---

const UploadArea = ({ onFileChange, onDrop, uploadedFileName, activeTab, onRemove }) => (
     <div 
        onDragOver={(e) => e.preventDefault()}
        onDrop={onDrop}
        className="border-2 border-dashed border-primary/30 rounded-lg p-8 text-center bg-background/30 transition-all duration-300 hover:bg-primary/10 hover:border-primary"
    >
        <input type="file" id="file-upload" className="hidden" onChange={onFileChange} accept="image/*,.pdf,.dicom" />
        <label htmlFor="file-upload" className="cursor-pointer">
            <Upload className="w-12 h-12 text-primary mx-auto mb-4" />
            <h3 className="font-semibold text-white text-lg">
                {uploadedFileName ? 'File Selected' : `Upload ${activeTab === 'skin' ? 'Skin Photo' : 'Scan Report'}`}
            </h3>
            <p className="text-muted-foreground mt-1">
                {uploadedFileName ? uploadedFileName : 'Or drag and drop a file here'}
            </p>
        </label>
        {uploadedFileName && <Button variant="ghost" size="sm" onClick={onRemove} className="mt-2 text-destructive"><X className="mr-1"/>Remove</Button>}
    </div>
);

const CameraArea = ({ activeTab, hasCameraPermission, getCameraPermission, takePicture, videoRef, uploadedImage, stopCameraStream }) => {
    if(activeTab !== 'skin') return null;

    return (
        <div className="mt-4">
             <Button onClick={getCameraPermission} variant="outline" className="w-full">
                <Camera className="mr-2" /> Use Camera
            </Button>
            {hasCameraPermission !== null && (
                 <div className="mt-4 space-y-4">
                    { !uploadedImage && <video ref={videoRef} className="w-full aspect-video rounded-md bg-black" autoPlay muted playsInline /> }
                    { !(hasCameraPermission) && (
                        <Alert variant="destructive">
                            <AlertTitle>Camera Access Required</AlertTitle>
                            <AlertDescription>Please allow camera access to use this feature.</AlertDescription>
                        </Alert>
                    )}
                    { hasCameraPermission && !uploadedImage && (
                        <Button onClick={takePicture} className="w-full">Take Picture</Button>
                    )}
                     { uploadedImage && (
                         <Button onClick={stopCameraStream} variant="outline" className="w-full">Close Camera</Button>
                     )}
                </div>
            )}
        </div>
    );
};

const AnalysisResult = ({ result, onReset, onBook }) => (
    <div className="animate-fade-in-up space-y-6">
        <div className="flex justify-between items-start">
            <div>
                <CardTitle className="text-gradient-glow text-2xl">Analysis Complete</CardTitle>
                <CardDescription>AI has analyzed the uploaded data. Here are the findings.</CardDescription>
            </div>
            <Button variant="ghost" onClick={onReset}><X className="mr-2"/>Start Over</Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
                <DiagnosisCard result={result} />
                <GlowingBarChartCard title="Disease Stage Distribution" data={result.analytics.stage} dataKey="value" unit="%" color="hsl(var(--primary))" />
                <GlowingBarChartCard title="Medicine Availability" data={result.analytics.medicines} dataKey="availability" unit="%" color="hsl(var(--secondary))" />
                <GlowingBarChartCard title="Predicted Treatment Effectiveness" data={result.analytics.effectiveness} dataKey="improvement" unit="%" color="hsl(var(--tertiary))" />
            </div>
            <div className="space-y-6">
                <DoctorsSuggestionsCard doctors={result.suggestedDoctors} onBook={onBook} />
            </div>
        </div>

        <HistoryAnalyticsCard history={result.history} />
    </div>
);

const DiagnosisCard = ({result}) => (
    <Card className="glassmorphism p-4 glowing-shadow">
        <h3 className="font-semibold text-lg text-white mb-2">{result.type === 'skin' ? 'Skin Diagnosis' : `Report Findings (${result.type})`}</h3>
        <p className="text-3xl font-bold text-primary">{result.disease || result.finding}</p>
    </Card>
);

const GlowingBarChartCard = ({ title, data, dataKey, unit, color }) => (
    <Card className="glassmorphism p-4 glowing-shadow">
        <h3 className="font-semibold text-lg text-white mb-4 flex items-center gap-2"><BarChart className="text-primary"/>{title}</h3>
        <div className="space-y-3">
            {data.map((item, index) => (
                <div key={index} className="space-y-1">
                    <div className="flex justify-between text-sm">
                        <span className="font-medium text-muted-foreground">{item.name}</span>
                        <span className="font-bold text-white">{item[dataKey]}{unit}</span>
                    </div>
                    <div className="h-3 w-full bg-background/50 rounded-full overflow-hidden border border-primary/20">
                        <div 
                            className="h-full rounded-full transition-all duration-1000"
                            style={{ 
                                width: `${item[dataKey]}%`,
                                background: `linear-gradient(90deg, ${color} 0%, hsl(var(--accent)) 100%)`,
                                boxShadow: `0 0 8px ${color}`
                            }}
                        />
                    </div>
                </div>
            ))}
        </div>
    </Card>
);

const DoctorsSuggestionsCard = ({ doctors, onBook }) => (
    <Card className="glassmorphism p-4 glowing-shadow">
        <h3 className="font-semibold text-lg text-white mb-4">Suggested Specialists</h3>
        <div className="space-y-3">
            {doctors.map(doctor => (
                doctor &&
                <div key={doctor.doctorId} className="glassmorphism p-3 rounded-lg flex items-center justify-between transition-all hover:border-primary/50 hover:scale-105">
                    <div>
                        <p className="font-bold text-white">{doctor.name}</p>
                        <p className="text-xs text-muted-foreground">{doctor.specialty}</p>
                        <Badge variant="outline" className="mt-1">{doctor.rating}/5 ★</Badge>
                    </div>
                    <Button size="sm" className="glowing-shadow-interactive" onClick={() => onBook(doctor)}>Book</Button>
                </div>
            ))}
        </div>
    </Card>
);

const HistoryAnalyticsCard = ({ history }) => (
    <Card className="glassmorphism p-4 glowing-shadow">
        <h3 className="font-semibold text-lg text-white mb-4 flex items-center gap-2"><History className="text-primary"/>Past Progression Analytics</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {history.map((record, index) => (
                <div key={index} className="glassmorphism p-3 rounded-lg flex flex-col items-center justify-end text-center h-48 relative overflow-hidden">
                    <p className="text-xs text-muted-foreground absolute top-2">{new Date(record.date).toLocaleDateString('en-GB', {month: 'short', year: 'numeric'})}</p>
                    <div 
                        className="w-full bg-gradient-to-t from-primary/50 to-secondary/50 rounded-t-md transition-all duration-700" 
                        style={{ height: `${record.severity}%` }}
                    >
                         <div className="h-full w-full" style={{boxShadow: `inset 0 0 10px hsl(var(--primary)/0.5)`}} />
                    </div>
                    <p className="font-bold text-xl text-white mt-2">{record.severity}%</p>
                    <p className="text-xs font-semibold text-muted-foreground">{record.medicine}</p>
                </div>
            ))}
        </div>
    </Card>
);

    