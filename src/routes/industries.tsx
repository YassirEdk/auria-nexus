import { createFileRoute } from "@tanstack/react-router";
import { InteriorPage } from "@/components/auria/InteriorPage";

export const Route = createFileRoute("/industries")({
  head: () => ({
    meta: [
      { title: "Sectors — AURIA" },
      { name: "description", content: "Cross-sector sourcing expertise: automotive, electronics, fashion, furniture, beauty, industry and retail." },
    ],
  }),
  component: () => (
    <InteriorPage
      code="03"
      eyebrow="Sectors"
      title="Cross-sector"
      italicTitle="sourcing expertise."
      intro="Our model adapts to different product specifications, production requirements and commercial realities across a broad range of industries."
    />
  ),
});
