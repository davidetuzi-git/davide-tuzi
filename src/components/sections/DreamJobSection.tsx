import { motion } from "framer-motion";
import { fadeUp } from "@/lib/animations";
import { Plane, Home, Shield, Target, Scale, Users, Flame } from "lucide-react";

const traits = [
  { icon: Plane, label: "Good balance travel / home", desc: "I love travelling nationally and internationally — business is a person-to-person thing. Based near FCO airport and Rome's main high-speed rail hub." },
  { icon: Home, label: "Remote when not travelling", desc: "Recharging energy is vital. My family is my daily dopamine and motivation — time with them is priceless and fuels my performance." },
  { icon: Shield, label: "High responsibility", desc: "I'm not afraid of taking responsibility and running calculated risks. Autonomy and independence in decision-making make me feel trusted and empowered." },
  { icon: Target, label: "Sales & Strategy focused", desc: "I thrive when combining hands-on selling with strategic thinking — shaping go-to-market plans and turning vision into revenue." },
  { icon: Scale, label: "Good work-life balance", desc: "Sustained high performance requires balance. I give my best when I can recharge and be fully present both at work and at home." },
  { icon: Users, label: "Managing a team", desc: "Building, mentoring and leading teams is where I find purpose. Watching people grow is one of the most rewarding parts of my career." },
  { icon: Flame, label: "I love challenges", desc: "Comfort zones don't excite me. I'm energised by ambitious targets, uncharted markets and problems others shy away from." },
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
              className="monolith-card p-5 flex items-start gap-4"
            >
              <div className="w-10 h-10 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0 mt-0.5">
                <t.icon className="w-5 h-5 text-primary" />
              </div>
              <div>
                <span className="text-sm font-semibold text-foreground">{t.label}</span>
                <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{t.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
