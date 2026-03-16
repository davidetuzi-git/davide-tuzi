import { motion } from "framer-motion";
import { fadeUp } from "@/lib/animations";
import logoPolito from "@/assets/logo-polito.png";
import logoMaastricht from "@/assets/logo-maastricht.png";
import logoErasmus from "@/assets/logo-erasmus.png";
import millerHeimanCert from "@/assets/miller-heiman-cert.jpg";
import kornFerryCert from "@/assets/korn-ferry-cert.png";

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
    logo: logoErasmus,
  },
  {
    institution: "Maastricht School of Management",
    degree: "Executive MBA",
    description: "MBA with digital specialization: digital transformation, data analytics, e-commerce, technology management, and cybersecurity. Master thesis on Finance.",
    logo: logoMaastricht,
  },
];

const certifications = [
  {
    name: "Strategic Selling® with Perspective",
    issuer: "Korn Ferry (Miller Heiman Group)",
    year: "2025",
    image: kornFerryCert,
  },
  {
    name: "Miller Heiman Certification",
    issuer: "Miller Heiman Group",
    year: "Previous",
    image: millerHeimanCert,
  },
];

export function QualificationSection() {
  return (
    <section className="min-h-svh flex items-center px-8 py-20">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        transition={{ staggerChildren: 0.15 }}
        className="max-w-6xl mx-auto w-full"
      >
        <motion.p variants={fadeUp} className="label-mono mb-4 text-primary">Education</motion.p>
        <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-bold text-foreground mb-12">
          Qualifications
        </motion.h2>
        <div className="grid md:grid-cols-3 gap-6">
          {qualifications.map((q) => (
            <motion.div key={q.institution} variants={fadeUp} className="monolith-card p-6 flex flex-col">
              {q.logo && (
                <div className="h-20 flex items-center mb-4">
                  <img src={q.logo} alt={q.institution} className="object-contain opacity-80 max-h-20" />
                </div>
              )}
              <p className="label-mono mb-3 text-primary">{q.institution}</p>
              <h3 className="text-lg font-semibold text-foreground mb-3">{q.degree}</h3>
              <p className="text-muted-foreground text-sm mt-auto">{q.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Certifications */}
        <motion.div variants={fadeUp} className="mt-16">
          <p className="label-mono mb-4 text-primary">📜 Professional Certifications</p>
          <div className="grid sm:grid-cols-2 gap-6">
            {certifications.map((cert) => (
              <motion.div key={cert.name} variants={fadeUp} className="monolith-card p-5 flex gap-5 items-center">
                <img
                  src={cert.image}
                  alt={cert.name}
                  className="w-32 h-24 object-cover rounded-lg border border-border shrink-0"
                />
                <div>
                  <span className="label-mono text-primary text-[10px]">{cert.year}</span>
                  <h4 className="text-base font-semibold text-foreground mt-1">{cert.name}</h4>
                  <p className="text-muted-foreground text-xs mt-1">{cert.issuer}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
