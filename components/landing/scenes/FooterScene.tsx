"use client";

import { useScene } from "../engine";
import { MarshmallowFace } from "../Marshmallow";
import styles from "./footer.module.css";

/* Scene 6 · Footer — link columns, waitlist stamp, giant wordmark. */

const GROUPS = [
  { header: "Company", links: [["Terms", "/terms"], ["Privacy", "/privacy"]] },
  { header: "Product", links: [["Change Log", "/log"]] },
  {
    header: "Contact",
    links: [
      ["GitHub", "https://github.com"],
      ["X", "https://x.com"],
    ],
  },
];

export function FooterScene() {
  const { active } = useScene("footer");

  return (
    <section
      className={`${styles.viewport} ${active ? styles.active : ""}`}
      aria-label="Footer"
    >
      <div className={`${styles.columns} ${active ? styles.columnsIn : ""}`}>
        {GROUPS.map((g, gi) => (
          <div
            key={g.header}
            className={styles.group}
            style={{ transitionDelay: `${gi * 0.1}s` }}
          >
            <div className={styles.groupHeader}>{g.header}</div>
            <div className={styles.groupLinks}>
              {g.links.map(([label, href]) => (
                <a key={label} href={href} className={styles.link}>
                  {label}
                </a>
              ))}
            </div>
          </div>
        ))}
        <div className={`${styles.group} ${styles.versionGroup}`}>
          <div className={styles.versionLabel}>©2026 Marshmallow Inc.</div>
          <a href="/waitlist" className={styles.stamp} aria-label="Join the waitlist">
            <span className={styles.stampInner}>
              <span className={styles.stampV}>V1</span>
              <MarshmallowFace className={styles.stampMark} />
              <span className={styles.stampBase} />
            </span>
          </a>
        </div>
      </div>

      <div className={styles.wordmark} aria-hidden>
        marshmallow
      </div>
    </section>
  );
}
