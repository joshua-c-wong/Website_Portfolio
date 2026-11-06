import { Link } from "react-router-dom";
import SiteHeader from "@/components/SiteHeader";
import Container from "@/components/Container";

const NotFound = () => (
  <>
    <SiteHeader />
    <Container as="main" className="min-h-[calc(100svh-3.5rem)] flex flex-col justify-center">
      <p className="text-xs font-mono uppercase tracking-[0.2em] text-primary">404</p>
      <h1 className="mt-4 text-5xl md:text-7xl font-heading font-bold tracking-[-0.04em] leading-[0.95]">
        This page
        <br />
        doesn't exist.
      </h1>
      <Link to="/" className="mt-8 text-sm text-muted-foreground underline underline-offset-4 hover:text-primary transition-colors">
        Back to home
      </Link>
    </Container>
  </>
);

export default NotFound;
