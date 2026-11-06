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

/** Horizontal floor-plate outlines stacked inside a box volume. */
const floorPlates = (w: number, d: number, x: number, z: number, y0: number, y1: number, step: number) => {
  const pts: number[] = [];
  const hw = w / 2;
  const hd = d / 2;
  for (let y = y0 + step; y < y1 - 0.01; y += step) {
    const c = [
      [x - hw, z - hd],
      [x + hw, z - hd],
      [x + hw, z + hd],
      [x - hw, z + hd],
    ];
    for (let i = 0; i < 4; i++) {
      const a = c[i];
      const b = c[(i + 1) % 4];
      pts.push(a[0], y, a[1], b[0], y, b[1]);
    }
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute("position", new THREE.Float32BufferAttribute(pts, 3));
  return g;
};

/** Vertical lines (columns) from y0 to y1 at the given x/z points. */
const columns = (points: [number, number][], y0: number, y1: number) => {
  const pts: number[] = [];
  points.forEach(([x, z]) => pts.push(x, y0, z, x, y1, z));
  const g = new THREE.BufferGeometry();
  g.setAttribute("position", new THREE.Float32BufferAttribute(pts, 3));
  return g;
};

const Building = ({ pointer }: { pointer: React.MutableRefObject<{ x: number; y: number }> }) => {
  const spin = useRef<THREE.Group>(null);
  const tilt = useRef<THREE.Group>(null);

  const { ink, accent } = useMemo(() => {
    // podium
    const podium = boxEdges(6, 1.2, 4.2, 0, 0.6, 0);
    // tower, offset to the back-left, with floor plates
    const tower = boxEdges(2.6, 5.4, 2.6, -1.3, 1.2 + 2.7, -0.4);
    const towerFloors = floorPlates(2.6, 2.6, -1.3, -0.4, 1.2, 6.6, 0.6);
    const podiumFloor = floorPlates(6, 4.2, 0, 0, 0, 1.2, 0.6);
    // columns under the cantilever, down to the ground
    const cols = columns(
      [
        [3.3, -0.8],
        [3.3, 0.8],
      ],
      0,
      3.4,
    );
    // cantilevered volume (accent), slotted through the tower
    const cantilever = boxEdges(4.6, 1.0, 2.0, 1.4, 3.9, 0);
    return {
      ink: [podium, tower, towerFloors, podiumFloor, cols],
      accent: [cantilever],
    };
  }, []);

  const inkMat = useMemo(
    () => new THREE.LineBasicMaterial({ color: INK, transparent: true, opacity: 0.32 }),
    [],
  );
  const accentMat = useMemo(
    () => new THREE.LineBasicMaterial({ color: ACCENT, transparent: true, opacity: 0.85 }),
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
      <group ref={spin} position={[0, -3.3, 0]}>
        {ink.map((g, i) => (
          <lineSegments key={`i${i}`} geometry={g} material={inkMat} />
        ))}
        {accent.map((g, i) => (
          <lineSegments key={`a${i}`} geometry={g} material={accentMat} />
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
