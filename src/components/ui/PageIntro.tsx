"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const loadingSteps = [
  { progress: 15, label: "INITIALIZING NOVA BIO-COMPILER...", phase: "INIT // 01" },
  { progress: 40, label: "SYNTHESIZING mRNA 5'→3' STRANDS...", phase: "DECODE // 02" },
  { progress: 70, label: "CALCULATING 3D DOCKING TOPOLOGY...", phase: "STRUCT // 03" },
  { progress: 90, label: "ALIGNING BIO-REACTOR TELEMETRY...", phase: "CALIB // 04" },
  { progress: 100, label: "MOLECULAR ENGINE READY // GRANTED", phase: "ONLINE // 05" },
];

export default function PageIntro() {
  const [isVisible, setIsVisible] = useState(true);
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState(loadingSteps[0].label);
  const [phaseText, setPhaseText] = useState(loadingSteps[0].phase);

  useEffect(() => {
    let animId: number;
    const startTime = performance.now();
    const duration = 1400; // 1.4s total load duration

    // Absolute hard safety timeout: under NO scenario can the screen ever get stuck
    const safetyTimer = setTimeout(() => {
      setIsVisible(false);
    }, 2400);

    const update = (now: number) => {
      const elapsed = Math.max(0, now - startTime);
      const ratio = Math.min(1, elapsed / duration);
      // Non-linear power curve for realistic computational surge
      const currentPct = Math.min(100, Math.floor(Math.pow(ratio, 0.9) * 100));

      setProgress(currentPct);

      // Update telemetry step label
      for (let i = loadingSteps.length - 1; i >= 0; i--) {
        if (currentPct >= loadingSteps[i].progress) {
          setStatusText(loadingSteps[i].label);
          setPhaseText(loadingSteps[i].phase);
          break;
        }
      }

      if (ratio < 1) {
        animId = requestAnimationFrame(update);
      } else {
        setProgress(100);
        setStatusText(loadingSteps[loadingSteps.length - 1].label);
        setPhaseText(loadingSteps[loadingSteps.length - 1].phase);
        setTimeout(() => {
          setIsVisible(false);
        }, 380);
      }
    };

    animId = requestAnimationFrame(update);

    return () => {
      cancelAnimationFrame(animId);
      clearTimeout(safetyTimer);
    };
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-[99999] bg-[#060a08] flex flex-col justify-between p-6 sm:p-10 select-none overflow-hidden cursor-default"
          initial={{ opacity: 1 }}
          exit={{
            y: "-100%",
            transition: { duration: 0.75, ease: [0.76, 0, 0.24, 1] },
          }}
        >
          {/* Background grid & ambient bio glow */}
          <div className="absolute inset-0 grid-bg opacity-25 pointer-events-none" />
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none opacity-20 blur-[130px]"
            style={{
              background: "radial-gradient(ellipse at center, #6EFFC8 0%, rgba(10,104,68,0.3) 50%, transparent 75%)",
            }}
          />

          {/* Top Bar: Telemetry & Strand info */}
          <div className="relative z-10 flex items-center justify-between text-[10px] sm:text-xs font-mono text-brand-white-muted/60 tracking-widest border-b border-white/10 pb-4">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-brand-accent animate-pulse shadow-[0_0_8px_#6EFFC8]" />
              <span className="text-brand-accent font-semibold">NEXAGEN PLATFORM</span>
            </div>
            <div className="hidden sm:flex items-center gap-4 text-brand-white-muted/50">
              <span>LATENCY: 12ms</span>
              <span>•</span>
              <span>5&apos;-AUG-CGU-GAC-UAA-3&apos;</span>
            </div>
            <div className="text-brand-accent font-mono">
              {phaseText}
            </div>
          </div>

          {/* Center: Glowing Glyph, Brandmark & Dynamic Digital Counter */}
          <div className="relative z-10 flex flex-col items-center justify-center gap-6 my-auto">
            {/* Animated Logo Glyph with pulsing orbital rings */}
            <div className="relative w-24 h-24 flex items-center justify-center">
              {/* Outer rotating dashed ring */}
              <motion.div
                className="absolute inset-0 rounded-full border border-dashed border-brand-accent/30"
                animate={{ rotate: 360 }}
                transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
              />
              {/* Inner glowing pulse ring */}
              <motion.div
                className="absolute inset-2 rounded-full border border-brand-accent/20"
                animate={{ scale: [1, 1.08, 1], opacity: [0.3, 0.7, 0.3] }}
                transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
              />

              <svg viewBox="0 0 64 64" fill="none" className="w-14 h-14 relative z-10">
                <motion.path
                  d="M32 10 L54 48 L10 48 Z"
                  stroke="#6EFFC8"
                  strokeWidth="1.8"
                  fill="none"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                />
                <motion.path
                  d="M32 20 L45 42 L19 42 Z"
                  stroke="#6EFFC8"
                  strokeWidth="1"
                  strokeOpacity="0.4"
                  fill="none"
                />
                <motion.circle
                  cx="32"
                  cy="32"
                  r="4"
                  fill="#6EFFC8"
                  className="shadow-[0_0_12px_#6EFFC8]"
                  animate={{ scale: [1, 1.25, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
              </svg>
            </div>

            {/* Brand Title */}
            <div className="flex flex-col items-center gap-1">
              <div className="flex items-baseline gap-1.5">
                <span className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white font-sans">
                  NEXAGEN
                </span>
                <span className="text-2xl sm:text-3xl font-light text-brand-accent tracking-widest font-sans">
                  BIO
                </span>
              </div>
              <span className="font-mono text-[10px] tracking-[0.28em] text-brand-white-muted/60 uppercase">
                COMPUTATIONAL SYNTHETIC BIOLOGY
              </span>
            </div>

            {/* High-Tech Digital Percentage Counter 00% -> 100% */}
            <div className="flex flex-col items-center gap-2 mt-2">
              <div className="flex items-baseline gap-1 font-mono text-3xl sm:text-4xl font-bold text-brand-accent tracking-tighter tabular-nums">
                <span>{String(progress).padStart(2, "0")}</span>
                <span className="text-lg sm:text-xl font-normal opacity-80">%</span>
              </div>

              {/* Dynamic Status Log Line */}
              <motion.div
                key={statusText}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                className="font-mono text-[11px] sm:text-xs text-brand-white/80 tracking-widest uppercase text-center max-w-sm px-2"
              >
                {statusText}
              </motion.div>
            </div>

            {/* Segmented Loading Progress Bar */}
            <div className="w-64 sm:w-80 flex flex-col gap-1.5">
              <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden p-0.5 border border-white/10">
                <motion.div
                  className="h-full bg-gradient-to-r from-brand-accent/60 via-brand-accent to-[#A7F3D0] rounded-full shadow-[0_0_12px_#6EFFC8]"
                  style={{ width: `${progress}%` }}
                  transition={{ ease: "easeOut", duration: 0.05 }}
                />
              </div>
              <div className="flex justify-between font-mono text-[9px] text-brand-white-muted/40 tracking-wider">
                <span>000</span>
                <span>DATA STREAM ACTIVE</span>
                <span>100</span>
              </div>
            </div>
          </div>

          {/* Bottom Bar: DNA Codon Sequence Stream */}
          <div className="relative z-10 flex items-center justify-between text-[9px] sm:text-[11px] font-mono text-brand-white-muted/40 border-t border-white/10 pt-4">
            <div className="truncate pr-4">
              CODONS: <span className="text-brand-accent/70">AUG·GCU·CAA·CGG·AAG·CCG·UUC·GUA·CAC·GUG·UGA·ACC</span>
            </div>
            <div className="flex-shrink-0 text-right">
              21 CFR PART 11 COMPLIANT
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
