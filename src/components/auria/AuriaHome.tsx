import { Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "motion/react";
import {
  ArrowUpRight, ArrowRight, Radar, ShieldCheck, Factory, Ship, Warehouse, Search,
  BadgeCheck, Handshake, Circle, AlertTriangle, FileText, Satellite, Cctv,
  ClipboardCheck, MapPin, Camera, Signal,
} from "lucide-react";
import { SiteLayout } from "./SiteShell";
import { TradeGlobe } from "./TradeGlobe";
import { openRequestAccess } from "./RequestAccessModal";
import { usePerfLite, useIsMobileViewport } from "@/hooks/use-perf";
import heroPort from "@/assets/hero/1494412574643-ff11b0a5c1c3.jpg";
import photoGz from "@/assets/hero/1578575437130-527eed3abbec.jpg";
import photoNl from "@/assets/hero/1587293852726-70cdb56c2866.jpg";
import photoAe from "@/assets/hero/1586528116493-a029325540fa.jpg";
import photoSz from "@/assets/hero/1518770660439-4636190af475.jpg";
import photoMa from "@/assets/hero/1601584115197-04ecc0da31d7.jpg";
import photoSha from "@/assets/hero/1494412651409-8963ce7935a7.jpg";
import photoHkg from "@/assets/hero/1436491865332-7a61a109cc05.jpg";
import photoOverland from "@/assets/hero/1519003722824-194d4455a60c.jpg";
import photoFactory from "@/assets/hero/1553413077-190dd305871c.jpg";
import photoVessel from "@/assets/hero/vessel-9153850.jpg";

const modules = [
  { icon: Search,        key: "mod1" },
  { icon: BadgeCheck,    key: "mod2" },
  { icon: Handshake,     key: "mod3" },
  { icon: ShieldCheck,   key: "mod4" },
  { icon: Factory,       key: "mod5" },
  { icon: Warehouse,     key: "mod6" },
  { icon: Ship,          key: "mod7" },
  { icon: Radar,         key: "mod8" },
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

/* AURIA brand palette used by the home page sections (gold accent + signals). */
const GOLD = "#F5C36B";
const GOLD_DEEP = "#D9A24B";

/** Gold, line-led section eyebrow shared across the home sections. */
function SectionEyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div className="mono inline-flex items-center gap-3 text-[12px] font-semibold uppercase tracking-[0.22em]" style={{ color: GOLD }}>
      <span className="h-px w-8" style={{ background: `linear-gradient(90deg,transparent,${GOLD_DEEP},${GOLD})` }} />
      {children}
    </div>
  );
}

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
  const { t } = useTranslation();
  const lite = usePerfLite();
  const isMobile = useIsMobileViewport();
  return (
    <section className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden border-b border-line bg-background pt-20 pb-12 sm:pt-28 sm:pb-24 lg:pt-36 lg:pb-32">
      {/* Cinematic backdrop — now on phones too. The dark base + soft radial
          pre-tint fills the section instantly so nothing looks blank while the
          image streams in. Ken-burns motion stays off on mobile to avoid the
          per-frame repaint that hurts phone scroll fps. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 40%, rgba(15,20,28,1) 0%, rgba(8,10,13,1) 60%, rgba(6,8,11,1) 100%)",
        }}
      />
      <img
        src={heroPort}
        alt=""
        aria-hidden
        loading="eager"
        decoding="async"
        fetchPriority="high"
        className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-[0.28] saturate-[0.55]"
        style={{
          filter: "contrast(1.05) brightness(0.75) hue-rotate(190deg)",
          animation: isMobile ? undefined : "ken-burns 32s ease-in-out infinite",
        }}
      />
      {/* Vignette — deep so the backdrop reads as ambient texture, not content */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 40%, rgba(8,10,13,0.25) 0%, rgba(8,10,13,0.75) 55%, rgba(8,10,13,0.98) 100%)",
        }}
      />

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
                {t("home.heroBadge1")}
              </span>
              <span className="status-badge tone-green">
                <span className="status-dot" style={{ background: "#10B981", color: "#10B981" }} />
                {t("home.heroBadge2")}
              </span>
            </div>

            <h1 className="mt-5 select-none font-sans font-bold tracking-[-0.025em] text-heading text-[32px] leading-[1.05] sm:mt-6 sm:text-[46px] sm:leading-[1.06] md:text-[70px]">
              {t("home.heroTitle1")}<br />
              {t("home.heroTitle2")}<br />
              <span className="font-semibold text-muted-foreground">{t("home.heroTitle3")}</span>
            </h1>

            <p className="mono mt-4 text-[12px] uppercase tracking-[0.14em]" style={{ color: GOLD }}>
              {t("home.heroGold")}
            </p>

            <p className="mt-4 max-w-xl select-none text-[15px] leading-6 text-muted-foreground sm:mt-5 sm:text-base sm:leading-7 md:text-lg">
              {t("home.heroP1")}
            </p>
            <p className="mt-3 hidden max-w-xl select-none text-[14px] leading-6 text-sub-muted sm:block">
              {t("home.heroP2")}
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-3 sm:mt-10">
              <button type="button" onClick={openRequestAccess} className="btn-primary">
                {t("home.ctaStart")} <ArrowUpRight className="size-3.5 rtl:-scale-x-100" />
              </button>
              <Link to="/about" className="btn-ghost-line">
                {t("home.ctaExplore")} <ArrowRight className="size-3.5 rtl:-scale-x-100" />
              </Link>
            </div>

            {/* Micro KPI row — animated count-ups */}
            <div className="mt-7 grid max-w-2xl grid-cols-2 gap-4 border-t border-line pt-6 sm:mt-14 sm:gap-6 sm:pt-8 sm:grid-cols-4">
              {[
                { l: t("home.kpiUptime"), n: 99.98, suffix: "%", decimals: 2, color: "#10B981" },
                { l: t("home.kpiLanes"), n: 42, suffix: "", decimals: 0, color: "#3B82F6" },
                { l: t("home.kpiHub"), n: 1, suffix: "", decimals: 0, color: GOLD },
                { l: t("home.kpiAdvisories"), n: 3, suffix: "", decimals: 0, color: "#EF4444", pad: true },
              ].map((k) => (
                <div key={k.l}>
                  <p className="label-mono">{k.l}</p>
                  <p className="mono mt-2 text-xl font-semibold sm:text-2xl" style={{ color: k.color }}>
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

          {/* Right: live panel — desktop only; on phone/tablet it would double
              the hero height, so the first screen stays the text column. */}
          <Reveal delay={0.15} className="hidden lg:block">
            <HeroLivePanel />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/** Trend series feeding the two hero KPI sparklines (unitless, auto-scaled). */
const uptimeTrend = [
  99.99, 100, 99.98, 100, 100, 99.97, 100, 99.7, 99.99, 100, 100, 99.98,
  99.55, 99.9, 100, 100, 99.99, 100, 100, 99.96, 99.72, 99.95, 100, 100,
];
const signalsTrend = [
  0.34, 0.5, 0.42, 0.6, 0.55, 0.72, 0.5, 0.68, 0.62, 0.8, 0.7, 0.9, 0.78,
  0.88, 0.82, 0.98,
];

/** Smooth (Catmull-Rom) path through a set of points, for the sparklines. */
function smoothPath(pts: readonly [number, number][]) {
  if (pts.length < 2) return "";
  const first = pts[0]!;
  let d = `M ${first[0]} ${first[1]}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] ?? pts[i]!;
    const p1 = pts[i]!;
    const p2 = pts[i + 1]!;
    const p3 = pts[i + 2] ?? p2;
    const c1x = p1[0] + (p2[0] - p0[0]) / 6;
    const c1y = p1[1] + (p2[1] - p0[1]) / 6;
    const c2x = p2[0] - (p3[0] - p1[0]) / 6;
    const c2y = p2[1] - (p3[1] - p1[1]) / 6;
    d += ` C ${c1x} ${c1y} ${c2x} ${c2y} ${p2[0]} ${p2[1]}`;
  }
  return d;
}

/** Minimal filled-area sparkline. Auto-scales to the series; crisp stroke via
 *  non-scaling-stroke so it stays 1.5px at any width. */
function SparkArea({ series, color, gradId }: { series: number[]; color: string; gradId: string }) {
  const W = 120;
  const H = 42;
  const PAD = 3;
  const max = Math.max(...series);
  const min = Math.min(...series);
  const range = max - min || 1;
  const pts = series.map<[number, number]>((v, i) => [
    (i / (series.length - 1)) * W,
    H - PAD - ((v - min) / range) * (H - PAD * 2),
  ]);
  const line = smoothPath(pts);
  const area = `${line} L ${W} ${H} L 0 ${H} Z`;
  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio="none"
      className="mt-3 block h-[42px] w-full"
      aria-hidden
    >
      <defs>
        <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.22" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={area} fill={`url(#${gradId})`} />
      <path
        d={line}
        fill="none"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}

/** One hero KPI: label + delta chip, big value, and a filled-area sparkline. */
function MetricTile({
  label, value, unit, delta, color, gradId, series,
}: {
  label: string;
  value: string;
  unit?: string;
  delta: string;
  color: string;
  gradId: string;
  series: number[];
}) {
  return (
    <div>
      <div className="flex items-baseline justify-between gap-2">
        <p className="label-mono truncate">{label}</p>
        <span
          className="mono inline-flex shrink-0 items-center gap-0.5 rounded-full px-1.5 py-0.5 text-[9px] leading-none"
          style={{ color, background: `${color}1a` }}
        >
          <ArrowUpRight className="size-2.5" strokeWidth={2.5} />
          {delta}
        </span>
      </div>
      <p className="mono mt-2.5 flex items-baseline text-[32px] font-semibold leading-none tracking-tight tabular-nums" style={{ color }}>
        {value}
        {unit && <span className="ml-0.5 text-lg opacity-60">{unit}</span>}
      </p>
      <SparkArea series={series} color={color} gradId={gradId} />
    </div>
  );
}

/** Hero-right "Operations" panel — node list mirrors the mockup. */
function HeroLivePanel() {
  const { t } = useTranslation();
  const nodes: { label: string; status: string; tone: string; latency: string }[] = [
    { label: t("ops.node1"), status: t("ops.statusOk"), tone: "green", latency: "12ms" },
    { label: t("ops.node2"), status: t("ops.statusOk"), tone: "green", latency: "48ms" },
    { label: t("ops.node3"), status: t("ops.statusOk"), tone: "green", latency: "33ms" },
    { label: t("ops.node4"), status: t("ops.statusWatch"), tone: "amber", latency: "91ms" },
    { label: t("ops.node5"), status: t("ops.statusAlert"), tone: "red", latency: "—" },
  ];
  return (
    <div className="panel relative select-none overflow-hidden p-6 lg:p-8">
      {/* top accent hairline */}
      <span
        aria-hidden
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-green/60 to-transparent"
      />

      <div className="flex items-center justify-between border-b border-line pb-4">
        <div className="flex items-center gap-2.5">
          <span className="inline-flex size-2 rounded-full bg-green" />
          <span className="label-mono text-heading">{t("ops.operations")}</span>
        </div>
        <span className="mono text-[9px] tabular-nums text-sub-muted">OPS-01 · SYNC</span>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-x-6 gap-y-4">
        <MetricTile
          label={t("ops.uptime")}
          value="99.98"
          unit="%"
          delta="0.04%"
          color={toneColor["green"]!}
          gradId="spark-uptime"
          series={uptimeTrend}
        />
        <MetricTile
          label={t("ops.signals")}
          value="12,482"
          delta="6.2%"
          color={toneColor["blue"]!}
          gradId="spark-signals"
          series={signalsTrend}
        />
      </div>

      <div className="mt-8">
        <div className="mb-3 flex items-center justify-between">
          <p className="label-mono">{t("ops.nodeStatus")}</p>
          <p className="label-mono text-sub-muted">{t("ops.lanesHub")}</p>
        </div>
        <ul className="-mx-2">
          {nodes.map(({ label, status, tone, latency }) => (
            <li
              key={label}
              className="group flex items-center justify-between rounded-sm px-2 py-2.5 text-[14px] transition-colors hover:bg-white/[0.025]"
            >
              <span className="flex min-w-0 items-center gap-3">
                <span className="inline-flex size-1.5 shrink-0 rounded-full" style={{ background: toneColor[tone] }} />
                <span className="mono truncate uppercase tracking-widest text-muted-foreground transition-colors group-hover:text-foreground">
                  {label}
                </span>
              </span>
              <span className="flex shrink-0 items-center gap-3.5">
                <span className="mono text-[11px] tabular-nums text-sub-muted">{latency}</span>
                <span className={`status-badge tone-${tone}`}>{status}</span>
              </span>
            </li>
          ))}
        </ul>
      </div>

    </div>
  );
}

/* Destination ports mirrored from TradeGlobe's DEST list — keep in sync.
   `key` matches the shared `globe` i18n namespace for localized names. */
const destinationPorts = [
  { key: "barcelona" },
  { key: "hamburg" },
  { key: "losAngeles" },
  { key: "newYork" },
  { key: "dubai" },
  { key: "singapore" },
  { key: "casablanca" },
  { key: "santos" },
  { key: "durban" },
  { key: "sydney" },
] as const;

/* ————— Global Network section: interactive 3D globe + China-hub rail ————— */
function NetworkGlobe() {
  const { t, i18n } = useTranslation();
  const isAr = i18n.language === "ar";
  return (
    <section id="network" className="scroll-mt-20 border-b border-line py-16 sm:py-24 lg:py-32">
      <div className="site-container">
        <Reveal className="max-w-3xl">
          <SectionEyebrow>{t("home.networkEyebrow")}</SectionEyebrow>
          <h2 className="mt-4 text-3xl font-bold leading-[1.05] tracking-tight text-heading md:text-5xl">
            {t("home.networkTitle1")}<br />{t("home.networkTitle2")}
          </h2>
          <p className="mt-4 text-[15px] leading-7 text-muted-foreground md:text-[17px]">
            {t("home.networkCopy")}
          </p>
        </Reveal>

        <Reveal delay={0.1} className="mt-10 grid items-center gap-8 sm:mt-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-12">
          {/* Side rail */}
          <div className="order-1 flex flex-col gap-4">
            <div className="flex flex-wrap gap-2">
              {[
                [t("net.tagSourcing"), GOLD], [t("net.tagManufacturing"), GOLD],
                [t("net.tagQuality"), "#3B82F6"], [t("net.tagLogistics"), "#3B82F6"],
              ].map(([label, color]) => (
                <span
                  key={label}
                  className="mono rounded-sm px-3 py-1.5 text-[11px] uppercase tracking-widest"
                  style={{ color, border: `1px solid ${color}47`, background: `${color}10` }}
                >
                  {label}
                </span>
              ))}
            </div>
            <div className="panel p-5">
              <div className="flex items-center justify-between border-b border-line pb-3">
                <span className="label-mono text-heading">{t("net.chinaHub")}</span>
                <span className="mono text-[9px] text-sub-muted">{t("net.oneNode")}</span>
              </div>
              <ul className="mt-3.5 space-y-2.5">
                <li className="flex items-center gap-2 text-[13px] text-muted-foreground">
                  <span className="size-1.5 rounded-full" style={{ background: GOLD, boxShadow: `0 0 8px ${GOLD}b3` }} />
                  {t("globe.shanghai")} · {t("globe.shanghaiCountry")}
                </li>
              </ul>
              <div className="mono mt-4 flex items-center gap-2 border-t border-line pt-3 text-[12px] text-sub-muted">
                <span className="size-1.5 rounded-full" style={{ background: "#3B82F6", boxShadow: "0 0 8px #3B82F6b3" }} />
                {t("net.destPorts")}
              </div>
              <ul className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
                {destinationPorts.map(({ key }) => (
                  <li key={key} className="flex items-center gap-2 text-[13px] text-muted-foreground">
                    <span className="size-1.5 flex-none rounded-full" style={{ background: "#3B82F6", boxShadow: "0 0 8px #3B82F6b3" }} />
                    {t(`globe.${key}Country`)} - {t(`globe.${key}`)}
                  </li>
                ))}
                <li className="mono flex items-center gap-2 text-[12px] uppercase tracking-widest text-blue">
                  <span className="size-1.5 flex-none rounded-full border border-blue" />
                  {t("net.moreWorldwide")}
                </li>
              </ul>
            </div>
            <p
              className={
                isAr
                  ? "font-sans text-[15px] leading-7 text-sub-muted"
                  : "text-[12px] leading-6 text-sub-muted"
              }
            >
              {t("net.railNote")}
            </p>
          </div>

          {/* Globe */}
          <div className="relative order-2">
            <TradeGlobe />
            <p
              className={
                isAr
                  ? "font-sans mt-3 flex items-center gap-2 text-[14px] text-sub-muted"
                  : "mono mt-3 flex items-center gap-2 text-[10px] uppercase tracking-widest text-sub-muted"
              }
            >
              <span className="inline-block size-3 rounded-full border border-blue" />
              {t("net.dragRotate")}
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ————— Live Feeds: motion image tiles ————— */
const feedTiles = [
  { src: photoSha,      key: "sha",      tone: "green" as const, ch: "CH-11" },
  { src: photoVessel,   key: "vessel",   tone: "blue" as const,  ch: "CH-12" },
  { src: photoFactory,  key: "factory",  tone: "amber" as const, ch: "CH-13" },
  { src: photoOverland, key: "overland", tone: "green" as const, ch: "CH-14" },
  { src: photoSz,       key: "yiwu",     tone: "green" as const, ch: "CH-15" },
  { src: photoNl,       key: "rotterdam", tone: "blue" as const, ch: "CH-16" },
];

function FeedsSection() {
  const { t } = useTranslation();
  return (
    <section id="feeds" className="scroll-mt-20 border-b border-line py-16 sm:py-24 lg:py-32">
      <div className="site-container">
        <Reveal className="max-w-3xl">
          <SectionEyebrow>{t("home.feedsEyebrow")}</SectionEyebrow>
          <h2 className="mt-4 text-3xl font-bold leading-[1.05] tracking-tight text-heading md:text-5xl">
            {t("home.feedsTitle")}
          </h2>
        </Reveal>

        <div className="mt-10 grid gap-4 sm:mt-14 sm:grid-cols-2 lg:grid-cols-3">
          {feedTiles.map((tile, i) => {
            const eyebrow = t(`home.tiles.${tile.key}.eyebrow`);
            const title = t(`home.tiles.${tile.key}.title`);
            return (
            <Reveal key={tile.ch} delay={(i % 3) * 0.08}>
              <figure className="group relative m-0 aspect-[16/11] overflow-hidden panel">
                <img
                  src={tile.src}
                  srcSet={unsplashSrcSet(tile.src)}
                  sizes="(max-width: 640px) 92vw, (max-width: 1024px) 45vw, 30vw"
                  alt={title}
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 h-full w-full object-cover opacity-70 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04] group-hover:opacity-95"
                  style={{ filter: "contrast(1.05) brightness(0.9)", animation: `ken-burns ${26 + (i % 4) * 2}s ease-in-out infinite ${i % 2 ? "reverse" : "normal"}` }}
                />
                <div aria-hidden className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(8,10,13,0.10) 0%, rgba(8,10,13,0.55) 60%, rgba(8,10,13,0.95) 100%)" }} />
                <div className="absolute inset-x-3.5 top-3.5 flex items-center justify-between">
                  <span className="glass-panel inline-flex items-center gap-1.5 rounded-sm px-2 py-1">
                    <span className="status-dot" style={{ background: toneColor[tile.tone], color: toneColor[tile.tone] }} />
                    <span className="mono text-[9px] uppercase tracking-widest text-heading">{t("home.feedStatus")}</span>
                  </span>
                  <span className="glass-panel mono rounded-sm px-2 py-1 text-[9px] uppercase tracking-widest text-blue">{tile.ch}</span>
                </div>
                <figcaption className="absolute inset-x-0 bottom-0 p-5">
                  <p className="mono text-[10px] uppercase tracking-widest" style={{ color: toneColor[tile.tone] }}>{eyebrow}</p>
                  <p className="mt-1.5 text-base font-semibold text-heading">{title}</p>
                </figcaption>
              </figure>
            </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ————— Trade Analytics: line / bars / donut ————— */
function AnalyticsSection() {
  const { t, i18n } = useTranslation();
  const isAr = i18n.language === "ar";
  // label-mono forces uppercase + wide letter-spacing, which breaks Arabic
  // cursive joins; use a plain sans label for Arabic instead.
  const labelCls = isAr ? "font-sans text-[13px] text-sub-muted" : "label-mono";
  const lanes: [string, number, string][] = [
    [t("home.lanes.eu"), 38, "#3B82F6"],
    [t("home.lanes.na"), 27, "#3B82F6"],
    [t("home.lanes.gulf"), 18, GOLD],
    [t("home.lanes.africa"), 11, GOLD],
    [t("home.lanes.apac"), 6, "#10B981"],
  ];
  return (
    <section id="analytics" className="scroll-mt-20 border-b border-line py-16 sm:py-24 lg:py-32">
      <div className="site-container">
        <Reveal className="max-w-3xl">
          <SectionEyebrow>{t("home.analyticsEyebrow")}</SectionEyebrow>
          <h2 className="mt-4 text-3xl font-bold leading-[1.05] tracking-tight text-heading md:text-5xl">
            {t("home.analyticsTitle")}
          </h2>
        </Reveal>

        <div className="mt-10 grid gap-4 sm:mt-14 md:grid-cols-2 lg:grid-cols-3">
          {/* Export volume line chart */}
          <Reveal>
            <div className="panel h-full min-w-0 p-5 md:p-6">
              <div className="flex items-center justify-between">
                <p className={labelCls}>{t("home.exportVolume")}</p>
                <span className="mono text-[10px] text-green">▲ 18.4%</span>
              </div>
              <p className="mono mt-3 text-3xl font-semibold text-heading">
                <CountUp end={24.8} decimals={1} suffix="k" /> <span className="text-[13px] text-sub-muted">{t("home.teu")}</span>
              </p>
              <svg viewBox="0 0 320 120" preserveAspectRatio="none" className="mt-3 block h-[120px] w-full">
                <defs>
                  <linearGradient id="au-area" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.35" />
                    <stop offset="100%" stopColor="#3B82F6" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <line x1="0" y1="30" x2="320" y2="30" stroke="#1A1D23" />
                <line x1="0" y1="60" x2="320" y2="60" stroke="#1A1D23" />
                <line x1="0" y1="90" x2="320" y2="90" stroke="#1A1D23" />
                <path d="M0,92 L29,84 L58,88 L87,70 L116,74 L145,58 L174,62 L203,44 L232,50 L261,34 L290,30 L320,22 L320,120 L0,120 Z" fill="url(#au-area)" />
                <path d="M0,92 L29,84 L58,88 L87,70 L116,74 L145,58 L174,62 L203,44 L232,50 L261,34 L290,30 L320,22" fill="none" stroke="#3B82F6" strokeWidth="2" vectorEffect="non-scaling-stroke" />
                <circle cx="320" cy="22" r="3.5" fill={GOLD} />
              </svg>
            </div>
          </Reveal>

          {/* Containers by lane */}
          <Reveal delay={0.05}>
            <div className="panel h-full min-w-0 p-5 md:p-6">
              <div className="flex items-center justify-between">
                <p className={labelCls}>{t("home.containersByLane")}</p>
                <span className={isAr ? "text-[11px] text-sub-muted" : "mono text-[10px] text-sub-muted"}>{t("home.thisQtr")}</span>
              </div>
              <div className="mt-4 flex flex-col gap-3">
                {lanes.map(([label, pct, color]) => (
                  <div key={label}>
                    <div className="flex justify-between text-[12px] text-muted-foreground">
                      <span>{label}</span>
                      <span className="mono text-heading">{pct}%</span>
                    </div>
                    <div className="mt-1.5 h-2 overflow-hidden rounded bg-white/[0.06]">
                      <div className="h-full rounded" style={{ width: `${pct}%`, background: `linear-gradient(90deg, ${color}, ${color}cc)` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          {/* On-time donut */}
          <Reveal delay={0.1}>
            <div className="panel flex h-full min-w-0 flex-col p-5 md:col-span-2 md:p-6 lg:col-span-1">
              <p className={labelCls}>{t("home.onTimeDelivery")}</p>
              <div className="mt-4 flex items-center gap-5">
                <svg viewBox="0 0 120 120" width="112" height="112" className="flex-none">
                  <circle cx="60" cy="60" r="50" fill="none" stroke="#1A1D23" strokeWidth="10" />
                  <circle cx="60" cy="60" r="50" fill="none" stroke="#10B981" strokeWidth="10" strokeLinecap="round" strokeDasharray="314" strokeDashoffset="13" transform="rotate(-90 60 60)" />
                  <text x="60" y="58" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="22" fontWeight="600" fill="#E2E8F0">96%</text>
                  <text x="60" y="76" textAnchor="middle" fontFamily={isAr ? "var(--font-sans)" : "var(--font-mono)"} fontSize="9" letterSpacing={isAr ? "0" : "2"} fill="#64748B">{isAr ? t("home.onTime") : "ON TIME"}</text>
                </svg>
                <div className="flex flex-col gap-3">
                  <div>
                    <p className={isAr ? "font-sans text-[12px] text-sub-muted" : "mono text-[10px] uppercase tracking-widest text-sub-muted"}>{t("home.qcPassRate")}</p>
                    <p className="mono mt-1 text-xl font-semibold text-green"><CountUp end={98.2} decimals={1} suffix="%" /></p>
                  </div>
                  <div>
                    <p className={isAr ? "font-sans text-[12px] text-sub-muted" : "mono text-[10px] uppercase tracking-widest text-sub-muted"}>{t("home.avgLeadTime")}</p>
                    <p className="mono mt-1 text-xl font-semibold text-blue"><CountUp end={31} decimals={0} /> <span className="text-[12px] text-sub-muted">{t("home.days")}</span></p>
                  </div>
                </div>
              </div>
              <p className="mt-auto pt-4 text-[12px] leading-5 text-sub-muted">
                {t("home.corroborated")}
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ————— Services grid ————— */
const services = [
  { icon: Search,      key: "svc1" },
  { icon: ShieldCheck, key: "svc2" },
  { icon: Handshake,   key: "svc3" },
  { icon: BadgeCheck,  key: "svc4" },
  { icon: Factory,     key: "svc5" },
  { icon: Warehouse,   key: "svc6" },
  { icon: Ship,        key: "svc7" },
  { icon: Radar,       key: "svc8" },
] as const;

function ServicesGrid() {
  const { t } = useTranslation();
  return (
    <section id="services" className="scroll-mt-20 border-b border-line py-16 sm:py-24 lg:py-32">
      <div className="site-container">
        <Reveal className="max-w-3xl">
          <SectionEyebrow>{t("home.servicesEyebrow")}</SectionEyebrow>
          <h2 className="mt-4 text-3xl font-bold leading-[1.05] tracking-tight text-heading md:text-5xl">
            {t("home.servicesTitle")}
          </h2>
        </Reveal>

        <div className="mt-10 grid gap-3.5 sm:mt-14 sm:grid-cols-2 lg:grid-cols-4">
          {services.map(({ icon: Icon, key }) => (
            <Reveal key={key}>
              <div className="au-svc flex h-full flex-col gap-3 rounded-md border border-line bg-panel p-5 transition-colors">
                <span className="grid size-10 place-items-center border border-line bg-black/40 text-blue">
                  <Icon className="size-[18px]" />
                </span>
                <p className="text-[15px] font-semibold text-heading">{t(`home.${key}Title`)}</p>
                <p className="text-[13px] leading-relaxed text-muted-foreground">{t(`home.${key}Copy`)}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ————— About (home) ————— */
function AboutHome() {
  const { t } = useTranslation();
  const glance: [string, string, string][] = [
    [t("about.glanceFounded"), "2025", "#3B82F6"],
    [t("about.glanceTeam"), t("about.glanceTeamV"), "#3B82F6"],
    [t("about.glanceOffices"), t("about.glanceOfficesV"), GOLD],
  ];
  const cities: [string, string][] = [
    ["Shanghai", t("home.cityShanghai")],
    ["Shenzhen", t("home.cityShenzhen")],
    ["Guangzhou", t("home.cityGuangzhou")],
    ["Yiwu", t("home.cityYiwu")],
  ];
  return (
    <section id="about" className="scroll-mt-20 border-b border-line py-16 sm:py-24 lg:py-32">
      <div className="site-container grid gap-10 lg:grid-cols-2 lg:gap-14">
        <Reveal>
          <SectionEyebrow>{t("home.aboutEyebrow")}</SectionEyebrow>
          <h2 className="mt-4 text-3xl font-bold leading-[1.06] tracking-tight text-heading md:text-[50px]">
            {t("home.aboutTitle")}
          </h2>
          <p className="mt-5 text-[15px] leading-7 text-muted-foreground md:text-[17px]">
            {t("home.aboutP1")}
          </p>
          <p className="mt-4 text-[14px] leading-7 text-sub-muted">
            {t("home.aboutP2")}
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <button type="button" onClick={openRequestAccess} className="btn-primary">
              {t("home.aboutCtaTeam")} <ArrowUpRight className="size-3.5 rtl:-scale-x-100" />
            </button>
            <a href="#network" className="btn-ghost-line">
              {t("home.aboutCtaNetwork")} <ArrowRight className="size-3.5 rtl:-scale-x-100" />
            </a>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="panel p-6">
            <div className="flex items-center justify-between border-b border-line pb-3">
              <span className="label-mono text-heading">{t("home.atAGlance")}</span>
              <span className="mono text-[10px] text-sub-muted">ORG-01</span>
            </div>
            <div className="mt-5 grid grid-cols-2 gap-5">
              {glance.map(([label, value, color]) => (
                <div key={label}>
                  <p className="label-mono">{label}</p>
                  <p className="mono mt-2 text-[22px] font-semibold" style={{ color }}>{value}</p>
                </div>
              ))}
            </div>
            <div className="mt-5 grid gap-2.5 border-t border-line pt-4">
              {cities.map(([city, note]) => (
                <div key={city} className="flex items-center gap-2.5 text-[13px] text-muted-foreground">
                  <span className="mono w-[82px] flex-none text-[10px] uppercase tracking-widest" style={{ color: GOLD }}>{city}</span>
                  {note}
                </div>
              ))}
            </div>
            <div className="mono mt-5 flex items-center justify-between border-t border-line pt-3 text-[9px] uppercase tracking-widest text-sub-muted">
              <span className="inline-flex items-center gap-1.5">
                <span className="status-dot" style={{ background: "#10B981", color: "#10B981" }} />
                hq · Shanghai
              </span>
              <span>lat 31.23 · lng 121.47</span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ————— Partnership CTA ————— */
function PartnershipCTA() {
  const { t } = useTranslation();
  return (
    <section id="contact" className="relative overflow-hidden border-b border-line py-16 sm:py-24 lg:py-32">
      <img
        src={photoAe}
        alt=""
        aria-hidden
        loading="lazy"
        decoding="async"
        className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-20"
        style={{ filter: "contrast(1.05) brightness(0.7) hue-rotate(188deg)" }}
      />
      <div aria-hidden className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 50% 50%, rgba(8,10,13,0.5), rgba(8,10,13,0.95) 70%)" }} />
      <Reveal className="relative mx-auto max-w-[760px] px-1 text-center">
        <SectionEyebrow>{t("home.partnershipEyebrow")}</SectionEyebrow>
        <h2 className="serif-display mt-5 text-3xl leading-[1.05] text-heading md:text-5xl">
          {t("home.partnershipTitle1")}<br /><span className="italic">{t("home.partnershipTitle2")}</span>
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-[15px] leading-6 text-muted-foreground md:text-[17px]">
          {t("home.partnershipCopy")}
        </p>
        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <Link to="/contact" className="btn-primary">
            {t("home.partnershipCta1")} <ArrowUpRight className="size-3.5 rtl:-scale-x-100" />
          </Link>
          <button type="button" onClick={openRequestAccess} className="btn-ghost-line">
            {t("home.partnershipCta2")} <ArrowRight className="size-3.5 rtl:-scale-x-100" />
          </button>
        </div>
      </Reveal>
    </section>
  );
}

function Comparison() {
  const { t } = useTranslation();
  return (
    <section id="comparison" className="scroll-mt-20 border-b border-line py-16 sm:py-24 lg:py-32">
      <div className="site-container">
        <Reveal className="text-center">
          <span className="label-mono">{t("home.signalsEyebrow")}</span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-heading md:text-5xl">
            {t("home.signalsTitle")}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-muted-foreground md:text-base">
            {t("home.signalsIntro")}
          </p>
        </Reveal>

        <div className="mt-10 grid sm:mt-14 gap-6 md:grid-cols-2">
          {/* Unverified */}
          <Reveal>
            <div className="panel p-6 md:p-8">
              <div className="flex items-center justify-between">
                <span className="label-mono text-amber">{t("home.signalsUnverified")}</span>
                <span className="status-badge tone-amber">
                  <span className="status-dot" style={{ background: "#F59E0B", color: "#F59E0B" }} /> {t("home.signalsLowConf")}
                </span>
              </div>
              <h3 className="mt-6 text-xl font-semibold text-heading">{t("home.signalsCard1Title")}</h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                {t("home.signalsCard1Copy")}
              </p>
              <div className="mt-8">
                <p className="label-mono mb-3">{t("home.signalsCorrobEvidence")}</p>
                <div className="dashed-empty">{t("home.signalsNoSignals")}</div>
              </div>
              <div className="mt-8 flex items-center justify-between border-t border-line pt-4">
                <span className="mono text-[11px] uppercase tracking-widest text-sub-muted">{t("home.signalsConfidence")}</span>
                <span className="mono text-sm font-semibold text-amber">32%</span>
              </div>
            </div>
          </Reveal>

          {/* Corroborated */}
          <Reveal delay={0.1}>
            <div className="relative panel border-blue/60 p-6 md:p-8" style={{ boxShadow: "0 20px 60px -20px rgba(59,130,246,0.25)", borderColor: "rgba(59,130,246,0.55)" }}>
              <div className="flex items-center justify-between">
                <span className="label-mono text-blue">{t("home.signalsCorroborated")}</span>
                <span className="status-badge tone-green">
                  <span className="status-dot" style={{ background: "#10B981", color: "#10B981" }} /> {t("home.signalsHighConf")}
                </span>
              </div>
              <h3 className="mt-6 text-xl font-semibold text-heading">{t("home.signalsCard2Title")}</h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                {t("home.signalsCard2Copy")}
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
  const { t } = useTranslation();
  return (
    <section id="timeline" className="scroll-mt-20 border-b border-line py-16 sm:py-24 lg:py-32">
      <div className="site-container">
        <Reveal className="mx-auto max-w-3xl text-center">
          <span className="label-mono">{t("home.feedEyebrow")}</span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-heading md:text-5xl">
            {t("home.feedTitle")}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-muted-foreground md:text-base">
            {t("home.feedIntro")}
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
  const { t } = useTranslation();
  return (
    <section id="modules" className="scroll-mt-20 border-b border-line py-16 sm:py-24 lg:py-32">
      <div className="site-container">
        <Reveal className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="label-mono">{t("home.platformEyebrow")}</span>
            <h2 className="mt-4 max-w-2xl text-3xl font-bold tracking-tight text-heading md:text-5xl">
              {t("home.platformTitle")}
            </h2>
          </div>
          <p className="max-w-md text-sm leading-6 text-muted-foreground md:text-base">
            {t("home.platformCopy")}
          </p>
        </Reveal>

        <div className="mt-10 grid sm:mt-14 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {modules.map(({ icon: Icon, key }, i) => (
            <Reveal key={key} delay={(i % 4) * 0.05}>
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
                    {t(`home.${key}Title`)}
                  </p>
                  <p className="relative text-[11px] leading-relaxed text-muted-foreground">{t(`home.${key}Copy`)}</p>
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
  { src: heroPort,      node: "SHA · Yangshan Terminal",     tag: "Loading · TEU 4,482",        tone: "green" as const, confidence: "97%" },
  { src: photoGz,       node: "GZ · Nansha Bonded",          tag: "Consolidation · 12 SKUs",    tone: "blue" as const,  confidence: "89%" },
  { src: photoNl,       node: "NL · Rotterdam Port",         tag: "Discharge · ETA 03:14",      tone: "green" as const, confidence: "94%" },
  { src: photoAe,       node: "AE · Jebel Ali",              tag: "Transshipment · lane 4",     tone: "amber" as const, confidence: "76%" },
  { src: photoSz,       node: "CN · Shenzhen · Line 07",     tag: "SMT · rev C tooling live",   tone: "blue" as const,  confidence: "92%" },
  { src: photoMa,       node: "MA · Casablanca Container",   tag: "Departure · Vsl AURIA-08",   tone: "green" as const, confidence: "88%" },
];

function OperationsGallery() {
  const { t } = useTranslation();
  return (
    <section className="border-b border-line py-16 sm:py-24 lg:py-32">
      <div className="site-container">
        <Reveal className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="label-mono">{t("home.fieldOpsEyebrow")}</span>
            <h2 className="mt-4 max-w-2xl text-3xl font-bold tracking-tight text-heading md:text-5xl">
              {t("home.fieldOpsTitle")}
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
  { src: photoSha,      node: "SHA · Yangshan",  tag: "Bay 4 · gantry sync",   tone: "green" as const, timecode: "T-00:04:12" },
  { src: photoHkg,      node: "HKG · Air Cargo", tag: "Freighter · gate C7",   tone: "blue" as const,  timecode: "T-00:09:48" },
  { src: photoOverland, node: "CN · Overland",   tag: "Convoy · 12 trailers",  tone: "amber" as const, timecode: "T-00:21:03" },
];

function CommandBroadcast() {
  const { t } = useTranslation();
  return (
    <section id="broadcast" className="scroll-mt-20 border-b border-line py-16 sm:py-24 lg:py-32">
      <div className="site-container">
        <Reveal className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="label-mono">{t("home.evidenceEyebrow")}</span>
            <h2 className="mt-4 max-w-2xl text-3xl font-bold tracking-tight text-heading md:text-5xl">
              {t("home.evidenceTitle1")} <span className="italic serif-display">{t("home.evidenceTitle2")}</span>
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
                src={photoFactory}
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
              <div className="absolute inset-x-3 top-3 flex flex-wrap items-start justify-between gap-2 sm:inset-x-4 sm:top-4">
                <div className="glass-panel flex items-center gap-2 px-2 py-1 sm:px-3 sm:py-1.5">
                  <span className="status-dot" style={{ background: "#10B981", color: "#10B981" }} />
                  <span className="mono text-[9px] font-semibold uppercase tracking-widest text-heading sm:text-[10px]">
                    Verified · On-site
                  </span>
                </div>
                <div className="glass-panel mono hidden items-center gap-3 px-3 py-1.5 text-[10px] uppercase tracking-widest text-blue sm:flex">
                  <span>insp-4482</span>
                  <span className="text-sub-muted">·</span>
                  <span>14 mar 26</span>
                </div>
              </div>

              {/* HUD bottom */}
              <figcaption className="absolute inset-x-3 bottom-3 flex items-end justify-between gap-3 sm:inset-x-4 sm:bottom-4 sm:gap-4">
                <div className="min-w-0 flex-1">
                  <p className="mono truncate text-[9px] uppercase tracking-widest text-blue sm:text-[10px]">CN · Shenzhen · Partner Factory · Line 07</p>
                  <p className="mt-1.5 text-sm font-semibold text-heading sm:mt-2 sm:text-lg md:text-2xl">Pre-shipment inspection complete.</p>
                  <p className="mono mt-1 hidden text-[10px] uppercase tracking-widest text-sub-muted sm:block">
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
  { src: heroPort, label: "SHA · gantry",   tone: "green" as const },
  { src: photoAe,  label: "AE · transship", tone: "amber" as const },
  { src: photoNl,  label: "NL · discharge", tone: "green" as const },
  { src: photoGz,  label: "GZ · bonded",    tone: "blue" as const },
  { src: photoSz,  label: "CN · line 07",   tone: "blue" as const },
];

const fieldTransmissionsRowB = [
  { src: photoFactory,  label: "MX · staging",    tone: "amber" as const },
  { src: photoSha,      label: "SG · lane 12",    tone: "green" as const },
  { src: photoMa,       label: "MA · casablanca", tone: "green" as const },
  { src: photoVessel,   label: "IN · nhava",      tone: "amber" as const },
  { src: photoOverland, label: "US · long beach", tone: "green" as const },
];

const fieldTransmissions = [...fieldTransmissionsRowA, ...fieldTransmissionsRowB];

function FieldTransmissions() {
  const { t } = useTranslation();
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
            <span className="label-mono">{t("home.tickerEyebrow")}</span>
            <h2 className="mt-3 max-w-2xl text-2xl font-bold tracking-tight text-heading md:text-4xl">
              {t("home.tickerTitle")}
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
  const { t } = useTranslation();
  return (
    <section className="relative overflow-hidden border-b border-line py-16 sm:py-24 lg:py-32">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[100px]"
        style={{ background: "linear-gradient(to bottom, rgba(59,130,246,0.18), transparent)" }}
      />
      <div className="site-container text-center">
        <Reveal>
          <span className="label-mono text-blue">{t("home.deployEyebrow")}</span>
          <h2 className="mx-auto mt-6 max-w-3xl text-3xl font-bold tracking-tight text-heading md:text-4xl">
            {t("home.deployTitle1")} <span className="text-blue">{t("home.deployTitle2")}</span>.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-muted-foreground md:text-base">
            {t("home.deployCopy")}
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <button type="button" onClick={openRequestAccess} className="btn-primary">
              {t("home.deployCtaStart")} <ArrowUpRight className="size-3.5 rtl:-scale-x-100" />
            </button>
            <Link to="/contact" className="btn-ghost-line">
              {t("home.deployCtaExpert")} <ArrowRight className="size-3.5 rtl:-scale-x-100" />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function WhatsAppLogo({ className = "size-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <path
        fill="#25D366"
        d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.004c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2z"
      />
      <path
        fill="#fff"
        d="M9.53 7.33c-.18-.4-.36-.41-.53-.42l-.45-.01c-.16 0-.41.06-.63.29-.22.23-.83.81-.83 1.98s.85 2.3.97 2.46c.12.16 1.65 2.64 4.07 3.6 2.01.79 2.42.63 2.86.59.44-.04 1.42-.58 1.62-1.14.2-.56.2-1.04.14-1.14-.06-.1-.22-.16-.46-.28-.24-.12-1.42-.7-1.64-.78-.22-.08-.38-.12-.54.12-.16.24-.62.78-.76.94-.14.16-.28.18-.52.06-.24-.12-1.01-.37-1.93-1.19-.71-.63-1.19-1.42-1.33-1.66-.14-.24-.01-.37.11-.49.11-.11.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.53-1.32-.74-1.8z"
      />
    </svg>
  );
}

function GmailLogo({ className = "size-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden>
      <path fill="#4caf50" d="M45 16.2l-5 2.75-5 4.75V40h7a3 3 0 0 0 3-3V16.2z" />
      <path fill="#1e88e5" d="M3 16.2l3.61 1.71L13 23.7V40H6a3 3 0 0 1-3-3V16.2z" />
      <polygon fill="#e53935" points="35,11.2 24,19.45 13,11.2 12,17 13,23.7 24,31.95 35,23.7 36,17" />
      <path fill="#c62828" d="M3 12.3v3.9l10 7.5V11.2L9.88 8.86C6.24 6.13 3 8.85 3 12.3z" />
      <path fill="#fbc02d" d="M45 12.3v3.9l-10 7.5V11.2l3.12-2.34C41.76 6.13 45 8.85 45 12.3z" />
    </svg>
  );
}

function ContactSection() {
  const { t } = useTranslation();
  const [form, setForm] = useState<Record<string, string>>({});
  const [error, setError] = useState(false);
  const [showChannels, setShowChannels] = useState(false);
  const channelsWrapRef = useRef<HTMLDivElement | null>(null);
  const setField = (key: string, value: string) => {
    setForm((f) => ({ ...f, [key]: value }));
    if (error) setError(false);
    // Editing after the channel picker is shown re-hides it so the send is re-confirmed.
    if (showChannels) setShowChannels(false);
  };

  // Dismiss the send-via popup when the user clicks outside it (the submit
  // button lives in the same wrapper, so re-clicking Transmit Inquiry still
  // re-opens the picker via onTransmit).
  useEffect(() => {
    if (!showChannels) return;
    const onDown = (e: MouseEvent | TouchEvent) => {
      const node = channelsWrapRef.current;
      if (node && !node.contains(e.target as Node)) setShowChannels(false);
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("touchstart", onDown, { passive: true });
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("touchstart", onDown);
    };
  }, [showChannels]);

  // Step 1: validate all fields, then reveal the WhatsApp / Gmail choices.
  const onTransmit = () => {
    const required = ["fullName", "company", "email", "country", "sourcing", "message"];
    if (!required.every((k) => (form[k] || "").trim() !== "")) {
      setError(true);
      setShowChannels(false);
      return;
    }
    setError(false);
    setShowChannels(true);
  };

  // Step 2: build the message and open the chosen channel.
  const sendVia = (channel: "whatsapp" | "gmail") => {
    const name = (form["fullName"] || "").trim();
    const val = (k: string) => (form[k] || "").trim() || "—";
    const label = (k: string) => t(`requestAccess.${k}`);
    const body = [
      t("home.waInquiry", { name }),
      "",
      `${label("company")}: ${val("company")}`,
      `${label("email")}: ${val("email")}`,
      `${label("country")}: ${val("country")}`,
      `${label("sourcing")}: ${val("sourcing")}`,
      `${label("message")}: ${val("message")}`,
    ].join("\n");

    if (channel === "whatsapp") {
      window.open(`https://wa.me/212625461733?text=${encodeURIComponent(body)}`, "_blank", "noopener");
    } else {
      const url =
        "https://mail.google.com/mail/?view=cm&fs=1" +
        `&to=${encodeURIComponent("aureacompany907@gmail.com")}` +
        `&su=${encodeURIComponent(t("channel.subjectInquiry", { name }))}` +
        `&body=${encodeURIComponent(body)}`;
      window.open(url, "_blank", "noopener");
    }
  };

  return (
    <section className="border-b border-line py-14 sm:py-20 lg:py-32" id="inquiry">
      <div className="site-container grid gap-8 sm:gap-10 lg:grid-cols-[0.7fr_1.3fr] lg:gap-12">
        <Reveal>
          <span className="section-eyebrow">{t("home.contactEyebrow")}</span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-heading md:text-4xl">
            {t("home.contactTitle")}
          </h2>
          <p className="mt-4 max-w-md text-sm leading-6 text-muted-foreground">
            {t("home.contactCopy")}
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <form
            className="panel grid gap-4 p-5 sm:grid-cols-2 sm:gap-5 sm:p-6 md:p-8"
            onSubmit={(e) => {
              e.preventDefault();
              onTransmit();
            }}
          >
            {([
              ["fullName", "text", false],
              ["company", "text", false],
              ["email", "email", false],
              ["country", "text", false],
              ["sourcing", "text", true],
            ] as const).map(([field, type, wide]) => (
              <label key={field} className={`space-y-2 ${wide ? "sm:col-span-2" : ""}`}>
                <span className="label-mono">
                  {t(`requestAccess.${field}`)} <span className="text-red">*</span>
                </span>
                <input
                  type={type}
                  value={form[field] ?? ""}
                  onChange={(e) => setField(field, e.target.value)}
                  placeholder={t(`requestAccess.${field}Ph`)}
                  className="field-input"
                />
              </label>
            ))}
            <label className="space-y-2 sm:col-span-2">
              <span className="label-mono">
                {t("requestAccess.message")} <span className="text-red">*</span>
              </span>
              <textarea
                rows={4}
                value={form["message"] ?? ""}
                onChange={(e) => setField("message", e.target.value)}
                placeholder={t("requestAccess.messagePh")}
                className="field-input resize-none"
              />
            </label>
            {error && (
              <p role="alert" className="sm:col-span-2 text-[13px] font-medium text-red">
                {t("home.contactError")}
              </p>
            )}
            <div className="flex flex-wrap items-center justify-end gap-3 sm:col-span-2">
              <div className="relative" ref={channelsWrapRef}>
                {showChannels && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.85, x: "-50%" }}
                    animate={{ opacity: 1, y: 0, scale: 1, x: "-50%" }}
                    transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute bottom-full left-1/2 z-20 mb-3 origin-bottom rounded-xl border border-line bg-[#0d1017]/95 p-3 shadow-[0_24px_60px_-16px_rgba(0,0,0,0.75)] ring-1 ring-white/5 backdrop-blur-md"
                  >
                    <p className="mb-2.5 text-center mono text-[9px] uppercase tracking-[0.18em] text-sub-muted">
                      {t("channel.sendVia")}
                    </p>
                    <div className="flex items-stretch gap-2.5">
                      <button
                        type="button"
                        onClick={() => sendVia("whatsapp")}
                        aria-label={t("channel.whatsapp")}
                        className="group flex w-[84px] flex-col items-center gap-1.5 rounded-lg border border-line bg-white/[0.02] px-3 py-3 transition-all hover:-translate-y-0.5 hover:border-green/60 hover:bg-green/10"
                      >
                        <WhatsAppLogo className="size-7 transition-transform group-hover:scale-110" />
                        <span className="text-[11px] font-semibold text-heading">WhatsApp</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => sendVia("gmail")}
                        aria-label="Gmail"
                        className="group flex w-[84px] flex-col items-center gap-1.5 rounded-lg border border-line bg-white/[0.02] px-3 py-3 transition-all hover:-translate-y-0.5 hover:border-blue/60 hover:bg-blue/10"
                      >
                        <GmailLogo className="size-7 transition-transform group-hover:scale-110" />
                        <span className="text-[11px] font-semibold text-heading">Gmail</span>
                      </button>
                    </div>
                    <span
                      aria-hidden
                      className="absolute left-1/2 top-full -ml-1.5 -mt-1.5 size-3 rotate-45 rounded-[2px] border-b border-r border-line bg-[#0d1017]"
                    />
                  </motion.div>
                )}
                <button type="submit" className="btn-primary">
                  {t("home.contactTransmit")} <ArrowUpRight className="size-3.5 rtl:-scale-x-100" />
                </button>
              </div>
            </div>
          </form>
        </Reveal>
      </div>
    </section>
  );
}

function KpiStrip() {
  const { t } = useTranslation();
  const kpis = [
    { label: t("home.ksNodes"), n: 7, decimals: 0, prefix: "0", suffix: "", tone: "blue" },
    { label: t("home.ksSignals"), n: 12.4, decimals: 1, prefix: "", suffix: "K", tone: "green" },
    { label: t("home.ksLanes"), n: 42, decimals: 0, prefix: "", suffix: "", tone: "green" },
    { label: t("home.ksAdvisories"), n: 3, decimals: 0, prefix: "0", suffix: "", tone: "red" },
  ];
  return (
    <section className="border-b border-line bg-panel/40">
      <div className="site-container grid grid-cols-2 divide-x divide-line md:grid-cols-4">
        {kpis.map((k, i) => (
          <div key={k.label} className={`relative overflow-hidden px-4 py-5 sm:px-6 sm:py-6 md:px-8 md:py-8 ${i === 0 ? "border-l border-line" : ""} ${i >= 2 ? "border-t border-line md:border-t-0" : ""}`}>
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
            <p className="mono relative mt-3 text-xl font-semibold sm:text-2xl md:text-3xl" style={{ color: toneColor[k.tone] }}>
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
      {/* Scoped hover states for the home sections (no global CSS needed). */}
      <style>{`.au-svc:hover{border-color:#3B82F6;background:rgba(59,130,246,0.04)}`}</style>
      <Hero />
      <NetworkGlobe />
      <FeedsSection />
      <AnalyticsSection />
      <ServicesGrid />
      <AboutHome />
      <PartnershipCTA />
    </SiteLayout>
  );
}

export { modules, timeline, mapNodes, ContactSection, Reveal };
