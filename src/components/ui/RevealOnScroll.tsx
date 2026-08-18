"use client";

import { motion, Variants } from "framer-motion";
import { cn } from "@/lib/utils";

interface RevealOnScrollProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  distance?: number;
  duration?: number;
  once?: boolean;
}

export function RevealOnScroll({
  children,
  className,
  delay = 0,
  direction = "up",
  distance = 30,
  duration = 0.7,
  once = true,
}: RevealOnScrollProps) {
  const directionMap: Record<string, { x?: number; y?: number }> = {
    up: { y: distance },
    down: { y: -distance },
    left: { x: distance },
    right: { x: -distance },
    none: {},
  };

  const initial = { opacity: 0, ...directionMap[direction] };
  const animate = { opacity: 1, x: 0, y: 0 };

  const variants: Variants = {
    hidden: initial,
    visible: {
      ...animate,
      transition: {
        duration,
        delay,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  return (
    <motion.div
      className={cn(className)}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: "-60px" }}
    >
      {children}
    </motion.div>
  );
}
