// Central SEO helpers for AURIA. Change SITE_URL to your production domain.
import { LOCALES as ROUTABLE_LOCALES, OG_LOCALE, DEFAULT_LOCALE, type Locale } from "./locale";

export const SITE_URL = "https://www.auria-trading.com";
export const SITE_NAME = "AURIA";
export const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.png`;
// Superset of language codes used only for the multilingual keyword list
// below. The routable set (locales the site actually serves under /$lang) is
// imported from lib/locale.ts.
export const LOCALES = ["en", "fr", "ar", "zh", "es", "de", "ru", "pt", "it", "tr", "ja"] as const;

// High-intent keywords in every language we can rank for. Search engines read
// these once and match user queries in any language against them.
export const GLOBAL_KEYWORDS = [
  // ---------- Brand (English) ----------
  "auria", "auria trading", "auria nexus", "auria china", "auria sourcing",
  "auria logistics", "auria group", "auria company", "auria trading company",
  "auria trading china", "auria-trading", "auria-trading.com", "auria b2b",
  "auria import export", "auria sourcing agent", "auria china sourcing",
  "auria supply chain", "auria shipping", "auria freight", "auria wholesale",
  // ---------- Core services (English) ----------
  "trading in china", "trading company china", "china trading company",
  "china product", "china products", "china sourcing agent", "sourcing agent china",
  "china sourcing company", "china sourcing service", "china buying agent",
  "buying agent china", "china procurement", "procurement services china",
  "china purchasing agent", "china logistics", "china logistics company",
  "china freight forwarder", "freight forwarder china", "shipping from china",
  "sea freight from china", "air freight from china", "rail freight china europe",
  "ddp shipping from china", "fob china", "cif china", "lcl shipping china",
  "fcl shipping china", "container shipping china", "door to door china",
  "amazon fba shipping china", "fba prep china", "amazon fba sourcing china",
  "dropshipping agent china", "china dropshipping", "china dropshipping supplier",
  "import from china", "how to import from china", "buy from china",
  "buying products from china", "china manufacturer", "china manufacturers",
  "china suppliers", "china supplier verification", "china factory audit",
  "factory inspection china", "quality inspection china", "third party inspection china",
  "quality control china", "qc china", "china qc service", "pre shipment inspection china",
  "private label china", "white label china", "oem china", "odm china",
  "oem manufacturing china", "custom products china", "custom packaging china",
  "product development china", "prototype china", "mold making china",
  "injection molding china", "sample sourcing china", "consolidation china",
  "cargo consolidation china", "warehouse china", "fulfillment china",
  "3pl china", "china fulfillment center",
  // ---------- Cities / hubs ----------
  "yiwu agent", "yiwu sourcing agent", "yiwu market agent", "yiwu wholesale market",
  "shenzhen sourcing", "shenzhen sourcing agent", "shenzhen electronics sourcing",
  "guangzhou sourcing", "guangzhou sourcing agent", "guangzhou wholesale",
  "shanghai sourcing", "shanghai trading company", "ningbo sourcing", "ningbo shipping",
  "dongguan sourcing", "hangzhou sourcing", "foshan sourcing", "chaozhou sourcing",
  "xiamen sourcing", "qingdao sourcing", "tianjin shipping", "hong kong sourcing",
  // ---------- Marketplaces / events ----------
  "1688 sourcing", "1688 agent", "1688 buying agent", "1688 to amazon",
  "alibaba sourcing agent", "alibaba agent", "alibaba verification",
  "made in china sourcing", "taobao agent", "taobao sourcing agent",
  "canton fair sourcing", "canton fair agent", "canton fair guide",
  "yiwu fair agent", "china import expo",
  // ---------- Product niches ----------
  "china electronics sourcing", "china apparel sourcing", "china textile sourcing",
  "china furniture sourcing", "china home goods sourcing", "china toys sourcing",
  "china cosmetics sourcing", "china beauty products sourcing",
  "china machinery sourcing", "china auto parts sourcing", "china led lighting sourcing",
  "china solar panels sourcing", "china packaging sourcing", "china stationery sourcing",
  "china kitchenware sourcing", "china jewelry sourcing", "china bags sourcing",
  "china shoes sourcing", "china sports equipment sourcing", "china pet products sourcing",
  "china baby products sourcing", "china medical supplies sourcing",
  "china ppe sourcing", "china hardware sourcing", "china tools sourcing",
  "china consumer electronics", "china smart devices sourcing",
  // ---------- Buyer intent ----------
  "best china sourcing agent", "trusted china sourcing agent", "top china sourcing companies",
  "reliable china supplier", "how to find china supplier", "verify china supplier",
  "china supplier scam protection", "china sourcing service near me",
  "one stop sourcing china", "end to end sourcing china", "b2b sourcing china",
  "wholesale from china", "bulk buy china", "small moq china", "low moq china supplier",
  // ---------- French ----------
  "commerce chine", "importer de chine", "acheter en chine", "fournisseur chine",
  "fournisseurs chinois", "grossiste chine", "agent sourcing chine",
  "agent d'achat chine", "agent commercial chine", "sourcing agent chine",
  "logistique chine", "transport chine", "fret chine", "fret maritime chine",
  "fret aérien chine", "transitaire chine", "expédition depuis la chine",
  "livraison depuis la chine", "produits chinois", "produit chinois",
  "sourcing chine", "sourcing produits chine", "usine chine", "usines chine",
  "fabricant chine", "fabricants chinois", "contrôle qualité chine",
  "inspection qualité chine", "audit usine chine", "marque blanche chine",
  "oem chine", "odm chine", "importation chine france", "importer de chine au maroc",
  "importer de chine algerie", "importer de chine tunisie", "importer de chine belgique",
  "importer de chine canada", "acheter sur alibaba", "acheter sur 1688",
  "agent yiwu", "agent shenzhen", "agent guangzhou", "canton fair",
  "dropshipping chine", "amazon fba chine",
  // ---------- Arabic ----------
  "تجارة الصين", "التجارة مع الصين", "الاستيراد من الصين", "كيفية الاستيراد من الصين",
  "منتجات صينية", "منتجات من الصين", "بضائع صينية", "وكيل شراء من الصين",
  "وكيل استيراد من الصين", "وكيل تجاري في الصين", "وسيط تجاري الصين",
  "شحن من الصين", "شحن بحري من الصين", "شحن جوي من الصين", "شحن بري من الصين",
  "لوجستيك الصين", "شركة شحن من الصين", "مورد من الصين", "موردين من الصين",
  "مصنع في الصين", "مصانع الصين", "فحص جودة الصين", "تدقيق مصنع الصين",
  "علامة تجارية خاصة الصين", "تصنيع خاص الصين", "استيراد الجملة من الصين",
  "أوريا", "أوريا تريدنغ", "أوريا الصين", "معرض كانتون", "علي بابا وكيل",
  "1688 وكيل", "ييوو وكيل", "شنتشن استيراد", "قوانغتشو استيراد",
  "استيراد من الصين للمغرب", "استيراد من الصين للجزائر", "استيراد من الصين للسعودية",
  "استيراد من الصين للإمارات", "استيراد من الصين لمصر", "استيراد من الصين للعراق",
  "دروبشيبينغ الصين", "أمازون fba الصين",
  // ---------- Chinese (Simplified) ----------
  "中国采购", "中国采购代理", "中国采购公司", "中国贸易", "中国贸易公司",
  "中国货代", "中国货运代理", "中国物流", "中国物流公司", "中国供应链",
  "中国制造商", "中国供应商", "中国工厂", "中国工厂验厂", "验货中国",
  "质量控制中国", "从中国进口", "中国进口代理", "义乌代理", "深圳采购代理",
  "广州采购代理", "上海贸易", "1688代购", "阿里巴巴代购", "淘宝代购",
  "广交会代理", "亚马逊fba中国", "中国代发货", "贴牌中国", "oem中国", "odm中国",
  // ---------- Chinese (Traditional) ----------
  "中國採購", "中國貿易", "中國供應商", "中國製造商", "中國物流", "從中國進口",
  // ---------- Spanish ----------
  "comercio china", "comercio con china", "importar de china", "importar desde china",
  "productos chinos", "productos de china", "agente de compras china",
  "agente de sourcing china", "agente comercial china", "logística china",
  "logística desde china", "envío desde china", "flete desde china",
  "proveedor china", "proveedores chinos", "fabricante china", "fabricantes chinos",
  "control de calidad china", "inspección china", "marca blanca china",
  "oem china", "odm china", "comprar en alibaba", "comprar en 1688",
  "agente yiwu", "agente shenzhen", "importar de china a españa",
  "importar de china a mexico", "importar de china a argentina",
  "importar de china a colombia", "importar de china a chile", "importar de china a peru",
  "dropshipping china", "amazon fba china",
  // ---------- German ----------
  "handel china", "handel mit china", "import aus china", "china import",
  "china produkte", "produkte aus china", "einkaufsagent china", "beschaffungsagent china",
  "sourcing agent china", "china logistik", "logistik aus china",
  "spedition china", "seefracht china", "luftfracht china", "china lieferant",
  "chinesische lieferanten", "china hersteller", "chinesische hersteller",
  "qualitätskontrolle china", "fabrikaudit china", "eigenmarke china",
  "oem china", "odm china", "import aus china nach deutschland",
  "import aus china schweiz", "import aus china österreich",
  "dropshipping china", "amazon fba china",
  // ---------- Portuguese ----------
  "comércio china", "comércio com china", "importar da china", "importação da china",
  "produtos chineses", "produtos da china", "agente de compras china",
  "agente de sourcing china", "logística china", "frete china", "envio da china",
  "fornecedor china", "fornecedores chineses", "fabricante china", "fabricantes chineses",
  "controle de qualidade china", "inspeção china", "marca própria china",
  "oem china", "odm china", "importar da china para brasil",
  "importar da china para portugal", "importar da china para angola",
  "dropshipping china", "amazon fba china",
  // ---------- Italian ----------
  "commercio cina", "commercio con la cina", "importare dalla cina",
  "importazione dalla cina", "prodotti cinesi", "prodotti dalla cina",
  "agente acquisti cina", "agente di sourcing cina", "logistica cina",
  "spedizioni dalla cina", "trasporto dalla cina", "fornitore cina",
  "fornitori cinesi", "produttore cina", "produttori cinesi",
  "controllo qualità cina", "ispezione cina", "marchio privato cina",
  "oem cina", "odm cina", "importare dalla cina in italia",
  "dropshipping cina", "amazon fba cina",
  // ---------- Russian ----------
  "торговля с китаем", "бизнес с китаем", "импорт из китая", "как импортировать из китая",
  "китайские товары", "товары из китая", "закупочный агент китай",
  "агент по закупкам в китае", "торговый агент китай", "логистика китай",
  "доставка из китая", "карго из китая", "морская доставка из китая",
  "авиа доставка из китая", "жд доставка из китая", "поставщик китай",
  "поставщики китая", "производитель китай", "производители китая",
  "контроль качества китай", "инспекция товара китай", "оем китай", "одм китай",
  "белая марка китай", "оптом из китая", "покупка на 1688", "покупка на алибаба",
  "агент иу", "агент гуанчжоу", "агент шэньчжэнь", "кантонская ярмарка",
  "дропшиппинг китай", "amazon fba китай",
  // ---------- Turkish ----------
  "çin ticaret", "çin ile ticaret", "çin'den ithalat", "çinden ithalat",
  "çin ürünleri", "çin malı", "çin tedarikçi", "çinli tedarikçiler",
  "çin üretici", "çinli üreticiler", "çin lojistik", "çin kargo",
  "çin nakliye", "çin deniz kargo", "çin hava kargo", "çin fabrika denetimi",
  "çin kalite kontrol", "çin ithalat acentesi", "çin satın alma acentesi",
  "yiwu acentesi", "guangzhou acentesi", "shenzhen acentesi", "1688 acentesi",
  "alibaba acentesi", "canton fair", "dropshipping çin", "amazon fba çin",
  // ---------- Japanese ----------
  "中国貿易", "中国ビジネス", "中国輸入", "中国からの輸入", "中国製品",
  "中国仕入れ", "中国仕入れ代行", "中国輸入代行", "中国物流", "中国輸送",
  "中国海運", "中国航空便", "中国サプライヤー", "中国メーカー", "中国工場",
  "中国工場監査", "中国品質管理", "中国検品", "OEM中国", "ODM中国",
  "1688代行", "アリババ代行", "義烏代行", "深セン仕入れ", "広州仕入れ",
  "広州交易会", "中国ドロップシッピング", "amazon fba 中国",
  // ---------- Korean ----------
  "중국 무역", "중국 수입", "중국에서 수입", "중국 제품", "중국 상품",
  "중국 소싱", "중국 소싱 에이전트", "중국 구매 대행", "중국 물류",
  "중국 배송", "중국 해상 운송", "중국 항공 운송", "중국 공급업체",
  "중국 제조사", "중국 공장", "중국 품질 관리", "OEM 중국", "ODM 중국",
  "1688 대행", "알리바바 대행", "이우 시장", "심천 소싱", "광저우 소싱",
  "광저우 교역회", "중국 드롭쉬핑", "아마존 fba 중국",
  // ---------- Dutch ----------
  "handel china", "importeren uit china", "china producten", "china leverancier",
  "china fabrikant", "china logistiek", "verzending vanuit china",
  "sourcing agent china", "kwaliteitscontrole china", "oem china", "odm china",
  // ---------- Polish ----------
  "handel z chinami", "import z chin", "chińskie produkty", "chiński dostawca",
  "chiński producent", "logistyka chiny", "transport z chin", "agent zakupowy chiny",
  "kontrola jakości chiny", "oem chiny", "odm chiny",
  // ---------- Hindi ----------
  "चीन व्यापार", "चीन से आयात", "चीनी उत्पाद", "चीन सप्लायर",
  "चीन निर्माता", "चीन लॉजिस्टिक्स", "चीन शिपिंग", "चीन सोर्सिंग एजेंट",
  "गुणवत्ता नियंत्रण चीन", "अलीबाबा एजेंट", "1688 एजेंट",
  // ---------- Urdu ----------
  "چین سے تجارت", "چین سے درآمد", "چینی مصنوعات", "چین سپلائر",
  "چین مینوفیکچرر", "چین شپنگ", "چین سورسنگ ایجنٹ",
  // ---------- Persian / Farsi ----------
  "تجارت با چین", "واردات از چین", "محصولات چینی", "تامین کننده چینی",
  "تولید کننده چینی", "لجستیک چین", "حمل و نقل از چین", "کارگزار خرید چین",
  // ---------- Hebrew ----------
  "מסחר עם סין", "יבוא מסין", "מוצרים מסין", "ספק מסין", "יצרן מסין",
  "לוגיסטיקה סין", "משלוח מסין", "סוכן רכש סין", "בקרת איכות סין",
  // ---------- Thai ----------
  "การค้ากับจีน", "นำเข้าจากจีน", "สินค้าจีน", "ซัพพลายเออร์จีน",
  "ผู้ผลิตจีน", "โลจิสติกส์จีน", "ขนส่งจากจีน", "ตัวแทนจัดซื้อจีน",
  // ---------- Vietnamese ----------
  "thương mại trung quốc", "nhập khẩu từ trung quốc", "hàng trung quốc",
  "nhà cung cấp trung quốc", "nhà sản xuất trung quốc", "logistics trung quốc",
  "vận chuyển từ trung quốc", "đại lý mua hàng trung quốc", "kiểm tra chất lượng trung quốc",
  // ---------- Indonesian / Malay ----------
  "perdagangan china", "impor dari china", "produk china", "pemasok china",
  "produsen china", "logistik china", "pengiriman dari china", "agen pembelian china",
  "kawalan kualiti china", "import dari china malaysia",
  // ---------- Swahili ----------
  "biashara ya china", "kuagiza kutoka china", "bidhaa za china",
  "muuzaji wa china", "usafirishaji kutoka china", "wakala wa ununuzi china",
  // ---------- Swedish / Norwegian / Danish / Finnish ----------
  "handel kina", "import från kina", "kinesiska produkter", "leverantör kina",
  "handel kina norge", "import fra kina", "kinesiske produkter",
  "handel kina danmark", "import fra kina", "kinesiske leverandører",
  "kauppa kiina", "tuonti kiinasta", "kiinalaiset tuotteet", "kiinan toimittaja",
];

// Loose types so TanStack Start's stricter HTML attribute types accept them.
export type MetaTag = Record<string, string>;
export type LinkTag = Record<string, string>;

type BuildMetaInput = {
  // Path WITHOUT the /$lang prefix, e.g. "/", "/about", "/services". The
  // helper prepends the current locale to build the canonical, OG, and
  // hreflang URLs.
  path: string;
  title: string;
  description: string;
  keywords?: string[]; // extra page-specific keywords
  image?: string;
  locale?: Locale;
};

function joinLocalePath(locale: Locale, path: string): string {
  if (!path.startsWith("/")) path = `/${path}`;
  return path === "/" ? `/${locale}` : `/${locale}${path}`;
}

export function absoluteUrl(path: string, locale?: Locale): string {
  if (!path.startsWith("/")) path = `/${path}`;
  const withLocale = locale ? joinLocalePath(locale, path) : path;
  return `${SITE_URL}${withLocale === "/" ? "" : withLocale}`;
}

export function buildMeta({ path, title, description, keywords = [], image, locale = DEFAULT_LOCALE }: BuildMetaInput): MetaTag[] {
  const url = absoluteUrl(path, locale);
  const ogImage = image ?? DEFAULT_OG_IMAGE;
  const allKeywords = Array.from(new Set([...keywords, ...GLOBAL_KEYWORDS])).join(", ");
  const alternates = ROUTABLE_LOCALES
    .filter((l) => l !== locale)
    .map((l) => ({ property: "og:locale:alternate", content: OG_LOCALE[l] }));
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
    { property: "og:locale", content: OG_LOCALE[locale] },
    ...alternates,
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

export function buildLinks(path: string, locale: Locale = DEFAULT_LOCALE): LinkTag[] {
  const canonical = absoluteUrl(path, locale);
  const alternates: LinkTag[] = ROUTABLE_LOCALES.map((l) => ({
    rel: "alternate",
    hreflang: l,
    href: absoluteUrl(path, l),
  }));
  // x-default points to the English URL so Google knows what to serve when it
  // can't match any listed locale to the user's browser preference.
  alternates.push({
    rel: "alternate",
    hreflang: "x-default",
    href: absoluteUrl(path, DEFAULT_LOCALE),
  });
  return [{ rel: "canonical", href: canonical }, ...alternates];
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
    "@id": `${SITE_URL}/#website`,
    name: SITE_NAME,
    url: SITE_URL,
    publisher: { "@id": `${SITE_URL}/#organization` },
    inLanguage: [...ROUTABLE_LOCALES],
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

