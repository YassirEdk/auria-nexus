import { Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import {
  ArrowUpRight, ArrowRight, Radar, ShieldCheck, Factory, Ship, Warehouse, Search,
  BadgeCheck, Handshake, Circle, AlertTriangle, FileText, Satellite, Cctv,
  ClipboardCheck, MapPin, Camera, Signal,
} from "lucide-react";
import { SiteLayout } from "./SiteShell";
import { openRequestAccess } from "./RequestAccessModal";
import { usePerfLite, useIsMobileViewport } from "@/hooks/use-perf";

const modules = [
  { icon: Search,        title: "Sourcing Signals",     copy: "Live supplier intake from verified Chinese manufacturing hubs, ranked by capability match." },
  { icon: BadgeCheck,    title: "Supplier Verification", copy: "Cross-referenced compliance, factory audit records and shipment history in one dossier." },
  { icon: Handshake,     title: "Negotiation Ops",       copy: "Comparative quotes, MOQ benchmarks and negotiation runbooks per SKU family." },
  { icon: ShieldCheck,   title: "Quality Assurance",     copy: "Pre-shipment inspection scheduling and defect telemetry from third-party inspectors." },
  { icon: Factory,       title: "Production Tracking",   copy: "Line-level milestones, tooling status and daily output signals per PO." },
  { icon: Warehouse,     title: "Consolidation Ops",     copy: "Multi-supplier warehousing, palletization and export prep at the Shanghai node." },
  { icon: Ship,          title: "Logistics Feed",        copy: "Booking, container status and ETA drift across ocean, air and rail lanes." },
  { icon: Radar,         title: "Risk Radar",            copy: "Continuous scanning for tariff, sanctions and lane-disruption signals." },
] as const;

const timeline = [
  { time: "T-00:00:14", tone: "green" as const,  source: "SHANGHAI HUB",         body: "Container MSKU-4482103 loaded at Yangshan. Manifest cross-signed by carrier + inspector.", score: "97% high confidence" },
  { time: "T-00:02:41", tone: "blue" as const,   source: "QC INSPECTOR · SGS",   body: "Batch 118A passed AQL 2.5 with zero critical defects. 200/200 units sampled.",              score: "94% verified" },
  { time: "T-00:11:07", tone: "amber" as const,  source: "SUPPLIER TELEMETRY",   body: "Line 2 output down 8% vs plan. Awaiting reason code from Guangzhou plant.",                 score: "62% partial" },
  { time: "T-00:29:22", tone: "green" as const,  source: "CUSTOMS BROKER",       body: "HS reclassification 8471.30 accepted. Duty rate confirmed at 0% under CN-EU RCEP.",         score: "99% official" },
  { time: "T-01:14:55", tone: "red" as const,    source: "LANE RISK ENGINE",     body: "Red Sea reroute advisory issued. 3 in-flight bookings automatically re-quoted via Suez.",   score: "88% critical" },
];

const mapNodes = [
  { id: "shanghai", x: 68, y: 42, label: "SHANGHAI", tone: "blue", hub: true },
  { id: "rotterdam", x: 47, y: 30, label: "ROTTERDAM", tone: "green" },
  { id: "la", x: 15, y: 38, label: "LOS ANGELES", tone: "green" },
  { id: "dubai", x: 55, y: 46, label: "DUBAI", tone: "green" },
  { id: "sydney", x: 82, y: 70, label: "SYDNEY", tone: "amber" },
  { id: "casablanca", x: 30, y: 62, label: "CASABLANCA", tone: "green" },
  { id: "capetown", x: 50, y: 66, label: "CAPE TOWN", tone: "red" },
] as const;

const toneColor: Record<string, string> = {
  blue: "#3B82F6",
  green: "#10B981",
  amber: "#F59E0B",
  red: "#EF4444",
};

/**
 * Build a responsive srcSet for an Unsplash image URL. Strips any existing
 * `w=` / `q=` and emits a 400/640/900 ladder — enough range for tiles that
 * render at ~360px on mobile and up to ~600px in a 3-col grid on desktop.
 */
function unsplashSrcSet(src: string, opts?: { widths?: number[]; quality?: number }) {
  if (!/images\.unsplash\.com/.test(src)) return undefined;
  const widths = opts?.widths ?? [400, 640, 900];
  const q = opts?.quality ?? 60;
  const base = src.replace(/([?&])(w|q|auto|fit)=[^&]*/g, "").replace(/([?&])&+/g, "$1");
  const sep = base.includes("?") ? "&" : "?";
  return widths
    .map((w) => `${base}${sep}w=${w}&q=${q}&auto=format&fit=crop ${w}w`)
    .join(", ");
}

function Reveal({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const lite = usePerfLite();
  if (lite) {
    return <div className={className}>{children}</div>;
  }
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

/**
 * Animated count-up. Triggers once when scrolled into view.
 */
function CountUp({
  end, prefix = "", suffix = "", duration = 1600, decimals = 0,
  className = "",
}: { end: number; prefix?: string; suffix?: string; duration?: number; decimals?: number; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [val, setVal] = useState(0);
  const startedRef = useRef(false);

  useEffect(() => {
    if (!ref.current) return;
    const el = ref.current;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !startedRef.current) {
          startedRef.current = true;
          const startTime = performance.now();
          const from = 0;
          const to = end;
          const tick = (now: number) => {
            const t = Math.min(1, (now - startTime) / duration);
            const eased = 1 - Math.pow(1 - t, 3);
            setVal(from + (to - from) * eased);
            if (t < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [end, duration]);

  const formatted = val.toLocaleString(undefined, {
    minimumFractionDigits: decimals, maximumFractionDigits: decimals,
  });

  return <span ref={ref} className={className}>{prefix}{formatted}{suffix}</span>;
}

/**
 * Mouse-follow 3D tilt wrapper. Applies perspective transform on hover
 * and eases back on leave. Also drives a --mx/--my CSS var for children.
 */
function isLowPerfEnv() {
  if (typeof window === "undefined") return false;
  const d = document.documentElement;
  if (d.classList.contains("perf-lite") || d.classList.contains("is-touch")) return true;
  return window.matchMedia?.("(pointer: coarse)").matches ?? false;
}

function TiltCard({
  children, className = "", intensity = 6,
}: { children: React.ReactNode; className?: string; intensity?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    setEnabled(!isLowPerfEnv());
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  if (!enabled) {
    return <div className={`tilt-card ${className}`}>{children}</div>;
  }

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const clientX = e.clientX;
    const clientY = e.clientY;
    if (rafRef.current) return;
    rafRef.current = requestAnimationFrame(() => {
      rafRef.current = null;
      const r = el.getBoundingClientRect();
      const px = (clientX - r.left) / r.width;
      const py = (clientY - r.top) / r.height;
      const rx = (py - 0.5) * -intensity;
      const ry = (px - 0.5) * intensity;
      el.style.transition = "transform 0.12s linear";
      el.style.transform = `perspective(1100px) rotateX(${rx.toFixed(2)}deg) rotateY(${ry.toFixed(2)}deg) translateZ(0)`;
      el.style.setProperty("--mx", `${(px * 100).toFixed(2)}%`);
      el.style.setProperty("--my", `${(py * 100).toFixed(2)}%`);
    });
  };

  const onLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transition = "transform 0.55s cubic-bezier(0.22, 1, 0.36, 1)";
    el.style.transform = "perspective(1100px) rotateX(0deg) rotateY(0deg) translateZ(0)";
  };

  return (
    <div ref={ref} onMouseMove={onMove} onMouseLeave={onLeave} className={`tilt-card ${className}`}>
      {children}
    </div>
  );
}

/**
 * Cursor-follow radial spotlight overlay. Sits absolutely inside a
 * `relative` parent and drives a CSS variable used by the ::before layer.
 */
function CursorSpotlight({ tone = "#3B82F6", size = 480, opacity = 0.16 }: { tone?: string; size?: number; opacity?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;
    const el = ref.current;
    if (!el) return;
    const parent = el.parentElement;
    if (!parent) return;

    let ticking = false;
    let lx = 0, ly = 0;

    const update = (clientX: number, clientY: number) => {
      lx = clientX; ly = clientY;
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        ticking = false;
        const r = parent.getBoundingClientRect();
        el.style.setProperty("--sx", `${lx - r.left}px`);
        el.style.setProperty("--sy", `${ly - r.top}px`);
        el.style.opacity = "1";
      });
    };

    const onPointerMove = (e: PointerEvent) => {
      if (e.pointerType === "touch") return;
      update(e.clientX, e.clientY);
    };
    const onMouseMove = (e: MouseEvent) => update(e.clientX, e.clientY);
    const onLeave = () => { el.style.opacity = "0"; };

    const supportsPointer = "PointerEvent" in window;
    if (supportsPointer) {
      parent.addEventListener("pointermove", onPointerMove, { passive: true });
      parent.addEventListener("pointerleave", onLeave);
    } else {
      parent.addEventListener("mousemove", onMouseMove, { passive: true });
      parent.addEventListener("mouseleave", onLeave);
    }
    return () => {
      if (supportsPointer) {
        parent.removeEventListener("pointermove", onPointerMove);
        parent.removeEventListener("pointerleave", onLeave);
      } else {
        parent.removeEventListener("mousemove", onMouseMove);
        parent.removeEventListener("mouseleave", onLeave);
      }
    };
  }, []);

  const hex = (o: number) => Math.round(o * 255).toString(16).padStart(2, "0");
  const c1 = `${tone}${hex(opacity)}`;
  const c2 = `${tone}${hex(opacity * 0.55)}`;
  const c3 = `${tone}00`;

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300"
      style={{
        background: `radial-gradient(circle ${size}px at var(--sx, 50%) var(--sy, 50%), ${c1} 0%, ${c2} 30%, ${c3} 65%)`,
        WebkitMaskImage: "linear-gradient(#000, #000)",
      }}
    />
  );
}

/**
 * Framed feed tile with tactical overlays, timecode, tone badge and ken-burns
 * motion. Uses an image for reliable, on-theme logistics content.
 */
function VideoTile({
  src, node, tag, tone, timecode, className = "",
  aspect = "aspect-[16/10]", index = 0,
}: {
  src: string; node: string; tag: string;
  tone: "green" | "blue" | "amber" | "red";
  timecode: string; className?: string; aspect?: string; index?: number;
}) {
  return (
    <figure className={`scan-line-container group relative ${aspect} overflow-hidden panel ${className}`}>
      <img
        src={src}
        srcSet={unsplashSrcSet(src)}
        sizes="(max-width: 640px) 92vw, (max-width: 1024px) 45vw, 30vw"
        alt={`Feed from ${node}`}
        loading="lazy"
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover opacity-70 saturate-[0.8] transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:opacity-95 group-hover:saturate-100 group-hover:scale-[1.03]"
        style={{
          filter: "contrast(1.05) brightness(0.9)",
          animation: `ken-burns ${22 + (index % 5) * 2}s ease-in-out infinite ${index % 2 ? "reverse" : "normal"}`,
        }}
      />
      {/* film-grain overlay */}
      <div aria-hidden className="pointer-events-none absolute inset-0 mix-blend-overlay opacity-30 auria-grain" />
      {/* tint gradient */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(8,10,13,0.10) 0%, rgba(8,10,13,0.55) 60%, rgba(8,10,13,0.95) 100%)",
        }}
      />
      {/* Corner brackets */}
      <span className="pointer-events-none absolute left-3 top-3 size-3 border-l border-t border-blue/70" />
      <span className="pointer-events-none absolute right-3 top-3 size-3 border-r border-t border-blue/70" />
      <span className="pointer-events-none absolute left-3 bottom-3 size-3 border-l border-b border-blue/70" />
      <span className="pointer-events-none absolute right-3 bottom-3 size-3 border-r border-b border-blue/70" />

      {/* Top row: LIVE dot + timecode */}
      <div className="absolute inset-x-3 top-3 flex items-start justify-between">
        <span className="glass-panel inline-flex items-center gap-2 px-2 py-1">
          <span className="status-dot" style={{ background: toneColor[tone], color: toneColor[tone] }} />
          <span className="mono text-[9px] uppercase tracking-widest text-heading">LIVE · {tone.toUpperCase()}</span>
        </span>
        <span className="glass-panel mono px-2 py-1 text-[9px] uppercase tracking-widest text-blue">
          {timecode}
        </span>
      </div>

      <figcaption className="absolute inset-x-0 bottom-0 p-5 md:p-6">
        <p className="mono text-[10px] uppercase tracking-widest text-blue">{node}</p>
        <p className="mt-2 text-base font-semibold text-heading md:text-lg">{tag}</p>
        <div className="mono mt-3 flex items-center justify-between text-[9px] uppercase tracking-widest text-sub-muted">
          <span className="inline-flex items-center gap-2">
            <Signal className="size-3" />
            channel · CH-{String(10 + index).padStart(2, "0")}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="status-dot" style={{ background: "#10B981", color: "#10B981" }} />
            signed
          </span>
        </div>
      </figcaption>
    </figure>
  );
}

