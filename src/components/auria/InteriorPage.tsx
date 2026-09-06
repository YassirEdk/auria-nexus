import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { motion } from "motion/react";
import { SiteLayout } from "./SiteShell";

export function InteriorPage({
  code = "00",
  eyebrow,
  title,
  italicTitle,
  intro,
}: {
  code?: string;
  eyebrow: string;
  title: string;
  italicTitle?: string;
  intro: string;
}) {
  return (
    <SiteLayout>
      <section className="relative flex min-h-[80vh] items-center overflow-hidden bg-black px-6 pt-40 pb-24">
        <div className="noir-vignette absolute inset-0 opacity-70" aria-hidden />
        <div className="site-container relative">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="eyebrow"
          >
            <span>/ {code}</span> <span className="opacity-40">{eyebrow}</span>
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="display mt-10 max-w-6xl font-black uppercase leading-[0.88] tracking-[-0.03em]"
            style={{ fontSize: "clamp(2.75rem, 9vw, 10rem)" }}
          >
            {title}
            {italicTitle && (
              <>
                <br />
                <span className="italic font-thin text-white/60">{italicTitle}</span>
              </>
            )}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="mt-12 max-w-2xl text-lg leading-8 text-white/70 md:text-xl"
          >
            {intro}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="mt-14 flex items-center gap-4"
          >
            <Link to="/contact" className="slab-btn text-white">
              Start a project <ArrowUpRight className="size-4" />
            </Link>
            <Link to="/" className="circle-btn text-white">
              <ArrowUpRight className="size-4 -rotate-90" />
            </Link>
          </motion.div>
        </div>
      </section>
    </SiteLayout>
  );
}
