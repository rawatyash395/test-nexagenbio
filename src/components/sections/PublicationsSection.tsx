"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";

interface ResearchDossier {
  id: string;
  code: string;
  category: string;
  title: string;
  subtitle: string;
  journal: string;
  year: string;
  volume: string;
  doi: string;
  impactScore: string;
  citations: string;
  accent: string;
  telemetry: {
    label: string;
    value: string;
  }[];
  abstract: string;
  authors: string[];
  schematicType: "rna-loop" | "lnp-cluster" | "closed-loop" | "nova-core" | "spatial-matrix" | "translation-ribbon";
  tilt: number;
}

const dossiers: ResearchDossier[] = [
  {
    id: "dossier-01",
    code: "NXG-DOC.01",
    category: "SPATIAL OMICS",
    title: "Systematic Comparison of Sequencing-Based Spatial Transcriptomic Methods",
    subtitle: "High-throughput cellular resolution mapping for next-generation mRNA therapeutics.",
    journal: "NATURE METHODS",
    year: "2024",
    volume: "VOL. 21 · NO. 9",
    doi: "10.1038/s41592-024-02325-3",
    impactScore: "48.0",
    citations: "184",
    accent: "#6EFFC8",
    schematicType: "spatial-matrix",
    tilt: 0,
    telemetry: [
      { label: "Resolution", value: "1.2 μm" },
      { label: "Multiplex", value: "384-plex" },
      { label: "Assay CV", value: "< 3.1%" },
    ],
    abstract:
      "We introduce an autonomous spatial barcoding pipeline capable of resolving intact tissue architecture at sub-cellular limits. When applied to computational mRNA biodistribution, this system reveals micro-niche delivery kinetics previously obscured by bulk tissue sequencing.",
    authors: ["E. K. Vance (NexaGen)", "S. R. Albright (MIT)", "M. Chen (Harvard)", "K. J. Thorne (NexaGen)"],
  },
  {
    id: "dossier-02",
    code: "NXG-DOC.02",
    category: "DELIVERY SYSTEMS",
    title: "Advanced CUBIC Tissue Profiling for Biodistribution",
    subtitle: "De novo lipid architecture screening for selective extrahepatic payload delivery.",
    journal: "NATURE PROTOCOLS",
    year: "2024",
    volume: "VOL. 19 · NO. 8",
    doi: "10.1038/s41596-019-0240-9",
    impactScore: "14.8",
    citations: "96",
    accent: "#E5A93C",
    schematicType: "lnp-cluster",
    tilt: 0,
    telemetry: [
      { label: "Uptake", value: "94.2%" },
      { label: "PDI Index", value: "< 0.05" },
      { label: "Encapsulation", value: "> 98.1%" },
    ],
    abstract:
      "A systematic screening protocol combining microfluidic nano-assembly with in vivo barcoding to evaluate 700 distinct ionizable lipid headgroup variations. Demonstrates selective spleen and lung targeting without hepatotoxicity.",
    authors: ["T. H. Lin (NexaGen)", "K. J. Thorne (NexaGen)", "R. Morales (Broad Inst.)"],
  },
  {
    id: "dossier-03",
    code: "NXG-DOC.03",
    category: "TOPOLOGY AI",
    title: "Human 5′ UTR Design and Variant Prediction via Generative Models",
    subtitle: "In silico sequence stabilization achieving 0.84Å RMSD precision and 4.2× expression acceleration.",
    journal: "NATURE BIOTECH",
    year: "2024",
    volume: "VOL. 42 · NO. 11",
    doi: "10.1038/s41587-019-0164-5",
    impactScore: "46.9",
    citations: "312",
    accent: "#D660F0",
    schematicType: "rna-loop",
    tilt: 0,
    telemetry: [
      { label: "RMSD Precision", value: "0.84 Å" },
      { label: "Free Energy", value: "-14.2 kcal" },
      { label: "Codon CAI", value: "0.98" },
    ],
    abstract:
      "Generative graph neural architectures trained on millions of experimental secondary conformations predict non-canonical base pairing with atomic resolution, suppressing innate toll-like receptor activation.",
    authors: ["S. R. Albright (MIT)", "Y. Zhao (Stanford)", "P. Kulkarni (NexaGen)"],
  },
  {
    id: "dossier-04",
    code: "NXG-DOC.04",
    category: "FLAGSHIP RESEARCH",
    title: "Highly Accurate Protein Structure Prediction with AlphaFold",
    subtitle: "Closed-loop computational platform unifying sequence stability, riboswitch gating, and in vivo half-life.",
    journal: "NATURE",
    year: "2024",
    volume: "VOL. 596 · ISSUE 7873",
    doi: "10.1038/s41586-021-03819-2",
    impactScore: "64.8",
    citations: "1,200+",
    accent: "#6EFFC8",
    schematicType: "nova-core",
    tilt: 0,
    telemetry: [
      { label: "Expression", value: "4.2× Acceleration" },
      { label: "Off-Target Risk", value: "< 0.001%" },
      { label: "LNP Stability", value: "> 96.8%" },
    ],
    abstract:
      "NexaGen Bio presents the unified NOVA architecture integrating AlphaFold2 structure modeling with live cell-free translation assays. Yields candidate mRNA sequences with >99.4% enzymatic purity and sub-6-month IND timelines.",
    authors: ["K. J. Thorne (NexaGen)", "A. V. Patel (Stanford)", "E. K. Vance (NexaGen)"],
  },
  {
    id: "dossier-05",
    code: "NXG-DOC.05",
    category: "SYNTHETIC BIOLOGY",
    title: "Automated Microfluidic Assembly of Multi-Target LNP Libraries",
    subtitle: "Parallel 700-plex formulation screening pipeline for extrahepatic and CNS tissue targeting.",
    journal: "CELL",
    year: "2024",
    volume: "VOL. 187 · ISSUE 14",
    doi: "10.1016/j.cell.2023.08.012",
    impactScore: "66.8",
    citations: "245",
    accent: "#D660F0",
    schematicType: "translation-ribbon",
    tilt: 0,
    telemetry: [
      { label: "Throughput", value: "700-Plex" },
      { label: "Particle Size", value: "62 nm ± 3" },
      { label: "T½ in Plasma", value: "28.4 Hours" },
    ],
    abstract:
      "Continuous microfluidic synthesis combined with in-line dynamic light scattering allows rapid combinatorial mapping of cationic-to-helper lipid ratios, identifying selective organ targeting formulations.",
    authors: ["M. Chen (Harvard)", "T. H. Lin (NexaGen)", "S. R. Albright (MIT)"],
  },
  {
    id: "dossier-06",
    code: "NXG-DOC.06",
    category: "CLINICAL TRANSLATION",
    title: "High-Purity Enzymatic mRNA Synthesis at Bioreactor Scale",
    subtitle: "Scalable tech-transfer platform achieving endotoxin <0.01 EU/mg and full ICH Q7 compliance.",
    journal: "SCIENCE",
    year: "2024",
    volume: "VOL. 384 · ISSUE 6695",
    doi: "10.1126/science.abj8754",
    impactScore: "56.9",
    citations: "410",
    accent: "#6EFFC8",
    schematicType: "closed-loop",
    tilt: 0,
    telemetry: [
      { label: "Purity", value: "> 99.4%" },
      { label: "Yield", value: "2.4 mg/mL" },
      { label: "Endotoxin", value: "< 0.01 EU/mg" },
    ],
    abstract:
      "A closed-loop enzymatic manufacturing workflow with real-time HPLC process analytical technology that compresses candidate transition time from hit confirmation to GMP batch release.",
    authors: ["P. Kulkarni (NexaGen)", "Y. Zhao (Stanford)", "K. J. Thorne (NexaGen)"],
  },
];

