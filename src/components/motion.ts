import type { Variants } from "framer-motion";

/** Shared animation presets, matching the example site's timings. */
export const sectionReveal = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.5, ease: "easeOut" },
} as const;

export const listContainer = (stagger = 0.1): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren: stagger } },
});

export const listItem: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

export const hoverNudge = {
  whileHover: { x: 4 },
  transition: { type: "spring", stiffness: 300, damping: 30 },
} as const;
