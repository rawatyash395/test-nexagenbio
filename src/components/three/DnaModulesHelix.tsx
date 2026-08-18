"use client";

import { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

/**
 * Generates procedural high-resolution mineral textured canvas textures with biotech glyphs.
 */
function createBiotechTabletTexture(
  type: "interlock" | "codon" | "lnp" | "protein"
): THREE.CanvasTexture | null {
  if (typeof document === "undefined") {
    return null;
  }

  const canvas = document.createElement("canvas");
  canvas.width = 1024;
  canvas.height = 1024;
  const ctx = canvas.getContext("2d");

  if (ctx) {
    // Mineral ceramic base tone
    ctx.fillStyle = "#DDD8C5";
    ctx.fillRect(0, 0, 1024, 1024);

    // Soft ambient radial depth
    const radGrad = ctx.createRadialGradient(512, 512, 300, 512, 512, 512);
    radGrad.addColorStop(0, "rgba(246, 243, 235, 0.45)");
    radGrad.addColorStop(1, "rgba(196, 188, 170, 0.7)");
    ctx.fillStyle = radGrad;
    ctx.fillRect(0, 0, 1024, 1024);

    // Procedural crystalline and mineral flecks
    const rng = (seed: number) => {
      const x = Math.sin(seed++) * 10000;
      return x - Math.floor(x);
    };

    let seed = 77;
    // White crystallite flecks
    ctx.fillStyle = "rgba(255, 255, 255, 0.85)";
    for (let i = 0; i < 5000; i++) {
      const x = rng(seed++) * 1024;
      const y = rng(seed++) * 1024;
      const r = rng(seed++) * 2.4 + 0.6;
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fill();
    }
    // Warm mineral grains
    ctx.fillStyle = "rgba(250, 246, 238, 0.85)";
    for (let i = 0; i < 3500; i++) {
      const x = rng(seed++) * 1024;
      const y = rng(seed++) * 1024;
      const r = rng(seed++) * 1.8 + 0.5;
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fill();
    }
    // Dark micro-particles
    ctx.fillStyle = "rgba(150, 142, 126, 0.45)";
    for (let i = 0; i < 2200; i++) {
      const x = rng(seed++) * 1024;
      const y = rng(seed++) * 1024;
      const r = rng(seed++) * 1.4 + 0.4;
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fill();
    }

    // Embossed scientific glyphs
    ctx.fillStyle = "#FFFFFF";
    ctx.strokeStyle = "#FFFFFF";
    ctx.lineWidth = 58;
    ctx.lineCap = "square";
    ctx.lineJoin = "miter";
    ctx.miterLimit = 4;

    // Tactile depth shadow
    ctx.shadowColor = "rgba(90, 85, 70, 0.28)";
    ctx.shadowBlur = 14;
    ctx.shadowOffsetX = 4;
    ctx.shadowOffsetY = 6;

    if (type === "interlock") {
      // Molecular interlocking schematic
      ctx.lineWidth = 56;

      ctx.beginPath();
      ctx.moveTo(270, 520);
      ctx.lineTo(512, 300);
      ctx.lineTo(754, 520);
      ctx.stroke();

      ctx.lineWidth = 42;
      ctx.beginPath();
      ctx.moveTo(512, 300);
      ctx.lineTo(512, 170);
      ctx.moveTo(390, 410);
      ctx.lineTo(390, 280);
      ctx.moveTo(634, 410);
      ctx.lineTo(634, 280);
      ctx.stroke();

      ctx.lineWidth = 56;
      ctx.beginPath();
      ctx.moveTo(270, 720);
      ctx.lineTo(512, 500);
      ctx.lineTo(754, 720);
      ctx.stroke();

      ctx.lineWidth = 42;
      ctx.beginPath();
      ctx.moveTo(390, 610);
      ctx.lineTo(390, 480);
      ctx.moveTo(634, 610);
      ctx.lineTo(634, 480);
      ctx.stroke();
    } else if (type === "codon") {
      // mRNA Codon Sequence Translation Schematic
      ctx.lineWidth = 44;
      ctx.beginPath();
      ctx.arc(512, 512, 260, 0, Math.PI * 2);
      ctx.stroke();

      ctx.lineWidth = 38;
      ctx.beginPath();
      ctx.moveTo(512, 252);
      ctx.lineTo(512, 430);
      ctx.moveTo(288, 642);
      ctx.lineTo(440, 554);
      ctx.moveTo(736, 642);
      ctx.lineTo(584, 554);
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(512, 512, 52, 0, Math.PI * 2);
      ctx.fill();
    } else if (type === "lnp") {
      // Lipid Nanoparticle Encapsulation Vector
      ctx.lineWidth = 46;
      ctx.beginPath();
      ctx.roundRect(330, 240, 364, 544, 182);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(330, 512);
      ctx.lineTo(694, 512);
      ctx.stroke();

      ctx.beginPath();
      ctx.roundRect(362, 536, 300, 218, [0, 0, 150, 150]);
      ctx.fill();

      const angles = [-Math.PI / 4, 0, Math.PI / 4, (3 * Math.PI) / 4, Math.PI, (5 * Math.PI) / 4];
      angles.forEach((a) => {
        const x = 512 + Math.cos(a) * 310;
        const y = 380 + Math.sin(a) * 160;
        ctx.beginPath();
        ctx.arc(x, y, 22, 0, Math.PI * 2);
        ctx.fill();
      });
    } else {
      // Protein Alpha-Helix Topology Fold
      ctx.lineWidth = 48;
      ctx.beginPath();
      ctx.moveTo(512, 230);
      ctx.lineTo(760, 512);
      ctx.lineTo(512, 794);
      ctx.lineTo(264, 512);
      ctx.closePath();
      ctx.stroke();

      const pockets = [
        [512, 230],
        [760, 512],
        [512, 794],
        [264, 512],
        [512, 512],
      ];
      pockets.forEach(([px, py]) => {
        ctx.beginPath();
        ctx.arc(px, py, 34, 0, Math.PI * 2);
        ctx.fill();
      });
    }
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

/**
 * 3D Notched Chamfered Geometry Generator
 */
function createNotchedTabletShape(
  size: number = 0.72,
  cornerBevel: number = 0.085,
  notchRadius: number = 0.045
): THREE.Shape {
  const shape = new THREE.Shape();
  const half = size / 2;

  // Start at bottom-left after corner bevel
  shape.moveTo(-half + cornerBevel, -half);

  // Bottom side with central notch
  shape.lineTo(-notchRadius, -half);
  shape.absarc(0, -half, notchRadius, Math.PI, 0, false);
  shape.lineTo(half - cornerBevel, -half);

  // Bottom-Right Corner Bevel
  shape.lineTo(half, -half + cornerBevel);

  // Right side with central notch
  shape.lineTo(half, -notchRadius);
  shape.absarc(half, 0, notchRadius, -Math.PI / 2, Math.PI / 2, false);
  shape.lineTo(half, half - cornerBevel);

  // Top-Right Corner Bevel
  shape.lineTo(half - cornerBevel, half);

  // Top side with central notch
  shape.lineTo(notchRadius, half);
  shape.absarc(0, half, notchRadius, 0, Math.PI, false);
  shape.lineTo(-half + cornerBevel, half);

  // Top-Left Corner Bevel
  shape.lineTo(-half, half - cornerBevel);

  // Left side with central notch
  shape.lineTo(-half, notchRadius);
  shape.absarc(-half, 0, notchRadius, Math.PI / 2, -Math.PI / 2, false);
  shape.lineTo(-half, -half + cornerBevel);

  // Close to bottom-left
  shape.lineTo(-half + cornerBevel, -half);

  return shape;
}

interface TabletProps {
  type: "interlock" | "codon" | "lnp" | "protein";
  initialPos: [number, number, number];
  initialRot: [number, number, number];
  scale?: number;
  floatSpeed?: number;
  floatAmplitude?: number;
}

/**
 * Floating 3D Catalyst Tablet with Notched Edges and Textured Glyphs
 */
function FloatingBiotechTablet({
  type,
  initialPos,
  initialRot,
  scale = 1.0,
  floatSpeed = 0.45,
  floatAmplitude = 0.16,
}: TabletProps) {
  const groupRef = useRef<THREE.Group>(null);

  const tabletGeometry = useMemo(() => {
    const shape = createNotchedTabletShape(0.72, 0.085, 0.045);
    const geo = new THREE.ExtrudeGeometry(shape, {
      depth: 0.18,
      bevelEnabled: true,
      bevelSegments: 3,
      bevelSize: 0.022,
      bevelThickness: 0.022,
    });
    geo.center();
    return geo;
  }, []);

  const glyphTexture = useMemo(() => createBiotechTabletTexture(type), [type]);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.elapsedTime * floatSpeed;

    // Organic floating
    groupRef.current.position.y = initialPos[1] + Math.sin(t + initialPos[0]) * floatAmplitude;
    groupRef.current.position.x = initialPos[0] + Math.cos(t * 0.7 + initialPos[1]) * 0.035;

    // Soft tumbling
    groupRef.current.rotation.x = initialRot[0] + Math.sin(t * 0.8) * 0.05;
    groupRef.current.rotation.y = initialRot[1] + Math.cos(t * 0.6) * 0.06;
    groupRef.current.rotation.z = initialRot[2] + Math.sin(t * 0.5) * 0.04;
  });

  return (
    <group ref={groupRef} position={initialPos} rotation={initialRot} scale={scale}>
      <mesh geometry={tabletGeometry} castShadow receiveShadow>
        <meshStandardMaterial
          color="#DDD8C5"
          roughness={0.52}
          metalness={0.03}
        />
      </mesh>

      {glyphTexture && (
        <>
          <mesh position={[0, 0, 0.113]}>
            <planeGeometry args={[0.62, 0.62]} />
            <meshStandardMaterial
              map={glyphTexture}
              roughness={0.48}
              metalness={0.02}
              polygonOffset
              polygonOffsetFactor={-1}
            />
          </mesh>

          <mesh position={[0, 0, -0.113]} rotation={[0, Math.PI, 0]}>
            <planeGeometry args={[0.62, 0.62]} />
            <meshStandardMaterial
              map={glyphTexture}
              roughness={0.48}
              metalness={0.02}
              polygonOffset
              polygonOffsetFactor={-1}
            />
          </mesh>
        </>
      )}
    </group>
  );
}

/**
 * Continuous Helical Ribbon Backbone Geometry Generator
 */
function createStretchedRibbonGeometry(
  helixRadius: number,
  helixHeight: number,
  totalTurns: number,
  offsetAngle: number,
  numSteps: number = 380,
  radialSegments: number = 14,
  radiusX: number = 0.072,
  radiusY: number = 0.042
): THREE.BufferGeometry {
  const positions: number[] = [];
  const indices: number[] = [];

  for (let i = 0; i <= numSteps; i++) {
    const p = i / numSteps;
    const y = (p - 0.5) * helixHeight;
    const angle = p * Math.PI * 2 * totalTurns + offsetAngle;

    const cx = Math.cos(angle) * helixRadius;
    const cz = Math.sin(angle) * helixRadius;
    const center = new THREE.Vector3(cx, y, cz);

    const nVec = new THREE.Vector3(Math.cos(angle), 0, Math.sin(angle));

    const ty = helixHeight / (Math.PI * 2 * totalTurns * helixRadius);
    const tx = -Math.sin(angle);
    const tz = Math.cos(angle);
    const tVec = new THREE.Vector3(tx, ty, tz).normalize();

    const bVec = new THREE.Vector3().crossVectors(tVec, nVec).normalize();

    for (let j = 0; j < radialSegments; j++) {
      const theta = (j / radialSegments) * Math.PI * 2;
      const offsetX = Math.cos(theta) * radiusX;
      const offsetY = Math.sin(theta) * radiusY;

      const vertex = center.clone()
        .addScaledVector(nVec, offsetX)
        .addScaledVector(bVec, offsetY);

      positions.push(vertex.x, vertex.y, vertex.z);
    }

    if (i > 0) {
      const prev = (i - 1) * radialSegments;
      const curr = i * radialSegments;

      for (let j = 0; j < radialSegments; j++) {
        const nextJ = (j + 1) % radialSegments;
        const pA = prev + j;
        const pB = prev + nextJ;
        const cA = curr + j;
        const cB = curr + nextJ;

        indices.push(pA, cA, pB);
        indices.push(pB, cA, cB);
      }
    }
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
  geometry.setIndex(indices);
  geometry.computeVertexNormals();
  return geometry;
}

/**
 * Organic Flared Slat Rung Geometry Generator
 */
function createStretchedFlaredRungGeometry(
  p1: THREE.Vector3,
  p2: THREE.Vector3,
  segments: number = 18,
  radialSegments: number = 12,
  coreRadiusY: number = 0.032,
  coreRadiusZ: number = 0.052
): THREE.BufferGeometry {
  const positions: number[] = [];
  const indices: number[] = [];

  const dir = p2.clone().sub(p1);
  const up = new THREE.Vector3(0, 1, 0);
  const forward = new THREE.Vector3().crossVectors(dir.clone().normalize(), up).normalize();

  for (let s = 0; s <= segments; s++) {
    const t = s / segments;
    const center = p1.clone().lerp(p2, t);

    // Wide organic flare at anchor ends
    const distFromEnd = Math.min(t, 1 - t) * 2;
    const flare = 1.0 + (1.0 - Math.pow(distFromEnd, 0.55)) * 1.1;

    const ry = coreRadiusY * (0.8 + flare * 0.2);
    const rz = coreRadiusZ * flare;

    for (let j = 0; j < radialSegments; j++) {
      const theta = (j / radialSegments) * Math.PI * 2;
      const vy = Math.cos(theta) * ry;
      const vz = Math.sin(theta) * rz;

      const vertex = center.clone()
        .addScaledVector(up, vy)
        .addScaledVector(forward, vz);

      positions.push(vertex.x, vertex.y, vertex.z);
    }

    if (s > 0) {
      const prev = (s - 1) * radialSegments;
      const curr = s * radialSegments;

      for (let j = 0; j < radialSegments; j++) {
        const nextJ = (j + 1) % radialSegments;
        const pA = prev + j;
        const pB = prev + nextJ;
        const cA = curr + j;
        const cB = curr + nextJ;

        indices.push(pA, cA, pB);
        indices.push(pB, cA, cB);
      }
    }
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
  geometry.setIndex(indices);
  geometry.computeVertexNormals();
  return geometry;
}

/**
 * 3D DNA Helix Scene with Lateral Weaving and Pinned Scroll Coupling
 */
function DnaHelixScene({
  scrollProgressRef,
}: {
  scrollProgressRef: React.MutableRefObject<number>;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const smoothProgress = useRef(0);
  const smoothX = useRef(2.2);
  const smoothRotZ = useRef(0);

  // Vertical structural dimensions
  const totalRungs = 56;
  const helixRadius = 0.68;
  const helixHeight = 14.2;
  const totalTurns = 2.4;

  const ribbonGeo1 = useMemo(
    () => createStretchedRibbonGeometry(helixRadius, helixHeight, totalTurns, 0, 360, 14, 0.074, 0.042),
    [helixRadius, helixHeight, totalTurns]
  );

  const ribbonGeo2 = useMemo(
    () => createStretchedRibbonGeometry(helixRadius, helixHeight, totalTurns, Math.PI, 360, 14, 0.074, 0.042),
    [helixRadius, helixHeight, totalTurns]
  );

  const rungGeometries = useMemo(() => {
    const list: THREE.BufferGeometry[] = [];

    for (let i = 0; i < totalRungs; i++) {
      const p = (i + 0.5) / totalRungs;
      const y = (p - 0.5) * (helixHeight - 0.4);
      const angle = p * Math.PI * 2 * totalTurns;

      const innerR = helixRadius - 0.048;
      const p1 = new THREE.Vector3(Math.cos(angle) * innerR, y, Math.sin(angle) * innerR);
      const p2 = new THREE.Vector3(Math.cos(angle + Math.PI) * innerR, y, Math.sin(angle + Math.PI) * innerR);

      list.push(createStretchedFlaredRungGeometry(p1, p2, 16, 12, 0.030, 0.050));
    }

    return list;
  }, [totalRungs, helixRadius, helixHeight, totalTurns]);

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    const t = state.clock.elapsedTime;

    const targetP = Math.max(0, Math.min(1, scrollProgressRef.current));
    const lerpFactor = 1 - Math.exp(-Math.min(delta, 0.1) * 4.5);
    smoothProgress.current = THREE.MathUtils.lerp(smoothProgress.current, targetP, lerpFactor);

    const p = smoothProgress.current;
    const baseRotationY = t * 0.35 + p * Math.PI * 6;

    // Viewport-aware horizontal offset for responsive placement
    const isLargeScreen = state.size.width >= 1024;
    const isMediumScreen = state.size.width >= 768;

    let colOffset = 2.3;
    if (isLargeScreen) {
      colOffset = Math.min(2.7, Math.max(2.1, state.viewport.width * 0.27));
    } else if (isMediumScreen) {
      colOffset = 1.4;
    } else {
      colOffset = 0; // Centered on mobile viewports
    }

    // Alternating horizontal wave aligning with active module cards
    const wave = Math.cos(p * Math.PI * 5);
    const targetX = wave * colOffset;
    const targetY = -((p - 0.5) * 1.2) - 0.1;

    // Dynamic bank tilt
    const targetRotZ = colOffset > 0 ? -Math.sin(p * Math.PI * 5) * 0.12 : 0;
    const targetRotX = 0.05 + Math.cos(p * Math.PI * 2.5) * 0.03;

    // Transit depth pushback
    const centerTransitDepth = Math.abs(Math.sin(p * Math.PI * 5)) * 0.35;
    const targetZ = (colOffset > 0 ? -0.1 : -0.5) - centerTransitDepth;
    const targetScale = isLargeScreen ? 0.76 : (isMediumScreen ? 0.62 : 0.48);

    smoothX.current = THREE.MathUtils.lerp(smoothX.current, targetX, lerpFactor);
    smoothRotZ.current = THREE.MathUtils.lerp(smoothRotZ.current, targetRotZ, lerpFactor);

    groupRef.current.position.x = smoothX.current;
    groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, targetY, lerpFactor);
    groupRef.current.position.z = THREE.MathUtils.lerp(groupRef.current.position.z, targetZ, lerpFactor);

    groupRef.current.scale.setScalar(THREE.MathUtils.lerp(groupRef.current.scale.x, targetScale, lerpFactor));

    groupRef.current.rotation.y = baseRotationY;
    groupRef.current.rotation.z = smoothRotZ.current;
    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetRotX, lerpFactor);
  });

  return (
    <group ref={groupRef}>
      {/* Helical Ribbons */}
      <mesh geometry={ribbonGeo1} castShadow receiveShadow>
        <meshStandardMaterial
          color="#F5F2EB"
          roughness={0.44}
          metalness={0.02}
        />
      </mesh>

      <mesh geometry={ribbonGeo2} castShadow receiveShadow>
        <meshStandardMaterial
          color="#F5F2EB"
          roughness={0.44}
          metalness={0.02}
        />
      </mesh>

      {/* Flared Slat Rungs */}
      {rungGeometries.map((geo, i) => (
        <mesh key={`rung-${i}`} geometry={geo} castShadow receiveShadow>
          <meshStandardMaterial
            color="#EAE5DC"
            roughness={0.46}
            metalness={0.02}
          />
        </mesh>
      ))}

      {/* Floating Notched Biotech Tablets */}
      <FloatingBiotechTablet
        type="codon"
        initialPos={[0.85, 2.6, 0.45]}
        initialRot={[0.26, -0.32, 0.22]}
        scale={0.84}
        floatSpeed={0.42}
        floatAmplitude={0.14}
      />

      <FloatingBiotechTablet
        type="interlock"
        initialPos={[-0.85, 0.5, 0.5]}
        initialRot={[-0.16, 0.3, -0.16]}
        scale={0.80}
        floatSpeed={0.48}
        floatAmplitude={0.16}
      />

      <FloatingBiotechTablet
        type="lnp"
        initialPos={[0.82, -1.6, -0.2]}
        initialRot={[0.18, 0.42, 0.12]}
        scale={0.76}
        floatSpeed={0.4}
        floatAmplitude={0.13}
      />

      <FloatingBiotechTablet
        type="protein"
        initialPos={[-0.82, -3.8, 0.55]}
        initialRot={[-0.22, -0.18, -0.25]}
        scale={0.86}
        floatSpeed={0.46}
        floatAmplitude={0.15}
      />
    </group>
  );
}

