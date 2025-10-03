
"use client";

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { CSS2DRenderer, CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer.js';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';

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
        renderer.outputColorSpace = THREE.SRGBColorSpace;
        renderer.toneMapping = THREE.ACESFilmicToneMapping;
        renderer.toneMappingExposure = 1.05;

        const scene = new THREE.Scene();
        scene.background = new THREE.Color(0x0e1012);

        const camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 0.1, 2000);
        camera.position.set(80, 50, 90);
        scene.add(camera);

        const labelRenderer = new CSS2DRenderer();
        labelRenderer.setSize(window.innerWidth, window.innerHeight);
        labelRenderer.domElement.style.position = 'fixed';
        labelRenderer.domElement.style.inset = '0';
        labelRenderer.domElement.style.pointerEvents = 'none';
        document.body.appendChild(labelRenderer.domElement);

        const tooltipEl = document.createElement('div');
        tooltipEl.style.position = 'fixed';
        tooltipEl.style.pointerEvents = 'none';
        tooltipEl.style.padding = '2px 6px';
        tooltipEl.style.borderRadius = '6px';
        tooltipEl.style.fontSize = '12px';
        tooltipEl.style.color = '#e7eaee';
        tooltipEl.style.background = 'rgba(20,24,28,.86)';
        tooltipEl.style.border = '1px solid rgba(255,255,255,.12)';
        tooltipEl.style.transform = 'translate(12px, 8px)';
        tooltipEl.style.opacity = '0';
        document.body.appendChild(tooltipEl);

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

        const composer = new EffectComposer(renderer);
        composer.addPass(new RenderPass(scene, camera));
        const bloom = new UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight), 0.35, 0.9, 0.2);
        composer.addPass(bloom);

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
        
        const texLoader = new THREE.TextureLoader();
        texLoader.crossOrigin = 'anonymous';
        function loadTiled(url, rx = 1, ry = 1) {
          const t = texLoader.load(url);
          t.wrapS = t.wrapT = THREE.RepeatWrapping;
          t.repeat.set(rx, ry);
          t.colorSpace = THREE.SRGBColorSpace;
          return t;
        }
        const woodTex = loadTiled('https://unpkg.com/three@0.160.0/examples/textures/hardwood2_diffuse.jpg', 2, 2);
        const fabricTex = loadTiled('https://unpkg.com/three@0.160.0/examples/textures/uv_grid_opengl.jpg', 2, 2);
        const floorTex = loadTiled('https://unpkg.com/three@0.160.0/examples/textures/terrain/grasslight-big.jpg', 6, 6);
        (ground.material as THREE.MeshStandardMaterial).map = floorTex;


        function createWindowMaterial(baseColor) {
          return new THREE.MeshStandardMaterial({ color: baseColor, emissive: 0x0a0d13, roughness: 0.6, metalness: 0.1 });
        }

        function createBuilding({ width, height, depth, color = 0x9dadbd, windows = true }) {
          const bldg = new THREE.Group();
          const body = new THREE.Mesh(new THREE.BoxGeometry(width, height, depth), new THREE.MeshStandardMaterial({ color, roughness: 0.8, metalness: 0.05 }));
          body.castShadow = true;
          body.receiveShadow = true;
          body.position.y = height / 2;
          bldg.add(body);

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

          bldg.userData.type = 'building';
          return bldg;
        }

        const campus = new THREE.Group();
        campus.userData.collection = 'buildings';
        world.add(campus);

        const mainBlock = createBuilding({ width: 50, height: 24, depth: 30, color: 0xb7c5d6 });
        mainBlock.position.set(40, 0, 10);
        campus.add(mainBlock);

        const erBlock = createBuilding({ width: 26, height: 16, depth: 22, color: 0xcbd7e4 });
        erBlock.position.set(0, 0, -40);
        campus.add(erBlock);

        const wardBlock = createBuilding({ width: 40, height: 20, depth: 24, color: 0xaec0d1 });
        wardBlock.position.set(-70, 0, 18);
        campus.add(wardBlock);

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
        
        function createSlidingDoor(width = 5, height = 3) {
          const g = new THREE.Group();
          const frame = new THREE.Mesh(new THREE.BoxGeometry(width, 0.2, 0.2), new THREE.MeshStandardMaterial({ color: 0x9ba7b3 }));
          frame.position.set(0, height, 0);
          const leafMat = new THREE.MeshStandardMaterial({ color: 0xcfd8dc, transparent: true, opacity: 0.7, roughness: 0.3, metalness: 0.1 });
          const left = new THREE.Mesh(new THREE.BoxGeometry(width / 2, height, 0.08), leafMat);
          const right = left.clone();
          left.position.set(-width / 4, height / 2, 0);
          right.position.set(width / 4, height / 2, 0);
          g.add(frame, left, right);
          g.userData.type = 'door';
          g.userData.sliding = { left, right, open: false, t: 0 };
          return g;
        }

        const erDoor = createSlidingDoor(6, 3.2);
        erDoor.position.set(0, 0, -33);
        world.add(erDoor);


        const interiors = new THREE.Group();
        interiors.userData.collection = 'interiors';
        world.add(interiors);

        function createBedSet() {
          const group = new THREE.Group();
          const frameMat = new THREE.MeshStandardMaterial({ color: 0xbfc9d4, roughness: 0.7 });
          const mattressMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.55 });
          const railMat = new THREE.MeshStandardMaterial({ color: 0x9aa8b4, metalness: 0.2, roughness: 0.5 });
          const base = new THREE.Mesh(new THREE.BoxGeometry(4.2, 0.6, 2.2), frameMat);
          base.position.y = 0.3;
          const mattress = new THREE.Mesh(new THREE.BoxGeometry(3.9, 0.5, 2.0), mattressMat);
          mattress.position.y = 0.85;
          const railLeft = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.7, 2.0), railMat);
          railLeft.position.set(-2.05, 1.0, 0);
          const railRight = railLeft.clone(); railRight.position.x = 2.05;
          const headBoard = new THREE.Mesh(new THREE.BoxGeometry(0.15, 1.0, 2.2), railMat);
          headBoard.position.set(-2.1, 1.05, 0);
          const footBoard = headBoard.clone(); footBoard.position.x = 2.1;
          [base, mattress, railLeft, railRight, headBoard, footBoard].forEach(m => { m.castShadow = true; m.receiveShadow = true; });
          group.add(base, mattress, railLeft, railRight, headBoard, footBoard);

          const stand = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.12, 1.1, 10), new THREE.MeshStandardMaterial({ color: 0x9aa3ab }));
          stand.position.set(-2.6, 1.1, 0.6);
          const screen = new THREE.Mesh(new THREE.BoxGeometry(1.4, 0.9, 0.2), new THREE.MeshStandardMaterial({ color: 0x2a2f36, emissive: 0x0a141c }));
          screen.position.set(-2.6, 1.8, 0.6);
          const ventBody = new THREE.Mesh(new THREE.BoxGeometry(0.9, 0.6, 0.6), new THREE.MeshStandardMaterial({ color: 0xdee6ee }));
          ventBody.position.set(-2.6, 0.6, -0.7);
          const ivPole = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 1.8, 10), new THREE.MeshStandardMaterial({ color: 0xbcc7cf }));
          ivPole.position.set(2.5, 1.2, -0.8);
          const ivHook = new THREE.Mesh(new THREE.BoxGeometry(0.8, 0.05, 0.05), new THREE.MeshStandardMaterial({ color: 0xbcc7cf }));
          ivHook.position.set(2.5, 2.05, -0.8);
          group.add(stand, screen, ventBody, ivPole, ivHook);

          const rod = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 4.8, 8), new THREE.MeshStandardMaterial({ color: 0x9aa3ab }));
          rod.rotation.z = Math.PI / 2; rod.position.set(0, 2.2, -1.4);
          const curtain = new THREE.Mesh(new THREE.BoxGeometry(4.6, 1.8, 0.02), new THREE.MeshStandardMaterial({ color: 0x9dc2d8, transparent: true, opacity: 0.45 }));
          curtain.position.set(0, 1.3, -1.4);
          group.add(rod, curtain);

          group.userData.type = 'equipment';
          return group;
        }

        function createRoomShell(width, depth, height = 3, color = 0xeef1f5) {
          const g = new THREE.Group();
          const floor = new THREE.Mesh(new THREE.BoxGeometry(width, 0.2, depth), new THREE.MeshStandardMaterial({ color: 0xf2f4f7, roughness: 0.95 }));
          floor.position.y = 0.1; floor.receiveShadow = true;
          const wallMat = new THREE.MeshStandardMaterial({ color, roughness: 0.95 });
          const wallThick = 0.2;
          const w1 = new THREE.Mesh(new THREE.BoxGeometry(width, height, wallThick), wallMat); w1.position.set(0, height / 2, -depth / 2);
          const w2 = w1.clone(); w2.position.z = depth / 2;
          const w3 = new THREE.Mesh(new THREE.BoxGeometry(wallThick, height, depth), wallMat); w3.position.set(-width / 2, height / 2, 0);
          const w4 = w3.clone(); w4.position.x = width / 2;
          [w1, w2, w3, w4].forEach(w => { w.castShadow = true; w.receiveShadow = true; });
          g.add(floor, w1, w2, w3, w4);
          g.userData.type = 'interior';
          return g;
        }
        
        function createICU() {
          const width = 28, depth = 16;
          const room = createRoomShell(width, depth, 3.2, 0xeaf0f4);
          const beds = new THREE.Group(); beds.userData.type = 'equipment';
          for (let i = 0; i < 6; i++) {
            const bed = createBedSet();
            const col = i % 3;
            const row = Math.floor(i / 3);
            bed.position.set(-width/2 + 6 + col * 10, 0, -depth/2 + 4 + row * 7);
            beds.add(bed);
          }
          room.add(beds);
          const pipeGeo = new THREE.CylinderGeometry(0.06,0.06,width-2,16);
          const o2 = new THREE.Mesh(pipeGeo, new THREE.MeshStandardMaterial({ color: 0x4db6ac, metalness: 0.2, roughness: 0.4 })); o2.rotation.z = Math.PI/2; o2.position.set(0, 1.3, -depth/2 + 0.12);
          const vac = new THREE.Mesh(pipeGeo, new THREE.MeshStandardMaterial({ color: 0x8d6e63, metalness: 0.2, roughness: 0.4 })); vac.rotation.z = Math.PI/2; vac.position.set(0, 1.15, -depth/2 + 0.13);
          const air = new THREE.Mesh(pipeGeo, new THREE.MeshStandardMaterial({ color: 0x64b5f6, metalness: 0.2, roughness: 0.4 })); air.rotation.z = Math.PI/2; air.position.set(0, 1.0, -depth/2 + 0.14);
          [o2,vac,air].forEach(p=>{p.castShadow=true;});
          room.add(o2,vac,air);
          for (let i = 0; i < 3; i++) {
            const x = -width/2 + 6 + i*10;
            const drop = new THREE.Mesh(new THREE.CylinderGeometry(0.05,0.05,1.2,10), new THREE.MeshStandardMaterial({ color: 0xbcc7cf }));
            drop.position.set(x, 1.9, -depth/2 + 0.1);
            room.add(drop);
          }
          for (let i = 0; i < 3; i++) {
            const bar = new THREE.Mesh(new THREE.BoxGeometry(9, 0.2, 0.4), new THREE.MeshStandardMaterial({ color: 0xcfd9e2, emissive: 0x111316 }));
            bar.position.set(-width/2 + 6 + i*10, 3.0, 0);
            room.add(bar);
          }
          return room;
        }

        const icu = createICU();
        icu.position.set(40, 0.11, 14);
        interiors.add(icu);
        
        function createOperatingTheatre() {
          const width = 20, depth = 16;
          const room = createRoomShell(width, depth, 3.2, 0xe9eff3);
          const table = new THREE.Mesh(new THREE.BoxGeometry(6, 0.5, 2), new THREE.MeshStandardMaterial({ color: 0x3b3f46, roughness: 0.6 }));
          table.position.set(0, 1.0, 0); table.castShadow = true; table.receiveShadow = true;
          const base = new THREE.Mesh(new THREE.CylinderGeometry(0.6,0.8,1.0,16), new THREE.MeshStandardMaterial({ color: 0x9aa3ab })); base.position.set(0, 0.5, 0);
          room.add(table, base);
          const lightMat = new THREE.MeshStandardMaterial({ color: 0xdfe9f5, emissive: 0x0e2540 });
          for (let i = 0; i < 2; i++) {
            const arm = new THREE.Mesh(new THREE.CylinderGeometry(0.1,0.1,2.0,10), new THREE.MeshStandardMaterial({ color: 0x9aa3ab }));
            arm.rotation.z = Math.PI/2; arm.position.set(-1 + i*2, 2.6, -0.2);
            const head = new THREE.Mesh(new THREE.CylinderGeometry(0.9,0.9,0.2,20), lightMat);
            head.position.set(-1 + i*2, 2.4, -0.2);
            room.add(arm, head);
          }
          const tray = new THREE.Mesh(new THREE.BoxGeometry(2.4, 0.15, 1.2), new THREE.MeshStandardMaterial({ color: 0xc1c7ce })); tray.position.set(6, 0.9, -5);
          const trayLeg = new THREE.Mesh(new THREE.CylinderGeometry(0.2,0.2,0.9,10), new THREE.MeshStandardMaterial({ color: 0x9aa3ab })); trayLeg.position.set(6, 0.45, -5);
          const shelf = new THREE.Mesh(new THREE.BoxGeometry(3, 1.2, 0.6), new THREE.MeshStandardMaterial({ color: 0xdde4ea })); shelf.position.set(-8, 0.9, -6);
          room.add(tray, trayLeg, shelf);
          return room;
        }

        const operatingTheatre = createOperatingTheatre();
        operatingTheatre.position.set(40, 0.11, -8);
        interiors.add(operatingTheatre);

        function createDiagnostics() {
          const width = 22, depth = 18;
          const room = createRoomShell(width, depth, 3.2, 0xf0f3f7);
          const bore = new THREE.Mesh(new THREE.TorusGeometry(3, 0.8, 16, 32), new THREE.MeshStandardMaterial({ color: 0xe6ecf3 }));
          bore.rotation.y = Math.PI/2; bore.position.set(-5, 2.0, 0);
          const table = new THREE.Mesh(new THREE.BoxGeometry(7, 0.4, 1.6), new THREE.MeshStandardMaterial({ color: 0xcdd6de })); table.position.set(1.5, 1.0, 0);
          const consoleDesk = new THREE.Mesh(new THREE.BoxGeometry(6, 0.8, 2.2), new THREE.MeshStandardMaterial({ color: 0xdfe6ec })); consoleDesk.position.set(6, 0.4, -6);
          const monitor = new THREE.Mesh(new THREE.BoxGeometry(1.6, 1.0, 0.1), new THREE.MeshStandardMaterial({ color: 0x2a2f36, emissive: 0x0a141c })); monitor.position.set(6, 1.4, -5.4);
          for (let i = 0; i < 4; i++) {
            const seat = new THREE.Mesh(new THREE.BoxGeometry(1.4, 0.3, 1.2), new THREE.MeshStandardMaterial({ color: 0x6b7681 }));
            const back = new THREE.Mesh(new THREE.BoxGeometry(1.4, 0.8, 0.2), new THREE.MeshStandardMaterial({ color: 0x7b8794 }));
            seat.position.set(-2 + i*1.8, 0.45, 7);
            back.position.set(-2 + i*1.8, 1.0, 7.4);
            room.add(seat, back);
          }
          room.add(bore, table, consoleDesk, monitor);
          return room;
        }

        const diagnostics = createDiagnostics();
        diagnostics.position.set(-70, 0.11, -10);
        interiors.add(diagnostics);

        function createNurseStation() {
          const width = 20, depth = 10;
          const room = createRoomShell(width, depth, 3.0, 0xf4f6f9);
          const counter = new THREE.Mesh(new THREE.BoxGeometry(12, 1.0, 2.5), new THREE.MeshStandardMaterial({ color: 0xd9e2ea }));
          counter.position.set(0, 0.5, -3.2);
          const pcMat = new THREE.MeshStandardMaterial({ color: 0x1f2630, emissive: 0x0c1118 });
          for (let i = 0; i < 3; i++) {
            const screen = new THREE.Mesh(new THREE.BoxGeometry(1.6, 1.0, 0.1), pcMat);
            screen.position.set(-4 + i*4, 1.4, -2.4);
            const chairSeat = new THREE.Mesh(new THREE.BoxGeometry(1.2, 0.2, 1.2), new THREE.MeshStandardMaterial({ color: 0x6e7b87 }));
            const chairBase = new THREE.Mesh(new THREE.CylinderGeometry(0.15,0.15,0.8,10), new THREE.MeshStandardMaterial({ color: 0x9099a2 }));
            chairSeat.position.set(-4 + i*4, 0.6, -0.6);
            chairBase.position.set(-4 + i*4, 0.3, -0.6);
            room.add(screen, chairSeat, chairBase);
          }
          const cabinet = new THREE.Mesh(new THREE.BoxGeometry(3.5, 1.2, 0.6), new THREE.MeshStandardMaterial({ color: 0xe0e7ee }));
          cabinet.position.set(8, 0.7, 3.5);
          room.add(counter, cabinet);
          return room;
        }

        const nurseStation = createNurseStation();
        nurseStation.position.set(-100, 0.11, 18);
        interiors.add(nurseStation);

        function createExitDoor(width = 1.2, height = 2.2) {
          const g = new THREE.Group();
          const frame = new THREE.Mesh(new THREE.BoxGeometry(width+0.1, height+0.1, 0.2), new THREE.MeshStandardMaterial({ color: 0x9aa3ab }));
          frame.position.y = height/2;
          const leaf = new THREE.Mesh(new THREE.BoxGeometry(width, height, 0.08), new THREE.MeshStandardMaterial({ color: 0x2f3a44 }));
          leaf.position.y = height/2; leaf.position.x = -width/2;
          g.add(frame, leaf);
          g.userData.type = 'door';
          g.userData.hinged = { leaf, open: false, t: 0 };
          return g;
        }

        const stairExit = createExitDoor();
        stairExit.position.set(-90, 0, 28);
        world.add(stairExit);

        function createPrivateRoom() {
          const width = 26, depth = 16, height = 3.1;
          const room = createRoomShell(width, depth, height, 0xefe6d8);
          const headwallMat = new THREE.MeshStandardMaterial({ color: 0xa56c3a, roughness: 0.6, metalness: 0.05, map: woodTex });
          const headStrip = new THREE.Mesh(new THREE.BoxGeometry(width, 0.5, 0.08), headwallMat);
          headStrip.position.set(0, 1.6, -depth/2 + 0.12);
          const midStrip = new THREE.Mesh(new THREE.BoxGeometry(width, 0.5, 0.08), new THREE.MeshStandardMaterial({ color: 0xaec0b2, roughness: 0.8 }));
          midStrip.position.set(0, 1.1, -depth/2 + 0.11);
          room.add(headStrip, midStrip);

          for (let i = 0; i < 2; i++) {
            const bed = createBedSet();
            bed.position.set(-6 + i*10, 0, -2.0);
            room.add(bed);
          }

          const trayMat = new THREE.MeshStandardMaterial({ color: 0xc8d3da, metalness: 0.2, roughness: 0.6 });
          const trolley = new THREE.Group();
          const top = new THREE.Mesh(new THREE.BoxGeometry(3, 0.1, 1.6), trayMat); top.position.y = 0.9;
          const bot = new THREE.Mesh(new THREE.BoxGeometry(3, 0.1, 1.6), trayMat); bot.position.y = 0.4;
          const legGeo = new THREE.CylinderGeometry(0.08,0.08,0.9,10);
          const legMat = new THREE.MeshStandardMaterial({ color: 0x9aa3ab });
          const l1 = new THREE.Mesh(legGeo, legMat); l1.position.set(-1.4, 0.65, -0.7);
          const l2 = l1.clone(); l2.position.set(1.4, 0.65, -0.7);
          const l3 = l1.clone(); l3.position.set(-1.4, 0.65, 0.7);
          const l4 = l1.clone(); l4.position.set(1.4, 0.65, 0.7);
          
          const canMat = new THREE.MeshStandardMaterial({ color: 0xd7e0e7, roughness: 0.7 });
          const can1 = new THREE.Mesh(new THREE.CylinderGeometry(0.35,0.35,0.6,16), canMat); can1.position.set(-0.6, 1.05, -0.2);
          const can2 = can1.clone(); can2.scale.set(0.9,1.1,0.9); can2.position.set(0.3, 1.1, -0.2);
          const bottleMat = new THREE.MeshStandardMaterial({ color: 0x523019, roughness: 0.5 });
          for (let i = 0; i < 3; i++) {
            const b = new THREE.Mesh(new THREE.CylinderGeometry(0.18,0.2,0.55,14), bottleMat);
            b.position.set(-0.6 + i*0.6, 0.55, 0.4);
            trolley.add(b);
          }
          trolley.add(top, bot, l1, l2, l3, l4, can1, can2);
          trolley.position.set(3, 0, -1.6);
          room.add(trolley);

          const sofa = new THREE.Mesh(new THREE.BoxGeometry(6, 1.0, 2), new THREE.MeshStandardMaterial({ color: 0x5b4638, roughness: 0.8, map: fabricTex }));
          sofa.position.set(-8, 0.5, 5.5);
          const softBack = new THREE.Mesh(new THREE.BoxGeometry(6, 1.0, 0.4), new THREE.MeshStandardMaterial({ color: 0x6b5444, roughness: 0.9, map: fabricTex }));
          softBack.position.set(-8, 1.2, 6.3);
          room.add(sofa, softBack);

          const blind = new THREE.Mesh(new THREE.BoxGeometry(10, 0.02, 5), new THREE.MeshStandardMaterial({ color: 0xcabf9e, roughness: 0.9 }));
          blind.rotation.y = Math.PI/2; blind.position.set(width/2 - 0.12, 1.6, 3);
          room.add(blind);

          const lamp = new THREE.PointLight(0xfff2d0, 0.6, 10);
          lamp.position.set(-2, 2.2, -1.6);
          room.add(lamp);

          const panelLight = new THREE.RectAreaLight(0xffffff, 2.5, 2.4, 1.0);
          panelLight.position.set(0, height - 0.2, 0);
          panelLight.rotation.x = -Math.PI/2;
          room.add(panelLight);

          return room;
        }

        const privateRoom = createPrivateRoom();
        privateRoom.position.set(-32, 0.11, 42);
        interiors.add(privateRoom);

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
        let selected = null;
        let isolatedRoot = null;
        const selectionHelper = new THREE.Box3Helper(new THREE.Box3(), 0x4ea1ff);
        selectionHelper.visible = false;
        world.add(selectionHelper);

        let camAnim = null;
        const clock = new THREE.Clock();

        function updateInfo(target) {
          if (!target) { setInfo('Click any object to inspect. Toggle layers on the left.'); return; }
          const t = target.userData.type || 'object';
          setInfo(`Selected: ${t}`);
        }
        updateInfo();

        const onPointerMove = (e) => {
          mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
          mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
          tooltipEl.style.left = e.clientX + 'px';
          tooltipEl.style.top = e.clientY + 'px';
        };

        const onClick = () => {
          if (hovered) {
            selected = hovered.object;
            updateInfo(selected);
            focusOnObject(selected);
            highlight(selected);
            const root = findTopGroup(selected);
            if (root && root.userData && root.userData.type === 'door') {
              if (root.userData.sliding) root.userData.sliding.open = !root.userData.sliding.open;
              if (root.userData.hinged) root.userData.hinged.open = !root.userData.hinged.open;
            }
          }
        };

        const onDblClick = () => {
          if (!hovered) return;
          const root = findTopGroup(hovered.object);
          isolate(root);
        };

        window.addEventListener('pointermove', onPointerMove);
        window.addEventListener('click', onClick);
        window.addEventListener('dblclick', onDblClick);


        function setGroupVisible(group, visible) {
          if (!group) return;
          group.traverse((obj) => {
            if (obj.isMesh || obj.isGroup) obj.visible = visible;
          });
        }

        function applyToggles(currentToggles) {
          world.children.forEach(obj => {
              if (obj.userData.collection === 'buildings') setGroupVisible(obj, currentToggles.buildings);
              if (obj.userData.collection === 'interiors') setGroupVisible(obj, currentToggles.interiors);
              if (obj.userData.type === 'ambulance') setGroupVisible(obj, currentToggles.ambulance);
              
              if (obj.userData.collection === 'interiors') {
                  obj.traverse(child => {
                      if(child.userData.type === 'equipment') {
                          setGroupVisible(child, currentToggles.equipment);
                      }
                  });
              }
          });

          const night = !!currentToggles.night;
          nightLight.visible = night;
          sun.intensity = night ? 0.2 : 1.1;
          hemi.intensity = night ? 0.25 : 0.6;
          scene.background.set(night ? 0x07080a : 0x0e1012);
        }

        const handleToggleChange = (e) => {
            const { id, checked } = e.target;
            const newToggles = { ...toggles, [id.replace('toggle-', '')]: checked };
            setToggles(newToggles);
            applyToggles(newToggles);
        };

        Object.values(toggles).forEach((el: any) => el?.addEventListener('change', handleToggleChange));
        applyToggles(toggles);

        const onWindowResize = () => {
          camera.aspect = window.innerWidth / window.innerHeight;
          camera.updateProjectionMatrix();
          renderer.setSize(window.innerWidth, window.innerHeight);
          labelRenderer.setSize(window.innerWidth, window.innerHeight);
          composer.setSize(window.innerWidth, window.innerHeight);
        };
        window.addEventListener('resize', onWindowResize);
        
        let t = 0;
        let ambulancePaused = false;
        
        function animate() {
          requestAnimationFrame(animate);
          controls.update();

          if (ambulance.visible && !ambulancePaused) {
            t = (t + 0.0016) % 1;
            path.getPointAt(t, tmp);
            path.getTangentAt(t, tmp2);
            ambulance.position.set(tmp.x, 0, tmp.z);
            ambulance.rotation.y = Math.atan2(tmp2.x, tmp2.z);
          }

          if (erDoor.userData.sliding) {
            const S = erDoor.userData.sliding; S.t += (S.open ? 1 : -1) * 0.08; S.t = Math.max(0, Math.min(1, S.t));
            const k = S.t;
            S.left.position.x = -3 + -2.5 * k;
            S.right.position.x = 3 + 2.5 * k;
          }
          if (stairExit.userData.hinged) {
            const H = stairExit.userData.hinged; H.t += (H.open ? 1 : -1) * 0.08; H.t = Math.max(0, Math.min(1, H.t));
            const rot = -Math.PI / 2 * H.t;
            H.leaf.rotation.y = rot;
          }

          raycaster.setFromCamera(mouse, camera);
          const intersect = raycaster.intersectObjects(world.children, true)[0];
          if (intersect && intersect.object.visible) {
            hovered = intersect;
            if(canvasRef.current) canvasRef.current.style.cursor = 'pointer';
            const t = hovered.object.userData.type || hovered.object.parent?.userData?.type || 'object';
            tooltipEl.textContent = t;
            tooltipEl.style.opacity = '1';
          } else {
            hovered = null;
            if(canvasRef.current) canvasRef.current.style.cursor = 'default';
            tooltipEl.style.opacity = '0';
          }

          if (camAnim) {
            camAnim.t = Math.min(1, camAnim.t + 0.06);
            const ease = (x) => (x < 0.5 ? 2 * x * x : -1 + (4 - 2 * x) * x);
            const k = ease(camAnim.t);
            camera.position.lerpVectors(camAnim.fromPos, camAnim.toPos, k);
            controls.target.lerpVectors(camAnim.fromTarget, camAnim.toTarget, k);
            if (camAnim.t >= 1) camAnim = null;
          }

          composer.render();
          labelRenderer.render(scene, camera);
        }
        animate();
        
        function makeLabel(text) {
            const el = document.createElement('div');
            el.textContent = text;
            el.style.padding = '2px 6px';
            el.style.borderRadius = '999px';
            el.style.fontSize = '12px';
            el.style.color = '#e7eaee';
            el.style.background = 'rgba(46,91,173,.78)';
            el.style.border = '1px solid rgba(255,255,255,.12)';
            const obj = new CSS2DObject(el);
            obj.layers.set(0);
            return obj;
        }

        function attachLabel(target, text, yOffset = 0) {
            const label = makeLabel(text);
            label.position.set(0, yOffset, 0);
            target.add(label);
            return label;
        }

        attachLabel(mainBlock, 'Main Block', 14);
        attachLabel(erBlock, 'Emergency', 10);
        attachLabel(wardBlock, 'Ward', 12);
        attachLabel(icu, 'ICU', 3.6);
        attachLabel(operatingTheatre, 'Operating Theatre', 3.6);
        attachLabel(diagnostics, 'Diagnostics', 3.6);
        attachLabel(nurseStation, 'Nurse Station', 3.2);

        function createExitSign() {
            const g = new THREE.Group();
            const plate = new THREE.Mesh(new THREE.BoxGeometry(1.6, 0.6, 0.06), new THREE.MeshStandardMaterial({ color: 0x0c3b1e, emissive: 0x061f10 }));
            const text = new CSS2DObject(Object.assign(document.createElement('div'), { textContent: 'EXIT →' }));
            text.element.style.color = '#b6ffd0';
            text.element.style.fontSize = '12px';
            text.position.set(0, 0, 0.05);
            g.add(plate, text);
            g.userData.type = 'equipment';
            return g;
        }

        const exit1 = createExitSign(); exit1.position.set(40, 2.2, -16); interiors.add(exit1);
        const exit2 = createExitSign(); exit2.position.set(-70, 2.2, 26); interiors.add(exit2);
        const exit3 = createExitSign(); exit3.position.set(-32, 2.2, 50); interiors.add(exit3);

        const selectionHelper = new THREE.Box3Helper(new THREE.Box3(), 0x4ea1ff);
        selectionHelper.visible = false;
        world.add(selectionHelper);
        
        let isolatedRoot = null;

        function highlight(obj) {
            const root = obj;
            const box = new THREE.Box3().setFromObject(root);
            selectionHelper.box.copy(box);
            selectionHelper.visible = true;
        }

        function findTopGroup(obj) {
            let cur = obj;
            while (cur.parent && cur.parent !== world) {
                cur = cur.parent;
                if (cur.userData.collection === 'interiors' || cur.userData.collection === 'buildings') {
                    break;
                }
            }
            return cur;
        }

        function isolate(root) {
            isolatedRoot = root;
            world.traverse((o) => {
                if (o === ground || o === selectionHelper) return;
                if (o === root) { o.visible = true; return; }
                if (o.userData && (o.userData.type === 'road' || o.userData.type === 'lawn')) {
                    o.visible = true; return;
                }
                if (o.isMesh || o.isGroup) o.visible = false;
            });
        }
        
        function resetIsolation() {
            isolatedRoot = null;
            world.traverse((o) => { if (o.isMesh || o.isGroup) o.visible = true; });
            applyToggles(toggles);
        }

        function focusOnObject(obj) {
            const box = new THREE.Box3().setFromObject(obj);
            const size = new THREE.Vector3();
            box.getSize(size);
            const center = new THREE.Vector3();
            box.getCenter(center);
            const radius = Math.max(size.x, size.y, size.z) * 0.75 + 6;
            const dir = new THREE.Vector3(1, 0.6, 1).normalize();
            const dst = center.clone().add(dir.multiplyScalar(radius * 2.2));
            camAnim = {
                fromPos: camera.position.clone(),
                toPos: dst,
                fromTarget: controls.target.clone(),
                toTarget: center,
                t: 0,
            };
        }
        
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'F' || e.key === 'f') { if (hovered) focusOnObject(hovered.object); }
            if (e.key === 'X' || e.key === 'x') { resetIsolation(); selectionHelper.visible = false; }
            if (e.key === '1') { (document.getElementById('toggle-buildings') as HTMLInputElement).click(); }
            if (e.key === '2') { (document.getElementById('toggle-interiors') as HTMLInputElement).click(); }
            if (e.key === '3') { (document.getElementById('toggle-equipment') as HTMLInputElement).click(); }
            if (e.key === '4') { (document.getElementById('toggle-ambulance') as HTMLInputElement).click(); }
            if (e.key === 'N' || e.key === 'n') { (document.getElementById('toggle-daynight') as HTMLInputElement).click(); }
            if (e.code === 'Space') { ambulancePaused = !ambulancePaused; e.preventDefault(); }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('resize', onWindowResize);
            window.removeEventListener('pointermove', onPointerMove);
            window.removeEventListener('click', onClick);
            window.removeEventListener('dblclick', onDblClick);
            window.removeEventListener('keydown', handleKeyDown);
            document.body.removeChild(labelRenderer.domElement);
            document.body.removeChild(tooltipEl);
            renderer.dispose();
        };

    }, []);

    const handleToggle = (e) => {
        const { id, checked } = e.target;
        setToggles(prev => ({ ...prev, [id.replace('toggle-', '')]: checked }));
    };

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
                        <label><input type="checkbox" id="toggle-daynight" checked={toggles.night} onChange={handleToggle} /> Night Mode</label>
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
