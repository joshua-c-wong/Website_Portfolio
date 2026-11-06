import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Section from "./Section";
import ProjectDrawing from "./ProjectDrawing";
import { listContainer, listItem } from "./motion";
import { projects } from "@/data/content";
import { publicUrl } from "@/lib/utils";

export const projectNumber = (i: number) => String(i + 1).padStart(2, "0");

const MotionLink = motion.create(Link);

/** Project cards: first project as a wide feature card, the rest in two columns. */
const Projects = () => (
  <Section id="projects" number="03" label="Projects">
    <motion.div
      className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-14"
      variants={listContainer(0.1)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-40px" }}
    >
      {projects.map((p, i) => {
        const src = p.thumbnail ?? p.images[0];
        const featured = i === 0;
        return (
          <motion.div key={p.slug} variants={listItem} className={featured ? "md:col-span-2" : ""}>
            <MotionLink
              to={`/projects/${p.slug}`}
              className="group block"
              whileHover={{ x: 4 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <div
                className={`relative overflow-hidden rounded-sm border border-border bg-muted/40 ${
                  featured ? "aspect-[4/3] md:aspect-[21/9]" : "aspect-[4/3]"
                }`}
              >
                {src ? (
                  <img
                    src={publicUrl(src)}
                    alt={p.name}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                  />
                ) : (
                  <div className="absolute inset-[12%] transition-transform duration-700 ease-out group-hover:scale-[1.06]">
                    <ProjectDrawing variant={i} />
                  </div>
                )}
              </div>
              <div className="mt-5 grid grid-cols-[2rem_1fr_auto] gap-x-3 items-baseline">
                <span className="text-sm font-mono text-muted-foreground group-hover:text-primary transition-colors">
                  {projectNumber(i)}
                </span>
                <h3 className="text-xl md:text-2xl font-heading font-semibold tracking-tight leading-tight text-foreground">
                  <span className="link-underline pb-1">{p.name}</span>
                </h3>
                <ArrowRight className="h-5 w-5 text-muted-foreground transition-all duration-300 group-hover:text-primary group-hover:translate-x-1" />
                <p className="col-start-2 mt-2 text-xs font-mono text-muted-foreground">
                  {p.tech} · {p.period}
                </p>
              </div>
            </MotionLink>
          </motion.div>
        );
      })}
    </motion.div>
  </Section>
);

export default Projects;
