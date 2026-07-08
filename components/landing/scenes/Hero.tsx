"use client";

import { useEffect, useRef, useState } from "react";
import { useScene } from "../engine";
import { BrandGlyph } from "../Marshmallow";
import styles from "./hero.module.css";

/* Scene 0 · Hero — repo-life items in two rings around "Got Issues?".
   Flat, bold, solid-color silhouettes (per item-image references).
   Hover the bubble → items fold in behind it, then pop back out on
   top one by one, slowly, in order. */

interface CardSpec {
  x: number; // % of viewport
  y: number;
  tilt: number;
  delay: number;
  node: React.ReactNode;
}

/* ── inner ring ── */

function Lgtm() {
  return <div className={styles.lgtm}>LGTM ✓</div>;
}

function CloverBlob() {
  return (
    <div className={styles.clover}>
      <svg viewBox="0 0 140 140" aria-hidden>
        <g fill="#8ba3b8">
          <circle cx="45" cy="45" r="38" />
          <circle cx="95" cy="45" r="38" />
          <circle cx="45" cy="95" r="38" />
          <circle cx="95" cy="95" r="38" />
          <rect x="35" y="35" width="70" height="70" />
        </g>
      </svg>
      <div className={styles.cloverText}>
        <b>48</b>
        checks
        <br />
        passing
      </div>
    </div>
  );
}

function Mugs() {
  return (
    <svg viewBox="0 0 150 150" className={styles.mugs} aria-hidden={false} aria-label="Pair programming mugs">
      <g fill="#9c8a85">
        {/* top mug, tilted */}
        <g transform="rotate(-9 75 45)">
          <rect x="38" y="16" width="80" height="52" rx="10" />
          <path d="M38 30 a 16 16 0 1 0 0 30 z" />
        </g>
        {/* bottom mug */}
        <rect x="34" y="76" width="82" height="60" rx="12" />
        <path d="M116 86 a 17 17 0 1 1 0 36 z" />
      </g>
      <text x="76" y="48" textAnchor="middle" className={styles.mugText} transform="rotate(-9 75 45)">
        Maya
      </text>
      <text x="74" y="112" textAnchor="middle" className={styles.mugText}>
        Kenji
      </text>
    </svg>
  );
}

function RoundTag() {
  return (
    <svg viewBox="0 0 120 130" className={styles.roundTag} aria-label="#412 bug tag">
      <circle cx="60" cy="72" r="52" fill="#b3b3b0" />
      <circle cx="60" cy="24" r="13" fill="#b3b3b0" />
      <circle cx="60" cy="24" r="6" fill="var(--cream)" />
      <path id="tagArc" d="M20 88 A 46 46 0 0 0 100 88" fill="none" />
      <text className={styles.roundTagText}>
        <textPath href="#tagArc" startOffset="50%" textAnchor="middle">
          #412 BUG
        </textPath>
      </text>
    </svg>
  );
}

function DependabotNote() {
  return (
    <div className={styles.depNote}>
      <span className={styles.depIcon}>⌬</span>
      dependabot
      <br />
      bumps lodash
    </div>
  );
}

function FoldedSquare() {
  return (
    <div className={styles.folded}>
      <span className={styles.penStroke} aria-hidden />
      <span className={styles.foldedTitle}>
        PR
        <br />
        #128
      </span>
      <span className={styles.foldedStatus}>• Merged</span>
    </div>
  );
}

function Bell() {
  return (
    <svg viewBox="0 0 130 120" className={styles.bell} aria-label="CI Alert bell">
      <circle cx="65" cy="12" r="8" fill="#f0b429" />
      <circle cx="65" cy="12" r="3.5" fill="var(--cream)" />
      <path
        d="M65 14 C 38 16, 28 42, 27 66 L 18 92 C 18 96, 22 98, 26 98 L 104 98 C 108 98, 112 96, 112 92 L 103 66 C 102 42, 92 16, 65 14 Z"
        fill="#f0b429"
      />
      <path d="M50 104 a 15 12 0 0 0 30 0 Z" fill="#f0b429" />
      <path id="bellArc" d="M32 62 A 42 42 0 0 1 98 62" fill="none" />
      <text className={styles.bellText}>
        <textPath href="#bellArc" startOffset="50%" textAnchor="middle">
          CI Alert
        </textPath>
      </text>
    </svg>
  );
}

function AngledTag() {
  return (
    <div className={styles.angledTag}>
      <span className={styles.penTick} aria-hidden />
      <span className={styles.angledTitle}>Issue 366</span>
      <span className={styles.angledStatus}>• Closed</span>
    </div>
  );
}

/* ── outer ring ── */

