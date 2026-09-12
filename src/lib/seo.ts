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
    // Twitter
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:site", content: "@auria" },
    { name: "twitter:creator", content: "@auria" },
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
export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    alternateName: ["AURIA Trading", "AURIA Nexus", "AURIA Sourcing"],
    url: SITE_URL,
    logo: `${SITE_URL}/favicon.svg`,
    image: DEFAULT_OG_IMAGE,
    description:
      "AURIA is a global sourcing, trading and logistics company connecting international buyers with trusted Chinese manufacturers.",
    foundingDate: "2025",
    slogan: "Your Global Gateway to China",
    knowsLanguage: ["en", "fr", "ar", "zh", "es", "de", "ru", "pt", "it", "tr", "ja"],
    areaServed: "Worldwide",
    address: [
      { "@type": "PostalAddress", addressLocality: "Shanghai", addressCountry: "CN" },
      { "@type": "PostalAddress", addressLocality: "Shenzhen", addressCountry: "CN" },
      { "@type": "PostalAddress", addressLocality: "Guangzhou", addressCountry: "CN" },
      { "@type": "PostalAddress", addressLocality: "Yiwu", addressCountry: "CN" },
    ],
    sameAs: [
      "https://www.linkedin.com/company/auria",
      "https://twitter.com/auria",
      "https://www.instagram.com/auria",
    ],
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "sales",
        availableLanguage: ["English", "French", "Arabic", "Chinese", "Spanish"],
        areaServed: "Worldwide",
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
