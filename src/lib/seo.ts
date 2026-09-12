// Central SEO helpers for AURIA. Change SITE_URL to your production domain.
export const SITE_URL = "https://www.auria-trading.com";
export const SITE_NAME = "AURIA";
export const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.jpg`;
export const LOCALES = ["en", "fr", "ar", "zh", "es", "de", "ru", "pt", "it", "tr", "ja"] as const;

// High-intent keywords in every language we can rank for. Search engines read
// these once and match user queries in any language against them.
export const GLOBAL_KEYWORDS = [
  // English
  "auria", "auria trading", "auria nexus", "auria china", "auria sourcing",
  "trading in china", "trading company china", "china trading company",
  "china product", "china products", "china sourcing agent", "sourcing agent china",
  "china logistics", "china freight forwarder", "shipping from china",
  "import from china", "buy from china", "china manufacturer", "china suppliers",
  "quality control china", "private label china", "oem china", "odm china",
  "consolidation china", "yiwu agent", "shenzhen sourcing", "guangzhou sourcing",
  "1688 sourcing", "alibaba sourcing agent", "canton fair sourcing",
  // French
  "commerce chine", "importer de chine", "acheter en chine", "fournisseur chine",
  "agent sourcing chine", "logistique chine", "fret chine", "transitaire chine",
  "produits chinois", "sourcing chine", "usine chine", "fabricant chine",
  // Arabic
  "تجارة الصين", "الاستيراد من الصين", "منتجات صينية", "وكيل شراء من الصين",
  "شحن من الصين", "لوجستيك الصين", "مورد من الصين", "مصنع في الصين", "أوريا",
  // Chinese (simplified)
  "中国采购", "中国贸易", "中国货代", "中国制造商", "从中国进口", "中国供应商",
  // Spanish
  "comercio china", "importar de china", "productos chinos", "agente de compras china",
  "logística china", "proveedor china", "fabricante china",
  // German
  "handel china", "import aus china", "china produkte", "einkaufsagent china",
  "china logistik", "china lieferant", "china hersteller",
  // Portuguese
  "comércio china", "importar da china", "produtos chineses", "agente de compras china",
  "logística china", "fornecedor china",
  // Italian
  "commercio cina", "importare dalla cina", "prodotti cinesi", "agente acquisti cina",
  "logistica cina", "fornitore cina",
  // Russian
  "торговля с китаем", "импорт из китая", "китайские товары",
  "закупочный агент китай", "логистика китай", "поставщик китай",
  // Turkish
  "çin ticaret", "çin'den ithalat", "çin ürünleri", "çin tedarikçi", "çin lojistik",
  // Japanese
  "中国貿易", "中国輸入", "中国製品", "中国仕入れ代行", "中国物流",
];

// Loose types so TanStack Start's stricter HTML attribute types accept them.
export type MetaTag = Record<string, string>;
export type LinkTag = Record<string, string>;

type BuildMetaInput = {
  path: string; // e.g. "/", "/about"
  title: string;
  description: string;
  keywords?: string[]; // extra page-specific keywords
  image?: string;
};

export function absoluteUrl(path: string): string {
  if (!path.startsWith("/")) path = `/${path}`;
  return `${SITE_URL}${path === "/" ? "" : path}`;
}

export function buildMeta({ path, title, description, keywords = [], image }: BuildMetaInput): MetaTag[] {
  const url = absoluteUrl(path);
  const ogImage = image ?? DEFAULT_OG_IMAGE;
  const allKeywords = Array.from(new Set([...keywords, ...GLOBAL_KEYWORDS])).join(", ");
  return [
    { title },
    { name: "description", content: description },
    { name: "keywords", content: allKeywords },
    { name: "author", content: SITE_NAME },
    { name: "robots", content: "index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1" },
    { name: "googlebot", content: "index,follow,max-image-preview:large,max-snippet:-1" },
    { name: "bingbot", content: "index,follow" },
    { name: "theme-color", content: "#0a0a0a" },
    { name: "format-detection", content: "telephone=no" },
    { name: "application-name", content: SITE_NAME },
    { name: "apple-mobile-web-app-title", content: SITE_NAME },
    { name: "apple-mobile-web-app-capable", content: "yes" },
    { name: "apple-mobile-web-app-status-bar-style", content: "black-translucent" },
    // Open Graph
    { property: "og:site_name", content: SITE_NAME },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:type", content: "website" },
    { property: "og:url", content: url },
    { property: "og:image", content: ogImage },
    { property: "og:image:width", content: "1200" },
    { property: "og:image:height", content: "630" },
    { property: "og:image:alt", content: title },
    { property: "og:locale", content: "en_US" },
    { property: "og:locale:alternate", content: "fr_FR" },
    { property: "og:locale:alternate", content: "ar_AE" },
    { property: "og:locale:alternate", content: "zh_CN" },
    { property: "og:locale:alternate", content: "es_ES" },
    { property: "og:locale:alternate", content: "de_DE" },
    // Twitter (twitter:site/twitter:creator omitted until a verified @handle exists)
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: description },
    { name: "twitter:image", content: ogImage },
    { name: "twitter:image:alt", content: title },
    // Extra business signals
    { name: "geo.region", content: "CN-31" },
    { name: "geo.placename", content: "Shanghai, Shenzhen, Guangzhou, Yiwu" },
    { name: "geo.position", content: "31.2304;121.4737" },
    { name: "ICBM", content: "31.2304, 121.4737" },
  ];
}

export function buildLinks(path: string): LinkTag[] {
  const canonical = absoluteUrl(path);
  // NOTE: hreflang alternates are intentionally NOT emitted until each locale
  // has its own real URL that serves localized HTML. Fake alternates that
  // return the same content are treated by Google as duplicate content and
  // hurt rankings. Multilingual keywords in the meta + JSON-LD still let the
  // site rank across languages.
  return [{ rel: "canonical", href: canonical }];
}

// JSON-LD structured data
// NOTE: `sameAs` is the single strongest entity-disambiguation signal for
// Google Knowledge Graph and LLM entity resolution (ChatGPT, Perplexity,
// Google AI Overview). Every URL here must be a real, live profile that
// mentions "AURIA" / "Auria Trading" back — a fake profile hurts more than
// it helps. Priority order to create if missing:
//   1. LinkedIn Company Page (highest impact)
//   2. Crunchbase organization page
//   3. Wikidata entry (free at wikidata.org — LLMs read this heavily)
//   4. Google Business Profile
//   5. Alibaba / Made-in-China supplier page
//   6. GitHub org with README that links back here
export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": ["Organization", "Corporation"],
    "@id": `${SITE_URL}/#organization`,
    name: SITE_NAME,
    legalName: "AURIA Trading",
    alternateName: ["AURIA Trading", "Auria Trading", "AURIA Nexus", "AURIA Sourcing", "AURIA China"],
    url: SITE_URL,
    logo: {
      "@type": "ImageObject",
      url: `${SITE_URL}/android-chrome-512x512.png`,
      width: 512,
      height: 512,
    },
    image: DEFAULT_OG_IMAGE,
    description:
      "AURIA (Auria Trading) is a global sourcing, trading and logistics company headquartered in China. AURIA sources products from Chinese factories, verifies suppliers, handles quality control, private label, OEM/ODM and end-to-end international shipping for buyers worldwide.",
    disambiguatingDescription:
      "AURIA is a China-based B2B sourcing and trading company (auria-trading.com), distinct from other similarly-named brands. AURIA specializes in China sourcing, factory verification, quality control and international logistics.",
    foundingDate: "2025",
    slogan: "Your Global Gateway to China",
    knowsAbout: [
      "China sourcing",
      "China trading",
      "Factory verification",
      "Quality control",
      "Private label manufacturing",
      "OEM/ODM",
      "International logistics",
      "Freight forwarding from China",
      "Import from China",
      "Alibaba sourcing",
      "1688 sourcing",
      "Canton Fair",
    ],
    knowsLanguage: ["en", "fr", "ar", "zh", "es", "de", "ru", "pt", "it", "tr", "ja"],
    areaServed: "Worldwide",
    address: [
      { "@type": "PostalAddress", addressLocality: "Shanghai", addressCountry: "CN" },
      { "@type": "PostalAddress", addressLocality: "Shenzhen", addressCountry: "CN" },
      { "@type": "PostalAddress", addressLocality: "Guangzhou", addressCountry: "CN" },
      { "@type": "PostalAddress", addressLocality: "Yiwu", addressCountry: "CN" },
    ],
    // sameAs intentionally omitted until real, verified profiles exist.
    // Fake or unverified profile URLs actively hurt SEO. Add each one here
    // ONLY once the profile is live and links back to auria-trading.com.
    // Priority: LinkedIn Company Page → Crunchbase → Wikidata → Google Business.
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "sales",
        availableLanguage: ["English", "French", "Arabic", "Chinese", "Spanish"],
        areaServed: "Worldwide",
        url: SITE_URL,
      },
      {
        "@type": "ContactPoint",
        contactType: "customer support",
        availableLanguage: ["English", "French", "Arabic", "Chinese"],
        areaServed: "Worldwide",
        url: SITE_URL,
      },
    ],
  };
}

