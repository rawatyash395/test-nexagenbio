"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * Section navigation links & metadata
 */
const navigationSections = [
  { id: "hero", href: "#hero", code: "00", label: "INTRODUCTION", sub: "Molecular Frontier" },
  { id: "about", href: "#about", code: "01", label: "AUDIT", sub: "Platform Science" },
  { id: "technology", href: "#technology", code: "02", label: "CONSULTING", sub: "Workflow Engine" },
  { id: "process", href: "#process", code: "03", label: "TRAINING", sub: "Pipeline Accelerator" },
  { id: "capabilities", href: "#capabilities", code: "04", label: "PROJECT MGMT", sub: "Core Capabilities" },
  { id: "statistics", href: "#statistics", code: "05", label: "DATA & METRICS", sub: "Clinical Impact" },
  { id: "lnp-simulator", href: "#lnp-simulator", code: "06", label: "LNP SIMULATOR", sub: "pH-Responsive Release" },
  { id: "publications", href: "#publications", code: "07", label: "RESEARCH DOSSIERS", sub: "Peer-Reviewed" },
  { id: "contact", href: "#contact", code: "08", label: "GET IN TOUCH", sub: "Partner With Us" },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("#hero");
  const [hoveredSection, setHoveredSection] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isHeaderLight, setIsHeaderLight] = useState(false);
  const [isPaginationLight, setIsPaginationLight] = useState(false);

  const updateActiveSection = useCallback(() => {
    const scrollY = window.scrollY;
    setScrolled(scrollY > 30);

    // Detect if header or pagination are currently over a light-tone section
    const lightSections = document.querySelectorAll(".section-light");
    let headerLight = false;
    let paginationLight = false;
    const midY = window.innerHeight * 0.5;

    lightSections.forEach((el) => {
      const rect = el.getBoundingClientRect();
      if (rect.top <= -120 && rect.bottom >= 120) {
        headerLight = true;
      }
      if (rect.top <= midY - 80 && rect.bottom >= midY + 80) {
        paginationLight = true;
      }
    });

    setIsHeaderLight(headerLight);
    setIsPaginationLight(paginationLight);

    if (scrollY < 140) {
      setActiveSection("#hero");
      return;
    }

    if (window.innerHeight + scrollY >= document.documentElement.scrollHeight - 200) {
      setActiveSection("#contact");
      return;
    }

    const probeY = window.innerHeight * 0.45;
    let current = navigationSections[0].href;

    for (const link of navigationSections) {
      const el = document.getElementById(link.id);
      if (el) {
        const container = (el.closest(".pin-spacer") as HTMLElement) || el;
        const rect = container.getBoundingClientRect();
        if (rect.top <= probeY) {
          current = link.href;
        }
      }
    }

    setActiveSection(current);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", updateActiveSection, { passive: true });
    window.addEventListener("resize", updateActiveSection, { passive: true });
    updateActiveSection();
    return () => {
      window.removeEventListener("scroll", updateActiveSection);
      window.removeEventListener("resize", updateActiveSection);
    };
  }, [updateActiveSection]);

  const scrollTo = (href: string) => {
    const id = href.replace("#", "");
    const el = document.getElementById(id);
    if (el) {
      const container = (el.closest(".pin-spacer") as HTMLElement) || el;
      container.scrollIntoView({ behavior: "smooth" });
    }
    setMobileOpen(false);
  };

  const displayedItem =
    navigationSections.find((s) => s.href === (hoveredSection || activeSection)) || navigationSections[0];

  return (
    <>
      {/* Top Navigation Bar: Responsive down to 320px */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? isHeaderLight
              ? "py-3 sm:py-4 bg-[#EBF5F0]/90 backdrop-blur-xl border-b border-[#CCE5D8] shadow-[0_4px_20px_rgba(10,104,68,0.06)]"
              : "py-3 sm:py-4 bg-[#0A0E0C]/85 backdrop-blur-xl border-b border-white/10 shadow-[0_4px_20px_rgba(0,0,0,0.5)]"
            : "py-4 sm:py-6 lg:py-8 bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-3.5 sm:px-6 md:px-10 flex items-center justify-between">
          {/* Brand Logo */}
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              scrollTo("#hero");
            }}
            className="flex items-center gap-2.5 sm:gap-3.5 group cursor-pointer"
          >
            <div
              className={`w-8 h-8 sm:w-9 sm:h-9 border rounded flex items-center justify-center p-1 overflow-hidden transition-all ${
                isHeaderLight
                  ? "border-[#0A6844] bg-[#0A6844]/5 group-hover:border-[#081C13] shadow-sm"
                  : "border-[#6EFFC8]/40 bg-white/[0.03] group-hover:border-[#6EFFC8] shadow-[0_0_12px_rgba(110,255,200,0.15)]"
              }`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/bio-cursor-cell-light.png"
                alt="NexaGen Bio"
                className="w-full h-full object-contain select-none"
              />
            </div>

            <div className="flex flex-col">
              <span
                className={`font-mono text-xs sm:text-sm md:text-base font-bold tracking-wider transition-colors uppercase ${
                  isHeaderLight
                    ? "text-[#081C13] group-hover:text-[#0A6844]"
                    : "text-[#E6F6ED] group-hover:text-[#6EFFC8]"
                }`}
              >
                NexaGen
              </span>
              <span
                className={`font-mono text-[8px] sm:text-[9px] tracking-[0.2em] uppercase -mt-0.5 transition-colors ${
                  isHeaderLight ? "text-[#446554]" : "text-[#E6F6ED]/50"
                }`}
              >
                Life Science
              </span>
            </div>
          </a>

          {/* Action CTA */}
          <div className="flex items-center gap-2 sm:gap-4">
            <button
              onClick={() => scrollTo("#contact")}
              className={`hidden sm:flex px-3.5 sm:px-4 py-1.5 sm:py-2 border rounded text-[11px] sm:text-xs font-mono tracking-widest transition-all items-center gap-2 group cursor-pointer ${
                isHeaderLight
                  ? "border-[#0A6844] text-[#0A6844] hover:bg-[#0A6844] hover:text-white shadow-sm font-semibold"
                  : "border-[#E6F6ED]/60 text-[#E6F6ED] hover:border-[#6EFFC8] hover:text-[#6EFFC8] hover:bg-[#6EFFC8]/10"
              }`}
            >
              <span>CONTACT US</span>
              <svg
                width="7"
                height="10"
                viewBox="0 0 7 10"
                fill="none"
                className={`transition-colors ${
                  isHeaderLight
                    ? "text-[#0A6844] group-hover:text-white"
                    : "text-[#E6F6ED] group-hover:text-[#6EFFC8]"
                }`}
              >
                <rect x="0.8" width="2" height="2" fill="currentColor" fillOpacity="0.9" />
                <rect x="2.8" y="2" width="2" height="2" fill="currentColor" fillOpacity="0.9" />
                <rect x="4.8" y="4" width="2" height="2" fill="currentColor" fillOpacity="0.9" />
                <rect x="2.8" y="6" width="2" height="2" fill="currentColor" fillOpacity="0.9" />
                <rect x="0.8" y="8" width="2" height="2" fill="currentColor" fillOpacity="0.9" />
              </svg>
            </button>

            {/* Mobile Menu Hamburger Button */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className={`md:hidden p-2 rounded-lg border transition-colors ${
                isHeaderLight
                  ? "border-[#CCE5D8] text-[#081C13] bg-white/50 hover:text-[#0A6844]"
                  : "border-white/10 text-[#E6F6ED] bg-white/[0.04] hover:text-[#6EFFC8]"
              }`}
              aria-label="Toggle menu"
            >
              <svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.75">
                {mobileOpen ? <path d="M4 4 L16 16 M4 16 L16 4" /> : <path d="M3 6 H17 M3 10 H17 M3 14 H17" />}
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Right-Side Vertical Pagination (Desktop) */}
      <aside
        className="fixed right-6 sm:right-8 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col items-end pointer-events-auto"
        aria-label="Page navigation"
      >
        <div className="flex flex-col items-center gap-3">
          {navigationSections.map((section) => {
            const isActive = activeSection === section.href;
            const isHovered = hoveredSection === section.href;

            return (
              <button
                key={section.id}
                onClick={() => scrollTo(section.href)}
                onMouseEnter={() => setHoveredSection(section.href)}
                onMouseLeave={() => setHoveredSection(null)}
                className="group relative flex items-center justify-center w-6 h-6 cursor-pointer focus:outline-none"
                aria-label={`Scroll to ${section.label}`}
              >
                {isActive ? (
                  <div
                    className={`w-4 h-4 border flex items-center justify-center transition-all ${
                      isPaginationLight
                        ? "border-[#081C13] shadow-[0_0_8px_rgba(10,104,68,0.25)]"
                        : "border-[#E6F6ED] group-hover:border-[#6EFFC8] group-hover:shadow-[0_0_10px_rgba(110,255,200,0.4)]"
                    }`}
                  >
                    <div
                      className={`w-1.5 h-1.5 transition-colors ${
                        isPaginationLight ? "bg-[#0A6844]" : "bg-[#E6F6ED] group-hover:bg-[#6EFFC8]"
                      }`}
                    />
                  </div>
                ) : (
                  <div
                    className={`w-1.5 h-1.5 transition-all duration-200 ${
                      isPaginationLight
                        ? "bg-[#081C13]/35 group-hover:bg-[#0A6844] group-hover:scale-125"
                        : "bg-[#E6F6ED]/40 group-hover:bg-[#6EFFC8] group-hover:scale-125"
                    }`}
                  />
                )}

                {isHovered && (
                  <div
                    className={`absolute right-8 top-1/2 -translate-y-1/2 px-2.5 py-1 rounded border shadow-lg backdrop-blur-md pointer-events-none whitespace-nowrap z-50 ${
                      isPaginationLight
                        ? "bg-[#EBF5F0]/95 border-[#CCE5D8] text-[#081C13]"
                        : "bg-[#0A0E0C]/95 border-white/20 text-[#E6F6ED]"
                    }`}
                  >
                    <div className="font-mono text-[10px] font-bold tracking-wider flex items-center gap-1.5">
                      <span className={isPaginationLight ? "text-[#0A6844]" : "text-[#6EFFC8]"}>{section.code}</span>
                      <span>{section.label}</span>
                    </div>
                  </div>
                )}
              </button>
            );
          })}
        </div>

        <div className="mt-4 text-right pr-1">
          <AnimatePresence mode="wait">
            <motion.div
              key={displayedItem.href}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.15 }}
              className="flex flex-col items-end"
            >
              <span
                className={`font-mono text-[10px] tracking-[0.2em] uppercase block transition-colors ${
                  hoveredSection
                    ? isPaginationLight
                      ? "text-[#0A6844] font-bold"
                      : "text-[#6EFFC8] font-bold"
                    : isPaginationLight
                    ? "text-[#081C13] font-bold"
                    : "text-[#E6F6ED]/80"
                }`}
              >
                {displayedItem.label}
              </span>
              <span
                className={`font-mono text-[8px] tracking-[0.15em] uppercase block transition-colors ${
                  isPaginationLight ? "text-[#446554]" : "text-[#E6F6ED]/40"
                }`}
              >
                {displayedItem.sub}
              </span>
            </motion.div>
          </AnimatePresence>
        </div>
      </aside>

      {/* Mobile Drawer Menu (Responsive down to 320px) */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-50 bg-[#0A0E0C]/98 backdrop-blur-2xl p-4 sm:p-6 flex flex-col justify-between overflow-y-auto md:hidden"
          >
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <span className="font-mono text-xs tracking-widest text-[#E6F6ED] font-bold">NEXAGEN // NAVIGATION</span>
              <button
                onClick={() => setMobileOpen(false)}
                className="p-2 rounded-lg border border-white/10 text-[#E6F6ED] hover:text-[#6EFFC8]"
                aria-label="Close menu"
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.75">
                  <path d="M4 4 L16 16 M4 16 L16 4" />
                </svg>
              </button>
            </div>

            <nav className="flex flex-col gap-2 my-auto py-6" aria-label="Mobile Navigation">
              {navigationSections.map((section) => {
                const isActive = activeSection === section.href;
                return (
                  <a
                    key={section.id}
                    href={section.href}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollTo(section.href);
                    }}
                    className={`flex items-center justify-between py-3 px-3.5 rounded-lg border transition-all ${
                      isActive
                        ? "bg-[#6EFFC8]/10 border-[#6EFFC8]/40 text-[#6EFFC8]"
                        : "bg-white/[0.02] border-transparent text-[#E6F6ED]/70 hover:text-[#E6F6ED] hover:border-white/10"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-xs text-[#6EFFC8]/80">{section.code}</span>
                      <span className="font-mono text-xs font-semibold tracking-wider">{section.label}</span>
                    </div>
                    <span className="font-mono text-[9px] text-[#E6F6ED]/40 uppercase">{section.sub}</span>
                  </a>
                );
              })}
            </nav>

            <div className="pt-4 border-t border-white/10 flex flex-col gap-3">
              <button
                onClick={() => scrollTo("#contact")}
                className="w-full py-3 bg-[#6EFFC8] text-[#0A0E0C] font-mono text-xs font-bold tracking-widest uppercase rounded flex items-center justify-center gap-2 shadow-lg"
              >
                <span>CONTACT US</span>
                <span className="text-sm">→</span>
              </button>
              <div className="flex justify-between items-center text-[9px] font-mono text-[#E6F6ED]/40">
                <span>LATITUDE: 37.7749° N</span>
                <span>STATUS: OPERATIONAL</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
