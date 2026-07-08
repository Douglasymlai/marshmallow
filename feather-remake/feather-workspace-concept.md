# Feather.workspace — Concept Spec

**A self-organised GitHub workspace.** Same body, new soul: we keep Feather's entire design system, scroll-story engine, and paper-craft motion language, and remap every mail concept onto the life of a repository — discussions, roadmap, projects, issues, PRs, sprints, and contributor events.

- Design system: **unchanged** (see `feather-rebuild-spec.md` §3 — colors, fonts, `--u` fluid unit, easings, keyframes all carry over).
- Information architecture: **unchanged** (7 wheel-driven scenes + static pages).
- Content model + illustration set: **re-themed** per this document.

**One-line pitch**: *"Simplify how you run your repos, starting with your notifications. Feather.workspace — GitHub made beautiful."*

---

## 1. The core mapping (mail → GitHub)

Every object in the original has a one-to-one counterpart. This table is the Rosetta stone for both copy and illustration work:

| Feather (mail) | Feather.workspace (GitHub) | Notes |
|---|---|---|
| Email / letter | Issue or PR | The atomic "paper" unit |
| Envelope | PR diff envelope (green/red stitched edges) | Envelope flap = diff fold |
| Sender avatar (A.S, C.L…) | Contributor avatar | Same initial-circle treatment |
| Reply card (stapled) | Suggested review comment / draft reply to a discussion | Same staple + checkbox |
| YES / NO / MAYBE stamps | **APPROVE / REQUEST CHANGES / COMMENT** stamps | Perfect 1:1 — review verdicts as rubber stamps |
| FOLLOW UP sticker | **NEEDS REBASE** / **PING REVIEWER** sticker | Red rubber-stamp sticker |
| Sticky-note attachment ("Logo V3. SVG") | Code-snippet sticky ("auth.ts · +42 −7") | Yellow sticky with mono diff stats |
| "Added to room" margin note | "Added to project 'v2.0 Release'" | |
| Promotions / newsletters | Bot noise (dependabot, stale-bot, CI chatter) | The "low priority" drawer |
| Package (Shipped/Delivered) | Release (Drafted/Published) pills | Box → versioned release crate |
| Flight ticket SFO→JFK | Deploy ticket `staging → prod` | Same blue ticket, env codes instead of airports |
| Booking / apartment application | Contributor event registration (meetup, conf talk, community call) | Ticket + venue card |
| Spending receipt slip | **Sprint receipt** (story points, PRs merged, cycle time) | Printed by the Sprints drawer |
| Postage-stamp portraits | Contributor stamps (perforated avatar cards) | Enriched with expertise, timezone, past reviews |
| Drawer cabinet categories | Issues · Pull Requests · Reviews · Releases · CI Runs · Discussions · Dependencies · Security · Bots | 3×3, same keyholes |
| "Got Mail?" | **"Got Issues?"** | Keeps the double meaning |

---

## 2. Main workflow — the 7 scenes, re-themed

Scene order, engine, banner mechanics, and all keyframes stay identical to the original. Only content, copy, and art change.

### Scene 0 · Hero — "Got Issues?"

The dotted-grid cream canvas fills with **repo-life cards** flying in, piling up, and orbiting a hand-drawn feather (now holding a tiny git branch like a twig). Dashed speech bubble: **"Got Issues?"**

Orbiting card set (replaces the promo/order cards): a `#412 bug` issue tag, a green `+128 −43` diff chip, a red `CI failed` bell, a `v0.4.2` release crate, a star-burst "128 new stars", a `dependabot` gremlin note, a review-request card "Maya → you", a deploy ticket `stg → prod`, a merge-conflict zigzag paper, an RFC scroll, a Hacktoberfest-style event badge, a `LGTM` doodle.

### Scene 1 · Brief — the daily standup page

Banner: **Brief** — *"Clears what's merged ✅, keeps what blocks 🧱, and nudges what needs review 👀."*

Cards land on the same ruled notebook; the feather handwrites the brief:

