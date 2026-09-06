import { lazy, Suspense, useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { motion, MotionConfig, useReducedMotion } from "motion/react";
import {
  ArrowDown, ArrowRight, ArrowUpRight, BadgeCheck, Boxes, Building2, CheckCircle2,
  Container, Factory, Globe2, Handshake, PackageCheck, Search, ShieldCheck, Ship,
  Sparkles, Tags, Warehouse,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { SiteLayout } from "./SiteShell";
import manufacturingImage from "@/assets/auria-manufacturing.jpg";

const TradeGlobe = lazy(() => import("./TradeGlobe"));

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

const industries = ["Automotive", "Consumer Electronics", "Fashion & Textiles", "Home & Furniture", "Beauty & Cosmetics", "Industrial Equipment", "Construction", "Packaging", "Retail & E-commerce", "Hospitality"];

function Reveal({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  return <motion.div className={className} initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}>{children}</motion.div>;
}

function GlobeStage({ compact = false }: { compact?: boolean }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return (
    <div className={`relative ${compact ? "h-[480px]" : "h-[58vh] min-h-[430px] lg:h-[760px]"}`} aria-label="Animated globe showing trade routes from China to global markets">
      <div className="absolute inset-[12%] rounded-full bg-globe-glow blur-3xl" />
      {mounted ? <Suspense fallback={<div className="globe-fallback" />}><TradeGlobe /></Suspense> : <div className="globe-fallback" />}
      <div className="pointer-events-none absolute inset-x-0 bottom-6 flex justify-center"><span className="route-label"><span className="status-dot" /> China hub · Global routes</span></div>
    </div>
  );
}

function Hero() {
  return (
    <section className="relative min-h-[900px] overflow-hidden bg-ink pt-28 text-ink-foreground lg:min-h-screen">
      <div className="hero-grid absolute inset-0 opacity-40" />
      <div className="site-container relative grid min-h-[calc(100vh-7rem)] items-center lg:grid-cols-[0.92fr_1.08fr]">
        <motion.div initial="hidden" animate="show" variants={{ hidden: {}, show: { transition: { staggerChildren: 0.11 } } }} className="relative z-10 py-16 lg:py-0">
          <motion.p variants={{ hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } }} className="eyebrow">China-based · Globally connected</motion.p>
          <motion.h1 variants={{ hidden: { opacity: 0, y: 22 }, show: { opacity: 1, y: 0 } }} className="mt-7 max-w-3xl font-display text-6xl font-medium leading-[0.96] sm:text-7xl lg:text-[clamp(5rem,7.4vw,8rem)]">Your Global Gateway <span className="text-brand">to China.</span></motion.h1>
          <motion.p variants={{ hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0 } }} className="mt-8 max-w-xl text-base leading-7 text-ink-muted sm:text-lg">AURIA connects businesses worldwide with trusted manufacturers, seamless sourcing and end-to-end trading solutions from China.</motion.p>
          <motion.div variants={{ hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0 } }} className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Button asChild variant="auria" size="lg"><Link to="/contact">Start a Partnership <ArrowUpRight /></Link></Button>
            <Button asChild variant="auriaOutline" size="lg"><Link to="/services">Explore Our Services <ArrowRight /></Link></Button>
          </motion.div>
        </motion.div>
        <div className="relative -mt-16 lg:mt-0 lg:-mr-28"><GlobeStage /></div>
      </div>
      <div className="pointer-events-none absolute bottom-8 left-1/2 hidden -translate-x-1/2 items-center gap-3 text-[10px] uppercase text-ink-muted md:flex"><ArrowDown className="size-3 animate-pulse" /> Explore the network</div>
    </section>
  );
}

function Stats() {
  return <section className="border-y border-border bg-ink text-ink-foreground"><div className="site-container grid grid-cols-2 md:grid-cols-4">{[["Global Reach","Worldwide"],["Sourcing","China"],["Service","End-to-End"],["Quality","Verified"]].map(([label,value], i) => <Reveal key={label} delay={i*.08} className="border-border px-4 py-8 first:pl-0 md:border-r md:py-12 md:last:border-r-0"><p className="eyebrow">{label}</p><p className="mt-3 text-xl font-medium sm:text-2xl">{value}</p></Reveal>)}</div></section>;
}

