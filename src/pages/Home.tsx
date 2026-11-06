import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Footer from "@/components/Footer";

const Home = () => {
  const { hash } = useLocation();

  // Support links like "/#projects" (used by the project page's back link)
  useEffect(() => {
    if (!hash) return;
    const el = document.getElementById(hash.slice(1));
    if (el) requestAnimationFrame(() => el.scrollIntoView({ behavior: "instant" as ScrollBehavior }));
  }, [hash]);

  return (
    <main className="max-w-2xl mx-auto px-6 py-16">
      <Hero />
      <About />
      <Experience />
      <Projects />
      <Skills />
      <Footer />
    </main>
  );
};

export default Home;
