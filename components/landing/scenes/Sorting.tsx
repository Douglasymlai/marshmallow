"use client";

import { useEffect, useState } from "react";
import { useScene } from "../engine";
import styles from "./sorting.module.css";

/* Scene 5 · Sorting — the repo card catalog.
   3×3 cabinet: Issues · Pull Requests · Reviews / Sprints · Releases · CI Runs /
   Discussions · Dependencies · Bots.
   Intro: drawers pop open in a random order one at a time, then all close.
   After the intro, each drawer front is a clickable tab — opening one slides
   out its list and dims (lights-off) every other drawer. */

type Tone = "done" | "progress" | "review" | "blocked" | "todo";

interface DrawerRow {
  label: string;
  value: string;
  tone?: Tone;
}

interface DrawerSpec {
  label: string;
  tint: string;
  header: string;
  rows: DrawerRow[];
}

const DRAWERS: DrawerSpec[] = [
  {
    label: "Issues",
    tint: "var(--tint-pink)",
    header: "OPEN ISSUES",
    rows: [
      { label: "Auth token refresh loop", value: "In Review", tone: "review" },
      { label: "#412 ping reviewer", value: "Blocked", tone: "blocked" },
      { label: "Docs quickstart", value: "Done", tone: "done" },
    ],
  },
  {
    label: "Pull Requests",
    tint: "var(--tint-blue)",
    header: "PULL REQUESTS",
    rows: [
      { label: "auth refactor", value: "Approved", tone: "done" },
      { label: "webhook retries", value: "Changes", tone: "blocked" },
    ],
  },
  {
    label: "Reviews",
    tint: "var(--tint-green)",
    header: "REVIEWS",
    rows: [
      { label: "Priya → #412", value: "Approved", tone: "done" },
      { label: "Kenji → #388", value: "Changes", tone: "blocked" },
    ],
  },
  {
    label: "Sprints",
    tint: "var(--tint-yellow)",
    header: "SPRINT 12",
    rows: [
      { label: "pts committed", value: "21" },
      { label: "pts done", value: "14" },
      { label: "carried over", value: "4" },
      { label: "PRs merged", value: "17" },
      { label: "median cycle", value: "1.8d" },
    ],
  },
  {
    label: "Releases",
    tint: "var(--tint-teal)",
    header: "RELEASES",
    rows: [
      { label: "v0.4.2", value: "Published", tone: "done" },
      { label: "v0.5", value: "Draft", tone: "todo" },
    ],
  },
  {
    label: "CI Runs",
    tint: "var(--tint-lavender)",
    header: "CI RUNS",
    rows: [
      { label: "lint", value: "Pass", tone: "done" },
      { label: "unit tests", value: "Pass", tone: "done" },
      { label: "e2e", value: "Fail", tone: "blocked" },
    ],
  },
  {
    label: "Discussions",
    tint: "var(--tint-blue)",
    header: "DISCUSSIONS",
    rows: [
      { label: "RFC-007 API design", value: "12 replies" },
      { label: "Contributor meetup", value: "8 going" },
    ],
  },
  {
    label: "Dependencies",
    tint: "var(--tint-green)",
    header: "DEPENDENCIES",
    rows: [
      { label: "lodash", value: "→ 4.17.22", tone: "review" },
      { label: "next", value: "→ 15.1", tone: "review" },
    ],
  },
  {
    label: "Bots",
    tint: "var(--tint-lavender)",
    header: "BOTS",
    rows: [
      { label: "dependabot", value: "12 PRs" },
      { label: "ci-bot", value: "214 checks" },
    ],
  },
];

const TONE_CLASS: Record<Tone, string> = {
  done: styles.toneDone,
  progress: styles.toneProgress,
  review: styles.toneReview,
  blocked: styles.toneBlocked,
  todo: styles.toneTodo,
};

