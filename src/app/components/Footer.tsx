import Image from "next/image";
import styles from "../css/Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.wrapper}>
      <div className={styles.row}>
        <a
          href="https://github.com/ltriv131/Evently"
          target="_blank"
          rel="noreferrer"
          className={styles.badge}
        >
          <span className={styles.icon}>
            <Image src="/icons/github.svg" alt="" width={24} height={24} />
          </span>
          <span className={styles.copy}>
            <span className={styles.copyLine}>Open source</span>
            <span className={styles.copyLine}>GitHub</span>
          </span>
        </a>
      </div>
    </footer>
  );
}
