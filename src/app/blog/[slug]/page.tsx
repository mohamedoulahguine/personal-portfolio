import { notFound } from "next/navigation";
import { ArticleHeader, ArticleLayout } from "@/components";
import { blogComponents } from "@/content/blogs";
import { getAuthor, ROUTES } from "@/data";
import { getBlogPost, getBlogPosts } from "@/server/blog.server";
import {
  createPageMetadata,
  getBlogPostingJsonLd,
  getRouteBreadcrumbJsonLd,
  getBlogPostOgImage,
  JsonLd,
} from "@/lib";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getBlogPosts().map(({ slug }) => ({ slug }));
}

// this is for the blog post page SEO
export async function generateMetadata({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) {
    return {};
  }

  // here we get the author of the blog post
  const author = getAuthor(post.authorId);

  return createPageMetadata(`${ROUTES.blog.href}/${post.slug}`, {
    variant: "article",
    title: post.title,
    description: post.description,
    image: getBlogPostOgImage(post.slug),
    publishedTime: toIsoDateTime(post.dateTime),
    modifiedTime: post.updated ? toIsoDateTime(post.updated) : undefined,
    authors: [getAuthorUrl(author)],
    tags: post.tags,
    section: post.section,
  });
}

function toIsoDateTime(value: string): string {
  return new Date(value).toISOString();
}

function getAuthorUrl(author: ReturnType<typeof getAuthor>): string {
  const website = author.socials.find((social) => social.id === "website");

  if (website) {
    return website.href;
  }

  const linkedin = author.socials.find((social) => social.id === "linkedin");

  return linkedin?.href ?? `${author.name}`;
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  const Content = blogComponents[slug];

  if (!post || !Content) {
    notFound();
  }

  const author = getAuthor(post.authorId);

  const jsonLd = [
    getBlogPostingJsonLd({
      slug: post.slug,
      title: post.title,
      description: post.description,
      datePublished: post.dateTime,
      dateModified: post.updated,
      author,
      wordCount: post.wordCount,
      keywords: post.tags,
    }),
    getRouteBreadcrumbJsonLd("blog", post.title),
  ];

  return (
    <>
      <JsonLd data={jsonLd} />
      <ArticleLayout
        header={
          <ArticleHeader
            backTo={{ href: ROUTES.blog.href, label: ROUTES.blog.label }}
            title={post.title}
            author={author}
            readingTime={post.readingTime}
            publishedAt={{ display: post.date, iso: post.dateTime }}
          />
        }
      >
        <Content />
      </ArticleLayout>
    </>
  );
}
