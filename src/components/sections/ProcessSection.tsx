"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";

interface ProcessStep {
  number: string;
  id: string;
  title: string;
  subtitle: string;
  description: string;
  metric: string;
  cycleTime: string;
  diagnostic: string;
  tags: string[];
  visualType: "discover" | "design" | "build" | "test" | "scale";
}

const steps: ProcessStep[] = [
  {
    number: "01",
    id: "discover",
    title: "Discover",
    subtitle: "Target Identification & Omics Screening",
    description:
      "Deep genomic and proteomic mapping identifying disease-causing epitopes and novel mRNA therapeutic target pockets.",
    metric: "2,400+ Targets Screened",
    cycleTime: "Day 01 - 05",
    diagnostic: "TARGET_AFFINITY: 99.4% | GENOME_MAP: COMPLETE",
    tags: ["Genomics", "Proteomics", "Bioinformatics"],
    visualType: "discover",
  },
  {
    number: "02",
    id: "design",
    title: "Design",
    subtitle: "Generative Sequence Optimization",
    description:
      "Proprietary AI neural algorithms optimize codon bias, secondary hairpin stability, and untranslated mRNA region structures.",
    metric: "100× Faster In Silico Design",
    cycleTime: "Day 06 - 12",
    diagnostic: "CODON_BIAS: OPTIMIZED | mRNA_HALF_LIFE: +320%",
    tags: ["In Silico", "Codon Optimization", "AI Synthesis"],
    visualType: "design",
  },
  {
    number: "03",
    id: "build",
    title: "Build",
    subtitle: "Nanomole LNP Microfluidic Synthesis",
    description:
      "Automated robotic synthesis formulating multi-candidate mRNA into specialized lipid nanoparticle (LNP) delivery vectors.",
    metric: "700-Plex Formulation Library",
    cycleTime: "Day 13 - 22",
    diagnostic: "LNP_ENCAPSULATION: 96.8% | POLYDISPERSITY: <0.08",
    tags: ["Microfluidics", "LNP Formulations", "Synthesis"],
    visualType: "build",
  },
  {
    number: "04",
    id: "test",
    title: "Test",
    subtitle: "High-Throughput Experimental Verification",
    description:
      "Top designs are synthesized at nanomole scale and immediately profiled: cell-free translation efficiency, in vitro stability (T½ > 24h target), and LNP encapsulation. Data loops back within 48 hours.",
    metric: "48h Design-to-Validation Cycle",
    cycleTime: "Day 23 - 35",
    diagnostic: "IN_VITRO_POTENCY: 4.8 nM | TRANSLATION: 85%+",
    tags: ["Immunoassays", "48h Cycle", "Multiplexed"],
    visualType: "test",
  },
  {
    number: "05",
    id: "scale",
    title: "Scale",
    subtitle: "GMP Manufacturing & Clinical Transition",
    description:
      "Seamless bioprocess tech transfer into GMP pilot manufacturing and IND-enabling safety toxicology packages ready for clinical filing.",
    metric: "6 Months to IND Submission",
    cycleTime: "Day 36 - 60",
    diagnostic: "GMP_COMPLIANCE: VERIFIED | PILOT_BATCH: READY",
    tags: ["GMP Ready", "IND Toxicology", "Clinical Pilot"],
    visualType: "scale",
  },
];

/**
 * High-End Biotech Data Platform Terminal Screen (Fully Responsive SVG Consoles)
 */
