"use client";

import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, AnimatePresence } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { useReducedMotion } from "@/hooks/useReducedMotion";

gsap.registerPlugin(ScrollTrigger);

/**
 * Computational Pipeline Stages & Laboratory Benchmarks
 */
const steps = [
  {
    phase: "01 - DISCOVER",
    title: "Target Identification & Structural Modeling",
    description:
      "Our integrated genomics pipeline ingests patient-derived RNA-seq and proteomics data to identify therapeutic targets. AlphaFold2-powered structural prediction maps every candidate binding site before synthesis begins - ruling out off-target risk computationally.",
    tags: ["RNA-seq Ingestion", "AlphaFold2 Multimer", "VESM Model", "Off-Target Null"],
    benchmarks: [
      { label: "GENOME COVERAGE", value: "99.8%" },
      { label: "ALPHAFOLD2 RMSD", value: "< 1.2 Å" },
      { label: "OFF-TARGET FILTER", value: "< 0.001%" },
      { label: "VESM CONFIDENCE", value: "0.984" },
    ],
    metric: { value: "2,400+", label: "Targets screened per campaign" },
    detail:
      "Proprietary variant-effect scoring model (VESM) ranks candidates by predicted therapeutic index.",
  },
  {
    phase: "02 - ENGINEER",
    title: "Sequence Design & Codon Optimization",
    description:
      "mRNA sequences are designed by our NOVA engine - a transformer-based architecture trained on 40M annotated therapeutic sequences. NOVA simultaneously optimizes codon usage, secondary structure, and immunostimulatory motifs - generating validated designs 100× faster than manual methods.",
    tags: ["NOVA Transformer", "CAI Optimization", "Secondary Structure", "TLR Evasion"],
    benchmarks: [
      { label: "CODON ADAPTATION", value: "0.96 CAI" },
      { label: "FREE ENERGY ΔG", value: "-42.3 kcal/mol" },
      { label: "TRANSLATION GAIN", value: "+340%" },
      { label: "TLR-7/8 EVASION", value: "99.6%" },
    ],
    metric: { value: "100×", label: "Faster than manual design" },
    detail:
      "NOVA outputs are cross-validated against ribosome profiling data from our in-house translation efficiency assay.",
  },
  {
    phase: "03 - VALIDATE",
    title: "High-Throughput Experimental Verification",
    description:
      "Top designs are synthesized at nanomole scale and immediately profiled: cell-free translation efficiency, in vitro stability (T½ >24h target), and LNP encapsulation. Data loops back to NOVA within 48 hours, continuously improving the model.",
    tags: ["Cell-Free TX-TL", "700-Plex LNP", "In Vitro T½", "Microfluidics"],
    benchmarks: [
      { label: "LNP ENCAPSULATION", value: "96.8%" },
      { label: "IN VITRO T½", value: "> 28.4 hrs" },
      { label: "CELL-FREE YIELD", value: "2.4 mg/mL" },
      { label: "CYCLE VELOCITY", value: "48 Hours" },
    ],
    metric: { value: "48h", label: "Design-to-validation cycle" },
    detail:
      "700-plex LNP formulation screening library enables parallel optimization of delivery and payload.",
  },
  {
    phase: "04 - SCALE",
    title: "IND-Enabling Studies & Manufacturing",
    description:
      "Candidates that pass validation enter our GMP-adjacent manufacturing suite. Scalable enzymatic synthesis and inline analytics ensure batch consistency. Our process development team compresses tech transfer timelines - targeting IND filing within 6 months of lead selection.",
    tags: ["GMP-Adjacent", "Inline HPLC/PAT", "Tech Transfer", "FDA 21 CFR 11"],
    benchmarks: [
      { label: "ENZYMATIC PURITY", value: "> 99.4%" },
      { label: "INLINE PAT CQA", value: "100% Verified" },
      { label: "IND TIMELINE", value: "6 Months" },
      { label: "BATCH REPEATABILITY", value: "99.9%" },
    ],
    metric: { value: "6 mo", label: "Lead selection to IND filing" },
    detail:
      "Integrated QbD framework with real-time process analytical technology (PAT) for critical quality attributes.",
  },
];

/**
 * Interactive Biotech Visual Telemetry Consoles
 */

