"use client";

import { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface HelixNode {
  pos: THREE.Vector3;
  strand: number;
  color: string;
  size: number;
  speed: number;
  offset: number;
}

/**
 * 3D Bond Cylinder Between Two Points
 */
function CylinderBond({ start, end, opacity = 0.25, color = "#6EFFC8" }: { start: THREE.Vector3; end: THREE.Vector3; opacity?: number; color?: string }) {
  const { mid, quat, len } = useMemo(() => {
    const dir = end.clone().sub(start);
    const len = dir.length();
    const mid = start.clone().add(end).multiplyScalar(0.5);
    const up = new THREE.Vector3(0, 1, 0);
    const quat = new THREE.Quaternion().setFromUnitVectors(up, dir.clone().normalize());
    return { mid, quat, len };
  }, [start, end]);

  return (
    <mesh position={mid} quaternion={quat}>
      <cylinderGeometry args={[0.018, 0.018, len, 8, 1]} />
      <meshBasicMaterial color={color} transparent opacity={opacity} />
    </mesh>
  );
}

/**
 * Gyroscopic 3D Orbital Rings with Satellites
 */
function GyroscopeRings() {
  const ring1 = useRef<THREE.Group>(null);
  const ring2 = useRef<THREE.Group>(null);
  const ring3 = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (ring1.current) ring1.current.rotation.z += delta * 0.12;
    if (ring2.current) ring2.current.rotation.x += delta * 0.08;
    if (ring3.current) ring3.current.rotation.y += delta * 0.15;
  });

  return (
    <group>
      {/* Outer Tilted Ring 1 */}
      <group ref={ring1} rotation={[0.4, 0.2, 0]}>
        <mesh>
          <torusGeometry args={[3.2, 0.012, 16, 100]} />
          <meshBasicMaterial color="#6EFFC8" transparent opacity={0.3} />
        </mesh>
        <mesh position={[3.2, 0, 0]}>
          <sphereGeometry args={[0.06, 12, 12]} />
          <meshBasicMaterial color="#6EFFC8" />
        </mesh>
      </group>

      {/* Middle Tilted Ring 2 */}
      <group ref={ring2} rotation={[-0.5, 0.6, 0.3]}>
        <mesh>
          <torusGeometry args={[2.7, 0.01, 16, 90]} />
          <meshBasicMaterial color="#4DC99B" transparent opacity={0.25} />
        </mesh>
        <mesh position={[-2.7, 0, 0]}>
          <sphereGeometry args={[0.05, 12, 12]} />
          <meshBasicMaterial color="#4DC99B" />
        </mesh>
      </group>

      {/* Inner Fast Ring 3 */}
      <group ref={ring3} rotation={[0.8, -0.3, 0.5]}>
        <mesh>
          <torusGeometry args={[2.1, 0.008, 16, 80]} />
          <meshBasicMaterial color="#6EFFC8" transparent opacity={0.2} />
        </mesh>
      </group>
    </group>
  );
}

/**
 * Ambient Quantum Particle Cloud
 */
