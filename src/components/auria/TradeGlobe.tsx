import { lazy, Suspense, useEffect, useMemo, useRef, useState } from "react";
import type { GlobeMethods } from "react-globe.gl";
// Self-hosted textures. Served from our own origin (hashed + cacheable by
// Vite) instead of streaming from unpkg at runtime, which was the main cause
// of the globe appearing slowly.
import earthTexture from "@/assets/globe/earth-blue-marble.jpg";
import bumpTexture from "@/assets/globe/earth-topology.png";

// Client-only: react-globe.gl pulls in three.js / WebGL, which cannot run
// during TanStack Start's server render. Lazy-loading it means the module is
// only ever imported in the browser (guarded by the `mounted` flag below).
const Globe = lazy(() => import("react-globe.gl"));

type Node = { name: string; country: string; lat: number; lng: number; hub?: boolean };

const CN: Node[] = [
  { name: "Shanghai", country: "China", lat: 31.23, lng: 121.47, hub: true },
];

const DEST: Node[] = [
  { name: "Rotterdam",   country: "Netherlands",  lat: 51.92, lng: 4.48 },
  { name: "Hamburg",     country: "Germany",      lat: 53.55, lng: 9.99 },
  { name: "Los Angeles", country: "USA",          lat: 33.74, lng: -118.27 },
  { name: "New York",    country: "USA",          lat: 40.71, lng: -74.0 },
  { name: "Dubai",       country: "UAE",          lat: 25.20, lng: 55.27 },
  { name: "Singapore",   country: "Singapore",    lat: 1.35,  lng: 103.82 },
  { name: "Casablanca",  country: "Morocco",      lat: 33.57, lng: -7.59 },
  { name: "Santos",      country: "Brazil",       lat: -23.96, lng: -46.33 },
  { name: "Durban",      country: "South Africa", lat: -29.87, lng: 31.02 },
  { name: "Sydney",      country: "Australia",    lat: -33.87, lng: 151.21 },
];

const EARTH = earthTexture;
const BUMP  = bumpTexture;