function About() {
  return <section className="section-space bg-background"><div className="site-container grid items-center gap-14 lg:grid-cols-2 lg:gap-24">
    <Reveal className="relative min-h-[480px] overflow-hidden bg-ink p-8 text-ink-foreground lg:min-h-[650px]"><div className="hero-grid absolute inset-0 opacity-50"/><div className="relative flex h-full min-h-[416px] flex-col justify-between lg:min-h-[586px]"><div className="flex justify-between"><span className="eyebrow">CN / GLOBAL</span><Globe2 className="text-brand" /></div><div className="relative mx-auto my-12 grid size-56 place-items-center rounded-full border border-brand/30 sm:size-72"><div className="absolute inset-7 rounded-full border border-ink-muted/25"/><div className="absolute inset-16 rounded-full border border-brand/40"/><Factory className="size-14 text-brand"/><span className="absolute -right-4 top-1/2 route-label">Global markets</span><span className="absolute -left-5 bottom-10 route-label">Manufacturing</span></div><p className="max-w-xs text-sm leading-6 text-ink-muted">A direct operating bridge between Chinese production capability and global business ambition.</p></div></Reveal>
    <Reveal><p className="eyebrow text-accent-foreground">Based in China · Connected to the world</p><h2 className="section-title mt-6">More Than Trading. We Build Global Supply Chains.</h2><p className="body-copy mt-8">AURIA acts as an extension of your business in China—handling sourcing, supplier relationships, production follow-up, quality control and international logistics with one accountable point of contact.</p><div className="mt-10 grid gap-4 sm:grid-cols-2">{["Local market intelligence","Direct factory coordination","Transparent execution","Global delivery mindset"].map(item => <div key={item} className="flex items-center gap-3 border-t border-border pt-4 text-sm font-medium"><CheckCircle2 className="size-4 text-accent-foreground" />{item}</div>)}</div><Button asChild variant="auriaOutline" size="lg" className="mt-10"><Link to="/about">Discover AURIA <ArrowRight /></Link></Button></Reveal>
  </div></section>;
}

function Services() {
  return <section className="section-space bg-surface"><div className="site-container"><Reveal className="max-w-3xl"><p className="eyebrow text-accent-foreground">Integrated capability</p><h2 className="section-title mt-5">From Factory to Final Destination.</h2></Reveal><div className="mt-14 grid gap-px bg-border sm:grid-cols-2 lg:grid-cols-4">{services.map(([Icon,title,copy],i) => <Reveal key={title} delay={(i%4)*.06} className="service-card group"><div className="flex items-start justify-between"><Icon className="size-6 text-accent-foreground transition-transform duration-300 group-hover:-translate-y-1"/><span className="text-xs text-muted-foreground">0{i+1}</span></div><h3 className="mt-16 text-xl font-semibold">{title}</h3><p className="mt-4 text-sm leading-6 text-muted-foreground">{copy}</p></Reveal>)}</div></div></section>;
}

function Process() {
  return <section className="section-space bg-background"><div className="site-container"><Reveal className="flex flex-col justify-between gap-5 md:flex-row md:items-end"><div><p className="eyebrow text-accent-foreground">How it works</p><h2 className="section-title mt-5">One clear path from brief to delivery.</h2></div><p className="body-copy max-w-md">A connected operating process gives you visibility and control at every stage.</p></Reveal><div className="relative mt-16 grid gap-8 lg:grid-cols-5"><div className="process-line hidden lg:block"/>{process.map(([num,title,copy],i)=><Reveal key={num} delay={i*.08} className="relative"><div className="process-node">{num}</div><h3 className="mt-7 text-lg font-semibold">{title}</h3><p className="mt-3 text-sm leading-6 text-muted-foreground">{copy}</p></Reveal>)}</div></div></section>;
}

function GlobalNetwork() {
  return <section className="overflow-hidden bg-ink text-ink-foreground"><div className="site-container grid items-center gap-8 py-20 lg:grid-cols-[0.82fr_1.18fr] lg:py-28"><Reveal><p className="eyebrow">International reach</p><h2 className="section-title mt-6">China Is Our Base. The World Is Our Market.</h2><p className="mt-7 max-w-lg text-base leading-7 text-ink-muted">Our network connects Chinese production partners with clients and destinations across Europe, Africa, the Middle East, the Americas and Asia-Pacific.</p><div className="mt-10 flex flex-wrap gap-2">{["Sourcing","Manufacturing","Quality","Logistics","Global Trade"].map(x=><span className="route-label" key={x}>{x}</span>)}</div></Reveal><Reveal><GlobeStage compact /></Reveal></div></section>;
}

