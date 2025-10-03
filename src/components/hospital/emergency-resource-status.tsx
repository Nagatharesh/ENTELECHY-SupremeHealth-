
"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import React, { useEffect, useRef, useState, useMemo } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';
import { dummyTriagePatients, TriagePatient } from "@/lib/dummy-data";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";

const initialBedData = [
  { name: 'Bed 1', status: 'Critical', position: [-5, 0, -4], patient: 'Sunita Devi', since: '08:30 AM' },
  { name: 'Bed 2', status: 'Moderate', position: [0, 0, -4], patient: 'Amit Singh', since: '11:00 AM' },
  { name: 'Bed 3', status: 'Available', position: [5, 0, -4] },
  { name: 'Bed 4', status: 'Critical', position: [-5, 0, 4], patient: 'Unknown', since: '10:00 AM' },
  { name: 'Bed 5', status: 'Available', position: [0, 0, 4] },
  { name: 'Bed 6', status: 'Moderate', position: [5, 0, 4], patient: 'Ravi Kumar', since: '02:00 PM' }
];


export function EmergencyResourceStatus({ hospitalData }) {
    const { facilities } = hospitalData.hospitalInfo;
    const mountRef = useRef<HTMLDivElement>(null);
    const [infoBox, setInfoBox] = useState<{ visible: boolean, content: string, x: number, y: number }>({ visible: false, content: '', x: 0, y: 0 });
    const [isTriageModalOpen, setIsTriageModalOpen] = useState(false);
    const [bedData, setBedData] = useState(initialBedData);
    const [triagePatients, setTriagePatients] = useState(dummyTriagePatients);


    const resources = {
        traumaRooms: [
            { name: "Trauma Room 1", status: "Occupied" },
            { name: "Trauma Room 2", status: "Occupied" },
            { name: "Trauma Room 3", status: "Available" },
        ],
        orAvailability: [
            { name: "Emergency OR 1", status: "In Use" },
            { name: "Emergency OR 2", status: "Ready" },
        ],
        staffStatus: [
            { name: "Emergency Physicians", active: 6, total: 6 },
            { name: "Trauma Nurses", active: 11, total: 12 },
        ]
    };

    useEffect(() => {
        if (!mountRef.current) return;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, mountRef.current.clientWidth / mountRef.current.clientHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
        mountRef.current.appendChild(renderer.domElement);

        const floorGeometry = new THREE.PlaneGeometry(20, 20);
        const floorMaterial = new THREE.MeshStandardMaterial({ color: 0xaaaaaa, transparent: true, opacity: 0.1 });
        const floor = new THREE.Mesh(floorGeometry, floorMaterial);
        floor.rotation.x = -Math.PI / 2;
        scene.add(floor);

        const bedMaterials = {
            'Critical': new THREE.MeshStandardMaterial({ color: 0xff0000, emissive: 0x550000 }),
            'Moderate': new THREE.MeshStandardMaterial({ color: 0xffa500, emissive: 0x552a00 }),
            'Available': new THREE.MeshStandardMaterial({ color: 0x00ff00, emissive: 0x005500 }),
            'Occupied': new THREE.MeshStandardMaterial({ color: 0xffa500, emissive: 0x552a00 }),
            'In Use': new THREE.MeshStandardMaterial({ color: 0xff0000, emissive: 0x550000 }),
        };
        const bedGeometry = new THREE.BoxGeometry(1.5, 0.2, 3);
        const beds3D: THREE.Mesh[] = [];

        bedData.forEach(data => {
            const material = bedMaterials[data.status] || bedMaterials['Occupied'];
            const bed = new THREE.Mesh(bedGeometry, material.clone());
            bed.position.set(data.position[0], 0.1, data.position[2]);
            bed.userData = { ...data };
            scene.add(bed);
            beds3D.push(bed);
        });

        const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
        scene.add(ambientLight);
        const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
        directionalLight.position.set(5, 10, 7);
        scene.add(directionalLight);

        camera.position.set(0, 8, 10);
        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.target.set(0, 0, 0);

        const raycaster = new THREE.Raycaster();
        const mouse = new THREE.Vector2();

        const onMouseMove = (event: MouseEvent) => {
            if (!mountRef.current) return;
            const rect = mountRef.current.getBoundingClientRect();
            mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
            mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

            raycaster.setFromCamera(mouse, camera);
            const intersects = raycaster.intersectObjects(beds3D);

            if (intersects.length > 0) {
                const bed = intersects[0].object;
                setInfoBox({
                    visible: true,
                    content: `<b>${bed.userData.name}</b><br>Status: ${bed.userData.status}<br>${bed.userData.patient ? `Patient: ${bed.userData.patient}<br>Since: ${bed.userData.since}` : ''}`,
                    x: event.clientX - rect.left + 10,
                    y: event.clientY - rect.top + 10,
                });
            } else {
                setInfoBox(ib => ({ ...ib, visible: false }));
            }
        };

        const onWindowResize = () => {
          if (!mountRef.current) return;
          camera.aspect = mountRef.current.clientWidth / mountRef.current.clientHeight;
          camera.updateProjectionMatrix();
          renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
        }

        window.addEventListener('resize', onWindowResize);
        mountRef.current.addEventListener('mousemove', onMouseMove);

        let animationFrameId: number;
        const animate = () => {
            animationFrameId = requestAnimationFrame(animate);
            controls.update();
            renderer.render(scene, camera);
        };
        animate();

        return () => {
            cancelAnimationFrame(animationFrameId);
            window.removeEventListener('resize', onWindowResize);
            if (mountRef.current) {
                 mountRef.current.removeEventListener('mousemove', onMouseMove);
                 if (renderer.domElement.parentElement === mountRef.current) {
                    // eslint-disable-next-line react-hooks/exhaustive-deps
                    mountRef.current.removeChild(renderer.domElement);
                 }
            }
            renderer.dispose();
            beds3D.forEach(bed => {
                bed.geometry.dispose();
                if (Array.isArray(bed.material)) {
                    bed.material.forEach(m => m.dispose());
                } else {
                    bed.material.dispose();
                }
                scene.remove(bed);
            });
        };

    }, [bedData]);

    const getStatusColor = (status: string) => {
        switch (status.toLowerCase()) {
            case 'occupied':
            case 'in use':
                return 'text-red-500';
            case 'available':
            case 'ready':
                return 'text-green-500';
            default:
                return 'text-white';
        }
    };

    const handleAssignBed = (patientId, bedName) => {
        const patient = triagePatients.find(p => p.patientId === patientId);
        if (!patient || !bedName) return;

        setBedData(prevBedData => prevBedData.map(bed => {
            if (bed.name === bedName) {
                return {
                    ...bed,
                    status: patient.triageLevel,
                    patient: patient.name,
                    since: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                };
            }
            return bed;
        }));

        setTriagePatients(prevPatients => prevPatients.filter(p => p.patientId !== patientId));
        setIsTriageModalOpen(false);
    };

    return (
        <div className="space-y-6">
            <Card className="glassmorphism glowing-shadow">
                <CardHeader>
                    <div className="flex justify-between items-center">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 flex-grow">
                            <div>
                                <h3 className="font-semibold text-white">Emergency Resource Status</h3>
                                <ul className="text-sm text-muted-foreground">
                                    {resources.traumaRooms.map(room => (
                                        <li key={room.name} className="flex justify-between">
                                            <span>{room.name}</span>
                                            <span className={cn("font-bold", getStatusColor(room.status))}>{room.status}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div>
                                <h3 className="font-semibold text-white">OR Availability</h3>
                                <ul className="text-sm text-muted-foreground">
                                    {resources.orAvailability.map(or => (
                                        <li key={or.name} className="flex justify-between">
                                            <span>{or.name}</span>
                                            <span className={cn("font-bold", getStatusColor(or.status))}>{or.status}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                             <div>
                                <h3 className="font-semibold text-white">Staff Status</h3>
                                <ul className="text-sm text-muted-foreground">
                                    {resources.staffStatus.map(staff => (
                                        <li key={staff.name} className="flex justify-between">
                                            <span>{staff.name}</span>
                                            <span className="font-bold text-white">{staff.active}/{staff.total} Active</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                         <div className="ml-8">
                            <Button className="glowing-shadow-interactive" onClick={() => setIsTriageModalOpen(true)}>Triage Assignment</Button>
                        </div>
                    </div>
                </CardHeader>
            </Card>

            <div id="threejs-canvas-container" ref={mountRef} className="w-full h-[60vh] bg-background/50 rounded-lg border-2 border-dashed border-primary/30 relative">
                {infoBox.visible && (
                    <div
                        style={{ position: 'absolute', left: infoBox.x, top: infoBox.y, pointerEvents: 'none' }}
                        className="p-2 rounded-md bg-black/70 text-white text-xs border border-white/20"
                        dangerouslySetInnerHTML={{ __html: infoBox.content }}
                    />
                )}
            </div>
            <TriageAssignmentModal
                isOpen={isTriageModalOpen}
                onClose={() => setIsTriageModalOpen(false)}
                patients={triagePatients}
                beds={bedData.filter(b => b.status === 'Available')}
                onAssign={handleAssignBed}
            />
        </div>
    );
}


function TriageAssignmentModal({ isOpen, onClose, patients, beds, onAssign }) {
    const { toast } = useToast();
    const [selectedPatient, setSelectedPatient] = useState<string>('');
    const [selectedBed, setSelectedBed] = useState<string>('');

    const handleAssignClick = () => {
        if (!selectedPatient || !selectedBed) {
            toast({
                variant: 'destructive',
                title: 'Selection Missing',
                description: 'Please select both a patient and a bed to assign.',
            });
            return;
        }
        onAssign(selectedPatient, selectedBed);
        toast({
            title: 'Bed Assigned Successfully!',
            description: `Patient has been assigned to ${selectedBed}.`,
        });
        setSelectedPatient('');
        setSelectedBed('');
    };

    const triageColorMapping = {
        Critical: "bg-red-500/20 text-red-400",
        Moderate: "bg-orange-500/20 text-orange-400",
        Minor: "bg-yellow-500/20 text-yellow-400",
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="glassmorphism max-w-4xl h-[80vh] flex flex-col">
                <DialogHeader>
                    <DialogTitle className="text-gradient-glow text-2xl">Triage & Bed Assignment</DialogTitle>
                    <DialogDescription>Assign waiting patients to available beds.</DialogDescription>
                </DialogHeader>
                <div className="flex-grow grid grid-cols-1 md:grid-cols-2 gap-6 overflow-y-auto">
                    <div className="space-y-4">
                        <h3 className="font-semibold text-lg text-white">Waiting Patients ({patients.length})</h3>
                        <div className="max-h-[60vh] overflow-y-auto">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Patient</TableHead>
                                        <TableHead>Triage</TableHead>
                                        <TableHead>Action</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {patients.map(p => (
                                        <TableRow key={p.patientId} className={selectedPatient === p.patientId ? 'bg-primary/20' : ''}>
                                            <TableCell>
                                                <div className="font-bold">{p.name}</div>
                                                <div className="text-xs text-muted-foreground">{p.age}, {p.gender}</div>
                                            </TableCell>
                                            <TableCell>
                                                <Badge className={triageColorMapping[p.triageLevel]}>{p.triageLevel}</Badge>
                                            </TableCell>
                                            <TableCell>
                                                <Button size="sm" variant={selectedPatient === p.patientId ? "default" : "outline"} onClick={() => setSelectedPatient(p.patientId)}>Select</Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    </div>
                    <div className="space-y-4">
                        <h3 className="font-semibold text-lg text-white">Available Beds ({beds.length})</h3>
                        <Select onValueChange={setSelectedBed} value={selectedBed}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select an available bed..." />
                            </SelectTrigger>
                            <SelectContent>
                                {beds.map(b => (
                                    <SelectItem key={b.name} value={b.name}>{b.name}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        {selectedPatient && selectedBed && (
                            <Card className="glassmorphism p-4 mt-4 animate-fade-in-up">
                                <CardHeader>
                                    <CardTitle className="text-lg">Assignment Summary</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p>Assigning <span className="text-primary font-bold">{patients.find(p=>p.patientId === selectedPatient)?.name}</span> to <span className="text-primary font-bold">{selectedBed}</span>.</p>
                                </CardContent>
                            </Card>
                        )}
                    </div>
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={onClose}>Cancel</Button>
                    <Button onClick={handleAssignClick} disabled={!selectedPatient || !selectedBed}>Assign Bed</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
