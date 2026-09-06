import { createFileRoute } from "@tanstack/react-router";
import { AuriaHome } from "@/components/auria/AuriaHome";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [
    { title: "AURIA — Global Sourcing & Trading from China" },
    { name: "description", content: "AURIA connects global businesses with trusted Chinese manufacturers, sourcing, quality control and international logistics." },
    { property: "og:title", content: "AURIA — Your Global Gateway to China" },
    { property: "og:description", content: "End-to-end sourcing, manufacturing and logistics from China to the world." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ]}),
  component: AuriaHome,
});
