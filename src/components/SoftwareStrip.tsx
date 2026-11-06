import { motion } from "framer-motion";
import { listContainer, listItem } from "./motion";
import { software } from "@/data/content";

const SoftwareStrip = () => (
  <motion.ul
    className="flex flex-wrap items-center gap-5"
    variants={listContainer(0.06)}
    initial="hidden"
    whileInView="show"
    viewport={{ once: true, margin: "-40px" }}
  >
    {software.map((s) => (
      <motion.li key={s.name} variants={listItem} className="group relative">
        <img
          src={s.icon}
          alt={s.name}
          title={s.name}
          className="h-8 w-8 object-contain grayscale opacity-60 transition-all duration-300 group-hover:grayscale-0 group-hover:opacity-100 group-hover:-translate-y-0.5"
        />
        <span className="pointer-events-none absolute left-1/2 top-full mt-2 -translate-x-1/2 whitespace-nowrap text-[11px] font-mono text-muted-foreground opacity-0 transition-opacity duration-200 group-hover:opacity-100">
          {s.name}
        </span>
      </motion.li>
    ))}
  </motion.ul>
);

export default SoftwareStrip;
