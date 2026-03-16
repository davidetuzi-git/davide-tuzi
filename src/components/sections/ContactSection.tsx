import { motion } from "framer-motion";
import { fadeUp } from "@/lib/animations";
import { Mail, Phone, Linkedin } from "lucide-react";

export function ContactSection() {
  return (
    <section className="min-h-[60vh] flex items-center justify-center px-8 py-20">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        transition={{ staggerChildren: 0.15 }}
        className="max-w-2xl mx-auto text-center"
      >
        <motion.p variants={fadeUp} className="label-mono mb-4">Get in Touch</motion.p>
        <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-bold text-foreground mb-8">
          Thanks for the Attention
        </motion.h2>
        <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <a href="mailto:davide.tuzi@gmail.com" className="monolith-card px-6 py-3 flex items-center gap-3 text-secondary-foreground hover:text-foreground transition-colors">
            <Mail className="w-5 h-5 text-primary" strokeWidth={1.5} />
            <span className="text-sm">davide.tuzi@gmail.com</span>
          </a>
          <a href="tel:+393332016113" className="monolith-card px-6 py-3 flex items-center gap-3 text-secondary-foreground hover:text-foreground transition-colors">
            <Phone className="w-5 h-5 text-primary" strokeWidth={1.5} />
            <span className="text-sm">+39 333 201 6113</span>
          </a>
          <a href="https://www.linkedin.com/in/davidetuzi/" target="_blank" rel="noopener noreferrer" className="monolith-card px-6 py-3 flex items-center gap-3 text-secondary-foreground hover:text-foreground transition-colors">
            <Linkedin className="w-5 h-5 text-primary" strokeWidth={1.5} />
            <span className="text-sm">LinkedIn</span>
          </a>
        </motion.div>
        <motion.p variants={fadeUp} className="text-muted-foreground text-sm mt-12">
          © {new Date().getFullYear()} Davide Tuzi. All rights reserved.
        </motion.p>
      </motion.div>
    </section>
  );
}
