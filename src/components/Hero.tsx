import { lazy, Suspense, useState } from "react";
import { motion, type Variants } from "framer-motion";
import { profile } from "@/data/content";
import { useMediaQuery } from "@/lib/useMediaQuery";
import { hasWebGL } from "@/lib/webgl";
import SilentBoundary from "./SilentBoundary";

// three.js only loads on large screens without reduced-motion
const HeroWireframe = lazy(() => import("./HeroWireframe"));

const container: Variants = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } };
const item: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

const [firstName, ...rest] = profile.name.split(" ");
const lastName = rest.join(" ");

const Hero = () => {
  const wideEnough = useMediaQuery("(min-width: 1024px) and (prefers-reduced-motion: no-preference)");
  const [webgl] = useState(hasWebGL);
  const showWireframe = wideEnough && webgl;

  const scrollDown = () => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });

  return (
    <motion.section
      className="relative flex md:min-h-[calc(100svh-3.5rem)] flex-col"
      variants={container}
      initial="hidden"
      animate="show"
    >
      {/* Swiss layout guide: 12 faint column lines matching the page grid */}
      <div aria-hidden className="hero-columns pointer-events-none absolute inset-0 -z-10 hidden md:grid grid-cols-12 gap-x-8">
        {Array.from({ length: 12 }, (_, i) => (
          <div key={i} className={`border-l border-foreground/[0.05] ${i === 11 ? "border-r" : ""}`} />
        ))}
      </div>

      <div className="grid flex-1 grid-cols-1 md:grid-cols-12 gap-x-8 items-center py-20 md:py-16">
        <div className="md:col-span-7 lg:col-span-6">
          <motion.p variants={item} className="text-xs font-mono uppercase tracking-[0.2em] text-primary">
            Portfolio · {profile.location}
          </motion.p>
          <motion.h1
            variants={item}
            className="mt-6 text-6xl sm:text-7xl lg:text-8xl font-heading font-bold tracking-[-0.04em] leading-[0.9] text-foreground"
          >
            {firstName}
            <br />
            {lastName}
          </motion.h1>
          <motion.p variants={item} className="mt-8 max-w-sm text-lg text-muted-foreground">
            {profile.tagline}
          </motion.p>
        </div>

        {showWireframe && (
          <motion.div
            aria-hidden
            className="pointer-events-none relative hidden lg:block lg:col-span-6 h-[520px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.5, ease: "easeOut" }}
          >
            <SilentBoundary>
              <Suspense fallback={null}>
                <HeroWireframe />
              </Suspense>
            </SilentBoundary>
          </motion.div>
        )}
      </div>

      {/* meta row */}
      <motion.div
        variants={item}
        className="grid grid-cols-2 md:grid-cols-12 gap-x-8 border-t border-border py-5 text-xs font-mono text-muted-foreground"
      >
        <p className="md:col-span-3">Based in {profile.location}</p>
        <p className="md:col-span-6">Studying at BCIT</p>
        <button
          onClick={scrollDown}
          data-og-hide
          className="hidden md:block md:col-span-3 text-right hover:text-primary transition-colors"
        >
          Scroll ↓
        </button>
      </motion.div>
    </motion.section>
  );
};

export default Hero;
