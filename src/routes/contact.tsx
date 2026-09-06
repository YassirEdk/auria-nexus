import { createFileRoute } from "@tanstack/react-router";
import { motion } from "motion/react";
import { SiteLayout } from "@/components/auria/SiteShell";
import { ContactSection } from "@/components/auria/AuriaHome";

function ContactPage() {
  return (
    <SiteLayout>
      <section className="relative overflow-hidden bg-black px-6 pt-40 pb-24">
        <div className="noir-vignette absolute inset-0 opacity-70" aria-hidden />
        <div className="site-container relative">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="eyebrow"
          >
            <span>/ 06</span> <span className="opacity-40">Contact</span>
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="display mt-10 max-w-6xl font-black uppercase leading-[0.88] tracking-[-0.03em]"
            style={{ fontSize: "clamp(2.75rem, 9vw, 10rem)" }}
          >
            Begin a<br />
            <span className="italic font-thin text-white/60">conversation.</span>
          </motion.h1>
        </div>
      </section>
      <ContactSection />
    </SiteLayout>
  );
}

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact AURIA — Start a Project" },
      { name: "description", content: "Tell AURIA what you need sourced, manufactured or shipped from China." },
    ],
  }),
  component: ContactPage,
});
