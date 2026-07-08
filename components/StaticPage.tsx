import Link from "next/link";
import styles from "./static.module.css";

export function StaticPage({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className={styles.page}>
      <Link href="/" className={styles.back} aria-label="Back to home">
        ☞
      </Link>
      <h1 className={styles.title}>{title}</h1>
      <div className={styles.content}>{children}</div>
    </div>
  );
}
