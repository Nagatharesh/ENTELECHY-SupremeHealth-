
"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
// OrbitControls is not directly exported, so we have to use this path.
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

// This component now acts as a placeholder for a more advanced 3D visualization.
// The structure below is designed to be replaced or enhanced with a library like Three.js.

const bedData = [
  { name: 'Bed 1', status: 'Critical', position: [-5, 0, -4], patient: 'Sunita Devi', since: '08:30 AM' },
  { name: 'Bed 2', status: 'Moderate', position: [0, 0, -4], patient: 'Amit Singh', since: '11:00 AM' },
  { name: 'Bed 3', status: 'Available', position: [5, 0, -4] },
  { name: 'Bed 4', status: 'Critical', position: [-5, 0, 4], patient: 'Unknown', since: '10:00 AM' },
  { name: 'Bed 5', status: 'Available', position: [0, 0, 4] },
  { name: 'Bed 6', status: 'Moderate', position: [5, 0, 4], patient: 'Ravi Kumar', since: '02:00 PM' }
];

export function EmergencyResourceStatus({ hospitalData }) {
    const { facilities, equipment, beds } = hospitalData.hospitalInfo;
    const mountRef = useRef<HTMLDivElement>(null);
    const [infoBox, setInfoBox] = useState<{ visible: boolean, content: string, x: number, y: number }>({ visible: false, content: '', x: 0, y: 0 });


    // Dummy data for display purposes
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

        // --- Basic Scene Setup ---
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, mountRef.current.clientWidth / mountRef.current.clientHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
        mountRef.current.appendChild(renderer.domElement);

        // --- Floor ---
        const floorGeometry = new THREE.PlaneGeometry(20, 20);
        const floorMaterial = new THREE.MeshStandardMaterial({ color: 0xaaaaaa, transparent: true, opacity: 0.1 });
        const floor = new THREE.Mesh(floorGeometry, floorMaterial);
        floor.rotation.x = -Math.PI / 2;
        scene.add(floor);

        // --- Bed Materials (Color-coded) ---
        const bedMaterials = {
            'Critical': new THREE.MeshStandardMaterial({ color: 0xff0000, emissive: 0x550000 }),
            'Moderate': new THREE.MeshStandardMaterial({ color: 0xffa500, emissive: 0x552a00 }),
            'Available': new THREE.MeshStandardMaterial({ color: 0x00ff00, emissive: 0x005500 }),
            'Occupied': new THREE.MeshStandardMaterial({ color: 0xffa500, emissive: 0x552a00 }), // Fallback
            'In Use': new THREE.MeshStandardMaterial({ color: 0xff0000, emissive: 0x550000 }), // Fallback
        };
        const bedGeometry = new THREE.BoxGeometry(1.5, 0.2, 3);
        const beds3D: THREE.Mesh[] = [];

        // --- Create and Place Beds ---
        bedData.forEach(data => {
            const material = bedMaterials[data.status] || bedMaterials['Occupied'];
            const bed = new THREE.Mesh(bedGeometry, material);
            bed.position.set(data.position[0], 0.1, data.position[2]);
            bed.userData = { name: data.name, status: data.status, patient: data.patient, since: data.since };
            scene.add(bed);
            beds3D.push(bed);
        });

        // --- Lighting ---
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
        scene.add(ambientLight);
        const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
        directionalLight.position.set(5, 10, 7);
        scene.add(directionalLight);

        // --- Camera and Controls ---
        camera.position.set(0, 8, 10);
        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.target.set(0, 0, 0);

        // --- Interaction (Hover Info) ---
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

        // --- Animation Loop ---
        let animationFrameId: number;
        const animate = () => {
            animationFrameId = requestAnimationFrame(animate);
            controls.update();
            renderer.render(scene, camera);
        };
        animate();

        // Cleanup on unmount
        return () => {
            cancelAnimationFrame(animationFrameId);
            window.removeEventListener('resize', onWindowResize);
            if (mountRef.current) {
                 mountRef.current.removeEventListener('mousemove', onMouseMove);
                 // eslint-disable-next-line react-hooks/exhaustive-deps
                 mountRef.current.removeChild(renderer.domElement);
            }
            renderer.dispose();
        };

    }, []);

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
                            <Button className="glowing-shadow-interactive">Triage Assignment</Button>
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
        </div>
    );
}