function IntelMap() {
  const hub = mapNodes[0];
  return (
    <div className="space-y-4 lg:space-y-0">
      <IntelMapCanvas hub={hub} />
      {/* Mobile-only: surface the Incident + Telemetry side panels as stacked
          cards under the map, since they would otherwise overlap the smaller
          canvas. Hidden on lg+ where the overlay versions inside the map fit. */}
      <div className="grid gap-3 lg:hidden">
        <IncidentCard />
        <TelemetryCard />
      </div>
    </div>
  );
}

function IntelMapCanvas({ hub }: { hub: typeof mapNodes[number] }) {
  return (
    <div className="scan-line-container relative aspect-[4/3] w-full overflow-hidden panel sm:aspect-[16/9] lg:aspect-[21/9]">
      {/* radial glow + green wash */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 65% 45%, rgba(59,130,246,0.14), transparent 55%), radial-gradient(ellipse at 20% 80%, rgba(16,185,129,0.05), transparent 60%)",
        }}
      />
      {/* fine grid */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-70"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />
      {/* dot cloud with soft mask */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          backgroundImage: "radial-gradient(rgba(148,163,184,0.16) 1px, transparent 1px)",
          backgroundSize: "18px 18px",
          maskImage: "radial-gradient(ellipse at 50% 50%, black 40%, transparent 88%)",
          WebkitMaskImage: "radial-gradient(ellipse at 50% 50%, black 40%, transparent 88%)",
        }}
      />

      {/* soft landmass hints — three faint radial gradients suggesting continents */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 22% 30% at 22% 42%, rgba(148,163,184,0.06), transparent 60%)," + // Americas
            "radial-gradient(ellipse 20% 35% at 50% 46%, rgba(148,163,184,0.05), transparent 60%)," + // EMEA
            "radial-gradient(ellipse 22% 30% at 74% 48%, rgba(148,163,184,0.06), transparent 60%)",  // Asia-Pac
        }}
      />

      {/* corner brackets */}
      <span className="pointer-events-none absolute left-3 top-3 size-4 border-l border-t border-blue/50" />
      <span className="pointer-events-none absolute right-3 top-3 size-4 border-r border-t border-blue/50" />
      <span className="pointer-events-none absolute left-3 bottom-3 size-4 border-l border-b border-blue/50" />
      <span className="pointer-events-none absolute right-3 bottom-3 size-4 border-r border-b border-blue/50" />

      {/* coordinate ticks along top edge */}
      <div className="pointer-events-none absolute inset-x-0 top-8 flex justify-between px-14">
        {["-120°", "-60°", "0°", "60°", "120°"].map((t) => (
          <span key={t} className="mono text-[8px] tracking-widest text-sub-muted/70">{t}</span>
        ))}
      </div>

      {/* SVG layer: arcs — viewBox matches % positioning, non-scaling strokes stay uniform */}
      <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full" preserveAspectRatio="none">
        {mapNodes.filter((n) => !n.hub).map((n) => {
          const mx = (hub.x + n.x) / 2;
          const my = Math.min(hub.y, n.y) - Math.hypot(hub.x - n.x, hub.y - n.y) * 0.22;
          const d = `M ${hub.x} ${hub.y} Q ${mx} ${my} ${n.x} ${n.y}`;
          return (
            <g key={`arc-${n.id}`}>
              {/* base rail — solid line connecting hub → node; bumped from 0.25
                  to 0.45 opacity so the connection is legible even when the
                  flowing dash is in a gap phase */}
              <path
                d={d}
                fill="none"
                stroke={toneColor[n.tone]}
                strokeOpacity="0.45"
                strokeWidth="1"
                vectorEffect="non-scaling-stroke"
              />
              {/* flowing signal — a small bright dash travels along the rail */}
              <path
                d={d}
                fill="none"
                stroke={toneColor[n.tone]}
                strokeOpacity="0.95"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeDasharray="6 54"
                vectorEffect="non-scaling-stroke"
                style={{
                  animation: `arc-flow ${2.8 + (n.x % 4) * 0.4}s linear infinite`,
                  filter: `drop-shadow(0 0 4px ${toneColor[n.tone]}88)`,
                }}
              />
            </g>
          );
        })}
      </svg>

      {/* Hub crosshair — DOM circles keep their shape regardless of aspect */}
      <div
        aria-hidden
        className="pointer-events-none absolute -translate-x-1/2 -translate-y-1/2"
        style={{ left: `${hub.x}%`, top: `${hub.y}%` }}
      >
        <div className="relative grid size-24 place-items-center">
          <span className="absolute inset-3 rounded-full border border-dashed border-blue/40" />
          <span className="absolute inset-8 rounded-full border border-blue/50" />
          <span className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-blue/40" style={{ backgroundImage: "linear-gradient(to right, transparent 0, rgba(59,130,246,0.45) 10%, rgba(59,130,246,0.45) 90%, transparent 100%)" }} />
          <span className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-blue/40" style={{ backgroundImage: "linear-gradient(to bottom, transparent 0, rgba(59,130,246,0.45) 10%, rgba(59,130,246,0.45) 90%, transparent 100%)" }} />
        </div>
      </div>

      {/* Node dots + labels */}
      {mapNodes.map((n, i) => {
        const rightSide = n.x > 62;
        const bearing = Math.round(Math.atan2(n.y - hub.y, n.x - hub.x) * (180 / Math.PI));
        const distance = Math.round(Math.hypot(n.y - hub.y, n.x - hub.x) * 120);
        const signalBars = n.tone === "red" ? 2 : n.tone === "amber" ? 3 : 5;
        // Mobile: for horizontally-close nodes, alternate the label position
        // (above vs below the dot) so labels don't collide. Hub goes above so
        // it clears the 96px crosshair.
        const labelAboveOnMobile = n.hub || n.id === "dubai" || n.id === "capetown" || n.id === "rotterdam";
        return (
          <div key={n.id} className="absolute -translate-x-1/2 -translate-y-1/2" style={{ left: `${n.x}%`, top: `${n.y}%` }}>
            {/* soft blur halo */}
            <span
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-40"
              style={{ width: n.hub ? 26 : 18, height: n.hub ? 26 : 18, background: toneColor[n.tone], filter: "blur(8px)" }}
            />
            {/* pulsing rings — two staggered for depth */}
            <span
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border"
              style={{
                width: n.hub ? 26 : 18,
                height: n.hub ? 26 : 18,
                borderColor: toneColor[n.tone],
                animation: `node-ring 2.4s ${i * 0.35}s ease-out infinite`,
              }}
            />
            <span
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border"
              style={{
                width: n.hub ? 26 : 18,
                height: n.hub ? 26 : 18,
                borderColor: toneColor[n.tone],
                animation: `node-ring 2.4s ${i * 0.35 + 1.2}s ease-out infinite`,
              }}
            />
            {/* core dot */}
            <span
              className="relative block rounded-full"
              style={{
                width: n.hub ? 10 : 7,
                height: n.hub ? 10 : 7,
                background: toneColor[n.tone],
                boxShadow: `0 0 0 3px ${toneColor[n.tone]}22, 0 0 12px ${toneColor[n.tone]}88`,
              }}
            />
            {/* label + telemetry.
                Mobile (<lg): centered above OR below the dot, no signal bars /
                bearing, so labels don't crowd on a narrow map. Hub gets extra
                offset to clear its 96px crosshair.
                lg+: original side-of-dot layout with bars + bearing subline. */}
            <div
              className={[
                "absolute whitespace-nowrap",
                // Mobile positioning
                "left-1/2 -translate-x-1/2",
                labelAboveOnMobile
                  ? n.hub ? "bottom-full mb-14" : "bottom-full mb-1.5"
                  : n.hub ? "top-full mt-14" : "top-full mt-1.5",
                // lg+: beside the dot, vertically centered
                "lg:top-1/2 lg:bottom-auto lg:mt-0 lg:mb-0 lg:-translate-y-1/2 lg:translate-x-0",
                rightSide ? "lg:left-auto lg:right-5 lg:text-right" : "lg:left-5 lg:right-auto lg:text-left",
              ].join(" ")}
            >
              <div
                className={[
                  "flex items-center gap-2 justify-center",
                  rightSide ? "lg:justify-end" : "lg:justify-start",
                ].join(" ")}
              >
                <span
                  className="mono text-[8px] font-semibold uppercase tracking-widest lg:text-[9px]"
                  style={{
                    color: toneColor[n.tone],
                    textShadow: "0 0 6px rgba(8,10,13,0.9), 0 1px 2px rgba(8,10,13,0.9)",
                  }}
                >
                  {n.label}
                </span>
                {/* signal-strength bars — lg+ only, they eat horizontal space */}
                <span className="hidden items-end gap-[1.5px] lg:flex">
                  {[1, 2, 3, 4, 5].map((b) => (
                    <span
                      key={b}
                      className="w-[2px]"
                      style={{
                        height: `${3 + b * 1.5}px`,
                        background: b <= signalBars ? toneColor[n.tone] : "rgba(148,163,184,0.15)",
                      }}
                    />
                  ))}
                </span>
              </div>
              {!n.hub && (
                <span
                  className={[
                    "mono mt-0.5 hidden gap-2 text-[8px] uppercase tracking-widest text-sub-muted/80 lg:flex",
                    rightSide ? "justify-end" : "",
                  ].join(" ")}
                >
                  <span>brg {String(((bearing + 360) % 360)).padStart(3, "0")}°</span>
                  <span className="opacity-50">·</span>
                  <span>{distance}nm</span>
                </span>
              )}
            </div>
          </div>
        );
      })}

      {/* Incident card overlay — lg+ only. On mobile it renders as a stacked
          card BELOW the map, wired up by IntelMap. */}
      <div className="glass-panel absolute left-3 top-10 hidden w-[220px] p-4 shadow-2xl md:left-6 md:top-14 lg:block" style={{ boxShadow: "0 20px 40px -10px rgba(239,68,68,0.15), 0 0 0 1px rgba(239,68,68,0.15) inset" }}>
        <IncidentCardBody />
      </div>

      {/* Telemetry feed overlay — lg+ only, same as above */}
      <div className="glass-panel absolute right-3 top-10 hidden w-[240px] p-4 shadow-2xl md:right-6 md:top-14 lg:block" style={{ boxShadow: "0 20px 40px -10px rgba(59,130,246,0.15), 0 0 0 1px rgba(59,130,246,0.15) inset" }}>
        <TelemetryCardBody />
      </div>

      {/* Bottom status bar — mobile hides secondary items (lat/lng, "active",
          "advisory" long forms) so the row fits one line at 320-400px widths. */}
      <div className="absolute inset-x-0 bottom-0 border-t border-line bg-background/85 px-3 py-2 backdrop-blur-sm md:px-6">
        <div className="mono flex items-center justify-between gap-2 whitespace-nowrap text-[8px] uppercase tracking-widest text-sub-muted sm:text-[9px]">
          <span className="inline-flex items-center gap-1.5 sm:gap-2">
            <span className="status-dot" style={{ background: "#10B981", color: "#10B981" }} />
            net.map · sync
          </span>
          <span>07 nodes</span>
          <span>04 lanes<span className="hidden sm:inline"> active</span></span>
          <span>01 adv<span className="hidden sm:inline">isory</span></span>
          <span className="hidden text-blue md:inline">lat 31.23 · lng 121.47</span>
        </div>
      </div>
    </div>
  );
}

