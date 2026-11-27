import { SOCIAL_LINKS, type SocialLink } from "@/data";
import type { ClassNameProps } from "@/types";
import { Link, Tooltip, TooltipTrigger } from "@/components";

import styles from "./SocialLinks.module.scss";

// ---- interfaces ----
type SocialLinksOrientation = "horizontal" | "vertical";
interface SocialLinksProps extends ClassNameProps {
  links?: SocialLink[];
  orientation?: SocialLinksOrientation;
  showLabel?: boolean;
  linkClassName?: string;
  iconClassName?: string;
  labelClassName?: string;
}

// ---- component ----
export default function SocialLinks({
  links = SOCIAL_LINKS,
  orientation = "horizontal",
  showLabel = false,
  className = "",
  linkClassName = "",
  iconClassName = "",
  labelClassName = "",
}: SocialLinksProps) {
  // ---- list class names ----
  const listClassName = [
    styles.socialLinks,
    styles[`socialLinks--${orientation}`],
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const linkClassNames = [styles.socialLinks__link, linkClassName]
    .filter(Boolean)
    .join(" ");

  const iconClassNames = [styles.socialLinks__icon, iconClassName]
    .filter(Boolean)
    .join(" ");

  const labelClassNames = [styles.socialLinks__label, labelClassName]
    .filter(Boolean)
    .join(" ");

  return (
    <ul className={listClassName}>
      {links.map((link) => {
        const Icon = link.icon;

        const linkControl = (
          <Link
            className={linkClassNames}
            href={link.href}
            aria-label={showLabel ? undefined : link.label}
            target={link.external ? "_blank" : undefined}
            rel={link.external ? "noopener noreferrer" : undefined}
          >
            <Icon className={iconClassNames} aria-hidden="true" />
            {showLabel ? (
              <span className={labelClassNames}>{link.label}</span>
            ) : null}
          </Link>
        );

        return (
          <li key={link.id} className={styles.socialLinks__item}>
            {showLabel ? (
              linkControl
            ) : (
              <TooltipTrigger delay={300} closeDelay={100}>
                {linkControl}
                <Tooltip>{link.label}</Tooltip>
              </TooltipTrigger>
            )}
          </li>
        );
      })}
    </ul>
  );
}
