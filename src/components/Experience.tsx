import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import SectionLabel from "./SectionLabel";
import CompanyLogo from "./CompanyLogo";
import { hoverNudge, listContainer, listItem, sectionReveal } from "./motion";
import { experience } from "@/data/content";

const Experience = () => (
  <motion.section id="experience" className="py-12 border-t border-border" {...sectionReveal}>
    <SectionLabel className="mb-8">Experience</SectionLabel>
    <motion.div
      className="divide-y divide-border"
      variants={listContainer(0.1)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-40px" }}
    >
      {experience.map((e) => (
        <motion.a
          key={e.company}
          href={e.url}
          target="_blank"
          rel="noopener noreferrer"
          variants={listItem}
          {...hoverNudge}
          className="group block"
        >
          <div className="py-8 px-2 -mx-2 rounded-sm">
            <div className="flex justify-between items-start gap-6">
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1.5">
                  <h3 className="text-xl md:text-2xl font-heading font-bold tracking-tight text-foreground group-hover:text-primary transition-colors duration-200">
                    {e.company}
                  </h3>
                  <ArrowUpRight className="w-4 h-4 text-primary opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" />
                </div>
                <p className="text-sm text-muted-foreground font-body italic mt-1">
                  {e.role}
                  {e.team && ` · ${e.team}`}
                </p>
                <p className="text-sm text-foreground font-body mt-2 leading-relaxed">{e.description}</p>
              </div>
              <div className="flex flex-col items-end gap-2 shrink-0">
                <span className="text-xs font-mono text-muted-foreground whitespace-nowrap">{e.period}</span>
                <CompanyLogo src={e.logo} alt={e.company} className={e.logoClassName} />
              </div>
            </div>
          </div>
        </motion.a>
      ))}
    </motion.div>
  </motion.section>
);

export default Experience;
