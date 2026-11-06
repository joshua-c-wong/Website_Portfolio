import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Section from "./Section";
import { hoverNudge, listContainer, listItem } from "./motion";
import { experience } from "@/data/content";

const Experience = () => (
  <Section id="experience" number="02" label="Experience">
    <motion.div
      className="border-t border-border divide-y divide-border"
      variants={listContainer(0.1)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-40px" }}
    >
      {experience.map((e) => (
        <motion.div key={e.company} variants={listItem}>
        <motion.a
          href={e.url}
          target="_blank"
          rel="noopener noreferrer"
          className="group block"
          {...hoverNudge}
        >
          <div className="grid grid-cols-[1fr_auto] md:grid-cols-12 gap-x-6 gap-y-2 py-7 items-center">
            <div className="md:col-span-5">
              <div className="flex items-center gap-1.5">
                <h3 className="text-xl font-heading font-semibold tracking-tight text-foreground group-hover:text-primary transition-colors duration-200">
                  {e.company}
                </h3>
                <ArrowUpRight className="w-4 h-4 text-primary opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" />
              </div>
              <p className="mt-1 text-sm italic text-muted-foreground">
                {e.role}
                {e.team && ` · ${e.team}`}
              </p>
            </div>
            <p className="col-span-2 row-start-2 md:row-start-auto md:col-span-4 text-sm text-foreground">
              {e.description}
            </p>
            <div className="row-start-1 col-start-2 md:row-start-auto md:col-start-auto md:col-span-3 flex items-center justify-end gap-4">
              <span className="text-xs font-mono text-muted-foreground whitespace-nowrap">{e.period}</span>
              <img
                src={e.logo}
                alt={e.company}
                loading="lazy"
                className={`w-11 h-11 object-contain grayscale opacity-60 transition-all duration-300 group-hover:grayscale-0 group-hover:opacity-100 ${e.logoClassName ?? ""}`}
              />
            </div>
          </div>
        </motion.a>
        </motion.div>
      ))}
    </motion.div>
  </Section>
);

export default Experience;
