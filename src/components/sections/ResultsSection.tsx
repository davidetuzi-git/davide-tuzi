import { motion } from "framer-motion";
import { fadeUp } from "@/lib/animations";
import logoLuxottica from "@/assets/logo-luxottica.png";
import logoTransmec from "@/assets/logo-transmec.png";
import logoDouglas from "@/assets/logo-douglas.png";
import logoArvato from "@/assets/logo-arvato.png";
import logoMrPrice from "@/assets/logo-mrprice.png";
import logoArcese from "@/assets/logo-arcese.png";
import logoCentrostyle from "@/assets/logo-centrostyle.png";

const deals = [
  { customer: "Luxottica", industry: "Fashion – Accessories", value: "€2M", year: "2024", logo: logoLuxottica, flag: "🇮🇹" },
  { customer: "TransmecLog", industry: "Fashion – Shoes", value: "€2.5M", year: "2024", logo: logoTransmec, flag: "🇮🇹" },
  { customer: "Douglas / Arvato", industry: "Fashion – Beauty", value: "€7M", year: "2024", logos: [logoDouglas, logoArvato], flag: "🇮🇹" },
  { customer: "Centro Style", industry: "Fashion – Accessories", value: "€2M", year: "2024", logo: logoCentrostyle, flag: "🇮🇹" },
  { customer: "FORTNA / MrPrice", industry: "Retail – Fashion", value: "€8M", year: "2025", logo: logoMrPrice, flag: "🇿🇦" },
  { customer: "Arcese for Ferrari", industry: "Automotive", value: "€10M", year: "2025", logo: logoArcese, flag: "🇮🇹" },
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
          Some of the most memorable and biggest projects I have sold at HAI Robotics.
        </motion.p>
        <motion.div variants={fadeUp} className="monolith-card p-5 mb-12 inline-flex items-center gap-3 border-primary/20 bg-primary/5">
          <span className="text-primary font-semibold text-sm">🏢 Negotiating with C-Level executives of Fortune 500 companies</span>
        </motion.div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {deals.map((d) => (
            <motion.div key={d.customer} variants={fadeUp} className="monolith-card p-6 transition-all duration-300 flex flex-col">
              {/* Logo area - fixed height for alignment */}
              <div className="h-16 flex items-center mb-4">
                {'logos' in d && d.logos ? (
                  <div className="flex items-center gap-3">
                    {d.logos.map((logo, i) => (
                      <img key={i} src={logo} alt={d.customer} className="h-10 object-contain opacity-70" />
                    ))}
                  </div>
                ) : 'logo' in d && d.logo ? (
                  <img src={d.logo} alt={d.customer} className={`object-contain opacity-70 ${d.customer === 'Luxottica' ? 'h-20' : d.customer === 'FORTNA / MrPrice' ? 'h-16' : 'h-12'}`} />
                ) : null}
              </div>
              {/* Info area */}
              <p className="label-mono text-primary mb-2">{d.year}</p>
              <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">{d.customer} <span className="text-base">{d.flag}</span></h3>
              <p className="text-muted-foreground text-sm mb-4">{d.industry}</p>
              {/* Value - pushed to bottom */}
              <p className="text-3xl font-bold bg-gradient-to-r from-primary to-[hsl(200_90%_55%)] bg-clip-text text-transparent mt-auto">{d.value}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
