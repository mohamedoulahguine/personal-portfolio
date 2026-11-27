export const SITE_URL = "https://mohamedoulahguine.dev";

export const SITE_NAME = "Mohamed Oulahguine";
export const SITE_SHORT_NAME = "oulahguine";
export const SITE_DEFAULT_TITLE = "Mohamed Oulahguine • Frontend Developer";
export const SITE_TITLE_TEMPLATE = "%s | Mohamed Oulahguine";

export const BLOG_RSS_PATH = "/blog/feed.xml";

export const SITE_DEFAULT_DESCRIPTION =
  "I'm a frontend engineer focused on building accessible, performant, and well-crafted web experiences with React and Next.js.";

export const SITE_AUTHOR_NAME = "Mohamed Oulahguine";
export const SITE_TWITTER_SITE = "@mohamedoulahguine";
export const SITE_TWITTER_CREATOR = "@mohamedoulahguine";

// Page-specific Open Graph images
const OG_IMAGES_PATH = "/open-graph-image";
export const OG_IMAGES = {
  home: `${OG_IMAGES_PATH}/homepage.png`,
  about: `${OG_IMAGES_PATH}/about page.png`,
  skills: `${OG_IMAGES_PATH}/skills Page.png`,
  projects: `${OG_IMAGES_PATH}/projects Page.png`,
  blog: `${OG_IMAGES_PATH}/blog Page.png`,
  contact: `${OG_IMAGES_PATH}/contact Page.png`,
} as const;

// Default Open Graph image metadata
export const OPEN_GRAPH_IMAGE = {
  url: OG_IMAGES.home,
  width: 1200,
  height: 630,
  alt: "Mohamed Oulahguine — Frontend Developer",
  type: "image/png",
} as const;

// Blog post OG image mapping by slug
const BLOG_POST_OG_IMAGES: Record<string, string> = {
  "why-i-moved-to-mdx": `${OG_IMAGES_PATH}/blogs/blog-page-1.png`,
};

export function getBlogPostOgImage(slug: string): string {
  return BLOG_POST_OG_IMAGES[slug] ?? OG_IMAGES.blog;
}

// PWA
export const SITE_THEME_COLOR = "#ffe023";
export const PWA_BACKGROUND_COLOR = "#ffe023";
export const PWA_THEME_COLOR = "#1a1a1c";

export const PWA_ICON_192 = "/favicon/web-app-manifest-192x192.png";
export const PWA_ICON_512 = "/favicon/web-app-manifest-512x512.png";
export const MANIFEST_PATH = "/manifest.webmanifest";

export const PWA_CATEGORIES = [
  "development",
  "portfolio",
  "productivity",
  "technology",
] as const;

export const isNetlifyPreview =
  Boolean(process.env.CONTEXT) && process.env.CONTEXT !== "production";