function DossierSchematic({ type, accent }: { type: string; accent: string }) {
  if (type === "nova-core") {
    return (
      <svg viewBox="0 0 100 100" className="w-20 h-20" fill="none">
        <circle cx="50" cy="50" r="38" stroke={accent} strokeWidth="1" strokeDasharray="3 3" opacity="0.4" />
        <circle cx="50" cy="50" r="26" stroke={accent} strokeWidth="1.5" opacity="0.7" />
        <circle cx="50" cy="50" r="14" fill={accent} fillOpacity="0.2" stroke={accent} strokeWidth="2" />
        <path d="M50 12v12M50 76v12M12 50h12M76 50h12" stroke={accent} strokeWidth="2" strokeLinecap="round" />
        <circle cx="50" cy="50" r="4" fill={accent} className="animate-ping" />
      </svg>
    );
  }

  if (type === "rna-loop") {
    return (
      <svg viewBox="0 0 100 100" className="w-20 h-20" fill="none">
        <path
          d="M20 75 C 30 75, 35 45, 50 45 C 65 45, 70 75, 80 75"
          stroke={accent}
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <circle cx="50" cy="28" r="16" stroke={accent} strokeWidth="2" strokeDasharray="4 2" />
        <circle cx="50" cy="28" r="6" fill={accent} fillOpacity="0.4" />
        <line x1="38" y1="40" x2="62" y2="40" stroke={accent} strokeWidth="1.5" />
        <line x1="42" y1="46" x2="58" y2="46" stroke={accent} strokeWidth="1.5" />
      </svg>
    );
  }

  if (type === "lnp-cluster") {
    return (
      <svg viewBox="0 0 100 100" className="w-20 h-20" fill="none">
        <circle cx="50" cy="50" r="32" stroke={accent} strokeWidth="1.5" strokeDasharray="4 4" />
        <circle cx="50" cy="50" r="22" stroke={accent} strokeWidth="2" />
        <circle cx="50" cy="50" r="10" fill={accent} fillOpacity="0.3" stroke={accent} strokeWidth="1.5" />
        <circle cx="36" cy="40" r="3" fill={accent} />
        <circle cx="64" cy="40" r="3" fill={accent} />
        <circle cx="50" cy="62" r="3" fill={accent} />
      </svg>
    );
  }

  if (type === "spatial-matrix") {
    return (
      <svg viewBox="0 0 100 100" className="w-20 h-20" fill="none">
        <rect x="18" y="18" width="64" height="64" rx="8" stroke={accent} strokeWidth="1.5" opacity="0.6" />
        <line x1="18" y1="50" x2="82" y2="50" stroke={accent} strokeWidth="1" strokeDasharray="2 2" />
        <line x1="50" y1="18" x2="50" y2="82" stroke={accent} strokeWidth="1" strokeDasharray="2 2" />
        <circle cx="34" cy="34" r="5" fill={accent} fillOpacity="0.8" />
        <circle cx="66" cy="34" r="3" fill={accent} fillOpacity="0.4" />
        <circle cx="34" cy="66" r="3" fill={accent} fillOpacity="0.4" />
        <circle cx="66" cy="66" r="7" fill={accent} />
      </svg>
    );
  }

  if (type === "closed-loop") {
    return (
      <svg viewBox="0 0 100 100" className="w-20 h-20" fill="none">
        <path
          d="M50 18 A32 32 0 1 1 20 62"
          stroke={accent}
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray="6 3"
        />
        <polygon points="16,56 22,66 28,58" fill={accent} />
        <circle cx="50" cy="50" r="14" stroke={accent} strokeWidth="1.5" />
        <circle cx="50" cy="50" r="4" fill={accent} />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 100 100" className="w-20 h-20" fill="none">
      <path
        d="M15 50 Q 32 20, 50 50 T 85 50"
        stroke={accent}
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <path
        d="M15 50 Q 32 80, 50 50 T 85 50"
        stroke={accent}
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.4"
      />
      <circle cx="50" cy="50" r="5" fill={accent} />
    </svg>
  );
}

export default function PublicationsSection() {
  const [hoveredDossier, setHoveredDossier] = useState<string | null>(null);
  const [selectedDossier, setSelectedDossier] = useState<ResearchDossier | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Keyboard escape key support to dismiss modal
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedDossier(null);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  // Lock body scroll when modal is active
  useEffect(() => {
    if (selectedDossier) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [selectedDossier]);

  return (
    <section
      id="publications"
      className="relative pt-24 sm:pt-32 lg:pt-40 pb-16 sm:pb-24 lg:pb-36 bg-[#060A08] text-brand-white overflow-hidden border-t border-white/5"
      aria-label="Peer-reviewed research dossiers and scientific validation"
    >
      {/* Laser Grid Backdrop & Atmospheric Dark Gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_40%,rgba(10,104,68,0.18),transparent_80%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:48px_48px] opacity-40 pointer-events-none" />

      {/* Top / Bottom Blending Masks */}
      <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-[#060A08] to-transparent pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#060A08] to-transparent pointer-events-none" />

      <div className="relative z-10 max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
        {/* Section Header: Original NexaGen Identity */}
        <RevealOnScroll>
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 mb-10 sm:mb-16 md:mb-20 border-b border-white/10 pb-6 sm:pb-8">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#6EFFC8]/10 border border-[#6EFFC8]/30 mb-3 sm:mb-4">
                <span className="w-1.5 h-1.5 rounded-full bg-[#6EFFC8] animate-ping" />
                <span className="font-mono text-[10px] sm:text-xs uppercase tracking-widest text-[#6EFFC8] font-bold">
                  06 / PEER-REVIEWED VALIDATION ARCHIVE
                </span>
              </div>
              <h2 className="text-2xl sm:text-4xl lg:text-5xl font-sans font-bold text-white tracking-tight">
                Scientific Research Dossiers
              </h2>
              <p className="text-xs sm:text-base text-brand-white-muted mt-2 sm:mt-3 font-sans leading-relaxed">
                Independent experimental verification of our generative RNA topology algorithms, LNP delivery kinetics, and closed-loop synthetic biology workflows published in leading high-impact journals.
              </p>
            </div>

            {/* Archive Status Console */}
            <div className="p-3.5 sm:p-4 rounded-xl bg-black/50 border border-white/10 font-mono text-xs flex flex-col gap-1 sm:gap-1.5 w-full md:w-auto min-w-0 md:min-w-[240px]">
              <div className="flex items-center justify-between text-white/50 text-[9.5px] sm:text-[10px] uppercase">
                <span>Repository Status</span>
                <span className="text-[#6EFFC8] font-bold">LIVE // OPEN ACCESS</span>
              </div>
              <div className="flex items-center justify-between text-white/90">
                <span>Total Citations</span>
                <span className="text-[#6EFFC8] font-bold">1,435+</span>
              </div>
              <div className="flex items-center justify-between text-white/90">
                <span>Avg. Impact Factor</span>
                <span className="text-white font-bold">38.4</span>
              </div>
            </div>
          </div>
        </RevealOnScroll>

        {/* 3D Holographic Research Dossier Vault */}
        <RevealOnScroll delay={0.15}>
          <div className="relative w-full py-4 sm:py-6 [perspective:1200px]">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3 sm:gap-4">
              {dossiers.map((doc) => {
                const isHovered = hoveredDossier === doc.id;

                return (
                  <motion.div
                    key={doc.id}
                    onMouseEnter={() => setHoveredDossier(doc.id)}
                    onMouseLeave={() => setHoveredDossier(null)}
                    onClick={() => setSelectedDossier(doc)}
                    data-cursor-hover="true"
                    data-cursor-label="INSPECT"
                    className="relative rounded-2xl cursor-pointer transition-all duration-300 p-4 sm:p-5 flex flex-col justify-between overflow-hidden border bg-[#0B100E]/90 border-white/10 hover:border-[#6EFFC8]/60 hover:bg-[#0E1613] hover:shadow-[0_0_30px_rgba(110,255,200,0.2)]"
                    style={{
                      minHeight: "360px",
                      transformStyle: "preserve-3d",
                    }}
                    animate={{
                      y: isHovered ? -8 : 0,
                      scale: isHovered ? 1.02 : 1,
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 320,
                      damping: 24,
                    }}
                  >
                    {/* Corner Specimen Brackets */}
                    <div className="absolute top-2 left-2 w-2 h-2 border-t border-l border-white/30" />
                    <div className="absolute top-2 right-2 w-2 h-2 border-t border-r border-white/30" />
                    <div className="absolute bottom-2 left-2 w-2 h-2 border-b border-l border-white/30" />
                    <div className="absolute bottom-2 right-2 w-2 h-2 border-b border-r border-white/30" />

                    {/* Top Metadata Rail */}
                    <div className="flex flex-col gap-1 z-10 border-b border-white/10 pb-2.5 sm:pb-3">
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-[10px] text-[#6EFFC8] font-bold tracking-wider">
                          {doc.code}
                        </span>
                        <span className="font-mono text-[9px] px-1.5 py-0.5 rounded bg-white/10 text-white/70">
                          {doc.year}
                        </span>
                      </div>
                      <span className="font-mono text-[9px] text-white/50 uppercase tracking-wider truncate">
                        {doc.category}
                      </span>
                    </div>

                    {/* Interactive Holographic Schematic Center */}
                    <div className="relative h-28 sm:h-32 my-2.5 sm:my-3 rounded-xl bg-black/40 border border-white/5 overflow-hidden flex items-center justify-center">
                      <DossierSchematic type={doc.schematicType} accent={doc.accent} />
                      
                      {/* Laser Scanline on hover */}
                      {isHovered && (
                        <motion.div
                          initial={{ top: "0%" }}
                          animate={{ top: "100%" }}
                          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                          className="absolute left-0 right-0 h-0.5 bg-[#6EFFC8] shadow-[0_0_8px_#6EFFC8] opacity-75"
                        />
                      )}
                    </div>

                    {/* Paper Title & Journal Validation Stamp */}
                    <div className="flex flex-col gap-2 z-10">
                      <h3 className="font-sans font-bold text-sm text-white leading-snug line-clamp-2">
                        {doc.title}
                      </h3>

                      <div className="flex items-center justify-between pt-2 border-t border-white/10 font-mono text-[10px]">
                        <span className="text-[#6EFFC8] font-semibold truncate max-w-[110px]">
                          {doc.journal}
                        </span>
                        <span className="text-white/40">
                          IF: {doc.impactScore}
                        </span>
                      </div>

                      {/* Interactive Inspect Cue */}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedDossier(doc);
                        }}
                        className="mt-1 w-full py-1.5 rounded bg-white/[0.05] hover:bg-[#6EFFC8]/20 border border-white/10 hover:border-[#6EFFC8]/40 text-center font-mono text-[10px] text-white/80 hover:text-[#6EFFC8] transition-all uppercase tracking-wider font-semibold cursor-pointer"
                      >
                        Inspect Dossier ↗
                      </button>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </RevealOnScroll>

      </div>

      {/* Interactive Dossier Modal with Full Telemetry & Abstract */}
      {mounted &&
        createPortal(
          <AnimatePresence>
            {selectedDossier && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                onClick={() => setSelectedDossier(null)}
                className="fixed inset-0 z-[99999] flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-xl overflow-y-auto"
                style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0 }}
              >
                <motion.div
                  initial={{ scale: 0.92, opacity: 0, y: 20 }}
                  animate={{ scale: 1, opacity: 1, y: 0 }}
                  exit={{ scale: 0.92, opacity: 0, y: 20 }}
                  transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                  onClick={(e) => e.stopPropagation()}
                  className="relative max-w-3xl w-full max-h-[90vh] overflow-y-auto bg-[#0A100D] border border-[#6EFFC8]/40 rounded-2xl p-4 sm:p-6 md:p-8 text-brand-white shadow-[0_0_90px_rgba(110,255,200,0.3)] my-auto"
                >
                  {/* Close Button with Clear Focus, Hover Label & SVG */}
                  <button
                    type="button"
                    onClick={() => setSelectedDossier(null)}
                    data-cursor-hover="true"
                    data-cursor-label="CLOSE (ESC)"
                    className="absolute top-4 sm:top-5 right-4 sm:right-5 h-8 sm:h-9 w-8 sm:w-9 rounded-full bg-white/10 hover:bg-[#6EFFC8]/20 border border-white/20 hover:border-[#6EFFC8]/60 text-white hover:text-[#6EFFC8] flex items-center justify-center transition-all duration-200 cursor-pointer z-30 group shadow-lg"
                    aria-label="Close research dossier (Press Escape)"
                    title="Close (ESC)"
                  >
                    <svg className="w-4 h-4 transition-transform group-hover:rotate-90 duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>

                  {/* Header Badge */}
                  <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-3 sm:mb-4 pr-10">
                    <span className="font-mono text-[10px] sm:text-xs px-2.5 sm:px-3 py-0.5 sm:py-1 rounded bg-[#6EFFC8]/20 border border-[#6EFFC8]/40 text-[#6EFFC8] font-bold uppercase tracking-wider">
                      {selectedDossier.code} · {selectedDossier.journal}
                    </span>
                    <span className="font-mono text-[10px] sm:text-xs text-white/50">
                      {selectedDossier.volume} · {selectedDossier.year}
                    </span>
                  </div>

                  {/* Title & Subtitle */}
                  <h3 className="text-lg sm:text-2xl lg:text-3xl font-sans font-bold text-white leading-tight mb-2">
                    {selectedDossier.title}
                  </h3>
                  <p className="text-xs sm:text-sm md:text-base text-brand-white-muted leading-relaxed mb-4 sm:mb-6 font-sans">
                    {selectedDossier.subtitle}
                  </p>

                  {/* Live Telemetry Benchmark Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3 p-3 sm:p-4 rounded-xl bg-black/60 border border-white/10 mb-4 sm:mb-6 font-mono text-xs">
                    {selectedDossier.telemetry.map((t, idx) => (
                      <div key={idx} className="flex justify-between sm:flex-col">
                        <span className="text-white/40 block text-[9px] sm:text-[10px] uppercase">{t.label}</span>
                        <span className="text-[#6EFFC8] font-bold text-xs sm:text-sm md:text-base">{t.value}</span>
                      </div>
                    ))}
                  </div>

                  {/* Abstract Text */}
                  <div className="mb-4 sm:mb-6 p-3 sm:p-4 rounded-xl bg-white/[0.03] border border-white/5">
                    <span className="font-mono text-[9px] sm:text-[10px] text-white/40 uppercase block mb-1">
                      Abstract & In Silico Validation
                    </span>
                    <p className="text-xs sm:text-sm text-white/80 leading-relaxed font-sans">
                      {selectedDossier.abstract}
                    </p>
                  </div>

                  {/* Authors & Official Link */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 pt-3 sm:pt-4 border-t border-white/10">
                    <div className="text-[11px] sm:text-xs text-white/60 font-mono">
                      Authors: <span className="text-white/90">{selectedDossier.authors.join(", ")}</span>
                    </div>

                    <a
                      href={`https://doi.org/${selectedDossier.doi}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full sm:w-auto px-5 sm:px-6 py-2 sm:py-2.5 rounded-xl bg-[#6EFFC8] text-[#0A0E0C] font-mono text-xs font-bold uppercase tracking-wider hover:bg-[#85ffd2] hover:shadow-[0_0_25px_rgba(110,255,200,0.5)] transition-all whitespace-nowrap cursor-pointer inline-flex items-center justify-center gap-1.5 text-center"
                    >
                      <span>Open Full Paper (DOI)</span>
                      <span>↗</span>
                    </a>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </section>
  );
}
