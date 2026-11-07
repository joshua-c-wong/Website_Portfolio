import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { hoverNudge } from "./motion";
import { ArrowRight } from "lucide-react";
import type { Project } from "@/data/content";

type Props = {
  project: Project;
  number: string;
  onMouseEnter?: (e: React.MouseEvent) => void;
  onMouseLeave?: () => void;
};

const MotionLink = motion.create(Link);

/** Big numbered project row, shared by the home page and the "next project" link. */
const ProjectRow = ({ project, number, onMouseEnter, onMouseLeave }: Props) => (
  <MotionLink
    to={`/projects/${project.slug}`}
    className="group block"
    onMouseEnter={onMouseEnter}
    onMouseLeave={onMouseLeave}
    {...hoverNudge}
  >
    <div className="grid grid-cols-[2rem_1fr] md:grid-cols-[3.5rem_1fr_auto_5rem] gap-x-3 md:gap-x-6 py-7 items-baseline">
      <span className="text-sm font-mono text-muted-foreground group-hover:text-primary transition-colors duration-200">
        {number}
      </span>
      <div className="min-w-0">
        <h3 className="text-xl sm:text-2xl md:text-3xl font-heading font-semibold tracking-tight leading-tight text-foreground">
          <span className="link-underline pb-1">{project.name}</span>
        </h3>
        <p className="mt-2 text-xs font-mono text-muted-foreground">
          {project.tech}
          {/* on phones the date moves here so the title gets the full width */}
          <span className="md:hidden"> · {project.period}</span>
        </p>
      </div>
      <span className="hidden md:block text-xs font-mono text-muted-foreground whitespace-nowrap">{project.period}</span>
      {/* long arrow that extends on hover */}
      <span className="hidden md:flex items-center justify-end self-center text-muted-foreground group-hover:text-primary transition-colors">
        <span className="h-px w-6 bg-current transition-all duration-300 group-hover:w-12" />
        <ArrowRight className="-ml-1.5 h-4 w-4" />
      </span>
    </div>
  </MotionLink>
);

export default ProjectRow;