function QuantumParticleCloud({ count = 140 }: { count?: number }) {
  const pointsRef = useRef<THREE.Points>(null);

  const { positions, colors } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const colorA = new THREE.Color("#6EFFC8");
    const colorB = new THREE.Color("#4DC99B");
    const colorC = new THREE.Color("#95FFE2");

    for (let i = 0; i < count; i++) {
      const radius = 2.0 + Math.random() * 3.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);

      pos[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = radius * Math.cos(phi);

      const chosenColor = i % 3 === 0 ? colorA : i % 3 === 1 ? colorB : colorC;
      col[i * 3] = chosenColor.r;
      col[i * 3 + 1] = chosenColor.g;
      col[i * 3 + 2] = chosenColor.b;
    }
    return { positions: pos, colors: col };
  }, [count]);

  useFrame((state) => {
    if (!pointsRef.current) return;
    const t = state.clock.elapsedTime;
    pointsRef.current.rotation.y = t * 0.03;
    pointsRef.current.rotation.x = Math.sin(t * 0.02) * 0.1;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={colors.length / 3}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.045}
        vertexColors
        transparent
        opacity={0.65}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

/**
 * Dynamic 3D mRNA Helical Lattice & Transcription Engine
 */
function MRNAHelixLattice({
  smoothMouseX,
  smoothMouseY,
  dragRotation,
}: {
  smoothMouseX: React.MutableRefObject<number>;
  smoothMouseY: React.MutableRefObject<number>;
  dragRotation: React.MutableRefObject<{ x: number; y: number }>;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const coreMeshRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  // Structural parameters
  const totalRungs = 24;
  const helixRadius = 1.4;
  const helixHeight = 4.2;

  const helixNodes = useMemo<HelixNode[]>(() => {
    const nodes: HelixNode[] = [];
    const colors = ["#6EFFC8", "#4DC99B", "#95FFE2", "#6EFFC8"];

    for (let i = 0; i < totalRungs; i++) {
      const progress = i / (totalRungs - 1);
      const y = (progress - 0.5) * helixHeight;
      const angle = progress * Math.PI * 4;

      // Strand 1
      const x1 = Math.cos(angle) * helixRadius;
      const z1 = Math.sin(angle) * helixRadius;
      nodes.push({
        pos: new THREE.Vector3(x1, y, z1),
        strand: 0,
        color: colors[i % colors.length],
        size: 0.11,
        speed: 0.8 + (i % 3) * 0.2,
        offset: i * 0.3,
      });

      // Strand 2
      const x2 = Math.cos(angle + Math.PI) * helixRadius;
      const z2 = Math.sin(angle + Math.PI) * helixRadius;
      nodes.push({
        pos: new THREE.Vector3(x2, y, z2),
        strand: 1,
        color: colors[(i + 2) % colors.length],
        size: 0.11,
        speed: 0.8 + (i % 3) * 0.2,
        offset: (i + totalRungs) * 0.3,
      });
    }

    // Central Core Clusters
    const coreCluster: [number, number, number][] = [
      [0, 0, 0],
      [0.4, 0.3, 0.2],
      [-0.3, -0.4, 0.3],
      [0.2, -0.3, -0.4],
      [-0.4, 0.4, -0.2],
      [0.6, -0.2, 0.4],
      [-0.5, 0.1, 0.5],
      [0.1, 0.6, -0.3],
    ];

    coreCluster.forEach(([cx, cy, cz], idx) => {
      nodes.push({
        pos: new THREE.Vector3(cx, cy, cz),
        strand: 2,
        color: idx === 0 ? "#6EFFC8" : "#B5FFE8",
        size: idx === 0 ? 0.22 : 0.13,
        speed: 0.5,
        offset: idx * 0.5,
      });
    });

    return nodes;
  }, []);

  const ladderBonds = useMemo(() => {
    const bonds: [THREE.Vector3, THREE.Vector3][] = [];
    for (let i = 0; i < totalRungs; i++) {
      const n1 = helixNodes[i * 2];
      const n2 = helixNodes[i * 2 + 1];
      bonds.push([n1.pos, n2.pos]);
    }
    return bonds;
  }, [helixNodes]);

  const backboneBonds = useMemo(() => {
    const bonds: [THREE.Vector3, THREE.Vector3][] = [];
    for (let i = 0; i < totalRungs - 1; i++) {
      bonds.push([helixNodes[i * 2].pos, helixNodes[(i + 1) * 2].pos]);
      bonds.push([helixNodes[i * 2 + 1].pos, helixNodes[(i + 1) * 2 + 1].pos]);
    }
    return bonds;
  }, [helixNodes]);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.elapsedTime;

    const targetRotY = t * 0.22 + smoothMouseX.current * 0.45 + dragRotation.current.y;
    const targetRotX = Math.sin(t * 0.18) * 0.15 + smoothMouseY.current * 0.35 + dragRotation.current.x;

    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetRotY, 0.08);
    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetRotX, 0.08);

    if (coreMeshRef.current) {
      helixNodes.forEach((node, i) => {
        const wave = Math.sin(t * 1.5 + node.offset) * 0.06;
        const p = node.pos.clone();
        p.x += Math.cos(t * 0.8 + node.offset) * 0.04;
        p.z += Math.sin(t * 0.8 + node.offset) * 0.04;
        p.y += wave;

        dummy.position.copy(p);
        const pulseScale = node.strand === 2 ? 1 + Math.sin(t * 2.5 + node.offset) * 0.12 : 1;
        dummy.scale.setScalar(node.size * pulseScale);
        dummy.updateMatrix();
        coreMeshRef.current!.setMatrixAt(i, dummy.matrix);
      });
      coreMeshRef.current.instanceMatrix.needsUpdate = true;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Instanced Molecular Atoms */}
      <instancedMesh ref={coreMeshRef} args={[undefined, undefined, helixNodes.length]}>
        <sphereGeometry args={[1, 16, 16]} />
        <meshStandardMaterial
          color="#6EFFC8"
          emissive="#6EFFC8"
          emissiveIntensity={0.65}
          roughness={0.2}
          metalness={0.8}
        />
      </instancedMesh>

      {/* Base-Pair Hydrogen Bonds */}
      {ladderBonds.map(([s, e], i) => (
        <CylinderBond key={`ladder-${i}`} start={s} end={e} opacity={0.28} color="#6EFFC8" />
      ))}

      {/* Polymer Backbone Chains */}
      {backboneBonds.map(([s, e], i) => (
        <CylinderBond key={`backbone-${i}`} start={s} end={e} opacity={0.4} color="#4DC99B" />
      ))}

      <GyroscopeRings />
      <QuantumParticleCloud count={120} />

      <mesh>
        <sphereGeometry args={[0.7, 24, 24]} />
        <meshBasicMaterial color="#6EFFC8" transparent opacity={0.06} wireframe />
      </mesh>
    </group>
  );
}

