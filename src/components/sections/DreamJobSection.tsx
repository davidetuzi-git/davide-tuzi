import { motion } from "framer-motion";
import { fadeUp } from "@/lib/animations";
import { Plane, Home, Shield, Target, Scale, Users, Flame } from "lucide-react";

const traits = [
  { icon: Plane, label: "Good balance travel / home" },
  { icon: Home, label: "Remote when not travelling" },
  { icon: Shield, label: "High responsibility" },
  { icon: Target, label: "Sales & Strategy focused" },
  { icon: Scale, label: "Good work-life balance" },
  { icon: Users, label: "Managing a team" },
  { icon: Flame, label: "I love challenges" },
];

export function DreamJobSection() {
  return (
    <section className="flex items-center px-8 py-12 md:py-20">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        transition={{ staggerChildren: 0.1 }}
        className="max-w-6xl mx-auto w-full"
      >
        <motion.p variants={fadeUp} className="label-mono mb-4 text-primary">What I'm Looking For</motion.p>
        <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-bold text-foreground mb-4">
          What I Care in a Job
        </motion.h2>
        <motion.p variants={fadeUp} className="text-muted-foreground mb-8">
          The ingredients of a role where I can truly thrive.
        </motion.p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {traits.map((t) => (
            <motion.div
              key={t.label}
              variants={fadeUp}
              className="monolith-card p-5 flex items-center gap-4"
            >
              <div className="w-10 h-10 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                <t.icon className="w-5 h-5 text-primary" />
              </div>
              <span className="text-sm font-medium text-foreground">{t.label}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
