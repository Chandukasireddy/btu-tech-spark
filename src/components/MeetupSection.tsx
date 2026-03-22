import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import {
  MapPin,
  Clock,
  Calendar,
  ExternalLink,
  Navigation,
  BookOpen,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  X,
} from "lucide-react";
import { useCountdown } from "@/hooks/useCountdown";
import {
  meetups,
  previousMeetups,
  upcomingMeetup,
  formatMeetupDate,
  formatMeetupMonth,
  formatMeetupDay,
  type Meetup,
} from "@/data/meetups";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

function FadeIn({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.4, 0, 0.2, 1] }}
    >
      {children}
    </motion.div>
  );
}

function DigitBlock({ value, label }: { value: number; label: string }) {
  const str = String(value).padStart(2, "0");
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="countdown-digit w-16 h-16 md:w-20 md:h-20 flex items-center justify-center">
        <motion.span
          key={value}
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-mono text-2xl md:text-3xl font-bold text-cyber-blue tabular-nums"
        >
          {str}
        </motion.span>
      </div>
      <span className="mono-tag text-muted-foreground">{label}</span>
    </div>
  );
}

function ordinal(n: number): string {
  const s = ["th", "st", "nd", "rd"];
  const v = n % 100;
  return n + (s[(v - 20) % 10] || s[v] || s[0]);
}

// ─── Markdown Notes Drawer ───────────────────────────────────────────────────

function MeetupNotesDrawer({
  meetup,
  open,
  onClose,
}: {
  meetup: Meetup | null;
  open: boolean;
  onClose: () => void;
}) {
  const [content, setContent] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  // Fetch markdown when drawer opens
  const prevMeetupRef = useRef<Meetup | null>(null);
  if (open && meetup && meetup !== prevMeetupRef.current) {
    prevMeetupRef.current = meetup;
    setContent(null);
    setError(false);
    setLoading(true);
    fetch(meetup.markdownFile)
      .then((r) => {
        if (!r.ok) throw new Error("not found");
        return r.text();
      })
      .then((t) => {
        setContent(t);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }

  return (
    <Sheet open={open} onOpenChange={(v) => !v && onClose()}>
      <SheetContent
        side="right"
        className="w-full sm:max-w-2xl overflow-y-auto bg-background border-border p-0"
      >
        {/* Header */}
        <div className="sticky top-0 z-10 bg-background/95 backdrop-blur border-b border-border px-6 py-4 flex items-start justify-between gap-4">
          <SheetHeader className="text-left">
            <SheetTitle className="text-lg font-bold">
              {meetup && (
                <span>
                  <span className="text-cyber-blue">{ordinal(meetup.id)} Meetup</span>
                  <span className="ml-2 text-sm font-normal text-muted-foreground">
                    — {formatMeetupDate(meetup.date)}
                  </span>
                </span>
              )}
            </SheetTitle>
            <p className="text-xs text-muted-foreground mt-0.5">
              BTU Tech Hub · IKMZ −1 Floor · 2:00 PM – 5:00 PM
            </p>
          </SheetHeader>
          <button
            onClick={onClose}
            className="shrink-0 mt-0.5 p-1.5 rounded-lg hover:bg-muted/50 text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-6">
          {loading && (
            <div className="flex flex-col items-center gap-3 py-16 text-muted-foreground">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="w-8 h-8 border-2 border-cyber-blue/30 border-t-cyber-blue rounded-full"
              />
              <p className="mono-tag">Loading notes…</p>
            </div>
          )}
          {error && (
            <div className="text-center py-16 text-muted-foreground">
              <BookOpen className="w-10 h-10 mx-auto mb-3 opacity-30" />
              <p className="font-medium">Notes not available yet</p>
              <p className="text-sm mt-1 opacity-70">
                Check back after the meetup or add your recap on Discord!
              </p>
            </div>
          )}
          {content && (
            <article className="prose prose-invert prose-sm max-w-none prose-headings:text-foreground prose-p:text-muted-foreground prose-a:text-cyber-blue prose-strong:text-foreground prose-code:text-cyber-green prose-li:text-muted-foreground prose-hr:border-border prose-table:text-sm prose-th:text-foreground prose-td:text-muted-foreground">
              <ReactMarkdown>{content}</ReactMarkdown>
            </article>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}

// ─── Previous Meetup Card ─────────────────────────────────────────────────────

function PreviousMeetupCard({
  meetup,
  onViewNotes,
  delay,
}: {
  meetup: Meetup;
  onViewNotes: (m: Meetup) => void;
  delay: number;
}) {
  const isMilestone = meetup.id === 10;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4, delay, ease: [0.4, 0, 0.2, 1] }}
      whileHover={{ y: -3, transition: { duration: 0.2 } }}
      className="glass-card rounded-2xl overflow-hidden group cursor-pointer border border-white/5 hover:border-cyber-blue/30 transition-colors duration-200 flex flex-col"
      onClick={() => onViewNotes(meetup)}
    >
      {/* Date badge strip */}
      <div className="relative px-4 pt-4 pb-3 flex items-start gap-3">
        <div className="flex-shrink-0 w-12 h-14 rounded-xl bg-muted/30 border border-white/5 flex flex-col items-center justify-center text-center group-hover:border-cyber-blue/40 transition-colors">
          <span className="text-[10px] font-mono uppercase text-cyber-blue/70 leading-none">
            {formatMeetupMonth(meetup.date)}
          </span>
          <span className="text-xl font-bold text-foreground leading-tight mt-0.5">
            {formatMeetupDay(meetup.date)}
          </span>
          <span className="text-[9px] text-muted-foreground/60 leading-none">
            {meetup.date.getFullYear()}
          </span>
        </div>

        <div className="flex-1 min-w-0 pt-0.5">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="mono-tag text-cyber-blue text-[10px]">
              #{String(meetup.id).padStart(2, "0")}
            </span>
            {isMilestone && (
              <span className="mono-tag text-cyber-green text-[10px] border-cyber-green/40">
                🎉 Milestone
              </span>
            )}
          </div>
          <p className="text-sm font-semibold text-foreground mt-1 truncate">
            BTU Tech Hub Meetup
          </p>
          <p className="text-xs text-muted-foreground/70 mt-0.5">
            {meetup.date.toLocaleDateString("en-GB", { weekday: "long" })} · 2:00 PM
          </p>
        </div>
      </div>

      {/* Divider */}
      <div className="mx-4 h-px bg-white/5" />

      {/* Footer */}
      <div className="px-4 py-3 flex items-center justify-between mt-auto">
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground/60">
          <CheckCircle2 className="w-3 h-3 text-cyber-green/60" />
          <span>Completed</span>
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onViewNotes(meetup);
          }}
          className="flex items-center gap-1 text-xs font-medium text-cyber-blue/80 hover:text-cyber-blue transition-colors group/btn"
        >
          <BookOpen className="w-3 h-3" />
          <span>View Notes</span>
        </button>
      </div>
    </motion.div>
  );
}

