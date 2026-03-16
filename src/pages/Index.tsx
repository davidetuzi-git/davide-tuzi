import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { AccessGate } from "@/components/AccessGate";
import { HeroSection } from "@/components/sections/HeroSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { QualificationSection } from "@/components/sections/QualificationSection";
import { CareerSection } from "@/components/sections/CareerSection";
import { ResultsSection } from "@/components/sections/ResultsSection";
import { SwotSection } from "@/components/sections/SwotSection";
import { SkillsSection } from "@/components/sections/SkillsSection";
import { WhyMeSection } from "@/components/sections/WhyMeSection";
import { ContactSection } from "@/components/sections/ContactSection";

const Index = () => {
  const [granted, setGranted] = useState(false);

  return (
    <AnimatePresence mode="wait">
      {!granted ? (
        <motion.div
          key="gate"
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          <AccessGate onGranted={() => setGranted(true)} />
        </motion.div>
      ) : (
        <motion.div
          key="content"
          initial={{ opacity: 0, clipPath: "circle(0% at 50% 50%)" }}
          animate={{ opacity: 1, clipPath: "circle(150% at 50% 50%)" }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="bg-background"
        >
          <HeroSection />
          <div className="w-full max-w-6xl mx-auto border-t border-border" />
          <AboutSection />
          <div className="w-full max-w-6xl mx-auto border-t border-border" />
          <QualificationSection />
          <div className="w-full max-w-6xl mx-auto border-t border-border" />
          <CareerSection />
          <div className="w-full max-w-6xl mx-auto border-t border-border" />
          <ResultsSection />
          <div className="w-full max-w-6xl mx-auto border-t border-border" />
          <SwotSection />
          <div className="w-full max-w-6xl mx-auto border-t border-border" />
          <SkillsSection />
          <div className="w-full max-w-6xl mx-auto border-t border-border" />
          <WhyMeSection />
          <div className="w-full max-w-6xl mx-auto border-t border-border" />
          <ContactSection />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Index;
