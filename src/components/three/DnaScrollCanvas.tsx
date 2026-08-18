"use client";

import { useRef, useMemo, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

/**
 * Floating 3D Catalyst Tablet with Orbiting Physics
 */
function CatalystTablet({
  position,
  rotationSpeed = 0.5,
  orbitRadius = 2.2,
  orbitSpeed = 0.3,
  orbitOffset = 0,
}: {
  position: [number, number, number];
  rotationSpeed?: number;
  orbitRadius?: number;
  orbitSpeed?: number;
  orbitOffset?: number;
  label?: string;
  glyph?: string;
}) {
  const meshRef = useRef<THREE.Group>(null);
  const initialY = position[1];

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.elapsedTime * orbitSpeed + orbitOffset;

    // Orbiting motion around the DNA central axis
    meshRef.current.position.x = Math.cos(t) * orbitRadius;
    meshRef.current.position.z = Math.sin(t) * orbitRadius;
    meshRef.current.position.y = initialY + Math.sin(state.clock.elapsedTime * 0.8 + orbitOffset) * 0.25;

    // Slow tumbling rotation
    meshRef.current.rotation.x = Math.sin(t * 0.7) * 0.35 + 0.2;
    meshRef.current.rotation.y = t * rotationSpeed;
    meshRef.current.rotation.z = Math.cos(t * 0.5) * 0.2;
  });

  return (
    <group ref={meshRef} position={position}>
      {/* Outer Rounded Tablet Box */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={[0.7, 0.7, 0.24]} />
        <meshStandardMaterial
          color="#EAE6DF"
          roughness={0.4}
          metalness={0.15}
          emissive="#6EFFC8"
          emissiveIntensity={0.08}
        />
      </mesh>

      {/* Glowing Chamfer Edge */}
      <lineSegments>
        <edgesGeometry args={[new THREE.BoxGeometry(0.702, 0.702, 0.242)]} />
        <lineBasicMaterial color="#6EFFC8" transparent opacity={0.35} />
      </lineSegments>

      {/* Inner Recessed Symbol Core */}
      <mesh position={[0, 0, 0.125]}>
        <planeGeometry args={[0.42, 0.42]} />
        <meshBasicMaterial color="#223028" transparent opacity={0.75} />
      </mesh>
      <mesh position={[0, 0, -0.125]} rotation={[0, Math.PI, 0]}>
        <planeGeometry args={[0.42, 0.42]} />
        <meshBasicMaterial color="#223028" transparent opacity={0.75} />
      </mesh>
    </group>
  );
}

/**
 * 3D DNA Double Helix Ribbon & Base-Pair Rungs
 */
