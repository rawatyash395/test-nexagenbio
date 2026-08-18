"use client";

import { useEffect, useRef, useState } from "react";

interface UseCountUpOptions {
  end: number;
  duration?: number;
  start?: number;
  decimals?: number;
  enabled?: boolean;
}

export function useCountUp({
  end,
  duration = 2000,
  start = 0,
  decimals = 0,
  enabled = true,
}: UseCountUpOptions): string {
  const [value, setValue] = useState<number>(start);
  const frameRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);

  useEffect(() => {
    if (!enabled) {
      setValue(end);
      return;
    }

    const easeOutQuart = (t: number): number => 1 - Math.pow(1 - t, 4);

    const animate = (timestamp: number) => {
      if (!startTimeRef.current) {
        startTimeRef.current = timestamp;
      }

      const elapsed = timestamp - startTimeRef.current;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeOutQuart(progress);
      const current = start + (end - start) * easedProgress;

      setValue(current);

      if (progress < 1) {
        frameRef.current = requestAnimationFrame(animate);
      }
    };

    frameRef.current = requestAnimationFrame(animate);

    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
      startTimeRef.current = null;
    };
  }, [end, duration, start, enabled]);

  return value.toFixed(decimals);
}
