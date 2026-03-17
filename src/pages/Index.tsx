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
import { PodcastSection } from "@/components/sections/PodcastSection";

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
          <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden select-none" aria-hidden="true">
            {[10, 30, 50, 70, 90].map((top) => (
              <div
                key={top}
                className="absolute text-foreground/[0.045] text-xl font-bold uppercase tracking-[0.3em] whitespace-nowrap"
                style={{ top: `${top}%`, left: '-10%', transform: 'rotate(-35deg)', width: '250%' }}
              >
                CONFIDENTIAL &nbsp;&nbsp;&nbsp;&nbsp; CONFIDENTIAL &nbsp;&nbsp;&nbsp;&nbsp; CONFIDENTIAL &nbsp;&nbsp;&nbsp;&nbsp; CONFIDENTIAL &nbsp;&nbsp;&nbsp;&nbsp; CONFIDENTIAL &nbsp;&nbsp;&nbsp;&nbsp; CONFIDENTIAL
              </div>
            ))}
          </div>

          {/* Disclaimer banner */}
          <div className="bg-foreground py-2.5 px-4 text-center">
            <p className="text-[11px] text-primary-foreground/50 font-medium tracking-[0.15em] uppercase">
              Confidential — Proprietary information. Unauthorized sharing or distribution is strictly prohibited.
            </p>
          </div>

          <HeroSection />
          <div className="section-alt">
            <AboutSection />
          </div>
          <QualificationSection />
          <div className="section-accent">
            <CareerSection />
          </div>
          <ResultsSection />
          <div className="section-alt">
            <SwotSection />
          </div>
          <SkillsSection />
          <div className="section-accent">
            <WhyMeSection />
          </div>
          <PodcastSection />
          <ContactSection />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Index;