/**
 * Interactive WebGL Three.js Scene
 */
function Scene() {
  const rawMouseX = useRef(0);
  const rawMouseY = useRef(0);
  const smoothMouseX = useRef(0);
  const smoothMouseY = useRef(0);

  const isDragging = useRef(false);
  const prevPointer = useRef({ x: 0, y: 0 });
  const dragRotation = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      if (isDragging.current) {
        const deltaX = (e.clientX - prevPointer.current.x) * 0.006;
        const deltaY = (e.clientY - prevPointer.current.y) * 0.006;
        dragRotation.current.y += deltaX;
        dragRotation.current.x += deltaY;
        prevPointer.current = { x: e.clientX, y: e.clientY };
      }
      rawMouseX.current = (e.clientX / window.innerWidth - 0.5) * 2;
      rawMouseY.current = (e.clientY / window.innerHeight - 0.5) * 2;
    };

    const onMouseDown = (e: MouseEvent) => {
      isDragging.current = true;
      prevPointer.current = { x: e.clientX, y: e.clientY };
    };

    const onMouseUp = () => {
      isDragging.current = false;
    };

    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        isDragging.current = true;
        prevPointer.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    };

    const onTouchMove = (e: TouchEvent) => {
      if (isDragging.current && e.touches.length > 0) {
        const touch = e.touches[0];
        const deltaX = (touch.clientX - prevPointer.current.x) * 0.008;
        const deltaY = (touch.clientY - prevPointer.current.y) * 0.008;
        dragRotation.current.y += deltaX;
        dragRotation.current.x += deltaY;
        prevPointer.current = { x: touch.clientX, y: touch.clientY };
        rawMouseX.current = (touch.clientX / window.innerWidth - 0.5) * 2;
        rawMouseY.current = (touch.clientY / window.innerHeight - 0.5) * 2;
      }
    };

    const onTouchEnd = () => {
      isDragging.current = false;
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("mousedown", onMouseDown, { passive: true });
    window.addEventListener("mouseup", onMouseUp, { passive: true });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("touchend", onTouchEnd, { passive: true });

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
    };
  }, []);

  useFrame(() => {
    smoothMouseX.current += (rawMouseX.current - smoothMouseX.current) * 0.05;
    smoothMouseY.current += (rawMouseY.current - smoothMouseY.current) * 0.05;
  });

  return (
    <>
      <ambientLight intensity={0.35} />
      <pointLight position={[6, 8, 6]} intensity={2.2} color="#6EFFC8" distance={20} />
      <pointLight position={[-6, -6, -6]} intensity={1.4} color="#4DC99B" distance={20} />
      <pointLight position={[0, 0, 5]} intensity={0.9} color="#95FFE2" distance={10} />

      <MRNAHelixLattice
        smoothMouseX={smoothMouseX}
        smoothMouseY={smoothMouseY}
        dragRotation={dragRotation}
      />
    </>
  );
}

/**
 * Main Molecular Field Component
 */
export default function MolecularField({ className }: { className?: string }) {
  return (
    <div className={`w-full h-full cursor-grab active:cursor-grabbing ${className || ""}`} aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 8.2], fov: 48 }}
        dpr={[1, 1.75]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
        style={{ background: "transparent" }}
      >
        <Scene />
      </Canvas>
    </div>
  );
}
