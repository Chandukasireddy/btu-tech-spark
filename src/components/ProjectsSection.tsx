import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { ExternalLink, GitFork, Star } from "lucide-react";

const projects = [
  {
    name: "AskBTU",
    description: "An AI-powered Q&A assistant trained on BTU course materials and exam questions. Helps students study smarter.",
    tags: ["AI", "LLM", "Student Project"],
    stars: 12,
    color: "blue",
  },
  {
    name: "LectureFlow",
    description: "A collaborative note-taking platform for BTU students with real-time sync and AI-generated summaries.",
    tags: ["Web Dev", "Collaboration", "App"],
    stars: 8,
    color: "purple",
  },
  {
    name: "BTU Events Bot",
    description: "A Discord bot that scrapes and announces campus events, meetups, and deadlines directly to our server.",
    tags: ["Bot", "Discord", "Automation"],
    stars: 6,
    color: "green",
  },
  {
    name: "ML Paper Digest",
    description: "Weekly summaries of the most important ML/AI research papers, curated and simplified for students.",
    tags: ["ML", "Research", "AI"],
    stars: 15,
    color: "blue",
  },
  {
    name: "DSA Tracker",
    description: "Track your Leetcode-style progress with your study group. Visualize streaks and milestones.",
    tags: ["App", "Student Project", "Web Dev"],
    stars: 9,
    color: "purple",
  },
  {
    name: "BTU Tech Blog",
    description: "Community-written articles about tech, AI, career tips, and life at BTU. Open contributions welcome.",
    tags: ["Content", "Community", "Open Source"],
    stars: 11,
    color: "green",
  },
];

const tagColorMap: Record<string, string> = {
  AI: "border-cyber-blue/30 text-cyber-blue bg-primary/5",
  LLM: "border-cyber-blue/30 text-cyber-blue bg-primary/5",
  ML: "border-cyber-purple/30 text-cyber-purple bg-cyber-purple/5",
  Research: "border-cyber-purple/30 text-cyber-purple bg-cyber-purple/5",
  "Web Dev": "border-cyber-green/30 text-cyber-green bg-cyber-green/5",
  App: "border-cyber-green/30 text-cyber-green bg-cyber-green/5",
  "Student Project": "border-white/20 text-muted-foreground bg-white/5",
  "Open Source": "border-white/20 text-muted-foreground bg-white/5",
  Bot: "border-white/20 text-muted-foreground bg-white/5",
  Discord: "border-indigo-500/30 text-indigo-400 bg-indigo-500/5",
  Automation: "border-white/20 text-muted-foreground bg-white/5",
  Collaboration: "border-cyber-blue/30 text-cyber-blue bg-primary/5",
  Content: "border-white/20 text-muted-foreground bg-white/5",
  Community: "border-cyber-purple/30 text-cyber-purple bg-cyber-purple/5",
};

const glowColors: Record<string, string> = {
  blue: "hover:shadow-[0_0_30px_-10px_rgba(56,189,248,0.3)]",
  purple: "hover:shadow-[0_0_30px_-10px_rgba(168,85,247,0.3)]",
  green: "hover:shadow-[0_0_30px_-10px_rgba(34,197,94,0.3)]",
};

function FadeIn({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay, ease: [0.4, 0, 0.2, 1] }}
    >
      {children}
    </motion.div>
  );
}

export default function ProjectsSection() {
  return (
    <section id="projects" className="py-24">
      <div className="section-container">
        <FadeIn>
          <div className="text-center mb-14">
            <span className="mono-tag text-cyber-blue">04 — Projects</span>
            <h2 className="mt-3 text-4xl md:text-5xl font-bold tracking-tight">
              What We're <span className="gradient-text">Building</span>
            </h2>
            <p className="mt-4 text-muted-foreground max-w-xl mx-auto text-pretty">
              Community-driven projects born at BTU Tech Hub meetups. Contribute, fork, or just get inspired.
            </p>
          </div>
        </FadeIn>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {projects.map((project, i) => (
            <FadeIn key={i} delay={0.06 * i}>
              <div className={`project-card p-6 flex flex-col gap-4 group h-full ${glowColors[project.color]}`}>
                {/* Header */}
                <div className="flex items-start justify-between gap-3">
                  <h3 className="font-bold text-lg leading-tight tracking-tight">{project.name}</h3>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground flex-shrink-0">
                    <Star className="w-3 h-3" />
                    {project.stars}
                  </div>
                </div>

                {/* Description */}
                <p className="text-sm text-muted-foreground leading-relaxed flex-1 text-pretty">
                  {project.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className={`mono-tag px-2 py-0.5 rounded-full border ${tagColorMap[tag] || "border-white/10 text-muted-foreground bg-white/5"}`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Hover reveal button */}
                <div className="flex gap-2 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-200">
                  <a
                    href="https://discord.gg/jWHT3fPuHj"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-primary/30 text-cyber-blue text-xs font-semibold hover:bg-primary/10 transition-colors"
                  >
                    <GitFork className="w-3.5 h-3.5" />
                    Contribute
                  </a>
                  <a
                    href="https://discord.gg/jWHT3fPuHj"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-white/10 text-muted-foreground text-xs font-semibold hover:bg-white/5 transition-colors"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    Learn More
                  </a>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
