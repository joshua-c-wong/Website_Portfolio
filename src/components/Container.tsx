import { cn } from "@/lib/utils";

/** Shared page width for the Swiss grid layout (~1150px). */
const Container = ({
  as: Tag = "div",
  className,
  children,
}: {
  as?: "div" | "main" | "header" | "footer";
  className?: string;
  children: React.ReactNode;
}) => <Tag className={cn("mx-auto w-full max-w-6xl px-6 md:px-10", className)}>{children}</Tag>;

export default Container;
