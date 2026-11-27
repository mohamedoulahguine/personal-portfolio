import {
  FaEnvelope,
  FaGithub,
  FaGlobe,
  FaLinkedin,
  FaRss,
} from "react-icons/fa";
import { FaBluesky } from "react-icons/fa6";
import type { IconType } from "react-icons";
import { BLOG_RSS_PATH } from "@/lib/seo/site";

// ---- interfaces ----
export type SocialLinkId =
  | "linkedin"
  | "bluesky"
  | "github"
  | "email"
  | "website"
  | "rss";
export interface SocialLink {
  id: SocialLinkId;
  label: string;
  href: string;
  external: boolean;
  icon: IconType;
}
interface SocialProfileConfig {
  label: string;
  icon: IconType;
  external: boolean;
}

// ---- markup for the social profiles data ----
const SOCIAL_PROFILES: Record<SocialLinkId, SocialProfileConfig> = {
  linkedin: { label: "LinkedIn", icon: FaLinkedin, external: true },
  bluesky: { label: "BlueSky", icon: FaBluesky, external: true },
  github: { label: "GitHub", icon: FaGithub, external: true },
  email: { label: "Email", icon: FaEnvelope, external: false },
  website: { label: "Website", icon: FaGlobe, external: true },
  rss: { label: "RSS", icon: FaRss, external: false },
};

// ---- utility function to create a social link ----
export function createSocialLink(
  id: SocialLinkId,
  href: string,
  label?: string,
): SocialLink {
  const profile = SOCIAL_PROFILES[id];

  return {
    id,
    href,
    label: label ?? profile.label,
    icon: profile.icon,
    external: profile.external,
  };
}

// Profile links (also used on blog bylines via AUTHORS).
export const OWNER_PROFILE_SOCIAL_LINKS: SocialLink[] = [
  createSocialLink("linkedin", "https://linkedin.com/in/mohamedoulahguine"),
  createSocialLink("bluesky", "https://bsky.app/profile/mohamedoulahguine.dev"),
  createSocialLink("github", "https://github.com/mohamedoulahguine"),
];

// ---- site-owner social links ----
export const SOCIAL_LINKS: SocialLink[] = [
  ...OWNER_PROFILE_SOCIAL_LINKS,
  createSocialLink("email", "mailto:mohamedoulahguine@gmail.com"),
  createSocialLink("rss", BLOG_RSS_PATH, "Subscribe via RSS"),
];
