import { OG_IMAGES } from "@/lib";
import { getBlogPosts } from "@/server/blog.server";
import type { AuthorId } from "./authors.data";

// ---- interfaces ----
export interface Blog {
  id: string;
  slug: string;
  title: string;
  description: string;
  date: string;
  dateTime: string;
  updated?: string;
  readingTime: number;
  wordCount: number;
  authorId: AuthorId;
  tags?: string[];
  section?: string;
}

// ---- constants ----
const BLOGS = getBlogPosts();
const PRIMARY_BLOGS = BLOGS.slice(0, 4);
const REMAINING_BLOGS_COUNT = Math.max(BLOGS.length - PRIMARY_BLOGS.length, 0);

// ---- section data ----
export const BLOG_SECTION_DATA = {
  blogsHeadingId: "blogs-heading",

  headerSection: {
    id: "blogs",
    title: "Blogs",
  },

  primaryBlogs: PRIMARY_BLOGS,
  remainingBlogsCount: REMAINING_BLOGS_COUNT,
};

// ---- meta data ----
export const BLOG_META_DATA = {
  title: "Blogs",
  description:
    "Notes, lessons, and things I've learned while building software and growing as a developer.",
  image: OG_IMAGES.blog,
};

// ---- page data ----
export const BLOG_PAGE_DATA = {
  headerPage: {
    title: "Blogs",
    description:
      "Notes, lessons, and things I've learned while building software and growing as a developer.",
  },

  blogs: BLOGS,
};
