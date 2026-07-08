"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./cursor.module.css";

/* Custom cursor: the marshmallow mascot follows the pointer. On every click
   the three sparkle lines flash at its top-right. Only enabled for fine
   (mouse) pointers; touch devices keep their native behavior. */
export function MarshmallowCursor() {
  const ref = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);
  const [flashes, setFlashes] = useState(0);

  useEffect(() => {
    if (
      typeof window === "undefined" ||
      !window.matchMedia("(pointer: fine)").matches
    ) {
      return;
    }
    setEnabled(true);
    document.body.classList.add("marshmallow-cursor");

    const move = (e: MouseEvent) => {
      const el = ref.current;
      if (el) el.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
    };
    const down = () => setFlashes((f) => f + 1);

    window.addEventListener("mousemove", move);
    window.addEventListener("mousedown", down);
    return () => {
      document.body.classList.remove("marshmallow-cursor");
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mousedown", down);
    };
  }, []);

  if (!enabled) return null;

  return (
    <div ref={ref} className={styles.cursor} aria-hidden>
      <svg width="30" height="39" viewBox="0 0 40 52" fill="none">
        {/* sparkle, flashes on each click */}
        {flashes > 0 && (
          <g
            key={flashes}
            className={styles.sparkle}
            stroke="#f2c14e"
            strokeWidth="1.6"
            strokeLinecap="round"
          >
            <path d="M32 8 L33.5 5" />
            <path d="M35 11 L38 10" />
            <path d="M34 15 L37 16.5" />
          </g>
        )}

        {/* marshmallow body + face */}
        <g transform="rotate(-8 20 25)">
          <rect
            x="7"
            y="11"
            width="26"
            height="30"
            rx="9"
            fill="#fdfcf8"
            stroke="#c9b7a4"
            strokeWidth="1.6"
          />
          <path
            d="M12 19 C 16 23, 24 23, 29 18"
            stroke="#c9b7a4"
            strokeWidth="1"
            fill="none"
            opacity="0.7"
          />
          <g
            stroke="#c9b7a4"
            strokeWidth="1"
            opacity="0.55"
            strokeLinecap="round"
          >
            <path d="M12 33 q-0.4 2 0 3.4" />
            <path d="M14.2 34.4 q-0.3 1.4 0 2.4" />
          </g>
          <ellipse cx="14" cy="30" rx="2.4" ry="1.7" fill="#f4a9c0" />
          <ellipse cx="26" cy="30" rx="2.4" ry="1.7" fill="#f4a9c0" />
          <circle cx="17" cy="27" r="1.7" fill="#4a3a34" />
          <circle cx="23" cy="27" r="1.7" fill="#4a3a34" />
          <path
            d="M17.4 30.4 Q20 33 22.6 30.4"
            stroke="#4a3a34"
            strokeWidth="1.3"
            fill="none"
            strokeLinecap="round"
          />
        </g>
      </svg>
    </div>
  );
}
