
"use client";

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { Patient, dummyDoctors, Doctor } from '@/lib/dummy-data';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Upload, Camera, FileScan, Bot, X, Leaf, Pill, ChevronRight, MessageSquare, Video, Calendar } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { BookingWizard } from './appointments';

const skinDiseasesData = [
    { disease: 'Psoriasis', stage: 'Moderate', modern: 'Topical Steroids, Methotrexate', ayurvedic: 'Aloe Vera gel, Turmeric paste', doctorId: 'DOC-006' },
    { disease: 'Eczema', stage: 'Mild', modern: 'Hydrocortisone cream', ayurvedic: 'Coconut oil, Neem paste', doctorId: 'DOC-009' },
    { disease: 'Fungal Infection', stage: 'Severe', modern: 'Antifungal cream, Oral Fluconazole', ayurvedic: 'Neem oil, Tulsi paste', doctorId: 'DOC-007' },
    { disease: 'Acne', stage: 'Moderate', modern: 'Benzoyl Peroxide, Retinoids', ayurvedic: 'Sandalwood paste, Tea tree oil', doctorId: 'DOC-009' },
];

const scanReportData = {
    type: 'MRI Brain Scan',
    finding: 'Small benign tumor detected in right temporal lobe',
    stage: 'Early Stage (1/4)',
    roadmap: [
        { step: 1, title: 'Consult Neurologist', details: 'Immediate consultation with a specialist.', doctorId: 'DOC-010' },
        { step: 2, title: 'Follow-up Imaging', details: 'Repeat MRI in 3 months to monitor growth.' },
        { step: 3, title: 'Medication', details: 'Potential start on tumor growth inhibitors if changes are observed.' },
        { step: 4, title: 'Lifestyle & Support', details: 'Physiotherapy and dietary adjustments. Ayurvedic support like Brahmi and Ashwagandha.' },
    ],
    doctor: dummyDoctors.find(d => d.doctorId === 'DOC-010')
};


