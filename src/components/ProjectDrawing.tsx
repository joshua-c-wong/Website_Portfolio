/**
 * Simple isometric line drawing used as a project cover until real images are added.
 * Same visual language as the hero wireframe: thin grey edges with one accent volume.
 */
type Box = { x: number; y: number; z: number; w: number; d: number; h: number; accent?: boolean };

const VARIANTS: Box[][] = [
  // tower on a podium with a cantilever
  [
    { x: 0, y: 0, z: 0, w: 6, d: 4, h: 1.2 },
    { x: 0.4, y: 0.6, z: 1.2, w: 2.6, d: 2.6, h: 5.2 },
    { x: 1.4, y: 1, z: 3.6, w: 4.6, d: 1.8, h: 1, accent: true },
  ],
  // two offset volumes (massing study)
  [
    { x: 0, y: 0, z: 0, w: 5.5, d: 3.5, h: 2 },
    { x: 1.5, y: -0.8, z: 2, w: 3, d: 4.5, h: 2.2, accent: true },
    { x: 2.2, y: 0.2, z: 4.2, w: 1.6, d: 1.6, h: 1.2 },
  ],
  // row of tilt-up panels with a roof slab
  [
    ...Array.from({ length: 5 }, (_, i) => ({ x: i * 1.35, y: 0, z: 0, w: 1.2, d: 0.25, h: 4, accent: i === 2 })),
    { x: -0.1, y: 0, z: 4, w: 6.75, d: 4, h: 0.2 },
    { x: -0.1, y: 3.75, z: 0, w: 6.75, d: 0.25, h: 4 },
  ],
];

const COS = Math.cos(Math.PI / 6);
const SIN = Math.sin(Math.PI / 6);
const iso = (x: number, y: number, z: number): [number, number] => [(x - y) * COS, (x + y) * SIN - z];

const edges = (b: Box) => {
  const c = [
    [b.x, b.y, b.z], [b.x + b.w, b.y, b.z], [b.x + b.w, b.y + b.d, b.z], [b.x, b.y + b.d, b.z],
    [b.x, b.y, b.z + b.h], [b.x + b.w, b.y, b.z + b.h], [b.x + b.w, b.y + b.d, b.z + b.h], [b.x, b.y + b.d, b.z + b.h],
  ].map(([x, y, z]) => iso(x, y, z));
  const pairs = [[0, 1], [1, 2], [2, 3], [3, 0], [4, 5], [5, 6], [6, 7], [7, 4], [0, 4], [1, 5], [2, 6], [3, 7]];
  return pairs.map(([a, b2]) => [c[a], c[b2]] as const);
};

const ProjectDrawing = ({ variant = 0 }: { variant?: number }) => {
  const boxes = VARIANTS[variant % VARIANTS.length];
  const lines = boxes.flatMap((b) => edges(b).map((e) => ({ e, accent: !!b.accent })));
  const xs = lines.flatMap(({ e }) => [e[0][0], e[1][0]]);
  const ys = lines.flatMap(({ e }) => [e[0][1], e[1][1]]);
  const pad = 1.2;
  const minX = Math.min(...xs) - pad;
  const minY = Math.min(...ys) - pad;
  const w = Math.max(...xs) - minX + pad;
  const h = Math.max(...ys) - minY + pad;

  return (
    <svg viewBox={`${minX} ${minY} ${w} ${h}`} className="h-full w-full" aria-hidden preserveAspectRatio="xMidYMid meet">
      {lines.map(({ e, accent }, i) => (
        <line
          key={i}
          x1={e[0][0]}
          y1={e[0][1]}
          x2={e[1][0]}
          y2={e[1][1]}
          stroke={accent ? "hsl(var(--primary))" : "hsl(var(--foreground))"}
          strokeOpacity={accent ? 0.8 : 0.3}
          strokeWidth={1}
          vectorEffect="non-scaling-stroke"
        />
      ))}
    </svg>
  );
};

export default ProjectDrawing;
