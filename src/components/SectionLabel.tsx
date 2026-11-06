import { cn } from "@/lib/utils";

const SectionLabel = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <h2
    className={cn(
      "flex items-center gap-3 text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground mb-6",
      className,
    )}
  >
    <span className="inline-block h-px w-5 bg-primary/70" aria-hidden />
    {children}
  </h2>
);

export default SectionLabel;
