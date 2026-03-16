import { motion } from "framer-motion";
import { fadeUp } from "@/lib/animations";

const swot = [
  {
    title: "Strengths",
    items: ["Resolute", "Excellent Planner", "Open-minded Enthusiast", "Possibility-finder", "Out-of-the-box Thinker"],
  },
  {
    title: "Weaknesses",
    items: ["Need to Know Details", "Impatient for Results", "Workaholic", "Balance the Passion"],
  },
  {
    title: "Opportunities",
    items: ["Personal Growth", "Lead by Example", "Skill Diversification", "Mentorship", "Entrepreneurship"],
  },
  {
    title: "Threats",
    items: ["Personal Affection"],
  },
];

export function SwotSection() {
  return (
    <section className="min-h-svh flex items-center px-8 py-20">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        transition={{ staggerChildren: 0.12 }}
        className="max-w-6xl mx-auto w-full"
      >
        <motion.p variants={fadeUp} className="label-mono mb-4">Self-Assessment</motion.p>
        <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-bold text-foreground mb-12">
          SWOT Analysis
        </motion.h2>
        <div className="grid sm:grid-cols-2 gap-6">
          {swot.map((s) => (
            <motion.div key={s.title} variants={fadeUp} className="monolith-card p-6">
              <h3 className="label-mono text-primary mb-4">{s.title}</h3>
              <ul className="space-y-2">
                {s.items.map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-foreground/40" />
                    <span className="text-secondary-foreground text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
