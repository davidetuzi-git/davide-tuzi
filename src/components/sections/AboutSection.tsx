import { motion } from "framer-motion";
import { fadeUp } from "@/lib/animations";
import aboutImg1 from "@/assets/about-1.jpg";
import aboutImg2 from "@/assets/about-2.jpg";

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
            Happily married with Katia. Entrepreneurial mindset with an engineering background.
          </motion.p>
          <motion.div variants={fadeUp} className="space-y-3">
            {["Sales & Business Professional", "Tech & Sustainability Passionate", "Entrepreneurial Mindset", "Engineering + Strategy", "Traveller"].map((item) => (
              <div key={item} className="flex items-center gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                <span className="text-secondary-foreground">{item}</span>
              </div>
            ))}
          </motion.div>
        </div>
        <motion.div variants={fadeUp} className="grid grid-cols-2 gap-4">
          <img src={aboutImg1} alt="Davide personal" className="rounded-lg object-cover w-full h-48 monolith-card" />
          <img src={aboutImg2} alt="Davide personal" className="rounded-lg object-cover w-full h-48 monolith-card mt-8" />
        </motion.div>
      </motion.div>
    </section>
  );
}
