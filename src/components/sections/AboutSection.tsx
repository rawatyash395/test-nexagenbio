"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useAnimationFrame } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";

/**
 * Bio-Compiler Simulation Data Models
 */
interface PlatformMode {
  id: string;
  code: string;
  shortLabel: string;
  name: string;
  tagline: string;
  status: string;
  speed: string;
  description: string;
  telemetry: { label: string; value: string; unit: string }[];
}

const platformModes: PlatformMode[] = [
  {
    id: "compiler",
    code: "SYN-01",
    shortLabel: "SYNTHESIS",
    name: "NOVA Bio-Compiler",
    tagline: "Neural Attention Sequence Synthesis",
    status: "TRANSLATING",
    speed: "1,240 nt/s",
    description:
      "Generative transformer architecture optimizing codon bias, secondary RNA stability, and translation velocity in real time.",
    telemetry: [
      { label: "Codon Adaptation", value: "0.96", unit: "CAI" },
      { label: "Secondary Fold ΔG", value: "−48.2", unit: "kcal" },
      { label: "Transit Velocity", value: "1,240", unit: "nt/s" },
      { label: "Off-Target Risk", value: "< 0.02", unit: "%" },
    ],
  },
  {
    id: "structural",
    code: "STR-02",
    shortLabel: "TOPOLOGY",
    name: "Alpha-Topology Engine",
    tagline: "3D Protein Structural Modeling",
    status: "COMPUTING",
    speed: "2.4M iter/s",
    description:
      "Deep geometric graph neural networks predicting 3D epitope binding conformations and stereospecific active site docking geometries.",
    telemetry: [
      { label: "Active Site RMSD", value: "0.42", unit: "Å" },
      { label: "Binding Specificity", value: "98.8", unit: "%" },
      { label: "Epitope Coverage", value: "94.6", unit: "%" },
      { label: "Docking Affinity", value: "1.2", unit: "nM" },
    ],
  },
  {
    id: "lnp",
    code: "LNP-03",
    shortLabel: "LIPID MATRIX",
    name: "Lipid Matrix Formulator",
    tagline: "Nanoparticle Tropism & Packaging",
    status: "SCREENING",
    speed: "700 pk/hr",
    description:
      "High-throughput screening of 700-plex ionizable lipid formulations with automated dynamic light scattering profiling.",
    telemetry: [
      { label: "Encapsulation", value: "96.5", unit: "%" },
      { label: "Mean Diameter", value: "68.4", unit: "nm" },
      { label: "Polydispersity", value: "0.068", unit: "PDI" },
      { label: "Tissue Tropism", value: "92.1", unit: "%" },
    ],
  },
  {
    id: "closedloop",
    code: "ASY-04",
    shortLabel: "FEEDBACK",
    name: "48h Feedback Assays",
    tagline: "Closed-Loop Robotic Profiling",
    status: "ACTIVE FEED",
    speed: "48h / cycle",
    description:
      "Automated cell-free protein expression systems coupled with optical mass spectrometry, feeding empirical data directly back into NOVA weights.",
    telemetry: [
      { label: "Turnaround", value: "48", unit: "hrs" },
      { label: "Assay Accuracy", value: "99.1", unit: "%" },
      { label: "Batch Purity", value: "99.8", unit: "%" },
      { label: "Model Epochs", value: "14", unit: "cyc" },
    ],
  },
];

const nucleotideBases = ["AUG", "GCU", "CAA", "CGG", "AAG", "CCG", "UUC", "GUA", "CAC", "GUG", "UGA", "ACC"];

/**
 * Canvas 1: NOVA Bio-Compiler Visual Display
 */
