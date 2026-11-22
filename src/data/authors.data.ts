import type { StaticImageData } from "next/image";
import mohamedoulahguineAvatar from "@/assets/images/authors/mohamedoulahguine.png";
import {
  OWNER_PROFILE_SOCIAL_LINKS,
  type SocialLink,
} from "./social-links.data";

// ---- author ----
export const AUTHOR_IDS = ["mohamedoulahguine"] as const;
export type AuthorId = (typeof AUTHOR_IDS)[number];

export interface Author {
  id: AuthorId;
  name: string;
  role: string;
  avatar: StaticImageData;
  socials: SocialLink[];
}

export const AUTHORS: Record<AuthorId, Author> = {
  mohamedoulahguine: {
    id: "mohamedoulahguine",
    name: "Mohamed Oulahguine",
    role: "Frontend Developer",
    avatar: mohamedoulahguineAvatar,
    socials: OWNER_PROFILE_SOCIAL_LINKS,
  },
};

export const DEFAULT_AUTHOR_ID: AuthorId = "mohamedoulahguine";

// ---- helpers ----
export function isAuthorId(value: string): value is AuthorId {
  return (AUTHOR_IDS as readonly string[]).includes(value);
}

export function getAuthor(id: AuthorId): Author {
  const author = AUTHORS[id];

  if (!author) {
    throw new Error(`Unknown author id: "${id}"`);
  }

  return author;
}
