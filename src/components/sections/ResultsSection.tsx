import { motion } from "framer-motion";
import { fadeUp } from "@/lib/animations";

const deals = [
  { customer: "Luxottica", industry: "Fashion – Accessories", value: "€625k", year: "2024" },
  { customer: "TransmecLog", industry: "Fashion – Shoes", value: "€680k", year: "2024" },
  { customer: "Douglas", industry: "Fashion – Beauty", value: "€7M", year: "2024" },
  { customer: "ICentro Style", industry: "Fashion – Accessories", value: "€485k", year: "2024" },
  { customer: "FORTNA / MrPrice", industry: "Retail – Fashion", value: "€7.2M", year: "2025" },
  { customer: "Arcese for Ferrari", industry: "Automotive", value: "€9M", year: "2025" },
];

export function ResultsSection() {
  return (
    <section className="min-h-svh flex items-center px-8 py-20">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        transition={{ staggerChildren: 0.1 }}
        className="max-w-6xl mx-auto w-full"
      >
        <motion.p variants={fadeUp} className="label-mono mb-4 text-primary">Track Record</motion.p>
        <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-bold text-foreground mb-4">
          From 0 to +€25M in less than 2.5 years
        </motion.h2>
        <motion.p variants={fadeUp} className="text-muted-foreground mb-4">
          Selected highlights from key deals developed at HAI Robotics.
        </motion.p>
        <motion.div variants={fadeUp} className="monolith-card p-5 mb-12 inline-flex items-center gap-3 border-primary/20 bg-primary/5">
          <span className="text-primary font-semibold text-sm">🏢 Negotiating with C-Level executives of Fortune 500 companies</span>
        </motion.div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {deals.map((d) => (
            <motion.div key={d.customer} variants={fadeUp} className="monolith-card p-6 transition-all duration-300">
              <p className="label-mono text-primary mb-2">{d.year}</p>
              <h3 className="text-lg font-semibold text-foreground">{d.customer}</h3>
              <p className="text-muted-foreground text-sm mb-4">{d.industry}</p>
              <p className="text-3xl font-bold text-primary">{d.value}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
