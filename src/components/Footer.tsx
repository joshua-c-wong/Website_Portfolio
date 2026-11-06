import { footer, profile } from "@/data/content";
import { publicUrl } from "@/lib/utils";

const Footer = () => (
  <footer className="border-t border-border">
    <div className="grid grid-cols-1 md:grid-cols-12 gap-x-8 gap-y-2 md:items-center py-10 text-xs text-muted-foreground">
      <p className="md:col-span-3">
        © {new Date().getFullYear()} {profile.name}
        {footer.tagline && ` · ${footer.tagline}`}
      </p>
      <div className="md:col-span-6 flex gap-5">
        {profile.links.map((l) => (
          <a
            key={l.label}
            href={publicUrl(l.href)}
            {...(l.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            className="py-2 hover:text-primary transition-colors"
          >
            {l.label}
          </a>
        ))}
      </div>
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="md:col-span-3 py-2 text-left md:text-right font-mono hover:text-primary transition-colors"
      >
        Back to top ↑
      </button>
    </div>
  </footer>
);

export default Footer;