- **⏺ MUST SEE**
  - *Maya requests review on the auth refactor PR by end of today* → stapled reply card: "**Suggest to Maya:** LGTM overall — one question on the token expiry path." (checkbox to post)
  - *CI is failing on `main` after commit `a3f9c12`* → margin note "Added to project 'Release v0.5'"
  - *Kenji pushes new API design* → sticky: "openapi.yaml · +214 −9"
  - *Priya hasn't replied to your review comments on #412* → **PING REVIEWER** sticker
  - *Sam proposed moving sprint planning to Thursday* → **APPROVE / REQUEST CHANGES / COMMENT** stamps
- **✳ FYI** — 🔔 3 CI Runs · 📦 1 Release Draft · 🤖 2 Dependabot PRs · 🎟 1 Meetup RSVP, plus hint card "**Create a project** to track the v0.5 release"
- **☼ LOW PRIORITY** — *12 Bot Notifications*

Same interactions: handwriting draw-in, stamp thunk (`stampDown`), sticker slap (`stickerStamp`), counter hover-fans showing thumbnail previews of the actual PRs/runs.

### Scene 2 · Room — projects, sprints, roadmap

Banner: **Room** — *"A self maintained 🌸 project space ✂️🖊📎🖋 built for your repos."*

Folder tabs (replacing Job Application / Fundraising / Customer Conversation):

1. **Sprint 12** — issues table on grid paper: Sources (View) / Title / Assignee / Estimate / **Status** (Todo=gray, In Progress=blue, In Review=amber, Done=green, Blocked=red). "8/42 Issues". **Table / Insight** toggle: Insight mode shows a **burndown dot-grid**, big-number panels ("14/21 pts"), and an auto-written summary ("The sprint is trending 2 points behind; review latency on the auth PRs is the main drag. Focus on unblocking #412…"). Clicking **View** slides in the issue thread panel (`threadPanelIn`) — comments with avatars; new commits **drop in as envelopes**.
2. **Roadmap** — timeline rail with sticky quarters/milestones (v0.5 · v1.0 · GA), epics as paper cards pinned along the rail.
3. **RFC Discussion** — chat-bubble panel for a design discussion + participant card grid with expertise tags; a "consensus" summary box.

### Scene 3 · Search — a single ask across every repo

Banner: **Search** — *"Save time 🕐 and sanity 🌀 with a single ask ❓."*

Five query receipts pinned across the top:

1. *"Find the API design doc from MAYA CHEN"*
2. *"Send each first-time contributor a welcome comment"*
3. *"Add reproduction steps from the discussion to issue #318"*
4. *"Send our security team all open dependency alerts"*
5. *"Mark all dependabot PRs as REVIEWED"*

The 3-D document fan becomes repo artifacts: RFC scrolls, an ADR one-pager, CI log printouts, a CONTRIBUTING.md page, release notes, a flame-graph chart, security advisories, a meetup poster. Same machine-slot ingestion; dependabot PRs come out stamped **REVIEWED**.

### Scene 4 · Contributor Wiki

Banner: **Contributor Wiki** — *"Your contributors 📇, enriched with their work 🖥 and past reviews. 👋"*

Draggable perforated **contributor stamps** (same illustrated-portrait style). Focusing a stamp pops attribute labels: *maintainer since 2024 · owns `auth/` · UTC+9 · fastest reviewer · 3 talks given · prefers small PRs*. A secondary beat celebrates **contributor events**: a first-PR confetti stamp, meetup tickets, a "Hacktoberfest ×4" badge strip pinned beside the portraits.

### Scene 5 · Sorting — the repo card catalog

Banner: **Sorting** — *"A workspace that sorts ↕, merges 🧵, and surfaces insights 💡, on its own."*

The hand-sketched 3×3 cabinet, relabeled in the same handwritten script:

| | | |
|---|---|---|
| Issues | Pull Requests | Reviews |
| Sprints | Releases | CI Runs |
| Discussions | Dependencies | Bots |