/* ————— Incident + Telemetry card bodies (shared by overlay + mobile card) ————— */
function IncidentCardBody() {
  return (
    <>
      <div className="mb-3 flex items-start justify-between">
        <div className="flex items-center gap-2">
          <span className="status-dot" style={{ background: "#EF4444", color: "#EF4444" }} />
          <span className="label-mono text-red">Live Incident</span>
        </div>
        <span className="mono text-[8px] text-sub-muted">INC-4482</span>
      </div>
      <p className="mb-3 text-[12px] leading-5 text-heading">
        Lane disruption · Red Sea corridor
      </p>
      <div className="mb-1 flex items-center justify-between">
        <span className="mono text-[9px] uppercase tracking-widest text-sub-muted">Confidence</span>
        <span className="mono text-[10px] font-semibold text-red">91%</span>
      </div>
      <div className="h-1 w-full overflow-hidden bg-white/10">
        <div className="h-full" style={{ width: "91%", background: "linear-gradient(90deg, #EF4444, #f87171)" }} />
      </div>
      <div className="mt-3 flex flex-wrap gap-1.5">
        <span className="status-badge tone-red"><AlertTriangle className="size-2.5" /> Critical</span>
        <span className="status-badge tone-muted">3 lanes</span>
      </div>
    </>
  );
}

