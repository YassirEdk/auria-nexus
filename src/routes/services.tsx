import { createFileRoute } from "@tanstack/react-router";
import { InteriorPage } from "@/components/auria/InteriorPage";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Practice — AURIA" },
      { name: "description", content: "End-to-end sourcing, verification, quality control, private label and logistics from China." },
    ],
  }),
  component: () => (
    <InteriorPage
      code="02"
      eyebrow="Practice"
      title="Factory"
      italicTitle="to final destination."
      intro="A complete procurement operation designed around your product, quality standards, commercial objectives and destination market."
    />
  ),
});