function StageDataVisual({ type }: { type: ProcessStep["visualType"] }) {
  if (type === "discover") {
    // 01 Discover: Genomic Epitope Affinity Profile
    return (
      <div className="w-full h-full flex flex-col justify-between py-1.5 px-2 sm:px-3">
        <div className="flex justify-between items-center text-[9px] sm:text-[10px] font-mono text-brand-accent/80">
          <span>GENOME_AFFINITY_INDEX</span>
          <span className="text-brand-white font-semibold">N=2,400</span>
        </div>

        {/* Bar Matrix with Threshold Benchmark */}
        <div className="relative h-24 sm:h-28 w-full flex items-end justify-between gap-1.5 sm:gap-2 pt-3 pb-2 border-b border-brand-accent/20">
          {/* Dashed Benchmark Line */}
          <div className="absolute top-5 sm:top-6 left-0 right-0 border-b border-dashed border-brand-accent/50 z-10 flex justify-end">
            <span className="text-[8px] sm:text-[9px] font-mono text-brand-accent bg-[#0E1511] px-1 -mt-2">95% THRESHOLD</span>
          </div>

          {[55, 72, 88, 96, 68, 92, 78, 98].map((val, i) => {
            const isPassing = val >= 88;
            return (
              <div key={i} className="flex-1 flex flex-col items-center h-full justify-end relative z-0">
                {isPassing && (
                  <span className="text-[7px] sm:text-[8px] text-brand-accent mb-0.5 font-bold">✓</span>
                )}
                <motion.div
                  className={`w-full rounded-t-sm transition-all ${isPassing
                    ? "bg-gradient-to-t from-brand-accent/40 via-brand-accent/80 to-brand-accent shadow-[0_0_8px_rgba(110,255,200,0.3)]"
                    : "bg-brand-accent/25"
                    }`}
                  initial={{ height: 0 }}
                  animate={{ height: `${val}%` }}
                  transition={{ duration: 0.6, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
                />
              </div>
            );
          })}
        </div>

        <div className="text-center font-mono text-[8px] sm:text-[9px] text-brand-accent/70 uppercase tracking-widest pt-1">
          EPITOPE BINDING AFFINITY / HIGH-CONTENT SCREEN
        </div>
      </div>
    );
  }

  if (type === "design") {
    // 02 Design: In Silico Codon Optimization & Hairpin Stability
    return (
      <div className="w-full h-full flex flex-col justify-between py-1.5 px-2 sm:px-3">
        <div className="flex justify-between items-center text-[9px] sm:text-[10px] font-mono text-brand-accent/80">
          <span>CODON_FREQUENCY_SPECTRUM</span>
          <span className="text-brand-accent font-bold">-42.8 kcal/mol</span>
        </div>

        {/* Frequency Histogram */}
        <div className="relative h-24 sm:h-28 w-full flex items-end justify-between gap-1 sm:gap-1.5 pt-3 pb-2 border-b border-brand-accent/20">
          <div className="absolute top-6 sm:top-8 left-0 right-0 border-b border-dashed border-brand-accent/40 z-10 flex justify-end">
            <span className="text-[8px] sm:text-[9px] font-mono text-brand-accent bg-[#0E1511] px-1 -mt-2">OPTIMAL CAI &gt; 0.92</span>
          </div>

          {[38, 52, 70, 84, 94, 98, 92, 88, 76, 62].map((val, i) => (
            <div key={i} className="flex-1 flex flex-col items-center h-full justify-end relative">
              <motion.div
                className="w-full rounded-t-sm bg-gradient-to-t from-brand-accent/30 to-brand-accent"
                initial={{ height: 0 }}
                animate={{ height: `${val}%` }}
                transition={{ duration: 0.6, delay: i * 0.04, ease: [0.16, 1, 0.3, 1] }}
              />
            </div>
          ))}
        </div>

        <div className="text-center font-mono text-[8px] sm:text-[9px] text-brand-accent/70 uppercase tracking-widest pt-1">
          SECONDARY STRUCTURE STABILITY SPECTRUM
        </div>
      </div>
    );
  }

  if (type === "build") {
    // 03 Build: Nanomole LNP Microfluidic Formulation Screen
    return (
      <div className="w-full h-full flex flex-col justify-between py-1.5 px-2 sm:px-3">
        <div className="flex justify-between items-center text-[9px] sm:text-[10px] font-mono text-brand-accent/80">
          <span>LNP_SIZE_DISTRIBUTION</span>
          <span className="text-brand-accent font-bold">PDI &lt; 0.08</span>
        </div>

        {/* Monodisperse Particle Distribution Bar Chart */}
        <div className="relative h-24 sm:h-28 w-full flex items-end justify-between gap-1.5 sm:gap-2 pt-3 pb-2 border-b border-brand-accent/20">
          {/* Target Size Window */}
          <div className="absolute top-4 sm:top-5 left-0 right-0 border-b border-dashed border-brand-accent/50 z-10 flex justify-end">
            <span className="text-[8px] sm:text-[9px] font-mono text-brand-accent bg-[#0E1511] px-1 -mt-2">TARGET 68-75nm</span>
          </div>

          {[24, 48, 76, 92, 98, 95, 82, 60, 36].map((val, i) => {
            const isPeak = val >= 90;
            return (
              <div key={i} className="flex-1 flex flex-col items-center h-full justify-end relative">
                {isPeak && <span className="text-[7px] sm:text-[8px] text-brand-accent mb-0.5 font-bold">✓</span>}
                <motion.div
                  className={`w-full rounded-t-sm ${isPeak
                    ? "bg-gradient-to-t from-brand-accent/50 to-brand-accent shadow-[0_0_10px_rgba(110,255,200,0.4)]"
                    : "bg-brand-accent/25"
                    }`}
                  initial={{ height: 0 }}
                  animate={{ height: `${val}%` }}
                  transition={{ duration: 0.6, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
                />
              </div>
            );
          })}
        </div>

        <div className="text-center font-mono text-[8px] sm:text-[9px] text-brand-accent/70 uppercase tracking-widest pt-1">
          700-PLEX LNP FORMULATION ENCAPSULATION
        </div>
      </div>
    );
  }

  if (type === "test") {
    // 04 Test: Translation Efficiency Assay
    return (
      <div className="w-full h-full flex flex-col justify-between py-1.5 px-2 sm:px-3">
        <div className="flex justify-between items-center text-[9px] sm:text-[10px] font-mono text-brand-accent/80">
          <span>IN_VITRO_TRANSLATION</span>
          <span className="text-brand-white font-bold">85%+ POTENCY</span>
        </div>

        {/* Bar Graph with Dashed Benchmark */}
        <div className="relative h-24 sm:h-28 w-full flex items-end justify-between gap-1.5 sm:gap-2 pt-3 pb-2 border-b border-brand-accent/20">
          <div className="absolute top-6 sm:top-8 left-0 right-0 border-b border-dashed border-brand-accent/60 z-10 flex justify-end">
            <span className="text-[8px] sm:text-[9px] font-mono text-brand-accent bg-[#0E1511] px-1 -mt-2">85%</span>
          </div>

          {[36, 74, 88, 92, 65, 91, 54, 96].map((val, i) => {
            const isPassing = val >= 85;
            return (
              <div key={i} className="flex-1 flex flex-col items-center h-full justify-end relative">
                {isPassing && (
                  <span className="text-[7px] sm:text-[8px] text-brand-accent mb-0.5 font-bold">✓</span>
                )}
                <motion.div
                  className={`w-full rounded-t-sm transition-all ${isPassing
                    ? "bg-gradient-to-t from-brand-accent/40 via-brand-accent/80 to-brand-accent shadow-[0_0_8px_rgba(110,255,200,0.3)]"
                    : "bg-brand-accent/25"
                    }`}
                  initial={{ height: 0 }}
                  animate={{ height: `${val}%` }}
                  transition={{ duration: 0.6, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
                />
              </div>
            );
          })}
        </div>

        <div className="text-center font-mono text-[8px] sm:text-[9px] text-brand-accent/70 uppercase tracking-widest pt-1">
          TRANSLATION EFFICIENCY / 48H SCREEN
        </div>
      </div>
    );
  }

  // 05 Scale: GMP Pilot Yield & Batch Progression
  return (
    <div className="w-full h-full flex flex-col justify-between py-1.5 px-2 sm:px-3">
      <div className="flex justify-between items-center text-[9px] sm:text-[10px] font-mono text-brand-accent/80">
        <span>GMP_PILOT_YIELD</span>
        <span className="text-brand-white font-bold">1.2 kg / BATCH</span>
      </div>

      {/* Progressive Step-Up Scale Curve */}
      <div className="relative h-24 sm:h-28 w-full flex items-end justify-between gap-1.5 sm:gap-2 pt-3 pb-2 border-b border-brand-accent/20">
        <div className="absolute top-5 sm:top-6 left-0 right-0 border-b border-dashed border-brand-accent/50 z-10 flex justify-end">
          <span className="text-[8px] sm:text-[9px] font-mono text-brand-accent bg-[#0E1511] px-1 -mt-2">IND VALIDATED</span>
        </div>

        {[28, 46, 62, 78, 92, 98].map((val, i) => (
          <div key={i} className="flex-1 flex flex-col items-center h-full justify-end relative">
            <motion.div
              className="w-full rounded-t-sm bg-gradient-to-t from-brand-accent/30 via-brand-accent/70 to-brand-accent"
              initial={{ height: 0 }}
              animate={{ height: `${val}%` }}
              transition={{ duration: 0.6, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
            />
          </div>
        ))}
      </div>

      <div className="text-center font-mono text-[8px] sm:text-[9px] text-brand-accent/70 uppercase tracking-widest pt-1">
        PILOT SCALE-UP ACCUMULATION / IND TOXICOLOGY
      </div>
    </div>
  );
}

/**
 * Process Section: 5-Stage Accelerated Drug Discovery Cycle
 */
export default function ProcessSection() {
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);

  const activeStep = steps[activeStepIndex];

  // Auto-cycling timer that pauses on manual interaction
  useEffect(() => {
    if (!isAutoPlaying) return;
    autoPlayRef.current = setInterval(() => {
      setActiveStepIndex((prev) => (prev + 1) % steps.length);
    }, 5000);

    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };
  }, [isAutoPlaying]);

  const handleStepClick = (index: number) => {
    setActiveStepIndex(index);
    setIsAutoPlaying(false);
  };

  return (
    <section
      id="process"
      className="relative pt-24 sm:pt-28 lg:pt-32 pb-16 sm:pb-20 lg:pb-28 overflow-hidden bg-brand-black"
      aria-label="Process workflow"
    >
      {/* Background styling */}
      <div className="absolute inset-0 bg-brand-black" />
      <div className="absolute inset-0 grid-bg opacity-25" />

      {/* Ambient glow spotlight behind the active stage */}
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[480px] rounded-full pointer-events-none opacity-20 blur-[110px]"
        style={{
          background: "radial-gradient(ellipse at center, #6EFFC8 0%, rgba(77,201,155,0.2) 50%, transparent 80%)",
        }}
      />

      <div className="relative z-10 max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
        {/* Section Header */}
        <RevealOnScroll>
          <div className="flex flex-col items-center text-center mb-8 sm:mb-10 lg:mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-brand-accent/20 bg-brand-accent/5 backdrop-blur-sm mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-accent animate-pulse-slow" />
              <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-widest text-brand-accent font-medium">
                03 / TRAINING & PROCESS WORKFLOW
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-brand-white leading-tight">
              03 TRAINING - <span className="text-gradient-accent">CONCEPT TO CLINIC</span>
            </h2>
            <p className="text-xs sm:text-sm lg:text-base text-brand-white-muted mt-2.5 max-w-2xl">
              Our automated biological engine compresses the multi-year drug development lifecycle into a high-precision, 60-day closed-loop workflow.
            </p>
          </div>
        </RevealOnScroll>

        {/* Interactive Pipeline Track (Responsive Grid) */}
        <div className="relative mb-6 sm:mb-8">
          {/* Connecting Electrical Waveguide Line (Desktop) */}
          <div className="hidden lg:block absolute top-[28px] left-[5%] right-[5%] h-0.5 bg-brand-black-border z-0">
            <motion.div
              className="h-full bg-gradient-to-r from-brand-accent via-brand-accent-glow to-brand-accent shadow-[0_0_12px_#6EFFC8]"
              initial={{ width: "0%" }}
              animate={{ width: `${(activeStepIndex / (steps.length - 1)) * 100}%` }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            />
          </div>

          {/* 5 Pipeline Stage Node Buttons */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 sm:gap-3 lg:gap-4 relative z-10">
            {steps.map((step, idx) => {
              const isActive = activeStepIndex === idx;
              const isPassed = activeStepIndex > idx;
              const isLastOdd = idx === 4;

              return (
                <button
                  key={step.id}
                  onClick={() => handleStepClick(idx)}
                  className={`relative p-3 sm:p-3.5 rounded-xl text-left border transition-all duration-300 focus:outline-none group flex flex-col justify-between min-h-[86px] sm:min-h-[96px] cursor-pointer ${isLastOdd ? "col-span-2 sm:col-span-1" : ""
                    } ${isActive
                      ? "bg-brand-black-card border-brand-accent shadow-[0_0_24px_rgba(110,255,200,0.15)] sm:-translate-y-1"
                      : isPassed
                        ? "bg-brand-black-card/60 border-brand-accent/30 hover:border-brand-accent/60"
                        : "bg-brand-black-card/40 border-brand-black-border hover:border-brand-white/20"
                    }`}
                >
                  {/* Top Row: Number & Status Badge */}
                  <div className="flex items-center justify-between w-full mb-1 sm:mb-2">
                    <span
                      className={`font-mono text-[10px] sm:text-xs font-bold px-1.5 sm:px-2 py-0.5 rounded transition-colors ${isActive
                        ? "bg-brand-accent text-brand-black"
                        : isPassed
                          ? "bg-brand-accent/20 text-brand-accent"
                          : "bg-white/5 text-brand-white-muted"
                        }`}
                    >
                      {step.number}
                    </span>

                    {isActive && (
                      <span className="flex h-2 w-2 relative">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-accent opacity-75" />
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-accent" />
                      </span>
                    )}
                  </div>

                  {/* Stage Title */}
                  <div>
                    <h3
                      className={`text-xs sm:text-sm font-semibold tracking-tight transition-colors ${isActive ? "text-brand-white font-bold" : "text-brand-white-muted group-hover:text-brand-white"
                        }`}
                    >
                      {step.title}
                    </h3>
                    <p className="font-mono text-[9px] sm:text-[10px] text-brand-accent/70 mt-0.5 truncate">
                      {step.metric}
                    </p>
                  </div>

                  {/* Bottom Active Glow Bar */}
                  {isActive && (
                    <motion.div
                      layoutId="activeTabGlow"
                      className="absolute -bottom-px left-3 right-3 h-[2px] bg-brand-accent shadow-[0_0_8px_#6EFFC8]"
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Active Stage Diagnostic Showcase Panel */}
        <div className="w-full rounded-2xl border border-brand-accent/30 bg-[#0A0E0C]/95 backdrop-blur-xl overflow-hidden shadow-2xl p-4 sm:p-6 lg:p-8">
          <div className="grid lg:grid-cols-12 gap-6 lg:gap-8 items-center w-full">
            {/* Left Column: Stage Details (7 Cols) */}
            <div className="lg:col-span-7 flex flex-col gap-3 sm:gap-4">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeStep.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className="flex flex-col gap-3 sm:gap-4"
                >
                  {/* Stage Header Info */}
                  <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                    <span className="font-mono text-[10px] sm:text-xs px-2 sm:px-2.5 py-0.5 sm:py-1 rounded bg-brand-accent/15 border border-brand-accent/40 text-brand-accent font-semibold">
                      STAGE {activeStep.number} OF 05
                    </span>
                    <span className="font-mono text-[10px] sm:text-xs text-brand-white-muted">
                      TIMELINE: {activeStep.cycleTime}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-brand-white tracking-tight leading-snug">
                      {activeStep.title} -{" "}
                      <span className="text-brand-accent font-semibold">{activeStep.subtitle}</span>
                    </h3>
                    <p className="text-xs sm:text-sm text-brand-white/80 leading-relaxed mt-2">
                      {activeStep.description}
                    </p>
                  </div>

                  {/* Key Tags & Capabilities */}
                  <div className="flex flex-wrap gap-1.5 sm:gap-2 pt-1">
                    {activeStep.tags.map((tag) => (
                      <span
                        key={tag}
                        className="font-mono text-[10px] sm:text-[11px] px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-md bg-white/[0.05] border border-brand-accent/20 text-brand-accent"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>

                  {/* Live Diagnostic Telemetry Status */}
                  <div className="mt-1 sm:mt-2 p-2.5 sm:p-3 rounded-lg bg-black/60 border border-brand-accent/25 font-mono text-[11px] sm:text-xs flex items-center justify-between text-brand-accent">
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="w-2 h-2 rounded-full bg-brand-accent animate-pulse-slow shadow-[0_0_6px_#6EFFC8] flex-shrink-0" />
                      <span className="truncate whitespace-normal">{activeStep.diagnostic}</span>
                    </div>
                    <span className="text-[10px] text-brand-white-muted/60 hidden sm:inline flex-shrink-0 ml-2">LIVE TELEMETRY</span>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Right Column: Data Visualisation Console Window */}
            <div className="lg:col-span-5 flex items-center justify-center w-full">
              <div className="w-full rounded-xl border border-brand-accent/30 bg-[#0E1511] shadow-2xl flex flex-col overflow-hidden relative group">
                {/* Console Window Header Bar */}
                <div className="w-full px-3.5 sm:px-4 py-2 sm:py-2.5 border-b border-brand-accent/20 bg-brand-black/90 flex flex-wrap gap-2 items-center justify-between font-mono text-[9px] sm:text-[10px] text-brand-accent">
                  <span className="tracking-wider truncate font-semibold">DATA VISUALISATION / NEXAGEN-PLATFORM</span>
                  <div className="flex items-center gap-1.5 flex-shrink-0 ml-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-accent/40" />
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-accent/60" />
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-accent animate-pulse-slow" />
                  </div>
                </div>

                {/* Console Window Dynamic Chart Area */}
                <div className="w-full h-[190px] sm:h-[220px] p-2 flex items-center justify-center relative overflow-hidden bg-black/40">
                  <div className="absolute inset-0 grid-bg opacity-15 pointer-events-none" />

                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeStep.id}
                      initial={{ opacity: 0, scale: 0.96 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.96 }}
                      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                      className="w-full h-full"
                    >
                      <StageDataVisual type={activeStep.visualType} />
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Console Window Bottom Status Bar */}
                <div className="w-full px-3.5 sm:px-4 py-1.5 sm:py-2 border-t border-brand-accent/15 bg-brand-black/70 flex items-center justify-center">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-brand-accent/30 border border-brand-accent flex items-center justify-center">
                      <span className="w-1 h-1 rounded-full bg-brand-accent animate-ping" />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom cycle time footer indicator */}
        <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-[10px] sm:text-xs font-mono text-brand-white-muted/60 border-t border-brand-black-border pt-4">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-accent flex-shrink-0" />
            <span>TOTAL ACCELERATED CYCLE: 60 DAYS (VS. INDUSTRY 3-5 YEARS)</span>
          </div>
          <button
            onClick={() => setIsAutoPlaying(!isAutoPlaying)}
            className="hover:text-brand-accent transition-colors flex items-center gap-1.5 cursor-pointer self-end sm:self-auto"
          >
            <span>{isAutoPlaying ? "PAUSE AUTO-CYCLE ⏸" : "RESUME AUTO-CYCLE ▶"}</span>
          </button>
        </div>

        {/* Action Callout Banner */}
        <div className="mt-6 sm:mt-8 p-4 sm:p-6 md:p-8 border border-white/10 bg-brand-black-card/85 backdrop-blur-md rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-6 shadow-2xl">
          <div className="flex flex-col gap-1">
            <span className="font-mono text-[11px] sm:text-xs uppercase tracking-widest text-[#6EFFC8] font-semibold">
              READY TO TRAIN OR ADAPT YOUR DISCOVERY PIPELINE?
            </span>
            <span className="text-xs sm:text-sm text-brand-white-muted">
              Integrate with our automated synthesis and assay loops for accelerated wet-lab turnarounds.
            </span>
          </div>
          <a
            href="#contact"
            className="px-5 sm:px-6 py-2.5 sm:py-3 border border-[#E6F6ED]/70 hover:border-[#6EFFC8] text-[#E6F6ED] hover:text-[#6EFFC8] hover:bg-[#6EFFC8]/10 transition-all rounded font-mono text-[11px] sm:text-xs tracking-widest uppercase whitespace-nowrap font-medium cursor-pointer self-stretch sm:self-auto text-center"
          >
            GET IN TOUCH &gt;
          </a>
        </div>
      </div>
    </section>
  );
}
