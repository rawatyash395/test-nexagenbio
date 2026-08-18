"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/Button";
import BiotechScrambleWord from "@/components/ui/BiotechScrambleWord";
import dynamic from "next/dynamic";

// Dynamic import of 3D Helix Component to keep bundle lean and avoid SSR issues
const MolecularFieldWrapper = dynamic(
  () => import("@/components/three/MolecularFieldWrapper"),
  { ssr: false, loading: () => <div className="w-full h-full bg-brand-black-soft/50 animate-pulse rounded-xl" /> }
);

const partners = [
  { name: "MIT BioDiscovery", tracking: "tracking-wider" },
  { name: "Harvard Stem Cell", tracking: "tracking-wider" },
  { name: "Stanford MolBio", tracking: "tracking-wider" },
  { name: "Broad Institute", tracking: "tracking-widest" },
  { name: "ETH Zurich Bio", tracking: "tracking-wide" },
];

const ArrowDownIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    className="opacity-50 hover:opacity-100 transition-opacity"
    aria-hidden="true"
  >
    <path
      d="M8 3v10M3 8l5 5 5-5"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const visualScale = useTransform(scrollYProgress, [0, 0.8], [1, 0.85]);
  const visualOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-screen w-full flex flex-col justify-between overflow-hidden pt-24 sm:pt-28 lg:pt-32 pb-8 sm:pb-12 bg-brand-black"
      aria-label="Hero section"
    >
      {/* Background layers */}
      <div className="absolute inset-0 bg-brand-black" />
      <div className="absolute inset-0 grid-bg opacity-40" />
      <div className="absolute inset-0 scanline-bg opacity-60" />

      {/* Radial glow behind 3D element */}
      <div
        className="absolute right-[-5%] top-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(110,255,200,0.08) 0%, rgba(110,255,200,0.03) 40%, transparent 70%)",
        }}
      />

      {/* Hairline decorative lines */}
      <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-brand-accent/10 to-transparent ml-[72px] hidden lg:block" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-accent/15 to-transparent mt-64 hidden lg:block" />

      {/* Main content */}
      <div className="relative z-10 flex-1 flex items-center">
        <div className="max-w-[1440px] w-full mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left: Text */}
            <motion.div
              ref={contentRef}
              className="flex flex-col gap-5 sm:gap-6 lg:gap-7"
              style={{ y: contentY, opacity: contentOpacity }}
            >
              {/* Eyebrow badge */}
              <motion.div
                className="inline-flex items-center gap-2 sm:gap-2.5 px-3 py-1.5 rounded-full border border-brand-accent/25 bg-brand-accent/5 backdrop-blur-sm self-start max-w-full"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
              >
                <span className="w-2 h-2 rounded-full bg-brand-accent animate-pulse-slow shadow-glow-sm flex-shrink-0" />
                <span className="font-mono text-[10px] sm:text-xs uppercase tracking-widest text-brand-accent font-medium truncate">
                  mRNA Therapeutics Platform
                </span>
              </motion.div>

              {/* Main headline with 3D masked reveal & biotech scramble decryption */}
              <h1 className="text-display-xl font-semibold leading-[1.05] sm:leading-[1.02] tracking-tight perspective-1000 flex flex-col gap-0.5 sm:gap-1 break-words">
                {/* Line 1: Rewriting */}
                <div className="overflow-hidden py-0.5 sm:py-1">
                  <motion.div
                    initial={{ y: "110%", rotateX: -25, opacity: 0 }}
                    animate={{ y: "0%", rotateX: 0, opacity: 1 }}
                    transition={{ duration: 0.85, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
                    style={{ transformOrigin: "bottom center" }}
                  >
                    <BiotechScrambleWord text="Rewriting" delayMs={1000} />
                  </motion.div>
                </div>

                {/* Line 2: Biology at */}
                <div className="overflow-hidden py-0.5 sm:py-1">
                  <motion.div
                    initial={{ y: "110%", rotateX: -25, opacity: 0 }}
                    animate={{ y: "0%", rotateX: 0, opacity: 1 }}
                    transition={{ duration: 0.85, delay: 1.15, ease: [0.16, 1, 0.3, 1] }}
                    style={{ transformOrigin: "bottom center" }}
                  >
                    <BiotechScrambleWord text="Biology at" delayMs={1250} />
                  </motion.div>
                </div>

                {/* Line 3: Molecular Level. */}
                <div className="overflow-hidden py-0.5 sm:py-1">
                  <motion.div
                    initial={{ y: "110%", rotateX: -25, opacity: 0 }}
                    animate={{ y: "0%", rotateX: 0, opacity: 1 }}
                    transition={{ duration: 0.85, delay: 1.4, ease: [0.16, 1, 0.3, 1] }}
                    style={{ transformOrigin: "bottom center" }}
                  >
                    <BiotechScrambleWord
                      text="Molecular Level."
                      delayMs={1500}
                      highlight={true}
                      className="font-bold"
                    />
                  </motion.div>
                </div>
              </h1>

              {/* Subheadline */}
              <motion.p
                className="text-sm sm:text-base lg:text-body-lg text-brand-white-muted max-w-lg leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 2.2, ease: [0.16, 1, 0.3, 1] }}
              >
                NexaGen Bio combines high-throughput computational protein design with
                precision synthetic biology to accelerate mRNA therapeutics from sequence
                to clinical candidate - in months, not years.
              </motion.p>

              {/* CTAs */}
              <motion.div
                className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 2.4, ease: [0.16, 1, 0.3, 1] }}
              >
                <Button variant="primary" size="lg" href="#about" className="w-full sm:w-auto justify-center">
                  <span>Explore the Platform</span>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Button>
                <Button variant="ghost" size="lg" href="#technology" className="w-full sm:w-auto justify-center">
                  <span>How It Works</span>
                </Button>
              </motion.div>

              {/* Meta stats */}
              <motion.div
                className="flex flex-wrap gap-4 sm:gap-8 pt-4 border-t border-brand-black-border"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 2.7 }}
              >
                {[
                  { value: "500+", label: "Proteins designed" },
                  { value: "98%", label: "Assay precision" },
                  { value: "12", label: "Patents filed" },
                ].map((stat) => (
                  <div key={stat.label} className="flex flex-col gap-0.5 min-w-[80px]">
                    <span className="font-mono text-brand-accent font-medium text-base sm:text-lg">
                      {stat.value}
                    </span>
                    <span className="font-mono text-[9px] sm:text-label text-brand-white-muted uppercase tracking-wider">
                      {stat.label}
                    </span>
                  </div>
                ))}
              </motion.div>
            </motion.div>

            {/* Right: 3D Molecular Quantum Engine */}
            <motion.div
              className="relative flex items-center justify-center h-[260px] sm:h-[360px] lg:h-[580px] min-h-[240px] sm:min-h-[340px] lg:min-h-[500px] w-full mt-4 lg:mt-0"
              style={{ scale: visualScale, opacity: visualOpacity }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.2, delay: 1.6 }}
            >
              {/* Technical readout labels & telemetry */}
              <div className="absolute top-3 sm:top-4 left-3 sm:left-4 font-mono text-[9px] sm:text-[10px] text-brand-accent/70 tracking-widest bg-brand-black/60 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-md border border-brand-accent/20 backdrop-blur-sm pointer-events-none z-10 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-accent animate-pulse-slow shadow-[0_0_8px_#6EFFC8]" />
                <span>[3D-HELIX: MRNA-CORE]</span>
              </div>
              <div className="absolute bottom-3 sm:bottom-4 right-3 sm:right-4 font-mono text-[9px] sm:text-[10px] text-brand-accent/70 tracking-widest bg-brand-black/60 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-md border border-brand-accent/20 backdrop-blur-sm pointer-events-none z-10">
                NEXAGEN-QUANTUM-ENGINE
              </div>

              {/* Drag instruction pill */}
              <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 font-mono text-[8px] sm:text-[9px] text-brand-white-muted/60 tracking-wider bg-brand-black/40 px-2 py-0.5 rounded border border-brand-white/10 backdrop-blur-sm pointer-events-none z-10">
                DRAG TO ROTATE 3D
              </div>

              {/* 3D Canvas */}
              <MolecularFieldWrapper className="w-full h-full" />
            </motion.div>
          </div>
        </div>
      </div>

      {/* Academic & Institutional Research Partners */}
      <motion.div
        className="relative z-10 max-w-[1440px] w-full mx-auto px-4 sm:px-6 md:px-8 lg:px-12 pt-8 sm:pt-10 pb-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.8, duration: 0.8 }}
      >
        <div className="flex flex-wrap items-center justify-center lg:justify-between gap-4 sm:gap-8 py-3 sm:py-4 border-t border-white/10 opacity-70">
          {partners.map((partner) => (
            <span
              key={partner.name}
              className={`font-mono text-[11px] sm:text-xs md:text-sm text-brand-white-muted/80 uppercase hover:text-brand-accent transition-colors cursor-default ${partner.tracking}`}
            >
              {partner.name}
            </span>
          ))}
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="relative z-10 flex flex-col items-center gap-1.5 sm:gap-2 text-brand-white-muted pb-6 sm:pb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3, duration: 0.6 }}
        aria-hidden="true"
      >
        <span className="font-mono text-[9px] sm:text-[10px] uppercase tracking-widest opacity-40">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDownIcon />
        </motion.div>
      </motion.div>
    </section>
  );
}
