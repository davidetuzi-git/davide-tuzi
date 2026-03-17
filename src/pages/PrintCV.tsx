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
    <div style={{ background: '#ffffff', color: '#111827', fontFamily: "'Inter', system-ui, sans-serif", minHeight: '100vh' }}>
      {/* Print styles */}
      <style>{`
        @media print {
          @page { margin: 1.5cm; size: A4; }
          body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
          .no-print { display: none !important; }
          .page-break { page-break-before: always; }
        }
      `}</style>

      {/* Top bar - print button */}
      <div className="no-print" style={{ background: '#111827', color: '#fff', padding: '16px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, zIndex: 50 }}>
        <p style={{ fontSize: '14px', color: '#9ca3af' }}>Preview — Print or save as PDF</p>
        <button
          onClick={() => window.print()}
          style={{ background: '#2563eb', color: '#fff', padding: '8px 24px', borderRadius: '8px', fontWeight: 500, fontSize: '14px', border: 'none', cursor: 'pointer' }}
        >
          🖨️ Print / Save as PDF
        </button>
      </div>

      <div style={{ maxWidth: '210mm', margin: '0 auto', padding: '32px' }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '24px', marginBottom: '32px' }}>
          <img src={profileImg} alt="Davide Tuzi" style={{ width: '96px', height: '96px', borderRadius: '50%', objectFit: 'cover', border: '2px solid #bfdbfe' }} />
          <div>
            <h1 style={{ fontSize: '1.875rem', fontWeight: 700, color: '#1a1a2e', margin: 0 }}>Davide Tuzi</h1>
            <p style={{ color: '#6b7280', marginTop: '4px', fontSize: '14px' }}>Sales & Business Professional | Tech & Sustainability</p>
            <div style={{ display: 'flex', gap: '16px', marginTop: '8px', fontSize: '12px', color: '#6b7280' }}>
              <span>📧 davide.tuzi@gmail.com</span>
              <span>📱 +39 333 201 6113</span>
              <span>🔗 linkedin.com/in/davide-tuzi</span>
            </div>
          </div>
        </div>

        {/* Profile Summary */}
        <div style={{ marginBottom: '24px' }}>
          <h2 style={{ fontSize: '1.1rem', fontWeight: 700, borderBottom: '2px solid #3b82f6', paddingBottom: '4px', marginBottom: '12px', color: '#1a1a2e' }}>Profile Summary</h2>
          <p style={{ fontSize: '13px', color: '#374151', lineHeight: 1.6 }}>
            Sales & business professional with 9+ years of experience in B2B sales, business development, and team leadership across international markets. 
            Engineering background combined with strategic acumen and an MBA. Proven track record in building teams from scratch, managing P&L, 
            and developing multi-million euro pipelines. Passionate about technology, sustainability, and innovation.
          </p>
        </div>

        {/* Key Strengths */}
        <div style={{ marginBottom: '24px' }}>
          <h2 style={{ fontSize: '1.1rem', fontWeight: 700, borderBottom: '2px solid #3b82f6', paddingBottom: '4px', marginBottom: '12px', color: '#1a1a2e' }}>Key Strengths</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap' as const, gap: '4px' }}>
            {["Business Development", "Strategic Vision", "Leadership", "Market Knowledge", "Financial Acumen", "Problem-Solver", "Negotiation", "Multicultural Experience", "Team Management", "P&L Management"].map(s => (
              <span key={s} style={{ display: 'inline-block', background: '#eff6ff', color: '#2563eb', border: '1px solid #bfdbfe', borderRadius: '9999px', padding: '2px 10px', fontSize: '0.7rem', fontWeight: 500 }}>{s}</span>
            ))}
          </div>
        </div>

        {/* Languages */}
        <div style={{ marginBottom: '24px' }}>
          <h2 style={{ fontSize: '1.1rem', fontWeight: 700, borderBottom: '2px solid #3b82f6', paddingBottom: '4px', marginBottom: '12px', color: '#1a1a2e' }}>Languages</h2>
          <div style={{ display: 'flex', gap: '16px', fontSize: '13px' }}>
            {[
              { lang: "Italian", level: "Native" },
              { lang: "English", level: "Fluent" },
              { lang: "Spanish", level: "Fluent" },
              { lang: "Dutch", level: "Limited" },
              { lang: "French", level: "Limited" },
            ].map(l => (
              <span key={l.lang} style={{ color: '#374151' }}><strong>{l.lang}</strong> · {l.level}</span>
            ))}
          </div>
        </div>

        {/* Education */}
        <div style={{ marginBottom: '24px' }}>
          <h2 style={{ fontSize: '1.1rem', fontWeight: 700, borderBottom: '2px solid #3b82f6', paddingBottom: '4px', marginBottom: '12px', color: '#1a1a2e' }}>Education & Certifications</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
            {[
              { logo: logoPolito, name: "Politecnico di Torino", degree: "B.Sc. & M.Sc. Civil Engineering" },
              { logo: logoErasmus, name: "Erasmus for Young Entrepreneurs", degree: "Entrepreneurship Program" },
              { logo: logoMaastricht, name: "Maastricht School of Management", degree: "Executive MBA" },
            ].map(q => (
              <div key={q.name} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                <img src={q.logo} alt={q.name} style={{ width: '40px', height: '40px', objectFit: 'contain', flexShrink: 0 }} />
                <div>
                  <p style={{ fontSize: '12px', fontWeight: 600, color: '#111827', margin: 0 }}>{q.name}</p>
                  <p style={{ fontSize: '12px', color: '#6b7280', margin: 0 }}>{q.degree}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* === PAGE 2: Career === */}
        <div className="page-break" />
        <h2 style={{ fontSize: '1.1rem', fontWeight: 700, borderBottom: '2px solid #3b82f6', paddingBottom: '4px', marginBottom: '12px', color: '#1a1a2e' }}>Career Path</h2>

        {/* Lenntech */}
        <div style={{ borderLeft: '3px solid #3b82f6', paddingLeft: '12px', marginBottom: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '4px' }}>
            <img src={logoLenntech} alt="Lenntech" style={{ width: '32px', height: '32px', objectFit: 'contain' }} />
            <div>
              <p style={{ fontSize: '14px', fontWeight: 600, color: '#111827', margin: 0 }}>Lenntech <span style={{ color: '#9ca3af', fontWeight: 400 }}>· 2016 – 2018</span></p>
              <p style={{ fontSize: '12px', color: '#6b7280', margin: 0 }}>Technical Sales Engineer</p>
            </div>
          </div>
          <ul style={{ fontSize: '12px', color: '#374151', listStyle: 'disc', marginLeft: '16px', lineHeight: 1.8 }}>
            <li>Exceeded sales quota by 20%</li>
            <li>New accounts acquired: portfolio increased by 50%</li>
            <li>Improved sales ops by developing an internal tool</li>
            <li>Successfully managed corporate accounts</li>
          </ul>
        </div>

        {/* Vanderlande */}
        <div style={{ borderLeft: '3px solid #3b82f6', paddingLeft: '12px', marginBottom: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '4px' }}>
            <img src={logoVanderlande} alt="Vanderlande" style={{ width: '32px', height: '32px', objectFit: 'contain' }} />
            <div>
              <p style={{ fontSize: '14px', fontWeight: 600, color: '#111827', margin: 0 }}>Vanderlande <span style={{ color: '#9ca3af', fontWeight: 400 }}>· 2018 – 2021</span></p>
            </div>
          </div>
          <div style={{ marginLeft: '44px', marginBottom: '8px' }}>
            <p style={{ fontSize: '12px', fontWeight: 600, color: '#2563eb', margin: '0 0 4px 0' }}>Spare Parts Sales Engineer Specialist – Global Services (2018–2019)</p>
            <ul style={{ fontSize: '12px', color: '#374151', listStyle: 'disc', marginLeft: '16px', lineHeight: 1.8 }}>
              <li>100% complex project success rate</li>
              <li>Acted as Project Manager for project leads</li>
            </ul>
          </div>
          <div style={{ marginLeft: '44px' }}>
            <p style={{ fontSize: '12px', fontWeight: 600, color: '#2563eb', margin: '0 0 4px 0' }}>Sales Engineer Key Account – Amazon (2019–2021)</p>
            <ul style={{ fontSize: '12px', color: '#374151', listStyle: 'disc', marginLeft: '16px', lineHeight: 1.8 }}>
              <li>Price negotiation with major customers</li>
              <li>Successful cross-functional department collaboration</li>
            </ul>
          </div>
        </div>

        {/* NEXTON */}
        <div style={{ borderLeft: '3px solid #3b82f6', paddingLeft: '12px', marginBottom: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '4px' }}>
            <img src={logoNexton} alt="NEXTON" style={{ width: '32px', height: '32px', objectFit: 'contain' }} />
            <div>
              <p style={{ fontSize: '14px', fontWeight: 600, color: '#111827', margin: 0 }}>NEXTON <span style={{ color: '#9ca3af', fontWeight: 400 }}>· 2019 – 2023</span></p>
              <p style={{ fontSize: '12px', color: '#6b7280', margin: 0 }}>CEO & Co-Founder · IoT Startup</p>
            </div>
          </div>
          <ul style={{ fontSize: '12px', color: '#374151', listStyle: 'disc', marginLeft: '16px', lineHeight: 1.8 }}>
            <li>Entrepreneurial adventure in IoT / smart lighting industry</li>
            <li>Featured in La Repubblica, MarsicaLive, 100Torri</li>
          </ul>
        </div>

        {/* HAI Robotics */}
        <div style={{ borderLeft: '3px solid #3b82f6', paddingLeft: '12px', marginBottom: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '4px' }}>
            <img src={logoHai} alt="HAI Robotics" style={{ width: '32px', height: '32px', objectFit: 'contain' }} />
            <div>
              <p style={{ fontSize: '14px', fontWeight: 600, color: '#111827', margin: 0 }}>HAI Robotics <span style={{ color: '#9ca3af', fontWeight: 400 }}>· 2021 – Present</span></p>
              <p style={{ fontSize: '12px', color: '#6b7280', margin: 0 }}>Country Manager Italy & Middle East</p>
            </div>
          </div>
          <ul style={{ fontSize: '12px', color: '#374151', listStyle: 'disc', marginLeft: '16px', lineHeight: 1.8 }}>
            <li>Built Italian team from scratch (7 professionals)</li>
            <li>Led a team of 6–10 people across Italy & Middle East</li>
            <li>Managed regional P&L and budget</li>
            <li>Exceeded sales quota in 2 out of 3 years</li>
            <li>Pioneered the Middle East market from zero</li>
            <li>6 official partnerships signed, including 4 Tier-1 system integrators</li>
          </ul>
        </div>

        {/* === PAGE 3: Dream Job + Why Me === */}
        <div className="page-break" />
        <h2 style={{ fontSize: '1.1rem', fontWeight: 700, borderBottom: '2px solid #3b82f6', paddingBottom: '4px', marginBottom: '12px', color: '#1a1a2e' }}>What I'm Looking For</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap' as const, gap: '6px', marginBottom: '24px' }}>
          {[
            "Good balance travel / home",
            "Remote when not travelling",
            "High responsibility",
            "Sales & Strategy focused",
            "Good work-life balance",
            "Managing a team",
            "I love challenges",
          ].map(t => (
            <span key={t} style={{ display: 'inline-block', background: '#eff6ff', color: '#2563eb', border: '1px solid #bfdbfe', borderRadius: '9999px', padding: '2px 10px', fontSize: '0.7rem', fontWeight: 500 }}>{t}</span>
          ))}
        </div>

        <h2 style={{ fontSize: '1.1rem', fontWeight: 700, borderBottom: '2px solid #3b82f6', paddingBottom: '4px', marginBottom: '12px', color: '#1a1a2e' }}>Why Me?</h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', fontSize: '12px', color: '#374151' }}>
          {[
            "Experience with technology, hardware & software solutions",
            "International experience across cultures",
            "Selling since 2016",
            "Entrepreneur by DNA",
            "Negotiating with C-level big players",
            "Resilient under extreme pressure",
            "Team builder & leader",
          ].map(r => (
            <div key={r} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
              <span style={{ color: '#3b82f6', marginTop: '2px' }}>●</span>
              <span>{r}</span>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div style={{ marginTop: '48px', paddingTop: '16px', borderTop: '1px solid #e5e7eb', textAlign: 'center' as const, fontSize: '12px', color: '#9ca3af' }}>
          <p>© {new Date().getFullYear()} Davide Tuzi · davide.tuzi@gmail.com · linkedin.com/in/davide-tuzi</p>
        </div>
      </div>
    </div>
  );
};

export default PrintCV;
