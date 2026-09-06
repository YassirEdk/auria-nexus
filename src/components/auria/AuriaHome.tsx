import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { motion, useReducedMotion } from "motion/react";
import {
  ArrowUpRight, ArrowRight, BadgeCheck, Boxes, Building2, CheckCircle2,
  Container, Factory, Handshake, PackageCheck, Search, ShieldCheck, Ship,
  Tags, Warehouse,
} from "lucide-react";
import { SiteLayout } from "./SiteShell";
import { NetworkView } from "./NetworkView";

const services = [
  [Search, "Global Sourcing", "Find the right products and manufacturers according to your requirements."],
  [BadgeCheck, "Supplier Verification", "Identify and verify reliable factories and suppliers."],
  [Handshake, "Negotiation & Procurement", "Secure competitive prices and favorable commercial conditions."],
  [ShieldCheck, "Quality Control", "Inspection and quality monitoring before products leave the factory."],
  [Tags, "Private Label", "Develop products with custom branding, packaging and specifications."],
  [Factory, "Product Development", "Turn ideas into manufactured products through Chinese production partners."],
  [Warehouse, "Warehousing & Consolidation", "Receive, store and consolidate goods from multiple suppliers."],
  [Ship, "International Logistics", "Coordinate international transportation and delivery."],
] as const;

const process = [
  ["01", "Tell Us What You Need", "Product, quantity, specifications and target market."],
  ["02", "We Source", "Suitable suppliers and manufacturing partners."],
  ["03", "We Negotiate", "Offers compared and conditions negotiated."],
  ["04", "We Control", "Samples, production and quality monitored."],
  ["05", "We Deliver", "Goods consolidated and shipped to destination."],
] as const;

const industries = [
  "Automotive", "Consumer Electronics", "Fashion & Textiles", "Home & Furniture",
  "Beauty & Cosmetics", "Industrial Equipment", "Construction", "Packaging",
  "Retail & E-commerce", "Hospitality",
];

const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } } };
const item = { hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const } } };

function useTypewriter(text: string, speed = 42, startAfter = 0, enabled = true) {
  const [out, setOut] = useState(enabled ? "" : text);
  const [done, setDone] = useState(!enabled);
  useEffect(() => {
    if (!enabled) { setOut(text); setDone(true); return; }
    setOut("");
    setDone(false);
    let cancelled = false;
    let interval: ReturnType<typeof setInterval> | null = null;
    const start = window.setTimeout(() => {
      if (cancelled) return;
      let i = 0;
      interval = setInterval(() => {
        i++;
        setOut(text.slice(0, i));
        if (i >= text.length) {
          if (interval) clearInterval(interval);
          setDone(true);
        }
      }, speed);
    }, startAfter);
    return () => {
      cancelled = true;
      window.clearTimeout(start);
      if (interval) clearInterval(interval);
    };
  }, [text, speed, startAfter, enabled]);
  return { text: out, done };
}

function TypedHeroTitle() {
  const reduce = useReducedMotion();
  const enabled = !reduce;
  const line1 = useTypewriter("Global trade,", 55, 250, enabled);
  const line2 = useTypewriter("engineered from China", 45, 0, enabled && line1.done);
  return (
    <h1 className="relative display-title mt-8 max-w-4xl">
      <span aria-hidden className="invisible block">
        Global trade,<br />
        <span>engineered from China</span>
      </span>
      <span className="absolute inset-0" aria-live="polite">
        <span>{line1.text}</span>
        {line1.done && <br />}
        {line1.done && <span className="text-accent">{line2.text}</span>}
        <span className="caret" aria-hidden />
      </span>
    </h1>
  );
}

