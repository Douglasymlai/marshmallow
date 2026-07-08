# Feather.computer — Rebuild Spec

Analysis of https://feather.computer/ (captured 2026-07-07). Sources: live HTML of all 6 pages, all 4 CSS bundles, the landing-page JS chunks, and headless-Chrome captures of every scroll stage (see `captures/`).

**Product**: Feather — an AI email client ("Inbox made beautiful"). Meta description: *"Simplify how you interact with your data, starting with your email inbox."*

**Tech stack observed**: Next.js (App Router) · Tailwind CSS v4 + CSS Modules per section · no animation library — pure CSS keyframes/transitions, SVG SMIL (`<animate stroke-dashoffset>`) for handwriting, CSS `offset-path` for the flying feather · React portals for the fixed header/banner · scroll is hijacked (page height = viewport; wheel events drive a section state machine).

---

## 1. Main workflow (the homepage story)

The homepage is a single fullscreen, wheel-driven narrative. Native scrolling is disabled; each wheel gesture advances a scene state machine. A fixed "brief header" banner at the top announces each chapter (title + divider + tagline with small hand-drawn inline icons) and cross-fades/slides direction-aware as you move between them.

Story order and exact taglines (from the JS config):

| # | Scene | Banner tagline | What happens |
|---|-------|----------------|--------------|
| 0 | **Hero — "Got Mail?"** | (no banner; logo + wordmark appear center) | Dozens of "mail item" cards (promo tags, receipts, order slips, flight ticket, notification bell, sticky notes…) fly in and pile up around the center on a dotted-grid cream canvas, then orbit slowly around a hand-drawn feather with a dashed speech bubble reading **"Got Mail?"**. Letters of the headline spread apart. Scrolling releases the cards. |
| 1 | **Brief** | "Removes what's done, keep what matters, and nudges what needs you." | The chaos lands on a ruled **notebook page** (spiral holes, paper stack behind). Items group under three hand-lettered mono headings: **⏺ MUST SEE / ✳ FYI / ☼ LOW PRIORITY**. Stickers morph into brief rows written line-by-line by a **flying feather that handwrites** the text (SVG stroke draw + offset-path flight). Rows carry actionable artifacts: a stapled **reply card** with checkbox ("Reply to Adam: Hi Adam, attached below is the employee onboarding document."), a margin note ("Added to room 'Job Application'"), a yellow sticky **attachment** ("Logo V3. SVG"), a red **FOLLOW UP** rubber-stamp sticker, and **YES / NO / MAYBE** stamp buttons. FYI shows counters (🔔 1 Notification · 1 Booking · 2 Packages · 1 Apartment Application) plus a blue hint card "**Create a room** to track your apartment application". Low priority: "12 Promotions". |
| 2 | **Room** | "A self maintained 🌸 workspace ✂️🖊📎🖋 built for your needs." | A workspace with **file-folder tabs**: *Job Application*, *Fundraising Progress*, *Customer Conversation*. Job Application = data table on grid paper ("8/42 Rows", **Table / Insight** toggle top-right) with columns Sources (View button) / Job Title / Compensation / Company / Status (color-coded: Applied=blue, Interviewed=amber, Accepted=green, Rejected=red). Clicking **View** slides in a thread panel (email list with avatars) from the right; envelopes drop in as new mail arrives. **Insight** mode swaps the table for stat panels: big numbers with slash lines ("x/42"), dot-grid charts, and an auto-written summary ("The job application pipeline shows … Focus on converting interviews to offers…"). Fundraising tab: investor table + timeline rail with sticky months. Customer Conversation tab: chat-bubble panel + customer card grid with tags. |
| 3 | **Search** | "Save time 🕐 and sanity 🌀 with a single ask ❓." | Five natural-language **query receipts** pinned across the top: "Find the photo of a birthday cake from KATHY LIU" / "Send each of my customer a personal email about the new product" / "Add my office address to my meeting with JASON this afternoon" / "Send our lawyer all of our incorporation documents" / "Mark all my promotions and newsletters as READ". Below, a 3-D fan of document cards (newspaper, articles of incorporation, customer list, coupons, birthday photo…). Each query activates: matching documents scatter/fly into a hand-drawn **machine with a slot**, are transformed (transform layer/artifact), e.g. newsletters get a **READ** stamp. |
| 4 | **People Wiki** | "Your contacts 📇, enriched with web knowledge 🖥 and past interactions. 👋" | Contact portraits rendered as **postage stamps** (perforated edges, pastel backgrounds, illustrated faces) that tilt at playful angles. Stamps are **draggable**; attribute labels (name, facts from the web and past threads) pop up around a focused portrait. |
| 5 | **Sorting** | "An inbox that sorts ↕, merges 🧵, and surfaces insights 💡, on its own." | A hand-sketched **3×3 card-catalog cabinet**. Drawer labels in handwritten script: *Important, Meeting, Shared File / Spending, Booking, Package / Notification, Newsletter, Promotion* — each with a tiny keyhole. Drawers slide open in 3-D (side walls, top face); papers **eject/jump** out of them (meeting cards with date stamps, package rows with Shipped/Delivered pills, booking rows with a SFO→JFK route arc, files row with thumbnails). The Spending drawer prints a long **receipt slip** (monthly totals, line items). A **keyhole-shaped spotlight overlay** darkens everything but one drawer (focus mode). |
| 6 | **Footer** | (header empty) | Link columns fade up: **Company** (Terms, Privacy) · **Product** (Change Log → `/log`) · **Contact** (Instagram, X) · "©2026 Feather Computer Inc." + a pink **V1 feather postage stamp** that links to `/nynov2025` (waitlist, aria-label "Join the waitlist"). Behind everything, a giant lowercase **"feather"** wordmark in pale gray fills the bottom half. |