function RepoHouse() {
  return (
    <svg viewBox="0 0 150 140" className={styles.house} aria-label="Repo octo/quill">
      <g fill="#2d6a94">
        <rect x="104" y="18" width="14" height="30" />
        <path d="M8 68 L75 12 L142 68 Z" />
        <rect x="24" y="64" width="102" height="70" />
      </g>
      <g fill="#f3c650">
        {[0, 1, 2].map((r) =>
          [0, 1, 2].map((c) => (
            <rect key={`${r}${c}`} x={40 + c * 11} y={74 + r * 11} width="8" height="8" />
          )),
        )}
      </g>
      <text x="40" y="116" className={styles.houseText}>
        octo
      </text>
      <text x="40" y="129" className={styles.houseText}>
        /quill
      </text>
    </svg>
  );
}

function PaperPlane() {
  return (
    <svg viewBox="0 0 210 140" className={styles.plane} aria-label="To reviewers">
      <g fill="#f5c24e">
        <path d="M10 62 L 200 68 L 40 12 Z" />
        <path d="M10 74 L 200 68 L 48 128 Z" />
      </g>
      <text x="58" y="112" className={styles.planeText} transform="rotate(-13 58 112)">
        To reviewers:
      </text>
    </svg>
  );
}

function DeployTicket() {
  return (
    <div className={styles.ticket}>
      <div className={styles.ticketTop}>
        <span>APR 16</span>
        <span>18:45</span>
      </div>
      <div className={styles.ticketRoute}>
        <span>STG</span>
        <svg width="34" height="10" viewBox="0 0 30 10" aria-hidden>
          <path d="M1 5 H 25 M 20 1.5 L 26 5 L 20 8.5" stroke="#cfe0f5" strokeWidth="1.6" fill="none" />
        </svg>
        <span>PROD</span>
      </div>
    </div>
  );
}

const STAR_SEAL_POINTS = Array.from({ length: 40 }, (_, i) => {
  const a = (i / 40) * Math.PI * 2;
  const r = i % 2 === 0 ? 60 : 53;
  return `${(70 + r * Math.cos(a)).toFixed(1)},${(70 + r * Math.sin(a)).toFixed(1)}`;
}).join(" ");

function StarSeal() {
  const points = STAR_SEAL_POINTS;
  return (
    <svg viewBox="0 0 140 140" className={styles.starSeal} aria-label="128 new stars">
      <polygon points={points} fill="#e8d78a" />
      <text x="70" y="62" textAnchor="middle" className={styles.starGlyphSvg}>
        ✦
      </text>
      <text x="70" y="82" textAnchor="middle" className={styles.starSealText}>
        128
      </text>
      <text x="70" y="97" textAnchor="middle" className={styles.starSealSub}>
        new stars
      </text>
    </svg>
  );
}

function ConflictPaper() {
  return (
    <div className={styles.conflict}>
      <span>{"<<<<<<<"}</span>
      <span className={styles.conflictMid}>merge conflict</span>
      <span>{">>>>>>>"}</span>
    </div>
  );
}

function PatchReceipt() {
  return (
    <div className={styles.receipt}>
      <svg className={styles.paperclip} viewBox="0 0 28 44" aria-hidden>
        <path
          d="M8 12 a 6 6 0 0 1 12 0 v 20 a 4 4 0 0 1 -8 0 v-16"
          fill="none"
          stroke="#e8603c"
          strokeWidth="4.5"
          strokeLinecap="round"
        />
      </svg>
      <span className={styles.receiptRule} />
      <span className={styles.receiptText}>
        Patch V3.
        <br />
        diff
      </span>
    </div>
  );
}

function RuledDoc() {
  return (
    <div className={styles.ruledDoc}>
      <span className={styles.docHoles} aria-hidden>
        {Array.from({ length: 5 }).map((_, i) => (
          <i key={i} />
        ))}
      </span>
      <div className={styles.ruledBody}>
        <span className={styles.ruledTitle}>RFC-007</span>
        <span className={styles.ruledTitle}>API Design</span>
        <span className={styles.ruledLine} />
        <span className={styles.ruledLine} />
        <span className={styles.ruledLine} />
      </div>
    </div>
  );
}

function OverlapSquares() {
  return (
    <div className={styles.overlap}>
      <span className={styles.overlapText}>
        New Release
        <br />
        Available Online
      </span>
    </div>
  );
}

function MeetupBadge() {
  return (
    <div className={styles.eventBadge}>
      contributor
      <br />
      meetup · Thu
    </div>
  );
}

function OrnateCard() {
  return (
    <div className={styles.ornate}>
      <span className={styles.ornateTab} aria-hidden />
      <span className={styles.ornateText}>
        Talk Proposal
        <br />
        Accepted
      </span>
      <span className={styles.ornateRule} aria-hidden />
    </div>
  );
}

function ChecksPassed() {
  return (
    <div className={styles.checksRect}>
      All checks
      <br />
      passed
    </div>
  );
}

function ReleaseCrate() {
  return (
    <div className={styles.crate}>
      <div className={styles.crateLid} />
      <span className={styles.crateVersion}>v0.4.2</span>
      <span className={styles.cratePill}>Published</span>
    </div>
  );
}

