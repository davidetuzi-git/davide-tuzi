import { motion } from "framer-motion";
import { fadeUp } from "@/lib/animations";
import logoLenntech from "@/assets/logo-lenntech.png";
import logoVanderlande from "@/assets/logo-vanderlande.png";
import logoHai from "@/assets/logo-hai-robotics.png";
import logoXton from "@/assets/logo-xton.png";

const careers = [
  {
    period: "2016 – 2018",
    company: "LenntecH",
    role: "Technical Sales Engineer",
    logo: logoLenntech,
    achievements: [
      "Exceeded sales quota by 20%",
      "New accounts acquired: portfolio increased by 50%",
      "Improved sales ops by developing an internal tool",
      "Successfully managed corporate accounts",
    ],
  },
  {
    period: "2018 – 2021",
    company: "Vanderlande",
    role: "Spare Parts Sales Engineer Specialist – Global Services",
    logo: logoVanderlande,
    achievements: [
      "100% complex project success rate",
      "Acted as Project Manager for project leads",
      "Price negotiation with major customers",
      "Successful cross-functional department collaboration",
    ],
  },
  {
    period: "2021 – Present",
    company: "HAI Robotics",
    role: "Country Manager Italy & Middle East",
    logo: logoHai,
    achievements: [
      "Built Italian team from scratch (7 professionals)",
      "€120M+ sales pipeline in 12 months, 300+ prospects",
      "Exceeded sales quota in 2 out of 3 years",
      "Pioneered the Middle East market from zero",
      "4 official partnerships signed",
    ],
  },
  {
    period: "2019 – 2023",
    company: "Nexton",
    role: "Co-Founder",
    logo: logoXton,
    achievements: [
      "Side entrepreneurial adventure in IoT industry",
    ],
  },
];

export function CareerSection() {
  return (
    <section className="min-h-svh flex items-center px-8 py-20">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        transition={{ staggerChildren: 0.12 }}
        className="max-w-6xl mx-auto w-full"
      >
        <motion.p variants={fadeUp} className="label-mono mb-4 text-primary">Experience</motion.p>
        <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-bold text-foreground mb-12">
          Career Path
        </motion.h2>
        <div className="space-y-6">
          {careers.map((c) => (
            <motion.div key={c.company} variants={fadeUp} className="monolith-card p-6 md:p-8">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                <div className="flex items-start gap-5">
                  <img
                    src={c.logo}
                    alt={`${c.company} logo`}
                    className="w-14 h-14 object-contain rounded-md bg-background border border-border p-1.5 shrink-0"
                  />
                  <div>
                    <span className="label-mono text-primary">{c.period}</span>
                    <h3 className="text-xl font-semibold text-foreground mt-1">{c.company}</h3>
                    <p className="text-muted-foreground text-sm">{c.role}</p>
                  </div>
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-2 ml-0 md:ml-[4.75rem]">
                {c.achievements.map((a) => (
                  <div key={a} className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                    <span className="text-secondary-foreground text-sm">{a}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
