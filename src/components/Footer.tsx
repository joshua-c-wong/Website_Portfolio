import { footer, profile } from "@/data/content";

const Footer = () => (
  <footer className="py-12 border-t border-border">
    <p className="text-xs text-muted-foreground font-body">
      © {new Date().getFullYear()} {profile.name}
      {footer.tagline && ` · ${footer.tagline}`}
    </p>
  </footer>
);

export default Footer;
