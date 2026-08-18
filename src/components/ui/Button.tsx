"use client";

import { useRef, useCallback } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";

interface ButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "ghost" | "outline";
  size?: "sm" | "md" | "lg";
  href?: string;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  "aria-label"?: string;
  type?: "button" | "submit" | "reset";
}

export function Button({
  children,
  variant = "primary",
  size = "md",
  href,
  onClick,
  className,
  disabled = false,
  "aria-label": ariaLabel,
  type = "button",
}: ButtonProps) {
  const ref = useRef<HTMLButtonElement | HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, { stiffness: 150, damping: 15 });
  const springY = useSpring(y, { stiffness: 150, damping: 15 });

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const distX = (e.clientX - centerX) * 0.25;
      const distY = (e.clientY - centerY) * 0.25;
      x.set(distX);
      y.set(distY);
    },
    [x, y]
  );

  const handleMouseLeave = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

  const baseStyles = cn(
    "relative inline-flex items-center justify-center font-medium transition-all duration-200",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent focus-visible:ring-offset-2 focus-visible:ring-offset-brand-black",
    "disabled:opacity-40 disabled:cursor-not-allowed",
    "select-none cursor-pointer",
    // Size
    size === "sm" && "text-sm px-4 py-2 gap-1.5 rounded-sm",
    size === "md" && "text-sm px-6 py-3 gap-2 rounded-md",
    size === "lg" && "text-base px-8 py-4 gap-2 rounded-md",
    // Variant
    variant === "primary" && [
      "bg-brand-accent text-brand-black",
      "hover:bg-white",
      "before:absolute before:inset-0 before:rounded-md before:bg-brand-accent before:opacity-0 before:blur-xl before:transition-opacity before:duration-300",
      "hover:before:opacity-60",
    ],
    variant === "ghost" && [
      "bg-transparent text-brand-white border border-brand-black-border",
      "hover:border-brand-accent hover:text-brand-accent",
      "hover:bg-brand-accent-glow",
    ],
    variant === "outline" && [
      "bg-transparent text-brand-accent border border-brand-accent",
      "hover:bg-brand-accent hover:text-brand-black",
    ],
    className
  );

  const MotionTag = motion.button;

  if (href) {
    return (
      <motion.a
        ref={ref as React.Ref<HTMLAnchorElement>}
        href={href}
        className={baseStyles}
        style={{ x: springX, y: springY }}
        onMouseMove={handleMouseMove as unknown as React.MouseEventHandler<HTMLAnchorElement>}
        onMouseLeave={handleMouseLeave}
        aria-label={ariaLabel}
        whileTap={{ scale: 0.97 }}
      >
        {variant === "primary" && (
          <span className="absolute inset-0 rounded-md overflow-hidden">
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full hover:translate-x-full transition-transform duration-700" />
          </span>
        )}
        <span className="relative z-10 flex items-center gap-2">{children}</span>
      </motion.a>
    );
  }

  return (
    <MotionTag
      ref={ref as React.Ref<HTMLButtonElement>}
      type={type}
      className={baseStyles}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      whileTap={{ scale: 0.97 }}
    >
      {variant === "primary" && (
        <span className="absolute inset-0 rounded-md overflow-hidden pointer-events-none">
          <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
        </span>
      )}
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </MotionTag>
  );
}
