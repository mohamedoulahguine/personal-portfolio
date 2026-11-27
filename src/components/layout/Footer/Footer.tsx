import Image from "next/image";
import { HERO_DATA } from "@/data";
import { SocialLinks, Logo } from "@/components";
import footerIllustration from "@/assets/images/footer/footer.png";

import styles from "./Footer.module.scss";

export default function Footer() {
  const { profileInfo } = HERO_DATA;
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer} id="main-footer">
      <div className={styles.footer__container}>
        <div className={styles.footer__content}>
          <Logo className={styles.footer__logo} />
          <SocialLinks
            orientation="horizontal"
            className={styles.footer__socials}
            linkClassName={styles.footer__socialLink}
            iconClassName={styles.footer__socialIcon}
          />
          <p className={styles.footer__copyright}>
            © {year} {profileInfo.name}.
          </p>
        </div>

        <div className={styles.footer__illustration} aria-hidden="true">
          <Image
            src={footerIllustration}
            alt=""
            fill
            sizes="(max-width: 50em) 100vw, 800px"
            className={styles["footer__illustration-image"]}
          />
        </div>
      </div>
    </footer>
  );
}
