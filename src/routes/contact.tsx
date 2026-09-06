import { createFileRoute } from "@tanstack/react-router";
import { motion } from "motion/react";
import { SiteLayout } from "@/components/auria/SiteShell";
import { ContactSection } from "@/components/auria/AuriaHome";

const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } } };
const item = { hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const } } };

function ContactPage() {
  return (
    <SiteLayout>
      <section className="relative overflow-hidden pt-28 pb-16 lg:pt-40 lg:pb-24">
        <div className="grid-bg absolute inset-0 opacity-60" aria-hidden />
        <div className="site-container relative">
          <motion.div initial="hidden" animate="show" variants={stagger} className="max-w-4xl">
            <motion.p variants={item} className="readout">
              <span className="dot" /> Contact · Ref /06
            </motion.p>
            <motion.h1 variants={item} className="display-title mt-8">
              Begin a<br /><span className="text-accent">conversation.</span>
            </motion.h1>
            <motion.p variants={item} className="mt-8 max-w-2xl text-base leading-7 text-muted-foreground">
              Share your product, quantity and destination. We&apos;ll come back with a sourcing, manufacturing and logistics path that fits.
            </motion.p>
          </motion.div>
        </div>
      </section>
      <ContactSection />
    </SiteLayout>
  );
}

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact AURIA — Start a Partnership" },
      { name: "description", content: "Tell AURIA what you need sourced, manufactured or shipped from China." },
      { property: "og:title", content: "Contact AURIA — Start a Partnership" },
      { property: "og:description", content: "Start a sourcing and trading conversation with AURIA." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ContactPage,
});
