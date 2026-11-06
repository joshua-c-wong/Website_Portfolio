import { motion } from "framer-motion";
import { sectionReveal } from "./motion";

type Props = { id: string; number: string; label: string; children: React.ReactNode };

/**
 * A home-page section on the 12-column grid: numbered label in the left gutter
 * (sticky on desktop), content in the remaining nine columns.
 */
const Section = ({ id, number, label, children }: Props) => (
  <motion.section id={id} className="border-t border-border scroll-mt-14" {...sectionReveal}>
    <div className="grid grid-cols-1 md:grid-cols-12 gap-x-8 gap-y-6 py-12 md:py-24">
      <div className="md:col-span-3">
        <div className="flex items-baseline gap-3 md:block md:sticky md:top-24">
          <p className="text-sm font-mono text-primary">{number}</p>
          <h2 className="md:mt-1 text-lg font-heading font-medium tracking-tight text-foreground">{label}</h2>
        </div>
      </div>
      <div className="md:col-span-9">{children}</div>
    </div>
  </motion.section>
);

export default Section;