function Reveal({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden pt-28 pb-16 lg:pt-40 lg:pb-24">
      <div className="grid-bg absolute inset-0 opacity-60" aria-hidden />
      <div className="site-container relative grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-16">
        <motion.div initial="hidden" animate="show" variants={stagger}>
          <motion.p variants={item} className="readout">
            <span className="dot" /> China → Global · Node 001 online
          </motion.p>
          <motion.div variants={item}>
            <TypedHeroTitle />
          </motion.div>
          <motion.p variants={item} className="mt-8 max-w-lg text-base leading-7 text-muted-foreground">
            AURIA is a precision sourcing and logistics network connecting global operators with China&apos;s manufacturing base. One system, one accountable partner.
          </motion.p>
          <motion.div variants={item} className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Link
              to="/contact"
              className="mono group inline-flex items-center justify-between gap-4 border border-accent bg-accent px-6 py-4 text-xs font-medium uppercase tracking-widest text-accent-foreground transition-colors duration-300 hover:bg-transparent hover:text-accent"
            >
              Start a project <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
            <Link
              to="/services"
              className="mono group inline-flex items-center justify-between gap-4 border border-border-strong px-6 py-4 text-xs font-medium uppercase tracking-widest text-foreground transition-colors duration-300 hover:border-accent hover:text-accent"
            >
              Explore the network <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </motion.div>
          <motion.dl variants={item} className="mt-14 grid max-w-lg grid-cols-3 gap-8 border-t border-border pt-8">
            {[["10+", "sectors"], ["24/7", "coverage"], ["1", "partner"]].map(([n, l]) => (
              <div key={l}>
                <dt className="big-num text-3xl">{n}</dt>
                <dd className="mono mt-2 text-[11px] uppercase tracking-widest text-muted-foreground">{l}</dd>
              </div>
            ))}
          </motion.dl>
        </motion.div>
        <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }} className="relative border border-border bg-surface/40 p-6 sm:p-10">
          <div className="scan-line" aria-hidden />
          <div className="mono mb-6 flex items-center justify-between text-[10px] uppercase tracking-widest text-muted-foreground">
            <span>network.map</span>
            <span className="inline-flex items-center gap-2"><span className="dot" /> live</span>
          </div>
          <NetworkView />
          <div className="mono mt-6 flex items-center justify-between border-t border-border pt-4 text-[10px] uppercase tracking-widest text-muted-foreground">
            <span>07 nodes</span>
            <span>lat 31.23 · lng 121.47</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Ticker() {
  const items = ["Sourcing", "Verification", "Negotiation", "Quality Control", "Private Label", "Product Dev", "Warehousing", "Logistics"];
  return (
    <section className="overflow-hidden border-y border-border py-5">
      <div className="marquee-track gap-14 pr-14">
        {[...items, ...items].map((t, i) => (
          <div key={i} className="mono flex items-center gap-4 text-xs uppercase tracking-widest text-muted-foreground">
            <span className="text-accent">◆</span> {t}
          </div>
        ))}
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="company" className="relative scroll-mt-24 py-24 lg:py-36">
      <div className="site-container grid gap-16 lg:grid-cols-2 lg:gap-24">
        <Reveal>
          <p className="tag">/ 01 Company</p>
          <h2 className="display-title mt-6" style={{ fontSize: "clamp(2rem, 4.5vw, 3.75rem)" }}>
            More than trading.<br />We build supply chains.
          </h2>
          <p className="mt-8 max-w-lg text-sm leading-7 text-muted-foreground">
            AURIA acts as an extension of your business in China — handling sourcing, supplier relationships, production follow-up, quality control and international logistics with one accountable point of contact.
          </p>
          <div className="mt-10 grid gap-3 sm:grid-cols-2">
            {["Local market intelligence", "Direct factory coordination", "Transparent execution", "Global delivery mindset"].map((v) => (
              <div key={v} className="flex items-center gap-3 border-t border-border pt-3 text-sm">
                <CheckCircle2 className="size-4 text-accent" /> {v}
              </div>
            ))}
          </div>
          <Link to="/about" className="mono mt-10 inline-flex items-center gap-2 border-b border-border pb-1 text-xs uppercase tracking-widest transition-colors hover:border-accent hover:text-accent">
            Read the manifesto <ArrowUpRight className="size-3.5" />
          </Link>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="grid gap-px bg-border">
            {[
              [Building2, "China Expertise", "Local knowledge and direct access to manufacturers."],
              [Handshake, "One Trusted Partner", "One point of contact throughout the sourcing process."],
              [ShieldCheck, "Quality First", "Quality control before products leave China."],
              [Container, "End-to-End Execution", "From supplier discovery to international delivery."],
            ].map(([Icon, title, copy], i) => (
              <div key={String(title)} className="bg-background p-6">
                <div className="mono mb-6 flex items-center justify-between text-[10px] uppercase tracking-widest text-muted-foreground">
                  <span>/ 0{i + 1}</span>
                  <Icon className="size-4 text-accent" />
                </div>
                <h3 className="text-base font-medium">{String(title)}</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{String(copy)}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Services() {
  return (
    <section id="services" className="scroll-mt-24 border-t border-border py-24 lg:py-36">
      <div className="site-container">
        <Reveal className="flex items-end justify-between gap-6">
          <div>
            <p className="tag">/ 02 Services</p>
            <h2 className="display-title mt-6" style={{ fontSize: "clamp(2rem, 4.5vw, 3.75rem)" }}>
              From factory to<br />final destination.
            </h2>
          </div>
          <Link to="/services" className="mono hidden items-center gap-2 border-b border-border pb-1 text-xs uppercase tracking-widest transition-colors hover:border-accent hover:text-accent md:inline-flex">
            All services <ArrowUpRight className="size-3.5" />
          </Link>
        </Reveal>
        <div className="mt-14">
          {services.map(([Icon, title, copy], i) => (
            <Reveal key={title} delay={(i % 4) * 0.05}>
              <div className="service-row">
                <span className="mono text-[11px] uppercase tracking-widest text-muted-foreground">/ 0{i + 1}</span>
                <div className="flex items-center gap-4">
                  <Icon className="size-4 text-accent" />
                  <h3 className="text-lg font-medium tracking-tight md:text-xl">{title}</h3>
                </div>
                <p className="hidden text-sm leading-6 text-muted-foreground md:block">{copy}</p>
                <ArrowRight className="service-row-arrow size-4" />
              </div>
            </Reveal>
          ))}
          <div className="border-t border-border" />
        </div>
      </div>
    </section>
  );
}

function Process() {
  return (
    <section id="process" className="scroll-mt-24 border-t border-border py-24 lg:py-36">
      <div className="site-container">
        <Reveal>
          <p className="tag">/ 03 Process</p>
          <h2 className="display-title mt-6" style={{ fontSize: "clamp(2rem, 4.5vw, 3.75rem)" }}>
            One clear path.
          </h2>
        </Reveal>
        <div className="mt-16 grid gap-10 md:grid-cols-5">
          {process.map(([num, title, copy], i) => (
            <Reveal key={num} delay={i * 0.06}>
              <div className="relative">
                <div className="mono text-3xl text-accent">{num}</div>
                <div className="mt-6 h-px w-8 bg-accent" />
                <h3 className="mt-6 text-base font-medium">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">{copy}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Sectors() {
  return (
    <section id="sectors" className="scroll-mt-24 overflow-hidden border-t border-border py-16">
      <div className="site-container mb-10">
        <Reveal>
          <p className="tag">/ 04 Sectors</p>
          <h2 className="mt-4 max-w-2xl text-2xl font-medium tracking-tight md:text-3xl">Cross-sector sourcing expertise.</h2>
        </Reveal>
      </div>
      <div className="marquee-track gap-4">
        {[...industries, ...industries].map((name, i) => (
          <div key={`${name}-${i}`} className="mono flex items-center gap-3 whitespace-nowrap border border-border bg-surface px-5 py-3 text-xs uppercase tracking-widest text-muted-foreground">
            <PackageCheck className="size-3.5 text-accent" /> {name}
          </div>
        ))}
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section className="border-t border-border py-24 lg:py-36">
      <div className="site-container">
        <Reveal className="flex flex-col items-start gap-10 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="tag">/ 05 Begin</p>
            <h2 className="display-title mt-6 max-w-3xl">
              Ready to move<br /><span className="text-accent">your next order?</span>
            </h2>
          </div>
          <Link
            to="/contact"
            className="mono group inline-flex items-center gap-4 border border-accent bg-accent px-8 py-5 text-xs font-medium uppercase tracking-widest text-accent-foreground transition-colors duration-300 hover:bg-transparent hover:text-accent"
          >
            Start a project <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}

function ContactSection() {
  return (
    <section className="border-t border-border py-24 lg:py-36" id="inquiry">
      <div className="site-container grid gap-16 lg:grid-cols-[0.7fr_1.3fr]">
        <Reveal>
          <p className="tag">/ 06 Contact</p>
          <h2 className="display-title mt-6" style={{ fontSize: "clamp(2rem, 4.5vw, 3.75rem)" }}>
            Tell us what<br />you need.
          </h2>
          <p className="mt-8 max-w-md text-sm leading-7 text-muted-foreground">
            Share your product, quantity and destination. We&apos;ll come back with a sourcing, manufacturing and logistics path.
          </p>
          <div className="mono mt-12 space-y-2 text-xs uppercase tracking-widest text-muted-foreground">
            <p><span className="text-accent">Ops·</span> China</p>
            <p><span className="text-accent">Time·</span> 24 / 7</p>
            <p><span className="text-accent">Ping·</span> hello@auria</p>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <form className="grid gap-6 sm:grid-cols-2" onSubmit={(e) => e.preventDefault()}>
            {[
              ["Full Name", "text", "Your name", false],
              ["Company", "text", "Company name", false],
              ["Business Email", "email", "name@company.com", false],
              ["Country", "text", "Country", false],
              ["What are you looking for?", "text", "Product or sourcing category", true],
              ["Estimated Order Volume", "text", "Quantity or budget", true],
            ].map(([label, type, placeholder, wide]) => (
              <label key={String(label)} className={`field-label ${wide ? "sm:col-span-2" : ""}`}>
                {label}
                <input
                  type={type as string}
                  placeholder={placeholder as string}
                  className="mt-1 border-b border-border-strong bg-transparent py-3 text-sm text-foreground placeholder:text-muted-foreground/60 focus:border-accent focus:outline-none"
                />
              </label>
            ))}
            <label className="field-label sm:col-span-2">
              Message
              <textarea
                rows={4}
                placeholder="Specifications, timeline and destination"
                className="mt-1 border border-border-strong bg-transparent p-4 text-sm text-foreground placeholder:text-muted-foreground/60 focus:border-accent focus:outline-none"
              />
            </label>
            <div className="sm:col-span-2">
              <button
                type="submit"
                className="mono group inline-flex items-center gap-4 border border-accent bg-accent px-6 py-4 text-xs font-medium uppercase tracking-widest text-accent-foreground transition-colors duration-300 hover:bg-transparent hover:text-accent"
              >
                Send inquiry <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </button>
            </div>
          </form>
        </Reveal>
      </div>
    </section>
  );
}

export function AuriaHome() {
  return (
    <SiteLayout>
      <Hero />
      <Ticker />
      <About />
      <Services />
      <Process />
      <Sectors />
      <CTASection />
      <ContactSection />
    </SiteLayout>
  );
}

export { services, process, industries, ContactSection, Reveal, Boxes };
