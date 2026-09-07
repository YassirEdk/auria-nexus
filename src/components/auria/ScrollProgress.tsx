import { useEffect, useState } from "react";

export function ScrollProgress() {
  const [pct, setPct] = useState(0);

  useEffect(() => {
    let raf = 0;
    const compute = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const height =
        (document.documentElement.scrollHeight || 0) -
        (document.documentElement.clientHeight || window.innerHeight);
      const next = height > 0 ? Math.min(100, Math.max(0, (scrollTop / height) * 100)) : 0;
      setPct(next);
    };
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        compute();
      });
    };
    compute();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-x-0 top-0 z-[120] h-[2px] bg-transparent"
    >
      <div
        className="h-full origin-left"
        style={{
          width: `${pct}%`,
          background:
            "linear-gradient(90deg, #3B82F6 0%, #10B981 60%, #F5C36B 100%)",
          boxShadow: "0 0 12px rgba(59,130,246,0.55)",
          transition: "width 80ms linear",
        }}
      />
    </div>
  );
}