/**
 * Main Atmospheric DNA Canvas Container
 */
export default function DnaModulesHelix({
  scrollProgressRef,
}: {
  scrollProgressRef: React.MutableRefObject<number>;
}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="relative w-full h-full pointer-events-none select-none">
      {/* Atmospheric Sage Backdrop */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#26332a]/80 via-[#18211b]/60 to-[#0e1411]/85" />

      {/* 3D WebGL Canvas */}
      <Canvas
        camera={{ position: [0, 0, 5.8], fov: 40 }}
        dpr={[1, 1.75]}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        className="w-full h-full opacity-15"
      >
        <ambientLight intensity={1.4} color="#EAE7DF" />
        <directionalLight position={[4, 6, 6]} intensity={1.8} color="#FFFDF7" />
        <directionalLight position={[-4, -2, 4]} intensity={1.2} color="#A8BCAE" />
        <pointLight position={[0, 8, 3]} intensity={1.1} color="#E4EFE7" />

        <DnaHelixScene scrollProgressRef={scrollProgressRef} />
      </Canvas>

      {/* Depth of field vignettes */}
      <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-brand-black via-brand-black/60 to-transparent pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-44 bg-gradient-to-t from-brand-black via-brand-black/70 to-transparent pointer-events-none" />
    </div>
  );
}