function TelemetryCardBody() {
  return (
    <>
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="status-dot" style={{ background: "#3B82F6", color: "#3B82F6" }} />
          <span className="label-mono text-blue">Telemetry Feed</span>
        </div>
        <span className="mono text-[8px] text-sub-muted">FEED-01</span>
      </div>
      <ul className="space-y-1.5">
        {[
          ["T-00:00", "SHA hub · load ok", "green"],
          ["T-00:03", "QC · batch 118A pass", "green"],
          ["T-00:11", "GZ plant · output -8%", "amber"],
          ["T-00:29", "Customs · HS accepted", "green"],
        ].map(([t, msg, tone]) => (
          <li key={t} className="mono flex items-baseline gap-2 text-[10px] leading-4">
            <span className="text-sub-muted">{t}</span>
            <span className="size-1 rounded-full" style={{ background: toneColor[tone], display: "inline-block" }} />
            <span className="text-muted-foreground">{msg}</span>
          </li>
        ))}
      </ul>
    </>
  );
}

/* Wrappers rendered as stacked cards below the map on mobile (< lg). */
function IncidentCard() {
  return (
    <div className="panel p-4" style={{ boxShadow: "0 12px 30px -14px rgba(239,68,68,0.20), 0 0 0 1px rgba(239,68,68,0.14) inset" }}>
      <IncidentCardBody />
    </div>
  );
}

function TelemetryCard() {
  return (
    <div className="panel p-4" style={{ boxShadow: "0 12px 30px -14px rgba(59,130,246,0.20), 0 0 0 1px rgba(59,130,246,0.14) inset" }}>
      <TelemetryCardBody />
    </div>
  );
}

function Sparkbars({ animated = true }: { animated?: boolean }) {
  const lite = usePerfLite();
  const bars = [0.4, 0.65, 0.55, 0.8, 0.7, 0.9, 0.5, 0.75, 0.85, 0.65, 0.95, 0.7, 0.6, 0.85, 0.9, 0.5];
  const play = animated && !lite;
  return (
    <div className="flex h-14 items-end gap-1">
      {bars.map((v, i) => (
        <span
          key={i}
          className="flex-1 origin-bottom bg-blue/60"
          style={{
            height: `${v * 100}%`,
            animation: play ? `bar-pulse 1.6s ease-in-out infinite` : undefined,
            animationDelay: play ? `${i * 0.08}s` : undefined,
          }}
        />
      ))}
    </div>
  );
}


/**
 * Two rows of animated bandwidth ticks along the bottom of the broadcast
 * feature panel. 48 bars on desktop is heavy; fall back to 20 on mobile /
 * static on perf-lite so we stop paying for a 48-item staggered infinite loop.
 */
function BandwidthBars() {
  const lite = usePerfLite();
  const mobile = useIsMobileViewport();
  const count = lite ? 0 : mobile ? 20 : 48;
  if (count === 0) return null;
  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-0 flex h-1 gap-[2px]">
      {Array.from({ length: count }).map((_, i) => (
        <span
          key={i}
          className="flex-1"
          style={{
            background: "rgba(59,130,246,0.55)",
            animation: `bar-pulse 1.4s ease-in-out infinite`,
            animationDelay: `${(i % 12) * 0.06}s`,
          }}
        />
      ))}
    </div>
  );
}

function LivePanel() {
  return (
    <div className="panel live-panel--static relative overflow-hidden p-5 lg:p-6">
      <div className="flex items-center justify-between border-b border-line pb-3">
        <div className="flex items-center gap-2">
          <span className="status-dot" style={{ background: "#10B981", color: "#10B981" }} />
          <span className="label-mono text-heading">Live Operations</span>
        </div>
        <span className="mono text-[9px] text-sub-muted">OPS-01 · SYNC</span>
      </div>

      {/* Uptime + throughput */}
      <div className="mt-5 grid grid-cols-2 gap-4">
        <div>
          <p className="label-mono">Uptime · 30d</p>
          <p className="mono mt-2 text-3xl font-semibold text-green">99.98%</p>
          <div className="mt-2 h-1 w-full overflow-hidden bg-white/10">
            <div className="h-full bg-green" style={{ width: "99.98%" }} />
          </div>
        </div>
        <div>
          <p className="label-mono">Signals · 1h</p>
          <p className="mono mt-2 text-3xl font-semibold text-blue">12,482</p>
          <Sparkbars animated={false} />
        </div>
      </div>

      {/* Node status list */}
      <div className="mt-6">
        <p className="label-mono mb-3">Node status</p>
        <ul className="divide-y divide-line">
          {[
            ["Shanghai · SHA", "OK", "green"],
            ["Rotterdam · NL", "OK", "green"],
            ["Los Angeles · US", "OK", "green"],
            ["Dubai · AE", "OK", "green"],
            ["Sydney · AU", "WATCH", "amber"],
            ["Cape Town · ZA", "ALERT", "red"],
          ].map(([label, status, tone]) => (
            <li key={label} className="flex items-center justify-between py-2 text-[13px]">
              <span className="mono uppercase tracking-widest text-muted-foreground">{label}</span>
              <span className={`status-badge tone-${tone}`}>
                <span className="status-dot" style={{ background: toneColor[tone], color: toneColor[tone] }} />
                {status}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Bottom meta */}
      <div className="mono mt-6 flex items-center justify-between border-t border-line pt-3 text-[9px] uppercase tracking-widest text-sub-muted">
        <span>refresh · 1s</span>
        <span>lat 31.23 · lng 121.47</span>
      </div>
    </div>
  );
}

function Hero() {
  const lite = usePerfLite();
  const isMobile = useIsMobileViewport();
  return (
    <section className="relative overflow-hidden border-b border-line pt-24 pb-16 sm:pt-28 sm:pb-24 lg:pt-36 lg:pb-32">
      {/* Cinematic backdrop — container port aerial, ken-burns motion */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?w=1200&q=70&auto=format&fit=crop"
          srcSet="https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?w=480&q=55&auto=format&fit=crop 480w, https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?w=800&q=60&auto=format&fit=crop 800w, https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?w=1200&q=70&auto=format&fit=crop 1200w, https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?w=1800&q=75&auto=format&fit=crop 1800w"
          sizes="100vw"
          alt=""
          loading="eager"
          decoding="async"
          fetchPriority="high"
          className="h-full w-full object-cover opacity-[0.28] saturate-[0.55]"
          style={{
            filter: "contrast(1.05) brightness(0.75) hue-rotate(190deg)",
            animation: "ken-burns 32s ease-in-out infinite",
          }}
        />
        {/* Deep vignette so the backdrop reads as ambient texture, not content */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 50% 40%, rgba(8,10,13,0.25) 0%, rgba(8,10,13,0.75) 55%, rgba(8,10,13,0.98) 100%)",
          }}
        />
      </div>

      {/* Cursor-follow spotlight over the whole hero — desktop only */}
      {!isMobile && <CursorSpotlight tone="#3B82F6" size={420} opacity={0.1} />}

      {/* Animated glow layers — desktop / non-lite only. On mobile these cause big
          per-frame blur repaints that torch the scroll fps. */}
      {!lite && !isMobile && (
        <>
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-40"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)",
              backgroundSize: "80px 80px",
              maskImage: "radial-gradient(ellipse at 50% 50%, black 30%, transparent 80%)",
              WebkitMaskImage: "radial-gradient(ellipse at 50% 50%, black 30%, transparent 80%)",
            }}
          />
        </>
      )}

      <div className="site-container relative">
        <div className="grid gap-10 sm:gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
          {/* Left */}
          <Reveal>
            <div className="flex flex-wrap items-center gap-2">
              <span className="status-badge tone-blue">
                <span className="status-dot" style={{ background: "#3B82F6", color: "#3B82F6" }} />
                System online
              </span>
              <span className="status-badge tone-green">
                <span className="status-dot" style={{ background: "#10B981", color: "#10B981" }} />
                07 nodes
              </span>
              <span className="status-badge tone-amber">1 watch</span>
              <span className="status-badge tone-muted">v1.0 · china → global</span>
            </div>

            <h1 className="serif-display mt-6 select-none text-[34px] leading-[1.05] tracking-tight text-heading sm:text-[46px] sm:leading-[1.02] md:text-[76px]">
              Global sourcing<br />
              <span className="italic">intelligence,</span><br />
              <span className="text-muted-foreground">corroborated at the source.</span>
            </h1>

            <p className="mt-6 max-w-xl select-none text-[15px] leading-6 text-muted-foreground sm:mt-8 sm:text-base sm:leading-7 md:text-lg">
              AURIA is a tactical operations layer for global trade. One console for sourcing, verification, quality control and logistics from China — every decision backed by more than one signal.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3 sm:mt-10">
              <button type="button" onClick={openRequestAccess} className="btn-primary">
                Apply Now <ArrowUpRight className="size-3.5" />
              </button>
              <Link to="/about" className="btn-ghost-line">
                Explore Us <ArrowRight className="size-3.5" />
              </Link>
              <span className="mono ml-1 hidden items-center gap-2 text-[11px] uppercase tracking-widest text-sub-muted sm:inline-flex">
                <span className="status-dot" style={{ background: "#10B981", color: "#10B981" }} />
                deploys · 48h
              </span>
            </div>

            {/* Micro KPI row — animated count-ups */}
            <div className="mt-10 grid max-w-2xl grid-cols-2 gap-5 border-t border-line pt-6 sm:mt-14 sm:gap-6 sm:pt-8 sm:grid-cols-4">
              {[
                { l: "Uptime", n: 99.98, suffix: "%", decimals: 2, tone: "green" },
                { l: "Latency", n: 1.4, suffix: "s", decimals: 1, tone: "blue" },
                { l: "Lanes", n: 42, suffix: "", decimals: 0, tone: "blue" },
                { l: "Advisories", n: 3, suffix: "", decimals: 0, tone: "red", pad: true },
              ].map((k) => (
                <div key={k.l}>
                  <p className="label-mono">{k.l}</p>
                  <p className="mono mt-2 text-2xl font-semibold" style={{ color: toneColor[k.tone] }}>
                    <CountUp
                      end={k.n}
                      suffix={k.suffix}
                      decimals={k.decimals}
                      prefix={k.pad ? "0" : ""}
                    />
                  </p>
                </div>
              ))}
            </div>
          </Reveal>

          {/* Right: live panel */}
          <Reveal delay={0.15}>
            <LivePanel />
          </Reveal>
        </div>

        <Reveal delay={0.2} className="mt-16 hidden md:block">
          <IntelMap />
        </Reveal>
      </div>
    </section>
  );
}

