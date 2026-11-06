import { motion } from "framer-motion";
import SectionLabel from "./SectionLabel";
import { sectionReveal } from "./motion";
import { about } from "@/data/content";

const About = () => (
  <motion.section id="about" className="py-12 border-t border-border" {...sectionReveal}>
    <SectionLabel>About</SectionLabel>
    {about.paragraphs.map((p, i) => (
      <p key={i} className={`${i > 0 ? "mt-4 " : ""}text-foreground font-body leading-relaxed`}>
        {p}
      </p>
    ))}
  </motion.section>
);

export default About;
