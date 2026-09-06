import { createFileRoute } from "@tanstack/react-router";
import { InteriorPage } from "@/components/auria/InteriorPage";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "Studio — AURIA" },
      { name: "description", content: "AURIA is your China-based operating partner for global sourcing, production and logistics." },
    ],
  }),
  component: () => (
    <InteriorPage
      code="01"
      eyebrow="Studio"
      title="Operating"
      italicTitle="from China."
      intro="AURIA works as an extension of your business — coordinating relationships, detail and execution needed to move confidently from product brief to global delivery."
    />
  ),
});
