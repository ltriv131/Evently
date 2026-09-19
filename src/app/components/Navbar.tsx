"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "../css/Navbar.module.css";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/events", label: "Events" },
  { href: "/contact-us", label: "Contact Us" },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <div className={styles.wrapper}>
      <div className={styles.row}>
        <p className={styles.logo}>Evently</p>

        <div className={styles.links}>
          {NAV_LINKS.map(({ href, label }) => {
            const isActive = pathname === href;
            return (
              <Link key={href} href={href} className={styles.link}>
                <span
                  className={`${styles.linkLabel} ${
                    isActive ? styles.linkLabelActive : ""
                  }`}
                >
                  {label}
                </span>
                {isActive && <span className={styles.linkDot} />}
              </Link>
            );
          })}
        </div>

        <Link href="/saved" aria-label="Saved events" className={styles.savedLink}>
          <Image src="/icons/bookmark.svg" alt="" width={18} height={18} />
        </Link>
      </div>

      <div className={styles.divider} />
    </div>
  );
}
