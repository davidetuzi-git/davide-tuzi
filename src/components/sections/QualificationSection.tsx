import { motion } from "framer-motion";
import { fadeUp } from "@/lib/animations";
import logoPolito from "@/assets/logo-polito.png";
import logoMaastricht from "@/assets/logo-maastricht.png";

const qualifications = [
  {
    institution: "Politecnico di Torino",
    degree: "B.Sc. & M.Sc. Civil Engineering",
    description: "Acquired all the knowledge and tools related to engineering with focus on infrastructures and structures.",
    logo: logoPolito,
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
    logo: logoMaastricht,
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
        <motion.p variants={fadeUp} className="label-mono mb-4 text-primary">Education</motion.p>
        <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-bold text-foreground mb-12">
          Qualifications
        </motion.h2>
        <div className="grid md:grid-cols-3 gap-6">
          {qualifications.map((q) => (
            <motion.div key={q.institution} variants={fadeUp} className="monolith-card p-6">
              {q.logo && (
                <img src={q.logo} alt={q.institution} className="h-12 object-contain mb-4 opacity-80" />
              )}
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