function CompilerCanvas() {
  return (
    <div className="w-full h-full flex flex-col justify-between relative overflow-hidden p-3 sm:p-4 select-none min-w-0 max-w-full">
      <div className="absolute inset-0 opacity-20 flex justify-between pointer-events-none">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="w-px h-full bg-[#CCE5D8]" />
        ))}
      </div>

      <div className="relative z-10 flex items-center justify-between text-[9px] sm:text-[10px] font-mono border-b border-[#DEEFE6] pb-1.5 sm:pb-2">
        <div className="flex items-center gap-1.5 text-[#0A6844] font-bold truncate">
          <span className="w-2 h-2 rounded-full bg-[#10B981] animate-ping flex-shrink-0" />
          <span className="truncate">NEURAL TRANSFORMER SYNTHESIS</span>
        </div>
        <span className="text-[#446554] font-mono flex-shrink-0 ml-2 font-medium">5′ → 3′ STRAND</span>
      </div>

      <div className="relative z-10 my-auto flex flex-col gap-2 sm:gap-2.5 w-full min-w-0 overflow-hidden">
        <div className="w-full min-w-0 overflow-hidden py-0.5">
          <motion.div
            className="flex gap-1.5 sm:gap-2 flex-nowrap"
            animate={{ x: [0, -260] }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          >
            {[...nucleotideBases, ...nucleotideBases].map((base, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.1, y: -2 }}
                className={`px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-lg border font-mono text-[10px] sm:text-[11px] flex flex-col items-center flex-shrink-0 cursor-pointer transition-all shadow-sm ${
                  i % 3 === 0
                    ? "bg-[#0A6844] border-[#0A6844] text-white shadow-md font-bold"
                    : "bg-white border-[#CCE5D8] text-[#081C13] hover:border-[#0A6844]/50"
                }`}
              >
                <span>{base}</span>
                <span
                  className={`text-[6.5px] sm:text-[7px] font-medium ${
                    i % 3 === 0 ? "text-emerald-200" : "text-[#446554]"
                  }`}
                >
                  +{((i * 7) % 30) + 10}nt
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>

        <div className="relative w-full h-9 sm:h-11 rounded-lg border border-[#CCE5D8] bg-white/90 shadow-inner flex items-center px-2 sm:px-3 overflow-hidden min-w-0">
          <motion.div
            className="absolute top-0 bottom-0 w-1 bg-[#10B981] shadow-[0_0_10px_#10B981]"
            animate={{ left: ["0%", "100%", "0%"] }}
            transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
          />

          <svg viewBox="0 0 400 36" className="w-full h-full opacity-80" fill="none" preserveAspectRatio="none">
            <motion.path
              d="M0 18 Q50 4 100 18 T200 18 T300 18 T400 18"
              stroke="#10B981"
              strokeWidth="2"
              animate={{
                d: [
                  "M0 18 Q50 4 100 18 T200 18 T300 18 T400 18",
                  "M0 18 Q50 32 100 18 T200 18 T300 18 T400 18",
                  "M0 18 Q50 4 100 18 T200 18 T300 18 T400 18",
                ],
              }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />
          </svg>
        </div>

        <div className="w-full min-w-0 overflow-hidden py-0.5">
          <motion.div
            className="flex gap-1.5 sm:gap-2 flex-nowrap"
            animate={{ x: [-260, 0] }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          >
            {[...nucleotideBases].reverse().concat([...nucleotideBases].reverse()).map((base, i) => (
              <div
                key={i}
                className="px-1.5 sm:px-2 py-0.5 rounded-md bg-white border border-[#CCE5D8] font-mono text-[9px] sm:text-[10px] text-[#223E30] shadow-xs flex items-center gap-1.5 flex-shrink-0"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]" />
                <span className="font-semibold">{base}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      <div className="relative z-10 flex items-center justify-between text-[8.5px] sm:text-[10px] font-mono pt-1.5 sm:pt-2 border-t border-[#DEEFE6] text-[#446554]">
        <span>GC: 68.4%</span>
        <span className="text-[#0A6844] font-bold">ΔG: −48.2 kcal/mol</span>
        <span>CAI: 0.96</span>
      </div>
    </div>
  );
}

/**
 * Canvas 2: Alpha-Topology Structural Engine
 */
function StructuralCanvas() {
  const nodes = [
    { x: 30, y: 35, label: "ARG-142", act: true },
    { x: 80, y: 25, label: "TYR-88", act: false },
    { x: 130, y: 45, label: "PHE-204", act: true },
    { x: 180, y: 30, label: "CYS-55", act: false },
    { x: 230, y: 40, label: "LEU-112", act: true },
    { x: 55, y: 75, label: "GLU-31", act: false },
    { x: 105, y: 65, label: "HIS-92", act: true },
    { x: 155, y: 80, label: "TRP-18", act: false },
    { x: 205, y: 68, label: "VAL-74", act: true },
  ];

  return (
    <div className="w-full h-full flex flex-col justify-between p-3 sm:p-4 font-mono select-none">
      <div className="flex items-center justify-between text-[9px] sm:text-[10px] border-b border-[#DEEFE6] pb-1.5 sm:pb-2">
        <span className="text-[#0A6844] font-bold">ALPHA-TOPOLOGY 3D CONFORMATION DOCKING</span>
        <span className="text-[#446554] font-medium">RMSD &lt; 0.42Å</span>
      </div>

      <div className="my-auto relative h-[100px] sm:h-[110px] w-full">
        <svg viewBox="0 0 260 100" className="w-full h-full" fill="none">
          {/* Connecting bonds */}
          <path d="M30 35 L80 25 L130 45 L180 30 L230 40" stroke="#CCE5D8" strokeWidth="1.5" strokeDasharray="3 3" />
          <path d="M55 75 L105 65 L155 80 L205 68" stroke="#CCE5D8" strokeWidth="1.5" strokeDasharray="3 3" />
          <path d="M30 35 L55 75 M80 25 L105 65 M130 45 L155 80 M180 30 L205 68" stroke="#10B981" strokeWidth="1.2" opacity="0.6" />

          {/* Active site halo */}
          <circle cx="105" cy="65" r="18" fill="rgba(16,185,129,0.12)" stroke="#10B981" strokeWidth="1" strokeDasharray="2 2" />

          {/* Nodes */}
          {nodes.map((n, i) => (
            <g key={i}>
              <circle
                cx={n.x}
                cy={n.y}
                r={n.act ? 5.5 : 4}
                fill={n.act ? "#0A6844" : "#FFFFFF"}
                stroke={n.act ? "#10B981" : "#CCE5D8"}
                strokeWidth="1.8"
              />
              <text x={n.x} y={n.y + 11} fill="#446554" fontSize="5.5" textAnchor="middle" fontWeight="bold">
                {n.label}
              </text>
            </g>
          ))}
        </svg>
      </div>

      <div className="flex items-center justify-between text-[8.5px] sm:text-[10px] pt-1.5 sm:pt-2 border-t border-[#DEEFE6] text-[#446554]">
        <span>ACTIVE SITES: 5 DETECTED</span>
        <span className="text-[#0A6844] font-bold">AFFINITY: 1.2 nM</span>
        <span>SPECIFICITY: 98.8%</span>
      </div>
    </div>
  );
}

/**
 * Canvas 3: Lipid Matrix Formulator
 */
function LnpCanvas() {
  return (
    <div className="w-full h-full flex flex-col justify-between p-3 sm:p-4 font-mono select-none">
      <div className="flex items-center justify-between text-[9px] sm:text-[10px] border-b border-[#DEEFE6] pb-1.5 sm:pb-2">
        <span className="text-[#0A6844] font-bold">IONIZABLE LIPID NANOPARTICLE SCREENING (700-PLEX)</span>
        <span className="text-[#446554] font-medium">MEAN: 68.4nm</span>
      </div>

      <div className="my-auto grid grid-cols-6 gap-1 sm:gap-1.5 py-1">
        {Array.from({ length: 18 }).map((_, i) => {
          const isTopHit = i === 4 || i === 11 || i === 15;
          return (
            <motion.div
              key={i}
              whileHover={{ scale: 1.08 }}
              className={`p-1 sm:p-1.5 rounded-md border flex flex-col items-center justify-center transition-all ${
                isTopHit
                  ? "bg-[#0A6844] border-[#0A6844] text-white shadow-sm"
                  : "bg-white border-[#CCE5D8] text-[#081C13]"
              }`}
            >
              <span className="text-[7px] sm:text-[8px] opacity-70">LNP-{i + 10}</span>
              <span className={`text-[8.5px] sm:text-[10px] font-bold ${isTopHit ? "text-emerald-200" : "text-[#0A6844]"}`}>
                {90 + ((i * 7) % 9)}%
              </span>
            </motion.div>
          );
        })}
      </div>

      <div className="flex items-center justify-between text-[8.5px] sm:text-[10px] pt-1.5 sm:pt-2 border-t border-[#DEEFE6] text-[#446554]">
        <span>ENCAPSULATION: 96.5%</span>
        <span className="text-[#0A6844] font-bold">PDI: 0.068</span>
        <span>TROPISM: LIVER/SPLEEN</span>
      </div>
    </div>
  );
}

/**
 * Canvas 4: Closed-Loop Assays
 */
function ClosedLoopCanvas() {
  return (
    <div className="w-full h-full flex flex-col justify-between p-3 sm:p-4 font-mono select-none">
      <div className="flex items-center justify-between text-[9px] sm:text-[10px] border-b border-[#DEEFE6] pb-1.5 sm:pb-2">
        <span className="text-[#0A6844] font-bold">48H AUTOMATED CYCLE // ROBOTIC FEEDBACK</span>
        <span className="text-[#446554] font-medium">BATCH PURITY: 99.8%</span>
      </div>

      <div className="my-auto flex items-center justify-between gap-1 sm:gap-2 px-1">
        {[
          { label: "WET-LAB ASSAY", sub: "Expression Readout", dur: "12h" },
          { label: "OPTICAL MS", sub: "Fragment Purity", dur: "8h" },
          { label: "WEIGHT UPDATES", sub: "Continuous LoRA", dur: "4h" },
          { label: "NEXT CAMPAIGN", sub: "Auto-Compiled", dur: "24h" },
        ].map((step, i) => (
          <div key={i} className="flex-1 bg-white border border-[#CCE5D8] rounded-lg p-1.5 sm:p-2 flex flex-col gap-0.5 shadow-xs">
            <span className="text-[7.5px] sm:text-[9px] text-[#0A6844] font-bold truncate">{step.label}</span>
            <span className="text-[7px] sm:text-[8px] text-[#446554] truncate">{step.sub}</span>
            <span className="text-[8px] sm:text-[9.5px] text-[#081C13] font-bold mt-0.5">{step.dur}</span>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between text-[8.5px] sm:text-[10px] pt-1.5 sm:pt-2 border-t border-[#DEEFE6] text-[#446554]">
        <span>CYCLE VELOCITY: 48 HOURS</span>
        <span className="text-[#0A6844] font-bold">EPOCHS: 14 CYCLES</span>
        <span>ACCURACY: 99.1%</span>
      </div>
    </div>
  );
}

/**
 * Main Console Wrapper for Bio-Compiler
 */
function BioCompilerConsole() {
  const [activeModeIdx, setActiveModeIdx] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setActiveModeIdx((prev) => (prev + 1) % platformModes.length);
    }, 4200);
    return () => clearInterval(timer);
  }, [isPaused]);

  const currentMode = platformModes[activeModeIdx];

  return (
    <div
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className="w-full rounded-2xl border border-[#CCE5D8] bg-white shadow-xl overflow-hidden flex flex-col justify-between transition-all"
    >
      {/* Console Header */}
      <div className="bg-[#EBF5F0] border-b border-[#CCE5D8] px-3 sm:px-4 py-2.5 sm:py-3 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#10B981] animate-pulse" />
          <span className="font-mono text-[10px] sm:text-xs text-[#081C13] font-bold tracking-wider uppercase">
            NOVA ARCHITECTURE ENGINE
          </span>
        </div>

        <div className="flex flex-wrap gap-1 sm:gap-1.5">
          {platformModes.map((mode, idx) => {
            const isActive = activeModeIdx === idx;
            return (
              <button
                key={mode.id}
                onClick={() => {
                  setActiveModeIdx(idx);
                }}
                className={`relative px-2 sm:px-3 py-1 rounded-lg font-mono text-[9px] sm:text-[10px] transition-all overflow-hidden cursor-pointer ${
                  isActive
                    ? "bg-[#0A6844] border border-[#0A6844] text-white font-bold shadow-md"
                    : "bg-white border border-[#CCE5D8] text-[#446554] hover:text-[#081C13] hover:bg-[#F3FAF6] font-medium"
                }`}
              >
                <span className="relative z-10">{mode.code}</span>

                {isActive && !isPaused && (
                  <motion.div
                    key={`progress-${idx}-${activeModeIdx}`}
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 4.2, ease: "linear" }}
                    className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#6EFFC8] origin-left z-20"
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Screen Canvas */}
      <div className="relative w-full h-[200px] sm:h-[220px] bg-gradient-to-b from-[#F7FCF9] to-[#EAF5EF] overflow-hidden flex flex-col justify-between">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentMode.id}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            transition={{ duration: 0.25 }}
            className="w-full h-full"
          >
            {activeModeIdx === 0 && <CompilerCanvas />}
            {activeModeIdx === 1 && <StructuralCanvas />}
            {activeModeIdx === 2 && <LnpCanvas />}
            {activeModeIdx === 3 && <ClosedLoopCanvas />}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Telemetry Footer */}
      <div className="border-t border-[#DEEFE6] bg-gradient-to-r from-[#F3FAF6] to-[#E8F4EE] p-3 sm:p-4 flex flex-col gap-2.5">
        <div className="flex flex-wrap items-center justify-between gap-1.5">
          <span className="font-mono text-xs text-[#081C13] font-bold">
            [{currentMode.code}] {currentMode.name}
          </span>
          <span className="font-mono text-[9px] text-[#0A6844] bg-[#0A6844]/10 px-2 sm:px-2.5 py-0.5 rounded-full border border-[#0A6844]/25 font-bold">
            {currentMode.status} ({currentMode.speed})
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {currentMode.telemetry.map((stat) => (
            <div key={stat.label} className="bg-white border border-[#CCE5D8] rounded-lg p-2 sm:p-2.5 flex flex-col gap-0.5 shadow-xs">
              <span className="font-mono text-[8px] sm:text-[8.5px] text-[#446554] uppercase truncate font-medium">{stat.label}</span>
              <div className="flex items-baseline gap-1">
                <span className="font-mono text-xs sm:text-sm text-[#081C13] font-bold">{stat.value}</span>
                <span className="font-mono text-[8px] sm:text-[8.5px] text-[#0A6844] font-semibold">{stat.unit}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/**
 * Platform Core Scientific Pillars
 */
const pillars = [
  { number: "01", code: "VESM-01", title: "Computational Precision", badge: "98% Accuracy", description: "Our proprietary ML models predict protein-mRNA interactions with 98% accuracy before a single wet-lab experiment is run - reducing trial cycles by an order of magnitude.", stats: "2,400+ Targets / Campaign", detail: "Using deep transformer architectures trained on 40M+ sequences, NOVA identifies codon usage biases and secondary structure conflicts in milliseconds, reducing wet-lab failures by 94%." },
  { number: "02", code: "NOVA-02", title: "Synthetic Biology Engine", badge: "100× Throughput", description: "Automated codon optimization, secondary structure analysis, and LNP formulation screening - compressed into a single integrated workflow our team runs in parallel at scale.", stats: "48h Synthesized Batches", detail: "Our robotic synthesis platform runs 700+ LNP formulation variants per campaign, using microfluidic NanoAssemblr technology with inline dynamic light scattering feedback." },
  { number: "03", code: "GMP-03", title: "Clinical-Grade Rigor", badge: "≥95% IND-Rate", description: "Every candidate is stress-tested against off-target binding libraries, immunogenicity panels, and pharmacokinetic models before advancing to clinical validation.", stats: "<6 Mo Target IND Filing", detail: "Candidates pass a 48-point validation checklist including immunostimulation index, kinetic release profiling, and EC50 potency benchmarking before IND submission." },
  { number: "04", code: "DATA-04", title: "Closed-Loop Learning", badge: "48h Cycle", description: "Every experimental data point re-enters the ML training loop within 48 hours, continuously improving NOVA predictions with real-world wet-lab validation results.", stats: "40M+ Training Sequences", detail: "Built on Kubeflow + MLflow with full model lineage, confidence intervals, and auditable parameter trails. Inference latency: 12ms per sequence at production scale." },
  { number: "05", code: "STRUC-05", title: "Structure-Guided Design", badge: "0.42Å RMSD", description: "AlphaFold2 + ESM-2 hybrid pipeline predicts 3D protein conformations with sub-angstrom accuracy, enabling rational binding-site optimization before any synthesis step.", stats: "500+ Structures / Month", detail: "Proprietary geometric graph neural networks model epitope binding conformations and stereospecific active site docking geometries with 98.8% binding specificity." },
  { number: "06", code: "GMP-06", title: "GMP Manufacturing", badge: "6mo to IND", description: "GMP-adjacent enzymatic synthesis scaling from 100μg to 100g with inline PAT monitoring and seamless CMO tech-transfer packages.", stats: "Endotoxin: <0.01 EU/mg", detail: "Enzymatic bioreactor suite with CE-SDS purity >97.8% and ICH Q7-ready documentation. Full IND package assembly within 6 months of candidate selection." },
];

const MARQUEE_ITEMS = [...pillars, ...pillars, ...pillars];

function PillarMarquee() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [paused, setPaused] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);
  const xRef = useRef(0);

  useAnimationFrame((_, delta) => {
    if (paused || !trackRef.current) return;
    const speed = 0.04;
    xRef.current -= delta * speed;
    const totalWidth = trackRef.current.scrollWidth / 3;
    if (Math.abs(xRef.current) >= totalWidth) {
      xRef.current = 0;
    }
    trackRef.current.style.transform = `translateX(${xRef.current}px)`;
  });

  return (
    <div
      className="relative w-full overflow-hidden py-4"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => {
        setPaused(false);
        setHoveredId(null);
      }}
    >
      <div
        ref={trackRef}
        className="flex gap-4 sm:gap-6 will-change-transform"
        style={{ width: "max-content" }}
      >
        {MARQUEE_ITEMS.map((pillar, index) => {
          const itemKey = `${pillar.code}-${index}`;
          const isHov = hoveredId === itemKey;

          return (
            <motion.div
              key={itemKey}
              onMouseEnter={() => setHoveredId(itemKey)}
              onMouseLeave={() => setHoveredId(null)}
              animate={{
                width: isHov ? 320 : 260,
                height: isHov ? 340 : 180,
                borderColor: isHov ? "rgba(10,104,68,0.5)" : "rgba(204,229,216,0.8)",
                boxShadow: isHov ? "0 12px 36px rgba(10,104,68,0.12), 0 2px 8px rgba(0,0,0,0.04)" : "0 2px 8px rgba(10,104,68,0.03)",
              }}
              transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
              className="flex-shrink-0 rounded-xl border bg-white overflow-hidden relative shadow-sm"
            >
              <div className="absolute top-2 left-2 w-2 h-2 border-t border-l border-[#0A6844]/30 pointer-events-none" />
              <div className="absolute top-2 right-2 w-2 h-2 border-t border-r border-[#0A6844]/30 pointer-events-none" />
              <div className="absolute bottom-2 left-2 w-2 h-2 border-b border-l border-[#0A6844]/30 pointer-events-none" />
              <div className="absolute bottom-2 right-2 w-2 h-2 border-b border-r border-[#0A6844]/30 pointer-events-none" />

              <motion.div
                animate={{ opacity: isHov ? 1 : 0 }}
                className="absolute inset-0 pointer-events-none"
                style={{ background: "radial-gradient(ellipse at 30% 20%, rgba(10,104,68,0.05), transparent 70%)" }}
              />

              <div className="p-4 sm:p-5 h-full flex flex-col gap-2 sm:gap-2.5">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] text-[#0A6844] font-bold tracking-widest">{pillar.code}</span>
                  <span className="font-mono text-[9px] sm:text-[10px] px-2 py-0.5 rounded bg-[#EAF5EF] border border-[#CCE5D8] text-[#0A6844] font-semibold">{pillar.badge}</span>
                </div>

                <h3 className="text-sm sm:text-base font-bold text-[#081C13] leading-tight">{pillar.title}</h3>
                <p className="text-xs text-[#446554] leading-relaxed line-clamp-2">{pillar.description}</p>

                <AnimatePresence>
                  {isHov && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 6 }}
                      transition={{ duration: 0.24 }}
                      className="flex flex-col gap-2 flex-1"
                    >
                      <p className="text-[11px] text-[#446554] leading-relaxed border-t border-[#DEEFE6] pt-2">{pillar.detail}</p>
                      <div className="mt-auto pt-2 border-t border-[#DEEFE6] flex items-center justify-between">
                        <span className="font-mono text-[10px] text-[#446554]">{pillar.stats}</span>
                        <span className="font-mono text-sm text-[#0A6844] font-bold">→</span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {!hoveredId && (
                  <div className="mt-auto pt-2 border-t border-[#DEEFE6] flex items-center justify-between">
                    <span className="font-mono text-[10px] text-[#446554]">{pillar.stats}</span>
                    <span className="font-mono text-xs text-[#0A6844]">→</span>
                  </div>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
      <div className="flex items-center gap-2 mt-4 px-1">
        <span className="font-mono text-[10px] sm:text-[11px] text-[#0A6844] uppercase tracking-widest font-bold">
          SWIPE OR HOVER TO EXPLORE PILLARS
        </span>
      </div>
    </div>
  );
}

/**
 * About Section: Computational Biology & Molecular Synthesis
 */
export default function AboutSection() {
  return (
    <section
      id="about"
      className="relative pt-36 pb-36 sm:pt-48 sm:pb-48 md:pt-64 md:pb-64 lg:pt-[360px] lg:pb-[360px] overflow-hidden section-light"
      aria-label="About NexaGen Bio"
    >
      {/* Light sage mist background layers */}
      <div className="absolute inset-0 bg-brand-mist" />
      <div className="absolute inset-0 grid-bg-light opacity-50 pointer-events-none" />

      {/* Top & Bottom Ultra-Smooth Gradient Blends */}
      <div className="blend-fade-top-dark" aria-hidden="true" />
      <div className="blend-fade-bottom-dark" aria-hidden="true" />

      {/* Subtle bio-jade ambient spot */}
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[600px] rounded-full pointer-events-none opacity-25 blur-[150px]"
        style={{ background: "radial-gradient(ellipse at center, #0A6844 0%, rgba(10,104,68,0.12) 50%, transparent 75%)" }}
      />

      <div className="relative z-10 max-w-[1380px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
        {/* Top: Mission + Compact Bio-Compiler Console */}
        <div className="grid lg:grid-cols-[1.05fr_minmax(0,1fr)] gap-8 lg:gap-14 items-center mb-12 sm:mb-16 lg:mb-20">
          {/* Left: Heading + mission */}
          <div className="flex flex-col gap-5 sm:gap-6">
            <SectionHeading
              eyebrow="01 / AUDIT & COMPUTATIONAL BIOLOGY"
              title="01 AUDIT"
              titleAccent="TO REVEAL, CORRECT & ACCELERATE"
              tone="light"
            />
            <RevealOnScroll delay={0.2}>
              <p className="text-sm sm:text-base lg:text-body-lg text-[#223E30] leading-relaxed">
                Founded on the conviction that the true bottleneck in therapeutics is computational speed, NexaGen Bio integrates AI-guided protein design, automated synthesis, and high-throughput validation into a single continuous engine.
              </p>
            </RevealOnScroll>
            <RevealOnScroll delay={0.3}>
              <p className="text-sm sm:text-base lg:text-body-lg text-[#223E30] leading-relaxed">
                Our target: compress the journey from computational sequence design to IND-enabling studies from 36 months to under 9, providing partners with predictive clarity and risk reduction at every phase.
              </p>
            </RevealOnScroll>

            {/* Org badge */}
            <RevealOnScroll delay={0.4}>
              <div className="flex flex-wrap items-center gap-3 sm:gap-4 pt-2">
                <div className="flex -space-x-2.5 sm:-space-x-3">
                  {["DR", "ML", "SB", "+40"].map((text, i) => (
                    <div
                      key={i}
                      className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-[#CCE5D8] bg-white flex items-center justify-center font-mono text-[10px] sm:text-xs text-[#0A6844] font-bold shadow-sm"
                    >
                      {text}
                    </div>
                  ))}
                </div>
                <div className="text-xs sm:text-body-sm text-[#446554]">
                  <span className="text-[#081C13] font-semibold">44 scientists</span> across structural biology, ML, and clinical development.
                </div>
              </div>
            </RevealOnScroll>
          </div>

          {/* Right: Bio-Compiler Console */}
          <RevealOnScroll delay={0.15} direction="left" className="w-full min-w-0">
            <BioCompilerConsole />
          </RevealOnScroll>
        </div>

        {/* Bottom: Infinite Horizontal Pillar Marquee */}
        <div>
          <div className="mb-4 sm:mb-6 flex items-center gap-2.5 sm:gap-3">
            <span className="w-1.5 h-4 sm:h-5 rounded-full bg-[#0A6844]" />
            <span className="font-mono text-[11px] sm:text-xs uppercase tracking-widest text-[#0A6844] font-bold">PLATFORM PILLARS - SCROLL TO EXPLORE</span>
          </div>
          <PillarMarquee />
        </div>

        {/* Action Callout Banner */}
        <RevealOnScroll delay={0.35}>
          <div className="mt-10 sm:mt-14 p-4 sm:p-6 md:p-8 border border-[#CCE5D8] bg-white/95 backdrop-blur-md shadow-xl rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-6">
            <div className="flex flex-col gap-1">
              <span className="font-mono text-xs uppercase tracking-widest text-[#0A6844] font-bold">
                IN NEED FOR A COMPUTATIONAL SEQUENCE AUDIT?
              </span>
              <span className="text-xs sm:text-body-sm text-[#446554]">
                Audit your RNA/protein candidates with our in-silico variant scoring and structure models.
              </span>
            </div>
            <a
              href="#contact"
              className="px-5 sm:px-6 py-2.5 sm:py-3 border border-[#0A6844] text-[#0A6844] hover:bg-[#0A6844] hover:text-white transition-all rounded font-mono text-xs tracking-widest uppercase whitespace-nowrap font-semibold cursor-pointer shadow-sm w-full sm:w-auto text-center"
            >
              GET IN TOUCH &gt;
            </a>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
