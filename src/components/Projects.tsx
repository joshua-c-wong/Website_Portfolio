import { useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import Section from "./Section";
import ProjectRow from "./ProjectRow";
import ProjectHoverPreview from "./ProjectHoverPreview";
import { listContainer, listItem } from "./motion";
import { projects } from "@/data/content";
import { useMediaQuery } from "@/lib/useMediaQuery";
import { publicUrl } from "@/lib/utils";

export const projectNumber = (i: number) => String(i + 1).padStart(2, "0");

const Projects = () => {
  const canHover = useMediaQuery("(hover: hover) and (pointer: fine)");
  const [preview, setPreview] = useState<string | null>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const x = useSpring(mouseX, { stiffness: 350, damping: 35, mass: 0.5 });
  const y = useSpring(mouseY, { stiffness: 350, damping: 35, mass: 0.5 });

  return (
    <Section id="projects" number="03" label="Projects">
      <motion.div
        className="border-t border-border divide-y divide-border"
        variants={listContainer(0.08)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-40px" }}
        onMouseMove={
          canHover
            ? (e) => {
                mouseX.set(e.clientX);
                mouseY.set(e.clientY);
              }
            : undefined
        }
        onMouseLeave={() => setPreview(null)}
      >
        {projects.map((p, i) => {
          const src = p.thumbnail ?? p.images[0];
          const image = src ? publicUrl(src) : null;
          return (
            <motion.div key={p.slug} variants={listItem}>
              <ProjectRow
                project={p}
                number={projectNumber(i)}
                onMouseEnter={(e) => {
                  if (!canHover) return;
                  // jump (not spring) to the cursor so the card doesn't fly in from the corner
                  if (!preview) {
                    x.jump(e.clientX);
                    y.jump(e.clientY);
                  }
                  setPreview(image);
                }}
                onMouseLeave={() => setPreview(null)}
              />
            </motion.div>
          );
        })}
      </motion.div>
      {canHover && <ProjectHoverPreview src={preview} x={x} y={y} />}
    </Section>
  );
};

export default Projects;
