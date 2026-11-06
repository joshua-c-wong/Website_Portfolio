import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Prefix a site-relative path ("/projects/x.jpg") with the deploy base path,
 * so files resolve both locally ("/") and on GitHub Pages ("/Website_Portfolio/").
 * External URLs, mailto: links etc. are returned unchanged.
 */
export function publicUrl(path: string) {
  if (!path.startsWith("/") || path.startsWith("//")) return path;
  return import.meta.env.BASE_URL + path.slice(1);
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
