import { motion } from "framer-motion";
import SectionLabel from "./SectionLabel";
import SoftwareStrip from "./SoftwareStrip";
import { sectionReveal } from "./motion";
import { skills } from "@/data/content";

const Skills = () => (
  <motion.section id="skills" className="py-12 border-t border-border" {...sectionReveal}>
    <SectionLabel className="mb-8">Skills</SectionLabel>
    <SoftwareStrip />
    <dl className="mt-12 space-y-3">
      {skills.map((s) => (
        <div key={s.group} className="grid grid-cols-1 sm:grid-cols-[10rem_1fr] gap-x-6 gap-y-0.5">
          <dt className="text-xs font-mono uppercase tracking-wider text-muted-foreground pt-0.5">{s.group}</dt>
          <dd className="text-sm text-foreground font-body">{s.items}</dd>
        </div>
      ))}
    </dl>
  </motion.section>
);

export default Skills;
