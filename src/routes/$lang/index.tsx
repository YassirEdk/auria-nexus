import { createFileRoute } from "@tanstack/react-router";
import { AuriaHome } from "@/components/auria/AuriaHome";
import {
  buildMeta,
  buildLinks,
  breadcrumbJsonLd,
  jsonLdScript,
  webPageJsonLd,
  KEYWORDS_HOME,
} from "@/lib/seo";
import { DEFAULT_LOCALE, isLocale } from "@/lib/locale";

const TITLE = "AURIA — Global Sourcing, Trading & Logistics from China";
const DESCRIPTION =
  "AURIA is a global trading company in China. We source China products, verify factories, handle quality control, private label and international logistics from Shanghai, Shenzhen, Guangzhou and Yiwu.";

export const Route = createFileRoute("/$lang/")({
  head: (ctx) => {
    const p = ctx.params as { lang?: string } | undefined;
    const locale = isLocale(p?.lang) ? p.lang : DEFAULT_LOCALE;
    return {
      meta: buildMeta({
        path: "/",
        locale,
        title: TITLE,
        description: DESCRIPTION,
        keywords: KEYWORDS_HOME,
      }),
      links: buildLinks("/", locale),
      scripts: [
        jsonLdScript(breadcrumbJsonLd([{ name: "Home", path: "/" }], locale)),
        jsonLdScript(
          webPageJsonLd({
            path: "/",
            title: TITLE,
            description: DESCRIPTION,
            keywords: KEYWORDS_HOME,
            locale,
          }),
        ),
      ],
    };
  },
  component: AuriaHome,
});
