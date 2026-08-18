"use client";

import { useState, useEffect, useRef, useCallback } from "react";

const GLYPHS = "ACGT0123456789_#@$%&";

interface BiotechScrambleWordProps {
  text: string;
  delayMs?: number;
  highlight?: boolean;
  className?: string;
}

export default function BiotechScrambleWord({
  text,
  delayMs = 0,
  highlight = false,
  className = "",
}: BiotechScrambleWordProps) {
  const [displayText, setDisplayText] = useState(text);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const startScramble = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);

    let iteration = 0;
    const maxIterations = text.length * 4;

    intervalRef.current = setInterval(() => {
      setDisplayText(() =>
        text
          .split("")
          .map((char, index) => {
            if (char === " " || char === ".") return char;
            if (index < iteration / 4) {
              return text[index];
            }
            return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
          })
          .join("")
      );

      iteration += 1;

      if (iteration >= maxIterations) {
        if (intervalRef.current) clearInterval(intervalRef.current);
        setDisplayText(text);
      }
    }, 30);
  }, [text]);

  useEffect(() => {
    const timer = setTimeout(() => {
      startScramble();
    }, delayMs);

    return () => {
      clearTimeout(timer);
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [delayMs, startScramble]);

  return (
    <span
      className={`inline-block transition-colors select-none ${
        highlight
          ? "text-gradient-accent drop-shadow-[0_0_20px_rgba(110,255,200,0.3)]"
          : "text-brand-white"
      } ${className}`}
    >
      {displayText}
    </span>
  );
}
