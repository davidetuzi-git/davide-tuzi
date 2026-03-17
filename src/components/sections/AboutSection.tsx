import { motion } from "framer-motion";
import { fadeUp } from "@/lib/animations";
import aboutImg2 from "@/assets/about-2.jpg";
import aboutWedding from "@/assets/about-wedding.jpg";
import aboutCats from "@/assets/about-cats.jpg";


export function AboutSection() {
  return (
    <section className="min-h-svh flex items-center px-8 py-20">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        transition={{ staggerChildren: 0.15 }}
        className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center"
      >
        <div>
          <motion.p variants={fadeUp} className="label-mono mb-4 text-primary">About Me</motion.p>
          <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-bold text-foreground mb-6">
            The Intimate Version
          </motion.h2>
          <motion.p variants={fadeUp} className="text-muted-foreground mb-4">
            Happily married with Katia. Proud cat dad of three: Polpetta, Tiramisù & Sofficino. Entrepreneurial mindset with an engineering background.
          </motion.p>
          <motion.p variants={fadeUp} className="text-muted-foreground mb-6">
            Experienced in multicultural environments — including working closely with Chinese management culture, thriving under high-pressure, fast-paced development while maintaining quality standards.
          </motion.p>
          <motion.div variants={fadeUp} className="space-y-3 mb-8">
            {["Sales & Business Professional", "Tech & Sustainability Passionate", "Entrepreneurial Mindset", "Engineering + Strategy", "Multicultural Experience (incl. Chinese culture)", "Traveller"].map((item) => (
              <div key={item} className="flex items-center gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                <span className="text-secondary-foreground">{item}</span>
              </div>
            ))}
          </motion.div>

          {/* Languages */}
          <motion.div variants={fadeUp} className="mb-6">
            <p className="label-mono mb-3 text-primary">🌍 Languages</p>
            <div className="flex flex-wrap gap-2">
              {[
                { lang: "Italian", level: "Native", flag: "it" },
                { lang: "English", level: "Fluent", flag: "gb" },
                { lang: "Spanish", level: "Fluent", flag: "es" },
                { lang: "Dutch", level: "Limited", flag: "nl" },
                { lang: "French", level: "Limited", flag: "fr" },
              ].map((l) => (
                <span key={l.lang} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border border-border bg-muted/50 text-foreground">
                  <img src={`https://flagcdn.com/16x12/${l.flag}.png`} alt={l.lang} className="w-4 h-3" />
                  {l.lang}
                  <span className="text-muted-foreground">· {l.level}</span>
                </span>
              ))}
            </div>
          </motion.div>

          {/* Passions */}
          <motion.div variants={fadeUp}>
            <p className="label-mono mb-3 text-primary">🔥 Passions</p>
            <div className="flex flex-wrap gap-2">
              {["Technology", "Sustainability", "Travel", "Cooking", "Cats", "Guitar", "Entrepreneurship"].map((p) => (
                <span key={p} className="px-3 py-1.5 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20">
                  {p}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
        <motion.div variants={fadeUp} className="space-y-6">
          {/* Photo grid */}
          <div className="grid grid-cols-2 gap-6">
            <img src={aboutWedding} alt="Davide and Katia wedding" className="rounded-lg object-cover w-full h-56 monolith-card" />
            <img src={aboutImg2} alt="Davide travelling" className="rounded-lg object-cover w-full h-56 monolith-card" />
            <div className="relative rounded-lg overflow-hidden monolith-card col-span-2">
              <img src={aboutCats} alt="Polpetta, Tiramisù & Sofficino" className="w-full h-48 object-cover" />
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-foreground/70 to-transparent p-3">
                <p className="text-primary-foreground text-xs font-medium">🐱 Polpetta, Tiramisù & Sofficino</p>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
