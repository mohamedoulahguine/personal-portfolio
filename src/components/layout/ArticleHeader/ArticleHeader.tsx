import Image from "next/image";
import { FaArrowLeft, FaRegClock } from "react-icons/fa";
import { Link, SocialLinks } from "@/components";
import type { Author } from "@/data";
import type { ClassNameProps } from "@/types";

import styles from "./ArticleHeader.module.scss";

// ---- interfaces ----
interface BackLink {
  href: string;
  label: string;
}

interface PublishedAt {
  display: string;
  iso: string;
}

interface ArticleHeaderProps extends ClassNameProps {
  backTo: BackLink;
  title: string;
  author: Author;
  readingTime?: number;
  publishedAt?: PublishedAt;
}

// ---- component ----
export default function ArticleHeader({
  backTo,
  title,
  author,
  readingTime,
  publishedAt,
  className = "",
}: ArticleHeaderProps) {
  const headerClassName = [styles.articleHeader, className]
    .filter(Boolean)
    .join(" ");

  return (
    <header className={headerClassName}>
      {/* ---- breadcrumb ---- */}
      <nav className={styles.articleHeader__breadcrumb} aria-label="Breadcrumb">
        <Link
          href={backTo.href}
          variant="plain"
          className={styles["articleHeader__breadcrumb-link"]}
          icon={<FaArrowLeft aria-hidden="true" />}
          iconPosition="left"
          label={backTo.label}
          aria-label={`back to ${backTo.label} page`}
        />
      </nav>

      {/* ---- title ---- */}
      <h1 className={styles.articleHeader__title}>{title}</h1>

      {/* ---- author ---- */}
      <address className={styles.articleHeader__author}>
        <figure className={styles["articleHeader__author-avatar"]}>
          <Image
            src={author.avatar}
            alt={`Portrait of ${author.name}`}
            width={64}
            height={64}
            quality={100}
            sizes="(max-width: 768px) 56px, (max-width: 1200px) 60px, 64px"
            className={styles["articleHeader__author-avatar-img"]}
          />
        </figure>

        <div className={styles["articleHeader__author-info"]}>
          <p className={styles["articleHeader__author-name"]}>
            <span className={styles["articleHeader__author-name-prefix"]}>
              by
            </span>{" "}
            {author.name}
          </p>
          <p className={styles["articleHeader__author-role"]}>{author.role}</p>
          <SocialLinks
            links={author.socials}
            orientation="horizontal"
            className={styles["articleHeader__author-socials"]}
          />
        </div>
      </address>

      {/* ---- details (reading time + published) ---- */}
      {readingTime || publishedAt ? (
        <ul className={styles.articleHeader__details}>
          {publishedAt ? (
            <li className={styles["articleHeader__details-item"]}>
              <span>Published:</span>
              <time dateTime={publishedAt.iso}>{publishedAt.display}</time>
            </li>
          ) : null}

          {readingTime ? (
            <li className={styles["articleHeader__details-item"]}>
              <FaRegClock aria-hidden="true" />
              <span>{readingTime} min read</span>
            </li>
          ) : null}
        </ul>
      ) : null}
    </header>
  );
}
