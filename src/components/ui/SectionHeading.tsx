"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  titleAccent?: string;
  subtitle?: string;
  align?: "left" | "center" | "right";
  className?: string;
  tone?: "dark" | "light";
}

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

export function SectionHeading({
  eyebrow,
  title,
  titleAccent,
  subtitle,
  align = "left",
  className,
  tone = "dark",
}: SectionHeadingProps) {
  const isLight = tone === "light";

  return (
    <motion.div
      className={cn(
        "flex flex-col gap-4",
        align === "center" && "items-center text-center",
        align === "right" && "items-end text-right",
        className
      )}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
    >
      {eyebrow && (
        <motion.div variants={itemVariants} className="flex items-center gap-3">
          {align !== "right" && (
            <span
              className={cn(
                "h-px w-8",
                isLight ? "bg-[#0A6844] opacity-90" : "bg-brand-accent opacity-70"
              )}
            />
          )}
          <span
            className={cn(
              "font-mono text-label uppercase tracking-widest font-bold",
              isLight ? "text-[#0A6844]" : "text-brand-accent opacity-80"
            )}
          >
            {eyebrow}
          </span>
          {align === "right" && (
            <span
              className={cn(
                "h-px w-8",
                isLight ? "bg-[#0A6844] opacity-90" : "bg-brand-accent opacity-70"
              )}
            />
          )}
        </motion.div>
      )}

      <motion.h2
        variants={itemVariants}
        className={cn(
          "text-display-md font-semibold text-balance leading-tight",
          isLight ? "text-[#081C13]" : "text-brand-white"
        )}
      >
        {title}
        {titleAccent && (
          <>
            {" "}
            <span className={isLight ? "text-gradient-accent-dark" : "text-gradient-accent"}>
              {titleAccent}
            </span>
          </>
        )}
      </motion.h2>

      {subtitle && (
        <motion.p
          variants={itemVariants}
          className={cn(
            "text-body-lg max-w-xl",
            isLight ? "text-[#446554]" : "text-brand-white-muted"
          )}
        >
          {subtitle}
        </motion.p>
      )}
    </motion.div>
  );
}
