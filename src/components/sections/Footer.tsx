"use client";

import { useEffect, useState } from "react";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";

const LogoMark = () => (
  <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg border border-[#6EFFC8]/30 bg-white/[0.02] p-1 flex items-center justify-center shadow-[0_0_12px_rgba(110,255,200,0.12)]">
    {/* eslint-disable-next-line @next/next/no-img-element */}
    <img
      src="/bio-cursor-cell-light.png"
      alt="NexaGen Bio Logo"
      className="w-full h-full object-contain select-none"
    />
  </div>
);

const modules = [
  { code: "01", name: "AUDIT", label: "Platform Science", href: "#about", latency: "12ms" },
  { code: "02", name: "CONSULTING", label: "Workflow Engine", href: "#technology", latency: "8ms" },
  { code: "03", name: "TRAINING", label: "Model Architecture", href: "#process", latency: "16ms" },
  { code: "04", name: "PIPELINE", label: "6 Integrated Modules", href: "#capabilities", latency: "4ms" },
  { code: "05", name: "METRICS", label: "Clinical Benchmark", href: "#statistics", latency: "10ms" },
  { code: "06", name: "DOSSIERS", label: "Research Archive", href: "#publications", latency: "6ms" },
  { code: "07", name: "GET IN TOUCH", label: "Partner Inquiry", href: "#contact", latency: "LIVE" },
];

const social = [
  {
    label: "LinkedIn",
    tag: "LI-CORP",
    href: "https://linkedin.com",
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect x="2" y="2" width="20" height="20" rx="3" stroke="currentColor" strokeWidth="1.5" />
        <path d="M7 10v7M7 7v.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M11 17v-4c0-1.1.9-2 2-2s2 .9 2 2v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M11 10v7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    label: "Twitter / X",
    tag: "X-FEED",
    href: "https://x.com",
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M4 4l16 16M4 20L20 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    label: "GitHub",
    tag: "GIT-SRC",
    href: "https://github.com",
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M12 2C6.48 2 2 6.58 2 12.26c0 4.53 2.87 8.37 6.84 9.72.5.09.68-.22.68-.49v-1.7c-2.78.62-3.37-1.37-3.37-1.37-.45-1.17-1.11-1.48-1.11-1.48-.91-.63.07-.62.07-.62 1 .07 1.53 1.05 1.53 1.05.89 1.56 2.34 1.11 2.91.85.09-.66.35-1.11.63-1.37-2.22-.26-4.56-1.14-4.56-5.07 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.71 0 0 .84-.27 2.75 1.05A9.38 9.38 0 0112 6.84c.85.004 1.71.12 2.51.34 1.91-1.32 2.75-1.05 2.75-1.05.55 1.41.2 2.45.1 2.71.64.72 1.03 1.63 1.03 2.75 0 3.94-2.34 4.81-4.57 5.07.36.32.68.94.68 1.9v2.81c0 .27.18.59.69.49C19.13 20.63 22 16.79 22 12.26 22 6.58 17.52 2 12 2z" fill="currentColor" opacity="0.85" />
      </svg>
    ),
  },
];

