/** True if the browser can create a WebGL context (it can be disabled by settings, GPU blocklists or extensions). */
export function hasWebGL(): boolean {
  try {
    const canvas = document.createElement("canvas");
    return !!(canvas.getContext("webgl2") || canvas.getContext("webgl"));
  } catch {
    return false;
  }
}
