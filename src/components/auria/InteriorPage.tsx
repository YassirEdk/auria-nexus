import { Link } from "@tanstack/react-router";
import { ArrowUpRight, type LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SiteLayout } from "./SiteShell";
import { Reveal } from "./AuriaHome";

export function InteriorPage({ eyebrow, title, intro, items, cta = "Start a Partnership" }: { eyebrow: string; title: string; intro: string; items: readonly (readonly [LucideIcon, string, string])[]; cta?: string }) {
  return <SiteLayout><section className="relative overflow-hidden bg-ink pb-24 pt-40 text-ink-foreground"><div className="hero-grid absolute inset-0 opacity-35"/><div className="site-container relative"><p className="eyebrow">{eyebrow}</p><h1 className="mt-7 max-w-5xl font-display text-5xl font-medium leading-[1.02] sm:text-7xl lg:text-8xl">{title}</h1><p className="mt-8 max-w-2xl text-lg leading-8 text-ink-muted">{intro}</p><Button asChild variant="auria" size="lg" className="mt-10"><Link to="/contact">{cta} <ArrowUpRight /></Link></Button></div></section><section className="section-space bg-background"><div className="site-container grid gap-px bg-border md:grid-cols-2">{items.map(([Icon,name,copy],i)=><Reveal key={name} delay={(i%2)*.08} className="service-card"><Icon className="size-6 text-accent-foreground"/><h2 className="mt-12 text-2xl font-semibold">{name}</h2><p className="mt-4 max-w-lg text-sm leading-6 text-muted-foreground">{copy}</p></Reveal>)}</div></section></SiteLayout>;
}