export function Diagnostics({ patient }: { patient: Patient }) {
    const { toast } = useToast();
    const [activeTab, setActiveTab] = useState('skin'); // 'skin' or 'scan'
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
            // Stop camera stream when component unmounts
            if (videoRef.current && videoRef.current.srcObject) {
                const stream = videoRef.current.srcObject as MediaStream;
                stream.getTracks().forEach(track => track.stop());
            }
        };
    }, []);

    const getCameraPermission = async () => {
      if (hasCameraPermission) { // If permission is already granted, just start the stream
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
                const randomDisease = skinDiseasesData[Math.floor(Math.random() * skinDiseasesData.length)];
                setAnalysisResult({ ...randomDisease, doctor: dummyDoctors.find(d => d.doctorId === randomDisease.doctorId), type: 'skin' });
            } else {
                setAnalysisResult({...scanReportData, type: 'scan'});
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

        {result.type === 'skin' && <SkinResult result={result} onBook={onBook} />}
        {result.type === 'scan' && <ScanResult result={result} onBook={onBook} />}
    </div>
);

const getSeverityBadge = (severity) => {
    switch (severity?.toLowerCase()) {
        case 'mild': return 'default';
        case 'moderate': return 'secondary';
        case 'severe': return 'destructive';
        default: return 'outline';
    }
}

const SkinResult = ({ result, onBook }) => (
    <div className="space-y-4">
         <Card className="glassmorphism p-4">
            <h3 className="font-semibold text-lg text-white">Diagnosis</h3>
            <div className="flex justify-between items-center mt-2">
                <p className="text-4xl font-bold text-primary">{result.disease}</p>
                <Badge variant={getSeverityBadge(result.stage)} className="text-lg px-4 py-1">{result.stage}</Badge>
            </div>
        </Card>

        <div className="relative w-full aspect-video rounded-lg overflow-hidden glassmorphism p-2 glowing-shadow">
            <Image src="https://picsum.photos/seed/skin1/600/400" alt="Uploaded skin condition" layout="fill" objectFit="cover" className="rounded-md" />
            <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-40 h-40 border-4 border-dashed border-red-500 rounded-full animate-pulse bg-red-500/20"/>
            </div>
            <div className="absolute top-2 left-2 bg-background/70 p-2 rounded-md">
                 <p className="text-white font-bold">3D Visualization Overlay</p>
            </div>
        </div>

        <TreatmentPlan title="Modern Medicine" icon={Pill} plan={result.modern} />
        <TreatmentPlan title="Ayurvedic Remedies" icon={Leaf} plan={result.ayurvedic} />
        
        <SuggestedDoctor doctor={result.doctor} onBook={onBook} />
    </div>
);


const ScanResult = ({ result, onBook }) => (
     <div className="space-y-4">
        <Card className="glassmorphism p-4">
            <h3 className="font-semibold text-lg text-white">Diagnosis from {result.type}</h3>
            <div className="flex justify-between items-center mt-2">
                <p className="text-2xl font-bold text-primary max-w-md">{result.finding}</p>
                <Badge variant={getSeverityBadge(result.stage)} className="text-lg px-4 py-1">{result.stage}</Badge>
            </div>
        </Card>
        
        <div>
            <h3 className="font-semibold text-lg text-white mb-2">Treatment Roadmap</h3>
            <div className="space-y-2">
                {result.roadmap.map((item, index) => (
                    <div key={item.step} className="flex items-start gap-4">
                        <div className="flex flex-col items-center">
                            <div className={cn("w-10 h-10 rounded-full flex items-center justify-center font-bold text-primary-foreground", item.doctorId ? "bg-primary" : "bg-muted")}>
                                {item.step}
                            </div>
                            {index < result.roadmap.length - 1 && <div className="w-px h-12 bg-border" />}
                        </div>
                        <Card className="flex-1 glassmorphism p-3 timeline-card-glow" style={{ animationDelay: `${index * 100}ms` }}>
                           <p className="font-semibold text-white">{item.title}</p>
                           <p className="text-sm text-muted-foreground">{item.details}</p>
                           {item.doctorId && <Button size="sm" className="mt-2" onClick={() => onBook(dummyDoctors.find(d => d.doctorId === item.doctorId))}>Book with Specialist</Button>}
                        </Card>
                    </div>
                ))}
            </div>
        </div>

        <SuggestedDoctor doctor={result.doctor} onBook={onBook} />
    </div>
);


const TreatmentPlan = ({ title, icon: Icon, plan }) => (
    <Card className="glassmorphism">
        <CardHeader className="flex-row items-center gap-4 p-4">
            <Icon className="w-8 h-8 text-primary" />
            <CardTitle className="text-lg text-white m-0">{title}</CardTitle>
        </CardHeader>
        <CardContent className="p-4 pt-0">
            <p className="text-muted-foreground">{plan}</p>
        </CardContent>
    </Card>
);

const SuggestedDoctor = ({ doctor, onBook }) => {
    if (!doctor) return null;
    return (
        <Card className="glassmorphism glowing-shadow p-4">
             <h3 className="font-semibold text-lg text-white mb-2">Suggested Specialist</h3>
             <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                 <div className="flex items-center gap-4">
                     <Image src={`https://i.pravatar.cc/150?u=${doctor.doctorId}`} alt={doctor.name} width={60} height={60} className="rounded-full border-2 border-primary/50" />
                     <div>
                        <p className="font-bold text-white text-xl">{doctor.name}</p>
                        <p className="text-muted-foreground">{doctor.specialty}</p>
                        <p className="text-xs text-primary">{doctor.contact}</p>
                     </div>
                 </div>
                 <div className="flex gap-2">
                     <Button variant="outline"><MessageSquare/></Button>
                     <Button variant="outline"><Video/></Button>
                     <Button className="glowing-shadow-interactive" onClick={() => onBook(doctor)}><Calendar className="mr-2"/>Book Appointment</Button>
                 </div>
             </div>
        </Card>
    );
};

    

    


