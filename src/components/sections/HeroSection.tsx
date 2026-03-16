import { motion } from "framer-motion";
import profileImg from "@/assets/davide-profile.jpg";

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

export function HeroSection() {
  return (
    <section className="min-h-svh flex items-center justify-center px-8 py-20">
      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="max-w-4xl mx-auto text-center"
      >
        <motion.div variants={fadeUp} className="mb-8">
          <img
            src={profileImg}
            alt="Davide Tuzi"
            className="w-32 h-32 rounded-full mx-auto object-cover border-2 border-border"
          />
        </motion.div>
        <motion.p variants={fadeUp} className="label-mono mb-4">
          Self Introduction — 2025
        </motion.p>
        <motion.h1 variants={fadeUp} className="text-5xl md:text-7xl font-bold text-foreground mb-6">
          Davide Tuzi
        </motion.h1>
        <motion.p variants={fadeUp} className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
          Sales & business professional. Passionate about tech & sustainability.
          Engineering background mixed with strategic acumen, fighting for innovation.
        </motion.p>
      </motion.div>
    </section>
  );
}