export function breadcrumbJsonLd(
  items: Array<{ name: string; path: string }>,
  locale: Locale = DEFAULT_LOCALE,
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path, locale),
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

// ---------------------------------------------------------------------------
// Per-page keyword presets
//
// Every term below is drawn from GLOBAL_KEYWORDS above. `buildMeta` already
// unions each page's keywords with GLOBAL_KEYWORDS, so what these lists
// really do is: (1) put the most topically-relevant terms FIRST in the
// emitted <meta name="keywords"> tag, and (2) feed the page-scoped WebPage
// JSON-LD's `keywords` field, which Google Search Central lists as an
// accepted signal on CreativeWork subtypes. Cross-language coverage stays
// broad so the same page can be surfaced by a French, Arabic or Chinese
// query without needing dedicated localized landing pages yet.
// ---------------------------------------------------------------------------

export const KEYWORDS_HOME = [
  // Brand
  "auria", "auria trading", "auria nexus", "auria china", "auria sourcing",
  "auria logistics", "auria group", "auria trading company", "auria-trading",
  "auria-trading.com", "auria b2b", "auria import export",
  // Core intent
  "trading in china", "china trading company", "trading company china",
  "china sourcing agent", "china sourcing company", "china sourcing service",
  "china buying agent", "china procurement", "china logistics",
  "china freight forwarder", "shipping from china", "import from china",
  "buy from china", "china manufacturer", "china suppliers",
  "one stop sourcing china", "end to end sourcing china", "b2b sourcing china",
  "wholesale from china", "reliable china supplier",
  // Multilingual entry points
  "commerce chine", "importer de chine", "sourcing chine", "fournisseur chine",
  "تجارة الصين", "الاستيراد من الصين", "منتجات صينية", "وكيل شراء من الصين",
  "中国采购", "中国采购代理", "中国贸易", "从中国进口",
  "comercio china", "importar de china", "proveedor china",
  "handel china", "import aus china", "china lieferant",
  "comércio china", "importar da china", "fornecedor china",
  "commercio cina", "importare dalla cina", "fornitore cina",
  "торговля с китаем", "импорт из китая", "поставщик китай",
  "çin ticaret", "çin'den ithalat", "çin tedarikçi",
  "中国貿易", "中国輸入", "中国サプライヤー",
];

