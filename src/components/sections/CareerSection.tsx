import { motion } from "framer-motion";
import { fadeUp } from "@/lib/animations";
import { ExternalLink, Play, FileText } from "lucide-react";
import logoLenntech from "@/assets/logo-lenntech.png";
import logoVanderlande from "@/assets/logo-vanderlande.png";
import logoHai from "@/assets/logo-hai-robotics.png";
import logoNexton from "@/assets/logo-nexton.png";

const careers = [
  {
    period: "2016 – 2018",
    company: "LenntecH",
    role: "Technical Sales Engineer",
    logo: logoLenntech,
    achievements: [
      "Exceeded sales quota by 20%",
      "New accounts acquired: portfolio increased by 50%",
      "Improved sales ops by developing an internal tool",
      "Successfully managed corporate accounts",
    ],
    keyLearnings: ["Consultative selling", "Technical-commercial mindset", "Client relationship building"],
    transition: "Seeking a larger, more structured international environment to grow my career in industrial automation.",
  },
  {
    period: "2018 – 2021",
    company: "Vanderlande",
    role: "Spare Parts Sales Engineer Specialist – Global Services",
    logo: logoVanderlande,
    achievements: [
      "100% complex project success rate",
      "Acted as Project Manager for project leads",
      "Price negotiation with major customers",
      "Successful cross-functional department collaboration",
    ],
    keyLearnings: ["Complex project management", "Corporate processes & governance", "Global stakeholder alignment"],
    transition: "Ready for a leadership challenge — wanted to build something from scratch and take full ownership of a market.",
  },
  {
    period: "2021 – Present",
    company: "HAI Robotics",
    role: "Country Manager Italy & Middle East",
    logo: logoHai,
    achievements: [
      "Built Italian team from scratch (7 professionals)",
      "€120M+ sales pipeline in 12 months, 300+ prospects",
      "Exceeded sales quota in 2 out of 3 years",
      "Pioneered the Middle East market from zero",
      "4 official partnerships signed",
      "Thrived in Chinese corporate culture under high-pressure management",
    ],
    keyLearnings: ["Leadership & team building from zero", "Cross-cultural management (Chinese culture)", "Resilience under extreme pressure"],
    links: [
      { label: "Intralogistica Italia 2022", url: "https://www.hairobotics.com/news/intralogistica-italia-2022", type: "article" },
      { label: "HaiPulse Webinar – New Wave Textiles Case Study", url: "https://zoom.us/rec/play/2lFWeQr90xpzdMfdi-8oNq2aMHt8LdHSW5NOuUeN_NENTeMwmdZlszASIHijIecM97LwasLneghiMsdl.jBoEMlY7zO_Ey9Gu", type: "video" },
      { label: "Next-Gen Warehouse Automation Webinar", url: "https://www.youtube.com/watch?v=syYFwDBJiR4", type: "video" },
      { label: "Davide Tuzi on HAI Robotics Strategy in Italy", url: "https://www.facebook.com/HaiRobotics/videos/781783112975852/", type: "video" },
      { label: "Lancio nuove soluzioni ACR", url: "https://www.businesswire.com/news/home/20231001699566/it", type: "article" },
    ],
  },
  {
    period: "2019 – 2023",
    company: "Nexton",
    role: "Co-Founder",
    logo: logoNexton,
    url: "https://www.linkedin.com/company/nextonideas/",
    achievements: [
      "Side entrepreneurial adventure in IoT industry",
    ],
    keyLearnings: ["Entrepreneurial grit", "Product-market fit thinking"],
  },
];

export function CareerSection() {
  return (
    <section className="min-h-svh flex items-center px-8 py-20">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        transition={{ staggerChildren: 0.12 }}
        className="max-w-6xl mx-auto w-full"
      >
        <motion.p variants={fadeUp} className="label-mono mb-4 text-primary">Experience</motion.p>
        <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-bold text-foreground mb-12">
          Career Path
        </motion.h2>
        <div className="space-y-2">
          {careers.map((c, i) => (
            <div key={c.company}>
              <motion.div variants={fadeUp} className="monolith-card p-6 md:p-8">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                  <div className="flex items-start gap-5">
                    <img
                      src={c.logo}
                      alt={`${c.company} logo`}
                      className="w-14 h-14 object-contain rounded-md bg-background border border-border p-1.5 shrink-0"
                    />
                    <div>
                      <span className="label-mono text-primary">{c.period}</span>
                      <h3 className="text-xl font-semibold text-foreground mt-1">
                        {c.url ? (
                          <a href={c.url} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors underline-offset-4 hover:underline">
                            {c.company} ↗
                          </a>
                        ) : c.company}
                      </h3>
                      <p className="text-muted-foreground text-sm">{c.role}</p>
                    </div>
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-2 ml-0 md:ml-[4.75rem]">
                  {c.achievements.map((a) => (
                    <div key={a} className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                      <span className="text-secondary-foreground text-sm">{a}</span>
                    </div>
                  ))}
                </div>
                {c.keyLearnings && (
                  <div className="ml-0 md:ml-[4.75rem] mt-4 pt-4 border-t border-border">
                    <p className="text-xs font-semibold text-primary uppercase tracking-wider mb-2">🎯 Key Learnings</p>
                    <div className="flex flex-wrap gap-2">
                      {c.keyLearnings.map((l) => (
                        <span key={l} className="text-xs bg-primary/8 text-primary border border-primary/15 rounded-full px-3 py-1 font-medium">
                          {l}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                {c.links && c.links.length > 0 && (
                  <div className="ml-0 md:ml-[4.75rem] mt-4 pt-4 border-t border-border">
                    <p className="text-xs font-semibold text-primary uppercase tracking-wider mb-2">🔗 Media & Events</p>
                    <div className="flex flex-wrap gap-2">
                      {c.links.map((link) => (
                        <a
                          key={link.url}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-xs bg-secondary text-secondary-foreground border border-border rounded-full px-3 py-1 font-medium hover:bg-primary/10 hover:text-primary hover:border-primary/20 transition-colors"
                        >
                          {link.type === "video" ? <Play className="w-3 h-3" /> : <FileText className="w-3 h-3" />}
                          {link.label}
                          <ExternalLink className="w-2.5 h-2.5 opacity-50" />
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
              {c.transition && i < careers.length - 1 && (
                <motion.div variants={fadeUp} className="flex items-center gap-3 py-4 pl-6 md:pl-[4.75rem]">
                  <div className="w-px h-8 bg-primary/30" />
                  <div className="flex items-start gap-2">
                    <span className="text-primary text-sm">→</span>
                    <p className="text-muted-foreground text-sm italic">{c.transition}</p>
                  </div>
                </motion.div>
              )}
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
