import { createFileRoute } from "@tanstack/react-router";
import { AuriaHome } from "@/components/auria/AuriaHome";
import { buildMeta, buildLinks, breadcrumbJsonLd, jsonLdScript } from "@/lib/seo";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: buildMeta({
      path: "/",
      title: "AURIA — Global Sourcing, Trading & Logistics from China",
      description:
        "AURIA is a global trading company in China. We source China products, verify factories, handle quality control, private label and international logistics from Shanghai, Shenzhen, Guangzhou and Yiwu.",
      keywords: [
        "auria",
        "auria trading",
        "trading in china",
        "china products",
        "china logistics",
        "sourcing china",
        "import from china",
        "china trading company",
      ],
    }),
    links: buildLinks("/"),
    scripts: [
      jsonLdScript(
        breadcrumbJsonLd([{ name: "Home", path: "/" }])
      ),
    ],
  }),
  component: AuriaHome,
});