export const KEYWORDS_ABOUT = [
  "about auria", "auria trading company", "auria company",
  "china trading company", "trading company in china",
  "china sourcing company", "china office sourcing agent",
  "shanghai sourcing", "shanghai trading company",
  "shenzhen sourcing", "guangzhou sourcing", "yiwu agent",
  "china sourcing team", "auria team", "auria offices",
  "auria contact", "auria company profile",
  "société de sourcing chine", "entreprise commerce chine",
  "شركة تجارة الصين", "شركة استيراد من الصين",
  "中国贸易公司", "中国采购公司",
  "empresa de sourcing china", "empresa comercial china",
  "china handelsunternehmen", "chinesische handelsfirma",
  "empresa comercial china",
  "компания в китае", "торговая компания китай",
  "çin ticaret şirketi",
  "中国貿易会社",
];

export const KEYWORDS_SERVICES = [
  // Core service phrases
  "china sourcing services", "china sourcing agent", "sourcing agent china",
  "china buying agent", "buying agent china",
  "china procurement", "procurement services china",
  "china purchasing agent",
  "china quality control", "qc china", "china qc service",
  "quality inspection china", "third party inspection china",
  "pre shipment inspection china", "china factory audit",
  "factory inspection china", "china supplier verification",
  "private label china", "white label china",
  "oem china", "odm china", "oem manufacturing china",
  "product development china", "prototype china",
  "custom products china", "custom packaging china",
  "china consolidation", "cargo consolidation china",
  "china warehousing", "warehouse china",
  "fulfillment china", "3pl china", "china fulfillment center",
  "china freight forwarder", "freight forwarder china",
  "shipping from china", "sea freight from china", "air freight from china",
  "rail freight china europe", "ddp shipping from china",
  "fob china", "cif china", "lcl shipping china", "fcl shipping china",
  "container shipping china", "door to door china",
  "amazon fba shipping china", "fba prep china",
  "amazon fba sourcing china",
  "dropshipping agent china", "china dropshipping supplier",
  // Multilingual services
  "services de sourcing chine", "contrôle qualité chine",
  "inspection qualité chine", "audit usine chine", "marque blanche chine",
  "transitaire chine", "logistique chine", "fret maritime chine",
  "خدمات سورسنغ الصين", "فحص جودة الصين", "تدقيق مصنع الصين",
  "شحن من الصين", "شحن بحري من الصين", "شحن جوي من الصين",
  "中国采购服务", "中国验厂", "中国质量控制",
  "中国货代", "中国物流服务",
  "servicios de sourcing china", "control de calidad china",
  "auditoría de fábrica china", "logística china",
  "china beschaffungsdienste", "qualitätskontrolle china",
  "fabrikaudit china", "spedition china",
  "controllo qualità cina", "ispezione cina", "spedizioni dalla cina",
  "услуги закупок в китае", "контроль качества китай",
  "инспекция товара китай", "логистика китай",
  "çin kalite kontrol", "çin fabrika denetimi", "çin lojistik",
  "中国品質管理", "中国工場監査", "中国物流",
];

