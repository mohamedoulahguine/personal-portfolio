export const SITE_URL = "https://mohamedoulahguine.dev";

export const SITE_NAME = "Mohamed Oulahguine";
export const SITE_SHORT_NAME = "oulahguine";
export const SITE_DEFAULT_TITLE = "Mohamed Oulahguine • Frontend Developer";
export const SITE_TITLE_TEMPLATE = "%s | Mohamed Oulahguine";

export const BLOG_RSS_PATH = "/blog/feed.xml";

export const SITE_DEFAULT_DESCRIPTION =
  "I’m a frontend engineer focused on building accessible, performant, and well-crafted web experiences with React and Next.js.";

export const SITE_AUTHOR_NAME = "Mohamed Oulahguine";
export const SITE_TWITTER_SITE = "@mohamedoulahguine";
export const SITE_TWITTER_CREATOR = "@mohamedoulahguine";

// Page-specific Open Graph images
export const OG_IMAGES = {
  home: "/open-graph-image/homepage.png",
  about: "/open-graph-image/about page.png",
  skills: "/open-graph-image/skills Page.png",
  projects: "/open-graph-image/projects Page.png",
  blog: "/open-graph-image/blog Page.png",
  contact: "/open-graph-image/contact Page.png",
} as const;

// Default Open Graph image metadata
export const OPEN_GRAPH_IMAGE = {
  url: OG_IMAGES.home,
  width: 1200,
  height: 630,
  alt: "Mohamed Oulahguine — Frontend Developer portfolio",
  type: "image/png",
} as const;

// Blog post OG image mapping by slug
const BLOG_POST_OG_IMAGES: Record<string, string> = {
  "why-i-moved-to-mdx": "/open-graph-image/blogs/blog Page-1.png",
  // Add more blog post images here as you create them:
  // "my-second-post": "/open-graph-image/blogs/blog Page-2.png",
  // "my-third-post": "/open-graph-image/blogs/blog Page-3.png",
};

/**
 * Get the Open Graph image for a blog post by slug.
 * Falls back to the generic blog image if no specific image exists.
 */
export function getBlogPostOgImage(slug: string): string {
  return BLOG_POST_OG_IMAGES[slug] ?? OG_IMAGES.blog;
}

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
