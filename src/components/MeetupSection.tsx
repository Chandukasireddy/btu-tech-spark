import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useMemo, useRef, useState } from "react";
import { Calendar, ChevronLeft, ChevronRight, Clock, ExternalLink, MapPin, Navigation } from "lucide-react";
import { useCountdown } from "@/hooks/useCountdown";
import { Button } from "@/components/ui/button";
import meetup01Markdown from "@/content/meetups/meetup-01.md?raw";
import meetup02Markdown from "@/content/meetups/meetup-02.md?raw";
import meetup03Markdown from "@/content/meetups/meetup-03.md?raw";
import meetup04Markdown from "@/content/meetups/meetup-04.md?raw";
import meetup05Markdown from "@/content/meetups/meetup-05.md?raw";
import meetup06Markdown from "@/content/meetups/meetup-06.md?raw";
import meetup07Markdown from "@/content/meetups/meetup-07.md?raw";
import meetup08Markdown from "@/content/meetups/meetup-08.md?raw";
import meetup09Markdown from "@/content/meetups/meetup-09.md?raw";
import meetup10Markdown from "@/content/meetups/meetup-10.md?raw";
import meetup11Markdown from "@/content/meetups/meetup-11.md?raw";
import meetup12Markdown from "@/content/meetups/meetup-12.md?raw";
import meetup13Markdown from "@/content/meetups/meetup-13.md?raw";
import meetup14Markdown from "@/content/meetups/meetup-14.md?raw";
import meetup15Markdown from "@/content/meetups/meetup-15.md?raw";
import meetup16Markdown from "@/content/meetups/meetup-16.md?raw";
import meetup17Markdown from "@/content/meetups/meetup-17.md?raw";
import meetup18Markdown from "@/content/meetups/meetup-18.md?raw";
import meetup19Markdown from "@/content/meetups/meetup-19.md?raw";

const meetupMarkdowns = [
  meetup01Markdown,
  meetup02Markdown,
  meetup03Markdown,
  meetup04Markdown,
  meetup05Markdown,
  meetup06Markdown,
  meetup07Markdown,
  meetup08Markdown,
  meetup09Markdown,
  meetup10Markdown,
  meetup11Markdown,
  meetup12Markdown,
  meetup13Markdown,
  meetup14Markdown,
  meetup15Markdown,
  meetup16Markdown,
  meetup17Markdown,
  meetup18Markdown,
  meetup19Markdown,
];

function renderInlineMarkdown(text: string) {
  const parts = text.split(/(\*\*[^*]+\*\*|https?:\/\/\S+)/g).filter(Boolean);

  return parts.map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={`bold-${index}`} className="text-foreground font-semibold">
          {part.slice(2, -2)}
        </strong>
      );
    }

    if (/^https?:\/\//.test(part)) {
      return (
        <a
          key={`link-${index}`}
          href={part}
          target="_blank"
          rel="noopener noreferrer"
          className="text-cyber-blue hover:text-cyber-blue/80 underline underline-offset-4 break-all"
        >
          {part}
        </a>
      );
    }

    return <span key={`text-${index}`}>{part}</span>;
  });
}

function renderMeetupMarkdown(markdown: string) {
  const lines = markdown.split(/\r?\n/);
  const elements: React.ReactNode[] = [];
  let listBuffer: string[] = [];

  const flushList = () => {
    if (listBuffer.length === 0) {
      return;
    }

    elements.push(
      <ul key={`list-${elements.length}`} className="list-disc pl-5 space-y-1 mb-4 text-muted-foreground">
        {listBuffer.map((item, index) => (
          <li key={`item-${index}`}>{renderInlineMarkdown(item)}</li>
        ))}
      </ul>,
    );

    listBuffer = [];
  };

  lines.forEach((line) => {
    const trimmedLine = line.trim();

    if (!trimmedLine) {
      flushList();
      return;
    }

    if (trimmedLine.startsWith("- ")) {
      listBuffer.push(trimmedLine.slice(2));
      return;
    }

    flushList();

    if (trimmedLine.startsWith("# ")) {
      elements.push(
        <h4 key={`h1-${elements.length}`} className="text-2xl font-bold tracking-tight mb-4">
          {renderInlineMarkdown(trimmedLine.slice(2))}
        </h4>,
      );
      return;
    }

    if (trimmedLine.startsWith("## ")) {
      elements.push(
        <h5 key={`h2-${elements.length}`} className="text-lg font-semibold mt-7 mb-3 text-cyber-blue">
          {renderInlineMarkdown(trimmedLine.slice(3))}
        </h5>,
      );
      return;
    }

    elements.push(
      <p key={`p-${elements.length}`} className="text-sm md:text-base text-muted-foreground leading-relaxed mb-3">
        {renderInlineMarkdown(trimmedLine)}
      </p>,
    );
  });

  flushList();

  return elements;
}

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

