"use client";

import { useRef, useState } from "react";
import { useScene } from "../engine";
import styles from "./people.module.css";

/* Scene 4 · Contributor Wiki — draggable contributor stamps,
   attribute callouts, and an event badge strip.
   Steps: 0 stamps in · 1 attributes pop · 2 badges slap in. */

interface Person {
  name: string;
  tint: string;
  rotate: number;
  x: number; // % of stage
  y: number;
  face: { skin: string; hair: string; hairStyle: "curls" | "bob" | "beard" };
  attrs: string[];
}

const PEOPLE: Person[] = [
  {
    name: "Maya Chen",
    tint: "#f2e3cf",
    rotate: -3,
    x: 47,
    y: 34,
    face: { skin: "#e8b98d", hair: "#3f3a35", hairStyle: "bob" },
    attrs: ["maintainer since 2024", "owns auth/", "fastest reviewer", "UTC−8"],
  },
  {
    name: "Kenji Tanaka",
    tint: "#e6e0f0",
    rotate: -8,
    x: 24,
    y: 58,
    face: { skin: "#eec9a2", hair: "#26221f", hairStyle: "curls" },
    attrs: ["API steward", "prefers small PRs", "UTC+9"],
  },
  {
    name: "Sam Weaver",
    tint: "#dce8f6",
    rotate: 7,
    x: 70,
    y: 60,
    face: { skin: "#e3a983", hair: "#6b4b30", hairStyle: "beard" },
    attrs: ["release captain", "3 talks given", "UTC+1"],
  },
];

const BADGES = ["FIRST PR 🎉", "HACKTOBERFEST ×4", "SPEAKER", "1,000th COMMIT"];

function Face({ face }: { face: Person["face"] }) {
  return (
    <svg viewBox="0 0 80 80" className={styles.face} aria-hidden>
      {/* shoulders */}
      <path d="M12 80 C 16 62, 30 56, 40 56 C 50 56, 64 62, 68 80 Z" fill={face.hair === "#6b4b30" ? "#41564a" : "#7d6b8f"} opacity="0.75" />
      {/* head */}
      <ellipse cx="40" cy="34" rx="17" ry="20" fill={face.skin} />
      {/* hair */}
      {face.hairStyle === "bob" && (
        <path d="M22 36 C 20 16, 32 10, 40 10 C 48 10, 60 16, 58 36 C 56 24, 50 20, 40 20 C 30 20, 24 24, 22 36 Z" fill={face.hair} />
      )}
      {face.hairStyle === "curls" && (
        <path d="M23 30 C 18 14, 34 6, 42 8 C 52 4, 62 14, 57 30 C 54 18, 47 16, 40 17 C 33 16, 26 18, 23 30 Z" fill={face.hair} />
      )}
      {face.hairStyle === "beard" && (
        <>
          <path d="M23 30 C 22 14, 34 9, 40 9 C 46 9, 58 14, 57 30 C 54 18, 46 17, 40 17 C 34 17, 26 18, 23 30 Z" fill={face.hair} />
          <path d="M28 42 C 30 52, 36 55, 40 55 C 44 55, 50 52, 52 42 C 50 48, 45 50, 40 50 C 35 50, 30 48, 28 42 Z" fill={face.hair} />
        </>
      )}
      {/* eyes + smile */}
      <circle cx="33" cy="36" r="1.8" fill="#3a332c" />
      <circle cx="47" cy="36" r="1.8" fill="#3a332c" />
      <path d="M35 45 Q 40 48, 45 45" stroke="#3a332c" strokeWidth="1.5" fill="none" strokeLinecap="round" />
    </svg>
  );
}

function Stamp({ person, popped }: { person: Person; popped: boolean }) {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const start = useRef({ px: 0, py: 0, x: 0, y: 0 });

  return (
    <div
      className={`${styles.stampWrap} ${dragging ? styles.dragging : ""}`}
      style={
        {
          left: `${person.x}%`,
          top: `${person.y}%`,
          "--rot": `${person.rotate}deg`,
          transform: `translate(calc(-50% + ${pos.x}px), calc(-50% + ${pos.y}px))`,
        } as React.CSSProperties
      }
      onPointerDown={(e) => {
        (e.target as HTMLElement).setPointerCapture(e.pointerId);
        start.current = { px: e.clientX, py: e.clientY, x: pos.x, y: pos.y };
        setDragging(true);
      }}
      onPointerMove={(e) => {
        if (!dragging) return;
        setPos({
          x: start.current.x + e.clientX - start.current.px,
          y: start.current.y + e.clientY - start.current.py,
        });
      }}
      onPointerUp={() => setDragging(false)}
    >
      <div className={styles.stamp} style={{ background: person.tint }}>
        <Face face={person.face} />
      </div>
      <span className={styles.nameLabel}>{person.name}</span>
      {person.attrs.map((a, i) => (
        <span
          key={i}
          className={`${styles.attr} ${popped ? styles.attrIn : ""}`}
          style={
            {
              "--ax": `${[-108, 108, -96, 112][i % 4]}px`,
              "--ay": `${[-64, -44, 62, 48][i % 4]}px`,
              transitionDelay: `${0.15 + i * 0.12}s`,
            } as React.CSSProperties
          }
        >
          {a}
        </span>
      ))}
    </div>
  );
}

export function People() {
  const { active, step, visited } = useScene("people");
  const s = active ? step : visited ? 2 : -1;

  return (
    <section
      className={`${styles.viewport} ${active ? styles.active : ""}`}
      aria-label="Contributor Wiki"
    >
      <div className={`${styles.stage} ${s >= 0 ? styles.stageIn : ""}`}>
        {PEOPLE.map((p) => (
          <Stamp key={p.name} person={p} popped={s >= 1} />
        ))}

        <div className={`${styles.badgeStrip} ${s >= 2 ? styles.badgeStripIn : ""}`}>
          {BADGES.map((b, i) => (
            <span
              key={b}
              className={styles.badge}
              style={{ animationDelay: `${i * 0.14}s` }}
            >
              {b}
            </span>
          ))}
        </div>

        <span className={styles.dragHint}>drag the stamps ✍</span>
      </div>
    </section>
  );
}
