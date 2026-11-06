import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Container from "./Container";
import { profile } from "@/data/content";
import { publicUrl } from "@/lib/utils";

/** Thin sticky bar: name on the left, Resume / Email / LinkedIn on the right. */
const SiteHeader = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 bg-background/80 backdrop-blur-md transition-[border-color,box-shadow] duration-300 border-b ${
        scrolled ? "border-border" : "border-transparent"
      }`}
    >
      <Container className="flex h-14 items-center justify-between">
        <Link
          to="/"
          className="text-xs font-mono uppercase tracking-[0.2em] text-foreground hover:text-primary transition-colors"
        >
          {profile.name}
        </Link>
        <nav aria-label="Links" className="flex items-center gap-5 text-sm text-muted-foreground">
          {profile.links.map((l) => (
            <a
              key={l.label}
              href={publicUrl(l.href)}
              {...(l.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              className="hover:text-primary transition-colors duration-200"
            >
              {l.label}
            </a>
          ))}
        </nav>
      </Container>
    </header>
  );
};

export default SiteHeader;