function DiscoverVisual() {
  const cols = 12;
  const rows = 6;
  const [selectedCell, setSelectedCell] = useState<{ r: number; c: number }>({ r: 2, c: 4 });
  const [hoveredCell, setHoveredCell] = useState<{ r: number; c: number } | null>(null);

  const active = hoveredCell || selectedCell;
  const residueNames = [
    "ASP-142", "GLU-88", "LEU-204", "LYS-92", "VAL-116", "PHE-73",
    "TYR-109", "ILE-55", "TRP-180", "HIS-64", "MET-31", "SER-155"
  ];
  const currentResidue = residueNames[(active.r * 2 + active.c) % residueNames.length];
  const affinity = (0.22 + ((active.r * 7 + active.c * 13) % 11) * 0.06).toFixed(2);
  const rmsd = (0.64 + ((active.r * 3 + active.c * 5) % 7) * 0.07).toFixed(2);
  const plddt = (91.4 + ((active.r * 5 + active.c * 9) % 8) * 0.9).toFixed(1);

  // Active cell bounds for precision reticle
  const cellX = 6 + active.c * 22.5;
  const cellY = 6 + active.r * 22.5;
  const cellW = 20;
  const cellH = 20;

  return (
    <div className="w-full h-full flex flex-col justify-between p-3.5 sm:p-5 select-none">
      {/* Top Header */}
      <div className="flex items-center justify-between font-mono text-[9px] sm:text-[10px] text-brand-accent/80 pb-1.5 sm:pb-2 border-b border-brand-accent/20">
        <div className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#6EFFC8] animate-pulse" />
          <span>ALPHAFOLD2 // LOCUS α-{active.r}{active.c} ({currentResidue})</span>
        </div>
        <span className="text-[#6EFFC8] font-semibold text-[8px] sm:text-[9px]">● SCAN ACTIVE</span>
      </div>

      {/* Interactive Grid Map */}
      <div className="my-auto py-1 sm:py-2">
        <svg viewBox="0 0 280 150" fill="none" className="w-full h-auto max-h-[180px] sm:max-h-[220px]" aria-label="Interactive structural target heatmap">
          {Array.from({ length: rows }).map((_, r) =>
            Array.from({ length: cols }).map((_, c) => {
              const v = ((r * 7 + c * 13) % 10) / 10;
              const isSelected = selectedCell.r === r && selectedCell.c === c;
              const isHovered = hoveredCell?.r === r && hoveredCell?.c === c;
              const isAdjacent =
                Math.abs(active.r - r) <= 1 && Math.abs(active.c - c) <= 1;

              return (
                <rect
                  key={`${r}-${c}`}
                  x={6 + c * 22.5}
                  y={6 + r * 22.5}
                  width={20}
                  height={20}
                  rx={3}
                  onClick={() => setSelectedCell({ r, c })}
                  onMouseEnter={() => setHoveredCell({ r, c })}
                  onMouseLeave={() => setHoveredCell(null)}
                  className="cursor-pointer transition-all duration-150"
                  fill={
                    isSelected || isHovered
                      ? "#6EFFC8"
                      : isAdjacent
                      ? `rgba(110,255,200,${0.28 + v * 0.2})`
                      : `rgba(110,255,200,${0.06 + v * 0.22})`
                  }
                  stroke={isSelected || isHovered ? "#ffffff" : isAdjacent ? "#6EFFC8" : "rgba(110,255,200,0.4)"}
                  strokeWidth={isSelected || isHovered ? "1.5" : isAdjacent ? "0.8" : "0.3"}
                />
              );
            })
          )}

          {/* Precision Laser Reticle Corner Brackets around Active Cell */}
          <path d={`M${cellX - 3} ${cellY - 3} L${cellX + 5} ${cellY - 3} M${cellX - 3} ${cellY - 3} L${cellX - 3} ${cellY + 5}`} stroke="#6EFFC8" strokeWidth="1.8" />
          <path d={`M${cellX + cellW + 3} ${cellY - 3} L${cellX + cellW - 5} ${cellY - 3} M${cellX + cellW + 3} ${cellY - 3} L${cellX + cellW + 3} ${cellY + 5}`} stroke="#6EFFC8" strokeWidth="1.8" />
          <path d={`M${cellX - 3} ${cellY + cellH + 3} L${cellX + 5} ${cellY + cellH + 3} M${cellX - 3} ${cellY + cellH + 3} L${cellX - 3} ${cellY + cellH - 5}`} stroke="#6EFFC8" strokeWidth="1.8" />
          <path d={`M${cellX + cellW + 3} ${cellY + cellH + 3} L${cellX + cellW - 5} ${cellY + cellH + 3} M${cellX + cellW + 3} ${cellY + cellH + 3} L${cellX + cellW + 3} ${cellY + cellH - 5}`} stroke="#6EFFC8" strokeWidth="1.8" />
        </svg>
      </div>

      {/* Dynamic Telemetry Readout */}
      <div className="pt-1.5 sm:pt-2 border-t border-brand-accent/15 flex flex-col gap-1 sm:gap-1.5 font-mono text-[8.5px] sm:text-[9px]">
        <div className="flex justify-between text-brand-white/80">
          <span>BINDING Kd: <strong className="text-[#6EFFC8]">{affinity} nM</strong></span>
          <span>RMSD: <strong className="text-[#6EFFC8]">{rmsd} Å</strong></span>
          <span>pLDDT: <strong className="text-[#6EFFC8]">{plddt}%</strong></span>
        </div>
        <div className="h-1.5 w-full bg-white/5 rounded overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-brand-accent/40 via-brand-accent to-[#A7F3D0] transition-all duration-300"
            style={{ width: `${plddt}%` }}
          />
        </div>
      </div>
    </div>
  );
}

