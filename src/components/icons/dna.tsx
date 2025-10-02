
'use client';

import React, { useRef, useMemo, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const FAT_STRANDS = false;

interface DNAProps {
    interactive?: boolean;
}

const DNAStrand: React.FC<{
    position: [number, number, number];
    rotationY: number;
    color1: string;
    color2: string;
    interactive?: boolean;
}> = ({ position, rotationY, color1, color2, interactive }) => {
    const groupRef = useRef<THREE.Group>(null);

    useFrame((state) => {
        if (groupRef.current) {
            if (interactive) {
                groupRef.current.rotation.y += 0.005;
                const t = state.clock.getElapsedTime();
                groupRef.current.position.y = Math.sin(t) * 0.1;
            } else {
                groupRef.current.rotation.y += 0.01;
            }
        }
    });

    const points = useMemo(() => {
        const p = [];
        for (let i = 0; i < 60; i++) {
            p.push(new THREE.Vector3(Math.sin(i * 0.2) * 0.5, i * 0.1 - 3, Math.cos(i * 0.2) * 0.5));
        }
        return p;
    }, []);

    const curve = useMemo(() => new THREE.CatmullRomCurve3(points), [points]);

    return (
        <group ref={groupRef} position={position} rotation={[0, rotationY, 0]}>
            <mesh>
                <tubeGeometry args={[curve, 64, FAT_STRANDS ? 0.05 : 0.02, 8, false]} />
                <meshStandardMaterial color={color1} emissive={color1} emissiveIntensity={0.5} />
            </mesh>
        </group>
    );
};

const Connectors: React.FC<{ interactive?: boolean }> = ({ interactive }) => {
    const ref = useRef<THREE.InstancedMesh>(null);
    const count = 30;
    const dummy = useMemo(() => new THREE.Object3D(), []);

    useEffect(() => {
        if (ref.current) {
            for (let i = 0; i < count; i++) {
                dummy.position.set(0, i * 0.2 - 3, 0);
                dummy.updateMatrix();
                ref.current.setMatrixAt(i, dummy.matrix);
            }
            ref.current.instanceMatrix.needsUpdate = true;
        }
    }, [count, dummy]);

    useFrame(() => {
        if (ref.current && interactive) {
            for (let i = 0; i < count; i++) {
                dummy.rotation.y += 0.0005 * (i + 1);
                dummy.updateMatrix();
                ref.current.setMatrixAt(i, dummy.matrix);
            }
            ref.current.instanceMatrix.needsUpdate = true;
        }
    });

    return (
        <instancedMesh ref={ref} args={[undefined, undefined, count]}>
            <boxGeometry args={[1, 0.01, 0.01]} />
            <meshStandardMaterial color="#666" />
        </instancedMesh>
    );
};

export const DNA: React.FC<DNAProps> = ({ interactive = false }) => {
    return (
        <>
            <DNAStrand
                position={[0, 0, 0]}
                rotationY={0}
                color1="hsl(var(--primary))"
                color2="hsl(var(--secondary))"
                interactive={interactive}
            />
            <DNAStrand
                position={[0, 0, 0]}
                rotationY={Math.PI}
                color1="hsl(var(--secondary))"
                color2="hsl(var(--primary))"
                interactive={interactive}
            />
            <Connectors interactive={interactive} />
        </>
    );
};
