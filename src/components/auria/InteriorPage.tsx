import { Link } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight, type LucideIcon } from "lucide-react";
import { motion } from "motion/react";
import { SiteLayout } from "./SiteShell";
import { Reveal } from "./AuriaHome";

const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } } };
const item = { hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const } } };

export function InteriorPage({
  eyebrow,
  title,
  intro,
  items,
  cta = "Start a project",
  code = "00",
}: {
  eyebrow: string;
  title: string;
  intro: string;
  items: readonly (readonly [LucideIcon, string, string])[];
  cta?: string;
  code?: string;
}) {
  return (
    <SiteLayout>
      <section className="relative overflow-hidden pt-28 pb-16 lg:pt-40 lg:pb-24">
        <div className="grid-bg absolute inset-0 opacity-60" aria-hidden />
        <div className="site-container relative">
          <motion.div initial="hidden" animate="show" variants={stagger}>
            <motion.p variants={item} className="readout">
              <span className="dot" /> {eyebrow} · Ref /{code}
            </motion.p>
            <motion.h1 variants={item} className="display-title mt-8 max-w-5xl">
              {title}
            </motion.h1>
            <motion.p variants={item} className="mt-8 max-w-2xl text-base leading-7 text-muted-foreground">
              {intro}
            </motion.p>
            <motion.div variants={item} className="mt-10 flex flex-col gap-3 sm:flex-row">
              <Link
                to="/contact"
                className="mono group inline-flex items-center justify-between gap-4 border border-accent bg-accent px-6 py-4 text-xs font-medium uppercase tracking-widest text-accent-foreground transition-colors duration-300 hover:bg-transparent hover:text-accent"
              >
                {cta} <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </Link>
              <Link
                to="/services"
                className="mono group inline-flex items-center justify-between gap-4 border border-border-strong px-6 py-4 text-xs font-medium uppercase tracking-widest text-foreground transition-colors duration-300 hover:border-accent hover:text-accent"
              >
                Explore services <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section className="border-t border-border py-16 lg:py-24">
        <div className="site-container">
          {items.map(([Icon, name, copy], i) => (
            <Reveal key={name} delay={(i % 2) * 0.05}>
              <div className="service-row">
                <span className="mono text-[11px] uppercase tracking-widest text-muted-foreground">/ {String(i + 1).padStart(2, "0")}</span>
                <div className="flex items-center gap-4">
                  <Icon className="size-4 text-accent" />
                  <h3 className="text-lg font-medium tracking-tight md:text-xl">{name}</h3>
                </div>
                <p className="hidden text-sm leading-6 text-muted-foreground md:block">{copy}</p>
                <ArrowRight className="service-row-arrow size-4" />
              </div>
            </Reveal>
          ))}
          <div className="border-t border-border" />
        </div>
      </section>

      <section className="border-t border-border py-20">
        <div className="site-container flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
          <Reveal>
            <p className="tag">/ Begin</p>
            <h2 className="display-title mt-6 max-w-2xl" style={{ fontSize: "clamp(1.75rem, 4vw, 3rem)" }}>
              Ready when you are.
            </h2>
          </Reveal>
          <Reveal delay={0.1} className="w-full sm:w-auto">
            <Link
              to="/contact"
              className="mono group inline-flex w-full items-center justify-between gap-4 border border-accent bg-accent px-6 py-4 text-xs font-medium uppercase tracking-widest text-accent-foreground transition-colors duration-300 hover:bg-transparent hover:text-accent sm:w-auto"
            >
              {cta} <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
          </Reveal>
        </div>
      </section>
    </SiteLayout>
  );
}