Persistent chrome on the homepage: top-left brand mark (feather glyph + "Feather", appears after the hero), top-right a small feather sticker in a pill (returns to top / progress affordance).

---

## 2. Page structure & layouts

Site map (from sitemap.xml + robots + JS):

```
/            Landing experience (wheel-driven story, 7 scenes)
/about       Manifesto page
/contact     Contact & social links
/privacy     Privacy policy (legal doc)
/terms       Terms of service (legal doc)
/source      Inspiration gallery (4-column masonry, ~50+ webp images)
/log         Change log (linked from footer)
/nynov2025   Waitlist (linked from footer stamp)
/plan, /maintenance   (robots-disallowed, internal)
```

Layouts:

- **Landing** — fixed fullscreen stage (100vh, no native scroll). Layers: dotted-grid background → scene canvas (each scene its own CSS-module component: `Landing1Hero`, `Landing1Notebook` (Brief), `Landing1Room`, `Landing1Search`, `Landing1People`, `Landing1Drawers` (Sorting), `Landing1Footer`, plus a `Landing1Owl` easter-egg component) → portal-mounted fixed header banner + brand mark.
- **About / Contact / Source** — centered single column, huge serif page title ("about", "contact", "source") in Cormorant Garamond at `clamp(3rem,10vw,7rem)`, color `rgba(35,23,55,.5)`, tight letter-spacing; a hand-pointer **back button** image at top-left; content fades in. About body is large serif prose with bold-italic highlight words. Contact is two label/value lists ("contact us": email; "follow us": X, Discord, Instagram, YouTube, TikTok, LinkedIn). Source is a 4-column masonry image gallery with per-column fade-in.
- **Privacy / Terms** — classic legal document: centered measure, H1 + "Last updated" line, H2/H3 sections, bullet lists, inline links. (Content captured in full in the page HTML; reuse verbatim.)

---

## 3. Design system

### Color

| Role | Value |
|------|-------|
| Page background (cream) | `#FEFEFB` |
| Paper / notebook | `#FCF8EF` |
| Ink (primary text) | `#1A1A1A` |
| Muted text / labels | `#AAAAAA`, `#8C8780`, `#A8A297` (warm gray) |
| Borders / hairlines | `#E0E0E0`, `#F0F0F0`, `#D0D0D0`, `#EAEAEA` |
| Accent red (stamps, alerts, Rejected) | `#B91C1C`, `#DC2626` |
| Accent blue (links, Applied, action cards) | `#3B82F6`, `#2F6BFF`, `#1A73E8` |
| Accent orange (highlights) | `#CC6A00`, `#E06E3A` |
| About/serif title tint | `rgba(35,23,55,.5)` |
| Card pastels (illustrated assets) | brick `#A94434`-ish, forest green, mustard, dusty blue, blush pink, lavender, teal — baked into PNG/SVG art |

### Typography

