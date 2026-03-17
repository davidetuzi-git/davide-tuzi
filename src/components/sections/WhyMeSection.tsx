import { motion } from "framer-motion";
import { fadeUp } from "@/lib/animations";
import { Cpu, Globe, Users, TrendingUp, Heart, Briefcase, Award } from "lucide-react";

const reasons = [
  { icon: Cpu, text: "Experience with technology, hardware & software solutions" },
  { icon: Globe, text: "International experience across cultures" },
  { icon: Briefcase, text: "Selling since 2016" },
  { icon: TrendingUp, text: "Entrepreneur by DNA" },
  { icon: Users, text: "Negotiating with C-level big players" },
  { icon: Award, text: "Miller-Heiman training certified" },
  { icon: Heart, text: "Passion for what I do!" },
];

export function WhyMeSection() {
  return (
    <section className="min-h-svh flex items-center px-8 py-20">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        transition={{ staggerChildren: 0.1 }}
        className="max-w-6xl mx-auto w-full"
      >
        <motion.p variants={fadeUp} className="label-mono mb-4 text-primary">The Pitch</motion.p>
        <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-bold text-foreground mb-12">
          Why Me for You?
        </motion.h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {reasons.map((r) => (
            <motion.div key={r.text} variants={fadeUp} className="monolith-card p-6 flex items-start gap-4">
              <r.icon className="w-6 h-6 text-primary shrink-0 mt-0.5" strokeWidth={1.5} />
              <span className="text-secondary-foreground">{r.text}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