function Industries() {
  return <section className="overflow-hidden border-b border-border bg-background py-20"><div className="site-container"><Reveal><p className="eyebrow text-accent-foreground">Industries we serve</p><h2 className="mt-5 max-w-2xl font-display text-4xl font-medium sm:text-5xl">Cross-sector sourcing expertise.</h2></Reveal></div><div className="industry-track mt-14 flex w-max gap-4">{[...industries,...industries].map((name,i)=><div key={`${name}-${i}`} className="industry-pill"><PackageCheck className="size-5 text-accent-foreground"/><span>{name}</span></div>)}</div></section>;
}

function WhyAuria() {
  const items = [[Building2,"China Expertise","Local knowledge and direct access to manufacturers."],[Handshake,"One Trusted Partner","One point of contact throughout the sourcing process."],[ShieldCheck,"Quality First","Quality control before products leave China."],[Container,"End-to-End Execution","From supplier discovery to international delivery."]] as const;
  return <section className="section-space bg-background"><div className="site-container"><Reveal><p className="eyebrow text-accent-foreground">The AURIA advantage</p><h2 className="section-title mt-5">Why Businesses Choose AURIA</h2></Reveal><div className="mt-14 grid gap-5 md:grid-cols-2">{items.map(([Icon,title,copy],i)=><Reveal key={title} delay={i*.07} className="advantage-row group"><div className="grid size-12 shrink-0 place-items-center border border-brand/40 bg-brand/5"><Icon className="size-5 text-accent-foreground transition-transform duration-300 group-hover:scale-110"/></div><div><h3 className="text-xl font-semibold">{title}</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">{copy}</p></div></Reveal>)}</div></div></section>;
}

function Cinematic() {
  return <section className="relative min-h-[72vh] overflow-hidden bg-ink text-ink-foreground"><motion.img initial={{scale:1.08}} whileInView={{scale:1}} viewport={{once:true}} transition={{duration:1.2}} src={manufacturingImage} alt="Advanced manufacturing equipment connected to an international container terminal" loading="lazy" width={1920} height={1088} className="absolute inset-0 h-full w-full object-cover"/><div className="cinematic-overlay absolute inset-0"/><div className="hero-grid absolute inset-0 opacity-20"/><div className="site-container relative flex min-h-[72vh] items-end py-20"><Reveal className="max-w-4xl"><p className="eyebrow">Manufacturing · Logistics · Technology</p><h2 className="mt-6 font-display text-5xl font-medium leading-none sm:text-7xl lg:text-8xl">Built in China.<br/><span className="text-brand">Delivered to the World.</span></h2></Reveal></div></section>;
}

function ContactSection() {
  return <section className="section-space bg-surface" id="inquiry"><div className="site-container grid gap-16 lg:grid-cols-[0.72fr_1.28fr]"><Reveal><p className="eyebrow text-accent-foreground">Begin a conversation</p><h2 className="section-title mt-5">Let&apos;s Build Your Next Supply Chain.</h2><p className="body-copy mt-7">Tell us what you&apos;re looking for. We&apos;ll help you source, manufacture and move it from China to wherever your business needs it.</p><div className="mt-12 border-t border-border pt-8"><p className="font-display text-2xl font-semibold tracking-[0.18em]">AURIA</p><p className="mt-2 text-sm text-muted-foreground">International Trading & Sourcing</p><p className="mt-1 text-sm text-muted-foreground">China · Global Operations</p></div></Reveal><Reveal><form className="grid gap-5 sm:grid-cols-2" onSubmit={(event)=>event.preventDefault()}><label className="field-label">Full Name<Input required placeholder="Your name" /></label><label className="field-label">Company<Input required placeholder="Company name" /></label><label className="field-label">Business Email<Input required type="email" placeholder="name@company.com" /></label><label className="field-label">Country<Input required placeholder="Country" /></label><label className="field-label sm:col-span-2">What are you looking for?<Input required placeholder="Product or sourcing category" /></label><label className="field-label sm:col-span-2">Estimated Order Volume<Input placeholder="Estimated quantity or budget range" /></label><label className="field-label sm:col-span-2">Message<Textarea required rows={5} placeholder="Specifications, timeline and destination" /></label><div className="sm:col-span-2"><Button variant="auria" size="lg" type="submit">Send Inquiry <ArrowUpRight /></Button></div></form></Reveal></div></section>;
}

export function AuriaHome() {
  const reduce = useReducedMotion();
  return <MotionConfig reducedMotion={reduce ? "always" : "user"}><SiteLayout><Hero/><Stats/><About/><Services/><Process/><GlobalNetwork/><Industries/><WhyAuria/><Cinematic/><ContactSection/></SiteLayout></MotionConfig>;
}

export { services, process, industries, GlobeStage, ContactSection, Reveal };