"use client";

import dynamic from "next/dynamic";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useState, useEffect } from "react";

// Lazy-load Three.js canvas - smooth non-blocking LCP
const MolecularField = dynamic(() => import("./MolecularField"), {
  ssr: false,
  loading: () => <MolecularFallback />,
});

// Sleek animated SVG fallback for reduced motion
function MolecularFallback() {
  return (
    <div className="w-full h-full flex items-center justify-center select-none" aria-hidden="true">
      <svg
        viewBox="0 0 400 400"
        fill="none"
        className="w-full h-full max-w-md opacity-80"
      >
        {/* Outer Orbit Rings */}
        <circle cx="200" cy="200" r="150" stroke="#6EFFC8" strokeWidth="0.8" strokeDasharray="6 8" opacity="0.35" className="animate-spin-slow" style={{ animationDuration: "35s" }} />
        <ellipse cx="200" cy="200" rx="140" ry="85" stroke="#4DC99B" strokeWidth="0.8" strokeDasharray="4 6" opacity="0.4" transform="rotate(-25 200 200)" />
        
        {/* Core Double Helix nodes */}
        {[
          [200, 70], [240, 110], [260, 160], [240, 210], [200, 250], [160, 290], [140, 330],
          [200, 120], [160, 160], [140, 210], [160, 250], [200, 290], [240, 330],
        ].map(([cx, cy], i) => (
          <g key={i}>
            <circle cx={cx} cy={cy} r={i % 3 === 0 ? 9 : 6} fill="#6EFFC8" opacity={0.8} />
            <circle cx={cx} cy={cy} r={i % 3 === 0 ? 14 : 10} stroke="#6EFFC8" strokeWidth="0.8" opacity={0.4} strokeDasharray="2 2" />
          </g>
        ))}

        {/* Central Core */}
        <circle cx="200" cy="200" r="22" stroke="#6EFFC8" strokeWidth="1.5" fill="rgba(110,255,200,0.1)" />
        <circle cx="200" cy="200" r="10" fill="#6EFFC8" />
      </svg>
    </div>
  );
}

interface MolecularFieldWrapperProps {
  className?: string;
}

export default function MolecularFieldWrapper({ className }: MolecularFieldWrapperProps) {
  const prefersReduced = useReducedMotion();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <MolecularFallback />;
  if (prefersReduced) return <MolecularFallback />;

  return <MolecularField className={className} />;
}
