import { motion } from "framer-motion";
import { fadeUp } from "@/lib/animations";

const skills = [
  "Business Development",
  "Strategic Vision",
  "Leadership",
  "Market Knowledge",
  "Financial Acumen",
  "Problem-Solver",
  "Effective Communicator",
  "Negotiation",
  "Cross-cultural Sensitivity",
  "Relationship Building",
];

export function SkillsSection() {
  return (
    <section className="min-h-svh flex items-center px-8 py-20">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        transition={{ staggerChildren: 0.08 }}
        className="max-w-6xl mx-auto w-full"
      >
        <motion.p variants={fadeUp} className="label-mono mb-4 text-primary">Competencies</motion.p>
        <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-bold text-foreground mb-6">
          Skills Set
        </motion.h2>
        <motion.blockquote variants={fadeUp} className="text-muted-foreground italic border-l-2 border-primary pl-6 mb-12 max-w-3xl">
          "Relatively young yet experienced business initiator with a proven track record in leadership, strategic vision, and business development. Adept at communication, negotiation, and crisis management, committed to upholding compliance and ethics while building lasting relationships for sustainable growth."
        </motion.blockquote>
        <div className="flex flex-wrap gap-3">
          {skills.map((skill) => (
            <motion.div
              key={skill}
              variants={fadeUp}
              className="monolith-card px-5 py-3 text-sm text-foreground font-medium hover:bg-primary/5 hover:text-primary transition-colors"
            >
              {skill}
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
