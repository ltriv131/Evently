import styles from "../css/ContactPage.module.css";

export default function ContactUsPage() {
  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Contact Us</h1>
      <div className={styles.details}>
        <p className={styles.row}>
          <span className={styles.label}>Name</span>
          <span className={styles.value}>Liam Rivers</span>
        </p>
        <p className={styles.row}>
          <span className={styles.label}>Email</span>
          <a className={styles.value} href="mailto:liam_rivers@brown.edu">
            liam_rivers@brown.edu
          </a>
        </p>
        <p className={styles.row}>
          <span className={styles.label}>GitHub</span>
          <a
            className={styles.value}
            href="https://github.com/ltriv131"
            target="_blank"
            rel="noreferrer"
          >
            github.com/ltriv131
          </a>
        </p>
      </div>
    </div>
  );
}
