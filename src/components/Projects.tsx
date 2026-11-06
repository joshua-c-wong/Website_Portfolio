import { useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import SectionLabel from "./SectionLabel";
import ProjectHoverPreview from "./ProjectHoverPreview";
import { hoverNudge, listContainer, listItem, sectionReveal } from "./motion";
import { projects } from "@/data/content";
import { useMediaQuery } from "@/lib/useMediaQuery";
import { publicUrl } from "@/lib/utils";

const MotionLink = motion.create(Link);

const Projects = () => {
  const canHover = useMediaQuery("(hover: hover) and (pointer: fine)");
  const [preview, setPreview] = useState<string | null>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const x = useSpring(mouseX, { stiffness: 350, damping: 35, mass: 0.5 });
  const y = useSpring(mouseY, { stiffness: 350, damping: 35, mass: 0.5 });

  const onMove = (e: React.MouseEvent) => {
    mouseX.set(e.clientX);
    mouseY.set(e.clientY);
  };

  return (
    <motion.section id="projects" className="py-12 border-t border-border scroll-mt-8" {...sectionReveal}>
      <SectionLabel>Projects</SectionLabel>
      <motion.div
        className="space-y-7"
        variants={listContainer(0.08)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-40px" }}
        onMouseMove={canHover ? onMove : undefined}
        onMouseLeave={() => setPreview(null)}
      >
        {projects.map((p) => {
          const src = p.thumbnail ?? p.images[0];
          const image = src ? publicUrl(src) : null;
          return (
            <MotionLink
              key={p.slug}
              to={`/projects/${p.slug}`}
              className="block group"
              variants={listItem}
              {...hoverNudge}
              onMouseEnter={(e: React.MouseEvent) => {
                if (!canHover) return;
                // jump (not spring) to the cursor so the card doesn't fly in from the corner
                if (!preview) {
                  x.jump(e.clientX);
                  y.jump(e.clientY);
                }
                setPreview(image);
              }}
              onMouseLeave={() => setPreview(null)}
            >
              <div className="flex justify-between items-start gap-6">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5">
                    <h3 className="text-base font-heading font-semibold text-foreground">
                      <span className="link-underline pb-0.5">{p.name}</span>
                    </h3>
                    <ArrowRight className="w-4 h-4 text-primary opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" />
                  </div>
                  <p className="text-xs font-mono text-muted-foreground mt-1">{p.tech}</p>
                </div>
                <span className="text-xs font-mono text-muted-foreground whitespace-nowrap shrink-0 pt-1">
                  {p.period}
                </span>
              </div>
            </MotionLink>
          );
        })}
      </motion.div>
      {canHover && <ProjectHoverPreview src={preview} x={x} y={y} />}
    </motion.section>
  );
};

export default Projects;
