"use client";

import { useScene } from "../engine";
import styles from "./search.module.css";

/* Scene 3 · Search — a single ask across every repo.
   Steps: 0 fan appears · 1..5 queries activate; matching docs feed the machine. */

const QUERIES = [
  { tint: "pink", text: "“Find the API design doc from MAYA CHEN”" },
  { tint: "teal", text: "“Send each first-time contributor a welcome comment”" },
  { tint: "green", text: "“Add repro steps from the discussion to issue #318”" },
  { tint: "blue", text: "“Send our security team all open dependency alerts”" },
  { tint: "yellow", text: "“Mark all dependabot PRs as REVIEWED”" },
];

/* documents in the 3-D fan; group = which query ingests them */
const DOCS = [
  { label: "RFC-007 · API design", kind: "rfc", group: 1 },
  { label: "ADR-12 · one-pager", kind: "doc", group: 1 },
  { label: "CONTRIBUTING.md", kind: "doc", group: 2 },
  { label: "first-timers list", kind: "list", group: 2 },
  { label: "discussion #318", kind: "chat", group: 3 },
  { label: "crash log · trace", kind: "log", group: 3 },
  { label: "GHSA-9x2f advisory", kind: "alert", group: 4 },
  { label: "dependency graph", kind: "graph", group: 4 },
  { label: "dependabot PR ×12", kind: "bot", group: 5 },
  { label: "release notes v0.4", kind: "doc", group: 0 },
  { label: "flame graph", kind: "graph", group: 0 },
  { label: "meetup poster", kind: "poster", group: 0 },
];

const KIND_CLASS: Record<string, string> = {
  rfc: styles.docRfc,
  doc: styles.docPlain,
  list: styles.docList,
  chat: styles.docChat,
  log: styles.docLog,
  alert: styles.docAlert,
  graph: styles.docGraph,
  bot: styles.docBot,
  poster: styles.docPoster,
};

export function Search() {
  const { active, step, visited } = useScene("search");
  const s = active ? step : visited ? 5 : -1;

  return (
    <section
      className={`${styles.viewport} ${active ? styles.active : ""}`}
      aria-label="Search — save time and sanity with a single ask"
    >
      <div className={`${styles.stage} ${s >= 0 ? styles.stageIn : ""}`}>
        {/* query receipts */}
        <div className={styles.queries}>
          {QUERIES.map((q, i) => (
            <div
              key={i}
              className={`${styles.receipt} ${styles[`tint_${q.tint}`]} ${
                s >= i + 1 ? styles.receiptActive : ""
              } ${s > i + 1 ? styles.receiptDone : ""}`}
              style={{ transitionDelay: s === 0 ? `${i * 0.12}s` : "0s" }}
            >
              {q.text}
              {s > i + 1 && <span className={styles.doneTick}>✓</span>}
            </div>
          ))}
        </div>

        {/* document fan */}
        <div className={styles.fan}>
          {DOCS.map((d, i) => {
            const ingested = d.group !== 0 && s > d.group;
            const litUp = d.group !== 0 && s === d.group + 0; /* active query's docs glow */
            return (
              <div
                key={i}
                className={`${styles.doc} ${KIND_CLASS[d.kind]} ${
                  ingested ? styles.docIngested : ""
                } ${litUp && s >= 1 ? styles.docLit : ""}`}
                style={
                  {
                    "--i": i,
                    "--n": DOCS.length,
                  } as React.CSSProperties
                }
              >
                <span className={styles.docLabel}>{d.label}</span>
                <span className={styles.docLines} aria-hidden>
                  <span />
                  <span />
                  <span />
                </span>
              </div>
            );
          })}
        </div>

        {/* merge machine */}
        <div className={styles.machine}>
          <div className={styles.machineTop}>
            <span className={styles.machineSlot} />
            <span className={styles.machineLever}>
              squash
              <i />
            </span>
          </div>
          <div className={styles.machineBody}>
            <span className={styles.machineEye} />
            <span className={styles.machineEye} />
          </div>
          {/* output artifact */}
          <div
            className={`${styles.artifact} ${s >= 5 ? styles.artifactOut : ""}`}
          >
            <span>dependabot PRs</span>
            <span className={styles.reviewedStamp}>REVIEWED</span>
          </div>
        </div>
      </div>
    </section>
  );
}
