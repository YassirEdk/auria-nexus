import { useEffect, useState } from "react";

/**
 * Reads the perf tier and viewport size stamped on <html> by the inline
 * perf-detect script in __root.tsx. Returns stable, SSR-safe defaults on
 * first render, then hydrates from the real classes on the client.
 */
export function usePerfLite() {
  const [lite, setLite] = useState(false);
  useEffect(() => {
    const el = document.documentElement;
    setLite(el.classList.contains("perf-lite"));
  }, []);
  return lite;
}

export function useIsTouch() {
  const [touch, setTouch] = useState(false);
  useEffect(() => {
    const el = document.documentElement;
    setTouch(el.classList.contains("is-touch"));
  }, []);
  return touch;
}

export function useIsMobileViewport() {
  const [mobile, setMobile] = useState(false);
  useEffect(() => {
    const el = document.documentElement;
    setMobile(el.classList.contains("is-mobile"));
    const mql = window.matchMedia("(max-width: 899px)");
    const on = () => setMobile(mql.matches);
    mql.addEventListener("change", on);
    return () => mql.removeEventListener("change", on);
  }, []);
  return mobile;
}