Drawer behaviors:
- **Pull Requests** ejects PR papers with APPROVED/CHANGES pills and diff-stat chips.
- **Releases** ejects versioned crates with Drafted/Published pills.
- **CI Runs** ejects a ticker-tape of green/red run strips.
- **Sprints** prints the long **sprint receipt**: `SPRINT 12 — 21 pts committed / 14 done / 4 carried · 17 PRs merged · median cycle 1.8d · TOTAL: shipped 🎉`.
- Keyhole spotlight focus-mode unchanged.

### Scene 6 · Footer

Identical layout. Link columns: **Company** (Terms, Privacy) · **Product** (Change Log) · **Contact** (GitHub, X). The pink **V1 feather stamp** still links to the waitlist. Giant lowercase **"feather"** wordmark stays — optionally with a tiny branch-and-merge doodle threading through the letterforms.

---

## 3. Design system (kept, with themed extensions)

Everything from `feather-rebuild-spec.md` §3 applies verbatim: `#FEFEFB`/`#FCF8EF`/`#1A1A1A` palette, Gerstner Programm + Geist/Geist Mono + Caveat/Mansalva + Cormorant Garamond, the `--u` fluid poster unit, soft paper shadows, `cubic-bezier(.22,1,.36,1)` signature easing, and the full keyframe inventory (`cardPileUp`, `cardOrbit`, `featherDrift`, `stampDown`, `stickerStamp`, `paperEject`, `threadPanelIn`, …).

Themed extensions (only additions, no changes):

| Token | Value | Use |
|---|---|---|
| `--status-todo` | `#AAAAAA` | Sprint status |
| `--status-progress` | `#3B82F6` | reuses accent blue |
| `--status-review` | amber `#CC6A00` | reuses accent orange |
| `--status-done` / merged | green (match original "Accepted" pastel green) | PR merged, checks pass |
| `--status-blocked` / failed | `#B91C1C` | CI red, blocked |
| Diff green / diff red | pastel `+` green / `−` red at receipt-ink saturation | diff chips, envelope stitching |

Rule of thumb: **GitHub semantics, Feather saturation** — never use GitHub's own UI greens/purples at full strength; every status color is knocked back to the pastel, printed-ink range of the original palette.

---

## 4. Illustration redesign guide

The style stays: hand-drawn outlines, printed-paper pastels, visible grain, slightly wonky perspective, skeuomorphic office props. Only the subject matter changes. Asset-by-asset direction (mirrors the original `/landing1/` inventory):

| Original asset family | Redesign as | Style notes |
|---|---|---|
| Promo tags (20% off, 30% off, limited time) | Label chips: `bug`, `good first issue`, `help wanted`, `breaking` | Same die-cut tag shapes, string holes; label text in Geist Mono |
| Order slips (Order 366, Shipped) | Release crates: `v0.4.2 · Published`, `v0.5 · Draft` | Cardboard crate with version stencil, status pill |
| Flight ticket SFO→JFK | Deploy ticket `STG → PROD`, "APR 16 · 18:45" | Identical blue ticket; env codes in the airport slots; route arc = pipeline |
| Notification bell (Login Alert) | CI bell: `CI failed on main` (red) / `all checks passed` (green) | Same bell silhouette, tiny check/cross badge |
| Employment document | RFC scroll / ADR one-pager with ruled lines | Same lined-paper doc with checkbox holes |
| Sticky note (Logo V3. SVG) | Code sticky: filename + `+42 −7` diff stat | Yellow sticky, mono text, red paperclip kept |
| Paper plane "To Katherine:" | Paper plane "To reviewers:" carrying a review request | Unchanged fold, new inscription |
| Stacked mugs (Jason/Jonathan) | Pair-programming mugs (usernames on mugs) | Unchanged |
| House (1062 19th St) | Repo house: a little house with an octocat-free "repo" nameplate `feather/quill` | Roof = folder tab |
| YES/NO/MAYBE stamps | APPROVE (green oval) / REQUEST CHANGES (red) / COMMENT (blue) | Same rubber-stamp ellipse style |
| FOLLOW UP sticker | NEEDS REBASE / PING REVIEWER | Same red script-in-circle |
| Stamp-frame reply card + staple | Suggested-comment card | Unchanged mechanics |
| Search-card docs (news, coupons, incorporation docs) | CI logs, security advisories, CONTRIBUTING page, release notes, flame graph, meetup poster | Keep torn edges + pastel tints |
| Machine (slot/top/body) | The "merge machine": intake slot swallows PRs, emits a merged paper with a squash-crimp edge | Add a tiny lever labeled `squash` |
| Portrait postage stamps | Contributor stamps + event badge strip (first PR, Hacktoberfest ×4, speaker) | Same perforation + pastel diamonds |
| Drawer cabinet | Identical cabinet, 9 new handwritten labels (§2 scene 5) | Unchanged sketch style |
| Spending receipt | Sprint receipt (points, PRs, cycle time, "shipped 🎉") | Same thermal-paper slip |
| Envelope | Diff envelope: flap stitched green on top edge, red on bottom | The one truly new prop — carries commits into tables |
| Pink V1 feather stamp | Unchanged (brand) | |
| Feather mascot | Feather now perches on a branching twig (git graph) | Subtle; don't over-egg it |

