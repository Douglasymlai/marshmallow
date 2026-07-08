"use client";

import { useEffect, useState } from "react";
import { useScene } from "../engine";
import styles from "./room.module.css";

/* ── entrance effects: text scrambles into place, numbers count up ── */

const SCRAMBLE_CHARS = "abcdefghijklmnopqrstuvwxyz";

function Scramble({
  text,
  play,
  delay = 0,
}: {
  text: string;
  play: boolean;
  delay?: number;
}) {
  const [out, setOut] = useState(text);
  useEffect(() => {
    if (!play) return;
    let timer: ReturnType<typeof setInterval>;
    const start = setTimeout(() => {
      let frame = 0;
      const total = 16;
      timer = setInterval(() => {
        frame += 1;
        const reveal = Math.floor((frame / total) * text.length);
        if (frame >= total) {
          setOut(text);
          clearInterval(timer);
          return;
        }
        setOut(
          text
            .split("")
            .map((c, i) => {
              if (i < reveal || c === " " || c === ":") return c;
              return SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
            })
            .join(""),
        );
      }, 40);
    }, delay);
    return () => {
      clearTimeout(start);
      clearInterval(timer);
    };
  }, [play, text, delay]);
  return <>{out}</>;
}

function CountUp({
  value,
  play,
  duration = 700,
}: {
  value: number;
  play: boolean;
  duration?: number;
}) {
  const [n, setN] = useState(value);
  useEffect(() => {
    if (!play) return;
    const t0 = performance.now();
    let raf: number;
    const tick = (now: number) => {
      const p = Math.min(1, (now - t0) / duration);
      setN(Math.round(value * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [play, value, duration]);
  return <>{n}</>;
}

/* Scene 2 · Room — projects, sprints, roadmap.
   Steps: 0 sprint table · 1 insight mode · 2 settled.
   All controls are also directly clickable. */

type Tab = "sprint" | "roadmap" | "rfc";
type Mode = "table" | "insight";

const ISSUES = [
  { title: "Auth token refresh loop", assignee: "Maya", pts: 5, status: "In Review" },
  { title: "Rate limiter for public API", assignee: "Kenji", pts: 3, status: "In Progress" },
  { title: "Fix flaky e2e on checkout", assignee: "Priya", pts: 2, status: "Blocked" },
  { title: "Migrate CI to larger runners", assignee: "Sam", pts: 3, status: "Done" },
  { title: "Design tokens for dark mode", assignee: "Ada", pts: 5, status: "In Progress" },
  { title: "Webhook retries with backoff", assignee: "Maya", pts: 2, status: "Done" },
  { title: "Docs: contributor quickstart", assignee: "Leo", pts: 1, status: "Done" },
  { title: "Sunset legacy v1 endpoints", assignee: "Kenji", pts: 8, status: "Todo" },
];

const STATUS_CLASS: Record<string, string> = {
  Todo: styles.stTodo,
  "In Progress": styles.stProgress,
  "In Review": styles.stReview,
  Done: styles.stDone,
  Blocked: styles.stBlocked,
};

const THREAD = [
  { from: "Maya", initials: "M.C", text: "Repro’d — the refresh fires twice when the tab regains focus." },
  { from: "Kenji", initials: "K.T", text: "Same root cause as #388? The listener never unsubscribes." },
  { from: "Maya", initials: "M.C", text: "Yes. PR up — added a single-flight guard around refresh." },
  { from: "ci-bot", initials: "CI", text: "All 214 checks passed on a3f9c12 ✓" },
];

const MILESTONES = [
  { q: "APR", label: "v0.5 — auth overhaul", done: true },
  { q: "MAY", label: "v0.6 — public API GA", done: false },
  { q: "JUN", label: "v1.0 — stable release", done: false },
  { q: "JUL", label: "community launch", done: false },
];

const RFC_BUBBLES = [
  { from: "Ada", initials: "A.L", side: "left", text: "Proposal: move all tokens to a single source of truth in tokens.json." },
  { from: "Sam", initials: "S.W", side: "right", text: "Enjoyed the doc. Curious how theming plugins would consume it." },
  { from: "Ada", initials: "A.L", side: "left", text: "Exported as CSS vars at build — plugins read, never write." },
];

export function Room() {
  const { active, step, visited } = useScene("room");
  const s = active ? step : visited ? 2 : -1;

  const [tab, setTab] = useState<Tab>("sprint");
  const [mode, setMode] = useState<Mode>("table");
  const [thread, setThread] = useState(false);

  /* wheel steps drive the default tour: step 1 flips to insight */
  useEffect(() => {
    if (!active) return;
    if (step === 0) {
      setMode("table");
      setThread(false);
    }
    if (step === 1) {
      setThread(false);
      setMode("insight");
    }
  }, [active, step]);

  const donePts = ISSUES.filter((i) => i.status === "Done").reduce((n, i) => n + i.pts, 0);
  const totalPts = ISSUES.reduce((n, i) => n + i.pts, 0);

  return (
    <section
      className={`${styles.viewport} ${active ? styles.active : ""}`}
      aria-label="Room — a self maintained project space"
    >
      <div className={`${styles.wrapper} ${s >= 0 ? styles.wrapperIn : ""}`}>
        {/* folder tabs */}
        <div className={styles.tabs}>
          {(
            [
              ["sprint", "Sprint 12"],
              ["roadmap", "Roadmap"],
              ["rfc", "RFC Discussion"],
            ] as [Tab, string][]
          ).map(([id, label]) => (
            <button
              key={id}
              className={`${styles.tab} ${tab === id ? styles.tabActive : ""}`}
              onClick={() => {
                setTab(id);
                setThread(false);
              }}
            >
              {label}
            </button>
          ))}
        </div>

        <div className={styles.panel}>
          {tab === "sprint" && (
            <>
              <div className={styles.toolbar}>
                <span className={styles.rowsChip}>
                  <CountUp value={ISSUES.length} play={active} />
                  /42 Issues
                </span>
                <span className={styles.modeToggle}>
                  <button
                    className={mode === "table" ? styles.modeActive : styles.modeBtn}
                    onClick={() => setMode("table")}
                  >
                    Table
                  </button>
                  <span className={styles.modeSlash}>/</span>
                  <button
                    className={mode === "insight" ? styles.modeActive : styles.modeBtn}
                    onClick={() => setMode("insight")}
                  >
                    Insight
                  </button>
                </span>
              </div>

              {mode === "table" ? (
                <div className={styles.table}>
                  <div className={`${styles.tr} ${styles.th}`}>
                    <span>Sources</span>
                    <span>Title</span>
                    <span>Assignee</span>
                    <span>Estimate</span>
                    <span>Status</span>
                  </div>
                  {ISSUES.map((row, i) => (
                    <div
                      key={i}
                      className={styles.tr}
                      style={{ transitionDelay: `${i * 0.05}s` }}
                    >
                      <span>
                        <button
                          className={styles.viewBtn}
                          onClick={() => setThread(true)}
                        >
                          View
                        </button>
                      </span>
                      <span className={styles.tdTitle}>
                        <Scramble text={row.title} play={active} delay={i * 90} />
                      </span>
                      <span className={styles.tdMuted}>
                        <Scramble text={row.assignee} play={active} delay={i * 90 + 120} />
                      </span>
                      <span className={styles.tdMono}>
                        <CountUp value={row.pts} play={active} duration={600 + i * 90} /> pts
                      </span>
                      <span className={STATUS_CLASS[row.status]}>
                        <Scramble text={row.status} play={active} delay={i * 90 + 240} />
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className={styles.insight}>
                  <div className={styles.insightCol}>
                    <div className={styles.bigNumber}>
                      <CountUp value={donePts} play={active && mode === "insight"} />
                      <span className={styles.bigSlash}>/</span>
                      <span className={styles.bigTotal}>{totalPts} pts</span>
                    </div>
                    <div className={styles.dotGrid} aria-label="Burndown">
                      {Array.from({ length: totalPts }).map((_, i) => (
                        <span
                          key={i}
                          className={i < donePts ? styles.dotFilled : styles.dotEmpty}
                          style={{ transitionDelay: `${i * 0.03}s` }}
                        />
                      ))}
                    </div>
                    <span className={styles.dotCaption}>story points burned</span>
                  </div>
                  <div className={styles.summaryBox}>
                    <span className={styles.summaryDot} />
                    <p>
                      The sprint is trending <b>2 points behind</b>; review
                      latency on the auth PRs is the main drag. Focus on
                      unblocking <b>#412</b> and landing the token-refresh fix
                      before Thursday’s planning.
                    </p>
                  </div>
                </div>
              )}

              {/* thread panel */}
              <div className={`${styles.thread} ${thread ? styles.threadIn : ""}`}>
                <button className={styles.threadBack} onClick={() => setThread(false)}>
                  ← Back to table
                </button>
                <div className={styles.threadSubject}>
                  Auth token refresh loop <code>#412</code>
                </div>
                {THREAD.map((m, i) => (
                  <div key={i} className={styles.threadItem}>
                    <span className={styles.threadAvatar}>{m.initials}</span>
                    <div>
                      <div className={styles.threadFrom}>{m.from}</div>
                      <div className={styles.threadBody}>{m.text}</div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {tab === "roadmap" && (
            <div className={styles.timeline}>
              <svg
                className={styles.rail}
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
                aria-hidden
              >
                <polyline
                  points={MILESTONES.map((_, i) => {
                    const x = ((i + 0.5) / MILESTONES.length) * 100;
                    const y = i % 2 === 0 ? 46 : 54;
                    return `${x},${y}`;
                  }).join(" ")}
                  fill="none"
                  stroke="var(--line)"
                  strokeWidth="2"
                  vectorEffect="non-scaling-stroke"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              {MILESTONES.map((m, i) => {
                const x = ((i + 0.5) / MILESTONES.length) * 100;
                const y = i % 2 === 0 ? 46 : 54;
                return (
                  <div
                    key={i}
                    className={styles.milestone}
                    style={{
                      left: `${x}%`,
                      top: `${y}%`,
                      transform: "translate(-50%, -50%)",
                      transitionDelay: `${i * 0.1}s`,
                    }}
                  >
                    <span className={styles.milestoneMonth}>{m.q}</span>
                    <span
                      className={`${styles.milestoneDot} ${m.done ? styles.milestoneDone : ""}`}
                    />
                    <span className={styles.milestoneCard}>{m.label}</span>
                  </div>
                );
              })}
            </div>
          )}

          {tab === "rfc" && (
            <div className={styles.rfc}>
              <div className={styles.bubbles}>
                {RFC_BUBBLES.map((b, i) => (
                  <div
                    key={i}
                    className={`${styles.bubbleRow} ${b.side === "right" ? styles.bubbleRight : ""}`}
                  >
                    <span className={styles.threadAvatar}>{b.initials}</span>
                    <div className={styles.bubble}>{b.text}</div>
                  </div>
                ))}
              </div>
              <div className={styles.consensus}>
                <span className={styles.summaryDot} />
                <p>
                  <b>Consensus forming:</b> single token source, build-time CSS
                  vars. Open question — plugin theming API.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