export function TradeGlobe() {
  const globeRef = useRef<GlobeMethods | undefined>(undefined);
  const wrapRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ w: 600, h: 600 });
  // Only mount/load/animate the globe once it has been scrolled into view.
  const [inView, setInView] = useState(false);
  // Flips true once the globe (and its texture) is drawn, so we can fade out
  // the loading placeholder.
  const [ready, setReady] = useState(false);
  // Holds the OrbitControls listener teardown so we can detach on unmount.
  const cleanupRef = useRef<(() => void) | null>(null);

  const hub = CN[0]!;
  const points = useMemo(
    () => [
      ...CN.map((c) => ({ ...c, color: "#F5C36B", size: c.hub ? 1.15 : 0.85 })),
      ...DEST.map((c) => ({ ...c, color: "#3B82F6", size: 0.75 })),
    ],
    []
  );
  const routes = useMemo(
    () => DEST.map((d) => ({ startLat: hub.lat, startLng: hub.lng, endLat: d.lat, endLng: d.lng })),
    [hub]
  );

  // Defer everything until the globe scrolls into view: mount the WebGL
  // component, start the texture download, and let the reveal animation play
  // only then — nothing loads or animates on initial page load.
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setInView(true);
          const warm = new Image();
          warm.src = EARTH;
          io.disconnect();
        }
      },
      { threshold: 0.2 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Responsive sizing
  useEffect(() => {
    if (!wrapRef.current) return;
    const el = wrapRef.current;
    setSize({ w: el.clientWidth, h: el.clientHeight });
    const ro = new ResizeObserver(() => setSize({ w: el.clientWidth, h: el.clientHeight }));
    ro.observe(el);
    return () => ro.disconnect();
  }, [inView]);

  // Detach control listeners on unmount.
  useEffect(() => () => cleanupRef.current?.(), []);

  // Controls: autorotate, drag pauses, resume after 30 s. Start on China.
  // Runs when the globe reports ready — the lazy component populates the ref
  // asynchronously, so a mount effect would fire too early.
  const handleReady = () => {
    const g = globeRef.current;
    if (!g) return;
    setReady(true);
    // Gentle zoom-in: start a little further out, then ease to the resting
    // altitude over ~2.2s so the Earth glides into place rather than snapping.
    g.pointOfView({ lat: 22, lng: 114, altitude: 3.4 }, 0);
    const zoomT = setTimeout(() => g.pointOfView({ lat: 22, lng: 114, altitude: 2.35 }, 2200), 80);
    const c = g.controls();
    c.enableZoom = false;
    c.enablePan = false;
    c.enableDamping = true;
    c.dampingFactor = 0.08;
    c.rotateSpeed = 0.6;
    c.autoRotate = true;
    c.autoRotateSpeed = 0.55;
    c.minPolarAngle = Math.PI * 0.18;
    c.maxPolarAngle = Math.PI * 0.82;
    let resumeT: ReturnType<typeof setTimeout> | null = null;
    const onStart = () => { c.autoRotate = false; if (resumeT) { clearTimeout(resumeT); resumeT = null; } };
    const onEnd = () => { if (resumeT) clearTimeout(resumeT); resumeT = setTimeout(() => { c.autoRotate = true; }, 30000); };
    c.addEventListener("start", onStart);
    c.addEventListener("end", onEnd);
    // bumpScale isn't on the typed GlobeMethods; set it defensively if present.
    try { const m = (g as unknown as { globeMaterial?: () => { bumpScale?: number } }).globeMaterial?.(); if (m) m.bumpScale = 8; } catch { /* noop */ }
    cleanupRef.current = () => {
      c.removeEventListener("start", onStart);
      c.removeEventListener("end", onEnd);
      if (resumeT) clearTimeout(resumeT);
      clearTimeout(zoomT);
    };
  };

  // On phone-width globes the "City · Country" labels overlap on the small
  // sphere, so shorten/shrink them (the side rail lists every destination).
  const isNarrow = size.w > 0 && size.w < 480;

  return (
    <div ref={wrapRef} className="relative h-[min(72vh,600px)] min-h-[380px] w-full">
      {/* Loading placeholder — a soft glowing orb + status line, faded out once
          the globe reports ready so the area never sits blank while the WebGL
          chunk and texture load. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 grid place-items-center transition-opacity ease-out"
        style={{ opacity: ready ? 0 : 1, transitionDuration: "1000ms" }}
      >
        <div
          className="size-[min(60vw,340px)] rounded-full"
          style={{
            background:
              "radial-gradient(circle at 42% 38%, rgba(92,130,196,0.28), rgba(30,45,72,0.18) 55%, rgba(8,10,13,0) 72%)",
            animation: "hero-glow-a 3.2s ease-in-out infinite",
          }}
        />
        <span className="mono absolute bottom-6 text-[10px] uppercase tracking-widest text-sub-muted">
          Initializing globe…
        </span>
      </div>
      {inView && (
        <Suspense fallback={null}>
          <div
            className="absolute inset-0 transition-opacity ease-out"
            style={{ opacity: ready ? 1 : 0, transitionDuration: "1400ms" }}
          >
          <Globe
            ref={globeRef}
            width={size.w}
            height={size.h}
            backgroundColor="rgba(0,0,0,0)"
            globeImageUrl={EARTH}
            bumpImageUrl={BUMP}
            onGlobeReady={handleReady}
            showAtmosphere
            atmosphereColor="#5c82c4"
            atmosphereAltitude={0.17}
            // City dots
            pointsData={points}
            pointColor={(d: any) => d.color}
            pointAltitude={0.01}
            pointRadius={(d: any) => d.size}
            pointResolution={14}
            // City + country labels
            labelsData={points}
            labelLat={(d: any) => d.lat}
            labelLng={(d: any) => d.lng}
            labelText={(d: any) => (isNarrow && !d.hub ? d.name : `${d.name} · ${d.country}`)}
            labelSize={(d: any) => (d.hub ? 1.05 : isNarrow ? 0.6 : 0.78)}
            labelDotRadius={(d: any) => (d.hub ? 0.6 : 0.42)}
            labelColor={(d: any) =>
              d.country === "China" || d.country === "Hong Kong"
                ? "rgba(245,195,107,0.96)"
                : "rgba(190,214,255,0.94)"
            }
            labelResolution={2}
            labelAltitude={0.013}
            // Trade arcs — auto-scaled altitude so long routes never clip the sphere
            arcsData={routes}
            arcColor={() => ["rgba(245,195,107,0.95)", "rgba(96,165,250,0.9)"]}
            arcAltitudeAutoScale={0.55}
            arcStroke={0.55}
            arcCurveResolution={64}
            arcDashLength={0.45}
            arcDashGap={0.18}
            arcDashAnimateTime={2200}
            // Pulsing ring on the Shanghai hub
            ringsData={CN}
            ringColor={() => (t: number) => `rgba(245,195,107,${1 - t})`}
            ringMaxRadius={3.2}
            ringPropagationSpeed={1.4}
            ringRepeatPeriod={1500}
          />
          </div>
        </Suspense>
      )}
    </div>
  );
}
