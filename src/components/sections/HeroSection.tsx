import { motion } from "framer-motion";
import { fadeUp, stagger } from "@/lib/animations";
import profileImg from "@/assets/davide-profile.jpg";
import aboutImg1 from "@/assets/about-1-cutout.png";

export function HeroSection() {
  return (
    <section className="min-h-svh flex items-center justify-center px-8 py-20 relative overflow-hidden">
      {/* Gradient decorations */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/8 rounded-full blur-[100px] -translate-y-1/3 translate-x-1/4" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/8 rounded-full blur-[80px] translate-y-1/3 -translate-x-1/4" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/[0.03] rounded-full blur-[120px]" />

      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center relative z-10"
      >
        {/* Text side */}
        <div className="text-center md:text-left">
          <motion.div variants={fadeUp} className="mb-8 md:hidden">
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
          <motion.p variants={fadeUp} className="text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed">
            Sales & business professional.
            <br />
            Passionate about tech & sustainability.
            <br />
            Engineering background mixed with strategic acumen.
            <br />
            Relentless entrepreneur, fighting for innovation.
          </motion.p>
        </div>

        {/* Photo side */}
        <motion.div variants={fadeUp} className="hidden md:flex justify-center">
          <img
            src={aboutImg1}
            alt="Davide Tuzi"
            className="max-h-[500px] object-contain drop-shadow-2xl"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
