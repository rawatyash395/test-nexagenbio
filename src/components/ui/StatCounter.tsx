"use client";

import { useRef } from "react";
import { useInView } from "framer-motion";
import { useCountUp } from "@/hooks/useCountUp";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/utils";

interface StatCounterProps {
  value: number;
  suffix?: string;
  prefix?: string;
  label: string;
  decimals?: number;
  duration?: number;
  className?: string;
  tone?: "dark" | "light";
}

export function StatCounter({
  value,
  suffix = "",
  prefix = "",
  label,
  decimals = 0,
  duration = 2200,
  className,
  tone = "dark",
}: StatCounterProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const prefersReduced = useReducedMotion();
  const isLight = tone === "light";

  const count = useCountUp({
    end: value,
    duration: prefersReduced ? 0 : duration,
    decimals,
    enabled: isInView,
  });

  return (
    <div ref={ref} className={cn("flex flex-col gap-2", className)}>
      <div className="flex items-baseline gap-1">
        {prefix && (
          <span
            className={cn(
              "font-mono text-display-md font-medium",
              isLight ? "text-[#0A6844]" : "text-brand-accent"
            )}
          >
            {prefix}
          </span>
        )}
        <span
          className={cn(
            "text-display-md font-semibold tabular-nums",
            isLight ? "text-[#081C13]" : "text-brand-white"
          )}
        >
          {count}
        </span>
        {suffix && (
          <span
            className={cn(
              "font-mono text-display-md font-medium",
              isLight ? "text-[#0A6844]" : "text-brand-accent"
            )}
          >
            {suffix}
          </span>
        )}
      </div>
      <p
        className={cn(
          "font-mono text-label uppercase tracking-wider",
          isLight ? "text-[#446554]" : "text-brand-white-muted"
        )}
      >
        {label}
      </p>
    </div>
  );
}
