const nodes = [
  { id: "cn", cx: 68, cy: 40, label: "Shanghai", code: "CN·31.2", hub: true },
  { id: "eu", cx: 44, cy: 30, label: "Rotterdam", code: "NL·51.9" },
  { id: "us", cx: 20, cy: 34, label: "Los Angeles", code: "US·34.0" },
  { id: "ae", cx: 54, cy: 44, label: "Dubai", code: "AE·25.2" },
  { id: "za", cx: 48, cy: 66, label: "Cape Town", code: "ZA·-33.9" },
  { id: "au", cx: 82, cy: 68, label: "Sydney", code: "AU·-33.8" },
  { id: "br", cx: 30, cy: 60, label: "Santos", code: "BR·-23.9" },
];

function arcPath(x1: number, y1: number, x2: number, y2: number) {
  const dx = x2 - x1;
  const dy = y2 - y1;
  const dist = Math.hypot(dx, dy);
  const mx = (x1 + x2) / 2;
  const my = (y1 + y2) / 2 - dist * 0.3;
  return `M ${x1} ${y1} Q ${mx} ${my} ${x2} ${y2}`;
}

export function NetworkView() {
  const hub = nodes[0];
  return (
    <div className="relative aspect-[4/3] w-full">
      <div className="dot-bg absolute inset-0 opacity-70" aria-hidden />
      <svg
        viewBox="0 0 100 80"
        className="relative h-full w-full"
        role="img"
        aria-label="AURIA global trade network with China as the primary hub"
      >
        <defs>
          <radialGradient id="hubGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="oklch(0.85 0.16 84)" stopOpacity="0.6" />
            <stop offset="100%" stopColor="oklch(0.85 0.16 84)" stopOpacity="0" />
          </radialGradient>
        </defs>

        {nodes.slice(1).map((n) => (
          <path
            key={`arc-${n.id}`}
            d={arcPath(hub.cx, hub.cy, n.cx, n.cy)}
            fill="none"
            stroke="oklch(0.85 0.16 84)"
            strokeOpacity="0.4"
            strokeWidth="0.25"
            strokeDasharray="1.5 2"
            style={{ animation: "arc-flow 3.2s linear infinite" }}
          />
        ))}

        <circle cx={hub.cx} cy={hub.cy} r="6" fill="url(#hubGlow)" />

        {nodes.map((n) => (
          <g key={n.id}>
            <circle
              cx={n.cx}
              cy={n.cy}
              r={n.hub ? "1.4" : "0.9"}
              fill="oklch(0.85 0.16 84)"
            >
              <animate
                attributeName="opacity"
                values="1;0.35;1"
                dur={`${2 + (n.cx % 3)}s`}
                repeatCount="indefinite"
              />
            </circle>
            <circle
              cx={n.cx}
              cy={n.cy}
              r={n.hub ? "3" : "2"}
              fill="none"
              stroke="oklch(0.85 0.16 84)"
              strokeOpacity="0.3"
              strokeWidth="0.15"
            />
          </g>
        ))}
      </svg>

      <div className="pointer-events-none absolute inset-0">
        {nodes.map((n) => (
          <span
            key={`lbl-${n.id}`}
            className="absolute mono text-[9px] uppercase tracking-widest text-muted-foreground"
            style={{
              left: `${n.cx}%`,
              top: `${n.cy}%`,
              transform: `translate(${n.cx > 50 ? "10px" : "-105%"}, -50%)`,
            }}
          >
            <span className={n.hub ? "text-accent" : ""}>{n.label}</span>
            <span className="ml-2 opacity-40">{n.code}</span>
          </span>
        ))}
      </div>
    </div>
  );
}
