// Serve SEO resource files (sitemap, robots, manifest, og-image) only to known
// crawlers/scrapers; humans hitting these URLs in a browser get a 404.
//
// CAVEAT: User-Agent is trivially spoofable. This hides the files from casual
// visitors, NOT from anyone who sets a bot UA on purpose. Do not rely on it
// for secrecy of anything sensitive.
import { SITE_URL, SITE_NAME } from "./seo";
import { OG_IMAGE_BASE64 } from "./og-image-data";

// Search / indexing crawlers — allowed to fetch sitemap.xml, robots.txt, manifest.
const SEARCH_BOTS = [
  "googlebot",
  "google-inspectiontool",
  "storebot-google",
  "google-extended",
  "bingbot",
  "bingpreview",
  "msnbot",
  "slurp", // Yahoo
  "duckduckbot",
  "duckduckgo",
  "yandexbot",
  "yandex",
  "baiduspider",
  "sogou",
  "exabot",
  "facebot",
  "ia_archiver",
  "applebot",
  "petalbot",
  "seznambot",
  "gptbot",
  "chatgpt-user",
  "oai-searchbot",
  "perplexitybot",
  "claudebot",
  "claude-web",
  "anthropic-ai",
  "ccbot",
  "google-read-aloud",
];

// Social preview scrapers — additionally allowed to fetch the OG image so link
// previews render on chat/social platforms.
const SOCIAL_BOTS = [
  "facebookexternalhit",
  "facebookcatalog",
  "twitterbot",
  "linkedinbot",
  "whatsapp",
  "telegrambot",
  "slackbot",
  "slack-imgproxy",
  "discordbot",
  "pinterest",
  "redditbot",
  "skypeuripreview",
  "vkshare",
  "embedly",
  "flipboard",
  "tumblr",
  "line-podcast",
  "viber",
  "google-structured-data-testing-tool",
  "developers.google.com/+/web/snippet",
];

const ALL_BOTS = [...SEARCH_BOTS, ...SOCIAL_BOTS];

function uaMatches(ua: string, list: string[]): boolean {
  const lower = ua.toLowerCase();
  return list.some((token) => lower.includes(token));
}

export function isSearchBot(ua: string | null): boolean {
  return !!ua && uaMatches(ua, SEARCH_BOTS);
}

export function isAnyBot(ua: string | null): boolean {
  return !!ua && uaMatches(ua, ALL_BOTS);
}

function robotsTxt(): string {
  return `# ${SITE_NAME} — robots.txt
# ${SITE_URL}

User-agent: *
Allow: /
Disallow: /login

Sitemap: ${SITE_URL}/sitemap.xml
Host: ${SITE_URL}
`;
}

function webmanifest(): string {
  return JSON.stringify(
    {
      name: `${SITE_NAME} — Global Sourcing, Trading & Logistics from China`,
      short_name: SITE_NAME,
      description:
        "AURIA is a global trading and sourcing company connecting international buyers with trusted Chinese manufacturers, quality control and logistics.",
      start_url: "/",
      scope: "/",
      display: "standalone",
      background_color: "#0a0a0a",
      theme_color: "#0a0a0a",
      lang: "en",
      dir: "auto",
      categories: ["business", "productivity", "shopping"],
      icons: [
        { src: "/favicon.svg", sizes: "any", type: "image/svg+xml", purpose: "any maskable" },
      ],
    },
    null,
    2,
  );
}

// A Response body is a single-use stream, so build a fresh 404 per request
// rather than sharing one instance (which errors with "ReadableStream is locked").
function notFound(): Response {
  return new Response("Not Found", {
    status: 404,
    headers: { "content-type": "text/plain; charset=utf-8" },
  });
}

// Returns a Response for a gated SEO asset, or null if the request isn't for one.
export function handleBotAsset(request: Request): Response | null {
  const url = new URL(request.url);
  const path = url.pathname;
  const ua = request.headers.get("user-agent");

  const textAsset = (
    body: string,
    contentType: string,
    allow: (ua: string | null) => boolean,
  ): Response =>
    allow(ua)
      ? new Response(body, {
          status: 200,
          headers: {
            "content-type": contentType,
            "cache-control": "public, max-age=3600",
            "x-robots-tag": "noindex",
          },
        })
      : notFound();

  switch (path) {
    case "/robots.txt":
      return textAsset(robotsTxt(), "text/plain; charset=utf-8", isSearchBot);
    case "/site.webmanifest":
    case "/manifest.webmanifest":
      return textAsset(webmanifest(), "application/manifest+json; charset=utf-8", isAnyBot);
    case "/og-image.jpg":
    case "/og-image.jpeg": {
      if (!isAnyBot(ua)) return notFound();
      const bytes = Uint8Array.from(atob(OG_IMAGE_BASE64), (c) => c.charCodeAt(0));
      return new Response(bytes, {
        status: 200,
        headers: {
          "content-type": "image/jpeg",
          "cache-control": "public, max-age=86400",
        },
      });
    }
    default:
      return null;
  }
}
