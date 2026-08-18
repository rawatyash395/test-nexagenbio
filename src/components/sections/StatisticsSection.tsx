"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { StatCounter } from "@/components/ui/StatCounter";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";

const stats = [
  {
    value: 500,
    suffix: "+",
    label: "Proteins Engineered",
    description: "Across oncology, rare disease, and infectious disease programs",
  },
  {
    value: 98,
    suffix: "%",
    label: "Assay Accuracy",
    description: "Translation efficiency prediction vs experimental ground truth",
  },
  {
    value: 12,
    suffix: "",
    label: "Patents Filed",
    description: "Covering NOVA architecture, LNP formulations, and synthesis methods",
  },
  {
    value: 40,
    suffix: "+",
    label: "Research Partners",
    description: "Academic medical centers and biopharma co-development agreements",
  },
];

const researchPartners = [
  "Broad Institute",
  "MIT Koch Institute",
  "Weill Cornell Medicine",
  "Sanofi R&D",
  "Pfizer CentreOne",
  "UCSF Quantitative Biosciences",
  "AstraZeneca Open Innovation",
  "Johns Hopkins Bloomberg",
];

// Animated particle background
function ParticleBackground() {
  const particles = Array.from({ length: 24 }).map((_, i) => ({
    id: i,
    x: `${(i * 13.7) % 100}%`,
    y: `${(i * 7.3) % 100}%`,
    size: 1 + (i % 3),
    delay: i * 0.3,
    duration: 3 + (i % 4),
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-brand-accent"
          style={{
            left: p.x,
            top: p.y,
            width: p.size,
            height: p.size,
          }}
          animate={{
            opacity: [0.1, 0.5, 0.1],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

const staggerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15, delayChildren: 0.1 },
  },
};

const statCardVariant = {
  hidden: { opacity: 0, scale: 0.94 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

export default function StatisticsSection() {
  return (
    <section
      id="statistics"
      className="relative pt-36 pb-36 sm:pt-48 sm:pb-48 md:pt-64 md:pb-64 lg:pt-[360px] lg:pb-[360px] overflow-hidden section-light"
      aria-label="Research impact statistics"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-brand-mist" />
      <div className="absolute inset-0 grid-bg-light opacity-50 pointer-events-none" />
      <ParticleBackground />

      {/* Top & Bottom Ultra-Smooth Gradient Blends */}
      <div className="blend-fade-top-dark" aria-hidden="true" />
      <div className="blend-fade-bottom-dark" aria-hidden="true" />

      {/* Subtle ambient spotlight */}
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[600px] pointer-events-none opacity-20 blur-[130px]"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(10,104,68,0.18) 0%, rgba(10,104,68,0.04) 50%, transparent 75%)",
        }}
      />

      <div className="relative z-10 max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-12 sm:mb-16">
          <SectionHeading
            eyebrow="05 / DATA & CLINICAL METRICS"
            title="05 DATA & METRICS"
            titleAccent="QUANTIFIED SCIENTIFIC PROGRESS"
            subtitle="Built over four years of uninterrupted research, every metric reflects the platform's compound improvement."
            align="center"
            tone="light"
          />
        </div>

        {/* Stats grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-12 sm:mb-16"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          {stats.map((stat) => (
            <motion.div
              key={stat.label}
              variants={statCardVariant}
              className="bg-white rounded-xl border border-brand-mist-border p-5 sm:p-8 flex flex-col gap-3 sm:gap-4 group shadow-md hover:shadow-xl hover:border-[#0A6844]/40 transition-all duration-300 relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 right-0 h-1 bg-[#0A6844] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <StatCounter
                value={stat.value}
                suffix={stat.suffix}
                label={stat.label}
                duration={2400}
                tone="light"
              />

              <p className="text-xs sm:text-body-sm text-[#446554]">{stat.description}</p>

              <div className="mt-auto h-px bg-brand-mist-border group-hover:bg-[#0A6844]/40 transition-colors duration-500" />
            </motion.div>
          ))}
        </motion.div>

        {/* Research partners */}
        <RevealOnScroll>
          <div className="flex flex-col gap-4 sm:gap-6">
            <div className="flex items-center gap-3 sm:gap-4">
              <span className="font-mono text-[10px] sm:text-label uppercase tracking-widest text-[#0A6844] font-bold">
                Research Partners & Validated Institutions
              </span>
              <div className="flex-1 h-px bg-brand-mist-border" />
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
              {researchPartners.map((partner, i) => (
                <RevealOnScroll key={partner} delay={i * 0.05}>
                  <div className="bg-white/80 backdrop-blur-sm border border-brand-mist-border rounded-lg px-2.5 sm:px-6 py-2.5 sm:py-4 flex items-center justify-center hover:bg-white hover:border-[#0A6844]/50 hover:shadow-md transition-all duration-200 group">
                    <span className="font-mono text-[9.5px] sm:text-[11px] text-[#223E30] uppercase tracking-wider text-center font-semibold group-hover:text-[#0A6844] transition-colors duration-200 truncate">
                      {partner}
                    </span>
                  </div>
                </RevealOnScroll>
              ))}
            </div>
          </div>
        </RevealOnScroll>

        {/* Pipeline teaser */}
        <RevealOnScroll delay={0.2} className="mt-10 sm:mt-16">
          <div className="border border-brand-mist-border p-5 sm:p-8 rounded-xl flex flex-col md:flex-row gap-5 sm:gap-8 items-start md:items-center justify-between bg-white shadow-lg">
            <div className="flex flex-col gap-1.5 sm:gap-2">
              <span className="font-mono text-[10px] sm:text-label uppercase tracking-widest text-[#0A6844] font-bold">
                Active Pipeline
              </span>
              <h3 className="text-base sm:text-xl font-bold text-[#081C13] leading-snug">
                4 programs in IND-enabling studies.{" "}
                <span className="text-[#446554] font-normal block sm:inline mt-0.5 sm:mt-0">
                  2 oncology, 1 rare metabolic, 1 infectious disease.
                </span>
              </h3>
            </div>
            <div className="flex flex-wrap gap-2 sm:gap-3 items-center flex-shrink-0">
              {["Phase: IND-Enabling", "Phase: Lead Opt ×2", "Phase: Target ID"].map((phase, i) => (
                <div
                  key={i}
                  className="flex items-center gap-1.5 sm:gap-2 border border-brand-mist-border bg-brand-mist-soft/60 rounded px-2.5 sm:px-3 py-1.5 sm:py-2"
                >
                  <div
                    className={`w-1.5 h-1.5 rounded-full ${
                      i === 0 ? "bg-[#0A6844]" : "bg-[#CCE5D8]"
                    }`}
                  />
                  <span className="font-mono text-[9px] sm:text-[10px] text-[#223E30] uppercase tracking-wider whitespace-nowrap font-semibold">
                    {phase}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </RevealOnScroll>

        {/* Action Callout Banner */}
        <RevealOnScroll delay={0.3} className="mt-8 sm:mt-12">
          <div className="p-4 sm:p-6 md:p-8 border border-brand-mist-border bg-white shadow-xl rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-6">
            <div className="flex flex-col gap-1">
              <span className="font-mono text-xs uppercase tracking-widest text-[#0A6844] font-bold">
                SEEKING RESEARCH VALIDATION OR CLINICAL TRIALS CO-DEVELOPMENT?
              </span>
              <span className="text-xs sm:text-body-sm text-[#446554]">
                Access our validated dataset and explore joint preclinical pipeline development.
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
