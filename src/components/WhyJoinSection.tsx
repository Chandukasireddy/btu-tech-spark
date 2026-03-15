import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import {
  Users, Hammer, Mic, Cpu, TrendingUp, Code2, Target, GitMerge, Star, Zap
} from "lucide-react";

const benefits = [
  { icon: <Users className="w-5 h-5" />, title: "Meet Passionate Tech Students", desc: "Connect with like-minded builders who love technology as much as you do.", color: "text-cyber-blue", bg: "bg-primary/10", border: "border-primary/20" },
  { icon: <Hammer className="w-5 h-5" />, title: "Build Real Projects", desc: "Go beyond tutorials. Ship actual products with your community.", color: "text-cyber-green", bg: "bg-cyber-green/10", border: "border-cyber-green/20" },
  { icon: <Mic className="w-5 h-5" />, title: "Improve Public Speaking", desc: "Present your ideas and improve with every session. Low pressure, high support.", color: "text-cyber-purple", bg: "bg-cyber-purple/10", border: "border-cyber-purple/20" },
  { icon: <Cpu className="w-5 h-5" />, title: "Learn New Tools & Technologies", desc: "From LLMs to devtools — stay sharp with hands-on learning.", color: "text-cyber-blue", bg: "bg-primary/10", border: "border-primary/20" },
  { icon: <TrendingUp className="w-5 h-5" />, title: "Stay Ahead in AI", desc: "Weekly breakdowns of the most important AI developments — no hype, just signal.", color: "text-cyber-green", bg: "bg-cyber-green/10", border: "border-cyber-green/20" },
  { icon: <Code2 className="w-5 h-5" />, title: "Strengthen Coding Skills", desc: "DSA sessions, peer reviews, and hack nights sharpen your technical edge.", color: "text-cyber-purple", bg: "bg-cyber-purple/10", border: "border-cyber-purple/20" },
  { icon: <Target className="w-5 h-5" />, title: "Prepare for Interviews", desc: "Mock interviews, experience sharing, and job search strategy — together.", color: "text-cyber-blue", bg: "bg-primary/10", border: "border-primary/20" },
  { icon: <GitMerge className="w-5 h-5" />, title: "Find Project Contributors", desc: "Got an idea? Find teammates. Looking to help? Find a project.", color: "text-cyber-green", bg: "bg-cyber-green/10", border: "border-cyber-green/20" },
  { icon: <Star className="w-5 h-5" />, title: "Gain Confidence & Experience", desc: "Every session builds your skills and your network.", color: "text-cyber-purple", bg: "bg-cyber-purple/10", border: "border-cyber-purple/20" },
  { icon: <Zap className="w-5 h-5" />, title: "BTU's Fastest-Growing Tech Club", desc: "Be part of something that's growing fast and leaving a mark on campus.", color: "text-cyber-blue", bg: "bg-primary/10", border: "border-primary/20" },
];

function FadeIn({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay, ease: [0.4, 0, 0.2, 1] }}
    >
      {children}
    </motion.div>
  );
}

export default function WhyJoinSection() {
  return (
    <section id="why-join" className="py-24 relative">
      {/* Subtle section background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-900/20 to-transparent pointer-events-none" />

      <div className="section-container relative z-10">
        <FadeIn>
          <div className="text-center mb-14">
            <span className="mono-tag text-cyber-blue">05 — Why Join</span>
            <h2 className="mt-3 text-4xl md:text-5xl font-bold tracking-tight">
              Your <span className="gradient-text">Growth</span> Starts Here
            </h2>
            <p className="mt-4 text-muted-foreground max-w-xl mx-auto text-pretty">
              Ten concrete reasons why BTU Tech Hub is the best club decision you'll make this semester.
            </p>
          </div>
        </FadeIn>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {benefits.map((benefit, i) => (
            <FadeIn key={i} delay={0.04 * i}>
              <div className={`glass-card rounded-2xl p-5 flex flex-col gap-3 group hover:${benefit.border} transition-all duration-200 h-full`}>
                <div className={`w-10 h-10 rounded-xl ${benefit.bg} border ${benefit.border} flex items-center justify-center ${benefit.color} flex-shrink-0`}>
                  {benefit.icon}
                </div>
                <div>
                  <h3 className="font-semibold text-sm leading-tight mb-1">{benefit.title}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">{benefit.desc}</p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
