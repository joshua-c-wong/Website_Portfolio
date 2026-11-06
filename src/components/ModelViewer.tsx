import { Component, Suspense, useEffect, useMemo, useState, type ReactNode } from "react";
import { Canvas, useLoader, useThree } from "@react-three/fiber";
import { Bounds, Center, Grid, Html, OrbitControls, useBounds, useGLTF, useProgress } from "@react-three/drei";
import * as THREE from "three";
import { STLLoader } from "three/examples/jsm/loaders/STLLoader.js";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader.js";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import { RotateCcw } from "lucide-react";

/* ---------- loaders, picked by file extension ---------- */

const neutralMaterial = () =>
  new THREE.MeshStandardMaterial({ color: "#c4c9d1", roughness: 0.6, metalness: 0.05, flatShading: true, side: THREE.DoubleSide });

const GltfModel = ({ url }: { url: string }) => {
  const { scene } = useGLTF(url);
  return <primitive object={scene} />;
};

const StlModel = ({ url }: { url: string }) => {
  const geometry = useLoader(STLLoader, url);
  const material = useMemo(neutralMaterial, []);
  useEffect(() => geometry.computeVertexNormals(), [geometry]);
  // CAD exports are usually Z-up; rotate to three.js Y-up
  return <mesh geometry={geometry} material={material} rotation={[-Math.PI / 2, 0, 0]} castShadow receiveShadow />;
};

const ObjModel = ({ url }: { url: string }) => {
  const obj = useLoader(OBJLoader, url);
  useEffect(() => {
    obj.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        // OBJ files without an .mtl get a default material — swap in a cleaner one
        if (!child.material || (child.material as THREE.Material).type === "MeshPhongMaterial") {
          child.material = neutralMaterial();
        }
      }
    });
  }, [obj]);
  return <primitive object={obj} />;
};

const Model = ({ url }: { url: string }) => {
  const ext = url.split("?")[0].split(".").pop()?.toLowerCase();
  if (ext === "stl") return <StlModel url={url} />;
  if (ext === "obj") return <ObjModel url={url} />;
  return <GltfModel url={url} />;
};

/* ---------- scene helpers ---------- */

/** Soft studio lighting generated locally (no HDR download needed). */
const StudioEnvironment = () => {
  const { gl, scene } = useThree();
  useEffect(() => {
    const pmrem = new THREE.PMREMGenerator(gl);
    const env = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
    scene.environment = env;
    return () => {
      scene.environment = null;
      env.dispose();
      pmrem.dispose();
    };
  }, [gl, scene]);
  return null;
};

/** Fits the camera once the model is placed, and again whenever `signal` changes (reset button). */
const FitOnSignal = ({ signal }: { signal: number }) => {
  const bounds = useBounds();
  useEffect(() => {
    // wait a frame so <Center> has positioned the model before measuring
    const id = requestAnimationFrame(() => bounds.refresh().clip().fit());
    return () => cancelAnimationFrame(id);
  }, [signal, bounds]);
  return null;
};

const Loader = () => {
  const { progress } = useProgress();
  return (
    <Html center>
      <span className="text-xs font-mono text-muted-foreground whitespace-nowrap">Loading model… {progress.toFixed(0)}%</span>
    </Html>
  );
};

class ModelErrorBoundary extends Component<{ children: ReactNode }, { error: boolean }> {
  state = { error: false };
  static getDerivedStateFromError() {
    return { error: true };
  }
  render() {
    if (this.state.error)
      return (
        <div className="absolute inset-0 flex items-center justify-center text-xs font-mono text-muted-foreground">
          Couldn't load this model.
        </div>
      );
    return this.props.children;
  }
}

/* ---------- viewer ---------- */

const ModelViewer = ({ url }: { url: string }) => {
  const [resetSignal, setResetSignal] = useState(0);

  return (
    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-sm border border-border bg-gradient-to-b from-white to-muted/70">
      <ModelErrorBoundary>
        <Canvas shadows dpr={[1, 2]} camera={{ position: [6, 4, 8], fov: 40, near: 0.01, far: 5000 }}>
          <StudioEnvironment />
          <ambientLight intensity={0.25} />
          <directionalLight position={[8, 12, 6]} intensity={1.6} castShadow />
          <directionalLight position={[-6, 4, -8]} intensity={0.4} />
          <Suspense fallback={<Loader />}>
            <Bounds fit clip observe margin={1.6}>
              <FitOnSignal signal={resetSignal} />
              <Center top>
                <Model url={url} />
              </Center>
            </Bounds>
          </Suspense>
          <Grid
            infiniteGrid
            cellSize={0.5}
            sectionSize={2.5}
            cellColor="#e3e6eb"
            sectionColor="#c9ced6"
            fadeDistance={60}
            fadeStrength={1.5}
          />
          <OrbitControls makeDefault enableDamping dampingFactor={0.08} maxPolarAngle={Math.PI / 2 - 0.02} />
        </Canvas>
      </ModelErrorBoundary>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-center justify-between p-3">
        <span className="text-[11px] font-mono text-muted-foreground">Drag to orbit · Scroll to zoom · Right-drag to pan</span>
        <button
          onClick={() => setResetSignal((s) => s + 1)}
          className="pointer-events-auto inline-flex items-center gap-1.5 rounded-sm border border-border bg-white/90 px-2.5 py-1.5 text-xs font-mono text-muted-foreground hover:text-primary hover:border-primary/40 transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          Reset view
        </button>
      </div>
    </div>
  );
};

export default ModelViewer;
