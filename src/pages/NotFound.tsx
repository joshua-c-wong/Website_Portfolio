import { Link } from "react-router-dom";

const NotFound = () => (
  <main className="max-w-2xl mx-auto px-6 min-h-screen flex flex-col justify-center">
    <p className="text-xs font-mono uppercase tracking-[0.2em] text-primary">404</p>
    <h1 className="mt-3 text-3xl font-heading font-bold tracking-tight">This page doesn't exist.</h1>
    <Link to="/" className="mt-6 text-sm text-muted-foreground underline underline-offset-4 hover:text-primary transition-colors">
      Back to home
    </Link>
  </main>
);

export default NotFound;