export default function Footer() {
  const [timeUtc, setTimeUtc] = useState<string>("");

  useEffect(() => {
    const updateTime = () => {
      const d = new Date();
      setTimeUtc(d.toUTCString().slice(17, 25) + " UTC");
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer
      className="relative bg-[#060a08] text-brand-white overflow-hidden border-t border-[#6EFFC8]/20"
      aria-label="Site footer"
    >
      {/* Dynamic Background Aurora Glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[350px] pointer-events-none opacity-25 blur-[140px]"
        style={{
          background: "radial-gradient(ellipse at center, #6EFFC8 0%, rgba(38,51,42,0.6) 45%, transparent 75%)",
        }}
      />
      <div className="absolute inset-0 grid-bg opacity-15 pointer-events-none" />

      {/* Real-Time Genomic Sequence Telemetry Ticker */}
      <div className="relative border-b border-white/[0.07] bg-[#090e0b]/80 backdrop-blur-md overflow-hidden py-2 sm:py-2.5">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 flex items-center justify-between font-mono text-[10px] sm:text-[11px] text-brand-white-muted/60 tracking-wider">
          <div className="flex items-center gap-2 sm:gap-3 truncate">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-accent animate-pulse-slow shadow-[0_0_6px_#6EFFC8] flex-shrink-0" />
            <span className="text-brand-accent font-semibold uppercase tracking-widest text-[9px] sm:text-[10px] flex-shrink-0">
              ENGINE ACTIVE
            </span>
            <span className="hidden sm:inline text-white/20">|</span>
            <span className="hidden sm:inline text-brand-white-muted/75 truncate">
              5&apos;-AUG-CGU-GAC-UAA-GGC-UUA-CCG-AUC-GCA-UUG-3&apos;
            </span>
          </div>

          <div className="flex items-center gap-4 sm:gap-6 text-[9.5px] sm:text-[10px] flex-shrink-0">
            <span className="hidden md:inline text-brand-white-muted/60">
              ACCURACY: <span className="text-brand-white font-medium">0.84Å RMSD</span>
            </span>
            <span className="text-brand-accent/80 font-medium">{timeUtc || "00:00:00 UTC"}</span>
          </div>
        </div>
      </div>

      <div className="relative z-10 max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 pt-12 sm:pt-16 pb-8 sm:pb-12">
        {/* Main Brand Header & Apex Navigation */}
        <RevealOnScroll>
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 sm:gap-8 pb-8 sm:pb-12 border-b border-white/[0.08]">
            <div className="flex flex-col gap-3 sm:gap-4 max-w-xl">
              <a
                href="#hero"
                className="flex items-center gap-3 group focus-visible:outline-none w-fit"
                aria-label="NexaGen Bio home"
              >
                <LogoMark />
                <div className="flex flex-col">
                  <span className="font-semibold text-lg sm:text-xl tracking-tight text-white group-hover:text-brand-accent transition-colors">
                    NEXAGEN<span className="text-brand-accent font-light ml-1">BIO</span>
                  </span>
                  <span className="font-mono text-[8px] sm:text-[9px] text-brand-accent/70 uppercase tracking-widest">
                    PRECISION COMPUTATIONAL BIOLOGY
                  </span>
                </div>
              </a>
              <p className="text-xs sm:text-body-sm text-brand-white-muted leading-relaxed">
                Pioneering AI-guided mRNA sequence design and automated molecular therapeutics from in silico simulation to clinical candidate delivery.
              </p>
            </div>

            {/* Return to Apex (Back to Top Interactive Node) */}
            <div className="flex items-center gap-4">
              <button
                onClick={scrollToTop}
                className="group relative flex items-center justify-between gap-3 px-4 sm:px-5 py-2.5 sm:py-3 rounded-xl border border-white/10 bg-[#0d1410]/80 backdrop-blur-md text-brand-white hover:border-brand-accent/60 hover:shadow-[0_0_24px_rgba(110,255,200,0.2)] transition-all cursor-pointer w-full sm:w-auto"
                aria-label="Return to top of page"
              >
                <div className="flex flex-col text-left">
                  <span className="font-mono text-[9px] sm:text-[10px] text-brand-accent uppercase tracking-widest font-semibold">
                    TELEPORT TO APEX
                  </span>
                  <span className="font-mono text-[8px] sm:text-[9px] text-brand-white-muted/50">
                    RETURN TO SECTION 00
                  </span>
                </div>
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-brand-accent/10 border border-brand-accent/30 flex items-center justify-center text-brand-accent group-hover:-translate-y-0.5 group-hover:bg-brand-accent group-hover:text-brand-black transition-all flex-shrink-0">
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                    <path d="M8 13V3M3 8l5-5 5 5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </button>
            </div>
          </div>
        </RevealOnScroll>

        {/* Subsystem Direct Teleport Matrix */}
        <RevealOnScroll delay={0.1}>
          <div className="py-8 sm:py-12">
            <div className="flex items-center justify-between mb-4 sm:mb-6">
              <span className="font-mono text-[9px] sm:text-[10px] uppercase tracking-widest text-brand-accent/70 font-semibold flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-accent shadow-[0_0_6px_#6EFFC8]" />
                PLATFORM ARCHITECTURE // ACTIVE SUBSYSTEMS
              </span>
              <span className="font-mono text-[9px] sm:text-[10px] text-brand-white-muted/40 hidden sm:inline">
                CLICK TO JUMP DIRECTLY
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-2 sm:gap-3">
              {modules.map((m, idx) => (
                <a
                  key={m.code}
                  href={m.href}
                  className={`group relative flex flex-col justify-between p-3 sm:p-4 rounded-xl border border-white/[0.07] bg-[#0c130f]/60 hover:bg-[#121c17] hover:border-brand-accent/50 hover:shadow-[0_0_20px_rgba(110,255,200,0.15)] transition-all duration-200 ${
                    idx === 6 ? "col-span-2 sm:col-span-1" : ""
                  }`}
                >
                  <div className="flex items-center justify-between mb-2 sm:mb-3">
                    <span className="font-mono text-[10px] sm:text-[11px] font-bold text-brand-accent/80 group-hover:text-brand-accent transition-colors">
                      {m.code}
                    </span>
                    <span className="font-mono text-[8px] sm:text-[9px] text-white/30 group-hover:text-brand-accent/80 transition-colors">
                      {m.latency}
                    </span>
                  </div>
                  <div>
                    <div className="font-semibold text-xs sm:text-[13px] text-brand-white group-hover:text-brand-accent transition-colors tracking-tight">
                      {m.name}
                    </div>
                    <div className="text-[10px] sm:text-[11px] text-brand-white-muted/60 mt-0.5 truncate">
                      {m.label}
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </RevealOnScroll>

        {/* Global Research Hubs & Social Channels */}
        <RevealOnScroll delay={0.15}>
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 sm:gap-6 pt-6 sm:pt-8 pb-8 sm:pb-10 border-t border-white/[0.08]">
            {/* Global Hub Nodes */}
            <div className="flex flex-wrap items-center gap-4 sm:gap-8 font-mono text-[10px] sm:text-[11px]">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-accent shadow-[0_0_5px_#6EFFC8] flex-shrink-0" />
                <span className="text-white/80 font-medium">CAMBRIDGE HQ:</span>
                <span className="text-brand-white-muted/50">42.3601° N, 71.0942° W</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-accent shadow-[0_0_5px_#6EFFC8] flex-shrink-0" />
                <span className="text-white/80 font-medium">SAN FRANCISCO LABS:</span>
                <span className="text-brand-white-muted/50">37.7749° N, 122.4194° W</span>
              </div>
            </div>

            {/* Social Hub Links */}
            <div className="flex items-center gap-2">
              {social.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  className="group flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1.5 rounded-lg border border-white/[0.08] bg-[#0c130f]/80 text-brand-white-muted hover:text-brand-accent hover:border-brand-accent/40 transition-all font-mono text-[10px]"
                  aria-label={s.label}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {s.icon}
                  <span className="hidden sm:inline font-semibold">{s.tag}</span>
                </a>
              ))}
            </div>
          </div>
        </RevealOnScroll>

        {/* Regulatory Compliance & Legal Bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 pt-4 sm:pt-6 border-t border-white/[0.05] font-mono text-[10px] sm:text-[11px] text-brand-white-muted/40 flex-wrap">
          <div>
            © {new Date().getFullYear()} NexaGen Bio, Inc. All rights reserved. Molecular Therapeutics Engine.
          </div>
          <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-[9px] sm:text-[10px] text-brand-accent/60">
            <span className="flex items-center gap-1 sm:gap-1.5">
              <span className="w-1 h-1 rounded-full bg-brand-accent shadow-[0_0_4px_#6EFFC8]" />
              FDA 21 CFR PART 11
            </span>
            <span>·</span>
            <span>ISO 9001:2015 CERTIFIED</span>
            <span>·</span>
            <span>SOC-2 TYPE II SECURE</span>
          </div>
        </div>

        {/* Monumental Horizon Wordmark */}
        <div className="relative mt-6 sm:mt-8 select-none pointer-events-none overflow-hidden text-center opacity-[0.06] hover:opacity-[0.09] transition-opacity w-full flex items-center justify-center">
          <span className="font-extrabold text-[8.5vw] sm:text-[9.5vw] lg:text-[10.5vw] tracking-[-0.02em] leading-none bg-gradient-to-b from-white via-white/80 to-transparent bg-clip-text text-transparent whitespace-nowrap block font-sans uppercase">
            NEXAGEN BIO
          </span>
        </div>
      </div>
    </footer>
  );
}
