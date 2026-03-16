import { motion } from "framer-motion";
import { fadeUp, stagger } from "@/lib/animations";
import profileImg from "@/assets/davide-profile.jpg";

export function HeroSection() {
  return (
    <section className="min-h-svh flex items-center justify-center px-8 py-20 relative overflow-hidden">
      {/* Subtle gradient decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-primary/5 rounded-full blur-3xl translate-y-1/3 -translate-x-1/4" />

      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="max-w-4xl mx-auto text-center relative z-10"
      >
        <motion.div variants={fadeUp} className="mb-8">
          <div className="relative inline-block">
            <img
              src={profileImg}
              alt="Davide Tuzi"
              className="w-36 h-36 rounded-full mx-auto object-cover border-4 border-primary/20 shadow-lg"
            />
            <div className="absolute inset-0 rounded-full ring-2 ring-primary/10 ring-offset-4 ring-offset-background" />
          </div>
        </motion.div>
        <motion.p variants={fadeUp} className="label-mono mb-4 text-primary">
          Self Introduction
        </motion.p>
        <motion.h1 variants={fadeUp} className="text-5xl md:text-7xl font-bold text-foreground mb-6">
          Davide Tuzi
        </motion.h1>
        <motion.p variants={fadeUp} className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          Sales & business professional. Passionate about tech & sustainability.
          Engineering background mixed with strategic acumen, fighting for innovation.
        </motion.p>
      </motion.div>
    </section>
  );
}
