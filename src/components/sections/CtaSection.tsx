"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";

export default function CtaSection() {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["5%", "-5%"]);

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative overflow-hidden pt-24 sm:pt-28 lg:pt-36 pb-16 sm:pb-20 lg:pb-28 bg-brand-black"
      aria-label="Contact and demo request"
    >
      {/* Ambient background with Emerald Aurora */}
      <motion.div className="absolute inset-0 pointer-events-none" style={{ y: bgY }}>
        <div className="absolute inset-0 bg-brand-black" />
        <div className="absolute inset-0 grid-bg opacity-20" />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[500px] rounded-full pointer-events-none opacity-20 blur-[130px]"
          style={{
            background: "radial-gradient(ellipse at center, #6EFFC8 0%, rgba(77,201,155,0.2) 45%, transparent 75%)",
          }}
        />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-accent/30 to-transparent" />
      </motion.div>

      <div className="relative z-10 max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
        <div className="grid lg:grid-cols-[1.1fr_auto] gap-8 lg:gap-20 items-start">
          {/* Left: headline and description */}
          <div className="flex flex-col gap-5 sm:gap-6">
            <RevealOnScroll>
              <div className="flex items-center gap-3">
                <span className="h-px w-8 bg-brand-accent opacity-70" />
                <span className="font-mono text-[10px] sm:text-label uppercase tracking-widest text-brand-accent font-medium">
                  06 / GET IN TOUCH
                </span>
              </div>
            </RevealOnScroll>

            <RevealOnScroll delay={0.1}>
              <h2 className="text-display-lg font-semibold text-brand-white leading-tight text-balance">
                06 GET IN TOUCH -{" "}
                <span className="text-gradient-accent">ACCELERATE</span> YOUR THERAPEUTIC PROGRAM.
              </h2>
            </RevealOnScroll>

            <RevealOnScroll delay={0.2}>
              <p className="text-sm sm:text-base lg:text-body-lg text-brand-white-muted max-w-xl leading-relaxed">
                Whether you&apos;re a biotech advancing a first-in-class mRNA therapeutic or a global biopharma seeking a high-potency delivery formulation, our automated discovery platform integrates seamlessly with your existing targets.
              </p>
            </RevealOnScroll>

            {/* CTAs */}
            <RevealOnScroll delay={0.3}>
              <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 pt-2">
                <Button variant="primary" size="lg" href="#contact-form" className="w-full sm:w-auto justify-center">
                  <span>Request Platform Demo</span>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Button>
                <Button variant="ghost" size="lg" href="mailto:science@nexagenbio.com" className="w-full sm:w-auto justify-center">
                  <span>Talk to a Scientist</span>
                </Button>
              </div>
            </RevealOnScroll>

            {/* Trust indicators */}
            <RevealOnScroll delay={0.4}>
              <div className="flex flex-wrap gap-4 sm:gap-6 pt-5 sm:pt-6 border-t border-brand-black-border">
                {[
                  "Response within 24h",
                  "NDA available",
                  "Program fit call - 30 min",
                  "GMP Tech Transfer",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-brand-accent shadow-[0_0_6px_#6EFFC8] flex-shrink-0" />
                    <span className="font-mono text-[11px] sm:text-xs text-brand-white-muted tracking-wide">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </RevealOnScroll>
          </div>

          {/* Right: contact form UI */}
          <RevealOnScroll delay={0.2} direction="left" className="w-full">
            <div
              id="contact-form"
              className="w-full max-w-full lg:w-[420px] rounded-2xl border border-brand-accent/30 bg-brand-black-card/95 p-4 sm:p-6 lg:p-8 flex flex-col gap-4 sm:gap-6 shadow-2xl backdrop-blur-xl"
              aria-label="Contact form"
            >
              <div className="flex items-center justify-between border-b border-brand-accent/15 pb-3">
                <h3 className="text-base sm:text-lg font-bold text-brand-white">Get in Touch</h3>
                <span className="font-mono text-[9px] sm:text-[10px] text-brand-accent font-bold px-2 py-0.5 rounded bg-brand-accent/10 border border-brand-accent/30">
                  [256-BIT SECURE]
                </span>
              </div>

              <div className="flex flex-col gap-3.5 sm:gap-4">
                {[
                  { label: "Full name", type: "text", placeholder: "Dr. Jane Smith", id: "name" },
                  { label: "Institution / Company", type: "text", placeholder: "Acme Therapeutics", id: "company" },
                  { label: "Work email", type: "email", placeholder: "jane@company.com", id: "email" },
                ].map((field) => (
                  <div key={field.id} className="flex flex-col gap-1.5">
                    <label
                      htmlFor={field.id}
                      className="font-mono text-[11px] sm:text-xs text-brand-white-muted uppercase tracking-wider font-semibold"
                    >
                      {field.label}
                    </label>
                    <input
                      id={field.id}
                      type={field.type}
                      placeholder={field.placeholder}
                      className="bg-brand-black border border-brand-black-border rounded-xl px-3.5 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm text-brand-white placeholder:text-brand-white-muted/40 focus:outline-none focus:border-brand-accent/60 focus:ring-1 focus:ring-brand-accent/30 transition-all"
                      aria-label={field.label}
                    />
                  </div>
                ))}

                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="interest"
                    className="font-mono text-[11px] sm:text-xs text-brand-white-muted uppercase tracking-wider font-semibold"
                  >
                    Area of interest
                  </label>
                  <select
                    id="interest"
                    className="bg-brand-black border border-brand-black-border rounded-xl px-3.5 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm text-brand-white focus:outline-none focus:border-brand-accent/60 focus:ring-1 focus:ring-brand-accent/30 transition-all appearance-none cursor-pointer"
                    aria-label="Area of interest"
                  >
                    <option value="">Select program area</option>
                    <option>mRNA Sequence Design</option>
                    <option>LNP Formulation & Synthesis</option>
                    <option>Full Platform Partnership</option>
                    <option>Research Collaboration</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 sm:py-3.5 rounded-xl bg-brand-accent text-brand-black font-mono text-[11px] sm:text-xs uppercase tracking-widest font-bold shadow-[0_0_20px_rgba(110,255,200,0.3)] hover:shadow-[0_0_28px_rgba(110,255,200,0.5)] hover:bg-[#85ffd2] transition-all cursor-pointer text-center"
              >
                Submit Partnership Inquiry
              </button>

              <p className="font-mono text-[9px] sm:text-[10px] text-brand-white-muted/50 text-center leading-relaxed">
                By submitting, you agree to NexaGen Bio&apos;s privacy policy.
                <br />
                Your data is stored securely and never shared.
              </p>
            </div>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
}
