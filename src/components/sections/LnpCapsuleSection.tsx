"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";

interface CargoParticle {
  id: number;
  angle: number;
  dist: number; // 0 = centre, 1 = shell edge
  speed: number;
  escaped: boolean;
  escapeAngle: number;
  escapeDist: number;
}

const PARTICLE_COUNT = 48;

function initParticles(): CargoParticle[] {
  return Array.from({ length: PARTICLE_COUNT }, (_, i) => ({
    id: i,
    angle: (i / PARTICLE_COUNT) * Math.PI * 2 + Math.random() * 0.4,
    dist: 0.1 + Math.random() * 0.55,
    speed: 0.003 + Math.random() * 0.004,
    escaped: false,
    escapeAngle: Math.random() * Math.PI * 2,
    escapeDist: 0,
  }));
}

export default function LnpCapsuleSection() {
  const [pH, setPH] = useState(5.5);
  const [particles, setParticles] = useState<CargoParticle[]>(initParticles);
  const rafRef = useRef<number>(0);
  const timeRef = useRef(0);
  const isDragging = useRef(false);

  // Release fraction based on pH (ionisable LNP: releases above pH 6.5)
  const releaseFraction = Math.max(0, Math.min(1, (pH - 5.2) / 2.2));
  const encapsulation = (100 - releaseFraction * 94).toFixed(1);
  const zetaPotential = (-5 - releaseFraction * 32).toFixed(1);
  const diameter = (80 + releaseFraction * 28).toFixed(0);
  const efficiency = (releaseFraction * 100).toFixed(1);

  // Animate particles
  useEffect(() => {
    const escapeThreshold = PARTICLE_COUNT * releaseFraction;

    const tick = (ts: number) => {
      const dt = ts - timeRef.current;
      timeRef.current = ts;

      setParticles(prev => prev.map((p, idx) => {
        if (idx < escapeThreshold) {
          // Escaped particles drift outward
          const newDist = Math.min(p.escapeDist + 0.003 * (dt / 16), 1.8);
          return { ...p, escaped: true, escapeDist: newDist };
        } else {
          // Contained - orbit slowly
          const newAngle = p.angle + p.speed * (dt / 16);
          return { ...p, escaped: false, angle: newAngle, escapeDist: 0 };
        }
      }));

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [releaseFraction]);

  // pH slider drag
  const sliderRef = useRef<HTMLDivElement>(null);

  const updatePHFromEvent = useCallback((clientX: number) => {
    const rect = sliderRef.current?.getBoundingClientRect();
    if (!rect) return;
    const t = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
    setPH(+(4.0 + t * 3.4).toFixed(2));
  }, []);

  const handleSliderMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    updatePHFromEvent(e.clientX);
  };

  const handleSliderTouchMove = useCallback((e: TouchEvent) => {
    if (isDragging.current) updatePHFromEvent(e.touches[0].clientX);
  }, [updatePHFromEvent]);

  const handleSliderTouchStart = (e: React.TouchEvent) => {
    isDragging.current = true;
    updatePHFromEvent(e.touches[0].clientX);
  };

  useEffect(() => {
    const move = (e: MouseEvent) => { if (isDragging.current) updatePHFromEvent(e.clientX); };
    const up = () => { isDragging.current = false; };
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseup", up);
    window.addEventListener("touchmove", handleSliderTouchMove, { passive: true });
    window.addEventListener("touchend", up);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseup", up);
      window.removeEventListener("touchmove", handleSliderTouchMove);
      window.removeEventListener("touchend", up);
    };
  }, [updatePHFromEvent, handleSliderTouchMove]);

  const sliderPct = ((pH - 4.0) / 3.4) * 100;

  // SVG dimensions
  const S = 340;
  const cx = S / 2, cy = S / 2;
  const coreR = 62;
  const innerR = 88;
  const midR = 108;
  const outerR = 128;
  const pegR = 142;

  const shellOpacity = Math.max(0.12, 1 - releaseFraction * 0.85);
  const coreOpacity = Math.max(0.25, 1 - releaseFraction * 0.6);

  return (
    <section id="lnp-simulator" className="relative bg-[#060B08] border-t border-brand-accent/10 py-20 sm:py-28 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] rounded-full bg-brand-accent/3 blur-[140px]" />
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16">
        <RevealOnScroll>
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-8 bg-brand-accent/60" />
              <span className="font-mono text-[11px] tracking-[0.2em] text-brand-accent/70 uppercase">05 / LNP Simulator</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-brand-white leading-tight mb-4">
              pH-Responsive Release,{" "}
              <span className="text-brand-accent">LNP Cross-Section</span>
            </h2>
            <p className="text-brand-white/50 text-base sm:text-lg max-w-2xl leading-relaxed">
              Drag the pH slider to simulate endosomal acidification. Watch ionisable lipid layers destabilise, releasing mRNA cargo in real-time as encapsulation and zeta potential update live.
            </p>
          </div>
        </RevealOnScroll>

        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,420px)_1fr] gap-6 lg:gap-8 items-start">

          {/* SVG Cross-Section */}
          <RevealOnScroll delay={0.1}>
            <div className="w-full max-w-[420px] mx-auto lg:mx-0 rounded-2xl border border-brand-accent/15 bg-[#09120E] overflow-hidden">
              {/* Console bar */}
              <div className="flex items-center justify-between px-3 sm:px-4 py-2.5 border-b border-brand-accent/10 font-mono text-[9px] text-brand-accent/50 gap-2">
                <div className="flex items-center gap-2 min-w-0">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#6EFFC8] animate-pulse flex-shrink-0" />
                  <span className="truncate">LNP CROSS-SECTION // pH {pH.toFixed(2)}</span>
                </div>
                <span className={`flex-shrink-0 ${releaseFraction > 0.5 ? "text-[#6EFFC8]" : "text-white/30"}`}>
                  {releaseFraction > 0.5 ? "RELEASING" : "STABLE"}
                </span>
              </div>

              <div className="p-4">
                <svg width="100%" height="auto" viewBox={`0 0 ${S} ${S}`} className="block">
                  <defs>
                    <radialGradient id="pegGrad" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#6EFFC8" stopOpacity="0" />
                      <stop offset="100%" stopColor="#6EFFC8" stopOpacity={0.08 * shellOpacity} />
                    </radialGradient>
                    <radialGradient id="outerGrad" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#6EFFC8" stopOpacity={0.15 * shellOpacity} />
                      <stop offset="100%" stopColor="#6EFFC8" stopOpacity={0.05 * shellOpacity} />
                    </radialGradient>
                    <radialGradient id="midGrad" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#4DC99B" stopOpacity={0.2 * shellOpacity} />
                      <stop offset="100%" stopColor="#4DC99B" stopOpacity={0.08 * shellOpacity} />
                    </radialGradient>
                    <radialGradient id="coreGrad" cx="40%" cy="38%" r="60%">
                      <stop offset="0%" stopColor="#6EFFC8" stopOpacity={0.9 * coreOpacity} />
                      <stop offset="100%" stopColor="#2A7A5A" stopOpacity={0.4 * coreOpacity} />
                    </radialGradient>
                  </defs>

                  {/* PEG corona */}
                  <circle cx={cx} cy={cy} r={pegR} fill="none" stroke="#6EFFC8" strokeWidth="1" strokeDasharray="2 6" strokeOpacity={0.15 * shellOpacity} />

                  {/* Outer lipid layer */}
                  <circle cx={cx} cy={cy} r={outerR} fill="url(#outerGrad)" stroke="#6EFFC8" strokeWidth={1.5} strokeOpacity={0.5 * shellOpacity} />

                  {/* Middle ionisable layer */}
                  <circle cx={cx} cy={cy} r={midR} fill="none" stroke="#4DC99B" strokeWidth={1.2} strokeOpacity={0.6 * shellOpacity} strokeDasharray={releaseFraction > 0.3 ? `${(1 - releaseFraction) * 12} 4` : "none"} />

                  {/* Inner helper lipid */}
                  <circle cx={cx} cy={cy} r={innerR} fill="url(#midGrad)" stroke="#6EFFC8" strokeWidth={1} strokeOpacity={0.4 * shellOpacity} />

                  {/* mRNA core */}
                  <circle cx={cx} cy={cy} r={coreR} fill="url(#coreGrad)" />
                  <circle cx={cx} cy={cy} r={coreR} fill="none" stroke="#6EFFC8" strokeWidth={1.5} strokeOpacity={0.7 * coreOpacity} />

                  {/* Cargo particles */}
                  {particles.map(p => {
                    let px: number, py: number, alpha: number;
                    if (p.escaped) {
                      const escR = outerR + p.escapeDist * 90;
                      px = cx + Math.cos(p.escapeAngle) * escR;
                      py = cy + Math.sin(p.escapeAngle) * escR;
                      alpha = Math.max(0, 1 - p.escapeDist * 0.7);
                    } else {
                      const r = p.dist * (coreR - 6);
                      px = cx + Math.cos(p.angle) * r;
                      py = cy + Math.sin(p.angle) * r;
                      alpha = 0.85;
                    }
                    return (
                      <circle key={p.id} cx={px} cy={py} r={p.escaped ? 2.5 : 2}
                        fill="#6EFFC8"
                        fillOpacity={alpha}
                      />
                    );
                  })}

                  {/* Layer labels */}
                  {[
                    { r: pegR + 6, label: "PEG Corona", angle: -0.5 },
                    { r: outerR + 6, label: "Ionisable Lipid", angle: -0.5 },
                    { r: midR - 18, label: "Helper Lipid", angle: -0.5 },
                    { r: 18, label: "mRNA Cargo", angle: 0 },
                  ].map((lbl, i) => (
                    <text key={i}
                      x={cx + Math.cos(lbl.angle) * lbl.r}
                      y={cy + Math.sin(lbl.angle) * lbl.r}
                      fill="#6EFFC8"
                      fillOpacity={0.4}
                      fontSize="7.5"
                      textAnchor="middle"
                      fontFamily="monospace"
                    >{lbl.label}</text>
                  ))}
                </svg>

                {/* pH Slider */}
                <div className="mt-3 px-1">
                  {/* Labels row - centre value always visible, end labels hidden on xs */}
                  <div className="flex items-center justify-between font-mono text-[9px] text-brand-accent/50 mb-2 gap-1">
                    <span className="hidden xs:block sm:block truncate">pH 4.0</span>
                    <span className="text-brand-accent font-bold whitespace-nowrap">pH {pH.toFixed(2)}</span>
                    <span className="hidden xs:block sm:block truncate text-right">pH 7.4</span>
                  </div>
                  <div
                    ref={sliderRef}
                    className="relative h-8 flex items-center cursor-pointer select-none touch-none"
                    onMouseDown={handleSliderMouseDown}
                    onTouchStart={handleSliderTouchStart}
                  >
                    {/* Track */}
                    <div className="w-full h-2 rounded-full bg-white/8 relative overflow-hidden">
                      <div
                        className="absolute left-0 top-0 h-full rounded-full transition-none"
                        style={{
                          width: `${sliderPct}%`,
                          background: `linear-gradient(90deg, #4DC99B, #6EFFC8)`
                        }}
                      />
                    </div>
                    {/* Thumb - larger hit target on touch */}
                    <div
                      className="absolute w-5 h-5 rounded-full bg-[#6EFFC8] border-2 border-[#09120E] shadow-lg shadow-brand-accent/30 transition-none"
                      style={{ left: `calc(${sliderPct}% - 10px)` }}
                    />
                  </div>
                  <div className="flex justify-between font-mono text-[8px] text-brand-white/20 mt-1">
                    <span className="hidden sm:block">▲ Drag to simulate acidification</span>
                    <span className="sm:hidden">▲ Drag slider</span>
                    <span>{efficiency}% released</span>
                  </div>
                </div>
              </div>
            </div>
          </RevealOnScroll>

          {/* Stats Panel */}
          <RevealOnScroll delay={0.2}>
            <div className="flex flex-col gap-4">
              {/* Live metrics */}
              <div className="rounded-xl border border-brand-accent/15 bg-[#09120E] p-4">
                <p className="font-mono text-[9px] text-brand-accent/50 uppercase tracking-widest mb-4">Live Biophysical Metrics</p>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { label: "Encapsulation", value: encapsulation + "%", desc: "mRNA payload retained" },
                    { label: "Release", value: efficiency + "%", desc: "cargo diffused" },
                    { label: "Zeta Potential", value: zetaPotential + " mV", desc: "surface charge" },
                    { label: "Diameter (DLS)", value: diameter + " nm", desc: "hydrodynamic size" },
                  ].map(m => (
                    <div key={m.label} className="bg-white/3 rounded-lg p-3">
                      <p className="font-mono text-[8px] text-brand-accent/40 mb-1">{m.label}</p>
                      <p className="font-mono text-base font-bold text-brand-accent leading-none mb-1">{m.value}</p>
                      <p className="font-mono text-[8px] text-brand-white/30">{m.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Release curve */}
              <div className="rounded-xl border border-brand-accent/15 bg-[#09120E] p-4">
                <p className="font-mono text-[9px] text-brand-accent/50 uppercase tracking-widest mb-3">pH–Release Profile</p>
                <div className="relative h-20">
                  <svg width="100%" height="80" viewBox="0 0 260 80" preserveAspectRatio="none">
                    <path d="M0 78 C 60 78, 80 78, 100 55 S 140 5, 180 3 S 240 2, 260 2" stroke="#4DC99B" strokeWidth="1.5" fill="none" strokeOpacity="0.3" />
                    {/* Active fill up to current pH */}
                    <path
                      d={`M0 78 C 60 78, 80 78, 100 55 S 140 5, 180 3 S 240 2, ${Math.min(260, sliderPct * 2.6)} ${78 - releaseFraction * 76} L ${Math.min(260, sliderPct * 2.6)} 78 Z`}
                      fill="#6EFFC8"
                      fillOpacity="0.08"
                    />
                    {/* Cursor */}
                    <line x1={sliderPct * 2.6} y1="0" x2={sliderPct * 2.6} y2="80" stroke="#6EFFC8" strokeWidth="1" strokeDasharray="2 2" strokeOpacity="0.6" />
                    {/* pH axis labels */}
                    <text x="0" y="79" fill="#6EFFC8" fillOpacity="0.3" fontSize="7" fontFamily="monospace">4.0</text>
                    <text x="230" y="79" fill="#6EFFC8" fillOpacity="0.3" fontSize="7" fontFamily="monospace">7.4</text>
                  </svg>
                  <div className="absolute top-1 right-1 font-mono text-[8px] text-brand-accent/50">Release %</div>
                </div>
              </div>

              {/* Formulation info */}
              <div className="rounded-xl border border-brand-accent/10 bg-[#09120E] px-4 py-3 font-mono text-[8.5px]">
                <p className="text-brand-accent/50 uppercase tracking-widest mb-2 text-[9px]">Formulation</p>
                <div className="grid grid-cols-2 gap-y-1.5 text-brand-white/40">
                  <span>TYPE</span><span className="text-brand-accent/70">Ionisable LNP</span>
                  <span>IONISABLE LIPID</span><span className="text-brand-accent/70">DLin-MC3-DMA</span>
                  <span>HELPER LIPID</span><span className="text-brand-accent/70">DSPC · Chol</span>
                  <span>PEG-LIPID</span><span className="text-brand-accent/70">DMG-PEG2000 1.5%</span>
                  <span>N/P RATIO</span><span className="text-brand-accent/70">6 : 1</span>
                  <span>STATUS</span>
                  <span className="flex items-center gap-1">
                    <span className="w-1 h-1 rounded-full bg-[#6EFFC8] animate-pulse" />
                    <span className="text-[#6EFFC8]">SIMULATION ACTIVE</span>
                  </span>
                </div>
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
}