function DnaHelixModel({ scrollProgress }: { scrollProgress: React.MutableRefObject<number> }) {
  const groupRef = useRef<THREE.Group>(null);
  const totalRungs = 38;
  const helixRadius = 1.35;
  const helixHeight = 11.5;
  const totalTurns = 4.2;

  // Compute backbone nodes and ladder rungs
  const { rungPairs, strand1Points, strand2Points } = useMemo(() => {
    const rungs: { start: THREE.Vector3; end: THREE.Vector3; color: string; idx: number }[] = [];
    const s1: THREE.Vector3[] = [];
    const s2: THREE.Vector3[] = [];

    const colors = ["#E8F5EE", "#D4EADB", "#6EFFC8", "#95FFE2", "#F0F4EE"];

    for (let i = 0; i < totalRungs; i++) {
      const p = i / (totalRungs - 1);
      const y = (p - 0.5) * helixHeight;
      const angle = p * Math.PI * 2 * totalTurns;

      const x1 = Math.cos(angle) * helixRadius;
      const z1 = Math.sin(angle) * helixRadius;
      const pos1 = new THREE.Vector3(x1, y, z1);
      s1.push(pos1);

      const x2 = Math.cos(angle + Math.PI) * helixRadius;
      const z2 = Math.sin(angle + Math.PI) * helixRadius;
      const pos2 = new THREE.Vector3(x2, y, z2);
      s2.push(pos2);

      rungs.push({
        start: pos1,
        end: pos2,
        color: colors[i % colors.length],
        idx: i,
      });
    }

    return { rungPairs: rungs, strand1Points: s1, strand2Points: s2 };
  }, []);

  // Backbone Curves for continuous smooth ribbons
  const { curve1Geo, curve2Geo } = useMemo(() => {
    const curve1 = new THREE.CatmullRomCurve3(strand1Points);
    const curve2 = new THREE.CatmullRomCurve3(strand2Points);
    const geo1 = new THREE.TubeGeometry(curve1, 140, 0.075, 12, false);
    const geo2 = new THREE.TubeGeometry(curve2, 140, 0.075, 12, false);
    return { curve1Geo: geo1, curve2Geo: geo2 };
  }, [strand1Points, strand2Points]);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.elapsedTime;
    const p = scrollProgress.current;

    // Continuous rotation
    const baseRotationY = t * 0.35 + p * Math.PI * 5;

    // Fluid lateral weaving calculation
    const wave1 = Math.sin(p * Math.PI * 4.5);
    const targetX = wave1 * 2.35;
    const targetY = -((p - 0.5) * 3.5);
    const targetRotZ = Math.sin(p * Math.PI * 3) * 0.18;
    const targetRotX = 0.15 + Math.cos(p * Math.PI * 2) * 0.12;

    groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, targetX, 0.06);
    groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, targetY, 0.06);
    groupRef.current.position.z = THREE.MathUtils.lerp(groupRef.current.position.z, -0.5, 0.06);

    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, baseRotationY, 0.08);
    groupRef.current.rotation.z = THREE.MathUtils.lerp(groupRef.current.rotation.z, targetRotZ, 0.06);
    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetRotX, 0.06);
  });

  return (
    <group ref={groupRef}>
      {/* Continuous Helical Ribbons */}
      <mesh geometry={curve1Geo} castShadow receiveShadow>
        <meshStandardMaterial
          color="#F2EFEB"
          roughness={0.3}
          metalness={0.12}
          emissive="#6EFFC8"
          emissiveIntensity={0.06}
        />
      </mesh>
      <mesh geometry={curve2Geo} castShadow receiveShadow>
        <meshStandardMaterial
          color="#F2EFEB"
          roughness={0.3}
          metalness={0.12}
          emissive="#6EFFC8"
          emissiveIntensity={0.06}
        />
      </mesh>

      {/* Base-pair Rungs */}
      {rungPairs.map((rung, i) => {
        const dir = rung.end.clone().sub(rung.start);
        const len = dir.length();
        const mid = rung.start.clone().add(rung.end).multiplyScalar(0.5);
        const up = new THREE.Vector3(0, 1, 0);
        const quat = new THREE.Quaternion().setFromUnitVectors(up, dir.clone().normalize());

        return (
          <group key={i}>
            <mesh position={mid} quaternion={quat}>
              <cylinderGeometry args={[0.032, 0.032, len * 0.96, 12, 1]} />
              <meshStandardMaterial
                color="#E4DFD5"
                roughness={0.4}
                metalness={0.1}
                emissive="#6EFFC8"
                emissiveIntensity={i % 4 === 0 ? 0.25 : 0.04}
              />
            </mesh>

            <mesh position={rung.start}>
              <sphereGeometry args={[0.1, 14, 14]} />
              <meshStandardMaterial
                color="#FFFFFF"
                roughness={0.2}
                emissive="#6EFFC8"
                emissiveIntensity={0.3}
              />
            </mesh>
            <mesh position={rung.end}>
              <sphereGeometry args={[0.1, 14, 14]} />
              <meshStandardMaterial
                color="#FFFFFF"
                roughness={0.2}
                emissive="#6EFFC8"
                emissiveIntensity={0.3}
              />
            </mesh>
          </group>
        );
      })}

      {/* Floating Catalyst Tablets */}
      <CatalystTablet position={[1.8, 3.2, 0]} orbitRadius={2.4} orbitSpeed={0.28} orbitOffset={0.2} label="01" glyph="audit" />
      <CatalystTablet position={[-1.7, 1.4, 0]} orbitRadius={2.6} orbitSpeed={-0.24} orbitOffset={1.8} label="02" glyph="consulting" />
      <CatalystTablet position={[1.9, -1.2, 0]} orbitRadius={2.3} orbitSpeed={0.32} orbitOffset={3.4} label="03" glyph="training" />
      <CatalystTablet position={[-1.8, -3.4, 0]} orbitRadius={2.5} orbitSpeed={-0.26} orbitOffset={4.9} label="04" glyph="project" />
    </group>
  );
}

/**
 * Atmospheric Bio-Particle Field
 */
function AtmosphericBioField({ count = 160 }: { count?: number }) {
  const pointsRef = useRef<THREE.Points>(null);

  const { positions, colors } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const cWhite = new THREE.Color("#FFFFFF");
    const cEmerald = new THREE.Color("#6EFFC8");
    const cSage = new THREE.Color("#A8B5AB");

    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 14;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 18;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 10 - 1;

      const chosen = i % 5 === 0 ? cEmerald : i % 2 === 0 ? cSage : cWhite;
      col[i * 3] = chosen.r;
      col[i * 3 + 1] = chosen.g;
      col[i * 3 + 2] = chosen.b;
    }
    return { positions: pos, colors: col };
  }, [count]);

  useFrame((state) => {
    if (!pointsRef.current) return;
    const t = state.clock.elapsedTime;
    pointsRef.current.rotation.y = t * 0.015;
    pointsRef.current.rotation.x = Math.sin(t * 0.01) * 0.05;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={positions.length / 3} array={positions} itemSize={3} />
        <bufferAttribute attach="attributes-color" count={colors.length / 3} array={colors} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.065} vertexColors transparent opacity={0.45} sizeAttenuation depthWrite={false} />
    </points>
  );
}

/**
 * Main Persistent 3D DNA Canvas Wrapper
 */
export default function DnaScrollCanvas() {
  const scrollProgress = useRef<number>(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (maxScroll > 0) {
        scrollProgress.current = Math.min(1, Math.max(0, scrollY / maxScroll));
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
      {/* Atmospheric Biotech Backdrop */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#18221C] via-[#0E1511] to-[#0A0E0C] opacity-90" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(40,56,46,0.5)_0%,rgba(10,14,12,0.95)_75%)]" />

      {/* 3D WebGL Canvas */}
      <Canvas
        camera={{ position: [0, 0, 7.2], fov: 46 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        className="w-full h-full opacity-75"
      >
        <ambientLight intensity={1.1} />
        <directionalLight position={[4, 5, 6]} intensity={1.8} color="#FFFFFF" />
        <directionalLight position={[-5, -2, 4]} intensity={2.2} color="#6EFFC8" />
        <pointLight position={[0, 8, 3]} intensity={1.4} color="#D4EADB" />

        <DnaHelixModel scrollProgress={scrollProgress} />
        <AtmosphericBioField count={180} />
      </Canvas>
    </div>
  );
}