export default function MeetupSection() {
  const countdown = useCountdown();
  const [selectedMeetupNumber, setSelectedMeetupNumber] = useState(19);

  const meetups = useMemo(
    () =>
      meetupMarkdowns.map((markdown, index) => ({
        number: index + 1,
        title: `BTU Tech Hub Meetup - ${index + 1}`,
        markdown,
        weekday: "Sunday",
        time: "2:00 PM",
        place: "IKMZ - BTU Cottbus-Senftenberg",
      })),
    [],
  );

  const selectedMeetup = meetups.find((meetup) => meetup.number === selectedMeetupNumber) ?? meetups[meetups.length - 1];

  const navigateMeetup = (direction: "prev" | "next") => {
    if (direction === "prev") {
      setSelectedMeetupNumber((current) => Math.max(1, current - 1));
      return;
    }

    setSelectedMeetupNumber((current) => Math.min(meetups.length, current + 1));
  };

  return (
    <section id="meetup" className="py-24">
      <div className="section-container">
        <FadeIn>
          <div className="text-center mb-12">
            <span className="mono-tag text-cyber-blue">02 — Meetup Timeline</span>
            <h2 className="mt-3 text-4xl md:text-5xl font-bold tracking-tight">
              All <span className="gradient-text">19 Meetups</span> in One Place
            </h2>
          </div>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div className="max-w-5xl mx-auto space-y-6">
            <div className="glass-card rounded-2xl p-4 md:p-5">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <p className="mono-tag text-cyber-green">Easy Navigation</p>
                  <p className="text-sm text-muted-foreground mt-1">Select any meetup to read its markdown details.</p>
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => navigateMeetup("prev")}
                    disabled={selectedMeetupNumber === 1}
                    className="bg-transparent"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    Prev
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => navigateMeetup("next")}
                    disabled={selectedMeetupNumber === meetups.length}
                    className="bg-transparent"
                  >
                    Next
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <div className="mt-4 overflow-x-auto">
                <div className="flex gap-2 min-w-max pb-1">
                  {meetups.map((meetup) => (
                    <button
                      key={meetup.number}
                      type="button"
                      onClick={() => setSelectedMeetupNumber(meetup.number)}
                      className={`rounded-lg px-3 py-2 text-sm font-medium transition-all border ${
                        selectedMeetupNumber === meetup.number
                          ? "border-cyber-blue/60 bg-cyber-blue/10 text-cyber-blue"
                          : "border-white/10 bg-background/30 text-muted-foreground hover:text-foreground hover:border-white/20"
                      }`}
                    >
                      Meetup {meetup.number}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div
              className="glass-card rounded-3xl overflow-hidden hover:scale-[1.01] transition-all duration-200"
              style={{ boxShadow: "0 0 40px -10px rgba(56,189,248,0.15), inset 0 1px 1px 0 rgba(255,255,255,0.1)" }}
            >
              <div className="relative px-8 pt-8 pb-6 border-b border-white/5">
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="w-2 h-2 rounded-full bg-cyber-green animate-pulse" />
                      <span className="mono-tag text-cyber-green">Meetup {selectedMeetup.number} of 19</span>
                    </div>
                    <h3 className="text-2xl font-bold tracking-tight">{selectedMeetup.title}</h3>
                    <p className="text-muted-foreground mt-1 text-sm">Connect · Learn · Build · Review past sessions</p>
                  </div>

                  <a
                    href="https://luma.com/calendar/cal-15EeqDt3eUrf1et"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl btn-cyber text-sm font-semibold flex-shrink-0"
                  >
                    View on Luma
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>

                <div className="flex flex-wrap gap-4 mt-5 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-4 h-4 text-cyber-blue" />
                    {selectedMeetup.weekday}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-cyber-purple" />
                    {selectedMeetup.time}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-cyber-green" />
                    {selectedMeetup.place}
                  </div>
                </div>
              </div>

              <div className="px-8 py-8 space-y-7">
                {selectedMeetup.number === 19 && (
                  <div className="flex flex-col items-center gap-6 border border-cyber-blue/20 rounded-2xl bg-cyber-blue/5 p-6">
                    <p className="mono-tag text-muted-foreground">Current meetup starts in</p>

                    <div className="flex items-center gap-3 md:gap-4">
                      <DigitBlock value={countdown.days} label="Days" />
                      <span className="text-2xl font-bold text-cyber-blue/40 mb-5 font-mono">:</span>
                      <DigitBlock value={countdown.hours} label="Hours" />
                      <span className="text-2xl font-bold text-cyber-blue/40 mb-5 font-mono">:</span>
                      <DigitBlock value={countdown.minutes} label="Min" />
                      <span className="text-2xl font-bold text-cyber-blue/40 mb-5 font-mono">:</span>
                      <DigitBlock value={countdown.seconds} label="Sec" />
                    </div>
                  </div>
                )}

                <div className="rounded-2xl border border-white/10 bg-background/25 p-5 md:p-6 text-left">
                  {renderMeetupMarkdown(selectedMeetup.markdown)}
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
      </div>
    </section>
  );
}