function Comparison() {
  return (
    <section id="comparison" className="scroll-mt-20 border-b border-line py-16 sm:py-24 lg:py-32">
      <div className="site-container">
        <Reveal className="text-center">
          <span className="label-mono">/ 02 Signals</span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-heading md:text-5xl">
            One signal is not enough.
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-muted-foreground md:text-base">
            A supplier quote is a claim. A shipment update is a claim. AURIA only marks a supply chain event as truthful once it is corroborated across independent sources.
          </p>
        </Reveal>

        <div className="mt-10 grid sm:mt-14 gap-6 md:grid-cols-2">
          {/* Unverified */}
          <Reveal>
            <div className="panel p-6 md:p-8">
              <div className="flex items-center justify-between">
                <span className="label-mono text-amber">Unverified</span>
                <span className="status-badge tone-amber">
                  <span className="status-dot" style={{ background: "#F59E0B", color: "#F59E0B" }} /> low confidence
                </span>
              </div>
              <h3 className="mt-6 text-xl font-semibold text-heading">Single-source claim</h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                Supplier self-reports on production, quality, and shipment. Nothing to cross-check against.
              </p>
              <div className="mt-8">
                <p className="label-mono mb-3">Corroborating evidence</p>
                <div className="dashed-empty">No secondary signals attached</div>
              </div>
              <div className="mt-8 flex items-center justify-between border-t border-line pt-4">
                <span className="mono text-[11px] uppercase tracking-widest text-sub-muted">Confidence</span>
                <span className="mono text-sm font-semibold text-amber">32%</span>
              </div>
            </div>
          </Reveal>

          {/* Corroborated */}
          <Reveal delay={0.1}>
            <div className="relative panel border-blue/60 p-6 md:p-8" style={{ boxShadow: "0 20px 60px -20px rgba(59,130,246,0.25)", borderColor: "rgba(59,130,246,0.55)" }}>
              <div className="flex items-center justify-between">
                <span className="label-mono text-blue">Corroborated</span>
                <span className="status-badge tone-green">
                  <span className="status-dot" style={{ background: "#10B981", color: "#10B981" }} /> 91% high confidence
                </span>
              </div>
              <h3 className="mt-6 text-xl font-semibold text-heading">Cross-signed event</h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                Four independent evidence streams align on the same event before AURIA marks it truthful.
              </p>
              <div className="mt-8 grid grid-cols-2 gap-3">
                {[
                  [Satellite, "Sensors", "Line telemetry"],
                  [Cctv, "CCTV", "Warehouse camera"],
                  [ClipboardCheck, "Reports", "Inspector PDF"],
                  [BadgeCheck, "Official", "Broker signal"],
                ].map(([Icon, name, sub]) => (
                  <div key={String(name)} className="border border-line bg-black/30 p-3">
                    <Icon className="size-4 text-blue" />
                    <p className="mt-3 text-[13px] font-semibold text-heading">{String(name)}</p>
                    <p className="mono mt-1 text-[10px] uppercase tracking-widest text-sub-muted">{String(sub)}</p>
                  </div>
                ))}
              </div>
              <div className="mt-8 flex items-center justify-between border-t border-line pt-4">
                <span className="mono text-[11px] uppercase tracking-widest text-sub-muted">Confidence</span>
                <span className="mono text-sm font-semibold text-green">91%</span>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Timeline() {
  return (
    <section id="timeline" className="scroll-mt-20 border-b border-line py-16 sm:py-24 lg:py-32">
      <div className="site-container">
        <Reveal className="mx-auto max-w-3xl text-center">
          <span className="label-mono">/ 03 Feed</span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-heading md:text-5xl">
            Intelligence timeline.
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-muted-foreground md:text-base">
            A sample of the tactical feed AURIA operators watch every day — cross-source, timestamped, ranked by confidence.
          </p>
        </Reveal>

        <div className="mx-auto mt-14 max-w-4xl">
          <ol className="relative border-l border-line">
            {timeline.map((e, i) => (
              <Reveal key={i} delay={i * 0.05}>
                <li className="relative py-5 pl-8">
                  <span
                    className="absolute -left-[5px] top-7 size-2.5 rounded-full ring-4 ring-background"
                    style={{ background: toneColor[e.tone] }}
                  />
                  <div className="flex flex-col gap-4 md:flex-row md:gap-8">
                    <span className="mono w-28 shrink-0 text-[11px] uppercase tracking-widest text-sub-muted">{e.time}</span>
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <span className={`label-mono text-${e.tone}`} style={{ color: toneColor[e.tone] }}>{e.source}</span>
                        <span className={`status-badge tone-${e.tone}`}>{e.score}</span>
                      </div>
                      <p className="mt-2 text-sm leading-6 text-muted-foreground md:text-[15px]">{e.body}</p>
                    </div>
                  </div>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

function Modules() {
  return (
    <section id="modules" className="scroll-mt-20 border-b border-line py-16 sm:py-24 lg:py-32">
      <div className="site-container">
        <Reveal className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="label-mono">/ 04 Platform</span>
            <h2 className="mt-4 max-w-2xl text-3xl font-bold tracking-tight text-heading md:text-5xl">
              Explore platform modules.
            </h2>
          </div>
          <p className="max-w-md text-sm leading-6 text-muted-foreground md:text-base">
            Every AURIA capability is a self-contained module. Deploy one, deploy all — they share the same evidence graph.
          </p>
        </Reveal>

        <div className="mt-10 grid sm:mt-14 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {modules.map(({ icon: Icon, title, copy }, i) => (
            <Reveal key={title} delay={(i % 4) * 0.05}>
              <TiltCard className="h-full">
                <Link to="/contact" className="module-card module-card--tilt group relative h-full overflow-hidden">
                  {/* cursor-driven sheen */}
                  <span
                    aria-hidden
                    className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    style={{
                      background: "radial-gradient(220px circle at var(--mx, 50%) var(--my, 50%), rgba(59,130,246,0.16), transparent 65%)",
                    }}
                  />
                  <div className="relative flex items-center justify-between">
                    <span className="grid size-10 place-items-center border border-line bg-black/40 transition-colors group-hover:border-blue/60">
                      <Icon className="size-5 text-blue" />
                    </span>
                    <ArrowUpRight className="size-4 text-sub-muted transition-transform duration-300 group-hover:text-blue group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </div>
                  <p className="module-card-title relative mt-8 text-[14px] font-semibold text-heading transition-colors">
                    {title}
                  </p>
                  <p className="relative text-[11px] leading-relaxed text-muted-foreground">{copy}</p>
                  <div className="relative mt-auto flex items-center gap-2 pt-3">
                    <span className="status-badge tone-muted"><MapPin className="size-2.5" /> CN·GLOBAL</span>
                    <span className="mono text-[9px] uppercase tracking-widest text-sub-muted">
                      MOD-{String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                </Link>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

const opsPhotos = [
  {
    src: "https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?w=900&q=70&auto=format&fit=crop",
    node: "SHA · Yangshan Terminal",
    tag: "Loading · TEU 4,482",
    tone: "green" as const,
    confidence: "97%",
  },
  {
    src: "https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=900&q=70&auto=format&fit=crop",
    node: "GZ · Nansha Bonded",
    tag: "Consolidation · 12 SKUs",
    tone: "blue" as const,
    confidence: "89%",
  },
  {
    src: "https://images.unsplash.com/photo-1587293852726-70cdb56c2866?w=900&q=70&auto=format&fit=crop",
    node: "NL · Rotterdam Port",
    tag: "Discharge · ETA 03:14",
    tone: "green" as const,
    confidence: "94%",
  },
  {
    src: "https://images.unsplash.com/photo-1586528116493-a029325540fa?w=900&q=70&auto=format&fit=crop",
    node: "AE · Jebel Ali",
    tag: "Transshipment · lane 4",
    tone: "amber" as const,
    confidence: "76%",
  },
  {
    src: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=900&q=70&auto=format&fit=crop",
    node: "CN · Shenzhen · Line 07",
    tag: "SMT · rev C tooling live",
    tone: "blue" as const,
    confidence: "92%",
  },
  {
    src: "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=900&q=70&auto=format&fit=crop",
    node: "MA · Casablanca Container",
    tag: "Departure · Vsl AURIA-08",
    tone: "green" as const,
    confidence: "88%",
  },
];

function OperationsGallery() {
  return (
    <section className="border-b border-line py-16 sm:py-24 lg:py-32">
      <div className="site-container">
        <Reveal className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="label-mono">/ 03·B Field Ops</span>
            <h2 className="mt-4 max-w-2xl text-3xl font-bold tracking-tight text-heading md:text-5xl">
              From the field.
            </h2>
          </div>
          <p className="max-w-md text-sm leading-6 text-muted-foreground md:text-base">
            Every shipment gets an inspection dossier: photographs of the goods, the packaging, the container seal and the load-out — timestamped, geo-tagged and signed against the shipment record. You see what shipped, before it ships.
          </p>
        </Reveal>

        <div className="mt-10 grid sm:mt-14 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {opsPhotos.map((p, i) => (
            <Reveal key={p.node} delay={(i % 3) * 0.08}>
              <figure className="scan-line-container group relative aspect-[16/10] overflow-hidden panel">
                <img
                  src={p.src}
                  srcSet={unsplashSrcSet(p.src)}
                  sizes="(max-width: 640px) 92vw, (max-width: 1024px) 45vw, 30vw"
                  alt={`Field operations at ${p.node}`}
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 h-full w-full object-cover opacity-70 saturate-[0.85] transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04] group-hover:opacity-95 group-hover:saturate-100"
                  style={{ animation: `ken-burns ${20 + (i % 5) * 2}s ease-in-out infinite ${i % 2 ? "reverse" : "normal"}` }}
                />
                {/* film grain */}
                <div aria-hidden className="pointer-events-none absolute inset-0 mix-blend-overlay opacity-25 auria-grain" />
                <div
                  aria-hidden
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(8,10,13,0.15) 0%, rgba(8,10,13,0.55) 60%, rgba(8,10,13,0.95) 100%)",
                  }}
                />
                {/* corner brackets */}
                <span className="pointer-events-none absolute left-3 top-3 size-3 border-l border-t border-blue/60" />
                <span className="pointer-events-none absolute right-3 top-3 size-3 border-r border-t border-blue/60" />
                <span className="pointer-events-none absolute left-3 bottom-3 size-3 border-l border-b border-blue/60" />
                <span className="pointer-events-none absolute right-3 bottom-3 size-3 border-r border-b border-blue/60" />

                <div className="absolute right-3 top-3 flex items-center gap-2">
                  <span className={`status-badge tone-${p.tone}`}>
                    <span className="status-dot" style={{ background: toneColor[p.tone], color: toneColor[p.tone] }} />
                    {p.confidence}
                  </span>
                </div>
                <div className="absolute left-3 top-3">
                  <span className="glass-panel inline-flex items-center gap-1.5 px-2 py-1">
                    <Camera className="size-3 text-blue" />
                    <span className="mono text-[9px] uppercase tracking-widest text-heading">frame</span>
                  </span>
                </div>
                <figcaption className="absolute inset-x-0 bottom-0 p-5 md:p-6">
                  <p className="mono text-[10px] uppercase tracking-widest text-blue">{p.node}</p>
                  <p className="mt-2 text-base font-semibold text-heading md:text-lg">{p.tag}</p>
                  <div className="mono mt-3 flex items-center justify-between text-[9px] uppercase tracking-widest text-sub-muted">
                    <span>frame · IMG-{String(4400 + i).padStart(4, "0")}</span>
                    <span className="inline-flex items-center gap-1.5">
                      <span className="status-dot" style={{ background: "#10B981", color: "#10B981" }} />
                      signed
                    </span>
                  </div>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

const broadcastThumbs = [
  {
    src: "https://images.unsplash.com/photo-1494412651409-8963ce7935a7?w=1000&q=70&auto=format&fit=crop",
    node: "SHA · Yangshan",  tag: "Bay 4 · gantry sync",     tone: "green" as const,  timecode: "T-00:04:12",
  },
  {
    src: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1000&q=70&auto=format&fit=crop",
    node: "HKG · Air Cargo",  tag: "Freighter · gate C7",    tone: "blue" as const,   timecode: "T-00:09:48",
  },
  {
    src: "https://images.unsplash.com/photo-1519003722824-194d4455a60c?w=1000&q=70&auto=format&fit=crop",
    node: "CN · Overland",    tag: "Convoy · 12 trailers",   tone: "amber" as const,  timecode: "T-00:21:03",
  },
];

function CommandBroadcast() {
  return (
    <section id="broadcast" className="scroll-mt-20 border-b border-line py-16 sm:py-24 lg:py-32">
      <div className="site-container">
        <Reveal className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="label-mono">/ 03·A Evidence</span>
            <h2 className="mt-4 max-w-2xl text-3xl font-bold tracking-tight text-heading md:text-5xl">
              Eyes <span className="italic serif-display">on the ground.</span>
            </h2>
          </div>
          <p className="max-w-md text-sm leading-6 text-muted-foreground md:text-base">
            Every shipment is photographed on site by our inspectors — at the factory floor, at load-out, at customs. Each image is timestamped, geo-tagged and cross-signed with the shipment record so what you see is what you get.
          </p>
        </Reveal>

        <Reveal delay={0.1} className="mt-10 sm:mt-14">
          <div className="grid gap-6">
            {/* Feature panel — Yangshan container terminal, ken-burns motion */}
            <figure className="scan-line-container relative aspect-video overflow-hidden panel">
              <img
                src="https://images.unsplash.com/photo-1553413077-190dd305871c?w=1200&q=70&auto=format&fit=crop"
                srcSet="https://images.unsplash.com/photo-1553413077-190dd305871c?w=480&q=55&auto=format&fit=crop 480w, https://images.unsplash.com/photo-1553413077-190dd305871c?w=800&q=60&auto=format&fit=crop 800w, https://images.unsplash.com/photo-1553413077-190dd305871c?w=1200&q=70&auto=format&fit=crop 1200w, https://images.unsplash.com/photo-1553413077-190dd305871c?w=1800&q=75&auto=format&fit=crop 1800w"
                sizes="(max-width:640px) 100vw, (max-width:1024px) 100vw, 66vw"
                loading="lazy"
                decoding="async"
                alt="Factory floor — on-site inspection in progress"
                className="absolute inset-0 h-full w-full object-cover opacity-85 saturate-[0.85]"
                style={{
                  filter: "contrast(1.05) brightness(0.9)",
                  animation: "ken-burns 34s ease-in-out infinite",
                }}
              />
              {/* film grain */}
              <div aria-hidden className="pointer-events-none absolute inset-0 mix-blend-overlay opacity-25 auria-grain" />
              {/* moving scan sweep */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-x-0 top-0 h-24"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(59,130,246,0.35) 0%, rgba(59,130,246,0.05) 60%, transparent 100%)",
                  animation: "broadcast-sweep 6s linear infinite",
                }}
              />
              {/* dark gradient bottom */}
              <div
                aria-hidden
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(8,10,13,0.10) 0%, rgba(8,10,13,0.30) 55%, rgba(8,10,13,0.9) 100%)",
                }}
              />
              {/* corner brackets */}
              <span className="pointer-events-none absolute left-4 top-4 size-4 border-l border-t border-blue/70" />
              <span className="pointer-events-none absolute right-4 top-4 size-4 border-r border-t border-blue/70" />
              <span className="pointer-events-none absolute left-4 bottom-4 size-4 border-l border-b border-blue/70" />
              <span className="pointer-events-none absolute right-4 bottom-4 size-4 border-r border-b border-blue/70" />

              {/* HUD top */}
              <div className="absolute inset-x-4 top-4 flex items-start justify-between">
                <div className="glass-panel flex items-center gap-2 px-3 py-1.5">
                  <span className="status-dot" style={{ background: "#10B981", color: "#10B981" }} />
                  <span className="mono text-[10px] font-semibold uppercase tracking-widest text-heading">
                    Verified · On-site
                  </span>
                </div>
                <div className="glass-panel mono flex items-center gap-3 px-3 py-1.5 text-[10px] uppercase tracking-widest text-blue">
                  <span>insp-4482</span>
                  <span className="text-sub-muted">·</span>
                  <span>14 mar 26</span>
                </div>
              </div>

              {/* HUD bottom */}
              <figcaption className="absolute inset-x-4 bottom-4 flex items-end justify-between gap-4">
                <div>
                  <p className="mono text-[10px] uppercase tracking-widest text-blue">CN · Shenzhen · Partner Factory · Line 07</p>
                  <p className="mt-2 text-lg font-semibold text-heading md:text-2xl">Pre-shipment inspection complete.</p>
                  <p className="mono mt-1 text-[10px] uppercase tracking-widest text-sub-muted">
                    lat 30.6234 · lng 122.0592 · signed by inspector + carrier
                  </p>
                </div>
                <div className="hidden md:flex items-center gap-2">
                  <span className="glass-panel mono inline-flex items-center gap-2 px-3 py-2 text-[10px] uppercase tracking-widest text-blue">
                    <Signal className="size-3.5" />
                    seal · intact
                  </span>
                </div>
              </figcaption>

              {/* animated bandwidth bars along the very bottom */}
              <BandwidthBars />
            </figure>

          </div>

          {/* Sub-thumbs row */}
          <div className="mt-6 grid gap-6 md:grid-cols-3">
            {broadcastThumbs.map((t, i) => (
              <Reveal key={t.node} delay={(i % 3) * 0.06}>
                <VideoTile
                  src={t.src}
                  node={t.node}
                  tag={t.tag}
                  tone={t.tone}
                  timecode={t.timecode}
                  aspect="aspect-[16/10]"
                  index={i}
                />
              </Reveal>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

const fieldTransmissionsRowA = [
  { src: "https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?w=800&q=80&auto=format&fit=crop", label: "SHA · gantry", tone: "green" as const },
  { src: "https://images.unsplash.com/photo-1586528116493-a029325540fa?w=800&q=80&auto=format&fit=crop", label: "AE · transship", tone: "amber" as const },
  { src: "https://images.unsplash.com/photo-1587293852726-70cdb56c2866?w=800&q=80&auto=format&fit=crop", label: "NL · discharge", tone: "green" as const },
  { src: "https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=800&q=80&auto=format&fit=crop", label: "GZ · bonded", tone: "blue" as const },
  { src: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80&auto=format&fit=crop", label: "CN · line 07", tone: "blue" as const },
];

const fieldTransmissionsRowB = [
  { src: "https://images.unsplash.com/photo-1553413077-190dd305871c?w=800&q=80&auto=format&fit=crop", label: "MX · staging", tone: "amber" as const },
  { src: "https://images.unsplash.com/photo-1494412651409-8963ce7935a7?w=800&q=80&auto=format&fit=crop", label: "SG · lane 12", tone: "green" as const },
  { src: "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=800&q=80&auto=format&fit=crop", label: "MA · casablanca", tone: "green" as const },
  { src: "https://www.searates.com/vessels-photos/id-9153850.jpeg", label: "IN · nhava", tone: "amber" as const },
  { src: "https://images.unsplash.com/photo-1519003722824-194d4455a60c?w=800&q=80&auto=format&fit=crop", label: "US · long beach", tone: "green" as const },
];

const fieldTransmissions = [...fieldTransmissionsRowA, ...fieldTransmissionsRowB];

function FieldTransmissions() {
  const lite = usePerfLite();
  const mobile = useIsMobileViewport();
  // On perf-lite / narrow phones, a horizontally scrolling snap row is cheaper
  // than a doubled infinite marquee and doesn't strand off-screen images.
  const doubled = lite || mobile ? fieldTransmissions : [...fieldTransmissions, ...fieldTransmissions];
  return (
    <section className="scan-line-container relative border-b border-line py-16 lg:py-24">
      <div className="site-container mb-8 lg:mb-10">
        <Reveal className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="label-mono">/ 03·C Ticker</span>
            <h2 className="mt-3 max-w-2xl text-2xl font-bold tracking-tight text-heading md:text-4xl">
              Field transmissions.
            </h2>
          </div>
          <p className="mono max-w-md text-[11px] uppercase tracking-widest text-sub-muted">
            Auto-relayed · frame index · sig-verified
          </p>
        </Reveal>
      </div>

      {/* Two-row opposite marquees for depth (desktop). Mobile / perf-lite:
          single horizontally-scrollable snap row — same visual language, no
          continuous animation cost. */}
      {lite || mobile ? (
        <div
          className="flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-2"
          style={{ WebkitOverflowScrolling: "touch", scrollbarWidth: "none" }}
        >
          {doubled.map((t, i) => (
            <div key={`m-${i}`} className="snap-start shrink-0">
              <TransmissionCard src={t.src} label={t.label} tone={t.tone} index={i} />
            </div>
          ))}
        </div>
      ) : (
        <div className="relative flex flex-col gap-4 overflow-hidden">
          <div className="marquee-track gap-4">
            {[...fieldTransmissionsRowA, ...fieldTransmissionsRowA, ...fieldTransmissionsRowA, ...fieldTransmissionsRowA].map((t, i) => (
              <TransmissionCard key={`a-${i}`} src={t.src} label={t.label} tone={t.tone} index={i} />
            ))}
          </div>
          <div className="marquee-track gap-4 [animation-direction:reverse] [animation-duration:56s]">
            {[...fieldTransmissionsRowB, ...fieldTransmissionsRowB, ...fieldTransmissionsRowB, ...fieldTransmissionsRowB].map((t, i) => (
              <TransmissionCard key={`b-${i}`} src={t.src} label={t.label} tone={t.tone} index={i + 100} reverse />
            ))}
          </div>
        </div>
      )}
    </section>
  );
}

function TransmissionCard({ src, label, tone }: { src: string; label: string; tone: "green" | "blue" | "amber" | "red"; index?: number; reverse?: boolean }) {
  return (
    <div className="scan-line-container relative aspect-[4/3] w-[200px] shrink-0 overflow-hidden border border-line bg-panel/40 sm:w-[220px] md:w-[280px]">
      <img
        src={src}
        srcSet={unsplashSrcSet(src, { widths: [280, 400, 560] })}
        sizes="280px"
        alt={label}
        loading="lazy"
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover opacity-60 saturate-[0.7] transition-all duration-500 hover:opacity-95 hover:saturate-100"
      />
      <div aria-hidden className="absolute inset-0 mix-blend-overlay opacity-30 auria-grain" />
      <div
        aria-hidden
        className="absolute inset-0"
        style={{ background: "linear-gradient(180deg, transparent 40%, rgba(8,10,13,0.85) 100%)" }}
      />
      <span className="pointer-events-none absolute left-2 top-2 size-2 border-l border-t border-blue/70" />
      <span className="pointer-events-none absolute right-2 top-2 size-2 border-r border-t border-blue/70" />
      <div className="absolute right-2 top-2">
        <span className="status-dot" style={{ background: toneColor[tone], color: toneColor[tone] }} />
      </div>
      <div className="absolute inset-x-0 bottom-0 p-3">
        <p className="mono text-[10px] uppercase tracking-widest" style={{ color: toneColor[tone] }}>{label}</p>
      </div>
    </div>
  );
}

function FinalCTA() {
  return (
    <section className="relative overflow-hidden border-b border-line py-16 sm:py-24 lg:py-32">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[100px]"
        style={{ background: "linear-gradient(to bottom, rgba(59,130,246,0.18), transparent)" }}
      />
      <div className="site-container text-center">
        <Reveal>
          <span className="label-mono text-blue">/ 05 Deploy</span>
          <h2 className="mx-auto mt-6 max-w-3xl text-3xl font-bold tracking-tight text-heading md:text-4xl">
            Ship your next order on <span className="text-blue">verified signals</span>.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-muted-foreground md:text-base">
            Get an AURIA operator on your next PO within 48 hours.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <button type="button" onClick={openRequestAccess} className="btn-primary">
              Get Started <ArrowUpRight className="size-3.5" />
            </button>
            <Link to="/contact" className="btn-ghost-line">
              Talk to Expert <ArrowRight className="size-3.5" />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function ContactSection() {
  return (
    <section className="border-b border-line py-16 sm:py-24 lg:py-32" id="inquiry">
      <div className="site-container grid gap-12 lg:grid-cols-[0.7fr_1.3fr]">
        <Reveal>
          <span className="section-eyebrow">Contact</span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-heading md:text-4xl">
            Open a secure channel.
          </h2>
          <p className="mt-4 max-w-md text-sm leading-6 text-muted-foreground">
            Share your product, quantity and destination. An operator will confirm receipt within one working day.
          </p>
          <div className="mono mt-8 space-y-2 text-[11px] uppercase tracking-widest text-sub-muted">
            <p><span className="text-blue">OPS ·</span> China</p>
            <p><span className="text-blue">CH ·</span> secure / signal</p>
            <p><span className="text-blue">PING ·</span> hello@auria.trade</p>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <form className="panel grid gap-5 p-6 sm:grid-cols-2 md:p-8" onSubmit={(e) => e.preventDefault()}>
            {[
              ["Full Name", "text", "Your name", false],
              ["Company", "text", "Company name", false],
              ["Business Email", "email", "name@company.com", false],
              ["Country", "text", "Country", false],
              ["What are you sourcing?", "text", "Product or category", true],
              ["Estimated Volume", "text", "Quantity or budget", true],
            ].map(([label, type, placeholder, wide]) => (
              <label key={String(label)} className={`space-y-2 ${wide ? "sm:col-span-2" : ""}`}>
                <span className="label-mono">{label}</span>
                <input type={type as string} placeholder={placeholder as string} className="field-input" />
              </label>
            ))}
            <label className="space-y-2 sm:col-span-2">
              <span className="label-mono">Message</span>
              <textarea rows={4} placeholder="Specifications, timeline and destination" className="field-input resize-none" />
            </label>
            <div className="flex items-center justify-between gap-4 sm:col-span-2">
              <span className="status-badge tone-green">
                <span className="status-dot" style={{ background: "#10B981", color: "#10B981" }} /> Channel encrypted
              </span>
              <button type="submit" className="btn-primary">
                Transmit Inquiry <ArrowUpRight className="size-3.5" />
              </button>
            </div>
          </form>
        </Reveal>
      </div>
    </section>
  );
}

function KpiStrip() {
  const kpis = [
    { label: "Nodes", n: 7, decimals: 0, prefix: "0", suffix: "", tone: "blue" },
    { label: "Signals / day", n: 12.4, decimals: 1, prefix: "", suffix: "K", tone: "green" },
    { label: "Lanes tracked", n: 42, decimals: 0, prefix: "", suffix: "", tone: "green" },
    { label: "Advisories", n: 3, decimals: 0, prefix: "0", suffix: "", tone: "red" },
  ];
  return (
    <section className="border-b border-line bg-panel/40">
      <div className="site-container grid grid-cols-2 divide-x divide-line md:grid-cols-4">
        {kpis.map((k, i) => (
          <div key={k.label} className={`relative overflow-hidden px-6 py-6 md:px-8 md:py-8 ${i === 0 ? "border-l border-line" : ""}`}>
            {/* soft breathing tint per KPI */}
            <span
              aria-hidden
              className="pointer-events-none absolute -inset-x-4 -inset-y-6 opacity-30 blur-2xl"
              style={{
                background: `radial-gradient(closest-side, ${toneColor[k.tone]}22, transparent 70%)`,
                animation: `hero-glow-a ${11 + i}s ease-in-out infinite`,
              }}
            />
            <p className="label-mono relative">{k.label}</p>
            <p className="mono relative mt-3 text-2xl font-semibold md:text-3xl" style={{ color: toneColor[k.tone] }}>
              <CountUp end={k.n} decimals={k.decimals} prefix={k.prefix} suffix={k.suffix} duration={1800} />
            </p>
            {/* mini sparkline */}
            <svg viewBox="0 0 100 20" className="mono relative mt-3 h-4 w-full opacity-70" preserveAspectRatio="none">
              <polyline
                fill="none"
                stroke={toneColor[k.tone]}
                strokeWidth="1"
                vectorEffect="non-scaling-stroke"
                points={Array.from({ length: 20 }, (_, idx) => {
                  const y = 10 + Math.sin(idx * 0.6 + i) * 5 + Math.cos(idx * 0.9 + i * 0.7) * 3;
                  return `${idx * 5},${y.toFixed(1)}`;
                }).join(" ")}
              />
            </svg>
          </div>
        ))}
      </div>
    </section>
  );
}

export function AuriaHome() {
  return (
    <SiteLayout>
      <Hero />
      <KpiStrip />
      <Comparison />
      <CommandBroadcast />
      <Timeline />
      <OperationsGallery />
      <FieldTransmissions />
      <Modules />
      <FinalCTA />
      <ContactSection />
    </SiteLayout>
  );
}

export { modules, timeline, mapNodes, ContactSection, Reveal };
