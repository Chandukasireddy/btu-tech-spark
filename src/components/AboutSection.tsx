import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Brain, Code2, Users, Presentation, Dumbbell, Target } from "lucide-react";

const activities = [
  { icon: <Brain className="w-5 h-5" />, label: "AI & LLM Discussions", color: "text-cyber-blue" },
  { icon: <Code2 className="w-5 h-5" />, label: "Hands-on Build Sessions", color: "text-cyber-green" },
  { icon: <Presentation className="w-5 h-5" />, label: "Project Presentations", color: "text-cyber-purple" },
  { icon: <Target className="w-5 h-5" />, label: "Interview Practice & DSA", color: "text-cyber-blue" },
  { icon: <Users className="w-5 h-5" />, label: "Peer Learning & Study Groups", color: "text-cyber-green" },
  { icon: <Dumbbell className="w-5 h-5" />, label: "Community Hangouts & Sports", color: "text-cyber-purple" },
];

function FadeIn({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
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

export default function AboutSection() {
  return (
    <section id="about" className="py-24">
      <div className="section-container">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Text */}
          <div className="space-y-6">
            <FadeIn>
              <span className="mono-tag text-cyber-blue">01 — What We Are</span>
            </FadeIn>
            <FadeIn delay={0.08}>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-balance">
                The Sunday Ritual{" "}
                <span className="gradient-text">for Builders</span>
              </h2>
            </FadeIn>
            <FadeIn delay={0.16}>
              <p className="text-muted-foreground leading-relaxed text-pretty">
                BTU Tech Hub is a student-led community at BTU Cottbus-Senftenberg for anyone passionate about technology, AI, and building things. Whether you're a first-semester student or a senior developer — you belong here.
              </p>
            </FadeIn>
            <FadeIn delay={0.24}>
              <p className="text-muted-foreground leading-relaxed text-pretty">
                We meet every Sunday at 14:00 in the IKMZ −1 floor cabins. It's not just about code — it's about community, growth, confidence, and the joy of building things together.
              </p>
            </FadeIn>
            <FadeIn delay={0.32}>
              <div className="flex flex-wrap gap-2 pt-2">
                {["AI", "LLMs", "Web Dev", "Open Source", "DSA", "Career Prep", "Community"].map((tag) => (
                  <span
                    key={tag}
                    className="mono-tag px-3 py-1 rounded-full border border-white/10 bg-white/5 text-muted-foreground hover:border-primary/30 hover:text-cyber-blue transition-colors"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </FadeIn>
          </div>

          {/* Right: Activity cards */}
          <div className="grid grid-cols-2 gap-3">
            {activities.map((activity, i) => (
              <FadeIn key={i} delay={0.08 * i}>
                <div className="glass-card rounded-2xl p-4 flex items-center gap-3 group hover:border-primary/20 transition-all duration-200 cursor-default">
                  <div className={`flex-shrink-0 p-2 rounded-lg bg-white/5 ${activity.color} group-hover:bg-white/10 transition-colors`}>
                    {activity.icon}
                  </div>
                  <span className="text-sm font-medium leading-tight">{activity.label}</span>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
