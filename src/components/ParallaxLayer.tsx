"use client";
import { useRef, ReactNode } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface ParallaxLayerProps {
  children: ReactNode;
  /** pixels to shift from bottom-of-viewport to top-of-viewport traversal.
   *  Positive = element drifts DOWN relative to scroll, negative = drifts UP (appears faster). */
  speed?: number;
  className?: string;
}

/**
 * Wraps children in a motion.div that shifts vertically based on scroll position.
 * Uses the element itself as the scroll target so each section is independent.
 */
export default function ParallaxLayer({ children, speed = -40, className = "" }: ParallaxLayerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  // Map full scroll range to [speed, -speed] so the element drifts `speed` px relative to the page
  const y = useTransform(scrollYProgress, [0, 1], [speed, -speed]);

  return (
    <motion.div ref={ref} style={{ y }} className={className}>
      {children}
    </motion.div>
  );
}