export const KEYWORDS_INDUSTRIES = [
  "china electronics sourcing", "china consumer electronics",
  "china smart devices sourcing", "china led lighting sourcing",
  "china solar panels sourcing",
  "china auto parts sourcing", "china machinery sourcing",
  "china apparel sourcing", "china textile sourcing",
  "china furniture sourcing", "china home goods sourcing",
  "china cosmetics sourcing", "china beauty products sourcing",
  "china toys sourcing", "china baby products sourcing",
  "china sports equipment sourcing", "china pet products sourcing",
  "china packaging sourcing", "china stationery sourcing",
  "china kitchenware sourcing", "china jewelry sourcing",
  "china bags sourcing", "china shoes sourcing",
  "china hardware sourcing", "china tools sourcing",
  "china medical supplies sourcing", "china ppe sourcing",
  // Marketplaces / events
  "1688 sourcing", "1688 agent", "alibaba sourcing agent",
  "alibaba agent", "made in china sourcing", "taobao sourcing agent",
  "canton fair sourcing", "canton fair agent",
  // Multilingual industries
  "sourcing électronique chine", "sourcing textile chine",
  "sourcing mobilier chine", "sourcing cosmétiques chine",
  "استيراد إلكترونيات من الصين", "استيراد ملابس من الصين",
  "استيراد أثاث من الصين",
  "中国电子采购", "中国服装采购", "中国家具采购",
  "sourcing electrónica china", "sourcing textil china",
  "china elektronik beschaffung", "china textil beschaffung",
  "sourcing elettronica cina", "sourcing tessile cina",
  "закупка электроники в китае", "закупка одежды в китае",
  "çin elektronik tedarik", "çin tekstil tedarik",
  "中国電子部品調達", "中国アパレル調達",
];

