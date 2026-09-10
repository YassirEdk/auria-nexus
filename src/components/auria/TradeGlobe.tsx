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
  { name: "Barcelona",   country: "Spain",        lat: 41.38, lng: 2.17 },
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

/** Great-circle angular distance (radians, 0..π) between two lat/lng points. */
function centralAngle(aLat: number, aLng: number, bLat: number, bLng: number) {
  const r = Math.PI / 180;
  const p1 = aLat * r, p2 = bLat * r, dl = (bLng - aLng) * r;
  const x = Math.sin(p1) * Math.sin(p2) + Math.cos(p1) * Math.cos(p2) * Math.cos(dl);
  return Math.acos(Math.min(1, Math.max(-1, x)));
}

/** Camera-facing city label: an always-upright chip floating just above the
 *  city dot. The lib centres this root element on the point every frame, so the
 *  visible text is offset upward via an absolutely-positioned child. */
function makeLabel(
  d: { name: string; country: string; lat: number; lng: number; hub?: boolean },
  isNarrow: boolean
) {
  const isCN = d.country === "China" || d.country === "Hong Kong";
  const color = isCN ? "rgba(248,208,128,1)" : "rgba(225,238,255,0.98)";
  const glow = isCN ? "rgba(248,208,128,0.55)" : "rgba(125,205,255,0.5)";
  const text =
    isNarrow && !d.hub
      ? d.name
      : d.name === d.country
        ? d.name
        : `${d.name} · ${d.country}`;

  const root = document.createElement("div");
  // Stash coords so the visibility modifier can compute facing-to-camera.
  root.dataset["lat"] = String(d.lat);
  root.dataset["lng"] = String(d.lng);
  // Starts hidden; the visibility modifier fades it in as the city rotates to
  // the near face and out as it passes behind. NOTE: the globe owns this
  // element's `transform` (for positioning), so we must never set transform or
  // transition transform here — only opacity.
  root.style.cssText = [
    "position:relative",
    "pointer-events:none",
    "user-select:none",
    "opacity:0",
    "transition:opacity 0.5s ease",
  ].join(";");

  const chip = document.createElement("div");
  chip.textContent = text.toUpperCase();
  chip.style.cssText = [
    "position:absolute",
    "left:50%",
    "bottom:0",
    "transform:translate(-50%,-8px)",
    "white-space:nowrap",
    "font-family:ui-monospace,SFMono-Regular,Menlo,monospace",
    `font-size:${d.hub ? 12 : isNarrow ? 9.5 : 11}px`,
    "font-weight:600",
    "letter-spacing:0.12em",
    `color:${color}`,
    `text-shadow:0 1px 3px rgba(0,0,0,0.95),0 0 10px rgba(0,0,0,0.7),0 0 16px ${glow}`,
  ].join(";");
  root.appendChild(chip);
  return root;
}

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
      ...DEST.map((c) => ({ ...c, color: "#7DCDFF", size: 0.75 })),
    ],
    []
  );
  // Two arcs per lane sharing identical endpoints + altitude (so they ride the
  // same curve): a steady solid line, plus a short bright segment that sweeps
  // along it as a travelling glow. Altitude is derived from the great-circle
  // angle but capped, so long hauls hug the globe instead of ballooning into
  // orbital rings. All "line" arcs first, then all "glow" arcs, so the glow
  // always draws on top.
  const routes = useMemo(() => {
    const base = DEST.map((d) => {
      const angle = centralAngle(hub.lat, hub.lng, d.lat, d.lng);
      // Scale height with distance so long/near-antipodal hauls lift enough to
      // clear the sphere (a low cap makes them dive through it), while short
      // lanes stay tight to the surface.
      const alt = Math.min(0.6, 0.08 + angle * 0.16);
      return { startLat: hub.lat, startLng: hub.lng, endLat: d.lat, endLng: d.lng, alt };
    });
    return [
      ...base.map((r) => ({ ...r, kind: "line" as const })),
      ...base.map((r) => ({ ...r, kind: "glow" as const })),
    ];
  }, [hub]);

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
    // Reveal the globe unconditionally first. onGlobeReady can fire a tick
    // before React attaches globeRef; gating the reveal on the ref meant an
    // occasional null slipped through and the Earth never faded in (stayed
    // blank). Camera/controls setup is retried below until the ref is present.
    setReady(true);
    let attempts = 0;
    const setup = () => {
      const g = globeRef.current;
      if (!g) {
        if (attempts++ < 60) requestAnimationFrame(setup);
        return;
      }
      setupControls(g);
    };
    setup();
  };

  const setupControls = (g: NonNullable<typeof globeRef.current>) => {
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
            // City + country labels — camera-facing HTML so they stay upright
            // at any rotation (surface labels tilt near the globe's edge).
            htmlElementsData={points}
            htmlLat={(d: any) => d.lat}
            htmlLng={(d: any) => d.lng}
            htmlAltitude={0.012}
            htmlElement={(d: any) => makeLabel(d, isNarrow)}
            htmlElementVisibilityModifier={(el: HTMLElement, isVisible: boolean) => {
              // Only opacity — the globe controls this element's transform for
              // positioning, so touching transform here detaches the label.
              // Beyond the lib's behind-the-globe test, also hide labels near
              // the limb: show only when the city's surface normal faces the
              // camera within ~70°, so edge cities fade out before the rim.
              if (!isVisible) { el.style.opacity = "0"; return; }
              const g = globeRef.current;
              const lat = Number(el.dataset["lat"]);
              const lng = Number(el.dataset["lng"]);
              if (!g || Number.isNaN(lat) || Number.isNaN(lng)) {
                el.style.opacity = "1";
                return;
              }
              const cam = g.camera().position;
              const camLen = Math.hypot(cam.x, cam.y, cam.z) || 1;
              const phi = (90 - lat) * Math.PI / 180;
              const theta = (90 - lng) * Math.PI / 180;
              const px = Math.sin(phi) * Math.cos(theta);
              const py = Math.cos(phi);
              const pz = Math.sin(phi) * Math.sin(theta);
              const facing = (px * cam.x + py * cam.y + pz * cam.z) / camLen;
              el.style.opacity = facing > 0.34 ? "1" : "0";
            }}
            // Trade arcs — a steady solid line (gold core → soft cyan port) with
            // a short bright segment sweeping along it as a travelling glow.
            // The "line" arcs are fully solid (dash 1 / gap 0) so the global
            // dash animation leaves them untouched; only the "glow" arcs move.
            arcsData={routes}
            arcColor={(d: any) =>
              d.kind === "glow"
                ? "rgba(255,246,222,0.95)"
                : ["rgba(245,195,107,0.95)", "rgba(120,205,255,0.8)"]
            }
            arcAltitude={(d: any) => d.alt}
            arcStroke={(d: any) => (d.kind === "glow" ? 0.55 : 0.38)}
            arcCurveResolution={128}
            arcDashLength={(d: any) => (d.kind === "glow" ? 0.16 : 1)}
            arcDashGap={(d: any) => (d.kind === "glow" ? 0.84 : 0)}
            arcDashInitialGap={(d: any) => (d.kind === "glow" ? Math.random() : 0)}
            arcDashAnimateTime={2600}
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
