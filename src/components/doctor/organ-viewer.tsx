
"use client";

import * as React from 'react';
import { useRef, useEffect, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF, Html } from '@react-three/drei';

const organModels: Record<string, { path: string, scale: number }> = {
    Heart: { path: '/models/heart.glb', scale: 0.05 },
    Brain: { path: '/models/brain.glb', scale: 0.1 },
    Lungs: { path: '/models/lungs.glb', scale: 0.03 },
    Liver: { path: '/models/liver.glb', scale: 0.02 },
    Kidneys: { path: '/models/kidneys.glb', scale: 0.04 },
};

function Model({ organName, annotations }: { organName: string, annotations: { text: string; position: [number, number, number] }[] }) {
    const { path, scale } = organModels[organName];
    const { scene } = useGLTF(path);
    const ref = useRef<THREE.Group>();

    useEffect(() => {
        scene.traverse((child) => {
            if (child instanceof THREE.Mesh) {
                child.material.transparent = true;
                child.material.opacity = 0.6;
                child.material.metalness = 0.8;
                child.material.roughness = 0.2;
                (child.material as THREE.MeshStandardMaterial).color.set('cyan');
            }
        });
    }, [scene]);

    return (
        <group ref={ref} dispose={null}>
            <primitive object={scene} scale={scale}>
                {annotations.map((anno, i) => (
                    <Html key={i} position={anno.position}>
                        <div className="p-2 rounded-lg glassmorphism text-white text-xs whitespace-nowrap shadow-lg border border-destructive/50">
                            {anno.text}
                        </div>
                    </Html>
                ))}
            </primitive>
        </group>
    );
}

export function OrganViewer({ organName, annotations }: { organName: string, annotations: any[] }) {
    useEffect(() => {
        // Preload models on the client side
        Object.values(organModels).forEach(model => useGLTF.preload(model.path));
    }, []);
    
    return (
        <Canvas camera={{ position: [0, 0, 2], fov: 50 }}>
            <ambientLight intensity={1.5} />
            <directionalLight position={[5, 5, 5]} intensity={2} />
            <pointLight position={[-5, -5, -5]} intensity={3} color="magenta" />
            <Suspense fallback={<Html><div className="text-white">Loading Model...</div></Html>}>
                <Model organName={organName} annotations={annotations} />
            </Suspense>
            <OrbitControls enableZoom={true} enablePan={true} />
        </Canvas>
    );
}
