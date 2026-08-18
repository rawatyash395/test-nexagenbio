"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import dynamic from "next/dynamic";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, AnimatePresence } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const DnaModulesHelix = dynamic(() => import("@/components/three/DnaModulesHelix"), {
  ssr: false,
});

gsap.registerPlugin(ScrollTrigger);

/**
 * Integrated Therapeutic Pipeline Modules
 */
interface CapabilityItem {
  id: string;
  number: string;
  tabLabel: string;
  title: string;
  shortDesc: string;
  description: string;
  tags: string[];
  specs: Record<string, string>;
  stat: { value: string; label: string };
  icon: React.ReactNode;
}

const capabilities: CapabilityItem[] = [
  {
    id: "seq-design",
    number: "01",
    tabLabel: "Sequence Design",
    title: "In Silico Sequence Engineering",
    shortDesc: "Target-to-Lead RNA Optimization",
    description: "Deep transformer models predict translation kinetics, secondary hairpin loops, and codon adaptation in milliseconds. We de-risk sequences before wet-lab synthesis.",
    tags: ["CAI Optimization", "Secondary Structure ΔG", "5' & 3' UTR Design", "TLR-7/8 Evasion"],
    specs: { "Inference Latency": "12 ms/strand", "Codon Accuracy": "99.2%", "Design Throughput": "10k/day", "Min ΔG Energy": "-48.2 kcal/mol" },
    stat: { value: "100×", label: "Faster than manual design" },
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M4 6h16M4 12h16M4 18h10" strokeLinecap="round" />
        <circle cx="18" cy="18" r="2.5" fill="#6EFFC8" stroke="none" />
      </svg>
    ),
  },
  {
    id: "protein-eng",
    number: "02",
    tabLabel: "Protein Eng",
    title: "Alpha-Topology Structural Modeling",
    shortDesc: "Sub-Angstrom Epitope Mapping",
    description: "Generative geometric graph networks model conformational stability, target-docking affinity, and immunogenicity profiles for high-yield therapeutic candidates.",
    tags: ["AlphaFold2 Multimer", "0.42Å Active Site RMSD", "Epitope Scaffolding", "Thermal Stability"],
    specs: { "Conformation RMSD": "< 0.42 Å", "Docking Affinity Kd": "1.2 nM", "Epitope Specificity": "98.8%", "Tm Enhancement": "+6.4 °C" },
    stat: { value: "0.42Å", label: "Structural precision" },
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    id: "lnp-formulation",
    number: "03",
    tabLabel: "LNP Delivery",
    title: "Lipid Matrix Formulator",
    shortDesc: "700-Plex Nanoparticle Library",
    description: "Automated microfluidic screening of ionizable lipid formulations with selective tissue tropism and >96% encapsulation efficiency.",
    tags: ["Microfluidic Mixing", "Ionizable Lipids", "Tissue Tropism", "DLS Sizing"],
    specs: { "Encapsulation": "96.8%", "Mean Particle Size": "68.4 nm", "PDI Index": "0.068", "Screening Throughput": "700 pk/hr" },
    stat: { value: "96.8%", label: "Encapsulation rate" },
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="12" r="9" />
        <circle cx="12" cy="12" r="4" fill="#6EFFC8" stroke="none" />
      </svg>
    ),
  },
  {
    id: "validation-assay",
    number: "04",
    tabLabel: "Validation",
    title: "48h Closed-Loop Assays",
    shortDesc: "Robotic Cell-Free Profiling",
    description: "Automated expression assays and mass spectrometry feed ground-truth biological data directly into our machine learning training loop within 48 hours.",
    tags: ["Cell-Free TX-TL", "Optical MS", "Ribosome Profiling", "Continuous Retraining"],
    specs: { "Cycle Velocity": "48 Hours", "Assay Accuracy": "99.1%", "Batch Purity": "99.8%", "Model Weights Sync": "Every Cycle" },
    stat: { value: "48h", label: "Assay turnaround" },
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    id: "analytics-suite",
    number: "05",
    tabLabel: "Analytics",
    title: "Real-Time Telemetry & CQA",
    shortDesc: "Process Analytical Technology",
    description: "Inline HPLC, CE-SDS, and dynamic light scattering analytics monitor critical quality attributes across every batch run with FDA 21 CFR Part 11 compliance.",
    tags: ["Inline HPLC", "CE-SDS Purity", "Endotoxin Testing", "Audit Trails"],
    specs: { "Purity CQA": "> 99.4%", "Endotoxin Level": "< 0.01 EU/mg", "Compliance": "21 CFR Part 11", "Data Latency": "Sub-second" },
    stat: { value: "99.4%", label: "Enzymatic purity" },
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M7 17v-4M12 17V7M17 17v-8" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: "gmp-scale",
    number: "06",
    tabLabel: "GMP Scale",
    title: "GMP-Adjacent Manufacturing",
    shortDesc: "Gram-Scale Enzymatic Synthesis",
    description: "Scalable bioreactors and established tech-transfer protocols compress timelines from lead candidate nomination to IND-enabling studies within 6 months.",
    tags: ["100g Synthesis", "CMO Tech Transfer", "ICH Q7 Ready", "IND Assembly"],
    specs: { "Batch Scale": "100μg to 100g", "Tech Transfer": "4 Weeks", "IND Timeline": "6 Months", "Repeatability": "99.9%" },
    stat: { value: "6 Mo", label: "Nomination to IND" },
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
];

