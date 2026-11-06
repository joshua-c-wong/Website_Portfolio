import { lazy, Suspense, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import SectionLabel from "@/components/SectionLabel";
import Gallery from "@/components/Gallery";
import Footer from "@/components/Footer";
import { projects } from "@/data/content";
import { publicUrl } from "@/lib/utils";
import NotFound from "./NotFound";

// three.js is only downloaded on pages that actually show a model
const ModelViewer = lazy(() => import("@/components/ModelViewer"));

type Tab = "images" | "model";

const ProjectPage = () => {
  const { slug } = useParams();
  const index = projects.findIndex((p) => p.slug === slug);
  const project = projects[index];
  const hasImages = !!project && project.images.length > 0;
  const hasModel = !!project?.model;
  const [tab, setTab] = useState<Tab>(hasImages || !hasModel ? "images" : "model");

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
    setTab(hasImages || !hasModel ? "images" : "model");
  }, [slug, hasImages, hasModel]);

  useEffect(() => {
    if (project) document.title = `${project.name} — Joshua Wong`;
    return () => {
      document.title = "Joshua Wong — Architecture & Building Technology";
    };
  }, [project]);

  if (!project) return <NotFound />;

  const next = projects[(index + 1) % projects.length];

  return (
    <main className="max-w-2xl mx-auto px-6 py-16">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: "easeOut" }}>
        <Link
          to={{ pathname: "/", hash: "#projects" }}
          className="group inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
          Back
        </Link>

        <header className="mt-14 mb-10">
          <p className="text-xs font-mono uppercase tracking-[0.2em] text-primary">{project.period}</p>
          <h1 className="mt-3 text-3xl md:text-4xl font-heading font-bold tracking-tight text-foreground">
            {project.name}
          </h1>
          <p className="mt-2 text-sm font-mono text-muted-foreground">{project.tech}</p>
        </header>
      </motion.div>

      <motion.section
        className="py-10 border-t border-border"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
      >
        <div className="flex items-center justify-between mb-6">
          <SectionLabel className="mb-0">{tab === "model" ? "3D Model" : "Images"}</SectionLabel>
          {hasImages && hasModel && (
            <div className="flex gap-1 rounded-sm border border-border p-0.5 text-xs font-mono">
              {(["images", "model"] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setTab(t)}
                  className={`px-2.5 py-1 rounded-[3px] transition-colors ${
                    tab === t ? "bg-foreground text-background" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {t === "images" ? "Images" : "3D model"}
                </button>
              ))}
            </div>
          )}
        </div>

        {tab === "model" && project.model ? (
          <Suspense
            fallback={
              <div className="aspect-[4/3] rounded-sm border border-border bg-muted/60 flex items-center justify-center text-xs font-mono text-muted-foreground">
                Loading viewer…
              </div>
            }
          >
            <ModelViewer url={publicUrl(project.model)} />
          </Suspense>
        ) : (
          <Gallery images={project.images.map(publicUrl)} title={project.name} />
        )}
      </motion.section>

      <motion.section
        className="py-10 border-t border-border"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <SectionLabel>Overview</SectionLabel>
        <p className="text-foreground font-body leading-relaxed">{project.summary}</p>
        <ul className="mt-6 space-y-3">
          {project.details.map((d) => (
            <li key={d} className="flex gap-3 text-sm text-foreground font-body leading-relaxed">
              <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-primary" aria-hidden />
              {d}
            </li>
          ))}
        </ul>
      </motion.section>

      {next && next.slug !== project.slug && (
        <section className="py-10 border-t border-border">
          <Link to={`/projects/${next.slug}`} className="group flex items-center justify-between gap-6">
            <div>
              <p className="text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground">Next project</p>
              <p className="mt-2 text-lg font-heading font-semibold text-foreground">
                <span className="link-underline pb-0.5">{next.name}</span>
              </p>
            </div>
            <ArrowRight className="w-5 h-5 text-primary transition-transform group-hover:translate-x-1" />
          </Link>
        </section>
      )}

      <Footer />
    </main>
  );
};

export default ProjectPage;
