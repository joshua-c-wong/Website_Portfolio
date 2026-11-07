import { motion } from "framer-motion";
import { listContainer, listItem } from "./motion";
import { software } from "@/data/content";

/** Software icons with captions; greyscale until hovered. */
const SoftwareStrip = () => (
  <motion.ul
    className="grid grid-cols-3 sm:grid-cols-6 gap-x-6 gap-y-8 sm:gap-6"
    variants={listContainer(0.06)}
    initial="hidden"
    whileInView="show"
    viewport={{ once: true, margin: "-40px" }}
  >
    {software.map((s) => (
      <motion.li key={s.name} variants={listItem} className="group flex flex-col items-start gap-3">
        <img
          src={s.icon}
          alt=""
          className="h-10 w-10 object-contain grayscale opacity-60 transition-all duration-300 group-hover:grayscale-0 group-hover:opacity-100 group-hover:-translate-y-0.5"
        />
        <span className="text-xs font-mono text-muted-foreground group-hover:text-foreground transition-colors">
          {s.name}
        </span>
      </motion.li>
    ))}
  </motion.ul>
);

export default SoftwareStrip;