/**
 * Procedural Scramble Decoding Typography
 */
const GLYPHS = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_#@$%&";
function DecodedText({ text, duration = 600, delay = 0 }: { text: string; duration?: number; delay?: number }) {
  const [output, setOutput] = useState(text);

  useEffect(() => {
    let frame = 0;
    const totalFrames = Math.max(8, Math.floor(duration / 30));
    let timeoutId: NodeJS.Timeout;
    let intervalId: NodeJS.Timeout;

    timeoutId = setTimeout(() => {
      intervalId = setInterval(() => {
        frame++;
        const progress = frame / totalFrames;
        const revealedChars = Math.floor(progress * text.length);

        const scrambled = text
          .split("")
          .map((char, i) => {
            if (char === " " || char === "\n" || char === "/" || char === "-" || char === "." || char === ":") return char;
            if (i < revealedChars) return text[i];
            return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
          })
          .join("");

        setOutput(scrambled);

        if (frame >= totalFrames) {
          clearInterval(intervalId);
          setOutput(text);
        }
      }, 30);
    }, delay);

    return () => {
      clearTimeout(timeoutId);
      clearInterval(intervalId);
    };
  }, [text, duration, delay]);

  return <span>{output}</span>;
}

/**
 * Module Specimen Card Display
 */
function ModuleCard({
  cap,
  isLeft,
  showSpecs,
  setShowSpecs,
  onPrev,
  onNext,
  isFirst,
  isLast,
}: {
  cap: CapabilityItem;
  isLeft: boolean;
  showSpecs: boolean;
  setShowSpecs: React.Dispatch<React.SetStateAction<boolean>>;
  onPrev: () => void;
  onNext: () => void;
  isFirst: boolean;
  isLast: boolean;
}) {
  return (
    <div className="relative rounded-2xl border border-[#6EFFC8]/40 bg-[#0A0E0C]/90 p-4 sm:p-6 lg:p-8 backdrop-blur-xl shadow-2xl overflow-hidden transition-all duration-300 w-full max-w-full">
      <div className="absolute top-2 left-2 w-2.5 h-2.5 border-t border-l border-[#6EFFC8]/60 pointer-events-none" />
      <div className="absolute top-2 right-2 w-2.5 h-2.5 border-t border-r border-[#6EFFC8]/60 pointer-events-none" />
      <div className="absolute bottom-2 left-2 w-2.5 h-2.5 border-b border-l border-[#6EFFC8]/60 pointer-events-none" />
      <div className="absolute bottom-2 right-2 w-2.5 h-2.5 border-b border-r border-[#6EFFC8]/60 pointer-events-none" />

      <div className="flex flex-col gap-4 sm:gap-5">
        <div className="flex items-center justify-between border-b border-white/10 pb-2.5 sm:pb-3">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#6EFFC8] animate-pulse shadow-[0_0_8px_#6EFFC8]" />
            <span className="font-mono text-[11px] sm:text-xs text-[#6EFFC8] uppercase tracking-widest font-bold">MODULE {cap.number} / 06</span>
            <span className="font-mono text-[10px] text-[#E6F6ED]/40 uppercase hidden sm:inline">{"// "}{isLeft ? "CARD: LEFT" : "CARD: RIGHT"}</span>
          </div>
          <button onClick={() => setShowSpecs(!showSpecs)} className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded bg-[#6EFFC8]/10 hover:bg-[#6EFFC8]/20 border border-[#6EFFC8]/30 text-[#6EFFC8] font-mono text-[10px] sm:text-[11px] uppercase tracking-wider transition-all cursor-pointer">
            {showSpecs ? "Hide Specs" : "🔬 Lab Specs"}
          </button>
        </div>

        <div className="flex items-start gap-3 sm:gap-4">
          <div className="p-2 sm:p-3 rounded-xl bg-black/60 border border-[#6EFFC8]/30 text-[#6EFFC8] flex-shrink-0 shadow-[0_0_15px_rgba(110,255,200,0.15)]">{cap.icon}</div>
          <div className="min-w-0">
            <span className="font-mono text-[9px] sm:text-[10px] text-[#6EFFC8]/80 uppercase tracking-widest block mb-0.5 sm:mb-1 truncate"><DecodedText text={cap.shortDesc} duration={400} delay={60} /></span>
            <h3 className="text-lg sm:text-2xl lg:text-3xl font-bold text-[#E6F6ED] tracking-tight leading-tight"><DecodedText text={cap.title} duration={580} delay={100} /></h3>
          </div>
        </div>

        <p className="text-xs sm:text-sm lg:text-base text-[#E6F6ED]/85 leading-relaxed"><DecodedText text={cap.description} duration={680} delay={160} /></p>

        {showSpecs ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-black/60 border border-[#6EFFC8]/30 rounded-xl p-3 sm:p-4 font-mono text-[10px] sm:text-xs space-y-1.5 sm:space-y-2">
            <div className="text-[9.5px] sm:text-[10px] uppercase tracking-widest text-[#6EFFC8] font-bold border-b border-[#6EFFC8]/20 pb-1 mb-1.5 sm:mb-2">AUDITED LAB SPECIFICATIONS</div>
            {Object.entries(cap.specs).map(([k, v]) => (
              <div key={k} className="flex justify-between py-0.5 border-b border-white/5 last:border-0">
                <span className="text-[#E6F6ED]/50 uppercase">{k}:</span>
                <span className="text-[#6EFFC8] font-medium">{v}</span>
              </div>
            ))}
          </motion.div>
        ) : (
          <div className="flex flex-wrap gap-1.5 sm:gap-2">
            {cap.tags.map(tag => <span key={tag} className="px-2 sm:px-3 py-0.5 sm:py-1 rounded bg-white/[0.04] border border-white/10 text-[#E6F6ED]/80 text-[9.5px] sm:text-[11px] font-mono">{tag}</span>)}
          </div>
        )}

        <div className="flex items-center justify-between pt-3 sm:pt-4 border-t border-white/10">
          <div className="flex items-baseline gap-1.5 sm:gap-2">
            <span className="font-mono text-xl sm:text-2xl lg:text-3xl font-bold text-[#6EFFC8]"><DecodedText text={cap.stat.value} duration={460} delay={130} /></span>
            <span className="font-mono text-[9.5px] sm:text-[11px] text-[#E6F6ED]/60 uppercase tracking-wider">{cap.stat.label}</span>
          </div>
          <div className="flex items-center gap-1.5 sm:gap-2 font-mono text-xs">
            <button onClick={onPrev} disabled={isFirst} className="px-2 sm:px-2.5 py-1 rounded border border-white/10 hover:border-[#6EFFC8] disabled:opacity-30 text-[#E6F6ED] hover:text-[#6EFFC8] transition-all cursor-pointer disabled:cursor-not-allowed text-[10px] sm:text-[11px]">&lt; PREV</button>
            <button onClick={onNext} disabled={isLast} className="px-2 sm:px-2.5 py-1 rounded border border-white/10 hover:border-[#6EFFC8] disabled:opacity-30 text-[#E6F6ED] hover:text-[#6EFFC8] transition-all cursor-pointer disabled:cursor-not-allowed text-[10px] sm:text-[11px]">NEXT &gt;</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CapabilitiesSection() {
  const prefersReduced = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const scrollProgressRef = useRef<number>(0);
  const [activeIdx, setActiveIdx] = useState(0);
  const [showSpecs, setShowSpecs] = useState(false);
  const committedRef = useRef(0);

  useEffect(() => {
    if (prefersReduced || !sectionRef.current) return;
    const ctx = gsap.context(() => {
      const total = capabilities.length;
      ScrollTrigger.create({
        id: "capabilities-pin",
        trigger: sectionRef.current,
        start: "top top",
        end: "+=3600px",
        pin: true,
        pinSpacing: true,
        scrub: 0.5,
        onUpdate(self) {
          scrollProgressRef.current = self.progress;
          const rawIdx = self.progress * (total - 1);
          const targetIdx = Math.min(total - 1, Math.max(0, Math.round(rawIdx)));
          if (targetIdx !== committedRef.current) {
            committedRef.current = targetIdx;
            setActiveIdx(targetIdx);
          }
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, [prefersReduced]);

  const goTo = useCallback((idx: number) => {
    committedRef.current = idx;
    setActiveIdx(idx);
    const progress = idx / (capabilities.length - 1);
    scrollProgressRef.current = progress;
    const st = ScrollTrigger.getById("capabilities-pin");
    if (st) {
      window.scrollTo({
        top: st.start + progress * (st.end - st.start),
        behavior: "smooth",
      });
    }
  }, []);

  const activeCap = capabilities[activeIdx];
  const isLeft = activeIdx % 2 === 0;

  return (
    <section id="capabilities" ref={sectionRef}
      className="relative w-full min-h-screen bg-brand-black overflow-hidden pt-24 sm:pt-28 lg:pt-32 pb-8 sm:pb-12 lg:pb-16 flex flex-col justify-between"
      aria-label="Platform capabilities and integrated modules"
    >
      <div className="absolute inset-0 bg-brand-black-soft" />
      <div className="absolute inset-0 grid-bg opacity-20 pointer-events-none" />

      {/* 3D Helical Pipeline Visualization */}
      <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
        <DnaModulesHelix scrollProgressRef={scrollProgressRef} />
      </div>

      <div className="relative z-20 max-w-[1440px] w-full mx-auto px-4 sm:px-6 md:px-8 lg:px-12 flex flex-col justify-between flex-1 gap-4 sm:gap-6 lg:gap-8">
        {/* Header and Module Tabs */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-3 sm:gap-6 flex-shrink-0">
          <SectionHeading eyebrow="04 / PROJECT MGMT & INTEGRATED MODULES" title="04 PIPELINE" titleAccent="SIX MODULES" subtitle="Modular biological pipeline spanning sequence design, protein engineering, nano-formulation, validation, analytics, and GMP manufacturing." />
          <div className="flex flex-wrap items-center gap-1 sm:gap-2 max-w-full" role="tablist">
            {capabilities.map((cap, i) => {
              const isActive = i === activeIdx;
              return (
                <button key={cap.id} onClick={() => goTo(i)} role="tab" aria-selected={isActive}
                  data-cursor-hover data-cursor-label={cap.tabLabel}
                  className={`group relative px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg font-mono text-xs transition-all duration-300 flex items-center gap-1.5 sm:gap-2 cursor-pointer ${isActive ? "bg-[#6EFFC8]/15 border border-[#6EFFC8] text-[#6EFFC8] shadow-[0_0_15px_rgba(110,255,200,0.2)]" : "bg-white/[0.03] border border-white/10 text-brand-white-muted hover:border-[#6EFFC8]/40 hover:text-white"}`}
                >
                  <span className={`text-[9px] sm:text-[10px] ${isActive ? "font-bold" : "opacity-60"}`}>{cap.number}</span>
                  <span className="tracking-wider font-medium uppercase text-[9.5px] sm:text-[11px] whitespace-nowrap">{cap.tabLabel}</span>
                  {isActive && <motion.div layoutId="activeCapTab" className="absolute -bottom-1 left-2 right-2 h-[2px] bg-[#6EFFC8] shadow-[0_0_8px_#6EFFC8]" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* Dual-slot card stage with mobile/tablet responsiveness */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-16 items-center flex-1 my-auto min-h-0 w-full [perspective:1200px]">
          {/* Left slot */}
          <div className={`w-full items-center justify-start min-h-0 sm:min-h-[420px] lg:min-h-[460px] ${isLeft ? "flex" : "hidden lg:flex"}`}>
            <AnimatePresence mode="wait">
              {isLeft && (
                <motion.div
                  key={`left-${activeCap.id}`}
                  initial={{ opacity: 0, x: -36, scale: 0.96 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: -28, scale: 0.96 }}
                  transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
                  className="w-full"
                >
                  <ModuleCard
                    cap={activeCap}
                    isLeft={true}
                    showSpecs={showSpecs}
                    setShowSpecs={setShowSpecs}
                    onPrev={() => goTo(Math.max(0, activeIdx - 1))}
                    onNext={() => goTo(Math.min(capabilities.length - 1, activeIdx + 1))}
                    isFirst={activeIdx === 0}
                    isLast={activeIdx === capabilities.length - 1}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Right slot */}
          <div className={`w-full items-center justify-end min-h-0 sm:min-h-[420px] lg:min-h-[460px] ${!isLeft ? "flex" : "hidden lg:flex"}`}>
            <AnimatePresence mode="wait">
              {!isLeft && (
                <motion.div
                  key={`right-${activeCap.id}`}
                  initial={{ opacity: 0, x: 36, scale: 0.96 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: 28, scale: 0.96 }}
                  transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
                  className="w-full"
                >
                  <ModuleCard
                    cap={activeCap}
                    isLeft={false}
                    showSpecs={showSpecs}
                    setShowSpecs={setShowSpecs}
                    onPrev={() => goTo(Math.max(0, activeIdx - 1))}
                    onNext={() => goTo(Math.min(capabilities.length - 1, activeIdx + 1))}
                    isFirst={activeIdx === 0}
                    isLast={activeIdx === capabilities.length - 1}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Footer CTA */}
        <RevealOnScroll delay={0.2} className="flex-shrink-0 mt-2 sm:mt-4">
          <div className="p-4 sm:p-5 lg:p-6 border border-white/10 bg-brand-black-card/85 backdrop-blur-md rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 shadow-2xl">
            <div className="flex flex-col gap-0.5">
              <span className="font-mono text-xs uppercase tracking-widest text-[#6EFFC8] font-semibold">LOOKING FOR MODULAR PIPELINE INTEGRATION?</span>
              <span className="text-xs sm:text-sm text-brand-white-muted">Deploy individual modules into your workflow or engage end-to-end program management.</span>
            </div>
            <a href="#contact" className="px-4 sm:px-5 py-2 sm:py-2.5 border border-[#E6F6ED]/70 hover:border-[#6EFFC8] text-[#E6F6ED] hover:text-[#6EFFC8] hover:bg-[#6EFFC8]/10 transition-all rounded font-mono text-xs tracking-widest uppercase whitespace-nowrap font-medium cursor-pointer w-full sm:w-auto text-center">
              SCHEDULE TECHNICAL SCOPING &gt;
            </a>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