export const KEYWORDS_HOW_WE_WORK = [
  "how to import from china", "china sourcing process",
  "china factory audit", "china quality inspection",
  "china order management", "verify china supplier",
  "china supplier scam protection", "china sourcing service near me",
  "sample sourcing china",
  // Multilingual
  "comment importer de chine", "processus sourcing chine",
  "audit fournisseur chine",
  "كيفية الاستيراد من الصين", "خطوات الاستيراد من الصين",
  "如何从中国进口", "中国采购流程", "中国验厂流程",
  "cómo importar de china", "proceso de sourcing china",
  "wie aus china importieren", "china beschaffungsprozess",
  "come importare dalla cina", "processo di sourcing cina",
  "как импортировать из китая", "процесс закупки в китае",
  "çin'den nasıl ithalat", "çin tedarik süreci",
  "中国輸入方法", "中国仕入れ手順",
];

export const KEYWORDS_CONTACT = [
  "contact china sourcing", "china sourcing agent contact",
  "wechat china sourcing", "whatsapp china supplier",
  "auria contact", "contact auria trading",
  "china sourcing quote", "china sourcing rfq",
  // Multilingual
  "contact sourcing chine", "contacter agent chine",
  "تواصل مع وكيل الصين", "استفسار استيراد من الصين",
  "联系中国采购代理", "中国采购报价",
  "contactar agente china", "cotización sourcing china",
  "kontakt sourcing china", "china angebot einholen",
  "contatto sourcing cina", "preventivo sourcing cina",
  "связаться с агентом в китае", "запрос цены китай",
  "çin acentesi iletişim", "çin tedarik teklifi",
  "中国調達 問い合わせ", "中国仕入れ 見積もり",
];

// ---------------------------------------------------------------------------
// Per-page WebPage JSON-LD
//
// Emits a schema.org WebPage node with `keywords`, `inLanguage`, `about` and
// a link back to the Organization/WebSite entities defined at root. Search
// engines treat this as a page-level topic declaration — stronger than the
// legacy <meta name="keywords"> tag alone.
// ---------------------------------------------------------------------------
export function webPageJsonLd(input: {
  path: string;
  title: string;
  description: string;
  keywords: string[];
  locale?: Locale;
}) {
  const locale = input.locale ?? DEFAULT_LOCALE;
  const url = absoluteUrl(input.path, locale);
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${url}#webpage`,
    url,
    name: input.title,
    description: input.description,
    inLanguage: locale,
    keywords: input.keywords.join(", "),
    isPartOf: { "@id": `${SITE_URL}/#website` },
    about: { "@id": `${SITE_URL}/#organization` },
    primaryImageOfPage: {
      "@type": "ImageObject",
      url: DEFAULT_OG_IMAGE,
    },
  };
}