---

## 5. Per-page elements & interactions

### 5.1 Landing `/`

| Scene | Elements (themed) | Interactions / animation (all inherited) |
|---|---|---|
| Hero | ~20 repo-life cards; feather + "Got Issues?" bubble; logo + wordmark | `cardPileUp` → `cardOrbit` → `cardRelease`; `lettersSpread`; frosted pill headline |
| Brief | Notebook; MUST SEE/FYI/LOW PRIORITY; review reply card; APPROVE/CHANGES/COMMENT stamps; NEEDS REBASE sticker; code sticky; CI/release/dependabot/event counters; "Create a project" hint | Feather handwriting (stroke-dashoffset); `stampDown`; `stickerStamp`; counter hover-fan; checkbox posts suggested comment |
| Room | Tabs: Sprint 12 / Roadmap / RFC Discussion; issues table w/ status colors; Table↔Insight toggle; burndown dot-grid + auto summary; issue thread panel; commit envelopes dropping in; roadmap timeline rail; discussion bubbles + participant grid | Tab switch; toggle cross-fade; `threadPanelIn`; envelope drop; `rowActive`; widget shift |
| Search | 5 repo queries; artifact fan; merge machine; REVIEWED stamp | Sequential query activation; scatter→slot ingestion; transform + stamp |
| Contributor Wiki | Draggable contributor stamps; attribute callouts; event badge strip (first PR, meetups, talks) | Drag; focus pops attributes; badges slap in via `stickerStamp` |
| Sorting | 3×3 cabinet (Issues…Bots); PR/release/CI papers eject; sprint receipt prints; keyhole focus | Drawer 3-D open; `paperEject`/`paperJump`; slip scroll-out; keyhole mask |
| Footer | Link columns; waitlist stamp; giant wordmark | Fade-up; stamp hover tilt |

### 5.2 Static pages (same layouts, re-copy)

| Page | Content changes |
|---|---|
| `/about` | Manifesto keeps its "beauty in ordinary tools" arc; swap the closing line's subject to the developer's everyday: *terminals we type in, repos we tend, tools that do their job quietly.* |
| `/contact` | Add GitHub org link first; rest unchanged |
| `/source` | Unchanged concept — extend the moodboard with dev-culture ephemera (terminal photography, punch cards, plotter git-graphs) in the same B&W/dark treatment |
| `/privacy`, `/terms` | Re-scope the Google Workspace API sections to **GitHub API/OAuth scopes** (repos, issues, PRs, discussions, projects, webhooks); the AI-agent liability section maps directly (agent can comment, review, merge, label on your behalf — user confirms actions) |

---

## 6. Build order (unchanged from the original plan)

1. Scroll engine: fixed 100vh stage, wheel accumulator → `sectionIndex` + intra-scene `progress`, direction-aware banner.
2. Scene components with isolated CSS modules sharing `--u`, palette, banner portal.
3. Illustration sprint using §4 as the shot list (~120 assets; the diff envelope and merge machine are the only net-new props).
4. Handwriting + offset-path feather flight, verbatim from the original technique.
5. Fonts identical; Gerstner Programm still needs licensing (or substitute).
