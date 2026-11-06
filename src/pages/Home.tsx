import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import SiteHeader from "@/components/SiteHeader";
import Container from "@/components/Container";
import Hero from "@/components/Hero";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import About from "@/components/About";
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
    <>
      <SiteHeader />
      <Container as="main">
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Footer />
      </Container>
    </>
  );
};

export default Home;
