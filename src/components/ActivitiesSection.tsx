import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import {
  Cpu, FlaskConical, Code, Mic2, Terminal, BrainCircuit,
  BookOpen, FolderKanban, Snowflake, Mountain, Waves, TrendingUp,
  Dumbbell, Users
} from "lucide-react";

const techActivities = [
  { icon: <BrainCircuit className="w-4 h-4" />, label: "Weekly Tech Talks", desc: "AI trends, LLMs, tools & more" },
  { icon: <Cpu className="w-4 h-4" />, label: "AI + LLM News Breakdown", desc: "Stay on top of fast-moving AI" },
  { icon: <Code className="w-4 h-4" />, label: "Build Sessions", desc: "Hack together, ship together" },
  { icon: <Mic2 className="w-4 h-4" />, label: "Project Presentations", desc: "Share what you're building" },
  { icon: <Terminal className="w-4 h-4" />, label: "DSA Problem Solving", desc: "Leetcode-style group sessions" },
  { icon: <FlaskConical className="w-4 h-4" />, label: "Interview Practice", desc: "Experience sharing & mock rounds" },
  { icon: <BookOpen className="w-4 h-4" />, label: "Study Groups & Exam Prep", desc: "Support for BTU coursework" },
  { icon: <FolderKanban className="w-4 h-4" />, label: "Student Project Collab", desc: "Find co-builders for your ideas" },
];

const communityActivities = [
  { icon: <Snowflake className="w-4 h-4" />, label: "Ice Skating", desc: "Winter vibes with the crew" },
  { icon: <Mountain className="w-4 h-4" />, label: "Hiking Trips", desc: "Nature & good conversations" },
  { icon: <Waves className="w-4 h-4" />, label: "Swimming", desc: "Splash sessions in summer" },
  { icon: <TrendingUp className="w-4 h-4" />, label: "Bouldering", desc: "Climbing challenges" },
  { icon: <Dumbbell className="w-4 h-4" />, label: "Sports Meetups", desc: "Football, volleyball & more" },
  { icon: <Users className="w-4 h-4" />, label: "Group Hangouts", desc: "Just vibes and good food" },
];

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

function ActivityCard({
  item,
  accentClass,
}: {
  item: { icon: React.ReactNode; label: string; desc: string };
  accentClass: string;
}) {
  return (
    <div className="flex items-start gap-3 p-4 rounded-xl border border-white/5 bg-white/2 hover:bg-white/5 hover:border-white/10 transition-all duration-150 group">
      <div className={`mt-0.5 flex-shrink-0 ${accentClass} opacity-70 group-hover:opacity-100 transition-opacity`}>
        {item.icon}
      </div>
      <div>
        <p className="text-sm font-semibold leading-tight">{item.label}</p>
        <p className="text-xs text-muted-foreground mt-0.5">{item.desc}</p>
      </div>
    </div>
  );
}

export default function ActivitiesSection() {
  return (
    <section id="activities" className="py-24">
      <div className="section-container">
        <FadeIn>
          <div className="text-center mb-14">
            <span className="mono-tag text-cyber-blue">03 — What We Do</span>
            <h2 className="mt-3 text-4xl md:text-5xl font-bold tracking-tight">
              More Than Just <span className="gradient-text">Code</span>
            </h2>
            <p className="mt-4 text-muted-foreground max-w-xl mx-auto text-pretty">
              Our meetups blend technical depth with genuine community. Here's what you'll find at a typical Sunday session.
            </p>
          </div>
        </FadeIn>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Tech column */}
          <FadeIn delay={0.1}>
            <div className="glass-card rounded-3xl p-6 md:p-8 h-full">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center">
                  <Cpu className="w-4 h-4 text-cyber-blue" />
                </div>
                <div>
                  <h3 className="font-bold">Tech & Learning</h3>
                  <p className="text-xs text-muted-foreground">Build skills, ship projects</p>
                </div>
              </div>
              <div className="grid gap-2">
                {techActivities.map((item, i) => (
                  <ActivityCard key={i} item={item} accentClass="text-cyber-blue" />
                ))}
              </div>
            </div>
          </FadeIn>

          {/* Community column */}
          <FadeIn delay={0.2}>
            <div className="glass-card rounded-3xl p-6 md:p-8 h-full">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 rounded-lg bg-cyber-purple/10 border border-cyber-purple/20 flex items-center justify-center">
                  <Users className="w-4 h-4 text-cyber-purple" />
                </div>
                <div>
                  <h3 className="font-bold">Community & Fun</h3>
                  <p className="text-xs text-muted-foreground">We're not just tech-only</p>
                </div>
              </div>
              <div className="grid gap-2">
                {communityActivities.map((item, i) => (
                  <ActivityCard key={i} item={item} accentClass="text-cyber-purple" />
                ))}
              </div>

              {/* Extra note */}
              <div className="mt-4 p-4 rounded-xl border border-cyber-green/20 bg-cyber-green/5">
                <p className="text-sm text-cyber-green font-semibold">🌍 Open to Everyone</p>
                <p className="text-xs text-muted-foreground mt-1">
                  All nationalities, all levels, all majors. If you're curious about tech, you're welcome here.
                </p>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
