
'use client';

import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const DNAStrand: React.FC<{ rotationY: number; color: string; }> = ({ rotationY, color }) => {
    const points = useMemo(() => {
        const p = [];
        for (let i = 0; i < 20; i++) {
            p.push(new THREE.Vector3(Math.sin(i * 0.5) * 0.4, i * 0.2 - 2, Math.cos(i * 0.5) * 0.4));
        }
        return new THREE.CatmullRomCurve3(p).getPoints(100);
    }, []);

    const tubeGeometry = useMemo(() => new THREE.TubeGeometry(new THREE.CatmullRomCurve3(points), 100, 0.02, 8, false), [points]);

    return (
        <group rotation-y={rotationY}>
            <mesh geometry={tubeGeometry}>
                <meshStandardMaterial attach="material" color={color} emissive={color} emissiveIntensity={2} roughness={0.5} metalness={0.8} />
            </mesh>
        </group>
    );
};

const Connectors: React.FC<{ count?: number }> = ({ count = 10 }) => {
    const instancedMeshRef = useRef<THREE.InstancedMesh>(null);
    const dummy = useMemo(() => new THREE.Object3D(), []);

    const cylinderGeom = useMemo(() => new THREE.CylinderGeometry(0.01, 0.01, 0.8, 8), []);

    useFrame((state) => {
        if (!instancedMeshRef.current) return;
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
    });

    return (
        <instancedMesh ref={instancedMeshRef} args={[cylinderGeom, undefined, count]}>
            <meshStandardMaterial color="#00ffff" emissive="#00ffff" emissiveIntensity={3} />
        </instancedMesh>
    );
};

export const DNA: React.FC = () => {
    const groupRef = useRef<THREE.Group>(null);

    useFrame((state, delta) => {
        if (groupRef.current) {
            groupRef.current.rotation.y += delta * 0.2;
            groupRef.current.rotation.x += delta * 0.1;
        }
    });

    return (
        <group ref={groupRef}>
            <DNAStrand rotationY={0} color="#ff2e92" />
            <DNAStrand rotationY={Math.PI} color="#00efff" />
            <Connectors count={10} />
        </group>
    );
};
