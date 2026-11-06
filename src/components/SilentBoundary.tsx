import { Component, type ReactNode } from "react";

/**
 * Catches errors from decorative/optional parts of the page (e.g. the 3D hero)
 * so a failure there renders `fallback` instead of blanking the whole site.
 */
class SilentBoundary extends Component<{ children: ReactNode; fallback?: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  componentDidCatch(error: unknown) {
    console.warn("Optional component failed and was hidden:", error);
  }
  render() {
    return this.state.failed ? (this.props.fallback ?? null) : this.props.children;
  }
}

export default SilentBoundary;