/* Fisher-Yates shuffle */
function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function DrawerList({ spec, open }: { spec: DrawerSpec; open: boolean }) {
  return (
    <div
      className={`${styles.list} ${open ? styles.listOut : ""}`}
      aria-hidden={!open}
    >
      <span className={styles.listHeader}>{spec.header}</span>
      {spec.rows.map((r, i) => (
        <span key={i} className={styles.listRow}>
          <span>{r.label}</span>
          <span className={r.tone ? TONE_CLASS[r.tone] : undefined}>
            {r.value}
          </span>
        </span>
      ))}
    </div>
  );
}

/* intro plays in exactly 4 quick steps; each step pops a group of drawers
   (some open together) then closes them again */
const INTRO_GROUP_SIZES = [2, 3, 2, 2];

export function Sorting() {
  const { active, visited } = useScene("sorting");

  const [introSet, setIntroSet] = useState<number[]>([]);
  const [introDone, setIntroDone] = useState(false);
  const [activeDrawer, setActiveDrawer] = useState<number | null>(null);

  /* randomized quick open/close intro — 4 steps, no overlay, no list content,
     just the folder fronts flipping. Replays every time the scene becomes
     active so scrolling in always shows the flourish. */
  useEffect(() => {
    if (!active) {
      setIntroSet([]);
      setIntroDone(false);
      setActiveDrawer(null);
      return;
    }
    setIntroDone(false);
    setActiveDrawer(null);
    setIntroSet([]);
    const order = shuffle([0, 1, 2, 3, 4, 5, 6, 7, 8]);
    const groups: number[][] = [];
    let idx = 0;
    for (const size of INTRO_GROUP_SIZES) {
      groups.push(order.slice(idx, idx + size));
      idx += size;
    }
    const timers: ReturnType<typeof setTimeout>[] = [];
    let t = 250;
    groups.forEach((group) => {
      timers.push(setTimeout(() => setIntroSet(group), t));
      t += 360; // quick open hold
      timers.push(setTimeout(() => setIntroSet([]), t));
      t += 160; // gap before next step
    });
    timers.push(setTimeout(() => setIntroDone(true), t));
    return () => timers.forEach(clearTimeout);
  }, [active]);

  /* clicking anywhere that is not the open tab closes it */
  const closeAll = () => {
    if (introDone) setActiveDrawer(null);
  };

  return (
    <section
      className={`${styles.viewport} ${active ? styles.active : ""}`}
      aria-label="Sorting — a workspace that sorts itself"
      onClick={closeAll}
    >
      <div
        className={`${styles.cabinet} ${active || visited ? styles.cabinetIn : ""}`}
      >
        {DRAWERS.map((d, i) => {
          /* peek = lightweight intro pop (front only); open = full click-open
             (front + sliding list + dims the rest) */
          const peeking = !introDone && introSet.includes(i);
          const open = introDone && activeDrawer === i;
          const dimmed =
            introDone && activeDrawer !== null && activeDrawer !== i;
          return (
            <div
              key={d.label}
              className={`${styles.drawer} ${open ? styles.open : ""} ${
                peeking ? styles.peek : ""
              } ${dimmed ? styles.dimmed : ""}`}
            >
              <DrawerList spec={d} open={open} />

              {/* drawer front — clickable tab. Clicking another tab switches
                  to it (closes current, opens new); clicking the open tab
                  closes it; clicking the backdrop (section) closes it. */}
              <button
                type="button"
                className={styles.front}
                onClick={(e) => {
                  if (!introDone) return;
                  e.stopPropagation();
                  setActiveDrawer((cur) => (cur === i ? null : i));
                }}
                aria-expanded={open}
                aria-label={`${d.label} drawer`}
              >
                <span
                  className={styles.labelPlate}
                  style={{ background: d.tint }}
                >
                  {d.label}
                </span>
                <span className={styles.keyhole} aria-hidden />
                <span className={styles.handle} aria-hidden />
              </button>
            </div>
          );
        })}
      </div>
    </section>
  );
}
