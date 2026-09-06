import { createFileRoute } from "@tanstack/react-router";
import { InteriorPage } from "@/components/auria/InteriorPage";

export const Route = createFileRoute("/how-we-work")({
  head: () => ({
    meta: [
      { title: "Process — AURIA" },
      { name: "description", content: "A transparent five-step workflow from brief to international delivery." },
    ],
  }),
  component: () => (
    <InteriorPage
      code="04"
      eyebrow="Process"
      title="Brief to"
      italicTitle="delivery."
      intro="A transparent five-step workflow keeps your sourcing operation connected, accountable and moving forward."
    />
  ),
});
