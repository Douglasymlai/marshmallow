"use client";

import { useEngine, SCENES } from "./engine";
import { BrandGlyph, MarshmallowFace } from "./Marshmallow";
import {
  MergedDot,
  FlagPennant,
  NudgeHand,
  FlowerBloom,
  ToolsTrio,
  ClockFace,
  SpiralCoil,
  AskCard,
  ContactCard,
  TinyMonitor,
  WaveHand,
  SortArrows,
  ThreadSpool,
  IdeaBulb,
} from "./BannerIcons";
import styles from "./chrome.module.css";

/* Banner config — title + tagline per chapter (Brief..Sorting).
   Inline items are illustrated stickers, never emoji or glyph fonts. */
const BANNERS: { scene: string; title: string; desc: React.ReactNode }[] = [
  {
    scene: "brief",
    title: "Brief",
    desc: (
      <>
        Clears what’s merged <MergedDot />, keeps what blocks <FlagPennant />,
        and nudges what needs review <NudgeHand />.
      </>
    ),
  },
  {
    scene: "room",
    title: "Room",
    desc: (
      <>
        A self maintained <FlowerBloom /> project space <ToolsTrio /> built for
        your repos.
      </>
    ),
  },
  {
    scene: "search",
    title: "Search",
    desc: (
      <>
        Save time <ClockFace /> and sanity <SpiralCoil /> with a single ask{" "}
        <AskCard />.
      </>
    ),
  },
  {
    scene: "people",
    title: "Contributor Wiki",
    desc: (
      <>
        Your contributors <ContactCard />, enriched with their work{" "}
        <TinyMonitor /> and past reviews <WaveHand />.
      </>
    ),
  },
  {
    scene: "sorting",
    title: "Sorting",
    desc: (
      <>
        A workspace that sorts <SortArrows />, merges <ThreadSpool />, and
        surfaces insights <IdeaBulb />, on its own.
      </>
    ),
  },
];

/* short label per section for the left-side indicator */
const SECTION_LABELS: Record<string, string> = {
  hero: "Home",
  brief: "Brief",
  room: "Room",
  search: "Search",
  people: "People",
  sorting: "Sorting",
  footer: "End",
};

export function Chrome() {
  const { scene, goToScene } = useEngine();
  const sceneId = SCENES[scene].id;
  const bannerIndex = BANNERS.findIndex((b) => b.scene === sceneId);
  const showChrome = sceneId !== "hero";
  /* indicator only shows on the middle sections (brief..sorting) */
  const showNav = scene > 0 && scene < SCENES.length - 1;

  return (
    <>
      {/* brand mark, top-left */}
      <button
        className={`${styles.brand} ${showChrome ? styles.brandVisible : ""}`}
        onClick={() => goToScene("hero")}
        aria-label="Back to top"
      >
        <BrandGlyph size={24} />
        <span className={styles.brandName}>Marshmallow</span>
      </button>

      {/* chapter banner, top-center */}
      <div className={styles.banner} aria-hidden>
        {BANNERS.map((b, i) => (
          <div
            key={b.title}
            className={styles.bannerLayer}
            style={{
              opacity: i === bannerIndex ? 1 : 0,
              transform:
                i === bannerIndex
                  ? "translateY(0)"
                  : i < bannerIndex
                    ? "translateY(-16px)"
                    : "translateY(10px)",
            }}
          >
            <span className={styles.bannerTitle}>{b.title}</span>
            <span className={styles.bannerDivider} />
            <span className={styles.bannerDesc}>{b.desc}</span>
          </div>
        ))}
      </div>

      {/* feather pill, top-right */}
      <button
        className={`${styles.pill} ${showChrome ? styles.pillVisible : ""}`}
        onClick={() => goToScene("hero")}
        aria-label="Return to start"
      >
        <MarshmallowFace size={26} />
      </button>

      {/* section indicator — one marshmallow per middle section (brief..
          sorting), fixed left. Hidden on the first and last sections; only
          the current section shows the two dots inside. */}
      <nav
        className={`${styles.sectionNav} ${showNav ? styles.sectionNavVisible : ""}`}
        aria-label="Sections"
      >
        {SCENES.map((sc, i) => {
          if (i === 0 || i === SCENES.length - 1) return null;
          return (
            <button
              key={sc.id}
              className={`${styles.sectionDot} ${
                i === scene ? styles.sectionDotActive : ""
              }`}
              onClick={() => goToScene(sc.id)}
              aria-label={SECTION_LABELS[sc.id]}
              aria-current={i === scene ? "true" : undefined}
            >
              <span className={styles.sectionMark}>
                <BrandGlyph size={16} dots={i === scene} />
              </span>
            </button>
          );
        })}
      </nav>
    </>
  );
}