// FAQ schema helps Google and AI Overview pull direct answers when someone
// searches "What is Auria Trading?". Place the questions users actually ask
// about your brand identity here.
export function brandFaqJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What is AURIA (Auria Trading)?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "AURIA, also known as Auria Trading, is a global sourcing, trading and logistics company based in China. AURIA connects international buyers with verified Chinese manufacturers and manages sourcing, quality control, private label, OEM/ODM and international shipping.",
        },
      },
      {
        "@type": "Question",
        name: "Where is AURIA located?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "AURIA operates from Shanghai, Shenzhen, Guangzhou and Yiwu in China, serving buyers worldwide.",
        },
      },
      {
        "@type": "Question",
        name: "What services does Auria Trading offer?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Auria Trading offers China product sourcing, factory verification, quality control, private label and OEM/ODM manufacturing, cargo consolidation, and international freight forwarding.",
        },
      },
      {
        "@type": "Question",
        name: "How is AURIA different from other 'Auria' brands?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "AURIA (auria-trading.com) is a China-focused B2B sourcing and trading company. It is unrelated to other companies or platforms that share the name 'Auria'.",
        },
      },
    ],
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    inLanguage: ["en", "fr", "ar", "zh", "es", "de"],
    potentialAction: {
      "@type": "SearchAction",
      target: `${SITE_URL}/?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
}

export function serviceJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "China Sourcing, Trading and Logistics",
    provider: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
    areaServed: "Worldwide",
    description:
      "End-to-end sourcing, verification, quality control, private label, consolidation and international logistics from China.",
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
    },
  };
}

export function breadcrumbJsonLd(items: Array<{ name: string; path: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

// Serialize a JSON-LD object into a script tag for TanStack Start head().scripts.
export function jsonLdScript(data: unknown) {
  return {
    type: "application/ld+json",
    children: JSON.stringify(data),
  };
}
