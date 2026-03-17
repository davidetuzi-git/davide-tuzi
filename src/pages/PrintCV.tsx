import { useEffect } from "react";
import profileImg from "@/assets/davide-profile.jpg";
import logoPolito from "@/assets/logo-polito.png";
import logoMaastricht from "@/assets/logo-maastricht.png";
import logoErasmus from "@/assets/logo-erasmus.png";
import logoLenntech from "@/assets/logo-lenntech.png";
import logoVanderlande from "@/assets/logo-vanderlande.png";
import logoHai from "@/assets/logo-hai-robotics.png";
import logoNexton from "@/assets/logo-nexton.png";

const PrintCV = () => {
  useEffect(() => {
    document.title = "Davide Tuzi – Professional Profile";
  }, []);

  return (
    <div className="print-cv min-h-screen" style={{ background: '#ffffff', color: '#111827' }}>
      {/* Print styles */}
      <style>{`
        @media print {
          @page { margin: 1.5cm; size: A4; }
          body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
          .print-cv { font-size: 11px; }
          .no-print { display: none !important; }
          .page-break { page-break-before: always; }
        }
        .print-cv { font-family: 'Inter', system-ui, sans-serif; }
        .print-cv * { color: inherit; }
        .print-cv h1, .print-cv h2, .print-cv h3 { color: #1a1a2e; }
        .print-cv .accent { color: #3b82f6; }
        .print-cv .section-title { font-size: 1.1rem; font-weight: 700; border-bottom: 2px solid #3b82f6; padding-bottom: 4px; margin-bottom: 12px; color: #1a1a2e; }
        .print-cv .tag { display: inline-block; background: #eff6ff; color: #2563eb !important; border: 1px solid #bfdbfe; border-radius: 9999px; padding: 2px 10px; font-size: 0.7rem; font-weight: 500; margin: 2px; }
        .print-cv .career-block { border-left: 3px solid #3b82f6; padding-left: 12px; margin-bottom: 16px; }
        .print-cv .text-blue { color: #2563eb !important; }
        .print-cv .text-gray-light { color: #6b7280 !important; }
        .print-cv .text-gray-dark { color: #374151 !important; }
        .print-cv .text-gray-faint { color: #9ca3af !important; }
      `}</style>

      {/* Top bar - print button */}
      <div className="no-print bg-gray-900 text-white py-4 px-6 flex items-center justify-between sticky top-0 z-50">
        <p className="text-sm text-gray-400">Preview — Print or save as PDF</p>
        <button
          onClick={() => window.print()}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium text-sm transition-colors"
        >
          🖨️ Print / Save as PDF
        </button>
      </div>

      <div className="max-w-[210mm] mx-auto px-8 py-8">
        {/* === PAGE 1: Header + About + Education === */}
        {/* Header */}
        <div className="flex items-center gap-6 mb-8">
          <img src={profileImg} alt="Davide Tuzi" className="w-24 h-24 rounded-full object-cover border-2 border-blue-200" />
          <div>
            <h1 className="text-3xl font-bold">Davide Tuzi</h1>
            <p className="text-gray-500 mt-1">Sales & Business Professional | Tech & Sustainability</p>
            <div className="flex gap-4 mt-2 text-xs text-gray-500">
              <span>📧 davide.tuzi@gmail.com</span>
              <span>📱 +39 333 201 6113</span>
              <span>🔗 linkedin.com/in/davide-tuzi</span>
            </div>
          </div>
        </div>

        {/* Profile Summary */}
        <div className="mb-6">
          <h2 className="section-title">Profile Summary</h2>
          <p className="text-sm text-gray-700 leading-relaxed">
            Sales & business professional with 9+ years of experience in B2B sales, business development, and team leadership across international markets. 
            Engineering background combined with strategic acumen and an MBA. Proven track record in building teams from scratch, managing P&L, 
            and developing multi-million euro pipelines. Passionate about technology, sustainability, and innovation.
          </p>
        </div>

        {/* Key Strengths */}
        <div className="mb-6">
          <h2 className="section-title">Key Strengths</h2>
          <div className="flex flex-wrap gap-1">
            {["Business Development", "Strategic Vision", "Leadership", "Market Knowledge", "Financial Acumen", "Problem-Solver", "Negotiation", "Multicultural Experience", "Team Management", "P&L Management"].map(s => (
              <span key={s} className="tag">{s}</span>
            ))}
          </div>
        </div>

        {/* Languages */}
        <div className="mb-6">
          <h2 className="section-title">Languages</h2>
          <div className="flex gap-4 text-sm">
            {[
              { lang: "Italian", level: "Native" },
              { lang: "English", level: "Fluent" },
              { lang: "Spanish", level: "Fluent" },
              { lang: "Dutch", level: "Limited" },
              { lang: "French", level: "Limited" },
            ].map(l => (
              <span key={l.lang} className="text-gray-700"><strong>{l.lang}</strong> · {l.level}</span>
            ))}
          </div>
        </div>

        {/* Education */}
        <div className="mb-6">
          <h2 className="section-title">Education & Certifications</h2>
          <div className="grid grid-cols-3 gap-4">
            {[
              { logo: logoPolito, name: "Politecnico di Torino", degree: "B.Sc. & M.Sc. Civil Engineering" },
              { logo: logoErasmus, name: "Erasmus for Young Entrepreneurs", degree: "Entrepreneurship Program" },
              { logo: logoMaastricht, name: "Maastricht School of Management", degree: "Executive MBA" },
            ].map(q => (
              <div key={q.name} className="flex items-start gap-3">
                <img src={q.logo} alt={q.name} className="w-10 h-10 object-contain shrink-0" />
                <div>
                  <p className="text-xs font-semibold text-gray-900">{q.name}</p>
                  <p className="text-xs text-gray-500">{q.degree}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* === PAGE 2-3: Career === */}
        <div className="page-break" />
        <h2 className="section-title">Career Path</h2>

        {/* Lenntech */}
        <div className="career-block">
          <div className="flex items-center gap-3 mb-1">
            <img src={logoLenntech} alt="Lenntech" className="w-8 h-8 object-contain" />
            <div>
              <p className="text-sm font-semibold">Lenntech <span className="text-gray-400 font-normal">· 2016 – 2018</span></p>
              <p className="text-xs text-gray-500">Technical Sales Engineer</p>
            </div>
          </div>
          <ul className="text-xs text-gray-700 list-disc ml-4 space-y-0.5">
            <li>Exceeded sales quota by 20%</li>
            <li>New accounts acquired: portfolio increased by 50%</li>
            <li>Improved sales ops by developing an internal tool</li>
            <li>Successfully managed corporate accounts</li>
          </ul>
        </div>

        {/* Vanderlande */}
        <div className="career-block">
          <div className="flex items-center gap-3 mb-1">
            <img src={logoVanderlande} alt="Vanderlande" className="w-8 h-8 object-contain" />
            <div>
              <p className="text-sm font-semibold">Vanderlande <span className="text-gray-400 font-normal">· 2018 – 2021</span></p>
            </div>
          </div>
          <div className="ml-11 mb-2">
            <p className="text-xs font-semibold text-blue-600">Spare Parts Sales Engineer Specialist – Global Services (2018–2019)</p>
            <ul className="text-xs text-gray-700 list-disc ml-4 space-y-0.5">
              <li>100% complex project success rate</li>
              <li>Acted as Project Manager for project leads</li>
            </ul>
          </div>
          <div className="ml-11">
            <p className="text-xs font-semibold text-blue-600">Sales Engineer Key Account – Amazon (2019–2021)</p>
            <ul className="text-xs text-gray-700 list-disc ml-4 space-y-0.5">
              <li>Price negotiation with major customers</li>
              <li>Successful cross-functional department collaboration</li>
            </ul>
          </div>
        </div>

        {/* NEXTON */}
        <div className="career-block">
          <div className="flex items-center gap-3 mb-1">
            <img src={logoNexton} alt="NEXTON" className="w-8 h-8 object-contain" />
            <div>
              <p className="text-sm font-semibold">NEXTON <span className="text-gray-400 font-normal">· 2019 – 2023</span></p>
              <p className="text-xs text-gray-500">CEO & Co-Founder · IoT Startup</p>
            </div>
          </div>
          <ul className="text-xs text-gray-700 list-disc ml-4 space-y-0.5">
            <li>Entrepreneurial adventure in IoT / smart lighting industry</li>
            <li>Featured in La Repubblica, MarsicaLive, 100Torri</li>
          </ul>
        </div>

        {/* HAI Robotics */}
        <div className="career-block">
          <div className="flex items-center gap-3 mb-1">
            <img src={logoHai} alt="HAI Robotics" className="w-8 h-8 object-contain" />
            <div>
              <p className="text-sm font-semibold">HAI Robotics <span className="text-gray-400 font-normal">· 2021 – Present</span></p>
              <p className="text-xs text-gray-500">Country Manager Italy & Middle East</p>
            </div>
          </div>
          <ul className="text-xs text-gray-700 list-disc ml-4 space-y-0.5">
            <li>Built Italian team from scratch (7 professionals)</li>
            <li>Led a team of 6–10 people across Italy & Middle East</li>
            <li>Managed regional P&L and budget</li>
            <li>Exceeded sales quota in 2 out of 3 years</li>
            <li>Pioneered the Middle East market from zero</li>
            <li>6 official partnerships signed, including 4 Tier-1 system integrators</li>
          </ul>
        </div>

        {/* === PAGE 3: SWOT + Why Me === */}
        <div className="page-break" />
        <h2 className="section-title">What I'm Looking For</h2>
        <div className="grid grid-cols-3 gap-3 mb-6 text-xs">
          {[
            "Good balance travel / home",
            "Remote when not travelling",
            "High responsibility",
            "Sales & Strategy focused",
            "Good work-life balance",
            "Managing a team",
            "I love challenges",
          ].map(t => (
            <span key={t} className="tag">{t}</span>
          ))}
        </div>

        <h2 className="section-title">Why Me?</h2>
        <div className="grid grid-cols-2 gap-2 text-xs text-gray-700">
          {[
            "Experience with technology, hardware & software solutions",
            "International experience across cultures",
            "Selling since 2016",
            "Entrepreneur by DNA",
            "Negotiating with C-level big players",
            "Resilient under extreme pressure",
            "Team builder & leader",
          ].map(r => (
            <div key={r} className="flex items-start gap-2">
              <span className="text-blue-500 mt-0.5">●</span>
              <span>{r}</span>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-12 pt-4 border-t border-gray-200 text-center text-xs text-gray-400">
          <p>© {new Date().getFullYear()} Davide Tuzi · davide.tuzi@gmail.com · linkedin.com/in/davide-tuzi</p>
        </div>
      </div>
    </div>
  );
};

export default PrintCV;
