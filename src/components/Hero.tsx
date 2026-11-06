import { lazy, Suspense } from "react";
import { motion, useScroll, useTransform, type Variants } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { profile } from "@/data/content";
import { useMediaQuery } from "@/lib/useMediaQuery";
import { publicUrl } from "@/lib/utils";

// three.js only loads on large screens without reduced-motion
const HeroWireframe = lazy(() => import("./HeroWireframe"));

const container: Variants = { hidden: {}, show: { transition: { staggerChildren: 0.12 } } };
const item: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const Hero = () => {
  const { scrollY } = useScroll();
  const chevronOpacity = useTransform(scrollY, [0, 100], [0.6, 0]);
  const showWireframe = useMediaQuery("(min-width: 1024px) and (prefers-reduced-motion: no-preference)");

  return (
    <motion.section
      className="relative min-h-screen flex flex-col justify-center pt-14"
      variants={container}
      initial="hidden"
      animate="show"
    >
      {/* faint grid, full viewport width, behind the content */}
      <div
        aria-hidden
        className="hero-grid pointer-events-none absolute inset-y-0 left-1/2 -z-10 w-screen -translate-x-1/2"
      />

      {showWireframe && (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute top-1/2 left-[55%] -z-10 h-[600px] w-[600px] -translate-y-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.6, ease: "easeOut" }}
        >
          <Suspense fallback={null}>
            <HeroWireframe />
          </Suspense>
        </motion.div>
      )}

      <motion.p variants={item} className="mb-4 text-xs font-mono uppercase tracking-[0.2em] text-primary">
        Portfolio · {profile.location}
      </motion.p>
      <motion.h1
        variants={item}
        className="text-4xl md:text-6xl font-heading font-bold tracking-tight text-foreground"
      >
        {profile.name}
      </motion.h1>
      <motion.p variants={item} className="mt-3 text-lg text-muted-foreground font-body">
        {profile.tagline}
      </motion.p>
      <motion.div variants={item} className="mt-5 flex items-center gap-5 text-sm text-muted-foreground font-body">
        {profile.links.map((l) => (
          <a
            key={l.label}
            href={publicUrl(l.href)}
            {...(l.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            className="underline underline-offset-4 decoration-border hover:text-primary hover:decoration-primary transition-colors duration-200"
          >
            {l.label}
          </a>
        ))}
      </motion.div>

      <motion.div
        style={{ opacity: chevronOpacity }}
        variants={item}
        className="absolute bottom-24 left-1/2 -translate-x-1/2"
      >
        <ChevronDown className="w-4 h-4 text-muted-foreground animate-bounce" />
      </motion.div>
    </motion.section>
  );
};

export default Hero;
