
## Plan: Previous Meetups History + Markdown Viewer in MeetupSection

### What we're building

Expand `MeetupSection.tsx` to have two parts:
1. **Upcoming meetup card** (existing, stays at top) — updated to show "Meetup #19"
2. **Previous Meetups Archive** — scrollable timeline/grid of meetups #1–#18, each opening a markdown viewer modal/drawer

---

### Data structure

Create `src/data/meetups.ts` with all 19 meetups. Working backwards from today (March 22, 2025 = #19), each previous meetup is one Sunday back:

- #19 → Sun Mar 22, 2025
- #18 → Sun Mar 15, 2025
- #17 → Sun Mar 8, 2025
- … back 19 weeks total

All share the same base info: 2:00 PM–5:00 PM, IKMZ −1 Floor, BTU Cottbus.

---

### Markdown files

Create `public/meetups/meetup-01.md` through `meetup-18.md` — all with the same placeholder content (the Luma event text you provided). User will replace each file later with real notes. No bundler needed — fetched at runtime via `fetch('/meetups/meetup-XX.md')`.

---

### UI layout

```text
[Section header]
    ↓
[Upcoming Meetup #19 card — existing countdown card, labeled "#19"]
    ↓
[── Previous Meetups ──]
[Horizontal scrollable row on mobile / 3-col grid on desktop]
  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐
  │  #18         │  │  #17         │  │  #16         │
  │  Mar 15      │  │  Mar 8       │  │  Mar 1       │
  │  [View Notes]│  │  [View Notes]│  │  [View Notes]│
  └──────────────┘  └──────────────┘  └──────────────┘
  (shows 3 per row desktop, 2 tablet, 1 mobile with scroll)
```

Clicking "View Notes" opens a **Sheet (slide-over drawer)** from the right with:
- Meetup # and date in the header
- Markdown rendered using `react-markdown` (already available in most Lovable projects; if not, we'll use a lightweight custom renderer or install it)

---

### Files to create/modify

1. **`src/data/meetups.ts`** — array of 19 meetup objects `{ id, date, title, markdownFile }`
2. **`public/meetups/meetup-01.md`** through **`meetup-18.md`** — placeholder markdown for past meetups (same base content)
3. **`src/components/MeetupSection.tsx`** — reworked to include both the featured #19 card and the archive grid with sheet modal
4. Install `react-markdown` if not present (check package.json first)

---

### Technical details

- **Sheet component** already exists at `src/components/ui/sheet.tsx` — will use that
- **Markdown rendering**: check if `react-markdown` is in package.json; if not, use a simple pre-formatted block or install it
- Past meetup cards show: number badge, date, day-of-week, status "Completed" chip, "View Notes" button
- Current meetup (#19) card gets a "LIVE / TODAY" badge since it's today
- No external dependencies needed beyond possibly `react-markdown`
