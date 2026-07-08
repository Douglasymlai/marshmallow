"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

/* Scene state machine: page never scrolls natively — wheel/touch/keys
   advance a flat step counter that maps to (scene, localStep). */

export const SCENES = [
  { id: "hero", steps: 2 },
  { id: "brief", steps: 6 },
  { id: "room", steps: 3 },
  { id: "search", steps: 6 },
  { id: "people", steps: 3 },
  { id: "sorting", steps: 3 },
  { id: "footer", steps: 1 },
] as const;

export type SceneId = (typeof SCENES)[number]["id"];

const TOTAL_STEPS = SCENES.reduce((n, s) => n + s.steps, 0);

function locate(flat: number): { scene: number; step: number } {
  let rest = flat;
  for (let i = 0; i < SCENES.length; i++) {
    if (rest < SCENES[i].steps) return { scene: i, step: rest };
    rest -= SCENES[i].steps;
  }
  return { scene: SCENES.length - 1, step: SCENES[SCENES.length - 1].steps - 1 };
}

interface EngineState {
  flat: number;
  scene: number;
  step: number;
  dir: 1 | -1;
  maxFlat: number; // furthest point reached (for one-time entrance animations)
  advance: (d: 1 | -1) => void;
  goToScene: (id: SceneId) => void;
}

const EngineContext = createContext<EngineState | null>(null);

export function useEngine(): EngineState {
  const ctx = useContext(EngineContext);
  if (!ctx) throw new Error("useEngine outside <Stage>");
  return ctx;
}

/* Per-scene helper */
export function useScene(id: SceneId) {
  const { scene, step, dir, maxFlat } = useEngine();
  const index = SCENES.findIndex((s) => s.id === id);
  let before = 0;
  for (let i = 0; i < index; i++) before += SCENES[i].steps;
  const visited = maxFlat >= before;
  return {
    index,
    active: scene === index,
    /* local step; scenes past show their final step, scenes ahead show -1 */
    step: scene === index ? step : scene > index ? SCENES[index].steps - 1 : -1,
    dir,
    visited,
  };
}

export function Stage({ children }: { children: React.ReactNode }) {
  const [flat, setFlat] = useState(0);
  const [dir, setDir] = useState<1 | -1>(1);
  const maxFlatRef = useRef(0);
  const lockRef = useRef(0);
  const accRef = useRef(0);
  const touchYRef = useRef<number | null>(null);

  const advance = useCallback((d: 1 | -1) => {
    const now = Date.now();
    if (now - lockRef.current < 450) return;
    lockRef.current = now;
    setDir(d);
    setFlat((f) => {
      const next = Math.min(TOTAL_STEPS - 1, Math.max(0, f + d));
      maxFlatRef.current = Math.max(maxFlatRef.current, next);
      return next;
    });
  }, []);

  const goToScene = useCallback((id: SceneId) => {
    let before = 0;
    for (const s of SCENES) {
      if (s.id === id) break;
      before += s.steps;
    }
    lockRef.current = Date.now();
    setDir(1);
    maxFlatRef.current = Math.max(maxFlatRef.current, before);
    setFlat(before);
  }, []);

  useEffect(() => {
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      accRef.current += e.deltaY;
      if (Math.abs(accRef.current) > 90) {
        advance(accRef.current > 0 ? 1 : -1);
        accRef.current = 0;
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (["ArrowDown", "PageDown", " "].includes(e.key)) advance(1);
      if (["ArrowUp", "PageUp"].includes(e.key)) advance(-1);
    };
    const onTouchStart = (e: TouchEvent) => {
      touchYRef.current = e.touches[0].clientY;
    };
    const onTouchMove = (e: TouchEvent) => {
      e.preventDefault();
      if (touchYRef.current === null) return;
      const dy = touchYRef.current - e.touches[0].clientY;
      if (Math.abs(dy) > 55) {
        advance(dy > 0 ? 1 : -1);
        touchYRef.current = e.touches[0].clientY;
      }
    };
    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("keydown", onKey);
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: false });
    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
    };
  }, [advance]);

  const { scene, step } = locate(flat);

  const value = useMemo<EngineState>(
    () => ({ flat, scene, step, dir, maxFlat: maxFlatRef.current, advance, goToScene }),
    [flat, scene, step, dir, advance, goToScene],
  );

  return (
    <EngineContext.Provider value={value}>
      <div
        className="dotted"
        style={{
          position: "fixed",
          inset: 0,
          overflow: "hidden",
          backgroundColor: "var(--cream)",
        }}
      >
        {children}
      </div>
    </EngineContext.Provider>
  );
}