function EngineerVisual() {
  const codonOptions = [
    ["AUG", "GUG", "CUG"],
    ["GCU", "GCC", "GCA", "GCG"],
    ["AUG", "AUC", "AUU"],
    ["CAA", "CAG"],
    ["CGG", "CGC", "CGA", "CGU"],
    ["CUU", "CUC", "CUA", "CUG"],
    ["AAG", "AAA"],
    ["CCG", "CCU", "CCC", "CCA"],
  ];

  const aminoLabels = ["Met", "Ala", "Ile", "Gln", "Arg", "Leu", "Lys", "Pro"];

  const [indices, setIndices] = useState<number[]>([0, 1, 0, 1, 0, 1, 0, 2]);
  const [isOptimizing, setIsOptimizing] = useState(false);

  // Compute GC and metrics
  const activeCodons = indices.map((idx, i) => codonOptions[i][idx % codonOptions[i].length]);
  const allLetters = activeCodons.join("");
  const gcCount = (allLetters.match(/[GC]/g) || []).length;
  const gcRatio = gcCount / allLetters.length;

  const stabilityEnergy = (-34.0 - gcRatio * 18.5).toFixed(1);
  const caiScore = (0.86 + gcRatio * 0.16).toFixed(2);
  const translationGain = "+" + Math.round(240 + gcRatio * 180) + "%";

  // Mutate single codon
  const handleMutateCodon = (slotIndex: number) => {
    setIndices((prev) => {
      const next = [...prev];
      next[slotIndex] = (next[slotIndex] + 1) % codonOptions[slotIndex].length;
      return next;
    });
  };

  // Auto-optimize sequence cascade
  const handleAutoOptimize = () => {
    if (isOptimizing) return;
    setIsOptimizing(true);
    let step = 0;
    const timer = setInterval(() => {
      if (step < codonOptions.length) {
        setIndices((prev) => {
          const next = [...prev];
          next[step] = (next[step] + 1) % codonOptions[step].length;
          return next;
        });
        step++;
      } else {
        clearInterval(timer);
        setIsOptimizing(false);
      }
    }, 120);
  };

  // Calculate dynamic waveform control points
  const yOffset1 = 90 - gcRatio * 20;
  const yOffset2 = 125 + gcRatio * 15;
  const yOffset3 = 85 - gcRatio * 15;
  const pathD = `M6 95 C 40 ${yOffset1}, 80 ${yOffset2}, 120 95 S 180 ${yOffset3}, 220 95 S 260 135, 274 95`;
  const pathD2 = `M6 115 C 40 ${yOffset1 + 20}, 80 ${yOffset2 + 15}, 120 115 S 180 ${yOffset3 + 20}, 220 115 S 260 145, 274 115`;

  return (
    <div className="w-full h-full flex flex-col justify-between p-3.5 sm:p-5 select-none">
      {/* Header with Quick Action */}
      <div className="flex items-center justify-between font-mono text-[9px] sm:text-[10px] text-brand-accent/80 pb-1.5 sm:pb-2 border-b border-brand-accent/20">
        <div className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#6EFFC8] animate-pulse" />
          <span>NOVA CODON ENGINE // ORF SIMULATOR</span>
        </div>
        <button
          type="button"
          onClick={handleAutoOptimize}
          disabled={isOptimizing}
          className="px-2 py-0.5 rounded bg-[#6EFFC8]/20 hover:bg-[#6EFFC8]/30 text-[#6EFFC8] border border-[#6EFFC8]/40 font-mono text-[8px] sm:text-[9px] uppercase font-bold cursor-pointer transition-colors active:scale-95 disabled:opacity-50"
        >
          {isOptimizing ? "FOLDING..." : "AUTO-OPTIMIZE ⚡"}
        </button>
      </div>

      {/* Interactive Codon Array */}
      <div className="my-auto py-1">
        <svg viewBox="0 0 280 160" fill="none" className="w-full h-auto max-h-[180px] sm:max-h-[220px]" aria-label="Codon optimization interactive workbench">
          <text x="6" y="16" fill="#6EFFC8" fontSize="7.5" opacity="0.9" fontFamily="monospace">
            5′- {activeCodons.join(" · ")} -3′
          </text>
          <text x="6" y="28" fill="#6EFFC8" fontSize="7" opacity="0.4" fontFamily="monospace">
            AMINO : {aminoLabels.join(" · ")}
          </text>

          {/* Clickable Codon Buttons */}
          {activeCodons.map((codon, i) => (
            <g
              key={i}
              onClick={() => handleMutateCodon(i)}
              className="cursor-pointer group"
            >
              <rect
                x={6 + i * 33.5}
                y={36}
                width={31}
                height={22}
                rx={4}
                fill={indices[i] > 0 ? "rgba(110,255,200,0.38)" : "rgba(110,255,200,0.12)"}
                stroke="#6EFFC8"
                strokeWidth={indices[i] > 0 ? "1.2" : "0.5"}
                className="transition-all duration-150 group-hover:fill-[#6EFFC8]/50"
              />
              <text
                x={6 + i * 33.5 + 5}
                y={50}
                fill="#6EFFC8"
                fontSize="8"
                fontWeight="bold"
                fontFamily="monospace"
                className="pointer-events-none group-hover:fill-white"
              >
                {codon}
              </text>
              <text
                x={6 + i * 33.5 + 8}
                y={56}
                fill="#6EFFC8"
                fontSize="5"
                opacity="0.6"
                fontFamily="monospace"
                className="pointer-events-none"
              >
                {aminoLabels[i]}
              </text>
            </g>
          ))}

          {/* Dynamic Secondary Structure Trace */}
          <path
            d={pathD}
            stroke="#6EFFC8"
            strokeWidth="2"
            fill="none"
            opacity="0.9"
            className="transition-all duration-300"
          />
          <path
            d={pathD2}
            stroke="#6EFFC8"
            strokeWidth="1"
            strokeDasharray="2 2"
            fill="none"
            opacity="0.4"
            className="transition-all duration-300"
          />

          <text x="6" y="145" fill="#6EFFC8" fontSize="7.5" opacity="0.85" fontFamily="monospace">
            SECONDARY STABILITY: {stabilityEnergy} kcal/mol (LIVE FOLD)
          </text>
        </svg>
      </div>

      {/* Real-Time Benchmark Metrics */}
      <div className="pt-1.5 sm:pt-2 border-t border-brand-accent/15 flex justify-between font-mono text-[8.5px] sm:text-[9px] text-brand-white/80">
        <span>CAI SCORE: <strong className="text-[#6EFFC8]">{caiScore}</strong></span>
        <span>TLR EVASION: <strong className="text-[#6EFFC8]">99.6%</strong></span>
        <span>TRANSLATION GAIN: <strong className="text-[#6EFFC8]">{translationGain}</strong></span>
      </div>
    </div>
  );
}

