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
            {/* phones: company + role with date and logo on the right, then description.
                desktop (12-col): company | description | date + logo */}
            <div className="grid grid-cols-[1fr_auto] md:grid-cols-12 gap-x-4 md:gap-x-6 gap-y-3 py-7 items-center">
              <div className="md:col-span-5 md:order-1">
                <div className="flex items-center gap-1.5">
                  <h3 className="text-lg md:text-xl font-heading font-semibold tracking-tight text-foreground group-hover:text-primary transition-colors duration-200">
                    {e.company}
                  </h3>
                  <ArrowUpRight className="w-4 h-4 shrink-0 text-primary opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" />
                </div>
                <p className="mt-1 text-sm italic text-muted-foreground">
                  {e.role}
                  {e.team && ` · ${e.team}`}
                </p>
              </div>
              <div className="md:col-span-3 md:order-3 flex flex-col items-end gap-2 md:flex-row md:items-center md:justify-end md:gap-4">
                <span className="text-xs font-mono text-muted-foreground whitespace-nowrap">
                  {e.period}
                </span>
                <img
                  src={e.logo}
                  alt={e.company}
                  loading="lazy"
                  className={`w-9 h-9 md:w-11 md:h-11 object-contain grayscale opacity-60 transition-all duration-300 group-hover:grayscale-0 group-hover:opacity-100 ${e.logoClassName ?? ""}`}
                />
              </div>
              <p className="col-span-2 md:col-span-4 md:order-2 text-sm text-foreground">{e.description}</p>
            </div>
          </motion.a>
        </motion.div>
      ))}
    </motion.div>
  </Section>
);

export default Experience;
