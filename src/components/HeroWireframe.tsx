import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const INK = "#14171c";
const ACCENT = "#1d4ed8";

// Mouse response — tweak these to make the building react more or less
const TILT_X = THREE.MathUtils.degToRad(12); // up/down tilt from pointer Y
const TURN_Y = THREE.MathUtils.degToRad(15); // turn toward pointer X
const LEAN_Z = THREE.MathUtils.degToRad(5); // slight lean from pointer X
const FOLLOW = 4; // higher = follows the cursor faster

/** Box outline as line segments, positioned by its centre. */
const boxEdges = (w: number, h: number, d: number, x = 0, y = 0, z = 0) => {
  const g = new THREE.EdgesGeometry(new THREE.BoxGeometry(w, h, d));
  g.translate(x, y, z);
  return g;
};

/** Build a line-segment geometry from a flat list of [x,y,z, x,y,z, ...] pairs. */
const segments = (pts: number[]) => {
  const g = new THREE.BufferGeometry();
  g.setAttribute("position", new THREE.Float32BufferAttribute(pts, 3));
  return g;
};

type Volume = { w: number; h: number; d: number; x: number; y0: number; z: number };

/** Thin vertical window mullions on the front (+z) and right (+x) faces of a volume. */
const mullions = (v: Volume, spacing: number) => {
  const pts: number[] = [];
  const y1 = v.y0 + v.h;
  const [x0, x1] = [v.x - v.w / 2, v.x + v.w / 2];
  const [z0, z1] = [v.z - v.d / 2, v.z + v.d / 2];
  for (let x = x0 + spacing; x < x1 - 0.01; x += spacing) pts.push(x, v.y0, z1, x, y1, z1);
  for (let z = z0 + spacing; z < z1 - 0.01; z += spacing) pts.push(x1, v.y0, z, x1, y1, z);
  return segments(pts);
};

/** Low-poly tree: a trunk line plus an icosahedron crown, standing on (x, base, z). */
const tree = (x: number, z: number, size = 1, base = 0) => {
  const trunk = 0.55 * size;
  const r = 0.52 * size;
  const crown = new THREE.EdgesGeometry(new THREE.IcosahedronGeometry(r, 0));
  crown.translate(x, base + trunk + r * 0.9, z);
  return [segments([x, base, z, x, base + trunk + 0.05, z]), crown];
};

/** Simple modern building: three offset stacked volumes with a glazed base, a site outline and trees. */
const buildScene = () => {
  const base: Volume = { w: 5, h: 1.5, d: 3.4, x: -0.4, y0: 0, z: 0 };
  const mid: Volume = { w: 4.4, h: 1.3, d: 2.8, x: 1.1, y0: 1.5, z: -0.2 }; // cantilevers to the right
  const top: Volume = { w: 3, h: 1.3, d: 2.4, x: -0.9, y0: 2.8, z: 0.2 };
  const vol = (v: Volume) => boxEdges(v.w, v.h, v.d, v.x, v.y0 + v.h / 2, v.z);

  // site outline + a path to the entrance
  const site = segments([
    -4.6, 0, -3, 4.6, 0, -3,
    4.6, 0, -3, 4.6, 0, 3,
    4.6, 0, 3, -4.6, 0, 3,
    -4.6, 0, 3, -4.6, 0, -3,
    -0.9, 0, 1.7, -0.9, 0, 3,
    0.1, 0, 1.7, 0.1, 0, 3,
  ]);

  const trees = [
    ...tree(-3.7, 2.1, 1.1),
    ...tree(-3.4, -1.9, 0.9),
    ...tree(3.6, 2.2, 1),
    ...tree(2.6, 2.5, 0.75),
    ...tree(2.4, -0.4, 0.6, mid.y0 + mid.h), // small tree on the roof terrace above the cantilever
  ];

  return {
    ink: [vol(base), vol(top), mullions(base, 0.5), mullions(top, 0.5)],
    accent: [vol(mid), mullions(mid, 0.55)],
    soft: [site, ...trees],
  };
};

const Building = ({ pointer }: { pointer: React.MutableRefObject<{ x: number; y: number }> }) => {
  const spin = useRef<THREE.Group>(null);
  const tilt = useRef<THREE.Group>(null);

  const { ink, accent, soft } = useMemo(buildScene, []);

  const inkMat = useMemo(
    () => new THREE.LineBasicMaterial({ color: INK, transparent: true, opacity: 0.32 }),
    [],
  );
  const accentMat = useMemo(
    () => new THREE.LineBasicMaterial({ color: ACCENT, transparent: true, opacity: 0.85 }),
    [],
  );
  // lighter lines for the site outline and trees
  const softMat = useMemo(
    () => new THREE.LineBasicMaterial({ color: INK, transparent: true, opacity: 0.2 }),
    [],
  );

  useFrame((_, delta) => {
    if (spin.current) spin.current.rotation.y += delta * ((Math.PI * 2) / 60); // ~1 rev / minute
    if (tilt.current) {
      const { x, y } = pointer.current;
      const r = tilt.current.rotation;
      r.x = THREE.MathUtils.damp(r.x, y * TILT_X, FOLLOW, delta);
      r.y = THREE.MathUtils.damp(r.y, x * TURN_Y, FOLLOW, delta);
      r.z = THREE.MathUtils.damp(r.z, -x * LEAN_Z, FOLLOW, delta);
    }
  });

  return (
    <group ref={tilt}>
      {/* scaled so the whole site (radius ~5 units) stays inside the camera frame while tilting */}
      <group ref={spin} position={[0, -1.55, 0]} scale={0.95}>
        {ink.map((g, i) => (
          <lineSegments key={`i${i}`} geometry={g} material={inkMat} />
        ))}
        {accent.map((g, i) => (
          <lineSegments key={`a${i}`} geometry={g} material={accentMat} />
        ))}
        {soft.map((g, i) => (
          <lineSegments key={`s${i}`} geometry={g} material={softMat} />
        ))}
      </group>
    </group>
  );
};

/** Slowly rotating line-drawing of a building, shown behind the hero on desktop. */
const HeroWireframe = () => {
  const wrap = useRef<HTMLDivElement>(null);
  const pointer = useRef({ x: 0, y: 0 });
  const [inView, setInView] = useState(true);

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  // stop rendering when scrolled out of view
  useEffect(() => {
    if (!wrap.current) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting));
    io.observe(wrap.current);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={wrap} className="h-full w-full">
      <Canvas
        frameloop={inView ? "always" : "never"}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        // far enough back that the building's full swing (radius ~5 units) always stays in frame
        camera={{ position: [12.5, 8.1, 15], fov: 32 }}
        onCreated={({ camera }) => camera.lookAt(0, 0, 0)}
      >
        <Building pointer={pointer} />
      </Canvas>
    </div>
  );
};

export default HeroWireframe;
