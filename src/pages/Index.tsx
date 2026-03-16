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
          className="bg-background relative"
        >
          {/* Watermark */}
          <div className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center overflow-hidden select-none" aria-hidden="true">
            <div className="absolute inset-0" style={{
              backgroundImage: `repeating-linear-gradient(
                -45deg,
                transparent,
                transparent 200px,
                transparent 200px
              )`,
            }}>
              {Array.from({ length: 12 }).map((_, i) => (
                <div
                  key={i}
                  className="absolute text-foreground/[0.04] text-2xl font-bold uppercase tracking-[0.3em] whitespace-nowrap"
                  style={{
                    top: `${(i * 180) - 100}px`,
                    left: i % 2 === 0 ? '-5%' : '15%',
                    transform: 'rotate(-35deg)',
                    width: '200%',
                  }}
                >
                  CONFIDENTIAL &nbsp;&nbsp;&nbsp; CONFIDENTIAL &nbsp;&nbsp;&nbsp; CONFIDENTIAL &nbsp;&nbsp;&nbsp; CONFIDENTIAL &nbsp;&nbsp;&nbsp; CONFIDENTIAL
                </div>
              ))}
            </div>
          </div>

          {/* Disclaimer banner */}
          <div className="bg-destructive/10 border-b border-destructive/20 py-3 px-4 text-center">
            <p className="text-xs text-destructive font-medium tracking-wide uppercase">
              ⚠️ Confidential — This document contains proprietary information. Unauthorized sharing, copying, or distribution without the owner's explicit consent is strictly prohibited.
            </p>
          </div>

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