| Family | Usage |
|--------|-------|
| **Gerstner Programm** (otf, 300/400/500/700 + italics, self-hosted) | Brand wordmark, headlines ("Got Mail?"), banner titles, UI emphasis |
| **Geist** (variable) | Body/UI text, tables, footer links |
| **Geist Mono** | Mono labels: MUST SEE / FYI / LOW PRIORITY, reply cards, tickets, "8/42 Rows", margin notes |
| **Caveat**, **Mansalva** | Handwritten accents — drawer labels, sketch annotations |
| **Cormorant Garamond** (variable + italic) | About/Contact/Source page titles and prose |

Tracking is consistently tight on sans text (−0.3 to −0.96px steps).

### Spatial system

- Fluid canvas unit: `--u: calc(max(600px, min(82vw, 1160px)) / 1160)` on desktop, `--u: calc(97vw / 660)` on mobile — **every scene dimension is a multiple of `--u`**, so whole illustrated scenes scale proportionally like a poster.
- Dotted-grid background pattern across the whole landing; grid-paper texture inside Room panels.
- Radii: pill (100px) for chips/buttons; small 6–10px on cards.

### Shadows

Soft and paper-like: `0 1px 3px rgba(170,170,170,.1)`, `0 4px 12px rgba(0,0,0,.06)`, `0 2px 24px rgba(0,0,0,.08)`; a heavy glow `0 0 100px 10px rgba(102,102,102,.5)` for the keyhole focus mode.

### Motion language

- Easings: signature **`cubic-bezier(.22,1,.36,1)`** (fast-out, soft-settle) and `cubic-bezier(.2,.7,.2,1)`; hero cards use `cubic-bezier(.16,1,.3,1)`; springy overshoot `cubic-bezier(.34,1.5,.5,1)` / `(.34,1.56,.64,1)` for "boing" moments.
- Durations: 150–350ms micro-interactions; 400–900ms card flights; 1.5s+ scene choreography with per-item `--fly-delay` staggers.
- Named keyframes to reproduce: `cardPileUp`, `cardOrbit`, `cardRelease`, `lettersSpread` (Hero); `featherDrift`, `featherHoverBoing`, `stampDown`, `stickerStamp` (Brief); `threadPanelIn` (Room); `paperEject`, `paperJump` (Sorting).
- Handwriting: SVG paths animated with SMIL `stroke-dashoffset` 100→0, `fill="freeze"`, staggered `begin` times; the feather sticker rides an `offset-path` bezier and flies off on `transitionEnd`.
- Skeuomorphic props everywhere: paperclips, staples, rubber stamps, stickers, postage stamps, receipts, envelopes, drawers, notebooks.

---

## 4. Per-page elements & interactions

### 4.1 Landing `/` (per scene)

