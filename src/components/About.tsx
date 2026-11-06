import Section from "./Section";
import { about } from "@/data/content";

const About = () => (
  <Section id="about" number="01" label="About">
    <div className="max-w-3xl space-y-6">
      {about.paragraphs.map((p, i) => (
        <p
          key={i}
          className={`text-2xl md:text-3xl font-medium tracking-tight leading-snug ${
            i === 0 ? "text-foreground" : "text-muted-foreground"
          }`}
        >
          {p}
        </p>
      ))}
    </div>
  </Section>
);

export default About;
