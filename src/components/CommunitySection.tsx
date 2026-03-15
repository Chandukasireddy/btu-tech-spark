import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowRight, ExternalLink } from "lucide-react";

function FadeIn({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.4, 0, 0.2, 1] }}
    >
      {children}
    </motion.div>
  );
}

function DiscordLogo() {
  return (
    <svg viewBox="0 0 24 24" className="w-8 h-8" fill="currentColor">
      <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057c.002.02.01.04.025.057a19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z"/>
    </svg>
  );
}

function LumaLogo() {
  return (
    <svg viewBox="0 0 40 40" className="w-8 h-8" fill="none">
      <circle cx="20" cy="20" r="20" fill="currentColor" opacity="0.2"/>
      <text x="50%" y="55%" dominantBaseline="middle" textAnchor="middle" fontSize="18" fontWeight="bold" fill="currentColor">L</text>
    </svg>
  );
}

export default function CommunitySection() {
  return (
    <section id="community" className="py-32">
      <div className="section-container">
        <FadeIn>
          <div className="text-center mb-14">
            <span className="mono-tag text-cyber-blue">06 — Community</span>
            <h2 className="mt-3 text-4xl md:text-5xl font-bold tracking-tight">
              Join the <span className="gradient-text">Community</span>
            </h2>
            <p className="mt-4 text-muted-foreground max-w-xl mx-auto text-pretty">
              Two ways to stay connected and never miss a thing.
            </p>
          </div>
        </FadeIn>

        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {/* Discord card */}
          <FadeIn delay={0.1}>
            <div
              className="glass-card rounded-3xl p-8 flex flex-col gap-6 group cursor-pointer hover:scale-[1.01] transition-all duration-200"
              style={{ background: "linear-gradient(135deg, rgba(88,101,242,0.12) 0%, rgba(15,23,42,0.7) 100%)" }}
            >
              <div className="flex items-center justify-between">
                <div className="w-14 h-14 rounded-2xl bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
                  <DiscordLogo />
                </div>
                <span className="mono-tag text-indigo-400 border border-indigo-500/30 bg-indigo-500/10 px-3 py-1 rounded-full">Free</span>
              </div>

              <div>
                <h3 className="text-2xl font-bold tracking-tight mb-2">Join Our Discord</h3>
                <p className="text-muted-foreground leading-relaxed text-pretty">
                  Stay updated, chat with members, get announcements, and grow together. The heartbeat of our community lives on Discord.
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                {["Announcements", "Project Channels", "AI Chat", "Opportunities"].map((ch) => (
                  <span key={ch} className="mono-tag px-2 py-1 rounded-md border border-indigo-500/20 text-indigo-400/70 bg-indigo-500/5">
                    #{ch.toLowerCase().replace(" ", "-")}
                  </span>
                ))}
              </div>

              <a
                href="https://discord.gg/jWHT3fPuHj"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-3 rounded-xl btn-discord text-base font-semibold"
              >
                <DiscordLogo />
                Join Discord
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </FadeIn>

          {/* Luma card */}
          <FadeIn delay={0.2}>
            <div
              className="glass-card rounded-3xl p-8 flex flex-col gap-6 group cursor-pointer hover:scale-[1.01] transition-all duration-200"
              style={{ background: "linear-gradient(135deg, rgba(56,189,248,0.1) 0%, rgba(15,23,42,0.7) 100%)" }}
            >
              <div className="flex items-center justify-between">
                <div className="w-14 h-14 rounded-2xl bg-primary/20 border border-primary/30 flex items-center justify-center text-cyber-blue">
                  <LumaLogo />
                </div>
                <span className="mono-tag text-cyber-blue border border-primary/30 bg-primary/10 px-3 py-1 rounded-full">Events</span>
              </div>

              <div>
                <h3 className="text-2xl font-bold tracking-tight mb-2">Register on Luma</h3>
                <p className="text-muted-foreground leading-relaxed text-pretty">
                  All BTU Tech Hub events are registered and managed through Luma. RSVP to our Sunday meetups and never miss a session.
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                {["Sunday Meetups", "Workshops", "Hackathons", "Talks"].map((ev) => (
                  <span key={ev} className="mono-tag px-2 py-1 rounded-md border border-primary/20 text-cyber-blue/70 bg-primary/5">
                    {ev}
                  </span>
                ))}
              </div>

              <a
                href="https://luma.com/calendar/cal-15EeqDt3eUrf1et"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-3 rounded-xl btn-cyber text-base font-semibold"
              >
                <ExternalLink className="w-4 h-4" />
                View on Luma
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
