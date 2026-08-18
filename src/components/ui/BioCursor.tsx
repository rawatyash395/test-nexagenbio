"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * BioCursor - Precision Concentric Bio-Cursor.
 * Central dot and outer membrane are 100% concentric.
 * Trailing tail consists of 3 filled dots in decreasing size order.
 */
export default function BioCursor() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [hoverLabel, setHoverLabel] = useState("");
  const [isHover, setIsHover] = useState(false);
  const [isLight, setIsLight] = useState(false);
  const [tooltipPos, setTooltipPos] = useState({ x: -200, y: -200 });
  const [visible, setVisible] = useState(false);

  // References for animation loop
  const mouse = useRef({ x: -200, y: -200 });
  const cursor = useRef({ x: -200, y: -200 });
  const isHoverRef = useRef(false);
  const isLightRef = useRef(false);
  const isClickingRef = useRef(false);
  const isVisibleRef = useRef(false);

  // Exactly 3 trailing dots coordinates
  const tailDots = useRef([
    { x: -200, y: -200, radius: 2.8, opacity: 0.65, lerp: 0.32 },
    { x: -200, y: -200, radius: 2.0, opacity: 0.45, lerp: 0.24 },
    { x: -200, y: -200, radius: 1.2, opacity: 0.25, lerp: 0.16 },
  ]);

  // Animated properties
  const ringRadius = useRef(14);
  const dotRadius = useRef(3.5);
  const ringOpacity = useRef(0.45);
  const pulsePhase = useRef(0);

  useEffect(() => {
    // Detect touch / coarse pointer devices
    const isTouch = window.matchMedia("(hover: none) and (pointer: coarse)").matches;
    if (isTouch) {
      setIsTouchDevice(true);
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    // Handle canvas high-DPI scaling
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let width = window.innerWidth;
    let height = window.innerHeight;

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
    };

    resize();
    window.addEventListener("resize", resize);

    // Mouse movement handler
    const onMouseMove = (e: MouseEvent) => {
      const x = e.clientX;
      const y = e.clientY;

      mouse.current = { x, y };

      if (!isVisibleRef.current) {
        isVisibleRef.current = true;
        setVisible(true);
        cursor.current = { x, y };
        tailDots.current.forEach((d) => {
          d.x = x;
          d.y = y;
        });
      }

      // Check hover targets and background tone
      const target = e.target as HTMLElement | null;
      if (target) {
        const hoverEl = target.closest("[data-cursor-hover], a, button, input, [role='button']");
        const hovering = !!hoverEl;
        isHoverRef.current = hovering;
        setIsHover(hovering);

        const labelText = hoverEl?.getAttribute("data-cursor-label") ?? "";
        setHoverLabel(labelText);

        const lightSection = target.closest(".section-light, [data-tone='light']");
        const lighting = !!lightSection;
        isLightRef.current = lighting;
        setIsLight(lighting);
      }
    };

    const onMouseDown = () => {
      isClickingRef.current = true;
    };

    const onMouseUp = () => {
      isClickingRef.current = false;
    };

    const onMouseLeave = () => {
      isVisibleRef.current = false;
      setVisible(false);
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("mousedown", onMouseDown, { passive: true });
    window.addEventListener("mouseup", onMouseUp, { passive: true });
    document.addEventListener("mouseleave", onMouseLeave);

    // 60-120fps physics render loop
    let rafId: number;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (isVisibleRef.current && mouse.current.x > 0 && mouse.current.y > 0) {
        // 1. Smooth cursor focal center (spring lag)
        const lerpFactor = isHoverRef.current ? 0.35 : 0.28;
        cursor.current.x += (mouse.current.x - cursor.current.x) * lerpFactor;
        cursor.current.y += (mouse.current.y - cursor.current.y) * lerpFactor;

        // Update tooltip position for React state
        setTooltipPos({ x: cursor.current.x, y: cursor.current.y });

        // 2. Update 3 trailing dots in cascading order
        const dots = tailDots.current;
        // Dot 1 follows cursor
        dots[0].x += (cursor.current.x - dots[0].x) * dots[0].lerp;
        dots[0].y += (cursor.current.y - dots[0].y) * dots[0].lerp;

        // Dot 2 follows Dot 1
        dots[1].x += (dots[0].x - dots[1].x) * dots[1].lerp;
        dots[1].y += (dots[0].y - dots[1].y) * dots[1].lerp;

        // Dot 3 follows Dot 2
        dots[2].x += (dots[1].x - dots[2].x) * dots[2].lerp;
        dots[2].y += (dots[1].y - dots[2].y) * dots[2].lerp;

        // Pulse phase animation
        pulsePhase.current += 0.04;
        const subtleBreathing = Math.sin(pulsePhase.current) * 1.0;

        // Animate ring radius and dot radius based on state
        const targetRingRadius = isClickingRef.current
          ? 10
          : isHoverRef.current
          ? 22
          : 15 + subtleBreathing;

        const targetDotRadius = isClickingRef.current
          ? 2.0
          : isHoverRef.current
          ? 2.4
          : 3.5;

        const targetRingOpacity = isHoverRef.current ? 0.85 : 0.4;

        ringRadius.current += (targetRingRadius - ringRadius.current) * 0.22;
        dotRadius.current += (targetDotRadius - dotRadius.current) * 0.25;
        ringOpacity.current += (targetRingOpacity - ringOpacity.current) * 0.2;

        const isLt = isLightRef.current;
        const cx = cursor.current.x * dpr;
        const cy = cursor.current.y * dpr;

        // Color definitions
        const primaryColor = isLt ? "#0A6844" : "#6EFFC8";
        const darkDotColor = isLt ? "#081C13" : "#6EFFC8";

        // ─────────────────────────────────────────────────────────────
        // A. Render 3 Trailing Filled Dots (Decreasing Size Order)
        // ─────────────────────────────────────────────────────────────
        for (let i = 0; i < dots.length; i++) {
          const d = dots[i];
          const distToCursor = Math.hypot(d.x - cursor.current.x, d.y - cursor.current.y);

          // Only render trailing dots if moving or separated
          if (distToCursor > 0.8) {
            ctx.save();
            ctx.beginPath();
            ctx.arc(d.x * dpr, d.y * dpr, d.radius * dpr, 0, Math.PI * 2);
            ctx.fillStyle = isLt
              ? `rgba(10, 104, 68, ${d.opacity})`
              : `rgba(110, 255, 200, ${d.opacity})`;
            ctx.shadowColor = primaryColor;
            ctx.shadowBlur = 4 * dpr;
            ctx.fill();
            ctx.restore();
          }
        }

        // ─────────────────────────────────────────────────────────────
        // B. Render Concentric Bioluminescent Outer Membrane & Aura
        // ─────────────────────────────────────────────────────────────
        const currR = ringRadius.current * dpr;

        // 1. Ethereal Ambient Aura Halo (Smooth Background Fusion)
        ctx.save();
        const auraRadius = currR * 2.2;
        const auraGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, auraRadius);
        if (isLt) {
          auraGrad.addColorStop(0, isHoverRef.current ? "rgba(10, 104, 68, 0.16)" : "rgba(10, 104, 68, 0.08)");
          auraGrad.addColorStop(0.5, isHoverRef.current ? "rgba(10, 104, 68, 0.05)" : "rgba(10, 104, 68, 0.02)");
          auraGrad.addColorStop(1, "rgba(10, 104, 68, 0)");
        } else {
          auraGrad.addColorStop(0, isHoverRef.current ? "rgba(110, 255, 200, 0.22)" : "rgba(110, 255, 200, 0.12)");
          auraGrad.addColorStop(0.5, isHoverRef.current ? "rgba(110, 255, 200, 0.06)" : "rgba(110, 255, 200, 0.03)");
          auraGrad.addColorStop(1, "rgba(110, 255, 200, 0)");
        }
        ctx.fillStyle = auraGrad;
        ctx.beginPath();
        ctx.arc(cx, cy, auraRadius, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        // 2. Concentric Outer Membrane Ring
        ctx.save();
        ctx.beginPath();
        ctx.arc(cx, cy, currR, 0, Math.PI * 2);
        ctx.strokeStyle = isLt
          ? `rgba(10, 104, 68, ${ringOpacity.current})`
          : `rgba(110, 255, 200, ${ringOpacity.current})`;
        ctx.lineWidth = (isHoverRef.current ? 1.5 : 1.1) * dpr;

        if (isHoverRef.current) {
          ctx.setLineDash([4 * dpr, 3 * dpr]);
        }

        ctx.shadowColor = primaryColor;
        ctx.shadowBlur = (isHoverRef.current ? 12 : 6) * dpr;
        ctx.stroke();
        ctx.restore();

        // 3. Inner Secondary Reticle Ring (when hovering)
        if (isHoverRef.current) {
          ctx.save();
          ctx.beginPath();
          ctx.arc(cx, cy, currR * 0.55, 0, Math.PI * 2);
          ctx.strokeStyle = isLt ? "rgba(10, 104, 68, 0.3)" : "rgba(110, 255, 200, 0.35)";
          ctx.lineWidth = 0.8 * dpr;
          ctx.stroke();

          // 4 Tactical Crosshair Tick Marks
          const tickLen = 4 * dpr;
          const tickGap = currR + 2 * dpr;
          ctx.strokeStyle = isLt ? "#0A6844" : "#6EFFC8";
          ctx.lineWidth = 1.4 * dpr;

          // Top
          ctx.beginPath();
          ctx.moveTo(cx, cy - tickGap);
          ctx.lineTo(cx, cy - tickGap - tickLen);
          ctx.stroke();

          // Bottom
          ctx.beginPath();
          ctx.moveTo(cx, cy + tickGap);
          ctx.lineTo(cx, cy + tickGap + tickLen);
          ctx.stroke();

          // Left
          ctx.beginPath();
          ctx.moveTo(cx - tickGap, cy);
          ctx.lineTo(cx - tickGap - tickLen, cy);
          ctx.stroke();

          // Right
          ctx.beginPath();
          ctx.moveTo(cx + tickGap, cy);
          ctx.lineTo(cx + tickGap + tickLen, cy);
          ctx.stroke();

          ctx.restore();
        }

        // ─────────────────────────────────────────────────────────────
        // C. Precision Central Dot (100% Concentric & Centered)
        // ─────────────────────────────────────────────────────────────
        const currDotR = dotRadius.current * dpr;
        ctx.save();
        ctx.beginPath();
        ctx.arc(cx, cy, currDotR, 0, Math.PI * 2);
        ctx.fillStyle = darkDotColor;
        ctx.shadowColor = primaryColor;
        ctx.shadowBlur = (isHoverRef.current ? 10 : 6) * dpr;
        ctx.fill();

        // Delicate inner core accent
        if (isLt) {
          ctx.strokeStyle = "rgba(10, 104, 68, 0.8)";
          ctx.lineWidth = 0.8 * dpr;
          ctx.stroke();
        }
        ctx.restore();
      }

      rafId = requestAnimationFrame(render);
    };

    rafId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      document.removeEventListener("mouseleave", onMouseLeave);
      cancelAnimationFrame(rafId);
    };
  }, []);

  if (isTouchDevice) return null;

  return (
    <>
      {/* Hide native browser cursor on fine pointer devices */}
      <style>{`
        @media (hover: hover) and (pointer: fine) {
          * { cursor: none !important; }
        }
      `}</style>

      {/* Full-Screen Hardware-Accelerated 2D Canvas */}
      <canvas
        ref={canvasRef}
        className="pointer-events-none fixed inset-0 z-[9999999] hidden md:block select-none"
        aria-hidden="true"
      />

      {/* Floating Dynamic Contextual Telemetry Tooltip */}
      <AnimatePresence>
        {visible && isHover && hoverLabel && (
          <motion.div
            initial={{ opacity: 0, y: -4, scale: 0.88 }}
            animate={{ opacity: 1, y: 6, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.88 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            style={{
              position: "fixed",
              left: tooltipPos.x + 14,
              top: tooltipPos.y + 14,
              pointerEvents: "none",
              zIndex: 10000000,
            }}
            className={`font-mono text-[9px] uppercase tracking-widest px-2.5 py-1 rounded-md whitespace-nowrap shadow-lg backdrop-blur-md transition-colors duration-300 flex items-center gap-1.5 ${
              isLight
                ? "text-[#081C13] bg-white/95 border border-[#CCE5D8] shadow-[0_4px_16px_rgba(10,104,68,0.12)]"
                : "text-[#6EFFC8] bg-[#0A0E0C]/90 border border-[#6EFFC8]/40 shadow-[0_4px_20px_rgba(0,0,0,0.6)]"
            }`}
          >
            <span
              className={`w-1 h-1 rounded-full animate-pulse ${
                isLight ? "bg-[#0A6844]" : "bg-[#6EFFC8]"
              }`}
            />
            <span>{hoverLabel}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
