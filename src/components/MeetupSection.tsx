import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { MapPin, Clock, Calendar, ExternalLink, Navigation } from "lucide-react";
import { useCountdown } from "@/hooks/useCountdown";

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

  return (
    <section id="meetup" className="py-24">
      <div className="section-container">
        <FadeIn>
          <div className="text-center mb-12">
            <span className="mono-tag text-cyber-blue">02 — Next Meetup</span>
            <h2 className="mt-3 text-4xl md:text-5xl font-bold tracking-tight">
              Join Us This <span className="gradient-text">Sunday</span>
            </h2>
          </div>
        </FadeIn>

        {/* Luma-style event card */}
        <FadeIn delay={0.1}>
          <div className="max-w-3xl mx-auto">
            <div
              className="glass-card rounded-3xl overflow-hidden hover:scale-[1.01] transition-all duration-200"
              style={{ boxShadow: "0 0 40px -10px rgba(56,189,248,0.15), inset 0 1px 1px 0 rgba(255,255,255,0.1)" }}
            >
              {/* Card header */}
              <div className="relative px-8 pt-8 pb-6 border-b border-white/5">
                {/* Top gradient stripe */}
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="w-2 h-2 rounded-full bg-cyber-green animate-pulse" />
                      <span className="mono-tag text-cyber-green">Live Weekly</span>
                    </div>
                    <h3 className="text-2xl font-bold tracking-tight">BTU Tech Hub Meetup</h3>
                    <p className="text-muted-foreground mt-1 text-sm">Connect · Learn · Build</p>
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

                {/* Info row */}
                <div className="flex flex-wrap gap-4 mt-5 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-4 h-4 text-cyber-blue" />
                    Every Sunday
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

                {/* Location guide */}
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
