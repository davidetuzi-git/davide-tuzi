import { motion } from "framer-motion";
import { fadeUp } from "@/lib/animations";
import logoLuxottica from "@/assets/logo-luxottica.png";
import logoTransmec from "@/assets/logo-transmec.png";
import logoDouglas from "@/assets/logo-douglas.png";
import logoArvato from "@/assets/logo-arvato.png";
import logoMrPrice from "@/assets/logo-mrprice.png";
import logoArcese from "@/assets/logo-arcese.png";

const deals = [
  { customer: "Luxottica", industry: "Fashion – Accessories", value: "€700k", year: "2024", logo: logoLuxottica },
  { customer: "TransmecLog", industry: "Fashion – Shoes", value: "€700k", year: "2024", logo: logoTransmec },
  { customer: "Douglas / Arvato", industry: "Fashion – Beauty", value: "€7M", year: "2024", logos: [logoDouglas, logoArvato] },
  { customer: "ICentro Style", industry: "Fashion – Accessories", value: "€500k", year: "2024" },
  { customer: "FORTNA / MrPrice", industry: "Retail – Fashion", value: "€7.2M", year: "2025", logo: logoMrPrice },
  { customer: "Arcese for Ferrari", industry: "Automotive", value: "€9M", year: "2025", logo: logoArcese },
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
              {'logos' in d && d.logos ? (
                <div className="flex items-center gap-3 mb-4">
                  {d.logos.map((logo, i) => (
                    <img key={i} src={logo} alt={d.customer} className="h-16 object-contain opacity-70" />
                  ))}
                </div>
              ) : 'logo' in d && d.logo ? (
                <img src={d.logo} alt={d.customer} className="h-16 object-contain mb-4 opacity-70" />
              ) : null}
              <p className="label-mono text-primary mb-2">{d.year}</p>
              <h3 className="text-lg font-semibold text-foreground">{d.customer}</h3>
              <p className="text-muted-foreground text-sm mb-4">{d.industry}</p>
              <p className="text-3xl font-bold bg-gradient-to-r from-primary to-[hsl(200_90%_55%)] bg-clip-text text-transparent">{d.value}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