function ValidateVisual() {
  const formulations = [
    {
      id: "LNP-700",
      name: "Hepato-Extra",
      bars: [
        { label: "WT mRNA", val: 32, col: "#4A6E5E" },
        { label: "Manual Pipeline", val: 54, col: "#6EAF90" },
        { label: "NOVA Model", val: 88, col: "#4DC99B" },
        { label: "NexaGen Optimized", val: 98, col: "#6EFFC8" },
      ],
      tHalf: ">28.4h",
      encap: "98.2%",
      yield: "2.4 mg/mL",
    },
    {
      id: "PulmoShield",
      name: "Pulmonary LNP",
      bars: [
        { label: "WT mRNA", val: 28, col: "#4A6E5E" },
        { label: "Manual Pipeline", val: 48, col: "#6EAF90" },
        { label: "NOVA Model", val: 82, col: "#4DC99B" },
        { label: "NexaGen Optimized", val: 96, col: "#6EFFC8" },
      ],
      tHalf: ">31.2h",
      encap: "97.4%",
      yield: "2.1 mg/mL",
    },
    {
      id: "Dendritic",
      name: "Immuno-Target",
      bars: [
        { label: "WT mRNA", val: 35, col: "#4A6E5E" },
        { label: "Manual Pipeline", val: 58, col: "#6EAF90" },
        { label: "NOVA Model", val: 89, col: "#4DC99B" },
        { label: "NexaGen Optimized", val: 99, col: "#6EFFC8" },
      ],
      tHalf: ">26.8h",
      encap: "98.8%",
      yield: "2.7 mg/mL",
    },
  ];

  const [activeFormIndex, setActiveFormIndex] = useState(0);
  const current = formulations[activeFormIndex];

  return (
    <div className="w-full h-full flex flex-col justify-between p-3.5 sm:p-5 select-none">
      {/* Header with Formulation Switcher */}
      <div className="flex items-center justify-between font-mono text-[9px] sm:text-[10px] text-brand-accent/80 pb-1.5 sm:pb-2 border-b border-brand-accent/20">
        <div className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#6EFFC8] animate-pulse" />
          <span>LNP PROFILING // CELL-FREE ASSAY</span>
        </div>
        <div className="flex items-center gap-1">
          {formulations.map((f, idx) => (
            <button
              key={f.id}
              type="button"
              onClick={() => setActiveFormIndex(idx)}
              className={`px-1.5 py-0.5 rounded text-[7.5px] sm:text-[8px] font-mono cursor-pointer transition-all ${
                activeFormIndex === idx
                  ? "bg-[#6EFFC8] text-[#0A0E0C] font-bold"
                  : "bg-white/5 text-white/60 hover:text-white"
              }`}
            >
              {f.id}
            </button>
          ))}
        </div>
      </div>

      {/* Animated Efficiency Bars */}
      <div className="my-auto py-1 sm:py-2 flex flex-col gap-2 sm:gap-2.5">
        {current.bars.map((b) => (
          <div key={b.label} className="flex flex-col gap-1 font-mono text-[8.5px] sm:text-[9.5px]">
            <div className="flex justify-between text-brand-white/80">
              <span>{b.label}</span>
              <span style={{ color: b.col }} className="font-bold">
                {b.val}% EFFICIENCY
              </span>
            </div>
            <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden p-0.5 border border-white/10">
              <motion.div
                className="h-full rounded-full transition-all duration-500 ease-out"
                style={{ backgroundColor: b.col, width: `${b.val}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Dynamic Telemetry Footer */}
      <div className="pt-1.5 sm:pt-2 border-t border-brand-accent/15 flex justify-between font-mono text-[8.5px] sm:text-[9px] text-brand-white/80">
        <span>ENCAPSULATION: <strong className="text-[#6EFFC8]">{current.encap}</strong></span>
        <span>HALF-LIFE (T½): <strong className="text-[#6EFFC8]">{current.tHalf}</strong></span>
        <span>YIELD: <strong className="text-[#6EFFC8]">{current.yield}</strong></span>
      </div>
    </div>
  );
}

function ScaleVisual() {
  const [cursorX, setCursorX] = useState<number>(85);

  // Compute live absorbance and purity based on cursor position
  const isMainPeak = cursorX >= 75 && cursorX <= 98;
  const isSecondaryPeak = cursorX >= 135 && cursorX <= 158;
  const absorbance = isMainPeak
    ? (1.84 - Math.abs(cursorX - 85) * 0.12).toFixed(2)
    : isSecondaryPeak
    ? (0.42 - Math.abs(cursorX - 145) * 0.04).toFixed(2)
    : "0.02";
  const purity = isMainPeak ? ">99.4%" : isSecondaryPeak ? "0.04% Lipid" : "<0.01% Low";
  const retentionTime = (cursorX / 28).toFixed(1);

  const handleSvgMove = (e: React.MouseEvent<SVGSVGElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 280;
    setCursorX(Math.max(10, Math.min(270, x)));
  };

  const badgeW = 96;
  const badgeH = 16;
  const badgeX = Math.max(8, Math.min(280 - badgeW - 8, cursorX - badgeW / 2));

  return (
    <div className="w-full h-full flex flex-col justify-between p-3.5 sm:p-5 select-none">
      {/* Header */}
      <div className="flex items-center justify-between font-mono text-[9px] sm:text-[10px] text-brand-accent/80 pb-1.5 sm:pb-2 border-b border-brand-accent/20">
        <div className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#6EFFC8] animate-pulse" />
          <span>INLINE HPLC CHROMATOGRAM // PAT MONITOR</span>
        </div>
        <span className="text-white/40 text-[8px] sm:text-[9px]">HOVER TO SCRUB TRACE</span>
      </div>

      {/* Interactive Chromatogram */}
      <div className="my-auto py-1">
        <svg
          viewBox="0 0 280 140"
          fill="none"
          className="w-full h-auto max-h-[180px] sm:max-h-[220px] cursor-crosshair"
          onMouseMove={handleSvgMove}
          onMouseLeave={() => setCursorX(85)}
          aria-label="Interactive HPLC Chromatogram with real-time absorbance scrubbing"
        >
          {/* HPLC Peak Trace */}
          <path
            d="M10 120 L50 120 L70 115 L85 25 L95 120 L130 120 L145 85 L155 120 L270 120"
            stroke="#6EFFC8"
            strokeWidth="2"
            fill="none"
          />
          <path
            d="M10 120 L50 120 L70 115 L85 25 L95 120 L130 120 L145 85 L155 120 L270 120 L270 135 L10 135 Z"
            fill="url(#scaleGradInteractive)"
            opacity="0.25"
          />
          <defs>
            <linearGradient id="scaleGradInteractive" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#6EFFC8" />
              <stop offset="100%" stopColor="#6EFFC8" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Interactive Laser Hairline */}
          <line
            x1={cursorX}
            y1={10}
            x2={cursorX}
            y2={130}
            stroke="#ffffff"
            strokeWidth="1.2"
            strokeDasharray="2 2"
            opacity="0.75"
          />
          <circle cx={cursorX} cy={isMainPeak ? 25 : isSecondaryPeak ? 85 : 120} r="3" fill="#6EFFC8" />

          {/* Precision Peak Flag Label */}
          <rect
            x={badgeX}
            y={4}
            width={badgeW}
            height={badgeH}
            rx={3}
            fill="rgba(10,16,13,0.94)"
            stroke="#6EFFC8"
            strokeWidth="0.8"
          />
          <text
            x={badgeX + badgeW / 2}
            y={15}
            fill="#6EFFC8"
            fontSize="7"
            fontWeight="bold"
            textAnchor="middle"
            fontFamily="monospace"
          >
            tR {retentionTime}m · {absorbance} AU
          </text>
        </svg>
      </div>

      {/* Dynamic Telemetry Footer */}
      <div className="pt-1.5 sm:pt-2 border-t border-brand-accent/15 flex justify-between font-mono text-[8.5px] sm:text-[9px] text-brand-white/80">
        <span>PURITY: <strong className="text-[#6EFFC8]">{purity}</strong></span>
        <span>ABSORBANCE (A260): <strong className="text-[#6EFFC8]">{absorbance} AU</strong></span>
        <span>ICH Q7 COMPLIANCE: <strong className="text-[#6EFFC8]">100%</strong></span>
      </div>
    </div>
  );
}

const visuals = [<DiscoverVisual key="d" />, <EngineerVisual key="e" />, <ValidateVisual key="v" />, <ScaleVisual key="s" />];

/**
 * Technology Section: Pinned Pipeline Synthesis & Engineering Suite
 */
export default function TechnologySection() {
  const prefersReduced = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const [activeStep, setActiveStep] = useState(0);
  const committedStep = useRef(0);

  useEffect(() => {
    if (prefersReduced || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      const totalSteps = steps.length;

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: "+=1600px",
        pin: true,
        pinSpacing: true,
        scrub: false,
        onUpdate(self) {
          const bandSize = 1 / totalSteps;
          const rawIdx = self.progress / bandSize;
          const targetIdx = Math.min(totalSteps - 1, Math.floor(rawIdx));

          const fracInBand = rawIdx - Math.floor(rawIdx);
          const goingForward = targetIdx > committedStep.current;
          const goingBack = targetIdx < committedStep.current;

          if (goingForward && fracInBand >= 0.1) {
            committedStep.current = targetIdx;
            setActiveStep(targetIdx);
          } else if (goingBack) {
            committedStep.current = targetIdx;
            setActiveStep(targetIdx);
          }
          if (self.progress >= 0.98 && committedStep.current !== totalSteps - 1) {
            committedStep.current = totalSteps - 1;
            setActiveStep(totalSteps - 1);
          }
          if (self.progress <= 0.02 && committedStep.current !== 0) {
            committedStep.current = 0;
            setActiveStep(0);
          }
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [prefersReduced]);

  const currentStepData = steps[activeStep];

  return (
    <section
      ref={sectionRef}
      id="technology"
      className="w-full min-h-screen overflow-hidden bg-brand-black relative flex flex-col justify-between pt-24 sm:pt-28 lg:pt-32 pb-8 sm:pb-12 lg:pb-16"
      aria-label="Platform technology section"
    >
      <div className="absolute inset-0 bg-brand-black-soft" />
      <div className="absolute inset-0 grid-bg opacity-20 pointer-events-none" />

      <div className="relative z-10 max-w-[1440px] w-full mx-auto px-4 sm:px-6 md:px-8 lg:px-12 flex flex-col justify-between flex-1 gap-4 sm:gap-6 lg:gap-8">

        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-3 sm:gap-6 flex-shrink-0">
          <SectionHeading
            eyebrow="02 / CONSULTING & PIPELINE SYNTHESIS"
            title="02 CONSULTING"
            titleAccent="PREDICTIVE TARGET TO IND CANDIDATE"
            subtitle="Four-phase integrated pipeline purpose-built to accelerate development."
          />

          {/* Step progress indicators */}
          <div className="flex gap-1.5 sm:gap-3 items-center" role="tablist" aria-label="Technology steps">
            {steps.map((step, i) => (
              <button
                key={i}
                type="button"
                onClick={() => {
                  committedStep.current = i;
                  setActiveStep(i);
                }}
                role="tab"
                aria-selected={activeStep === i}
                aria-label={step.phase}
                className={`h-1.5 rounded-full transition-all duration-500 cursor-pointer ${
                  i === activeStep ? "w-6 sm:w-12 bg-brand-accent shadow-[0_0_8px_#6EFFC8]" : "w-3.5 sm:w-5 bg-brand-black-border hover:bg-brand-accent/40"
                }`}
              />
            ))}
            <span className="font-mono text-[11px] sm:text-label text-brand-white-muted ml-1.5 sm:ml-2 tabular-nums">
              {String(activeStep + 1).padStart(2, "0")} / {String(steps.length).padStart(2, "0")}
            </span>
          </div>
        </div>

        {/* Symmetrical Telemetry & Stage Data Displays */}
        <div className="flex-1 grid lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-10 items-stretch min-h-0">

          {/* Left: Rich Animated Console Panel */}
          <div className="relative flex flex-col justify-between p-4 sm:p-6 lg:p-8 rounded-2xl bg-[#0A0E0C]/90 border border-brand-accent/30 backdrop-blur-xl shadow-2xl h-full min-h-0 sm:min-h-[420px] lg:min-h-[500px]">
            <div className="absolute top-2 left-2 w-2 h-2 border-t border-l border-[#6EFFC8]/60 pointer-events-none" />
            <div className="absolute top-2 right-2 w-2 h-2 border-t border-r border-[#6EFFC8]/60 pointer-events-none" />
            <div className="absolute bottom-2 left-2 w-2 h-2 border-b border-l border-[#6EFFC8]/60 pointer-events-none" />
            <div className="absolute bottom-2 right-2 w-2 h-2 border-b border-r border-[#6EFFC8]/60 pointer-events-none" />

            <AnimatePresence mode="wait">
              <motion.div
                key={activeStep}
                className="flex flex-col justify-between h-full gap-3.5 sm:gap-5"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              >
                {/* Header & Phase */}
                <div className="flex flex-col gap-2.5 sm:gap-3">
                  <div className="flex items-center justify-between border-b border-white/10 pb-2.5 sm:pb-3">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#6EFFC8] animate-pulse shadow-[0_0_8px_#6EFFC8]" />
                      <span className="font-mono text-xs uppercase tracking-widest text-[#6EFFC8] font-bold">
                        {currentStepData.phase}
                      </span>
                    </div>
                    <span className="font-mono text-[9px] sm:text-[10px] text-brand-white-muted/50 uppercase">
                      NOVA BIO-PIPELINE
                    </span>
                  </div>

                  <h2 className="text-lg sm:text-2xl lg:text-3xl font-bold text-brand-white tracking-tight leading-tight">
                    {currentStepData.title}
                  </h2>

                  <p className="text-xs sm:text-sm text-brand-white-muted/90 leading-relaxed">
                    {currentStepData.description}
                  </p>
                </div>

                {/* Tech Chips */}
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  {currentStepData.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 sm:px-2.5 py-0.5 sm:py-1 rounded bg-[#6EFFC8]/10 border border-[#6EFFC8]/25 text-[#6EFFC8] text-[9.5px] sm:text-[11px] font-mono"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Audited Benchmarks Grid */}
                <div className="bg-black/60 border border-brand-accent/20 rounded-xl p-2.5 sm:p-4 grid grid-cols-2 gap-2 font-mono text-xs">
                  {currentStepData.benchmarks.map((bm) => (
                    <div key={bm.label} className="flex flex-col">
                      <span className="text-[8.5px] sm:text-[9px] text-brand-white-muted/60 uppercase tracking-wider">{bm.label}</span>
                      <span className="text-[11px] sm:text-[13px] text-[#6EFFC8] font-bold">{bm.value}</span>
                    </div>
                  ))}
                </div>

                {/* Bottom Metric & Footnote */}
                <div className="pt-2.5 sm:pt-3 border-t border-brand-accent/15 flex flex-col gap-1 sm:gap-1.5">
                  <div className="flex items-baseline gap-2">
                    <span className="font-mono text-xl sm:text-3xl text-brand-accent font-bold">
                      {currentStepData.metric.value}
                    </span>
                    <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-widest text-brand-white-muted">
                      {currentStepData.metric.label}
                    </span>
                  </div>

                  <p className="font-mono text-[9px] sm:text-[11px] text-brand-white-muted/70 border-l border-brand-accent/40 pl-2">
                    {currentStepData.detail}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right: Rich Data Visual Console Panel */}
          <div className="relative border border-brand-accent/30 rounded-2xl overflow-hidden bg-[#0A0E0C]/90 backdrop-blur-xl flex flex-col justify-between shadow-2xl h-full min-h-0 sm:min-h-[420px] lg:min-h-[500px]">
            <div className="absolute top-2 left-2 w-2 h-2 border-t border-l border-[#6EFFC8]/60 pointer-events-none" />
            <div className="absolute top-2 right-2 w-2 h-2 border-t border-r border-[#6EFFC8]/60 pointer-events-none" />
            <div className="absolute bottom-2 left-2 w-2 h-2 border-b border-l border-[#6EFFC8]/60 pointer-events-none" />
            <div className="absolute bottom-2 right-2 w-2 h-2 border-b border-r border-[#6EFFC8]/60 pointer-events-none" />

            {/* Panel chrome header */}
            <div className="flex items-center justify-between px-3.5 sm:px-5 py-2.5 sm:py-3 border-b border-brand-accent/20 flex-shrink-0 bg-brand-black/80">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <span className="w-2 h-2 rounded-full bg-[#6EFFC8] animate-pulse" />
                <span className="font-mono text-[9px] sm:text-[10px] text-brand-accent tracking-wider font-semibold truncate">
                  DATA VISUALISATION / NEXAGEN
                </span>
              </div>
              <div className="flex items-center gap-1.5" aria-hidden="true">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-accent/40" />
                <span className="w-1.5 h-1.5 rounded-full bg-brand-accent/60" />
                <span className="w-1.5 h-1.5 rounded-full bg-brand-accent animate-pulse" />
              </div>
            </div>

            {/* Visual dynamic area */}
            <div className="flex-1 relative overflow-hidden flex flex-col items-center justify-center">
              <div className="absolute inset-0 grid-bg opacity-15 pointer-events-none" />
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeStep}
                  className="w-full h-full flex items-center justify-center"
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  aria-hidden="true"
                >
                  {visuals[activeStep]}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Action Callout Banner */}
        <div className="mt-2 sm:mt-4 p-4 sm:p-5 lg:p-6 border border-white/10 bg-brand-black-card/85 backdrop-blur-md rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 shadow-2xl">
          <div className="flex flex-col gap-0.5">
            <span className="font-mono text-[10px] sm:text-xs uppercase tracking-widest text-[#6EFFC8] font-semibold">
              IN NEED FOR BIOPHYSICAL & PIPELINE CONSULTING?
            </span>
            <span className="text-xs sm:text-sm text-brand-white-muted">
              Work with our structural biology and ML engineers to optimize your mRNA delivery and expression profiles.
            </span>
          </div>
          <a
            href="#contact"
            className="px-4 sm:px-6 py-2 sm:py-2.5 border border-[#E6F6ED]/70 hover:border-[#6EFFC8] text-[#E6F6ED] hover:text-[#6EFFC8] hover:bg-[#6EFFC8]/10 transition-all rounded font-mono text-[10.5px] sm:text-xs tracking-widest uppercase whitespace-nowrap font-medium cursor-pointer w-full sm:w-auto text-center"
          >
            GET IN TOUCH &gt;
          </a>
        </div>
      </div>
    </section>
  );
}
