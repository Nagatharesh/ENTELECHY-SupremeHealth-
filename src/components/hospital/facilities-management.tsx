
"use client";

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';

export function FacilitiesManagement({ hospitalData }) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [info, setInfo] = useState('Click any object to inspect. Toggle layers on the left.');
    const [toggles, setToggles] = useState({
        buildings: true,
        interiors: true,
        equipment: true,
        ambulance: true,
        night: false,
    });

    useEffect(() => {
        if (!canvasRef.current) return;

        const canvas = canvasRef.current;

        const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;

        const scene = new THREE.Scene();
        scene.background = new THREE.Color(0x0e1012);

        const camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 0.1, 2000);
        camera.position.set(80, 50, 90);
        scene.add(camera);

        const controls = new OrbitControls(camera, renderer.domElement);
        controls.target.set(0, 6, 0);
        controls.enableDamping = true;
        controls.dampingFactor = 0.08;
        controls.maxPolarAngle = Math.PI * 0.49;
        controls.minDistance = 10;
        controls.maxDistance = 350;

        const hemi = new THREE.HemisphereLight(0xffffff, 0x223344, 0.6);
        scene.add(hemi);

        const sun = new THREE.DirectionalLight(0xffffff, 1.1);
        sun.position.set(120, 160, 80);
        sun.castShadow = true;
        sun.shadow.mapSize.set(2048, 2048);
        sun.shadow.camera.near = 1;
        sun.shadow.camera.far = 400;
        sun.shadow.camera.left = -120;
        sun.shadow.camera.right = 120;
        sun.shadow.camera.top = 120;
        sun.shadow.camera.bottom = -120;
        scene.add(sun);

        const nightLight = new THREE.AmbientLight(0x222244, 0.3);
        nightLight.visible = false;
        scene.add(nightLight);

        const world = new THREE.Group();
        scene.add(world);

        const groundMat = new THREE.MeshStandardMaterial({ color: 0x2b3138, roughness: 0.95, metalness: 0.0 });
        const ground = new THREE.Mesh(new THREE.PlaneGeometry(600, 600), groundMat);
        ground.receiveShadow = true;
        ground.rotation.x = -Math.PI / 2;
        world.add(ground);

        function createRoad(x, z, w, h) {
            const mat = new THREE.MeshStandardMaterial({ color: 0x1f2328, roughness: 0.9 });
            const mesh = new THREE.Mesh(new THREE.BoxGeometry(w, 0.2, h), mat);
            mesh.position.set(x, 0.1, z);
            mesh.receiveShadow = true;
            mesh.userData.type = 'road';
            return mesh;
        }

        world.add(createRoad(0, 0, 500, 18));
        world.add(createRoad(0, -120, 500, 14));
        world.add(createRoad(-120, 0, 16, 500));

        function createLawn(x, z, w, h) {
            const mat = new THREE.MeshStandardMaterial({ color: 0x293a27, roughness: 1 });
            const mesh = new THREE.Mesh(new THREE.BoxGeometry(w, 0.1, h), mat);
            mesh.position.set(x, 0.05, z);
            mesh.receiveShadow = true;
            mesh.userData.type = 'lawn';
            return mesh;
        }

        world.add(createLawn(140, 40, 180, 120));
        world.add(createLawn(-160, -60, 160, 160));

        function createWindowMaterial(baseColor) {
            return new THREE.MeshStandardMaterial({ color: baseColor, emissive: 0x0a0d13, roughness: 0.6, metalness: 0.1 });
        }

        function createBuilding({ name, width, height, depth, color = 0x9dadbd, windows = true, status = 'Operational', alerts = [] }) {
            const bldg = new THREE.Group();
            const bodyMat = new THREE.MeshStandardMaterial({ color, roughness: 0.8, metalness: 0.05 });
            const body = new THREE.Mesh(new THREE.BoxGeometry(width, height, depth), bodyMat);
            body.castShadow = true;
            body.receiveShadow = true;
            body.position.y = height / 2;
            bldg.add(body);
            bldg.userData = { type: 'building', name, status, alerts };
            bldg.userData.baseMaterial = bodyMat;

            if (windows) {
                const windowMat = createWindowMaterial(0xbac8d8);
                const windowRows = Math.max(2, Math.floor(height / 6));
                const windowCols = Math.max(3, Math.floor(width / 6));
                const winGeo = new THREE.BoxGeometry(1.6, 1.2, 0.1);
                for (let r = 0; r < windowRows; r++) {
                    for (let c = 0; c < windowCols; c++) {
                        const w = new THREE.Mesh(winGeo, windowMat);
                        w.position.set(
                            -width / 2 + 3 + c * (width - 6) / (windowCols - 1),
                            2 + r * (height - 6) / (windowRows - 1),
                            depth / 2 + 0.05
                        );
                        bldg.add(w);
                        const w2 = w.clone();
                        w2.position.z = -depth / 2 - 0.05;
                        bldg.add(w2);
                    }
                }
            }
            return bldg;
        }

        const campus = new THREE.Group();
        campus.userData.collection = 'buildings';
        world.add(campus);

        const mainBlock = createBuilding({ name: 'Main Block', width: 50, height: 24, depth: 30, color: 0xb7c5d6 });
        mainBlock.position.set(40, 0, 10);
        campus.add(mainBlock);

        const erBlock = createBuilding({ name: 'ER Block', width: 26, height: 16, depth: 22, color: 0xcbd7e4, status: 'Maintenance', alerts: ['Power Fluctuation'] });
        erBlock.position.set(0, 0, -40);
        campus.add(erBlock);

        const wardBlock = createBuilding({ name: 'Ward Block', width: 40, height: 20, depth: 24, color: 0xaec0d1 });
        wardBlock.position.set(-70, 0, 18);
        campus.add(wardBlock);
        
        const alertMaterial = new THREE.MeshStandardMaterial({ color: 0xffcc00, emissive: 0x884400, transparent: true, opacity: 0.7 });
        const alertIconTexture = new THREE.TextureLoader().load('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiNmZmNjMDAiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIj48cGF0aCBkPSJtMjEuNzIgMTQgYy43Ny0uODEuNzctMi4wMyAwLTIuODRsLTguMDEtOC4wMWMtLjc3LS43Ny0yLjAzLS43Ny0yLjg0IDBMLjI4IDExLjE2Yy0uNzcgLjc3LS43NyAyLjAzIDAgMi44NGw4LjAxIDguMDFjLjc3Ljc3IDIuMDMuNzcgMi44NCAwWiIvPjxsaW5lIHgxPSIxMiIgeDI9IjEyIiB5MT0iOCIgeTI9IjEyIi8+PGxpbmUgeDE9IjEyIiB4Mj0iMTIuMDEiIHkxPSIxNiIgeTI9IjE2Ii8+PC9zdmc+');
        const alertIconMat = new THREE.SpriteMaterial({ map: alertIconTexture, color: 0xffcc00 });
        const alertSprite = new THREE.Sprite(alertIconMat);
        alertSprite.position.set(erBlock.position.x, erBlock.children[0].geometry.parameters.height + 3, erBlock.position.z);
        alertSprite.scale.set(3,3,3);
        world.add(alertSprite);


        function createCanopy(w, d, h) {
            const g = new THREE.Group();
            const roof = new THREE.Mesh(new THREE.BoxGeometry(w, 0.6, d), new THREE.MeshStandardMaterial({ color: 0x9ba7b3, roughness: 0.7 }));
            roof.position.y = h;
            roof.castShadow = true;
            const poleGeo = new THREE.CylinderGeometry(0.35, 0.35, h, 12);
            const poleMat = new THREE.MeshStandardMaterial({ color: 0xcccccc, roughness: 0.6, metalness: 0.3 });
            const p1 = new THREE.Mesh(poleGeo, poleMat); p1.position.set(-w / 2 + 1, h / 2, -d / 2 + 1);
            const p2 = p1.clone(); p2.position.set(w / 2 - 1, h / 2, -d / 2 + 1);
            const p3 = p1.clone(); p3.position.set(-w / 2 + 1, h / 2, d / 2 - 1);
            const p4 = p1.clone(); p4.position.set(w / 2 - 1, h / 2, d / 2 - 1);
            [p1, p2, p3, p4].forEach(m => { m.castShadow = true; });
            g.add(roof, p1, p2, p3, p4);
            g.userData.type = 'canopy';
            return g;
        }

        const erCanopy = createCanopy(14, 10, 6);
        erCanopy.position.set(0, 0, -28);
        world.add(erCanopy);

        const interiors = new THREE.Group();
        interiors.userData.collection = 'interiors';
        world.add(interiors);

        function createWardFloor({ width, depth, beds = 8 }) {
            const g = new THREE.Group();
            g.userData.type = 'interior';
            const floor = new THREE.Mesh(new THREE.BoxGeometry(width - 2, 0.4, depth - 2), new THREE.MeshStandardMaterial({ color: 0xe6e9ed, roughness: 0.9 }));
            floor.position.y = 0.2;
            floor.receiveShadow = true;
            g.add(floor);

            const bedGroup = new THREE.Group();
            bedGroup.userData.collection = 'equipment'; 
            bedGroup.userData.type = 'equipment';
            const bedMat = new THREE.MeshStandardMaterial({ color: 0xced7df, roughness: 0.8 });
            const mattressMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.6 });
            for (let i = 0; i < beds; i++) {
                const frame = new THREE.Mesh(new THREE.BoxGeometry(4, 0.6, 2), bedMat);
                frame.position.set(-width / 2 + 4 + (i % 4) * (width - 10) / 3, 0.6, -depth / 2 + 3 + Math.floor(i / 4) * (depth - 8) / 1.5);
                frame.castShadow = true; frame.receiveShadow = true;
                const mattress = new THREE.Mesh(new THREE.BoxGeometry(3.6, 0.4, 1.8), mattressMat);
                mattress.position.set(frame.position.x, 1.0, frame.position.z);
                bedGroup.add(frame, mattress);
            }
            g.add(bedGroup);

            const monitorGroup = new THREE.Group();
            monitorGroup.userData.collection = 'equipment';
            const monitorMat = new THREE.MeshStandardMaterial({ color: 0x2a2f36, emissive: 0x0a141c });
            for (let i = 0; i < Math.min(6, beds); i++) {
                const stand = new THREE.Mesh(new THREE.CylinderGeometry(0.15, 0.15, 1.2, 8), new THREE.MeshStandardMaterial({ color: 0x9aa3ab }));
                const screen = new THREE.Mesh(new THREE.BoxGeometry(1.4, 0.9, 0.2), monitorMat);
                stand.position.set(-width / 2 + 4 + (i % 3) * (width - 10) / 2, 0.8, -depth / 2 + 2.2 + Math.floor(i / 3) * (depth - 8) / 1.5);
                screen.position.set(stand.position.x, 1.5, stand.position.z);
                screen.rotation.y = Math.PI * 0.05;
                monitorGroup.add(stand, screen);
            }
            g.add(monitorGroup);

            return g;
        }

        const wardInterior = createWardFloor({ width: 36, depth: 18, beds: 12 });
        wardInterior.position.set(-70, 0.21, 18);
        interiors.add(wardInterior);

        const erInterior = createWardFloor({ width: 20, depth: 14, beds: 6 });
        erInterior.position.set(0, 0.21, -40);
        interiors.add(erInterior);

        function createAmbulance() {
            const g = new THREE.Group();
            const body = new THREE.Mesh(new THREE.BoxGeometry(7, 3, 3), new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.6 }));
            body.position.y = 2.0;
            body.castShadow = true; body.receiveShadow = true;
            const cab = new THREE.Mesh(new THREE.BoxGeometry(3, 2, 3.1), new THREE.MeshStandardMaterial({ color: 0xe9eef3 }));
            cab.position.set(-2, 2.2, 0);
            const stripe = new THREE.Mesh(new THREE.BoxGeometry(7.2, 0.3, 3.2), new THREE.MeshStandardMaterial({ color: 0xd42a2a, emissive: 0x220000 }));
            stripe.position.set(0, 2.2, 0);
            const wheelGeo = new THREE.CylinderGeometry(0.8, 0.8, 0.6, 20);
            const wheelMat = new THREE.MeshStandardMaterial({ color: 0x111111, roughness: 0.9 });
            const w1 = new THREE.Mesh(wheelGeo, wheelMat); w1.rotation.z = Math.PI / 2; w1.position.set(-3, 0.8, 1.3);
            const w2 = w1.clone(); w2.position.set(3, 0.8, 1.3);
            const w3 = w1.clone(); w3.position.set(-3, 0.8, -1.3);
            const w4 = w1.clone(); w4.position.set(3, 0.8, -1.3);
            const lightBar = new THREE.Mesh(new THREE.BoxGeometry(2.2, 0.4, 1.0), new THREE.MeshStandardMaterial({ color: 0x1f6fd1, emissive: 0x001a66 }));
            lightBar.position.set(1, 3.6, 0);
            g.add(body, cab, stripe, w1, w2, w3, w4, lightBar);
            g.userData.type = 'ambulance';
            g.userData.name = 'Ambulance Unit 01';
            g.userData.status = 'Idle';
            g.userData.maintenanceDue = '2025-11-15';
            return g;
        }

        const ambulance = createAmbulance();
        ambulance.position.set(-140, 0, -10);
        world.add(ambulance);

        const pathPoints = [
            new THREE.Vector3(-160, 0, -10), new THREE.Vector3(-80, 0, -10),
            new THREE.Vector3(-20, 0, -30), new THREE.Vector3(0, 0, -30),
            new THREE.Vector3(10, 0, -30), new THREE.Vector3(0, 0, -30),
            new THREE.Vector3(-20, 0, -30), new THREE.Vector3(-80, 0, -10),
            new THREE.Vector3(-160, 0, -10),
        ];
        const path = new THREE.CatmullRomCurve3(pathPoints, true, 'centripetal', 0.2);

        const raycaster = new THREE.Raycaster();
        const mouse = new THREE.Vector2();
        let hovered = null;
        let lastHovered = null;

        const onPointerMove = (e) => {
            const rect = renderer.domElement.getBoundingClientRect();
            mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
            mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
        };

        const onClick = () => {
            if (hovered) {
                updateInfo(hovered);
            }
        };
        
        window.addEventListener('pointermove', onPointerMove);
        window.addEventListener('click', onClick);

        const handleResize = () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        };
        window.addEventListener('resize', handleResize);

        let t = 0;
        const tmp = new THREE.Vector3();
        const tmp2 = new THREE.Vector3();

        const outlineMaterial = new THREE.MeshBasicMaterial({ color: 0x00ffff, side: THREE.BackSide });
        let outlineMesh = null;
        
        const clock = new THREE.Clock();

        const animate = () => {
            requestAnimationFrame(animate);
            controls.update();

            const delta = clock.getDelta();
            t = (t + delta * 0.02) % 1; 

            if (ambulance.visible) {
                path.getPointAt(t, tmp);
                path.getTangentAt(t, tmp2);
                ambulance.position.set(tmp.x, 0, tmp.z);
                ambulance.rotation.y = Math.atan2(tmp2.x, tmp2.z);
            }

            erBlock.children[0].material.color.set(erBlock.userData.baseMaterial.color);
            if(erBlock.userData.alerts.length > 0) {
                 const pulse = (Math.sin(clock.getElapsedTime() * 4) + 1) / 2; // 0 to 1
                 erBlock.children[0].material.color.lerp(alertMaterial.color, pulse);
            }


            raycaster.setFromCamera(mouse, camera);
            const intersects = raycaster.intersectObjects(world.children, true);
            let intersectObj = intersects[0] ? (intersects[0].object.parent.userData.type ? intersects[0].object.parent : intersects[0].object) : null;
            
            if (intersectObj && intersectObj.userData.type !== 'road' && intersectObj.userData.type !== 'lawn' && intersectObj.visible) {
                hovered = intersectObj;
                 if(canvasRef.current) canvasRef.current.style.cursor = 'pointer';

                if (lastHovered !== hovered) {
                    if (outlineMesh) scene.remove(outlineMesh);
                    
                    const geometry = hovered.children[0]?.geometry || hovered.geometry;
                    outlineMesh = new THREE.Mesh(geometry, outlineMaterial);
                    outlineMesh.position.copy(hovered.position);
                    outlineMesh.rotation.copy(hovered.rotation);
                    outlineMesh.scale.multiplyScalar(1.05);
                    scene.add(outlineMesh);
                    lastHovered = hovered;
                }

            } else {
                hovered = null;
                if(canvasRef.current) canvasRef.current.style.cursor = 'default';
                if(lastHovered){
                    if (outlineMesh) scene.remove(outlineMesh);
                    outlineMesh = null;
                    lastHovered = null;
                }
            }

            renderer.render(scene, camera);
        };
        animate();

        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('pointermove', onPointerMove);
            window.removeEventListener('click', onClick);
            renderer.dispose();
        };

    }, []);

    const handleToggle = (e) => {
        const { id, checked } = e.target;
        setToggles(prev => ({ ...prev, [id.replace('toggle-', '')]: checked }));
    };

    function updateInfo(target) {
        if (!target) {
             setInfo('Click any object to inspect. Toggle layers on the left.');
             return;
        }
        const data = target.userData;
        let infoText = `<b>Type:</b> ${data.type}`;
        if(data.name) infoText += `<br><b>Name:</b> ${data.name}`;
        if(data.status) infoText += `<br><b>Status:</b> ${data.status}`;
        if(data.alerts && data.alerts.length > 0) infoText += `<br><b>Alerts:</b> <span style="color: #ffcc00;">${data.alerts.join(', ')}</span>`;
        if(data.maintenanceDue) infoText += `<br><b>Maintenance:</b> ${data.maintenanceDue}`;
        
        setInfo(infoText);
    }

    return (
        <div id="app" style={{height: '100%', width: '100%', position: 'relative'}}>
            <canvas ref={canvasRef} id="three-canvas"></canvas>
            <div id="hud">
                <div className="panel">
                    <h2>3D Hospital</h2>
                    <div className="row">
                        <label><input type="checkbox" id="toggle-buildings" checked={toggles.buildings} onChange={handleToggle} /> Buildings</label>
                        <label><input type="checkbox" id="toggle-interiors" checked={toggles.interiors} onChange={handleToggle} /> Interiors</label>
                    </div>
                    <div className="row">
                        <label><input type="checkbox" id="toggle-equipment" checked={toggles.equipment} onChange={handleToggle} /> Equipment</label>
                        <label><input type="checkbox" id="toggle-ambulance" checked={toggles.ambulance} onChange={handleToggle} /> Ambulance</label>
                    </div>
                    <div className="row">
                        <label><input type="checkbox" id="toggle-night" checked={toggles.night} onChange={handleToggle} /> Night Mode</label>
                    </div>
                    <div className="legend">
                        <span className="legend-item building">Building</span>
                        <span className="legend-item interior">Interior</span>
                        <span className="legend-item equipment">Equipment</span>
                        <span className="legend-item ambulance">Ambulance</span>
                    </div>
                </div>
                <div id="info" dangerouslySetInnerHTML={{ __html: info }}></div>
            </div>
        </div>
    );
}
