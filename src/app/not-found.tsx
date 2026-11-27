import type { Metadata } from "next";

import styles from "./not-found.module.scss";

const TITLE = "Page not found";
const DESCRIPTION =
  "This link doesn't lead anywhere on the site. It may be outdated, mistyped, or the page may have moved.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <>
      <div className={styles.notFound}>
        <p className={styles.notFound__mark} aria-hidden="true">
          404
        </p>

        <p className={styles.notFound__nudge}>
          Well, this page doesn&apos;t seem to exist. Maybe the link is
          outdated, maybe I made a mistake, or maybe you just ended up somewhere
          unexpected. Either way, there&apos;s still plenty to explore around
          here.{" "}
          <span className={styles.notFound__nudge__hint}>
            Use the navigation above to find your way around.
          </span>
        </p>
      </div>
    </>
  );
}
