"use client";

import { useState } from "react";
import { useEngine, useScene } from "../engine";
import { BellSm, CrateSm, DepHexSm, TicketSm, BotSm } from "../BannerIcons";
import styles from "./brief.module.css";

/* Scene 1 · Brief — the daily standup page.
   Steps: 0 page lands · 1 rows 1-2 · 2 rows 3-5 · 3 FYI · 4 low priority · 5 settled */

type Verdict = "approve" | "changes" | "comment" | null;

function ReplyCard() {
  const [checked, setChecked] = useState(false);
  return (
    <div className={`${styles.replyCard} ${checked ? styles.replySent : ""}`}>
      <span className={styles.staple} aria-hidden />
      <button
        className={styles.replyCheckbox}
        onClick={() => setChecked((c) => !c)}
        aria-label="Post suggested comment"
      >
        {checked ? "✓" : ""}
      </button>
      <span className={styles.replyText}>
        <b>Suggest to Maya:</b> LGTM overall — one question on the token expiry
        path.
      </span>
    </div>
  );
}

function VerdictStamps() {
  const [verdict, setVerdict] = useState<Verdict>(null);
  const stamps: { id: Exclude<Verdict, null>; label: string; cls: string }[] = [
    { id: "approve", label: "APPROVE", cls: styles.stampApprove },
    { id: "changes", label: "CHANGES", cls: styles.stampChanges },
    { id: "comment", label: "COMMENT", cls: styles.stampComment },
  ];
  return (
    <span className={styles.stamps}>
      {stamps.map((s) => (
        <button
          key={s.id}
          className={`${styles.stamp} ${s.cls} ${
            verdict === s.id ? styles.stampDown : ""
          } ${verdict && verdict !== s.id ? styles.stampFaded : ""}`}
          onClick={() => setVerdict(verdict === s.id ? null : s.id)}
        >
          {s.label}
        </button>
      ))}
    </span>
  );
}

const MUST_SEE = [
  {
    initials: "M.C",
    text: (
      <>
        <b>Maya</b> requests review on the <b>auth refactor PR</b> by end of
        today
      </>
    ),
    artifact: <ReplyCard />,
  },
  {
    initials: "CI",
    text: (
      <>
        <b>CI is failing</b> on <code>main</code> after commit{" "}
        <code>a3f9c12</code>
      </>
    ),
    artifact: (
      <span className={styles.marginNote}>
        Added to project
        <br />
        “Release v0.5”
      </span>
    ),
  },
  {
    initials: "K.T",
    text: (
      <>
        <b>Kenji</b> pushes new API design
      </>
    ),
    artifact: (
      <span className={styles.sticky}>
        openapi.yaml
        <br />
        <span className={styles.stickyDiff}>
          <i>+214</i> <em>−9</em>
        </span>
      </span>
    ),
  },
  {
    initials: "P.R",
    text: (
      <>
        <b>Priya</b> hasn’t replied to your review comments on <b>#412</b>
      </>
    ),
    artifact: <span className={styles.pingSticker}>PING REVIEWER</span>,
  },
  {
    initials: "S.W",
    text: (
      <>
        <b>Sam</b> proposed moving sprint planning to <b>Thursday</b>
      </>
    ),
    artifact: <VerdictStamps />,
  },
];

const FYI = [
  { icon: <BellSm />, label: "3 CI Runs" },
  { icon: <CrateSm />, label: "1 Release Draft" },
  { icon: <DepHexSm />, label: "2 Dependabot PRs" },
  { icon: <TicketSm />, label: "1 Meetup RSVP" },
];

export function Brief() {
  const { index, active, step, visited } = useScene("brief");
  const { scene: currentScene } = useEngine();
  const s = active ? step : visited ? 5 : -1;
  /* once the user has scrolled past this scene, slide the whole paper
     stack up and out — revealing the full page — instead of a flat fade */
  const past = currentScene > index;

  return (
    <section
      className={`${styles.viewport} ${active ? styles.active : ""}`}
      aria-label="Brief — your repo standup page"
    >
      <div
        className={`${styles.stack} ${s >= 0 ? styles.stackIn : ""} ${
          past ? styles.stackOut : ""
        }`}
      >
        {/* back sheets — rotated; front paper stays straight */}
        <div className={`${styles.sheet} ${styles.sheetBack}`} aria-hidden />
        <div className={`${styles.sheet} ${styles.sheetMid}`} aria-hidden />
        <div className={styles.notebook}>
        <div className={styles.holes} aria-hidden>
          {Array.from({ length: 12 }).map((_, i) => (
            <span key={i} />
          ))}
        </div>

        <div className={styles.page}>
          {/* MUST SEE */}
          <div className={styles.sectionHeader}>
            <span className={styles.dotMustSee} aria-hidden />
            MUST SEE
          </div>
          {MUST_SEE.map((row, i) => {
            const rowStep = i < 2 ? 1 : 2;
            const shown = s >= rowStep;
            return (
              <div
                key={i}
                className={`${styles.row} ${shown ? styles.rowIn : ""}`}
                style={{ transitionDelay: `${(i % 3) * 0.18}s` }}
              >
                <span className={styles.avatar}>{row.initials}</span>
                <span className={styles.rowText}>{row.text}</span>
                <span className={styles.rowArtifact}>{row.artifact}</span>
              </div>
            );
          })}

          {/* FYI */}
          <div
            className={`${styles.sectionHeader} ${styles.fyiHeader} ${
              s >= 3 ? styles.rowIn : styles.rowHidden
            }`}
          >
            <span className={styles.dotFyi} aria-hidden />
            FYI
          </div>
          <div
            className={`${styles.counters} ${s >= 3 ? styles.rowIn : styles.rowHidden}`}
          >
            {FYI.map((c, i) => (
              <span key={i} className={styles.counter}>
                <span className={styles.counterIcon}>{c.icon}</span>
                {c.label}
                <span className={styles.counterFan} aria-hidden>
                  <span />
                  <span />
                  <span />
                </span>
              </span>
            ))}
            <span className={`${styles.hintCard} ${s >= 3 ? styles.hintCardIn : ""}`}>
              <b>Create a project</b> to track the v0.5 release
            </span>
          </div>

          {/* LOW PRIORITY */}
          <div
            className={`${styles.sectionHeader} ${styles.lowHeader} ${
              s >= 4 ? styles.rowIn : styles.rowHidden
            }`}
          >
            <span className={styles.dotLow} aria-hidden />
            LOW PRIORITY
          </div>
          <div className={`${styles.row} ${s >= 4 ? styles.rowIn : styles.rowHidden}`}>
            <span className={styles.botIcon}>
              <BotSm />
            </span>
            <span className={styles.rowText}>
              <b>12 Bot Notifications</b>
            </span>
          </div>
        </div>
        </div>
      </div>
    </section>
  );
}
