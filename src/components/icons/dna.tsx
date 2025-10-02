
"use client";

import React, { useRef, useMemo, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface DNAStrandProps {
    position?: [number, number, number];
    rotationY?: number;
    color1?: string;
    color2?: string;
}

const DNAStrand: React.FC<DNAStrandProps> = ({ position, rotationY, color1, color2 }) => {
    const meshRef = useRef<THREE.Mesh>(null);

    const points = useMemo(() => {
        const p = [];
        for (let i = 0; i < 20; i++) {
            p.push(new THREE.Vector3(Math.sin(i * 0.5) * 0.2, i * 0.2 - 2, Math.cos(i * 0.5) * 0.2));
        }
        return new THREE.CatmullRomCurve3(p).getPoints(100);
    }, []);

    const tubeGeometry = useMemo(() => new THREE.TubeGeometry(new THREE.CatmullRomCurve3(points), 100, 0.02, 8, false), [points]);

    return (
        <group position={position} rotation-y={rotationY}>
            <mesh ref={meshRef} geometry={tubeGeometry}>
                <meshStandardMaterial attach="material" color={color1} emissive={color1} emissiveIntensity={2} roughness={0.5} metalness={0.8} />
            </mesh>
        </group>
    );
};


const Connectors = ({ count = 10, interactive }) => {
    const instancedMeshRef = useRef<THREE.InstancedMesh>(null);
    const dummy = useMemo(() => new THREE.Object3D(), []);

    useEffect(() => {
        if (!instancedMeshRef.current) return;
        for (let i = 0; i < count; i++) {
            const y = (i - count / 2) * 0.4;
            const angle = i * 1;
            dummy.position.set(0, y, 0);
            dummy.rotation.set(0, angle, 0);
            dummy.updateMatrix();
            instancedMeshRef.current.setMatrixAt(i, dummy.matrix);
        }
        instancedMeshRef.current.instanceMatrix.needsUpdate = true;
    }, [count, dummy]);

    useFrame((state) => {
        if (instancedMeshRef.current && interactive) {
             const time = state.clock.getElapsedTime();
             for (let i = 0; i < count; i++) {
                const y = (i - count / 2) * 0.4;
                const angle = i * 1 + time * 0.5;
                dummy.position.set(0, y, 0);
                dummy.rotation.set(0, angle, 0);
                dummy.updateMatrix();
                instancedMeshRef.current.setMatrixAt(i, dummy.matrix);
             }
             instancedMeshRef.current.instanceMatrix.needsUpdate = true;
        }
    });
    
    const cylinderGeom = useMemo(() => new THREE.CylinderGeometry(0.01, 0.01, 0.4, 8), []);

    return (
        <instancedMesh ref={instancedMeshRef} args={[cylinderGeom, undefined, count]}>
            <meshStandardMaterial color="#00ffff" emissive="#00ffff" emissiveIntensity={3} />
        </instancedMesh>
    );
};


export const DNA = ({ interactive = false }) => {
    const groupRef = useRef<THREE.Group>(null);

    useFrame((state, delta) => {
        if (groupRef.current && !interactive) {
            groupRef.current.rotation.y += delta * 0.2;
            groupRef.current.rotation.x += delta * 0.1;
        }
    });

    return (
        <group ref={groupRef}>
            <DNAStrand position={[0, 0, 0]} rotationY={0} color1="#ff2e92" />
            <DNAStrand position={[0, 0, 0]} rotationY={Math.PI} color1="#00efff" />
            <Connectors count={10} interactive={interactive}/>
        </group>
    );
};
