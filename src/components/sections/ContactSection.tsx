import { motion } from "framer-motion";
import { fadeUp } from "@/lib/animations";
import { Mail, Phone, Linkedin, Download, FileText, Presentation } from "lucide-react";
import { generatePptx } from "@/lib/generatePptx";
import { useState } from "react";
export function ContactSection() {
  const [generating, setGenerating] = useState(false);

  const handlePptx = async () => {
    setGenerating(true);
    try { await generatePptx(); } finally { setGenerating(false); }
  };

  return (
    <section className="min-h-[60vh] flex items-center justify-center px-8 py-20 bg-foreground relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-foreground via-foreground to-primary/20" />
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        transition={{ staggerChildren: 0.15 }}
        className="max-w-2xl mx-auto text-center relative z-10"
      >
        <motion.p variants={fadeUp} className="label-mono mb-4 text-primary-foreground/60">Get in Touch</motion.p>
        <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-bold text-primary-foreground mb-8">
          Thanks for the Attention
        </motion.h2>
        <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a href="mailto:davide.tuzi@gmail.com" className="bg-primary-foreground/10 border border-primary-foreground/20 rounded-lg px-6 py-3 flex items-center gap-3 text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary-foreground/15 transition-colors">
            <Mail className="w-5 h-5" strokeWidth={1.5} />
            <span className="text-sm">davide.tuzi@gmail.com</span>
          </a>
          <a href="tel:+393332016113" className="bg-primary-foreground/10 border border-primary-foreground/20 rounded-lg px-6 py-3 flex items-center gap-3 text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary-foreground/15 transition-colors">
            <Phone className="w-5 h-5" strokeWidth={1.5} />
            <span className="text-sm whitespace-nowrap">+39 333 201 6113</span>
          </a>
          <a href="https://www.linkedin.com/in/davide-tuzi/" target="_blank" rel="noopener noreferrer" className="bg-primary-foreground/10 border border-primary-foreground/20 rounded-lg px-6 py-3 flex items-center gap-3 text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary-foreground/15 transition-colors relative z-10">
            <Linkedin className="w-5 h-5 shrink-0" strokeWidth={1.5} />
            <span className="text-sm whitespace-nowrap">LinkedIn Profile</span>
          </a>
        </motion.div>
        <motion.div variants={fadeUp} className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
          <a href="/CV_DavideTuzi.pdf" download className="inline-flex items-center gap-3 bg-primary text-primary-foreground rounded-lg px-8 py-3 font-medium hover:bg-primary/90 transition-colors">
            <Download className="w-5 h-5" strokeWidth={1.5} />
            <span className="text-sm">Download CV</span>
          </a>
          <a href="/print" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 bg-primary-foreground/10 border border-primary-foreground/20 text-primary-foreground/80 rounded-lg px-8 py-3 font-medium hover:bg-primary-foreground/15 hover:text-primary-foreground transition-colors">
            <FileText className="w-5 h-5" strokeWidth={1.5} />
            <span className="text-sm">Printable Profile</span>
          </a>
          <button onClick={handlePptx} disabled={generating} className="inline-flex items-center gap-3 bg-primary-foreground/10 border border-primary-foreground/20 text-primary-foreground/80 rounded-lg px-8 py-3 font-medium hover:bg-primary-foreground/15 hover:text-primary-foreground transition-colors disabled:opacity-50">
            <Presentation className="w-5 h-5" strokeWidth={1.5} />
            <span className="text-sm">{generating ? "Generating…" : "Download PPTX"}</span>
          </button>
        </motion.div>
        <motion.p variants={fadeUp} className="text-primary-foreground/40 text-sm mt-12">
          © {new Date().getFullYear()} Davide Tuzi. All rights reserved.
        </motion.p>
      </motion.div>
    </section>
  );
}