| Scene | Elements | Interactions / animation |
|-------|----------|--------------------------|
| Hero | ~20 illustrated mail-item cards (PNG/SVG in `/landing1/`); feather sketch + dashed speech bubble "Got Mail?"; brand logo + "Feather" name | Cards fly in staggered (`cardPileUp` 0.4s, per-card `--fly-delay`) → orbit loop (`cardOrbit`) → on scroll `cardRelease` (0.9s) flings them out; headline letters spread (`lettersSpread` 1.5s, 2.3s delay); pill behind headline gets frosted-glass bg (`backdrop-filter: blur(6px)`); hover state on cards (`hovered`, `interactive`) |
| Brief (notebook) | Notebook page w/ spiral holes + ruled lines (SVG bg); 3 group headers with dot glyphs; 5 "must see" rows w/ initial-avatars; reply card (checkbox + stapled stamp frame); "added to room" margin note; sticky-note attachment; FOLLOW UP sticker; YES/NO/MAYBE stamp set; FYI counter chips; "Create a room" blue hint cards; 12 Promotions counter | Feather **handwrites rows** (stroke-dashoffset draw, writing→flown→idle states); stickers slap on (`stickerStamp`); stamps thunk down (`stampDown`); feather idles with `featherDrift`, boings on hover (`featherHoverBoing`); counters fan out sticker thumbnails on hover (`counterFan`); checkbox toggles reply-sent state; advance button (chevron) steps the scene |
| Room | Folder tabs ×3; grid-paper panel; toolbar ("8/42 Rows", Table/Insight toggle, view buttons); job table (View / Job Title / Compensation / Company / Status-colored); thread panel (back button, avatar list, subject/from/body); envelope drop layer; insight panels (big number + slash + caption, dot-grid chart, summary paragraph with bold segments); fundraising table + timeline rail (sticky month/day); customer conversation bubbles + customer card grid with tags | Tab switch swaps panels (active tab lifts, inactive gray); **Table/Insight** toggle cross-fades views; **View** click → `threadPanelIn` slide-from-right; envelopes drop into the table (new rows); widget entries shift (`--widget-shift`); rows highlight on active (`rowActive`); mode buttons animate active pill |
| Search | 5 query receipt cards (torn-paper edges, pastel tints, mono text with tiny inline icons); 3-D fanned document pile (~15 SVG docs); hand-drawn machine (top, slot, body); scatter layer; READ stamp | Query cards activate sequentially; matching docs scatter → fly into machine slot; transform layer emits result artifact; promotions/newsletters get stamped READ; number boxes count; glyph strips animate |
| People Wiki | 3+ portrait postage stamps (illustrated faces, pastel diamond/square rotations); name labels; attribute callouts | Stamps **draggable** (`dragging` class); on focus, attribute labels pop in around portrait; wiki text appears (web knowledge + interaction history) |
| Sorting | 3×3 drawer cabinet (hand-sketched SVG): 9 labeled drawers w/ keyholes; papers inside (meeting cards, package rows w/ status pills, booking row w/ route arc SFO→JFK + stay timeline, files row w/ thumbnails, important papers); spending receipt slip (header, month/year, line items, totals); keyhole spotlight overlay | Drawers slide open in 3-D (`open`, side walls + top face); `paperEject` / `paperJump` pop papers out; slip prints/scrolls out (`slipActive`, `slipCleanUp`); keyhole mask focuses one drawer (`focusMode`/`focused`/`faded`); label tabs wiggle on hover |
| Footer | 3 link groups + copyright; pink V1 feather stamp → `/nynov2025`; giant "feather" wordmark | Groups fade/rise in (`visible`); stamp hover tilt; wordmark static backdrop |
| Global | Fixed brief-header banner (title + divider + icon-inline tagline); brand mark top-left; feather pill top-right; owl easter egg | Banner slides per section — forward: previous slides up −100vh & next fades in over 0.5 progress; backward mirrored (direction-aware, driven by `bannerProgress`); brand mark fades in after hero |

### 4.2 Static pages

| Page | Elements | Interactions |
|------|----------|--------------|
| `/about` | Serif "about" title; hand-pointer back button; 4 prose paragraphs with bold-italic keywords (manifesto: "tools that do their job quietly… We hope feather can become one of these ordinary things in your life!") | Fade-in on load; back button → `/` |
| `/contact` | Serif "contact" title; back button; "contact us" (email) + "follow us" list — X `@feather___co`, Discord, Instagram `@feather.computer`, YouTube, TikTok, LinkedIn | Link hovers; fade-in |
| `/source` | Serif "source" title; back button; 4-column masonry of ~50 inspiration images (industrial design, brutalist architecture, oscilloscope art, Porsche 964, electronic-music ephemera — all B&W/dark webp) | Per-column staggered `fadeIn`; images static (no lightbox observed) |
| `/privacy`, `/terms` | Legal doc: H1, "Last updated: March 28, 2026", sectioned headings, lists, links (Google API disclosures, DPF, AI-agent liability, refunds) | Plain scroll page |

---

## 5. Rebuild notes

1. **Scroll engine first**: fixed 100vh stage + wheel/touch accumulator → `sectionIndex` + intra-scene `progress` floats. Everything else hangs off that. (Feather also gates some scene steps behind clicks/advance buttons.)
2. Build each scene as an isolated component with its own CSS module; share only the `--u` unit, banner portal, and palette.
3. The hand-drawn look is **asset-driven**: most charm lives in ~120 bespoke SVG/PNG illustrations (`/landing1/…`). Budget for illustration work or download/replace those assets.
4. Handwriting effect = SVG paths + `stroke-dasharray/dashoffset` with staggered SMIL or WAAPI; feather flight = `offset-path` + `offset-distance` transition.
5. Fonts: Geist/Geist Mono (free), Caveat/Mansalva (Google), Cormorant Garamond (Google). **Gerstner Programm is commercial** — license it or substitute (e.g., Neue Haas Grotesk / Suisse Int'l).
6. Respect the fluid `--u` scaling trick — it's why the scenes look like posters at every viewport.