/* two rings: 8 inner + 12 outer, center kept clear for the bubble */
const CARDS: CardSpec[] = [
  /* inner ring */
  { x: 72, y: 38, tilt: 5, delay: 0.2, node: <Lgtm /> },
  { x: 73, y: 62, tilt: -4, delay: 0.55, node: <CloverBlob /> },
  { x: 59, y: 76, tilt: 6, delay: 0.85, node: <Mugs /> },
  { x: 41, y: 76, tilt: -7, delay: 0.35, node: <RoundTag /> },
  { x: 27, y: 62, tilt: 4, delay: 0.7, node: <DependabotNote /> },
  { x: 28, y: 38, tilt: -5, delay: 0.15, node: <FoldedSquare /> },
  { x: 41, y: 24, tilt: 6, delay: 0.95, node: <Bell /> },
  { x: 59, y: 24, tilt: -4, delay: 0.45, node: <AngledTag /> },
  /* outer ring */
  { x: 90, y: 60, tilt: -4, delay: 0.3, node: <RepoHouse /> },
  { x: 80, y: 79, tilt: 5, delay: 0.75, node: <PaperPlane /> },
  { x: 61, y: 90, tilt: -3, delay: 0.5, node: <DeployTicket /> },
  { x: 39, y: 90, tilt: 6, delay: 1.0, node: <StarSeal /> },
  { x: 20, y: 79, tilt: -6, delay: 0.25, node: <ConflictPaper /> },
  { x: 8, y: 60, tilt: 4, delay: 0.6, node: <PatchReceipt /> },
  { x: 8, y: 38, tilt: -5, delay: 0.9, node: <RuledDoc /> },
  { x: 20, y: 20, tilt: 5, delay: 0.4, node: <OverlapSquares /> },
  { x: 39, y: 10, tilt: -4, delay: 0.8, node: <MeetupBadge /> },
  { x: 61, y: 10, tilt: 4, delay: 0.1, node: <OrnateCard /> },
  { x: 80, y: 20, tilt: -6, delay: 0.65, node: <ChecksPassed /> },
  { x: 91, y: 38, tilt: 5, delay: 0.5, node: <ReleaseCrate /> },
];

const POP_INTERVAL = 2200;
const FOLD_DURATION = 950;

export function Hero() {
  const { active, step } = useScene("hero");
  const released = !active || step >= 1;

  const [hovered, setHovered] = useState(false);
  const [popIndex, setPopIndex] = useState(-1);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  /* hover → gather; once folded, pop cards on top one by one in order */
  useEffect(() => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
    if (!hovered) {
      setPopIndex(-1);
      return;
    }
    const start = setTimeout(() => {
      setPopIndex(0);
      let i = 0;
      const tick = () => {
        i += 1;
        setPopIndex(i % CARDS.length);
        timers.current.push(setTimeout(tick, POP_INTERVAL));
      };
      timers.current.push(setTimeout(tick, POP_INTERVAL));
    }, FOLD_DURATION);
    timers.current.push(start);
    return () => timers.current.forEach(clearTimeout);
  }, [hovered]);

  return (
    <section
      className={`${styles.viewport} ${active ? styles.active : ""}`}
      aria-label="Marshmallow — Vibe Coding?"
    >
      <div
        className={`${styles.field} ${hovered ? styles.gathered : ""} ${
          released ? styles.releasedField : ""
        }`}
      >
        {CARDS.map((c, i) => {
          /* seeded per-item hover twist: random-feeling but SSR-stable */
          let rot = ((i * 137 + 41) % 61) - 30; // -30..30 deg
          if (Math.abs(rot) < 10) rot += rot >= 0 ? 12 : -12;
          const dx = ((i * 89 + 17) % 25) - 12; // -12..12 px
          const dy = ((i * 53 + 29) % 25) - 12;
          return (
            <div
              key={i}
              className={`${styles.cardSlot} ${
                popIndex === i ? styles.popped : ""
              }`}
              style={
                {
                  "--x": `${c.x}%`,
                  "--y": `${c.y}%`,
                  "--tilt": `${c.tilt}deg`,
                  "--fly-delay": `${c.delay}s`,
                  "--gather-delay": `${i * 0.035}s`,
                  "--hover-rot": `${rot}deg`,
                  "--hover-dx": `${dx}px`,
                  "--hover-dy": `${dy}px`,
                } as React.CSSProperties
              }
            >
              <div className={styles.card}>{c.node}</div>
            </div>
          );
        })}
      </div>

      {/* bubble dead-center on screen */}
      <div className={styles.center}>
        <div
          className={styles.bubble}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          {/* dashed pill outline with wide gaps (SVG: dash spacing is tunable) */}
          <svg className={styles.bubbleOutline} aria-hidden>
            <rect className={styles.bubbleOutlineRect} />
          </svg>
          <span className={styles.bubbleText}>Vibe Coding?</span>
        </div>
      </div>

      <div className={`${styles.wordmark} ${released ? styles.wordmarkVisible : ""}`}>
        <BrandGlyph size={30} />
        <span>Marshmallow</span>
      </div>

      {/* fixed at the bottom of the hero */}
      <div className={styles.scrollHint}>scroll</div>
    </section>
  );
}
