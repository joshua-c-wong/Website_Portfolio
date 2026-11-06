import Section from "./Section";
import SoftwareStrip from "./SoftwareStrip";
import { skills } from "@/data/content";

const Skills = () => (
  <Section id="skills" number="04" label="Skills">
    <SoftwareStrip />
    <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-border pt-8">
      {skills.map((s) => (
        <div key={s.group}>
          <h3 className="text-xs font-mono uppercase tracking-[0.15em] text-muted-foreground">{s.group}</h3>
          <p className="mt-3 text-base text-foreground leading-relaxed">{s.items}</p>
        </div>
      ))}
    </div>
  </Section>
);

export default Skills;
