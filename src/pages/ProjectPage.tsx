import { lazy, Suspense, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import SiteHeader from "@/components/SiteHeader";
import Container from "@/components/Container";
import Gallery from "@/components/Gallery";
import Footer from "@/components/Footer";
import ProjectRow from "@/components/ProjectRow";
import SilentBoundary from "@/components/SilentBoundary";
import { projectNumber } from "@/components/Projects";
import { projects } from "@/data/content";
import { publicUrl } from "@/lib/utils";
import { hasWebGL } from "@/lib/webgl";
import NotFound from "./NotFound";

// three.js is only downloaded on pages that actually show a model
const ModelViewer = lazy(() => import("@/components/ModelViewer"));

type Tab = "images" | "model";

const NoWebGL = () => (
  <div className="aspect-[4/3] rounded-sm border border-border bg-muted/60 flex items-center justify-center px-6 text-center text-xs font-mono text-muted-foreground">
    The 3D viewer needs WebGL, which is turned off in this browser.
  </div>
);

const Label = ({ children, className = "mb-6" }: { children: React.ReactNode; className?: string }) => (
  <h2 className={`${className} text-xs font-mono uppercase tracking-[0.15em] text-muted-foreground`}>{children}</h2>
);

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

  const nextIndex = (index + 1) % projects.length;
  const next = projects[nextIndex];

  return (
    <>
      <SiteHeader />
      <Container as="main">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-x-8 gap-y-10 pt-12 md:pt-20 pb-16">
          {/* gutter: back link + project facts */}
          <aside className="md:col-span-3">
            <div className="md:sticky md:top-24 space-y-10">
              <Link
                to={{ pathname: "/", hash: "#projects" }}
                className="group inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
                Back
              </Link>
              <dl className="grid grid-cols-3 md:grid-cols-1 gap-6 text-sm">
                <div>
                  <dt className="text-xs font-mono uppercase tracking-[0.15em] text-muted-foreground">Project</dt>
                  <dd className="mt-1 font-mono text-primary">
                    {projectNumber(index)} / {projectNumber(projects.length - 1)}
                  </dd>
                </div>
                <div>
                  <dt className="text-xs font-mono uppercase tracking-[0.15em] text-muted-foreground">Date</dt>
                  <dd className="mt-1 text-foreground">{project.period}</dd>
                </div>
                <div>
                  <dt className="text-xs font-mono uppercase tracking-[0.15em] text-muted-foreground">Tools</dt>
                  <dd className="mt-1 text-foreground">{project.tech}</dd>
                </div>
              </dl>
            </div>
          </aside>

          {/* content */}
          <div className="md:col-span-9">
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="text-4xl md:text-6xl font-heading font-bold tracking-[-0.03em] leading-[0.95] text-foreground"
            >
              {project.name}
            </motion.h1>

            <motion.section
              className="mt-14"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
            >
              <div className="flex items-center justify-between mb-6">
                <Label className="mb-0">{tab === "model" ? "3D Model" : "Images"}</Label>
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
                  {hasWebGL() ? (
                    <SilentBoundary fallback={<NoWebGL />}>
                      <ModelViewer url={publicUrl(project.model)} />
                    </SilentBoundary>
                  ) : (
                    <NoWebGL />
                  )}
                </Suspense>
              ) : (
                <Gallery images={project.images.map(publicUrl)} title={project.name} />
              )}
            </motion.section>

            <motion.section
              className="mt-16 border-t border-border pt-10"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <Label>Overview</Label>
              <p className="max-w-3xl text-xl md:text-2xl font-medium tracking-tight leading-snug text-foreground">
                {project.summary}
              </p>
              <ul className="mt-8 max-w-3xl space-y-4">
                {project.details.map((d) => (
                  <li key={d} className="flex gap-4 text-base text-foreground leading-relaxed">
                    <span className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-primary" aria-hidden />
                    {d}
                  </li>
                ))}
              </ul>
            </motion.section>

            {next.slug !== project.slug && (
              <section className="mt-20">
                <Label>Next project</Label>
                <div className="border-t border-b border-border">
                  <ProjectRow project={next} number={projectNumber(nextIndex)} />
                </div>
              </section>
            )}
          </div>
        </div>
        <Footer />
      </Container>
    </>
  );
};

export default ProjectPage;