// ─── Main Section ─────────────────────────────────────────────────────────────

export default function MeetupSection() {
  const countdown = useCountdown();
  const [selectedMeetup, setSelectedMeetup] = useState<Meetup | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Pagination for the grid (show 9 at a time)
  const PER_PAGE = 9;
  const [page, setPage] = useState(0);
  const totalPages = Math.ceil(previousMeetups.length / PER_PAGE);
  const visibleMeetups = previousMeetups.slice(page * PER_PAGE, page * PER_PAGE + PER_PAGE);

  function openNotes(m: Meetup) {
    setSelectedMeetup(m);
    setDrawerOpen(true);
  }

  return (
    <section id="meetup" className="py-24">
      <div className="section-container">

        {/* ── Section header ── */}
        <FadeIn>
          <div className="text-center mb-12">
            <span className="mono-tag text-cyber-blue">02 — Meetups</span>
            <h2 className="mt-3 text-4xl md:text-5xl font-bold tracking-tight">
              Our <span className="gradient-text">Meetup History</span>
            </h2>
            <p className="mt-3 text-muted-foreground text-sm max-w-md mx-auto">
              Every Sunday, 2:00–5:00 PM · IKMZ −1 Floor · BTU Cottbus
            </p>
          </div>
        </FadeIn>

        {/* ── Upcoming Meetup #19 ── */}
        <FadeIn delay={0.1}>
          <div className="max-w-3xl mx-auto mb-16">
            {/* Label */}
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent to-cyber-blue/20" />
              <span className="mono-tag text-cyber-blue border-cyber-blue/40">
                ↓ Next Meetup
              </span>
              <div className="h-px flex-1 bg-gradient-to-l from-transparent to-cyber-blue/20" />
            </div>

            <div
              className="glass-card rounded-3xl overflow-hidden hover:scale-[1.01] transition-all duration-200"
              style={{
                boxShadow:
                  "0 0 40px -10px rgba(56,189,248,0.15), inset 0 1px 1px 0 rgba(255,255,255,0.1)",
              }}
            >
              {/* Card header */}
              <div className="relative px-8 pt-8 pb-6 border-b border-white/5">
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2 flex-wrap">
                      <span className="w-2 h-2 rounded-full bg-cyber-green animate-pulse" />
                      <span className="mono-tag text-cyber-green">Live Weekly</span>
                      <span className="mono-tag text-cyber-blue border-cyber-blue/40">#19</span>
                      <span className="mono-tag bg-cyber-blue/10 text-cyber-blue border-cyber-blue/30">
                        TODAY
                      </span>
                    </div>
                    <h3 className="text-2xl font-bold tracking-tight">
                      BTU Tech Hub Meetup – {ordinal(19)}
                    </h3>
                    <p className="text-muted-foreground mt-1 text-sm">Connect · Learn · Build</p>
                  </div>

                  <div className="flex flex-col gap-2 flex-shrink-0">
                    <a
                      href="https://luma.com/calendar/cal-15EeqDt3eUrf1et"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-5 py-2.5 rounded-xl btn-cyber text-sm font-semibold"
                    >
                      View on Luma
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                    <button
                      onClick={() => openNotes(upcomingMeetup)}
                      className="flex items-center gap-2 px-5 py-2 rounded-xl border border-white/10 hover:border-cyber-blue/40 text-sm text-muted-foreground hover:text-cyber-blue transition-colors"
                    >
                      <BookOpen className="w-3.5 h-3.5" />
                      Event Notes
                    </button>
                  </div>
                </div>

                <div className="flex flex-wrap gap-4 mt-5 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-4 h-4 text-cyber-blue" />
                    Sunday, March 22, 2025
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-cyber-purple" />
                    14:00 – 17:00
                  </div>
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-cyber-green" />
                    IKMZ −1 Floor Cabins, BTU Cottbus
                  </div>
                </div>
              </div>

              {/* Countdown */}
              <div className="px-8 py-8 flex flex-col items-center gap-6">
                <p className="mono-tag text-muted-foreground">This week's meetup starts in</p>
                <div className="flex items-center gap-3 md:gap-4">
                  <DigitBlock value={countdown.days} label="Days" />
                  <span className="text-2xl font-bold text-cyber-blue/40 mb-5 font-mono">:</span>
                  <DigitBlock value={countdown.hours} label="Hours" />
                  <span className="text-2xl font-bold text-cyber-blue/40 mb-5 font-mono">:</span>
                  <DigitBlock value={countdown.minutes} label="Min" />
                  <span className="text-2xl font-bold text-cyber-blue/40 mb-5 font-mono">:</span>
                  <DigitBlock value={countdown.seconds} label="Sec" />
                </div>

                <a
                  href="https://btu.mapongo.de/viewer?p=1&b=1&f=13&l=349&lang=en"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-cyber-blue transition-colors group"
                >
                  <Navigation className="w-3.5 h-3.5 group-hover:text-cyber-blue" />
                  Location guide: Find IKMZ −1 Floor on the map
                  <ExternalLink className="w-3 h-3 opacity-60" />
                </a>
              </div>
            </div>
          </div>
        </FadeIn>

        {/* ── Previous Meetups Archive ── */}
        <FadeIn delay={0.15}>
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent to-white/10" />
            <span className="mono-tag text-muted-foreground">Previous Meetups · #1 – #18</span>
            <div className="h-px flex-1 bg-gradient-to-l from-transparent to-white/10" />
          </div>
        </FadeIn>

        {/* Stats row */}
        <FadeIn delay={0.2}>
          <div className="flex flex-wrap justify-center gap-6 mb-8 text-center">
            {[
              { label: "Total Meetups", value: "19", color: "text-cyber-blue" },
              { label: "Hours of Learning", value: "57+", color: "text-cyber-purple" },
              { label: "Weeks Running", value: "19", color: "text-cyber-green" },
            ].map((s) => (
              <div key={s.label} className="flex flex-col items-center">
                <span className={`text-2xl font-bold font-mono ${s.color}`}>{s.value}</span>
                <span className="text-xs text-muted-foreground mt-0.5">{s.label}</span>
              </div>
            ))}
          </div>
        </FadeIn>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {visibleMeetups.map((m, i) => (
            <PreviousMeetupCard
              key={m.id}
              meetup={m}
              onViewNotes={openNotes}
              delay={i * 0.04}
            />
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <FadeIn delay={0.1}>
            <div className="flex items-center justify-center gap-3 mt-8">
              <button
                onClick={() => setPage((p) => Math.max(0, p - 1))}
                disabled={page === 0}
                className="p-2 rounded-xl border border-white/10 hover:border-cyber-blue/40 disabled:opacity-30 disabled:cursor-not-allowed text-muted-foreground hover:text-cyber-blue transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <div className="flex gap-1.5">
                {Array.from({ length: totalPages }, (_, i) => (
                  <button
                    key={i}
                    onClick={() => setPage(i)}
                    className={`w-2 h-2 rounded-full transition-all duration-200 ${
                      i === page
                        ? "bg-cyber-blue scale-125"
                        : "bg-white/20 hover:bg-white/40"
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
                disabled={page === totalPages - 1}
                className="p-2 rounded-xl border border-white/10 hover:border-cyber-blue/40 disabled:opacity-30 disabled:cursor-not-allowed text-muted-foreground hover:text-cyber-blue transition-colors"
              >
                <ChevronRight className="w-4 h-4" />
              </button>

              <span className="text-xs text-muted-foreground/60 ml-1">
                Page {page + 1} of {totalPages}
              </span>
            </div>
          </FadeIn>
        )}
      </div>

      {/* Markdown Notes Drawer */}
      <MeetupNotesDrawer
        meetup={selectedMeetup}
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      />
    </section>
  );
}
