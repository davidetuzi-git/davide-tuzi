import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

const qualifications = [
  {
    institution: "Politecnico di Torino",
    degree: "B.Sc. & M.Sc. Civil Engineering",
    description: "Acquired all the knowledge and tools related to engineering with focus on infrastructures and structures.",
  },
  {
    institution: "Erasmus for Young Entrepreneurs",
    degree: "Entrepreneurship Program",
    description: "Selected candidate for Erasmus experience in Finland. Reinforced entrepreneurship skills.",
  },
  {
    institution: "Maastricht School of Management",
    degree: "Executive MBA",
    description: "MBA with digital specialization: digital transformation, data analytics, e-commerce, technology management, and cybersecurity.",
  },
];

export function QualificationSection() {
  return (
    <section className="min-h-svh flex items-center px-8 py-20">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        transition={{ staggerChildren: 0.15 }}
        className="max-w-6xl mx-auto w-full"
      >
        <motion.p variants={fadeUp} className="label-mono mb-4">Education</motion.p>
        <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-bold text-foreground mb-12">
          Qualifications
        </motion.h2>
        <div className="grid md:grid-cols-3 gap-6">
          {qualifications.map((q) => (
            <motion.div key={q.institution} variants={fadeUp} className="monolith-card p-6">
              <p className="label-mono mb-3 text-primary">{q.institution}</p>
              <h3 className="text-lg font-semibold text-foreground mb-3">{q.degree}</h3>
              <p className="text-muted-foreground text-sm">{q.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
